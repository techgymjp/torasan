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
  const I18n = window.TankaI18n;
  const t = I18n.t;

  // Android アプリ（Capacitor）で動いているか
  const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const plugin = function (name) {
    return NATIVE && window.Capacitor.Plugins ? window.Capacitor.Plugins[name] || null : null;
  };

  const RECORDS_KEY = "tankabai.records.v1";
  const PREFS_KEY = "tankabai.prefs.v1";
  const FX_DURATION = 1200;
  const SHARE_URL = "https://techgym.jp/column/claude-code-game-tankabai/";

  const $ = function (id) { return document.getElementById(id); };

  let state = L.createInitialState();
  let fxTimer = null;
  let storageOk = true;
  let finalActState = null; // 最終幕の開始時点（リワード広告でやり直すため）
  let redoUsed = false;     // 1 プレイ 1 回まで
  let redoing = false;      // やり直し中はプレイ回数を数えない

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
      lastEnding: known.indexOf(r.lastEnding) !== -1 ? r.lastEnding : null,
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

  function formatNumber(n) {
    return n.toLocaleString(I18n.lang === "ja" ? "ja-JP" : "en-US");
  }

  function money(n) {
    return t("money", { n: formatNumber(n) });
  }

  function sign(n) {
    return n > 0 ? "+" : n < 0 ? "−" : "±";
  }

  function actName(turn) {
    return turn >= 1 ? t("act." + turn) : "";
  }

  // ---------- 表示言語に合わせた人物・イベント・結末の文章 ----------

  function charText(id) {
    const c = D.characters[id];
    const en = I18n.data("characters", id);
    return {
      name: en.name || c.name,
      role: en.role || c.role,
      trait: en.trait || c.trait,
      reactions: Object.assign({}, c.reactions, en.reactions)
    };
  }

  function eventText(event) {
    const en = I18n.data("events", event.id);
    const choices = en.choices || {};
    return {
      title: en.title || event.title,
      dialogue: en.dialogue || event.dialogue,
      product: event.product ? Object.assign({}, event.product, en.product) : null,
      choices: event.choices.map(function (c) { return Object.assign({}, c, choices[c.id]); })
    };
  }

  function endingText(ending) {
    const en = I18n.data("endings", ending.id);
    return {
      name: en.name || ending.name,
      title: en.title || ending.title,
      text: en.text || ending.text
    };
  }

  function showScreen(name) {
    ["title", "play", "result"].forEach(function (s) {
      $("screen-" + s).hidden = s !== name;
    });
    // バナー広告はすべての画面の下に出しっぱなしにする（商売中も）
    Ads.setBanner(true);
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
    $("turn-label").textContent = actName(state.turn);
    $("stat-revenue").textContent = money(state.revenue);
    $("stat-customers").textContent = t("people", { n: state.customers });
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
    const text = eventText(event);
    const who = charText(event.character);

    $("event-id").textContent = event.id;
    $("event-title").textContent = text.title;
    $("char-name").textContent = who.name;
    $("char-role").textContent = who.role;
    $("char-trait").textContent = t("play.trait", { t: who.trait });
    $("dialogue").textContent = text.dialogue;

    const product = $("product");
    if (text.product) {
      product.hidden = false;
      $("product-icon").textContent = text.product.icon;
      $("product-name").textContent = text.product.name;
      $("product-blurb").textContent = text.product.blurb;
    } else {
      product.hidden = true;
    }

    Portrait.render($("portrait"), character, "normal");

    const box = $("choices");
    box.textContent = "";
    text.choices.forEach(function (choice, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.dataset.choiceId = choice.id;

      const key = document.createElement("span");
      key.className = "choice__key";
      key.textContent = String(i + 1);

      const tag = document.createElement("span");
      tag.className = "type type--" + choice.type;
      tag.textContent = t("type." + choice.type);

      const line = document.createElement("span");
      line.className = "choice__text";
      line.textContent = choice.text;

      btn.append(key, tag, line);
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

  function deltaItem(label, value, shown, goodWhenUp) {
    const li = document.createElement("li");
    const cls = value === 0 ? "flat" : (value > 0) === goodWhenUp ? "up" : "down";
    li.className = "delta delta--" + cls;
    li.textContent = label + " " + sign(value) + shown;
    return li;
  }

  function showReaction(outcome) {
    const event = L.getEvent(outcome.eventId);
    const character = D.characters[event.character];
    const who = charText(event.character);
    const choice = eventText(event).choices.find(function (c) { return c.id === outcome.choiceId; });
    const voice = outcome.affinity === "neutral" ? "" : who.reactions[outcome.affinity];
    const stampText = outcome.stamp ? t("stamp." + outcome.stamp.id) : "";
    Portrait.render($("portrait"), character, outcome.expression);

    $("choices").hidden = true;

    $("reaction-stamp").textContent = stampText;
    $("reaction-stamp").className = "reaction__stamp" + (outcome.stamp ? " reaction__stamp--" + outcome.stamp.kind : "");
    $("reaction-text").textContent = choice.result;
    $("reaction-voice").textContent = voice ? t("play.voice", { name: who.name, text: voice }) : "";

    const notes = [];
    if (outcome.affinity === "like") notes.push(t("play.like", { name: who.name }));
    if (outcome.affinity === "dislike") notes.push(t("play.dislike", { name: who.name }));
    if (outcome.overheated) notes.push(t("play.overheat"));
    $("reaction-note").textContent = notes.join(I18n.lang === "ja" ? "　" : " ");

    const d = outcome.deltas;
    const list = $("reaction-deltas");
    list.textContent = "";
    list.append(
      deltaItem(t("stat.revenue"), d.revenue, money(Math.abs(d.revenue)), true),
      deltaItem(t("stat.laughter"), d.laughter, Math.abs(d.laughter), true),
      deltaItem(t("stat.humanity"), d.humanity, Math.abs(d.humanity), true),
      deltaItem(t("stat.trouble"), d.trouble, Math.abs(d.trouble), false)
    );
    if (d.customers > 0) {
      const li = document.createElement("li");
      li.className = "delta delta--up";
      li.textContent = t("play.customers", { n: d.customers });
      list.appendChild(li);
    }

    $("btn-next").textContent = t(outcome.isLastTurn ? "play.result" : "play.next");
    $("reaction").hidden = false;
    renderHud();
    playFx(stampText, outcome.stamp);
    if (outcome.stamp) Sound.sfx.stamp(outcome.stamp.kind);
    else Sound.sfx.select();
    if (d.revenue > 0) Sound.sfx.coin();
    announce((stampText ? stampText + " " : "") + choice.result);
    $("btn-next").focus({ preventScroll: true });
    $("reaction").scrollIntoView({ block: "nearest", behavior: document.body.classList.contains("reduce-motion") ? "auto" : "smooth" });
  }

  function playFx(text, stamp) {
    const fx = $("fx");
    const stage = $("stage");
    clearTimeout(fxTimer);
    fx.className = "fx";
    stage.classList.remove("shake");
    if (!stamp) return;
    void fx.offsetWidth;
    $("fx-stamp").textContent = text;
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
      announce(actName(state.turn) + " " + eventText(L.getCurrentEvent(state)).title);
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
      lastEnding: ending.id,
      lastTitle: ending.title
    });

    const text = endingText(ending);
    $("ending-name").textContent = t("result.ending", { name: text.name });
    $("ending-text").textContent = text.text;
    $("ending-title").textContent = text.title;
    $("badge-new").hidden = !isNew;
    $("badge-best").hidden = !(isBest && state.revenue > 0);
    $("res-revenue").textContent = money(state.revenue);
    $("res-customers").textContent = t("people", { n: state.customers });
    $("res-laughter").textContent = state.laughter;
    $("res-humanity").textContent = state.humanity;
    $("res-trouble").textContent = state.trouble;

    setupShare(text);
    setupRedo();
    redoing = false;

    const list = $("history");
    list.textContent = "";
    state.history.forEach(function (h) {
      const li = document.createElement("li");
      const head = document.createElement("strong");
      const ev = eventText(L.getEvent(h.eventId));
      head.textContent = t("result.logHead", { act: actName(h.turn), title: ev.title });
      const tag = document.createElement("span");
      tag.className = "type type--" + h.choiceType;
      tag.textContent = t("type." + h.choiceType);
      const line = document.createElement("span");
      line.className = "log__text";
      line.textContent = ev.choices.find(function (c) { return c.id === h.choiceId; }).text;
      li.append(head, tag, line);
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

  function setupShare(ending) {
    const text = t("share.text", { name: ending.name, title: ending.title, revenue: money(state.revenue) });
    const enc = encodeURIComponent;
    $("share-x").href = "https://twitter.com/intent/tweet?text=" + enc(text) +
      "&url=" + enc(SHARE_URL) + "&hashtags=" + enc(t("share.hashtag"));
    $("share-facebook").href = "https://www.facebook.com/sharer/sharer.php?u=" + enc(SHARE_URL);
    $("share-line").href = "https://social-plugins.line.me/lineit/share?url=" + enc(SHARE_URL) +
      "&text=" + enc(text);
    $("share-native").hidden = !plugin("Share") && typeof navigator.share !== "function";
    $("share-status").textContent = "";
    shareData = { title: t("share.title"), text: text, url: SHARE_URL };
  }

  function shareNative() {
    if (!shareData) return;
    // アプリでは Android の共有メニューを出す
    const nativeShare = plugin("Share");
    if (nativeShare) {
      nativeShare.share(Object.assign({ dialogTitle: t("share.dialog") }, shareData)).catch(function () { /* キャンセル */ });
      return;
    }
    if (typeof navigator.share !== "function") return;
    navigator.share(shareData).catch(function () { /* キャンセル時は何もしない */ });
  }

  function copyShareUrl() {
    const done = function (ok) {
      $("share-status").textContent = ok ? t("share.copied") : t("share.copyFail", { url: SHARE_URL });
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
    btn.textContent = t("redo.button");
    $("redo-note").textContent = "";
  }

  // リワード広告を最後まで見たら、最終幕の選択からやり直せる
  async function redo() {
    const btn = $("btn-redo");
    if (btn.disabled || !finalActState || redoUsed) return;
    btn.disabled = true;
    btn.textContent = t("redo.loading");
    const result = await Ads.showRewarded();
    if (state.status !== "result") return;
    if (result !== "rewarded") {
      btn.disabled = false;
      btn.textContent = t("redo.button");
      $("redo-note").textContent = t(result === "unavailable" ? "redo.unavailable" : "redo.skipped");
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

  let startBusy = false;

  // 「商売を始める」「もう一度商売する」のたびに、全画面広告を出してから始める
  // （読み込めていないときは待たずにそのまま始める）
  async function startWithAd() {
    if (startBusy) return;
    if (Ads.available) {
      startBusy = true;
      await Ads.showInterstitial();
      startBusy = false;
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

  // 商売の途中でやめたとき・結果画面の「タイトルへ」でタイトルに戻るときは、全画面広告を経由する
  async function quitToTitle() {
    if (startBusy) return;
    if (Ads.available) {
      startBusy = true;
      await Ads.showInterstitial();
      startBusy = false;
    }
    toTitle();
  }

  function openRecords() {
    const r = loadRecords();
    const last = D.endings.find(function (e) { return e.id === r.lastEnding; });
    $("rec-plays").textContent = t("times", { n: r.playCount });
    $("rec-best").textContent = money(r.bestRevenue);
    $("rec-title").textContent = last ? endingText(last).title : r.lastTitle || "—";
    $("rec-count").textContent = t("records.count", { n: r.endings.length, total: D.endings.length });
    const list = $("rec-endings");
    list.textContent = "";
    D.endings.forEach(function (e, i) {
      const li = document.createElement("li");
      const seen = r.endings.indexOf(e.id) !== -1;
      li.className = "zukan__item" + (seen ? " zukan__item--seen" : "");
      const num = document.createElement("span");
      num.className = "zukan__num";
      num.textContent = I18n.ordinal(i);
      const text = endingText(e);
      const name = document.createElement("strong");
      name.textContent = seen ? text.name : t("records.unknown");
      const title = document.createElement("small");
      title.textContent = seen ? t("records.honor", { t: text.title }) : t("records.unseen");
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
    btn.setAttribute("aria-label", t(on ? "mute.off" : "mute.on"));
    btn.title = t(on ? "mute.off" : "mute.on");
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
          if (window.confirm(t("play.quit"))) quitToTitle();
        } else {
          App.exitApp();
        }
      });
    }
  }

  function init() {
    I18n.apply();
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { I18n.setLang(b.dataset.lang); });
    });
    I18n.onChange(syncMuteButton);

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

    $("btn-start").addEventListener("click", startWithAd);
    $("btn-howto").addEventListener("click", function () { openDialog($("dlg-howto")); });
    // 遊び方・記録を閉じてタイトル画面に戻るときも全画面広告を出す（閉じるボタン・Esc・戻るボタンのどれでも）
    ["dlg-howto", "dlg-records"].forEach(function (id) {
      $(id).addEventListener("close", function () {
        if (Ads.available) Ads.showInterstitial();
      });
    });
    $("btn-records").addEventListener("click", openRecords);
    $("btn-next").addEventListener("click", next);
    $("btn-retry").addEventListener("click", startWithAd);
    $("btn-redo").addEventListener("click", redo);
    $("btn-to-title").addEventListener("click", quitToTitle);
    $("share-native").addEventListener("click", shareNative);
    $("share-copy").addEventListener("click", copyShareUrl);
    document.addEventListener("keydown", onKey);
    setupApp();

    showScreen("title");
  }

  init();
})();
