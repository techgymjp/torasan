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

  // 勢い：笑いを取ると 1 つずつたまり（最大 3）、押す口上の売上が伸びる。
  // 満タンで大風呂敷を切ると大騒動。正直・お助けに切り替えると勢いを売上に変えて手放す
  const MOMENTUM = {
    max: 3,
    gainLaughter: 10,          // この笑いを取ると勢いが 1 たまる
    pushTypes: ["bluff", "wit", "flatter"],
    cashTypes: ["honest", "help"],
    revenueRate: { bluff: 0.35, wit: 0, flatter: 0 }, // 大風呂敷の売上 × (1 + 率 × 勢い)。機転・お世辞は勢いをためるだけ
    cashPerLevel: 400,         // 切り替えたときの締めの一言：勢い 1 につき 400 円
    bustTrouble: 15            // 満タンで大風呂敷を切ったときの騒動
  };

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
      seenEvents: [],
      ties: [],
      momentum: 0,
      goods: [],
      town: "hiyori",
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
    const here = function (e) { return !e.town || e.town === state.town; };
    const unused = Data.events.filter(function (e) { return state.usedEvents.indexOf(e.id) === -1 && here(e); });
    const allowed = unused.filter(function (e) { return meetsCondition(state, e.condition) && hasTies(state, e.requiresTies); });
    const free = unused.filter(function (e) { return !e.requiresTies; });
    // 旅の中ですでに見た場面は、ほかに候補があるかぎり出さない
    const fresh = allowed.filter(function (e) { return state.seenEvents.indexOf(e.id) === -1; });
    const pools = [
      fresh.filter(function (e) { return e.tier === tier; }),
      allowed.filter(function (e) { return e.tier === tier; }),
      fresh.filter(function (e) { return e.tier === "normal"; }),
      allowed.filter(function (e) { return e.tier === "normal"; }),
      allowed,
      free,
      Data.events.filter(function (e) { return !e.requiresTies && here(e); })
    ];
    const pool = pools.find(function (p) { return p.length > 0; });
    // weight が大きいイベントほど選ばれやすい（省略時は1）。最近見たイベントは出にくい
    const weights = pool.map(function (e) {
      return (e.weight || 1) *
        (state.recentEvents.indexOf(e.id) !== -1 ? RECENT_WEIGHT : 1);
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

  // 仕入れの品を確かめる：知らない ID・重複を除き、個数と予算の範囲に収める
  function validStock(ids) {
    const list = Data.goods || [];
    const out = [];
    let spent = 0;
    (Array.isArray(ids) ? ids : []).forEach(function (id) {
      const g = list.find(function (x) { return x.id === id; });
      if (!g || out.indexOf(id) !== -1) return;
      if (out.length >= Data.stockMax || spent + g.cost > Data.stockBudget) return;
      out.push(id);
      spent += g.cost;
    });
    return out;
  }

  function stockCost(ids) {
    return validStock(ids).reduce(function (sum, id) {
      return sum + Data.goods.find(function (g) { return g.id === id; }).cost;
    }, 0);
  }

  // recentEvents：最近のプレイで出たイベント ID（出にくくする。保存は画面側）
  // options.goods：開店前に仕入れた品の ID
  // options.town / humanity / ties：旅モードで町と、前の町から持ち越した評判・縁
  function startGame(rng, recentEvents, options) {
    const o = options || {};
    const towns = (Data.towns || []).map(function (t) { return t.id; });
    const state = Object.assign(createInitialState(), {
      status: "playing",
      recentEvents: Array.isArray(recentEvents) ? recentEvents.slice() : [],
      goods: validStock(o.goods)
    });
    if (towns.indexOf(o.town) !== -1) state.town = o.town;
    if (typeof o.humanity === "number") state.humanity = clampStat(o.humanity);
    if (Array.isArray(o.ties)) state.ties = o.ties.slice();
    if (Array.isArray(o.seen)) state.seenEvents = o.seen.slice();
    return beginTurn(state, rng || Math.random);
  }

  // ---------- 旅モード ----------

  // 旅で次に行ける町：まだ行っていない町のうち、順番がいちばん早い町（すべて回ったら空）
  function openTowns(route) {
    route = route || [];
    const next = (Data.towns || []).find(function (t) { return route.indexOf(t.id) === -1; });
    return next ? [next.id] : [];
  }

  // 町を出るとき、人情（評判）の半分と縁を次の町へ持ち越す
  function carryOver(state) {
    const start = createInitialState().humanity;
    return {
      humanity: clampStat(start + Math.round((state.humanity - start) / 2)),
      ties: state.ties.slice(),
      seen: (state.seenEvents || []).concat(state.usedEvents)
    };
  }

  // results：町ごとの結果 { revenue, humanity, ending } の配列（回った順）
  function summarizeJourney(results) {
    return {
      revenue: results.reduce(function (sum, r) { return sum + r.revenue; }, 0),
      humanity: results.length ? results[results.length - 1].humanity : 0,
      chaos: results.filter(function (r) { return r.ending === "chaos"; }).length
    };
  }

  function judgeJourney(results) {
    const summary = summarizeJourney(results);
    const list = Data.journeyEndings;
    return list.find(function (e) { return meetsCondition(summary, e.condition); }) || list[list.length - 1];
  }

  // この幕で効く仕入れの品
  function goodsFor(state, event, choice) {
    const tier = tierForTurn(state.turn, state.maxTurns);
    return (state.goods || []).map(function (id) {
      return Data.goods.find(function (g) { return g.id === id; });
    }).filter(function (g) {
      const e = g && g.effect;
      if (!e) return false;
      if (e.types && e.types.indexOf(choice.type) === -1) return false;
      if (e.characters && e.characters.indexOf(event.character) === -1) return false;
      if (e.tiers && e.tiers.indexOf(tier) === -1) return false;
      return true;
    });
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
    const echo = event.echo && state.ties.indexOf(event.echo.tie) !== -1 &&
      (!event.echo.town || event.echo.town === state.town) ? event.echo : null;
    if (echo) {
      revenue += echo.effects.revenue || 0;
      laughter += echo.effects.laughter || 0;
      humanity += echo.effects.humanity || 0;
      trouble += echo.effects.trouble || 0;
    }
    const newTies = (choice.ties || []).filter(function (t) { return state.ties.indexOf(t) === -1; });

    // 仕入れの品
    const goodsUsed = goodsFor(state, event, choice);
    goodsUsed.forEach(function (g) {
      if (g.effect.revenueRate && revenue > 0) revenue *= 1 + g.effect.revenueRate;
      laughter += g.effect.laughter || 0;
      humanity += g.effect.humanity || 0;
    });

    // 勢い
    const before = state.momentum || 0;
    let after = before;
    let busted = false;
    let cashOut = 0;
    let momentumBonus = 0;
    if (choice.type === "bluff" && before >= MOMENTUM.max) {
      busted = true;
      trouble += MOMENTUM.bustTrouble;
      after = 0;
    } else if (MOMENTUM.cashTypes.indexOf(choice.type) !== -1) {
      cashOut = MOMENTUM.cashPerLevel * before;
      revenue += cashOut;
      after = 0;
    } else {
      if (MOMENTUM.pushTypes.indexOf(choice.type) !== -1 && revenue > 0) {
        momentumBonus = revenue * MOMENTUM.revenueRate[choice.type] * before;
        revenue += momentumBonus;
      }
      if (affinity === "dislike" || overheated) after = 0;
      else if (laughter >= MOMENTUM.gainLaughter) after = Math.min(MOMENTUM.max, before + 1);
    }

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
      ties: state.ties.concat(newTies),
      momentum: after
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
        momentumBefore: before,
        momentumAfter: after,
        momentumBonus: Math.round(momentumBonus / 10) * 10,
        cashOut: cashOut,
        busted: busted,
        goodsUsed: goodsUsed.map(function (g) { return g.id; }),
        stamp: busted ? { id: "bust", text: "勢い余って大騒動！", kind: "bad" } : pickStamp(choice.type, affinity, overheated, deltas),
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
    MOMENTUM: MOMENTUM,
    validStock: validStock,
    carryOver: carryOver,
    openTowns: openTowns,
    summarizeJourney: summarizeJourney,
    judgeJourney: judgeJourney,
    stockCost: stockCost,
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
