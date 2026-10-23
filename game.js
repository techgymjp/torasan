/*
 * 画面制御（DOM・保存・演出）
 * ゲームの計算はすべて logic.js に任せ、ここでは表示と入力だけを扱う。
 * データの文章は textContent で表示し、HTML として解釈しない。
 */
(function () {
  "use strict";

  const D = window.TankaData;
  const L = window.TankaLogic;
  const Portrait = window.TankaPortrait;
  const Sound = window.TankaAudio;
  const Ads = window.TankaAds;

  // Android アプリ（Capacitor）で動いているか
  const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const plugin = function (name) {
    return NATIVE && window.Capacitor.Plugins ? window.Capacitor.Plugins[name] || null : null;
  };

  const RECORDS_KEY = "tankabai.records.v1";
  const PREFS_KEY = "tankabai.prefs.v1";
  const FX_DURATION = 1200;
  const SHARE_URL = "https://techgym.jp/column/claude-code-game-tankabai/";
  const SHARE_HASHTAG = "啖呵売昭和人情商店街";
  const ACT_NAMES = ["第一幕", "第二幕", "第三幕", "第四幕", "第五幕"];

  const $ = function (id) { return document.getElementById(id); };

  let state = L.createInitialState();
  let fxTimer = null;
  let storageOk = true;
  let finalActState = null; // 最終幕の開始時点（リワード広告でやり直すため）
  let redoUsed = false;     // 1 プレイ 1 回まで
  let redoing = false;      // やり直し中はプレイ回数を数えない
  let retries = 0;          // 「もう一度」の回数（2 回に 1 回、全画面広告）

  // ---------- 保存（失敗してもゲームは続行） ----------

  function readJson(key) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      storageOk = false;
      return {};
    }
  }

  function writeJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      storageOk = false;
      return false;
    }
  }

  function loadRecords() {
    const r = readJson(RECORDS_KEY) || {};
    const known = D.endings.map(function (e) { return e.id; });
    return {
      bestRevenue: Number.isFinite(r.bestRevenue) ? r.bestRevenue : 0,
      endings: Array.isArray(r.endings) ? r.endings.filter(function (id) { return known.indexOf(id) !== -1; }) : [],
      playCount: Number.isFinite(r.playCount) ? r.playCount : 0,
      lastTitle: typeof r.lastTitle === "string" ? r.lastTitle : null
    };
  }

  function loadPrefs() {
    const p = readJson(PREFS_KEY) || {};
    return {
      reduceMotion: p.reduceMotion === true,
      music: p.music !== false,
      sfx: p.sfx !== false
    };
  }

  function savePrefs() {
    writeJson(PREFS_KEY, {
      reduceMotion: $("opt-reduce-motion").checked,
      music: $("opt-music").checked,
      sfx: $("opt-sfx").checked
    });
  }

  // ---------- 共通 ----------

  function formatYen(n) {
    return n.toLocaleString("ja-JP");
  }

  function signed(n) {
    return (n > 0 ? "+" : n < 0 ? "−" : "±") + formatYen(Math.abs(n));
  }

  function showScreen(name) {
    ["title", "play", "result"].forEach(function (s) {
      $("screen-" + s).hidden = s !== name;
    });
    window.scrollTo(0, 0);
  }

  function setReduceMotion(on) {
    document.body.classList.toggle("reduce-motion", on);
  }

  function announce(text) {
    $("live").textContent = text;
  }

  // ---------- HUD ----------

  function renderHud() {
    $("turn-label").textContent = ACT_NAMES[state.turn - 1] || "";
    $("stat-revenue").textContent = formatYen(state.revenue);
    $("stat-customers").textContent = state.customers;
    ["laughter", "humanity", "trouble"].forEach(function (k) {
      $("stat-" + k).textContent = state[k];
      $("fill-" + k).style.width = state[k] + "%";
      $("meter-" + k).setAttribute("aria-valuenow", state[k]);
    });
    document.body.classList.toggle("is-danger", state.trouble >= 70);
    Sound.setTension(state.trouble >= 70);
  }

  // ---------- 商売画面 ----------

  function renderEvent() {
    const event = L.getCurrentEvent(state);
    const character = D.characters[event.character];

    $("event-id").textContent = event.id;
    $("event-title").textContent = event.title;
    $("char-name").textContent = character.name;
    $("char-role").textContent = character.role;
    $("char-trait").textContent = "人物メモ：" + character.trait;
    $("dialogue").textContent = event.dialogue;

    const product = $("product");
    if (event.product) {
      product.hidden = false;
      $("product-icon").textContent = event.product.icon;
      $("product-name").textContent = event.product.name;
      $("product-blurb").textContent = event.product.blurb;
    } else {
      product.hidden = true;
    }

    Portrait.render($("portrait"), character, "normal");

    const box = $("choices");
    box.textContent = "";
    event.choices.forEach(function (choice, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.dataset.choiceId = choice.id;

      const key = document.createElement("span");
      key.className = "choice__key";
      key.textContent = String(i + 1);

      const tag = document.createElement("span");
      tag.className = "type type--" + choice.type;
      tag.textContent = L.CHOICE_TYPES[choice.type].label;

      const text = document.createElement("span");
      text.className = "choice__text";
      text.textContent = choice.text;

      btn.append(key, tag, text);
      btn.addEventListener("click", function () { choose(choice.id); });
      box.appendChild(btn);
    });

    box.hidden = false;
    $("reaction").hidden = true;
    renderHud();
    $("stage").classList.remove("stage--enter");
    void $("stage").offsetWidth; // 紙芝居の差し替え演出を再生し直す
    $("stage").classList.add("stage--enter");
  }

  function choose(choiceId) {
    const result = L.applyChoice(state, choiceId);
    if (!result) return;
    state = result.state;
    showReaction(result.outcome);
  }

  function deltaItem(label, value, unit, goodWhenUp) {
    const li = document.createElement("li");
    const cls = value === 0 ? "flat" : (value > 0) === goodWhenUp ? "up" : "down";
    li.className = "delta delta--" + cls;
    li.textContent = label + " " + signed(value) + unit;
    return li;
  }

  function showReaction(outcome) {
    const event = L.getEvent(outcome.eventId);
    const character = D.characters[event.character];
    Portrait.render($("portrait"), character, outcome.expression);

    $("choices").hidden = true;

    $("reaction-stamp").textContent = outcome.stamp ? outcome.stamp.text : "";
    $("reaction-stamp").className = "reaction__stamp" + (outcome.stamp ? " reaction__stamp--" + outcome.stamp.kind : "");
    $("reaction-text").textContent = outcome.resultText;
    $("reaction-voice").textContent = outcome.reactionText ? character.name + "：" + outcome.reactionText : "";

    const notes = [];
    if (outcome.affinity === "like") notes.push("相性◎ — " + character.name + "の好む口上だった！");
    if (outcome.affinity === "dislike") notes.push("相性× — " + character.name + "の嫌う口上だった……");
    if (outcome.overheated) notes.push("大風呂敷の連発で調子に乗りすぎた！ 騒動が上乗せされた。");
    $("reaction-note").textContent = notes.join("　");

    const d = outcome.deltas;
    const list = $("reaction-deltas");
    list.textContent = "";
    list.append(
      deltaItem("売上", d.revenue, "円", true),
      deltaItem("笑い", d.laughter, "", true),
      deltaItem("人情", d.humanity, "", true),
      deltaItem("騒動", d.trouble, "", false)
    );
    if (d.customers > 0) {
      const li = document.createElement("li");
      li.className = "delta delta--up";
      li.textContent = "客 +" + d.customers + "人";
      list.appendChild(li);
    }

    $("btn-next").textContent = outcome.isLastTurn ? "本日の結果を見る ▶" : "次の幕へ ▶";
    $("reaction").hidden = false;
    renderHud();
    playFx(outcome.stamp);
    if (outcome.stamp) Sound.sfx.stamp(outcome.stamp.kind);
    else Sound.sfx.select();
    if (d.revenue > 0) Sound.sfx.coin();
    announce((outcome.stamp ? outcome.stamp.text + "。" : "") + outcome.resultText);
    $("btn-next").focus({ preventScroll: true });
    $("reaction").scrollIntoView({ block: "nearest", behavior: document.body.classList.contains("reduce-motion") ? "auto" : "smooth" });
  }

  function playFx(stamp) {
    const fx = $("fx");
    const stage = $("stage");
    clearTimeout(fxTimer);
    fx.className = "fx";
    stage.classList.remove("shake");
    if (!stamp) return;
    void fx.offsetWidth;
    $("fx-stamp").textContent = stamp.text;
    fx.classList.add("fx--on", "fx--" + stamp.kind);
    if (stamp.kind === "bad") stage.classList.add("shake");
    fxTimer = setTimeout(function () {
      fx.className = "fx";
      stage.classList.remove("shake");
    }, FX_DURATION);
  }

  function next() {
    const advanced = L.advance(state);
    if (!advanced) return;
    state = advanced;
    if (state.status === "result") {
      finish();
    } else {
      Sound.sfx.next();
      if (state.turn === state.maxTurns) finalActState = state;
      renderEvent();
      $("event-title").focus({ preventScroll: true });
      announce(ACT_NAMES[state.turn - 1] + "　" + L.getCurrentEvent(state).title);
    }
  }

  // ---------- 結果画面 ----------

  function finish() {
    const ending = D.endings.find(function (e) { return e.id === state.ending; });
    const records = loadRecords();
    const isNew = records.endings.indexOf(ending.id) === -1;
    const isBest = state.revenue > records.bestRevenue;

    writeJson(RECORDS_KEY, {
      bestRevenue: Math.max(records.bestRevenue, state.revenue),
      endings: isNew ? records.endings.concat(ending.id) : records.endings,
      playCount: records.playCount + (redoing ? 0 : 1),
      lastTitle: ending.title
    });

    $("ending-name").textContent = "「" + ending.name + "」";
    $("ending-text").textContent = ending.text;
    $("ending-title").textContent = ending.title;
    $("badge-new").hidden = !isNew;
    $("badge-best").hidden = !(isBest && state.revenue > 0);
    $("res-revenue").textContent = formatYen(state.revenue);
    $("res-customers").textContent = state.customers;
    $("res-laughter").textContent = state.laughter;
    $("res-humanity").textContent = state.humanity;
    $("res-trouble").textContent = state.trouble;

    setupShare(ending);
    setupRedo();
    redoing = false;

    const list = $("history");
    list.textContent = "";
    state.history.forEach(function (h) {
      const li = document.createElement("li");
      const head = document.createElement("strong");
      head.textContent = ACT_NAMES[h.turn - 1] + "「" + h.eventTitle + "」";
      const tag = document.createElement("span");
      tag.className = "type type--" + h.choiceType;
      tag.textContent = L.CHOICE_TYPES[h.choiceType].label;
      const text = document.createElement("span");
      text.className = "log__text";
      text.textContent = h.choiceText;
      li.append(head, tag, text);
      list.appendChild(li);
    });

    document.body.classList.remove("is-danger");
    Sound.setTension(false);
    Sound.setMusic("ending");
    Sound.sfx.curtain(ending.id === "chaos");
    showScreen("result");
    $("ending-name").focus({ preventScroll: true });
  }

  // ---------- シェア ----------

  let shareData = null;

  function shareText(ending) {
    return "『啖呵売！昭和人情商店街』で結末「" + ending.name + "」にたどり着いた！" +
      "称号は「" + ending.title + "」、売上" + formatYen(state.revenue) + "円。";
  }

  function setupShare(ending) {
    const text = shareText(ending);
    const enc = encodeURIComponent;
    $("share-x").href = "https://twitter.com/intent/tweet?text=" + enc(text) +
      "&url=" + enc(SHARE_URL) + "&hashtags=" + enc(SHARE_HASHTAG);
    $("share-facebook").href = "https://www.facebook.com/sharer/sharer.php?u=" + enc(SHARE_URL);
    $("share-line").href = "https://social-plugins.line.me/lineit/share?url=" + enc(SHARE_URL) +
      "&text=" + enc(text);
    $("share-native").hidden = !plugin("Share") && typeof navigator.share !== "function";
    $("share-status").textContent = "";
    shareData = { title: "啖呵売！昭和人情商店街", text: text, url: SHARE_URL };
  }

  function shareNative() {
    if (!shareData) return;
    // アプリでは Android の共有メニューを出す
    const nativeShare = plugin("Share");
    if (nativeShare) {
      nativeShare.share(Object.assign({ dialogTitle: "結果をシェア" }, shareData)).catch(function () { /* キャンセル */ });
      return;
    }
    if (typeof navigator.share !== "function") return;
    navigator.share(shareData).catch(function () { /* キャンセル時は何もしない */ });
  }

  function copyShareUrl() {
    const done = function (ok) {
      $("share-status").textContent = ok ? "URLをコピーしました！" : "コピーできませんでした。URL：" + SHARE_URL;
    };
    const fallback = function () {
      const area = document.createElement("textarea");
      area.value = SHARE_URL;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      done(ok);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SHARE_URL).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  // ---------- 広告（Android アプリのみ） ----------

  function setupRedo() {
    const btn = $("btn-redo");
    btn.hidden = !(Ads.available && finalActState && !redoUsed);
    btn.disabled = false;
    btn.textContent = "📺 広告を見て第五幕をやり直す";
    $("redo-note").textContent = "";
  }

  // リワード広告を最後まで見たら、最終幕の選択からやり直せる
  async function redo() {
    const btn = $("btn-redo");
    if (btn.disabled || !finalActState || redoUsed) return;
    btn.disabled = true;
    btn.textContent = "広告を読み込み中…";
    const result = await Ads.showRewarded();
    if (state.status !== "result") return;
    if (result !== "rewarded") {
      btn.disabled = false;
      btn.textContent = "📺 広告を見て第五幕をやり直す";
      $("redo-note").textContent = result === "unavailable"
        ? "広告を読み込めませんでした。少し時間をおいて試してください。"
        : "広告を最後まで見ると、やり直せます。";
      return;
    }
    redoUsed = true;
    redoing = true;
    state = finalActState;
    Sound.setMusic("street");
    showScreen("play");
    renderEvent();
    $("event-title").focus({ preventScroll: true });
  }

  let retryBusy = false;

  // 2 回に 1 回、「もう一度」の前に全画面広告を出す
  async function retry() {
    if (retryBusy) return;
    retries++;
    if (Ads.available && retries % 2 === 0) {
      retryBusy = true;
      await Ads.showInterstitial();
      retryBusy = false;
    }
    start();
  }

  // ---------- 開始・記録 ----------

  function start() {
    Sound.unlock();
    Sound.setMusic("street");
    Sound.sfx.start();
    state = L.startGame();
    finalActState = null;
    redoUsed = false;
    redoing = false;
    showScreen("play");
    renderEvent();
    $("event-title").focus({ preventScroll: true });
  }

  function toTitle() {
    state = L.createInitialState();
    document.body.classList.remove("is-danger");
    Sound.setTension(false);
    Sound.setMusic("street");
    showScreen("title");
    $("title-heading").focus({ preventScroll: true });
  }

  function openRecords() {
    const r = loadRecords();
    $("rec-plays").textContent = r.playCount + "回";
    $("rec-best").textContent = formatYen(r.bestRevenue) + "円";
    $("rec-title").textContent = r.lastTitle || "—";
    $("rec-count").textContent = "（" + r.endings.length + " / " + D.endings.length + "）";
    const list = $("rec-endings");
    list.textContent = "";
    D.endings.forEach(function (e, i) {
      const li = document.createElement("li");
      const seen = r.endings.indexOf(e.id) !== -1;
      li.className = "zukan__item" + (seen ? " zukan__item--seen" : "");
      const num = document.createElement("span");
      num.className = "zukan__num";
      num.textContent = "其の" + "一二三四五六七八九十"[i];
      const name = document.createElement("strong");
      name.textContent = seen ? e.name : "？？？";
      const title = document.createElement("small");
      title.textContent = seen ? "称号：" + e.title : "まだ見ぬ結末";
      li.append(num, name, title);
      list.appendChild(li);
    });
    $("rec-warning").hidden = storageOk;
    openDialog($("dlg-records"));
  }

  function openDialog(dlg) {
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  // ---------- 入力 ----------

  function onKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector("dialog[open]")) return;
    if (state.status !== "playing") return;
    if (state.phase === "choosing" && /^[1-3]$/.test(e.key)) {
      const btn = $("choices").querySelectorAll(".choice")[Number(e.key) - 1];
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    }
  }

  function syncMuteButton() {
    const on = $("opt-music").checked || $("opt-sfx").checked;
    const btn = $("btn-mute");
    btn.setAttribute("aria-pressed", String(!on));
    btn.textContent = on ? "🔊" : "🔇";
    btn.setAttribute("aria-label", on ? "音を消す" : "音を鳴らす");
    btn.title = on ? "音を消す" : "音を鳴らす";
  }

  // Android アプリ向けの設定（Web 版では、ビルド番号とプライバシーポリシーの表示以外は何もしない）
  function setupApp() {
    document.body.classList.toggle("is-app", NATIVE);

    // どのビルドが入っているか分かるよう、アプリ版はタイトル画面にバージョンを出す
    if (window.APP_VERSION && window.APP_VERSION !== "dev") $("build-info").textContent = window.APP_VERSION;

    // EU など同意が必要な地域では、タイトル画面から広告の同意内容を変更できるようにする
    Ads.initDone.then(function () {
      if (Ads.privacyOptionsRequired) $("ad-privacy").hidden = false;
    });
    $("ad-privacy-link").addEventListener("click", function (e) {
      e.preventDefault();
      Ads.showPrivacyOptions();
    });

    // Android の戻るボタン：ダイアログを閉じる／商売中はタイトルへ戻る／タイトル・結果画面ではアプリを終了
    const App = plugin("App");
    if (App) {
      App.addListener("backButton", function () {
        if (Ads.showing) return;
        const dlg = document.querySelector("dialog[open]");
        if (dlg) {
          dlg.close();
        } else if (state.status === "playing") {
          if (window.confirm("商売をやめて、タイトルに戻りますか？")) toTitle();
        } else {
          App.exitApp();
        }
      });
    }
  }

  function init() {
    const prefs = loadPrefs();
    const toggle = $("opt-reduce-motion");
    toggle.checked = prefs.reduceMotion;
    setReduceMotion(prefs.reduceMotion);
    toggle.addEventListener("change", function () {
      setReduceMotion(toggle.checked);
      savePrefs();
    });

    // 音（最初のクリック／キー入力で鳴らし始める）
    if (!Sound.supported) {
      $("sound-options").hidden = true;
      $("btn-mute").hidden = true;
    }
    $("opt-music").checked = prefs.music;
    $("opt-sfx").checked = prefs.sfx;
    Sound.setEnabled("music", prefs.music);
    Sound.setEnabled("sfx", prefs.sfx);
    Sound.setMusic("street");
    syncMuteButton();
    ["music", "sfx"].forEach(function (kind) {
      $("opt-" + kind).addEventListener("change", function () {
        Sound.unlock();
        Sound.setEnabled(kind, $("opt-" + kind).checked);
        syncMuteButton();
        savePrefs();
      });
    });
    $("btn-mute").addEventListener("click", function () {
      const on = !($("opt-music").checked || $("opt-sfx").checked);
      ["music", "sfx"].forEach(function (kind) {
        $("opt-" + kind).checked = on;
        Sound.setEnabled(kind, on);
      });
      Sound.unlock();
      syncMuteButton();
      savePrefs();
    });
    const firstGesture = function () {
      Sound.unlock();
      document.removeEventListener("pointerdown", firstGesture);
      document.removeEventListener("keydown", firstGesture);
    };
    document.addEventListener("pointerdown", firstGesture);
    document.addEventListener("keydown", firstGesture);

    $("btn-start").addEventListener("click", start);
    $("btn-howto").addEventListener("click", function () { openDialog($("dlg-howto")); });
    $("btn-records").addEventListener("click", openRecords);
    $("btn-next").addEventListener("click", next);
    $("btn-retry").addEventListener("click", retry);
    $("btn-redo").addEventListener("click", redo);
    $("btn-to-title").addEventListener("click", toTitle);
    $("share-native").addEventListener("click", shareNative);
    $("share-copy").addEventListener("click", copyShareUrl);
    document.addEventListener("keydown", onKey);
    setupApp();

    showScreen("title");
  }

  init();
})();
