/*
 * 旅モード：めぐる町と、旅全体の結末
 * 旅は町を順に 3 つ回る。町ごとに仕入れて 5 幕の商売をし、人情（評判）と縁を次の町へ持ち越す。
 *
 * journeyEndings は上から順に判定する。condition の値は旅全体の集計：
 *   revenue  : 3 つの町の売上の合計
 *   humanity : 最後の町を出るときの人情
 *   chaos    : 「商店街大騒動」の条件（騒動 85 以上）で終えた町の数
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.towns = [
    { id: "hiyori", icon: "🏮", name: "日和町商店街", blurb: "昔ながらの商店街。顔なじみが多い。" },
    { id: "shiomi", icon: "⚓", name: "潮見港", blurb: "漁師と海女の港町。景気のいい話が通る。" },
    { id: "yunosawa", icon: "♨️", name: "湯ノ沢温泉", blurb: "湯けむりの温泉町。宿の客は財布のひもがゆるい。" }
  ];

  D.journeyEndings = [
    {
      id: "j_grand",
      condition: { revenue: { min: 27000 }, humanity: { min: 65 } },
      name: "旅の大団円",
      title: "天下御免の旅商人",
      text: "三つの町で稼ぎ、笑わせ、人の縁を結んだ。最後の町を出るとき、峠の茶屋で「あんたの噂は聞いてるよ」と声をかけられた。"
    },
    {
      id: "j_chaos",
      condition: { chaos: { min: 1 } },
      name: "騒動の渡り鳥",
      title: "噂の騒動屋",
      text: "行く先々で騒ぎを起こし、町を追われるように出た日もあった。次の町では、着く前から「あの口上師が来るぞ」と噂になっていた。それでも、まことの足取りは軽い。"
    },
    {
      id: "j_kind",
      condition: { humanity: { min: 86 } },
      name: "人情の旅路",
      title: "どこでも迎えられる人",
      text: "稼ぎはそこそこ。けれど三つの町のどこにも「また来てくれよ」と言ってくれる人ができた。それが何よりの財産だった。"
    },
    {
      id: "j_rich",
      condition: { revenue: { min: 27000 } },
      name: "名物旅商人",
      title: "稼ぎ頭の旅商人",
      text: "三つの町で売りに売った。重くなった財布を抱え、まことは次の興行先の地図を広げた。"
    },
    {
      id: "j_onward",
      condition: null,
      name: "また次の旅へ",
      title: "風まかせの旅人",
      text: "大きな稼ぎも大騒動もない三つの町。それでも、どの町にも小さな思い出が残った。まことは今日も、次の町へ歩き出す。"
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : window);
