/*
 * イベントデータ（初期10種類）
 *
 * tier      : normal（通常） / mid（3幕目に優先） / final（最終幕に優先）
 * condition : 発生条件。{ パラメーター名: { min, max } } の形式（省略時は常に発生可）
 * weight    : 出やすさ（省略時は1。大きいほど選ばれやすい）
 * choices   : 3つの口上。type は bluff / wit / honest / flatter / help
 * effects   : パラメーター変化の基本値（客との相性で補正される）
 *
 * 文章と数値のみを持ち、コードは含めない。ゲーム側は定義済みの効果量だけを反映する。
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.events = [
    {
      id: "E01",
      title: "値切り名人",
      tier: "normal",
      character: "matsuko",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "あら、この飴ずいぶんいいお値段ねえ。半額にしてくれたら、三袋買ってあげるわよ。",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「半額？ こいつは七色の飴だ。半額にしたら色が三色半に減っちまう！」",
          effects: { revenue: 1800, laughter: 15, humanity: -2, trouble: 12 },
          result: "見物人がどっと笑い、「三色半じゃ困るわ」と奥さんも笑いながら財布を開いた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「半額は勘弁。そのかわり三袋買ってくれたら、もう一袋おまけだ！」",
          effects: { revenue: 1300, laughter: 6, humanity: 3, trouble: 2 },
          result: "「あら、商売上手ねえ」と、四袋まとめてお買い上げ。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「奥さんほどの目利きに言われちゃ敵わねえ。特別に二割引きでどうだい」",
          effects: { revenue: 1000, laughter: 4, humanity: 2, trouble: 0 },
          result: "「目利きだなんて、ほほほ」とすっかりご機嫌になった。"
        }
      ]
    },
    {
      id: "E02",
      title: "大げさな実演",
      tier: "normal",
      character: "koharu",
      product: { icon: "🔧", name: "なんでも開けるくん", blurb: "瓶のフタから缶詰まで、これ一本" },
      dialogue: "ねえねえ、それ本当になんでも開くの？ 今ここでやって見せてよ！",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「お安い御用！ 瓶のフタから蔵の扉、閉ざされた乙女心まで、パカッと開く！」",
          effects: { revenue: 2000, laughter: 18, humanity: -3, trouble: 15 },
          result: "「乙女心も！？」小春の大声に、通りじゅうから見物人が集まってきた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「論より証拠。お嬢さん、その固いラムネの栓、ちょいと貸してごらん」",
          effects: { revenue: 1400, laughter: 8, humanity: 2, trouble: 3 },
          result: "ポンッと栓が抜けた瞬間、小さな拍手が起きた。"
        },
        {
          id: "C",
          type: "honest",
          text: "「正直に言うと、開くのは瓶と缶ぐらいでして……」",
          effects: { revenue: 500, laughter: 3, humanity: 8, trouble: -3 },
          result: "「なぁんだ」と言いつつ、小春は一本買っていった。"
        }
      ]
    },
    {
      id: "E03",
      title: "商品の故障",
      tier: "mid",
      character: "crowd",
      product: { icon: "☂️", name: "七段折りたたみ傘", blurb: "手のひらサイズに畳める新発明" },
      dialogue: "実演の最中、バキッと嫌な音。「おいおい、折れたぞ！ そんなもん売ってたのかい！」",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「面目ねえ！ 見本が折れちまった。気になる人には、お代はいらねえよ」",
          effects: { revenue: 300, laughter: 3, humanity: 14, trouble: -6 },
          result: "潔い謝りっぷりに、かえって何人かが「それなら」と買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「これぞ『折れても曲がらぬ心意気』！ ……いや、折れてるな。はい、ここ笑うところ！」",
          effects: { revenue: 1000, laughter: 14, humanity: 0, trouble: 4 },
          result: "一瞬の静けさのあと、どっと笑いが起きた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「壊れたんじゃない、変形したんだ！ これぞ第二形態！」",
          effects: { revenue: 1600, laughter: 16, humanity: -5, trouble: 16 },
          result: "「第二形態だってよ！」と騒ぎが広がり、人だかりが通りをふさいでしまった。"
        }
      ]
    },
    {
      id: "E04",
      title: "ライバル商人",
      tier: "normal",
      character: "ginji",
      product: { icon: "🪵", name: "肩たたき棒「ぽんぽこ」", blurb: "叩けば叩くほど肩が軽くなる" },
      dialogue: "へっへっ、悪いな兄さん。今日の客は、みーんな俺の店に流れるぜ。",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「さあ寄ってらっしゃい！ 隣の品は肩を叩くが、こっちの品は運命の扉を叩く！」",
          effects: { revenue: 1700, laughter: 15, humanity: -2, trouble: 14 },
          result: "客がどっとこちらへ戻り、銀二は苦い顔で腕を組んだ。"
        },
        {
          id: "B",
          type: "wit",
          text: "「銀二さん、どうだい。二人で掛け合い口上といこうじゃねえか」",
          effects: { revenue: 1200, laughter: 12, humanity: 5, trouble: -2 },
          result: "即席の掛け合いが大ウケ。両方の店に人だかりができた。"
        },
        {
          id: "C",
          type: "honest",
          text: "「客の取り合いはやめだ。お客さんには、合うほうの店を勧めるよ」",
          effects: { revenue: 400, laughter: 2, humanity: 10, trouble: -4 },
          result: "銀二はきょとんとしたあと、「変な野郎だ」と照れくさそうに笑った。"
        }
      ]
    },
    {
      id: "E05",
      title: "子どもの質問",
      tier: "normal",
      character: "kenta",
      product: { icon: "🐱", name: "福招き猫のお守り", blurb: "持てば運気が上向く……かもしれない" },
      dialogue: "おじさん、この猫、本当に幸運がくるの？ 去年これ買った人、くじ引きはずれてたよ。",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「そいつは猫の向きが逆だったのさ！ 右手で金、左手で人、両手上げたら……お手上げだ！」",
          effects: { revenue: 1500, laughter: 14, humanity: -2, trouble: 10 },
          result: "見物人は大笑いしたが、健太は「ずるい」と口をとがらせた。"
        },
        {
          id: "B",
          type: "honest",
          text: "「幸運は猫じゃなくて、持ってる人が自分で呼ぶもんだ。こいつはその応援団さ」",
          effects: { revenue: 800, laughter: 4, humanity: 12, trouble: -3 },
          result: "健太は「じゃあ応援してもらう」と、お小遣いで一つ買っていった。"
        },
        {
          id: "C",
          type: "wit",
          text: "「鋭いねえ坊や！ じゃあ今日一日持って試してくれ。幸運が来たらお代をもらうよ」",
          effects: { revenue: 600, laughter: 10, humanity: 6, trouble: 0 },
          result: "健太は大はしゃぎ。夕方、母親が律儀に代金を払いに来た。"
        }
      ]
    },
    {
      id: "E06",
      title: "頑固な職人",
      tier: "mid",
      character: "genzo",
      product: { icon: "🪛", name: "職人泣かせの万能ねじ回し", blurb: "大小どんなねじにも合う替え刃つき" },
      dialogue: "口上はいらねえ。そいつが本物かどうか、この古い柱時計で試させてもらおうか。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「腕を見てもらうのが一番だ。どうぞ、好きなだけ試してくだせえ」",
          effects: { revenue: 1200, laughter: 2, humanity: 10, trouble: -3 },
          result: "源造は黙って時計のねじを回し、最後にひと言「……悪くねえ」。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「こいつを握れば、素人だって一晩で名人よ！」",
          effects: { revenue: 1500, laughter: 12, humanity: -5, trouble: 12 },
          result: "「名人をなめるな！」源造の雷が、商店街じゅうに響きわたった。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「親方ほどの腕なら、どんな道具でも名品になっちまいますよ」",
          effects: { revenue: 900, laughter: 5, humanity: 0, trouble: 4 },
          result: "源造は鼻を鳴らした。「世辞はいらねえと言ったはずだ」"
        }
      ]
    },
    {
      id: "E07",
      title: "おかみさんの叱責",
      tier: "mid",
      character: "toki",
      condition: { trouble: { min: 15 } },
      weight: 2, // 騒動を起こしたら叱られやすい
      product: null,
      dialogue: "まことさん！ さっきから何の騒ぎだい。商店街は、あんたの舞台じゃないんだよ！",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「すみません、調子に乗りすぎました。片付けを手伝わせてください」",
          effects: { revenue: 0, laughter: 0, humanity: 14, trouble: -15 },
          result: "ときはしばらく睨んだあと、「……ほうきはそこだよ」と顎をしゃくった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「いやあ、おかみさんに叱られるのも、この商店街の名物でして！」",
          effects: { revenue: 600, laughter: 12, humanity: -2, trouble: 3 },
          result: "見物人は笑ったが、ときの眉間のしわはますます深くなった。"
        },
        {
          id: "C",
          type: "help",
          text: "「お詫びに、今日の売上の一部を夏祭りの準備に使ってください」",
          effects: { revenue: -800, laughter: 2, humanity: 18, trouble: -10 },
          result: "「……あんた、そういうとこだけは憎めないねえ」"
        }
      ]
    },
    {
      id: "E08",
      title: "困った旅行者",
      tier: "normal",
      character: "sayori",
      product: { icon: "🧧", name: "道中安全のお守り袋", blurb: "旅の無事を祈る、手縫いの小袋" },
      dialogue: "すみません、川沿いのお寺へ行きたいんですけど、道に迷ってしまって……。",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「店はちょいと閉めて、そこまで案内しますよ」",
          effects: { revenue: -500, laughter: 2, humanity: 16, trouble: -4 },
          result: "寺の門前で深々と頭を下げられ、まことはなぜか鼻歌まじりで戻ってきた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「お寺へ行くなら、このお守り袋がちょうどいい。裏に道順を書いてあげましょう」",
          effects: { revenue: 900, laughter: 6, humanity: 5, trouble: 0 },
          result: "さよりはくすっと笑って、お守り袋を一つ買ってくれた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この先をまっすぐ！ ついでに道中安全飴もどうぞ、舐め終わる頃に着きます！」",
          effects: { revenue: 1200, laughter: 10, humanity: -4, trouble: 8 },
          result: "勢いで飴を買わせたが、まっすぐ行った先は行き止まりだった。"
        }
      ]
    },
    {
      id: "E09",
      title: "突然の雨",
      tier: "final",
      character: "crowd",
      product: { icon: "🪭", name: "和紙のうちわ", blurb: "夏祭りにぴったりの手刷り柄" },
      dialogue: "ザーッと夕立。品物のうちわが濡れていく。見物客も「わっ、降ってきた！ 傘なんか持ってないよ！」",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「商品は後回しだ！ みんな、うちの屋台の幌の下へ入んな！」",
          effects: { revenue: -600, laughter: 4, humanity: 16, trouble: -5 },
          result: "雨宿りの人たちと肩を寄せ合ううち、不思議な一体感が生まれた。"
        },
        {
          id: "B",
          type: "honest",
          text: "「すまねえ、商売道具が濡れたら明日がねえ。先に品物をしまわせてくれ！」",
          effects: { revenue: 900, laughter: 0, humanity: -2, trouble: 0 },
          result: "品物は無事。雨上がりに残りも売れたが、濡れて走っていく人たちの背中が少し胸に刺さった。"
        },
        {
          id: "C",
          type: "wit",
          text: "「うちわを頭にかざして駅まで走れ！ 一本百円、どうだい！」",
          effects: { revenue: 1300, laughter: 12, humanity: 4, trouble: 2 },
          result: "うちわをかざして走る人の列ができ、雨の中に笑い声が響いた。"
        }
      ]
    },
    {
      id: "E10",
      title: "閉店間際の客",
      tier: "final",
      character: "kenta",
      product: { icon: "🐱", name: "最後の福招き猫", blurb: "本日、残りあと一つ" },
      dialogue: "日暮れどき、最後の招き猫に、健太と身なりのいい紳士が同時に手を伸ばした。「あっ……」",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「坊やに譲ってやるよ。お代は、お小遣いの分だけでいい」",
          effects: { revenue: 200, laughter: 3, humanity: 16, trouble: -3 },
          result: "健太は猫を抱えて駆けていき、紳士は「粋だねえ」と帽子を上げた。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「ではここで競り市だ！ 最後の福猫、一番高い声をかけた方のもの！」",
          effects: { revenue: 2500, laughter: 15, humanity: -8, trouble: 14 },
          result: "紳士が大枚をはたいて競り落とし、健太はべそをかいて帰っていった。"
        },
        {
          id: "C",
          type: "wit",
          text: "「旦那には明日、同じ品をお届けします。今日のこの子は坊やの番だ！」",
          effects: { revenue: 1500, laughter: 8, humanity: 8, trouble: 0 },
          result: "両方の客が満足顔。まことは明日の配達を忘れないよう、手のひらに墨で書いた。"
        }
      ]
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : window);
