/*
 * 仕入れの品（開店前に選ぶ）
 * 予算の範囲で選んだ品が、その日の口上に効く。
 *
 * effect の書き方（どれも省略可。条件をすべて満たした幕で効く）
 *   types       : 効く口上タイプ（bluff / wit / honest / flatter / help）
 *   characters  : 効く相手（人物 ID）
 *   tiers       : 効く幕（normal / mid / final）
 *   revenueRate : 売上（プラスのとき）に掛ける上乗せ率（0.2 = +20%）
 *   laughter / humanity : 足す値
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.stockBudget = 3000;
  D.stockMax = 3;

  D.goods = [
    {
      id: "candy",
      icon: "🍬",
      name: "七色ハッカ飴",
      cost: 600,
      blurb: "大風呂敷の売上 +20%",
      effect: { types: ["bluff"], revenueRate: 0.2 }
    },
    {
      id: "opener",
      icon: "🔧",
      name: "なんでも開けるくん",
      cost: 1000,
      blurb: "機転の売上 +25%",
      effect: { types: ["wit"], revenueRate: 0.25 }
    },
    {
      id: "cat",
      icon: "🐱",
      name: "福招き猫のお守り",
      cost: 1000,
      blurb: "正直・お助けの人情 +4",
      effect: { types: ["honest", "help"], humanity: 4 }
    },
    {
      id: "driver",
      icon: "🪛",
      name: "万能ねじ回し",
      cost: 1200,
      blurb: "職人・巡査が相手なら売上 +40%",
      effect: { characters: ["genzo", "tamura"], revenueRate: 0.4 }
    },
    {
      id: "fan",
      icon: "🪭",
      name: "和紙のうちわ",
      cost: 800,
      blurb: "最後の幕（夕方）の売上 +30%",
      effect: { tiers: ["final"], revenueRate: 0.3 }
    },
    {
      id: "whistle",
      icon: "🎐",
      name: "おもちゃの笛",
      cost: 600,
      blurb: "子ども・小春が相手なら笑い +6・人情 +2",
      effect: { characters: ["kenta", "koharu"], laughter: 6, humanity: 2 }
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : window);
