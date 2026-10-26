/*
 * 旅モード：めぐる町と、旅全体の結末
 * 旅は 10 の町から 3 つを回る。最初は日和町商店街、次からは道でつながった町を選ぶ（リワード広告で鍵を開ければ、つながっていない町にも行ける）。
 * 町ごとに仕入れて 5 幕の商売をし、人情（評判）と縁を次の町へ持ち越す。すべての町で商売すれば「全町制覇」。
 *
 * journeyEndings は上から順に判定する。condition の値は旅全体の集計：
 *   revenue  : 3 つの町の売上の合計
 *   humanity : 最後の町を出るときの人情
 *   chaos    : 「商店街大騒動」の条件（騒動 85 以上）で終えた町の数
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  // links : 道でつながっている町。旅の 2 つ目・3 つ目の町は、いまの町とつながった町から選ぶ
  D.towns = [
    { id: "hiyori", icon: "🏮", links: ["shiomi", "yunosawa", "touge", "joka"], name: "日和町商店街", blurb: "昔ながらの商店街。顔なじみが多い。" },
    { id: "shiomi", icon: "⚓", links: ["hiyori", "nagi", "kuroiwa"], name: "潮見港", blurb: "漁師と海女の港町。景気のいい話が通る。" },
    { id: "yunosawa", icon: "♨️", links: ["hiyori", "yukimi", "monzen"], name: "湯ノ沢温泉", blurb: "湯けむりの温泉町。宿の客は財布のひもがゆるい。" },
    { id: "touge", icon: "⛰️", links: ["hiyori", "kuroiwa", "yukimi"], name: "峠ノ茶屋宿", blurb: "峠越えの旅人が一服する宿場。急ぐ客と、のんびりした茶屋。" },
    { id: "joka", icon: "🏯", links: ["hiyori", "monzen", "aoba"], name: "鶴見城下町", blurb: "お城と和菓子の城下町。しきたりにうるさい人も多い。" },
    { id: "nagi", icon: "🏝️", links: ["shiomi"], name: "凪島", blurb: "定期船で渡る小さな島。島の人はみんな顔見知り。" },
    { id: "kuroiwa", icon: "⛏️", links: ["shiomi", "touge"], name: "黒岩炭坑町", blurb: "炭坑で働く人の町。給料日は町じゅうがにぎやか。" },
    { id: "yukimi", icon: "❄️", links: ["yunosawa", "touge"], name: "雪見町の朝市", blurb: "雪の降る北の町。朝市は夜明け前から始まる。" },
    { id: "monzen", icon: "⛩️", links: ["yunosawa", "joka"], name: "光明寺門前町", blurb: "大きなお寺の門前町。参拝客と縁日でにぎわう。" },
    { id: "aoba", icon: "📚", links: ["joka"], name: "青葉台学生街", blurb: "大学のある坂の町。金はないが、議論と笑いは尽きない。" }
  ];

  // 旅でめぐる町の数と、最初に行ける町
  D.journeyLength = 3;
  D.journeyStart = "hiyori";

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
