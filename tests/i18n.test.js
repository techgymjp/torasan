"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

require("../data/characters.js");
require("../data/events.js");
require("../data/endings.js");
require("../data/en.js");
const D = globalThis.TankaData;

// i18n.js はブラウザ用なので、最低限の window を用意して読み込む
globalThis.window = {
  TankaData: D,
  navigator: { language: "en-US" },
  localStorage: { getItem: () => null, setItem: () => {} }
};
require("../i18n.js");
const I18n = globalThis.window.TankaI18n;

test("画面の文言：日本語と英語で同じキーがそろっている", () => {
  const ja = Object.keys(I18n.dict.ja).sort();
  const en = Object.keys(I18n.dict.en).sort();
  assert.deepEqual(en, ja);
  for (const k of en) assert.ok(I18n.dict.en[k].length > 0, `空の訳: ${k}`);
});

test("英訳：すべての人物・イベント・選択肢・結末に訳がある", () => {
  for (const [id, c] of Object.entries(D.characters)) {
    const en = D.en.characters[id];
    assert.ok(en && en.name && en.role && en.trait, `人物 ${id}`);
    for (const kind of ["like", "dislike"]) {
      if (c.reactions[kind]) assert.ok(en.reactions && en.reactions[kind], `人物 ${id} の ${kind}`);
    }
  }
  for (const e of D.events) {
    const en = D.en.events[e.id];
    assert.ok(en && en.title && en.dialogue, `イベント ${e.id}`);
    if (e.product) assert.ok(en.product && en.product.name && en.product.blurb, `イベント ${e.id} の商品`);
    for (const c of e.choices) {
      const ec = en.choices[c.id];
      assert.ok(ec && ec.text && ec.result, `イベント ${e.id}-${c.id}`);
    }
  }
  for (const e of D.endings) {
    const en = D.en.endings[e.id];
    assert.ok(en && en.name && en.title && en.text, `結末 ${e.id}`);
  }
});

test("英訳に日本語が残っていない", () => {
  const text = JSON.stringify(D.en) + JSON.stringify(I18n.dict.en);
  const ja = text.match(/[぀-ヿ一-鿿]+/g) || [];
  assert.deepEqual(ja, []);
});

test("端末が英語なら英語、文言の差し込みができる", () => {
  assert.equal(I18n.lang, "en");
  assert.equal(I18n.t("money", { n: "1,500" }), "¥1,500");
  assert.equal(I18n.ordinal(0), "No. 1");
  assert.equal(I18n.t("no.such.key"), "no.such.key");
});
