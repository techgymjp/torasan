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
  const RECENT_KEY = "tankabai.recent.v1";
  const REGULARS_KEY = "tankabai.regulars.v1";
  const STOCK_KEY = "tankabai.stock.v1";
  const RECENT_MAX = 10; // 最近のプレイで出たイベントを、これだけ覚えて出にくくする
  const FX_DURATION = 1200;
  const SHARE_URL = "https://techgym.jp/column/claude-code-game-tankabai/";

  const $ = function (id) { return document.getElementById(id); };

  let state = L.createInitialState();
  let fxTimer = null;
  let storageOk = true;
  let mode = "day";         // "day"（1日の商売）/ "journey"（3つの町を回る旅）
  let journey = null;       // { index, results: [], carry }
  let beforeChoice = null;  // 口上を選ぶ直前の状態（リワード広告で言い直すため）
  let redoUsed = false;     // 言い直しは 1 プレイ 1 回まで

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
      lastTitle: typeof r.lastTitle === "string" ? r.lastTitle : null,
      journeyBest: Number.isFinite(r.journeyBest) ? r.journeyBest : 0,
      lastJourneyEnding: D.journeyEndings.some(function (e) { return e.id === r.lastJourneyEnding; }) ? r.lastJourneyEnding : null,
      journeyEndings: Array.isArray(r.journeyEndings)
        ? r.journeyEndings.filter(function (id) { return D.journeyEndings.some(function (e) { return e.id === id; }); })
        : []
    };
  }

  function saveRecords(changes) {
    writeJson(RECORDS_KEY, Object.assign(loadRecords(), changes));
  }

  // ---------- 常連帳（相性◎・×が出た口上を覚えておく） ----------

  function loadRegulars() {
    const r = readJson(REGULARS_KEY) || {};
    const out = {};
    Object.keys(D.characters).forEach(function (id) {
      const e = r[id] || {};
      const ok = function (list) { return Array.isArray(list) ? list.filter(function (x) { return L.CHOICE_TYPES[x]; }) : []; };
      out[id] = { likes: ok(e.likes), dislikes: ok(e.dislikes) };
    });
    return out;
  }

  function rememberAffinity(charId, type, affinity) {
    if (affinity !== "like" && affinity !== "dislike") return false;
    const book = loadRegulars();
    const list = book[charId][affinity === "like" ? "likes" : "dislikes"];
    if (list.indexOf(type) !== -1) return false;
    list.push(type);
    writeJson(REGULARS_KEY, book);
    return true;
  }

  function typeList(types) {
    return types.map(function (x) { return t("type." + x); }).join(I18n.lang === "ja" ? "・" : ", ");
  }

  function knownParts(charId) {
    const k = loadRegulars()[charId];
    const colon = I18n.lang === "ja" ? "：" : ": ";
    const parts = [];
    if (k.likes.length) parts.push(t("records.likes") + colon + typeList(k.likes));
    if (k.dislikes.length) parts.push(t("records.dislikes") + colon + typeList(k.dislikes));
    return parts.join(I18n.lang === "ja" ? "／" : " / ");
  }

  function knownLine(charId) {
    const list = knownParts(charId);
    return list ? t("play.known", { list: list }) : "";
  }

  function loadRecent() {
    const r = readJson(RECENT_KEY) || {};
    return Array.isArray(r.events) ? r.events.filter(function (id) { return typeof id === "string"; }) : [];
  }

  function saveRecent(used) {
    const merged = used.concat(loadRecent().filter(function (id) { return used.indexOf(id) === -1; }));
    writeJson(RECENT_KEY, { events: merged.slice(0, RECENT_MAX) });
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
      hint: en.hint || c.hint || en.trait || c.trait,
      reactions: Object.assign({}, c.reactions, en.reactions)
    };
  }

  function eventText(event) {
    const en = I18n.data("events", event.id);
    const choices = en.choices || {};
    return {
      title: en.title || event.title,
      dialogue: en.dialogue || event.dialogue,
      echo: event.echo ? en.echo || event.echo.text : "",
      product: event.product ? Object.assign({}, event.product, en.product) : null,
      choices: event.choices.map(function (c) { return Object.assign({}, c, choices[c.id]); })
    };
  }

  function townText(id) {
    const tw = D.towns.find(function (x) { return x.id === id; });
    const en = I18n.data("towns", id);
    return { name: en.name || tw.name, blurb: en.blurb || tw.blurb };
  }

  function journeyEndingText(ending) {
    const en = I18n.data("journeyEndings", ending.id);
    return { name: en.name || ending.name, title: en.title || ending.title, text: en.text || ending.text };
  }

  function goodText(id) {
    const g = D.goods.find(function (x) { return x.id === id; });
    const en = I18n.data("goods", id);
    return { icon: g.icon, cost: g.cost, name: en.name || g.name, blurb: en.blurb || g.blurb };
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
    ["title", "stock", "play", "result"].forEach(function (s) {
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
    $("hud-town").hidden = mode !== "journey";
    $("hud-town").textContent = mode === "journey"
      ? t("journey.hud", { n: journey.index + 1, total: D.towns.length, town: townText(state.town).name })
      : "";
    $("hud-goods").textContent = (state.goods || []).map(function (id) {
      const g = goodText(id);
      return g.icon + " " + g.name;
    }).join(I18n.lang === "ja" ? "　" : "  ");
    const m = state.momentum || 0;
    const max = L.MOMENTUM.max;
    $("momentum-pips").textContent = "●".repeat(m) + "○".repeat(max - m);
    $("momentum").classList.toggle("momentum--full", m >= max);
    $("momentum").setAttribute("aria-label", t("hud.momentumAria", { n: m }));
    $("momentum-note").textContent = m >= max ? t("hud.momentumFull") : "";
    document.body.classList.toggle("is-danger", state.trouble >= 70);
    Sound.setTension(state.trouble >= 70);
  }

  // ---------- 商売画面 ----------

  function renderEvent() {
    playFx("", null); // 前の幕のスタンプが残らないように消す
    const event = L.getCurrentEvent(state);
    const character = D.characters[event.character];
    const text = eventText(event);
    const who = charText(event.character);

    $("event-id").textContent = event.requiresTies ? t("play.followUpTag") : event.id;
    $("event-id").classList.toggle("stage__id--tie", !!event.requiresTies);
    $("event-title").textContent = text.title;
    $("char-name").textContent = who.name;
    $("char-role").textContent = who.role;
    const known = knownLine(event.character);
    $("char-trait").textContent = t("play.trait", { t: who.hint }) + (known ? (I18n.lang === "ja" ? "　" : " ") + known : "");
    const book = loadRegulars()[event.character];
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

      btn.append(key, tag);
      // 常連帳で分かっている好み・苦手を印で示す
      const mark = book.likes.indexOf(choice.type) !== -1 ? "like" : book.dislikes.indexOf(choice.type) !== -1 ? "dislike" : null;
      if (mark) {
        const badge = document.createElement("span");
        badge.className = "known known--" + mark;
        badge.textContent = t(mark === "like" ? "choice.knownLike" : "choice.knownDislike");
        btn.append(badge);
      }
      btn.append(line);
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
    beforeChoice = state;
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
    if (outcome.echoTie) notes.push(t("play.echo", { text: eventText(event).echo }));
    if (outcome.newTies.length) notes.push(t("play.tie"));
    if (outcome.goodsUsed.length) {
      notes.push(t("play.goods", { names: outcome.goodsUsed.map(function (id) { return goodText(id).name; }).join(I18n.lang === "ja" ? "・" : ", ") }));
    }
    if (outcome.busted) notes.push(t("play.bust"));
    else if (outcome.cashOut > 0) notes.push(t("play.cashOut", { amount: money(outcome.cashOut) }));
    else {
      if (outcome.momentumBonus > 0) notes.push(t("play.momentumBonus", { amount: money(outcome.momentumBonus) }));
      if (outcome.momentumAfter > outcome.momentumBefore) notes.push(t("play.momentumUp", { n: outcome.momentumAfter }));
      else if (outcome.momentumBefore > 0 && outcome.momentumAfter === 0) notes.push(t("play.momentumLost"));
    }
    if (rememberAffinity(event.character, outcome.choiceType, outcome.affinity)) notes.push(t("play.learned", { name: who.name }));
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
    setupRedo(outcome);
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

    saveRecent(state.usedEvents);
    if (mode === "journey") {
      finishTown();
      return;
    }
    saveRecords({
      bestRevenue: Math.max(records.bestRevenue, state.revenue),
      endings: isNew ? records.endings.concat(ending.id) : records.endings,
      playCount: records.playCount + 1,
      lastEnding: ending.id,
      lastJourneyEnding: null,
      lastTitle: ending.title
    });

    const text = endingText(ending);
    showEnding(t("result.ending", { name: text.name }), text.text, text.title);
    $("badge-new").hidden = !isNew;
    $("badge-best").hidden = !(isBest && state.revenue > 0);
    setupShare(t("share.text", { name: text.name, title: text.title, revenue: money(state.revenue) }));
    setResultButtons(false);
    fillResult();
    $("journey-log").hidden = true;
    closeResult(ending.id === "chaos");
  }

  function showEnding(name, text, title) {
    $("ending-name").textContent = name;
    $("ending-text").textContent = text;
    $("ending-title").textContent = title || "";
    $("ending-honor").hidden = !title;
  }

  // 旅の途中なら「次の町へ」、それ以外は「もう一度」
  function setResultButtons(midJourney) {
    $("btn-next-town").hidden = !midJourney;
    $("btn-retry").hidden = midJourney;
    $("btn-retry").textContent = t(mode === "journey" ? "journey.again" : "result.retry");
    document.querySelector(".share").hidden = midJourney;
  }

  // 旅：町ごとの結果。最後の町なら旅全体の結末
  function finishTown() {
    const town = D.towns[journey.index];
    journey.results.push({ town: town.id, revenue: state.revenue, humanity: state.humanity, ending: state.ending });
    journey.carry = L.carryOver(state);
    const last = journey.index >= D.towns.length - 1;
    const log = $("journey-log");
    log.textContent = "";
    journey.results.forEach(function (r, i) {
      const li = document.createElement("li");
      li.textContent = t("journey.logLine", {
        n: i + 1, town: townText(r.town).name, revenue: money(r.revenue), humanity: r.humanity
      });
      log.appendChild(li);
    });
    const summary = L.summarizeJourney(journey.results);
    if (journey.results.length > 1) {
      const li = document.createElement("li");
      li.className = "journey-log__total";
      li.textContent = t("journey.total", { revenue: money(summary.revenue) });
      log.appendChild(li);
    }
    log.hidden = false;

    if (!last) {
      showEnding(
        t("journey.townDone", { n: journey.index + 1, town: townText(town.id).name }),
        t("journey.townText", { humanity: journey.carry.humanity, next: townText(D.towns[journey.index + 1].id).name }),
        ""
      );
      $("badge-new").hidden = true;
      $("badge-best").hidden = true;
      setResultButtons(true);
      fillResult();
      closeResult(state.ending === "chaos");
      return;
    }

    const ending = L.judgeJourney(journey.results);
    const records = loadRecords();
    const isNew = records.journeyEndings.indexOf(ending.id) === -1;
    const isBest = summary.revenue > records.journeyBest;
    saveRecords({
      journeyBest: Math.max(records.journeyBest, summary.revenue),
      journeyEndings: isNew ? records.journeyEndings.concat(ending.id) : records.journeyEndings,
      playCount: records.playCount + 1,
      lastTitle: ending.title,
      lastEnding: null,
      lastJourneyEnding: ending.id
    });
    const text = journeyEndingText(ending);
    showEnding(t("journey.ending", { name: text.name }), text.text, text.title);
    $("badge-new").hidden = !isNew;
    // 自己ベストは旅の合計の行に付ける（売上の欄はこの町だけの売上なので）
    $("badge-best").hidden = true;
    const totalLine = log.querySelector(".journey-log__total");
    if (totalLine && isBest && summary.revenue > 0) totalLine.textContent += " " + t("journey.best");
    setupShare(t("share.journeyText", { name: text.name, title: text.title, revenue: money(summary.revenue) }));
    setResultButtons(false);
    fillResult();
    closeResult(ending.id === "j_chaos");
  }

  function fillResult() {
    $("res-revenue").textContent = money(state.revenue);
    $("res-customers").textContent = t("people", { n: state.customers });
    $("res-laughter").textContent = state.laughter;
    $("res-humanity").textContent = state.humanity;
    $("res-trouble").textContent = state.trouble;
    $("res-cost").textContent = money(L.stockCost(state.goods));

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
  }

  function closeResult(bad) {
    document.body.classList.remove("is-danger");
    Sound.setTension(false);
    Sound.setMusic("ending");
    Sound.sfx.curtain(bad);
    showScreen("result");
    $("ending-name").focus({ preventScroll: true });
  }

  // ---------- シェア ----------

  let shareData = null;

  function setupShare(text) {
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

  // 「大失敗！」などが出た直後だけ、言い直しのボタンを出す（1 プレイ 1 回）
  function setupRedo(outcome) {
    const btn = $("btn-redo");
    btn.hidden = !(Ads.available && !redoUsed && outcome.stamp && outcome.stamp.kind === "bad");
    btn.disabled = false;
    btn.textContent = t("redo.button");
    $("redo-note").textContent = "";
  }

  // リワード広告を最後まで見たら、いまの幕の口上を選び直せる
  async function redo() {
    const btn = $("btn-redo");
    if (btn.disabled || !beforeChoice || redoUsed) return;
    btn.disabled = true;
    btn.textContent = t("redo.loading");
    const result = await Ads.showRewarded();
    if (state.status !== "playing" || state.phase !== "reacting") return;
    if (result !== "rewarded") {
      btn.disabled = false;
      btn.textContent = t("redo.button");
      $("redo-note").textContent = t(result === "unavailable" ? "redo.unavailable" : "redo.skipped");
      return;
    }
    redoUsed = true;
    state = beforeChoice;
    beforeChoice = null;
    renderEvent();
    announce(t("redo.done"));
    $("event-title").focus({ preventScroll: true });
  }

  // ---------- 仕入れ ----------

  let stockPick = L.validStock((readJson(STOCK_KEY) || {}).goods || ["candy", "opener", "whistle"]);

  function renderStock() {
    const spent = L.stockCost(stockPick);
    $("stock-budget").textContent = t("stock.budget", {
      left: money(D.stockBudget - spent), budget: money(D.stockBudget), n: stockPick.length, max: D.stockMax
    });
    const list = $("stock-list");
    list.textContent = "";
    D.goods.forEach(function (g) {
      const picked = stockPick.indexOf(g.id) !== -1;
      const fits = picked || (stockPick.length < D.stockMax && spent + g.cost <= D.stockBudget);
      const text = goodText(g.id);
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "good" + (picked ? " good--on" : "");
      btn.setAttribute("aria-pressed", String(picked));
      btn.disabled = !fits;
      const icon = document.createElement("span");
      icon.className = "good__icon";
      icon.textContent = text.icon;
      const name = document.createElement("strong");
      name.className = "good__name";
      name.textContent = text.name;
      const cost = document.createElement("span");
      cost.className = "good__cost";
      cost.textContent = money(g.cost);
      const blurb = document.createElement("span");
      blurb.className = "good__blurb";
      blurb.textContent = text.blurb;
      btn.append(icon, name, cost, blurb);
      btn.addEventListener("click", function () {
        stockPick = picked ? stockPick.filter(function (id) { return id !== g.id; }) : L.validStock(stockPick.concat(g.id));
        writeJson(STOCK_KEY, { goods: stockPick });
        renderStock();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    $("btn-open").disabled = stockPick.length === 0;
  }

  function goStock() {
    Sound.unlock();
    const town = mode === "journey" ? D.towns[journey.index] : null;
    $("stock-heading").textContent = town
      ? t("journey.stockHeading", { n: journey.index + 1, town: townText(town.id).name })
      : t("stock.heading");
    $("stock-town").hidden = !town;
    $("stock-town").textContent = town ? townText(town.id).blurb : "";
    renderStock();
    showScreen("stock");
    $("stock-heading").focus({ preventScroll: true });
  }

  function beginJourney() {
    mode = "journey";
    journey = { index: 0, results: [], carry: null };
    goStock();
  }

  let startBusy = false;

  // 開店（「商売を始める」「もう一度商売する」→仕入れ→開店）のたびに、全画面広告を出してから始める
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
    const options = { goods: stockPick };
    if (mode === "journey") {
      options.town = D.towns[journey.index].id;
      if (journey.carry) Object.assign(options, journey.carry);
    }
    state = L.startGame(undefined, loadRecent(), options);
    beforeChoice = null;
    redoUsed = false;
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
    const lastJourney = D.journeyEndings.find(function (e) { return e.id === r.lastJourneyEnding; });
    $("rec-title").textContent = last ? endingText(last).title
      : lastJourney ? journeyEndingText(lastJourney).title : r.lastTitle || "—";
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
    const regulars = $("rec-regulars");
    regulars.textContent = "";
    const book = loadRegulars();
    Object.keys(D.characters).forEach(function (id) {
      const k = book[id];
      if (!k.likes.length && !k.dislikes.length) return;
      const li = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = charText(id).name;
      const line = document.createElement("span");
      line.textContent = knownParts(id);
      li.append(name, line);
      regulars.appendChild(li);
    });
    $("rec-regulars-empty").hidden = regulars.children.length > 0;
    $("rec-journey-count").textContent = t("records.count", { n: r.journeyEndings.length, total: D.journeyEndings.length });
    $("rec-journey-best").textContent = t("records.journeyBest", { revenue: money(r.journeyBest) });
    const jl = $("rec-journeys");
    jl.textContent = "";
    D.journeyEndings.forEach(function (e, i) {
      const seen = r.journeyEndings.indexOf(e.id) !== -1;
      const text = journeyEndingText(e);
      const li = document.createElement("li");
      li.className = "zukan__item" + (seen ? " zukan__item--seen" : "");
      const num = document.createElement("span");
      num.className = "zukan__num";
      num.textContent = I18n.ordinal(i);
      const name = document.createElement("strong");
      name.textContent = seen ? text.name : t("records.unknown");
      const title = document.createElement("small");
      title.textContent = seen ? t("records.honor", { t: text.title }) : t("records.unseen");
      li.append(num, name, title);
      jl.appendChild(li);
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
        } else if (!$("screen-stock").hidden) {
          toTitle();
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

    $("btn-start").addEventListener("click", function () {
      mode = "day";
      journey = null;
      goStock();
    });
    $("btn-journey").addEventListener("click", beginJourney);
    $("btn-next-town").addEventListener("click", function () {
      if (!journey) return;
      journey.index++;
      goStock();
    });
    $("btn-open").addEventListener("click", startWithAd);
    $("btn-stock-back").addEventListener("click", toTitle);
    $("btn-howto").addEventListener("click", function () { openDialog($("dlg-howto")); });
    // 遊び方・記録を閉じてタイトル画面に戻るときも全画面広告を出す（閉じるボタン・Esc・戻るボタンのどれでも）
    ["dlg-howto", "dlg-records"].forEach(function (id) {
      $(id).addEventListener("close", function () {
        if (Ads.available) Ads.showInterstitial();
      });
    });
    $("btn-records").addEventListener("click", openRecords);
    $("btn-next").addEventListener("click", next);
    $("btn-retry").addEventListener("click", function () {
      if (mode === "journey") beginJourney();
      else goStock();
    });
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
