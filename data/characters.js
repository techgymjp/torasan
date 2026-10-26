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
    },

    // ---------- 旅の町の人々 ----------
    tatsu: {
      name: "辰五郎",
      role: "漁師の親方",
      hint: "潮見港の漁師たちのまとめ役。",
      trait: "景気のいい話と、汗をかく人間が好き。おべっかは大嫌い。",
      likes: ["bluff", "help"],
      dislikes: ["flatter"],
      reactions: {
        like: "「おう、気に入った！」",
        dislike: "「口先だけの奴は、海に放り込むぞ」"
      },
      look: { skin: "#d9a27a", hair: "#1c1c1c", hairStyle: "headband", clothes: "#1f4e79", accent: "#f2e6c8" }
    },
    minami: {
      name: "美波",
      role: "浜の海女",
      hint: "浜の子どもたちに慕われる海女。",
      trait: "子ども思いで、まっすぐな話と気の利いた冗談が好き。大げさな話は嫌う。",
      likes: ["honest", "wit"],
      dislikes: ["bluff"],
      reactions: {
        like: "「ふふ、あんた、いい人だね」",
        dislike: "「そういうの、子どもが真に受けるからやめて」"
      },
      look: { skin: "#e3b58c", hair: "#1e1410", hairStyle: "long", clothes: "#2f7f8a", accent: "#f2e6c8" }
    },
    seikichi: {
      name: "清吉",
      role: "老舗旅館の若旦那",
      hint: "湯ノ沢の老舗旅館の若旦那。",
      trait: "持ち上げられると弱く、気の利いた売り文句が好き。正直すぎる話には興ざめする。",
      likes: ["flatter", "wit"],
      dislikes: ["honest"],
      reactions: {
        like: "「いいねえ、気に入ったよ」",
        dislike: "「なんだか白けるねえ」"
      },
      look: { skin: "#f2c9a0", hair: "#2b1a10", hairStyle: "slick", clothes: "#5a3e2b", accent: "#d9a62e" }
    },
    shige: {
      name: "繁蔵",
      role: "湯治客の老紳士",
      hint: "腰を痛めて湯治に来た老紳士。",
      trait: "誠実な話と親切に弱い。大げさな効能書きは信じない。",
      likes: ["honest", "help"],
      dislikes: ["bluff"],
      reactions: {
        like: "「うむ、あんたは信用できる」",
        dislike: "「年寄りをからかっちゃいかんよ」"
      },
      look: { skin: "#e8bc94", hair: "#bfbfbf", hairStyle: "short", clothes: "#6b5a48", accent: "#c8102e" }
    },

    // ---------- 旅の町の人々（峠・城下・雪見・門前・炭坑・学生街・島） ----------
    oshin: {
      name: "お信",
      role: "茶屋の女将",
      hint: "峠の茶屋を一人で切り盛りする女将。",
      trait: "旅人に親切な人と、正直な商いが好き。大げさな口上は大嫌い。",
      likes: ["help", "honest"],
      dislikes: ["bluff"],
      reactions: {
        like: "「あんた、旅の人にしちゃ気が利くねえ」",
        dislike: "「峠でほら吹くと、天狗にさらわれるよ」"
      },
      look: { skin: "#f0c6a2", hair: "#2b1a10", hairStyle: "bun", clothes: "#8c4a3a", accent: "#f2e6c8" }
    },
    genta: {
      name: "源太",
      role: "トラック運転手",
      hint: "峠道を毎日走る、威勢のいい運転手。",
      trait: "景気のいい話と気の利いた冗談が好き。おべっかは嫌い。",
      likes: ["bluff", "wit"],
      dislikes: ["flatter"],
      reactions: {
        like: "「がっはっは！ 気に入った、乗ってけ！」",
        dislike: "「おだてても荷台には乗せねえぞ」"
      },
      look: { skin: "#d9a27a", hair: "#1c1c1c", hairStyle: "headband", clothes: "#3a6a3a", accent: "#e0a020" }
    },
    mido: {
      name: "御堂のご隠居",
      role: "武家屋敷のご隠居",
      hint: "城下の古い屋敷に住む、気位の高いご隠居。",
      trait: "礼儀正しい褒め言葉と誠実さを好む。軽口は品がないと嫌う。",
      likes: ["flatter", "honest"],
      dislikes: ["wit"],
      reactions: {
        like: "「うむ、礼をわきまえておるな」",
        dislike: "「軽々しい口をきくでない」"
      },
      look: { skin: "#f0c9a6", hair: "#d9d9d9", hairStyle: "short", clothes: "#2b2b4a", accent: "#d9a62e" }
    },
    chiyo: {
      name: "千代",
      role: "和菓子屋の娘",
      hint: "城下の老舗和菓子屋の看板娘。",
      trait: "気の利いた話と人助けが好き。ほら話はすぐ見抜く。",
      likes: ["wit", "help"],
      dislikes: ["bluff"],
      reactions: {
        like: "「ふふっ、おもしろい人」",
        dislike: "「それ、嘘でしょう？」"
      },
      look: { skin: "#f6d4b6", hair: "#1e1410", hairStyle: "long", clothes: "#d27a9a", accent: "#f2e6c8" }
    },
    fumi: {
      name: "フミ",
      role: "朝市のおかみ",
      hint: "夜明け前から朝市に立つ、たくましいおかみ。",
      trait: "正直な商いと気の利いた冗談が好き。おだてる人は信用しない。",
      likes: ["honest", "wit"],
      dislikes: ["flatter"],
      reactions: {
        like: "「あんた、話がわかるねえ！」",
        dislike: "「寒いのに、口ばっかりあったかいね」"
      },
      look: { skin: "#f0c09a", hair: "#2b1a10", hairStyle: "perm", clothes: "#a03a3a", accent: "#f2e6c8" }
    },
    fuyukichi: {
      name: "冬吉",
      role: "出稼ぎ帰りの若者",
      hint: "都会の出稼ぎから帰ってきた、人のいい若者。",
      trait: "褒められるとうれしく、人助けにも弱い。ほら話にはこりごり。",
      likes: ["flatter", "help"],
      dislikes: ["bluff"],
      reactions: {
        like: "「へへ、なんだか照れるなあ」",
        dislike: "「都会でもそういう話にだまされたんだ……」"
      },
      look: { skin: "#f2c9a0", hair: "#2b1a10", hairStyle: "cap", clothes: "#4a5a7a", accent: "#c8102e" }
    },
    chinnen: {
      name: "珍念",
      role: "寺の小僧",
      hint: "お寺の修行中の小僧さん。いたずら好き。",
      trait: "面白い話と大げさな話が大好き。お世辞は修行の邪魔だと嫌う。",
      likes: ["wit", "bluff"],
      dislikes: ["flatter"],
      reactions: {
        like: "「わあ、すごいや！ 和尚さまには内緒ね」",
        dislike: "「おだてても、お経は短くなりませんよ」"
      },
      look: { skin: "#f4cfa8", hair: "#3b2416", hairStyle: "short", clothes: "#5a4a3a", accent: "#e0a020" }
    },
    kakunen: {
      name: "覚然和尚",
      role: "光明寺の住職",
      hint: "門前町を見守る、穏やかな和尚さん。",
      trait: "誠実な言葉と人助けを喜ぶ。ほら話には静かに眉をひそめる。",
      likes: ["honest", "help"],
      dislikes: ["bluff"],
      reactions: {
        like: "「よい心がけじゃ。仏さまも見ておられる」",
        dislike: "「方便も、過ぎれば嘘じゃよ」"
      },
      look: { skin: "#e8bc94", hair: "#e8bc94", hairStyle: "short", clothes: "#4a3a5a", accent: "#d9a62e" }
    },
    iwao: {
      name: "岩男",
      role: "炭坑夫",
      hint: "坑内で働く、力自慢の炭坑夫。",
      trait: "豪快な話と汗をかく人が好き。小難しい理屈は苦手。",
      likes: ["bluff", "help"],
      dislikes: ["wit"],
      reactions: {
        like: "「おう、気に入ったぞ兄ちゃん！」",
        dislike: "「難しいこと言われても、わからん！」"
      },
      look: { skin: "#c99a72", hair: "#1c1c1c", hairStyle: "cap", clothes: "#3a3a3a", accent: "#e0a020" }
    },
    tome: {
      name: "トメ",
      role: "炭住のおかみ",
      hint: "炭坑住宅の世話を焼く、肝っ玉母さん。",
      trait: "正直な人と、子どもや年寄りに親切な人が好き。おべっかは聞き飽きている。",
      likes: ["honest", "help"],
      dislikes: ["flatter"],
      reactions: {
        like: "「あんた、いい子だねえ」",
        dislike: "「そういうのは、給料日の男衆に言いな」"
      },
      look: { skin: "#f0c09a", hair: "#4a4a4a", hairStyle: "perm", clothes: "#6b5a48", accent: "#f2e6c8" }
    },
    manabu: {
      name: "学",
      role: "苦学生",
      hint: "仕送りの少ない、理屈っぽい大学生。",
      trait: "筋の通った話と機転が好き。おだてには乗らない。",
      likes: ["wit", "honest"],
      dislikes: ["flatter"],
      reactions: {
        like: "「なるほど、理にかなっている」",
        dislike: "「おだてで財布は開きませんよ。中身もないし」"
      },
      look: { skin: "#f2c9a0", hair: "#1c1c1c", hairStyle: "slick", clothes: "#2c3e66", accent: "#f2e6c8" }
    },
    poem: {
      name: "ポエムのマスター",
      role: "喫茶店のマスター",
      hint: "学生街の喫茶「ポエム」のマスター。",
      trait: "洒落た言い回しと褒め言葉に弱い。大げさな話は野暮だと嫌う。",
      likes: ["wit", "flatter"],
      dislikes: ["bluff"],
      reactions: {
        like: "「洒落てるねえ。コーヒー一杯おごろう」",
        dislike: "「野暮だねえ、そういうのは」"
      },
      look: { skin: "#e8bc94", hair: "#4a4a4a", hairStyle: "slick", clothes: "#5a3e2b", accent: "#f2e6c8" }
    },
    kaizo: {
      name: "海蔵",
      role: "定期船の船長",
      hint: "島と本土を結ぶ定期船の船長。",
      trait: "まっすぐな話と景気のいい話が好き。お世辞は海に捨てる。",
      likes: ["honest", "bluff"],
      dislikes: ["flatter"],
      reactions: {
        like: "「よし、気に入った。帰りの船賃はまけてやる」",
        dislike: "「世辞は波に流しとけ」"
      },
      look: { skin: "#d9a27a", hair: "#bfbfbf", hairStyle: "cap", clothes: "#1f3550", accent: "#f2e6c8" }
    },
    kame: {
      name: "カメおばあ",
      role: "島の物知りおばあ",
      hint: "島のことなら何でも知っているおばあ。",
      trait: "親切な人と、気の利いた冗談が好き。ほら話には島じゅうに言いふらす。",
      likes: ["help", "wit"],
      dislikes: ["bluff"],
      reactions: {
        like: "「あいやー、あんた面白いねえ」",
        dislike: "「島で嘘ついたら、明日にはみんな知ってるよ」"
      },
      look: { skin: "#d9a982", hair: "#d9d9d9", hairStyle: "bun", clothes: "#3f7a5a", accent: "#f7d64a" }
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
