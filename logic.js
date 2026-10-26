/*
 * ゲームロジック（DOM に依存しない純粋な処理）
 * ブラウザでは window.TankaLogic、Node では module.exports として使う。
 * 状態は毎回新しいオブジェクトとして返し、元の状態は変更しない。
 */
(function (root) {
  "use strict";

  const Data = root.TankaData;

  const MAX_TURNS = 5;
  const MID_TURN = 3;

  const CHOICE_TYPES = {
    bluff: { label: "大風呂敷" },
    wit: { label: "機転" },
    honest: { label: "正直" },
    flatter: { label: "お世辞" },
    help: { label: "お助け" }
  };

  // 客との相性による補正
  const AFFINITY = {
    likeRevenueRate: 1.5,
    dislikeRevenueRate: 0.5,
    likeBonus: { laughter: 5, humanity: 3 },
    dislikePenalty: { humanity: -5, trouble: 5 }
  };

  // 大風呂敷を2回続けると「調子に乗りすぎ」で騒動が上乗せされる
  const OVERHEAT_TROUBLE = 8;

  // 一度に大きな笑いを取ると、見物人が集まって客が2人増える
  const CROWD_LAUGHTER = 15;

  // 最近のプレイで見たイベントは出にくくする（重みに掛ける）
  const RECENT_WEIGHT = 0.2;

  function createInitialState() {
    return {
      turn: 0,
      maxTurns: MAX_TURNS,
      revenue: 0,
      laughter: 10,
      humanity: 30,
      trouble: 0,
      customers: 0,
      usedEvents: [],
      recentEvents: [],
      ties: [],
      history: [],
      status: "title",
      phase: null,
      currentEventId: null,
      lastChoiceType: null,
      ending: null
    };
  }

  function clampStat(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function clampRevenue(value) {
    return Math.max(0, Math.round(value));
  }

  function meetsCondition(state, condition) {
    if (!condition) return true;
    return Object.keys(condition).every(function (key) {
      const range = condition[key];
      const value = state[key];
      if (typeof value !== "number") return false;
      if (range.min !== undefined && value < range.min) return false;
      if (range.max !== undefined && value > range.max) return false;
      return true;
    });
  }

  function tierForTurn(turn, maxTurns) {
    if (turn === maxTurns) return "final";
    if (turn === MID_TURN) return "mid";
    return "normal";
  }

  function getEvent(id) {
    return Data.events.find(function (e) { return e.id === id; }) || null;
  }

  function getCurrentEvent(state) {
    return state.currentEventId ? getEvent(state.currentEventId) : null;
  }

  function hasTies(state, ties) {
    return !ties || ties.every(function (t) { return state.ties.indexOf(t) !== -1; });
  }

  function pickEvent(state, turn, rng) {
    const tier = tierForTurn(turn, state.maxTurns);
    const unused = Data.events.filter(function (e) { return state.usedEvents.indexOf(e.id) === -1; });
    const allowed = unused.filter(function (e) { return meetsCondition(state, e.condition) && hasTies(state, e.requiresTies); });
    const free = unused.filter(function (e) { return !e.requiresTies; });
    const pools = [
      allowed.filter(function (e) { return e.tier === tier; }),
      allowed.filter(function (e) { return e.tier === "normal"; }),
      allowed,
      free,
      Data.events.filter(function (e) { return !e.requiresTies; })
    ];
    const pool = pools.find(function (p) { return p.length > 0; });
    // weight が大きいイベントほど選ばれやすい（省略時は1）。最近見たイベントは出にくい
    const weights = pool.map(function (e) {
      return (e.weight || 1) * (state.recentEvents.indexOf(e.id) !== -1 ? RECENT_WEIGHT : 1);
    });
    const total = weights.reduce(function (a, b) { return a + b; }, 0);
    let r = rng() * total;
    for (let i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r < 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function beginTurn(state, rng) {
    const turn = state.turn + 1;
    const event = pickEvent(state, turn, rng);
    return Object.assign({}, state, {
      turn: turn,
      phase: "choosing",
      currentEventId: event.id,
      usedEvents: state.usedEvents.concat(event.id)
    });
  }

  // recentEvents：最近のプレイで出たイベント ID（出にくくする。保存は画面側）
  function startGame(rng, recentEvents) {
    const state = Object.assign(createInitialState(), {
      status: "playing",
      recentEvents: Array.isArray(recentEvents) ? recentEvents.slice() : []
    });
    return beginTurn(state, rng || Math.random);
  }

  function affinityFor(character, type) {
    if (character.likes && character.likes.indexOf(type) !== -1) return "like";
    if (character.dislikes && character.dislikes.indexOf(type) !== -1) return "dislike";
    return "neutral";
  }

  function pickStamp(type, affinity, overheated, deltas) {
    if (overheated) return { id: "overheat", text: "調子に乗りすぎ！", kind: "bad" };
    if (affinity === "dislike") return { id: "flop", text: "大失敗！", kind: "bad" };
    if (deltas.laughter >= CROWD_LAUGHTER) return { id: "hit", text: "大ウケ！", kind: "good" };
    if (deltas.trouble >= 15) return { id: "uproar", text: "大騒ぎ！", kind: "bad" };
    if (deltas.humanity >= 12) return { id: "ninjo", text: "人情！", kind: "warm" };
    if (deltas.revenue > 0) return { id: "sale", text: "毎度あり！", kind: "good" };
    return null;
  }

  function pickExpression(affinity, deltas) {
    if (affinity === "like") return "happy";
    if (affinity === "dislike") return "angry";
    if (deltas.trouble >= 10) return "surprised";
    if (deltas.laughter >= 10 || deltas.humanity >= 10) return "happy";
    return "normal";
  }

  /*
   * 口上を選んだ結果を反映する。
   * 不正な状態・ID の場合は null を返し、状態は変えない。
   */
  function applyChoice(state, choiceId) {
    if (!state || state.status !== "playing" || state.phase !== "choosing") return null;
    const event = getCurrentEvent(state);
    if (!event) return null;
    const choice = event.choices.find(function (c) { return c.id === choiceId; });
    if (!choice) return null;
    const character = Data.characters[event.character];

    const base = choice.effects;
    let revenue = base.revenue || 0;
    let laughter = base.laughter || 0;
    let humanity = base.humanity || 0;
    let trouble = base.trouble || 0;

    const affinity = affinityFor(character, choice.type);
    if (affinity === "like") {
      if (revenue > 0) revenue *= AFFINITY.likeRevenueRate;
      laughter += AFFINITY.likeBonus.laughter;
      humanity += AFFINITY.likeBonus.humanity;
    } else if (affinity === "dislike") {
      if (revenue > 0) revenue *= AFFINITY.dislikeRevenueRate;
      humanity += AFFINITY.dislikePenalty.humanity;
      trouble += AFFINITY.dislikePenalty.trouble;
    }

    const overheated = choice.type === "bluff" && state.lastChoiceType === "bluff";
    if (overheated) trouble += OVERHEAT_TROUBLE;

    // 前の幕で結んだ縁が、この幕で効いてくる
    const echo = event.echo && state.ties.indexOf(event.echo.tie) !== -1 ? event.echo : null;
    if (echo) {
      revenue += echo.effects.revenue || 0;
      laughter += echo.effects.laughter || 0;
      humanity += echo.effects.humanity || 0;
      trouble += echo.effects.trouble || 0;
    }
    const newTies = (choice.ties || []).filter(function (t) { return state.ties.indexOf(t) === -1; });

    revenue = Math.round(revenue / 10) * 10;
    const newCustomers = revenue > 0 ? (laughter >= CROWD_LAUGHTER ? 2 : 1) : 0;

    const next = Object.assign({}, state, {
      revenue: clampRevenue(state.revenue + revenue),
      laughter: clampStat(state.laughter + laughter),
      humanity: clampStat(state.humanity + humanity),
      trouble: clampStat(state.trouble + trouble),
      customers: state.customers + newCustomers,
      phase: "reacting",
      lastChoiceType: choice.type,
      ties: state.ties.concat(newTies)
    });

    // 範囲補正後の実際の変化量
    const deltas = {
      revenue: next.revenue - state.revenue,
      laughter: next.laughter - state.laughter,
      humanity: next.humanity - state.humanity,
      trouble: next.trouble - state.trouble,
      customers: next.customers - state.customers
    };

    next.history = state.history.concat({
      turn: state.turn,
      eventId: event.id,
      eventTitle: event.title,
      choiceId: choice.id,
      choiceType: choice.type,
      choiceText: choice.text,
      affinity: affinity,
      overheated: overheated,
      deltas: deltas
    });

    const reactionText =
      affinity === "like" ? character.reactions.like :
      affinity === "dislike" ? character.reactions.dislike : "";

    return {
      state: next,
      outcome: {
        eventId: event.id,
        choiceId: choice.id,
        choiceType: choice.type,
        affinity: affinity,
        overheated: overheated,
        deltas: deltas,
        resultText: choice.result,
        reactionText: reactionText,
        echoTie: echo ? echo.tie : null,
        newTies: newTies,
        followUp: !!event.requiresTies,
        stamp: pickStamp(choice.type, affinity, overheated, deltas),
        expression: pickExpression(affinity, deltas),
        isLastTurn: state.turn >= state.maxTurns
      }
    };
  }

  function judgeEnding(state) {
    const endings = Data.endings;
    return endings.find(function (e) { return meetsCondition(state, e.condition); }) || endings[endings.length - 1];
  }

  /*
   * 結果表示のあとに呼ぶ。最終幕なら結果画面へ、そうでなければ次の幕へ進む。
   */
  function advance(state, rng) {
    if (!state || state.status !== "playing" || state.phase !== "reacting") return null;
    if (state.turn >= state.maxTurns) {
      return Object.assign({}, state, {
        status: "result",
        phase: null,
        ending: judgeEnding(state).id
      });
    }
    return beginTurn(state, rng || Math.random);
  }

  const api = {
    CHOICE_TYPES: CHOICE_TYPES,
    MAX_TURNS: MAX_TURNS,
    createInitialState: createInitialState,
    startGame: startGame,
    applyChoice: applyChoice,
    advance: advance,
    judgeEnding: judgeEnding,
    meetsCondition: meetsCondition,
    getEvent: getEvent,
    getCurrentEvent: getCurrentEvent,
    affinityFor: affinityFor,
    clampStat: clampStat,
    clampRevenue: clampRevenue
  };

  root.TankaLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
