/*
 * 登場人物データ
 * すべてオリジナルの人物。既存作品の人物・台詞・外見を模倣しない。
 *
 * likes / dislikes : 好む・嫌う口上タイプ（bluff / wit / honest / flatter / help）
 * trait            : 性格と好み（常連帳で好みが分かったあとに表示）
 * hint             : 最初に見せる、ぼかした人物メモ
 * reactions        : 相性が良い／悪いときの一言
 * look             : 立ち絵（SVG）生成用の外見パラメーター
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.characters = {
    makoto: {
      name: "風間まこと",
      role: "旅商人（あなた）",
      trait: "口は達者だが、根はお人好し。困った人を見過ごせない。",
      likes: [],
      dislikes: [],
      reactions: { like: "", dislike: "" },
      look: { skin: "#f2c9a0", hair: "#2b1a10", hairStyle: "short", clothes: "#3a5a8c", accent: "#c8102e" }
    },
    toki: {
      name: "花村とき",
      role: "商店街の世話役",
      hint: "商店街の世話役。曲がったことにはうるさい。",
      trait: "商売には厳しいが、筋の通った人には甘い。",
      likes: ["honest", "help"],
      dislikes: ["bluff", "flatter"],
      reactions: {
        like: "「……ふん。たまには筋の通ったことを言うじゃないか」",
        dislike: "「口ばっかり達者で、どうするんだい！」"
      },
      look: { skin: "#f0c6a2", hair: "#4a4a4a", hairStyle: "bun", clothes: "#7a4b8c", accent: "#f2e6c8" }
    },
    genzo: {
      name: "大野源造",
      role: "頑固な時計職人",
      hint: "腕一本で食ってきた職人。口のうまい奴は信用しない。",
      trait: "大げさな口上もお世辞も大嫌い。誠実さと腕前には弱い。",
      likes: ["honest", "wit"],
      dislikes: ["bluff", "flatter"],
      reactions: {
        like: "「……ほう。話のわかる若えのだ」",
        dislike: "「職人をなめるんじゃねえ！」"
      },
      look: { skin: "#e0b088", hair: "#9a9a9a", hairStyle: "headband", clothes: "#5a4632", accent: "#f2e6c8" }
    },
    koharu: {
      name: "小春",
      role: "好奇心旺盛な買い物客",
      hint: "何でも面白がる買い物客。",
      trait: "面白いことが大好き。話を大げさに広めるのが玉にきず。",
      likes: ["bluff", "wit"],
      dislikes: [],
      reactions: {
        like: "「あははっ！ それ、みんなに言いふらしちゃおっと！」",
        dislike: ""
      },
      look: { skin: "#f6d2b0", hair: "#3b2416", hairStyle: "bob", clothes: "#d2553f", accent: "#f7d64a" }
    },
    matsuko: {
      name: "松子",
      role: "値切り名人の奥さん",
      hint: "値切りの名人。ただでは財布を開かない。",
      trait: "値切りの腕は町内一。気の利いた提案と褒め言葉に弱い。",
      likes: ["wit", "flatter"],
      dislikes: ["bluff"],
      reactions: {
        like: "「あら、あんた話がわかるじゃないの！」",
        dislike: "「調子のいいこと言って、ごまかそうったってそうはいかないよ」"
      },
      look: { skin: "#f0c09a", hair: "#2b1a10", hairStyle: "perm", clothes: "#3f7a5a", accent: "#e8b93a" }
    },
    ginji: {
      name: "銀二",
      role: "隣の露店の商人",
      hint: "隣の露店の商売敵。",
      trait: "商売敵だが、気の利いた勝負は嫌いじゃない。",
      likes: ["wit", "honest"],
      dislikes: ["bluff"],
      reactions: {
        like: "「へっ、やるじゃねえか兄さん」",
        dislike: "「そっちがその気なら、こっちも黙っちゃいねえぞ！」"
      },
      look: { skin: "#dca77c", hair: "#1c1c1c", hairStyle: "slick", clothes: "#8c6a2a", accent: "#2b2b2b" }
    },
    kenta: {
      name: "健太",
      role: "商店街の子ども",
      hint: "商店街の子ども。大人のごまかしにうるさい。",
      trait: "鋭い質問でごまかしを見抜く。正直な答えが好き。",
      likes: ["honest", "wit"],
      dislikes: ["bluff"],
      reactions: {
        like: "「へへっ、おじさん、いい人だね！」",
        dislike: "「なんか、ずるい！」"
      },
      look: { skin: "#f4cfa8", hair: "#2b1a10", hairStyle: "cap", clothes: "#e0a020", accent: "#2f5aa0" }
    },
    sayori: {
      name: "さより",
      role: "道に迷った旅の人",
      hint: "道に迷った、控えめな旅の人。",
      trait: "控えめで誠実。困っているときの親切を忘れない。",
      likes: ["help", "honest"],
      dislikes: ["bluff"],
      reactions: {
        like: "「ご親切に……本当に、ありがとうございます」",
        dislike: "「……あの、少し困ります」"
      },
      look: { skin: "#f6d4b6", hair: "#1e1410", hairStyle: "long", clothes: "#c9a9c9", accent: "#7a3b5a" }
    },
    crowd: {
      name: "見物の衆",
      role: "商店街の人々",
      hint: "通りの見物人たち。",
      trait: "気の利いた一言には拍手、やりすぎにはヤジを飛ばす。",
      likes: ["wit"],
      dislikes: [],
      reactions: {
        like: "「うまいっ！」「いいぞ、兄さん！」",
        dislike: ""
      },
      look: { skin: "#e8bc94", hair: "#2b1a10", hairStyle: "crowd", clothes: "#6b5a48", accent: "#c8102e" }
    },
    tamura: {
      name: "田村巡査",
      role: "町の駐在さん",
      hint: "規則には厳しい、町の駐在さん。",
      trait: "ごまかしは見逃さないが、筋の通った説明と人助けには甘い。",
      likes: ["honest", "help"],
      dislikes: ["bluff", "flatter"],
      reactions: {
        like: "「うむ、感心な心がけだ」",
        dislike: "「本官をからかうつもりかね？」"
      },
      look: { skin: "#e8bc94", hair: "#1c1c1c", hairStyle: "cap", clothes: "#2c3e66", accent: "#1f3550" }
    },
    ume: {
      name: "お梅ばあさん",
      role: "商店街の生き字引",
      hint: "話し好きのおばあさん。",
      trait: "長話に付き合ってくれる人と、気の利いた冗談が大好き。お世辞はお見通し。",
      likes: ["help", "wit"],
      dislikes: ["flatter"],
      reactions: {
        like: "「ほっほ、あんた見どころがあるねえ」",
        dislike: "「年寄りをおだてても、何も出ないよ」"
      },
      look: { skin: "#f0c9a6", hair: "#d9d9d9", hairStyle: "bun", clothes: "#6b4a7a", accent: "#f2e6c8" }
    },
    shinji: {
      name: "慎二",
      role: "冷やかしの会社員",
      hint: "買う気があるのかないのか、よく分からない客。",
      trait: "ノリのいい大風呂敷と機転には乗ってくるが、正直すぎる話は退屈がる。",
      likes: ["bluff", "wit"],
      dislikes: ["honest"],
      reactions: {
        like: "「はは、兄さん面白いね。一つもらおうか」",
        dislike: "「なんだ、つまんないの」"
      },
      look: { skin: "#f2c9a0", hair: "#2b1a10", hairStyle: "slick", clothes: "#4a4a5a", accent: "#c8102e" }
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
