/*
 * エンディングデータ
 * 上から順に判定し、最初に条件を満たしたものを採用する。
 * condition は { パラメーター名: { min, max } } の形式。最後の項目は条件なし（必ず該当）。
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.endings = [
    {
      id: "chaos",
      name: "商店街大騒動",
      condition: { trouble: { min: 85 } },
      title: "伝説の大風呂敷",
      text:
        "口上が大ウケしすぎて人があふれ、とうとう商店街の寄り合いの議題にされてしまった。まことは夜明け前に荷物をまとめ、そっと町をあとにした。"
    },
    {
      id: "humanity",
      name: "人情の旅人",
      condition: { humanity: { min: 75 } },
      title: "また来てほしい人",
      text:
        "売上はささやかだったが、帰りぎわ、八百屋は野菜を、団子屋は包みを持たせてくれた。「また来てくれよ」——その一言が、何よりの儲けだった。"
    },
    {
      id: "prosperity",
      name: "露店の大繁盛",
      condition: { revenue: { min: 8000 }, laughter: { min: 60 } },
      title: "日和町一の口上師",
      text:
        "品物は完売、財布はずっしり。……のはずが、帰り道で出会った困り顔の親子に、気づけば売上の半分を渡していた。"
    },
    {
      id: "laughter",
      name: "笑いの名人",
      condition: { laughter: { min: 70 } },
      title: "笑わせ上手",
      text:
        "売れ行きはそこそこ。けれど「あの兄さんの口上をもう一度聞きたい」と、翌日も朝から見物人が集まった。"
    },
    {
      id: "wander",
      name: "また明日、旅の空",
      condition: null,
      title: "気ままな旅商人",
      text:
        "大儲けも大騒動もない一日。夕焼けの下で荷物を背負い、まことは次の町へと歩き出す。「さあて、明日はどこで店を開こうか」"
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : window);
