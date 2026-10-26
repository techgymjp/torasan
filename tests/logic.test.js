"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

require("../data/characters.js");
require("../data/events.js");
require("../data/endings.js");
require("../data/goods.js");
require("../data/towns.js");
const L = require("../logic.js");
const D = globalThis.TankaData;

// 再現性のある乱数
function seeded(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function playThrough(rng, pickChoice) {
  let state = L.startGame(rng);
  const seen = [state];
  while (state.status === "playing") {
    const event = L.getCurrentEvent(state);
    const result = L.applyChoice(state, pickChoice(event, state));
    state = L.advance(result.state, rng);
    seen.push(result.state, state);
  }
  return { final: state, seen: seen };
}

test("データ定義：イベント10種・各3択・既知のタイプと人物", () => {
  assert.ok(D.events.length >= 10);
  const ids = new Set();
  for (const e of D.events) {
    assert.ok(!ids.has(e.id), `重複ID ${e.id}`);
    ids.add(e.id);
    assert.ok(D.characters[e.character], `${e.id} の人物が未定義`);
    assert.ok(["normal", "mid", "final"].includes(e.tier));
    assert.equal(e.choices.length, 3, `${e.id} の選択肢が3つでない`);
    for (const c of e.choices) {
      assert.ok(L.CHOICE_TYPES[c.type], `${e.id}-${c.id} の type が不正`);
      for (const k of ["revenue", "laughter", "humanity", "trouble"]) {
        assert.equal(typeof c.effects[k], "number", `${e.id}-${c.id} の ${k}`);
      }
      assert.ok(c.text && c.result);
    }
  }
});

test("データ定義：エンディングは最後が無条件", () => {
  assert.deepEqual(D.endings.map((e) => e.id), ["chaos", "humanity", "prosperity", "laughter", "wander"]);
  assert.equal(D.endings[D.endings.length - 1].condition, null);
});

test("開始直後の状態", () => {
  const s = L.startGame(seeded(1));
  assert.equal(s.status, "playing");
  assert.equal(s.phase, "choosing");
  assert.equal(s.turn, 1);
  assert.equal(s.revenue, 0);
  assert.equal(s.laughter, 10);
  assert.equal(s.humanity, 30);
  assert.equal(s.trouble, 0);
  assert.equal(L.getEvent(s.currentEventId).tier, "normal");
});

test("5幕で終わり、3幕目は中規模・5幕目は最終イベント、重複なし", () => {
  for (let seed = 0; seed < 300; seed++) {
    const rng = seeded(seed);
    const { final } = playThrough(rng, (e) => e.choices[Math.floor(rng() * 3)].id);
    assert.equal(final.status, "result");
    assert.equal(final.history.length, 5);
    assert.equal(new Set(final.usedEvents).size, 5);
    assert.equal(L.getEvent(final.history[2].eventId).tier, "mid");
    assert.equal(L.getEvent(final.history[4].eventId).tier, "final");
    assert.ok(D.endings.some((e) => e.id === final.ending));
  }
});

test("すべてのイベントが実際のプレイで登場する（すべての町）", () => {
  const seen = new Set();
  const towns = D.towns.map((t) => t.id);
  for (let seed = 0; seed < 3000; seed++) {
    const rng = seeded(seed);
    let s = L.startGame(rng, [], { town: towns[seed % towns.length] });
    while (s.status === "playing") {
      const e = L.getCurrentEvent(s);
      s = L.advance(L.applyChoice(s, e.choices[Math.floor(rng() * 3)].id).state, rng);
    }
    s.usedEvents.forEach((id) => seen.add(id));
  }
  for (const e of D.events) assert.ok(seen.has(e.id), `未登場: ${e.id}`);
});

test("「おかみさんの叱責」は騒動15未満では出ない", () => {
  for (let seed = 0; seed < 500; seed++) {
    const rng = seeded(seed);
    const { final } = playThrough(rng, (e) => (e.choices.find((c) => c.type !== "bluff") || e.choices[0]).id);
    const idx = final.history.findIndex((h) => h.eventId === "E07");
    if (idx === -1) continue;
    const troubleBefore = final.history.slice(0, idx).reduce((t, h) => t + h.deltas.trouble, 0);
    assert.ok(troubleBefore >= 15, `騒動${troubleBefore}で発生`);
  }
});

test("パラメーターは0〜100、売上は負にならない", () => {
  for (let seed = 0; seed < 300; seed++) {
    const rng = seeded(seed);
    const { seen } = playThrough(rng, (e) => e.choices[Math.floor(rng() * 3)].id);
    for (const s of seen) {
      for (const k of ["laughter", "humanity", "trouble"]) {
        assert.ok(s[k] >= 0 && s[k] <= 100, `${k}=${s[k]}`);
      }
      assert.ok(s.revenue >= 0);
      assert.ok(s.customers >= 0);
    }
  }
});

test("売上が0のときに赤字の選択をしても負数にならない", () => {
  let s = L.startGame(seeded(2));
  s = Object.assign({}, s, { currentEventId: "E08", revenue: 0 });
  const r = L.applyChoice(s, "A"); // お助け：売上 -500
  assert.equal(r.state.revenue, 0);
  assert.equal(r.outcome.deltas.revenue, 0);
});

test("不正な操作は無視される（二重選択・存在しないID・結果画面）", () => {
  const s = L.startGame(seeded(3));
  assert.equal(L.applyChoice(s, "Z"), null);
  const r = L.applyChoice(s, "A");
  assert.equal(L.applyChoice(r.state, "B"), null, "結果表示中は再選択できない");
  assert.equal(L.advance(s), null, "未選択のまま次へは進めない");
  assert.equal(L.applyChoice(L.createInitialState(), "A"), null);
  assert.equal(L.applyChoice(Object.assign({}, r.state, { status: "result" }), "A"), null);
});

test("元の状態オブジェクトは変更されない", () => {
  const s = L.startGame(seeded(4));
  const snapshot = JSON.stringify(s);
  L.applyChoice(s, "A");
  assert.equal(JSON.stringify(s), snapshot);
});

test("相性：好む口上は売上1.5倍、嫌う口上は半分＋騒動", () => {
  const base = Object.assign(L.startGame(seeded(5)), { currentEventId: "E06" }); // 源造
  const liked = L.applyChoice(base, "A").outcome; // honest：好む
  assert.equal(liked.affinity, "like");
  assert.equal(liked.deltas.revenue, 1800);
  const disliked = L.applyChoice(base, "B").outcome; // bluff：嫌う
  assert.equal(disliked.affinity, "dislike");
  assert.equal(disliked.deltas.revenue, 750);
  assert.equal(disliked.deltas.trouble, 17);
});

test("大風呂敷の連続で「調子に乗りすぎ」になる", () => {
  let s = Object.assign(L.startGame(seeded(6)), { currentEventId: "E02" });
  const first = L.applyChoice(s, "A");
  assert.equal(first.outcome.overheated, false);
  s = Object.assign({}, first.state, { phase: "choosing", currentEventId: "E03" });
  const second = L.applyChoice(s, "C");
  assert.equal(second.outcome.overheated, true);
  assert.equal(second.outcome.deltas.trouble, 16 + 8);
  assert.equal(second.outcome.stamp.kind, "bad");
});

test("エンディング判定の優先順位", () => {
  const base = L.createInitialState();
  const judge = (o) => L.judgeEnding(Object.assign({}, base, o)).id;
  assert.equal(judge({ trouble: 85, humanity: 100, revenue: 9000, laughter: 100 }), "chaos");
  assert.equal(judge({ trouble: 84, humanity: 75, revenue: 9000, laughter: 90 }), "humanity");
  assert.equal(judge({ humanity: 74, revenue: 8000, laughter: 60 }), "prosperity");
  assert.equal(judge({ trouble: 84, humanity: 74, laughter: 70 }), "laughter");
  assert.equal(judge({ revenue: 8000, laughter: 60 }), "prosperity");
  assert.equal(judge({ revenue: 7990, laughter: 70 }), "laughter");
  assert.equal(judge({ revenue: 8000, laughter: 59 }), "wander");
  assert.equal(judge({}), "wander");
});

test("すべてのエンディングに実際のプレイで到達できる", () => {
  const reached = new Set();
  for (let seed = 0; seed < 4000 && reached.size < D.endings.length; seed++) {
    const rng = seeded(seed);
    const pref = ["bluff", "wit", "honest", "help", "flatter"][seed % 5];
    const mix = seed % 3;
    const { final } = playThrough(rng, (e) => {
      if (mix === 0) return e.choices[Math.floor(rng() * 3)].id;
      const preferred = e.choices.find((c) => c.type === pref);
      if (mix === 1 && preferred) return preferred.id;
      const liked = e.choices.find((c) => L.affinityFor(D.characters[e.character], c.type) === "like");
      if (mix === 2 && liked && rng() < 0.7) return liked.id;
      return e.choices[Math.floor(rng() * 3)].id;
    });
    reached.add(final.ending);
  }
  for (const e of D.endings) assert.ok(reached.has(e.id), `到達不能: ${e.id}`);
});

test("縁：結んだ縁で続きのイベントが出られるようになり、縁がないと出ない", () => {
  const base = L.startGame(seeded(7));
  const s1 = Object.assign({}, base, { currentEventId: "E08" });
  const r = L.applyChoice(s1, "A"); // さよりを案内する → sayori_helped
  assert.deepEqual(r.outcome.newTies, ["sayori_helped"]);
  assert.ok(r.state.ties.includes("sayori_helped"));
  // 縁がないプレイでは E11 は一度も出ない
  for (let seed = 0; seed < 300; seed++) {
    const rng = seeded(seed);
    const { final } = playThrough(rng, (e) => (e.choices.find((c) => !c.ties) || e.choices[0]).id);
    for (const id of ["E11", "E12", "E13", "E14"]) assert.ok(!final.usedEvents.includes(id), `${id} が縁なしで出た`);
  }
});

test("縁：echo の効果が上乗せされる", () => {
  const s = Object.assign(L.startGame(seeded(8)), { currentEventId: "E10", ties: ["kenta_fan"] });
  const without = L.applyChoice(Object.assign({}, s, { ties: [] }), "C").outcome;
  const withTie = L.applyChoice(s, "C").outcome;
  assert.equal(withTie.echoTie, "kenta_fan");
  assert.equal(withTie.deltas.revenue - without.deltas.revenue, 500);
});

test("最近見たイベントは出にくい", () => {
  const recent = ["E01", "E02", "E04", "E05"];
  const count = (list) => {
    let hits = 0;
    for (let seed = 0; seed < 400; seed++) {
      if (recent.includes(L.startGame(seeded(seed), list).currentEventId)) hits++;
    }
    return hits;
  };
  // 第一幕の候補 5 つのうち 4 つを「最近見た」にすると、出る割合がはっきり下がる
  const normal = count([]);
  const avoided = count(recent);
  assert.ok(avoided < normal * 0.7, `最近見たイベント ${avoided} 回（通常 ${normal} 回）`);
});

test("勢い：笑いでたまり、満タンの大風呂敷で大騒動、正直で売上に変わる", () => {
  const base = L.startGame(seeded(9));
  // 小春に大風呂敷（好む・笑い 18+5）→ 勢い +1
  let r = L.applyChoice(Object.assign({}, base, { currentEventId: "E02" }), "A");
  assert.equal(r.outcome.momentumAfter, 1);
  // 満タンで大風呂敷 → 大騒動
  const full = Object.assign({}, base, { currentEventId: "E02", momentum: 3 });
  r = L.applyChoice(full, "A");
  assert.equal(r.outcome.busted, true);
  assert.equal(r.outcome.stamp.id, "bust");
  assert.equal(r.state.momentum, 0);
  // 勢い 2 で正直 → 800 円上乗せして 0 に
  const two = Object.assign({}, base, { currentEventId: "E02", momentum: 2 });
  const plain = L.applyChoice(Object.assign({}, two, { momentum: 0 }), "C").outcome;
  r = L.applyChoice(two, "C");
  assert.equal(r.outcome.cashOut, 800);
  assert.equal(r.outcome.deltas.revenue - plain.deltas.revenue, 800);
  assert.equal(r.state.momentum, 0);
});

test("仕入れ：予算と個数の範囲に収め、条件に合う幕で効く", () => {
  assert.deepEqual(L.validStock(["candy", "candy", "nope", "opener"]), ["candy", "opener"]);
  // 予算 3000 円を超える分は入らない（1200 + 1000 + 1000 = 3200）
  assert.deepEqual(L.validStock(["driver", "opener", "cat"]), ["driver", "opener"]);
  // 4 つ目は入らない
  assert.equal(L.validStock(["candy", "whistle", "fan", "opener"]).length, 3);
  const base = Object.assign(L.startGame(seeded(10), [], { goods: ["opener"] }), { currentEventId: "E02" });
  const plain = L.applyChoice(Object.assign({}, base, { goods: [] }), "B").outcome;
  const withGood = L.applyChoice(base, "B").outcome; // 機転
  assert.deepEqual(withGood.goodsUsed, ["opener"]);
  assert.ok(withGood.deltas.revenue > plain.deltas.revenue);
  assert.deepEqual(L.applyChoice(base, "A").outcome.goodsUsed, []); // 大風呂敷には効かない
});

test("旅：町ごとに、その町の場面と町を問わない場面だけが出る", () => {
  for (const town of D.towns.map((t) => t.id)) {
    for (let seed = 0; seed < 200; seed++) {
      const rng = seeded(seed);
      let s = L.startGame(rng, [], { town });
      assert.equal(s.town, town);
      while (s.status === "playing") {
        const e = L.getCurrentEvent(s);
        assert.ok(!e.town || e.town === town, `${town} に ${e.id}`);
        s = L.advance(L.applyChoice(s, e.choices[Math.floor(rng() * 3)].id).state, rng);
      }
      assert.equal(s.history.length, 5);
    }
  }
});

test("旅：評判（人情）の半分と縁を持ち越し、旅の結末を判定する", () => {
  const s = Object.assign(L.createInitialState(), { humanity: 80, ties: ["kenta_fan"] });
  assert.deepEqual(L.carryOver(s), { humanity: 55, ties: ["kenta_fan"], seen: [] });
  const next = L.startGame(seeded(11), [], { town: "shiomi", humanity: 55, ties: ["kenta_fan"] });
  assert.equal(next.humanity, 55);
  assert.deepEqual(next.ties, ["kenta_fan"]);
  const r = (revenue, humanity, ending) => ({ revenue, humanity, ending });
  const ten = (rev, lastHum, chaos = 0) => Array.from({ length: 10 }, (_, i) => r(rev, i === 9 ? lastHum : 50, i < chaos ? "chaos" : "x"));
  assert.equal(L.judgeJourney(ten(10000, 65)).id, "j_grand");
  assert.equal(L.judgeJourney(ten(3000, 90, 2)).id, "j_chaos");
  assert.equal(L.judgeJourney(ten(3000, 90, 1)).id, "j_kind");
  assert.equal(L.judgeJourney(ten(9500, 64)).id, "j_rich");
  assert.equal(L.judgeJourney(ten(3000, 40)).id, "j_onward");
});

test("旅：前の町で見た場面は、次の町で出ない", () => {
  let repeats = 0;
  for (let seed = 0; seed < 300; seed++) {
    const rng = seeded(seed);
    let carry = {};
    const seen = new Set();
    const route = [];
    for (let i = 0; i < 3; i++) {
      const open = L.openTowns(route);
      const town = open[Math.floor(rng() * open.length)];
      route.push(town);
      let s = L.startGame(rng, [], Object.assign({ town }, carry));
      while (s.status === "playing") {
        const e = L.getCurrentEvent(s);
        s = L.advance(L.applyChoice(s, e.choices[Math.floor(rng() * 3)].id).state, rng);
      }
      s.usedEvents.forEach((id) => { if (seen.has(id)) repeats++; seen.add(id); });
      carry = L.carryOver(s);
    }
  }
  assert.equal(repeats, 0, `重複 ${repeats} 回`);
});

test("旅：10の町を順番に回る。どの町にも山場の場面がある", () => {
  assert.equal(D.towns.length, 10);
  assert.equal(D.journeyLength, 10);
  for (const t of D.towns) {
    const own = D.events.filter((e) => e.town === t.id);
    assert.ok(own.length >= 5, `${t.id} の場面 ${own.length}`);
    assert.ok(own.some((e) => e.tier === "final") && own.some((e) => e.tier === "mid"), `${t.id} の山場`);
  }
  assert.deepEqual(L.openTowns([]), ["hiyori"]);
  assert.deepEqual(L.openTowns(["hiyori"]), [D.towns[1].id]);
  assert.deepEqual(L.openTowns(D.towns.map((t) => t.id)), []);
});

test("旅：鍵を開けて先の町に行ったあとは、元の順番に戻る", () => {
  const ids = D.towns.map((t) => t.id);
  const last = ids[ids.length - 1];
  assert.equal(L.homeTown(["hiyori", last], [last]), "hiyori");
  assert.deepEqual(L.openTowns(["hiyori", last]), [ids[1]]);
  assert.equal(L.homeTown([last], [last]), null);
  assert.deepEqual(L.openTowns([last]), ["hiyori"]);
});
