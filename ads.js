/*
 * Google AdMob 広告（Android アプリのときだけ動く。Web 版では何もしない）
 *
 * インタースティシャル：結果画面で「もう一度商売する」を押したとき、2 回に 1 回
 * リワード：結果画面の「広告を見て第五幕をやり直す」（1 プレイ 1 回）
 */
(function (root) {
  "use strict";

  const UNITS = {
    // Google 公式のテスト用広告ユニット
    test: {
      interstitial: "ca-app-pub-3940256099942544/1033173712",
      rewarded: "ca-app-pub-3940256099942544/5224354917"
    },
    // AdMob で作成した本番の広告ユニット（未設定の間は Google Play 用のビルドが止まる）
    production: {
      interstitial: "ca-app-pub-6411535997477460/9183794755",
      rewarded: ""
    }
  };
  const RETRY_MS = 20000; // 読み込みに失敗したら少し待って再挑戦する
  const WAIT_MS = 8000;   // 表示時に読み込めていなければ、この時間だけ待つ

  const cap = root.Capacitor;
  const native = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  const testing = root.AD_MODE !== "production";
  const ids = testing ? UNITS.test : UNITS.production;
  const AdMob = native && cap.Plugins && ids.interstitial && ids.rewarded ? cap.Plugins.AdMob : null;
  const Sound = root.TankaAudio;

  let ready = false;           // 広告をリクエストしてよい状態（初期化と同意確認が済んだ）
  let showing = false;
  let privacyRequired = false; // 「広告の設定」を利用者が開けるようにする必要があるか（EU など）
  const waiters = {};          // 表示中の広告が閉じたときに呼ぶ処理

  // 広告の種類ごとの読み込み状態
  const slots = {
    inter: {
      loaded: false, pending: null,
      load: function () { return AdMob.prepareInterstitial({ adId: ids.interstitial, isTesting: testing }); }
    },
    reward: {
      loaded: false, pending: null,
      load: function () { return AdMob.prepareRewardVideoAd({ adId: ids.rewarded, isTesting: testing }); }
    }
  };

  // 読み込みを始め、読み込めたら true で resolve する Promise を返す（読み込み中なら同じ Promise）
  function prepare(kind) {
    const s = slots[kind];
    if (!ready) return Promise.resolve(false);
    if (s.loaded) return Promise.resolve(true);
    if (!s.pending) {
      s.pending = s.load()
        .then(function () { s.loaded = true; return true; })
        .catch(function () { setTimeout(function () { prepare(kind); }, RETRY_MS); return false; })
        .finally(function () { s.pending = null; });
    }
    return s.pending;
  }

  // 読み込み済みでなければ、最大 timeout ミリ秒だけ読み込みを待つ
  function ensureLoaded(kind, timeout) {
    if (slots[kind].loaded) return Promise.resolve(true);
    return Promise.race([
      prepare(kind),
      new Promise(function (r) { setTimeout(function () { r(false); }, timeout); })
    ]);
  }

  function finish(kind, result) {
    showing = false;
    Sound.resume();
    const w = waiters[kind];
    waiters[kind] = null;
    if (w) w(result);
  }

  async function init() {
    try {
      await AdMob.initialize({ initializeForTesting: testing });
    } catch (e) {
      return;
    }
    // EU・英国などで必要な広告の同意確認（必要な地域でだけフォームが出る）。
    // 確認自体が失敗した場合（AdMob 側でメッセージ未設定など）は、同意不要の地域とみなして続ける
    try {
      let consent = await AdMob.requestConsentInfo();
      if (consent.status === "REQUIRED" && consent.isConsentFormAvailable) consent = await AdMob.showConsentForm();
      ready = consent.canRequestAds !== false;
      privacyRequired = consent.privacyOptionsRequirementStatus === "REQUIRED";
    } catch (e) {
      ready = true;
    }
    let rewarded = false;
    AdMob.addListener("interstitialAdDismissed", function () { finish("inter"); });
    AdMob.addListener("interstitialAdFailedToShow", function () { finish("inter"); });
    AdMob.addListener("onRewardedVideoAdShowed", function () { rewarded = false; });
    AdMob.addListener("onRewardedVideoAdReward", function () { rewarded = true; });
    AdMob.addListener("onRewardedVideoAdDismissed", function () { finish("reward", rewarded); });
    AdMob.addListener("onRewardedVideoAdFailedToShow", function () { finish("reward", false); });
    prepare("inter");
    prepare("reward");
  }

  // 全画面広告を表示し、閉じられたら resolve する（読み込めていないときは出さずにすぐ resolve）
  function showInterstitial() {
    if (!AdMob || !ready || !slots.inter.loaded || showing) return Promise.resolve();
    showing = true;
    slots.inter.loaded = false;
    Sound.suspend();
    return new Promise(function (resolve) {
      waiters.inter = function () { prepare("inter"); resolve(); };
      AdMob.showInterstitial().catch(function () { finish("inter"); });
    });
  }

  // リワード広告を表示する。結果は 'rewarded'（最後まで見た）/ 'skipped'（途中で閉じた）/ 'unavailable'（読み込めなかった）
  async function showRewarded() {
    if (!AdMob || showing) return "unavailable";
    await initDone;
    if (!ready || !(await ensureLoaded("reward", WAIT_MS))) return "unavailable";
    showing = true;
    slots.reward.loaded = false;
    Sound.suspend();
    return new Promise(function (resolve) {
      waiters.reward = function (ok) { prepare("reward"); resolve(ok ? "rewarded" : "skipped"); };
      AdMob.showRewardVideoAd().catch(function () { finish("reward", false); });
    });
  }

  // 同意した内容をあとから変更するための Google のフォームを開く
  function showPrivacyOptions() {
    if (!AdMob) return Promise.resolve();
    return AdMob.showPrivacyOptionsForm().catch(function () {});
  }

  const initDone = AdMob ? init() : Promise.resolve();

  root.TankaAds = {
    get available() { return !!AdMob; },
    get showing() { return showing; },
    get privacyOptionsRequired() { return privacyRequired; },
    initDone: initDone,
    showInterstitial: showInterstitial,
    showRewarded: showRewarded,
    showPrivacyOptions: showPrivacyOptions
  };
})(window);
