/*
 * イベントデータ（初期10種類）
 *
 * tier      : normal（通常） / mid（3幕目に優先） / final（最終幕に優先）
 * condition : 発生条件。{ パラメーター名: { min, max } } の形式（省略時は常に発生可）
 * weight    : 出やすさ（省略時は1。大きいほど選ばれやすい）
 * choices   : 3つの口上。type は bluff / wit / honest / flatter / help
 * effects   : パラメーター変化の基本値（客との相性で補正される）
 * ties      : その口上を選ぶと結ばれる「縁」。あとの幕のイベントや効果が変わる
 * requiresTies : この縁がすべて結ばれているときだけ発生する（縁の続きのイベント）
 * echo      : { tie, town?, effects, text } その縁があると、どの口上を選んでも効果と一文が上乗せされる
 * town      : この町でだけ出る（data/towns.js の町 ID）。省略するとどの町でも出る
 *
 * 文章と数値のみを持ち、コードは含めない。ゲーム側は定義済みの効果量だけを反映する。
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.events = [
    {
      id: "E01",
      town: "hiyori",
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
      town: "hiyori",
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
      town: "hiyori",
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
          ties: ["ginji_grudge"],
          effects: { revenue: 1700, laughter: 15, humanity: -2, trouble: 14 },
          result: "客がどっとこちらへ戻り、銀二は苦い顔で腕を組んだ。"
        },
        {
          id: "B",
          type: "wit",
          text: "「銀二さん、どうだい。二人で掛け合い口上といこうじゃねえか」",
          ties: ["ginji_friend"],
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
      town: "hiyori",
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
          ties: ["kenta_fan"],
          effects: { revenue: 800, laughter: 4, humanity: 12, trouble: -3 },
          result: "健太は「じゃあ応援してもらう」と、お小遣いで一つ買っていった。"
        },
        {
          id: "C",
          type: "wit",
          text: "「鋭いねえ坊や！ じゃあ今日一日持って試してくれ。幸運が来たらお代をもらうよ」",
          ties: ["kenta_fan"],
          effects: { revenue: 600, laughter: 10, humanity: 6, trouble: 0 },
          result: "健太は大はしゃぎ。夕方、母親が律儀に代金を払いに来た。"
        }
      ]
    },
    {
      id: "E06",
      town: "hiyori",
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
          ties: ["genzo_trust"],
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
      town: "hiyori",
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
          ties: ["sayori_helped"],
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
          ties: ["sayori_tricked"],
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
      echo: {
        tie: "genzo_trust",
        town: "hiyori",
        effects: { revenue: 0, laughter: 0, humanity: 4, trouble: -6 },
        text: "源造が「うちの軒先を使いな」と工房のひさしを貸してくれた。品物も客も濡れずに済んだ。"
      },
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
      town: "hiyori",
      title: "閉店間際の客",
      tier: "final",
      character: "kenta",
      product: { icon: "🐱", name: "最後の福招き猫", blurb: "本日、残りあと一つ" },
      echo: {
        tie: "kenta_fan",
        effects: { revenue: 500, laughter: 2, humanity: 4, trouble: 0 },
        text: "健太が「このおじさん、いい人なんだ」と母親を連れてきた。母親もついでに一つ買っていった。"
      },
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
    },
    // ---------- 縁の続き（前の幕の選択で出てくるイベント） ----------
    {
      id: "E11",
      town: "hiyori",
      title: "恩返しの参拝客",
      tier: "final",
      character: "sayori",
      requiresTies: ["sayori_helped"],
      weight: 6,
      product: { icon: "🧧", name: "道中安全のお守り袋", blurb: "旅の無事を祈る、手縫いの小袋" },
      dialogue: "昼間はありがとうございました。お寺の皆さんにお話ししたら、ぜひお店に寄りたいって……。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「こりゃどうも。案内しただけなのに、ありがてえ話だ」",
          effects: { revenue: 1600, laughter: 4, humanity: 10, trouble: -2 },
          result: "参拝客たちがお守り袋を次々と手に取り、気づけば台の上が空っぽになった。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「さあさあ皆さん、このお守りを持てば御利益十倍！」",
          effects: { revenue: 1900, laughter: 12, humanity: -6, trouble: 10 },
          result: "よく売れたが、さよりが少し寂しそうな顔をしたのを、まことは見逃さなかった。"
        },
        {
          id: "C",
          type: "help",
          text: "「せっかくだ、皆さんに一つずつ差し上げましょう」",
          effects: { revenue: -300, laughter: 4, humanity: 18, trouble: -4 },
          result: "「こんなにしていただいて」と、参拝客たちは何度も頭を下げて帰っていった。"
        }
      ]
    },
    {
      id: "E12",
      town: "hiyori",
      title: "行き止まりの苦情",
      tier: "normal",
      character: "toki",
      requiresTies: ["sayori_tricked"],
      weight: 6,
      product: null,
      dialogue: "まことさん、さっきの旅の娘さん、行き止まりで途方に暮れてたよ！ あんた、何を教えたんだい。",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「しまった！ 今すぐ探して、お寺まで送ってきます」",
          effects: { revenue: -400, laughter: 2, humanity: 14, trouble: -8 },
          result: "息を切らして追いつき、平謝りで案内した。帰り道、ときの顔が少しだけ緩んでいた。"
        },
        {
          id: "B",
          type: "honest",
          text: "「面目ねえ。売りたい一心で、いい加減なことを言いました」",
          effects: { revenue: 0, laughter: 0, humanity: 8, trouble: -5 },
          result: "「わかってるならいいさ。二度とするんじゃないよ」"
        },
        {
          id: "C",
          type: "wit",
          text: "「行き止まりも、人生の寄り道ってやつでして……」",
          effects: { revenue: 300, laughter: 8, humanity: -4, trouble: 8 },
          result: "見物人は笑ったが、ときは「笑い事じゃないよ！」と声を張り上げた。"
        }
      ]
    },
    {
      id: "E13",
      town: "hiyori",
      title: "銀二の助け舟",
      tier: "final",
      character: "ginji",
      requiresTies: ["ginji_friend"],
      weight: 6,
      product: { icon: "🪵", name: "肩たたき棒「ぽんぽこ」", blurb: "叩けば叩くほど肩が軽くなる" },
      dialogue: "よう兄さん、こっちは品切れだ。客を回すから、昼間の掛け合い、もう一丁やろうじゃねえか。",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「待ってました！ 日和町名物、二人口上の始まりだ！」",
          effects: { revenue: 1800, laughter: 14, humanity: 6, trouble: 2 },
          result: "息の合った掛け合いに人垣ができ、閉店間際とは思えない売れ行きになった。"
        },
        {
          id: "B",
          type: "honest",
          text: "「ありがてえ。お客さんには、銀二さんの紹介だって言っとくよ」",
          effects: { revenue: 1200, laughter: 4, humanity: 10, trouble: -2 },
          result: "客は二つの店を行き来し、銀二も「持ちつ持たれつだ」と笑った。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「回してもらった客は、全部こっちのもんだ！」",
          effects: { revenue: 2000, laughter: 8, humanity: -8, trouble: 10 },
          result: "売上は伸びたが、銀二は「恩を仇で返すたあ、このことだ」と背を向けた。"
        }
      ]
    },
    {
      id: "E14",
      town: "hiyori",
      title: "銀二の仕返し",
      tier: "normal",
      character: "ginji",
      requiresTies: ["ginji_grudge"],
      weight: 6,
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "へっ、さっきはよくもやってくれたな。こっちは同じ飴を半値で売らせてもらうぜ！",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「半値の飴は色も半分！ 本物の七色はこっちだけだ！」",
          effects: { revenue: 1400, laughter: 12, humanity: -4, trouble: 14 },
          result: "値下げ合戦はヤジの飛び交う大騒ぎになり、通りは見物人でごった返した。"
        },
        {
          id: "B",
          type: "honest",
          text: "「さっきはすまなかった。客の取り合いはやめにしねえか」",
          effects: { revenue: 600, laughter: 2, humanity: 12, trouble: -8 },
          result: "銀二は鼻をこすり、「……わかりゃいいんだよ」と値札を元に戻した。"
        },
        {
          id: "C",
          type: "wit",
          text: "「半値の飴に、うちの口上を付けて二倍で売る。それでどうだい？」",
          effects: { revenue: 900, laughter: 10, humanity: 2, trouble: 2 },
          result: "銀二はあきれ顔で笑い出し、仕返しはいつの間にか共同販売になった。"
        }
      ]
    },

    // ---------- 追加の場面 ----------
    {
      id: "E15",
      town: "hiyori",
      title: "巡査の見回り",
      tier: "normal",
      character: "tamura",
      product: { icon: "📋", name: "露店の営業許可証", blurb: "きちんと届け出済み……のはず" },
      dialogue: "やあ、見回りだ。この露店、ちゃんと届けは出してあるのかね？",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「はい、こちらに。不備があればすぐ直します」",
          effects: { revenue: 300, laughter: 2, humanity: 10, trouble: -8 },
          result: "巡査は許可証を確かめ、「よろしい」とうなずいて飴を一つ買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「届けはばっちり。ついでに旦那の肩こりにも、この品がばっちりで」",
          effects: { revenue: 900, laughter: 10, humanity: 2, trouble: 2 },
          result: "巡査は咳払いをしたが、口元が少しゆるんでいた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「届けなんて、この口上が何よりの許可証でさあ！」",
          effects: { revenue: 600, laughter: 12, humanity: -4, trouble: 14 },
          result: "「許可証を見せなさい！」巡査の声に、見物人がさっと引いていった。"
        }
      ]
    },
    {
      id: "E16",
      title: "冷やかし客",
      tier: "normal",
      character: "shinji",
      product: { icon: "🔧", name: "なんでも開けるくん", blurb: "瓶のフタから缶詰まで、これ一本" },
      dialogue: "へえ、面白そうだね。まあ、見るだけだけど。",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「見るだけなら損はさせねえ！ 見たら最後、手が勝手に財布を開ける！」",
          effects: { revenue: 1500, laughter: 15, humanity: -2, trouble: 8 },
          result: "「財布が勝手に！」と笑いながら、慎二は本当に財布を開いた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「見るだけならタダ、触ればもっと分かる。ほら、持ってごらん」",
          effects: { revenue: 1100, laughter: 8, humanity: 2, trouble: 0 },
          result: "手に取った途端、慎二は「あ、これいいな」とつぶやいた。"
        },
        {
          id: "C",
          type: "honest",
          text: "「冷やかし大歓迎。気に入らなきゃ買わなくていいよ」",
          effects: { revenue: 200, laughter: 2, humanity: 8, trouble: -2 },
          result: "「じゃあ、そうする」と慎二は本当に何も買わずに去っていった。"
        }
      ]
    },
    {
      id: "E17",
      town: "hiyori",
      title: "お梅ばあさんの昔話",
      tier: "normal",
      character: "ume",
      product: { icon: "🪭", name: "和紙のうちわ", blurb: "夏祭りにぴったりの手刷り柄" },
      dialogue: "この通りもねえ、昔は夜店がずらっと並んでねえ。あんたみたいな口上師も、たくさんいたもんだよ……",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「へえ、それで？ ゆっくり聞かせてくださいよ」",
          effects: { revenue: 600, laughter: 4, humanity: 14, trouble: -2 },
          result: "長話のあと、お梅ばあさんは「話のお代だよ」とうちわを三本買ってくれた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「ばあちゃん、その頃の口上師に比べりゃ、俺なんてまだ前座でさあ」",
          effects: { revenue: 900, laughter: 12, humanity: 4, trouble: 0 },
          result: "「そうそう、昔の口上師はねえ」と話はさらに弾み、見物人まで集まってきた。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「いやあ、ばあちゃん、昔は町一番の小町だったでしょう」",
          effects: { revenue: 700, laughter: 6, humanity: 0, trouble: 2 },
          result: "「おだてても何も出ないよ」と言いながら、まんざらでもなさそうだった。"
        }
      ]
    },
    {
      id: "E18",
      town: "hiyori",
      title: "回覧板で宣伝",
      tier: "normal",
      character: "koharu",
      product: { icon: "🐱", name: "福招き猫のお守り", blurb: "持てば運気が上向く……かもしれない" },
      dialogue: "ねえ、町内の回覧板にお店のこと書いてあげようか？ なんて書く？",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「『日和町に福の神現る。この招き猫で宝くじ一等間違いなし』で頼む！」",
          effects: { revenue: 1800, laughter: 16, humanity: -4, trouble: 16 },
          result: "翌朝、回覧板を見た人が押し寄せ、「一等はいつ当たるんだ」と詰め寄られた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「『猫の手も借りたい方へ。招き猫、貸し出しはしておりません』でどうだい」",
          effects: { revenue: 1300, laughter: 12, humanity: 2, trouble: 2 },
          result: "回覧板を見た人がくすっと笑い、何人も顔を出してくれた。"
        },
        {
          id: "C",
          type: "honest",
          text: "「『小さな露店です。気が向いたらお立ち寄りください』で十分さ」",
          effects: { revenue: 500, laughter: 2, humanity: 8, trouble: -2 },
          result: "控えめな一文が好評で、ご近所さんがぽつぽつ寄ってくれた。"
        }
      ]
    },
    {
      id: "E19",
      town: "hiyori",
      title: "色が変わらない飴",
      tier: "normal",
      character: "matsuko",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "ちょっとあんた！ この前の飴、三色しか変わらなかったわよ！",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「すまねえ、湿気で色が抜けたのかもしれねえ。新しいのと取り替えるよ」",
          effects: { revenue: 300, laughter: 2, humanity: 12, trouble: -6 },
          result: "「あら、話が早いじゃない」と松子は機嫌を直し、ついでにもう一袋買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「残りの四色は、奥さんの笑顔で補ってくだせえ」",
          effects: { revenue: 900, laughter: 10, humanity: 2, trouble: 2 },
          result: "「うまいこと言うわね」と松子は笑い、取り替えついでに二袋買っていった。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「七色に見えないのは、心が曇ってる証拠でさあ！」",
          effects: { revenue: 400, laughter: 8, humanity: -6, trouble: 14 },
          result: "「誰の心が曇ってるですって！」松子の声が商店街じゅうに響きわたった。"
        }
      ]
    },
    {
      id: "E20",
      town: "hiyori",
      title: "子どもたちの行列",
      tier: "normal",
      character: "kenta",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "おじさん、友だち連れてきた！ みんなで飴の試食させてよ！",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「よし、一人一粒ずつ持ってけ！」",
          effects: { revenue: 400, laughter: 6, humanity: 14, trouble: 0 },
          result: "子どもたちの歓声につられて、親たちが次々と飴を買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「試食は、なぞなぞに答えた子から！ 『舐めるたびに色が変わる飴はなーんだ』」",
          effects: { revenue: 700, laughter: 12, humanity: 6, trouble: 2 },
          result: "「七色ハッカ飴！」の大合唱に、通りがかりの大人まで足を止めた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この飴を舐めたら、明日のテストは百点間違いなし！」",
          effects: { revenue: 1200, laughter: 10, humanity: -6, trouble: 10 },
          result: "子どもたちは大喜びで買っていったが、後で親から苦情が来そうな予感がした。"
        }
      ]
    },
    {
      id: "E21",
      title: "品物の取り違え",
      tier: "mid",
      character: "crowd",
      product: { icon: "🪵", name: "肩たたき棒「ぽんぽこ」", blurb: "叩けば叩くほど肩が軽くなる" },
      dialogue: "見物の衆「おい兄さん、さっきの客に渡したの、肩たたき棒じゃなくて孫の手だぞ！」",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「しまった！ 追いかけて取り替えてくる！」",
          effects: { revenue: -200, laughter: 4, humanity: 14, trouble: -4 },
          result: "商店街の端で追いつき、取り替えると、客は「わざわざ悪いね」と笑った。"
        },
        {
          id: "B",
          type: "wit",
          text: "「孫の手で肩を叩けば肩たたき棒、肩たたき棒で背中をかけば孫の手。どっちも正解！」",
          effects: { revenue: 900, laughter: 14, humanity: -2, trouble: 4 },
          result: "理屈になっていない理屈に、見物人は大笑いした。"
        },
        {
          id: "C",
          type: "honest",
          text: "「申し訳ねえ。今度その人が来たら、両方差し上げます」",
          effects: { revenue: 0, laughter: 2, humanity: 10, trouble: -4 },
          result: "見物人から「それでこそ商人だ」と声が飛んだ。"
        }
      ]
    },
    {
      id: "E22",
      town: "hiyori",
      title: "源造の頼みごと",
      tier: "mid",
      character: "genzo",
      product: { icon: "🪛", name: "職人泣かせの万能ねじ回し", blurb: "大小どんなねじにも合う替え刃つき" },
      dialogue: "……孫の誕生日に何かやりてえんだが、職人の孫に合うもんがあるかね。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「正直、うちの品が親方の目にかなうか分からねえ。一緒に選びましょう」",
          effects: { revenue: 1000, laughter: 4, humanity: 12, trouble: -2 },
          result: "二人で品を吟味し、源造は小さなねじ回しを手に「これにする」とうなずいた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「お孫さんには、この道具に『じいちゃんの弟子一号』って名前を付けてやってくだせえ」",
          effects: { revenue: 1300, laughter: 10, humanity: 6, trouble: 0 },
          result: "源造は思わず吹き出し、「そりゃいい」と二本買っていった。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「親方のお孫さんなら、何を持たせても名人になりますよ」",
          effects: { revenue: 600, laughter: 4, humanity: -2, trouble: 4 },
          result: "「世辞はいらねえ」源造はむっとして、何も買わずに帰っていった。"
        }
      ]
    },
    {
      id: "E23",
      town: "hiyori",
      title: "夏祭りの準備",
      tier: "mid",
      character: "toki",
      product: null,
      dialogue: "まことさん、悪いけど夏祭りのやぐら組み、人手が足りないんだよ。店はどうする？",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「店は閉めて手伝います！ 力仕事なら任せてくだせえ」",
          effects: { revenue: -500, laughter: 4, humanity: 18, trouble: -6 },
          result: "汗だくで働いた夕方、ときが冷えたラムネを差し出してくれた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「手伝いながら、やぐらの上から口上を一席ぶちましょう！」",
          effects: { revenue: 800, laughter: 14, humanity: 4, trouble: 6 },
          result: "やぐらの上の口上は大ウケだったが、作業は少し遅れてしまった。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「おかみさんの采配があれば、人手なんて足りますよ！」",
          effects: { revenue: 1000, laughter: 4, humanity: -4, trouble: 4 },
          result: "「口ばっかりだね」ときはため息をつき、ほかの人を探しに行った。"
        }
      ]
    },
    {
      id: "E24",
      town: "hiyori",
      title: "町内会の大口注文",
      tier: "final",
      character: "matsuko",
      product: { icon: "🪭", name: "和紙のうちわ", blurb: "夏祭りにぴったりの手刷り柄" },
      dialogue: "町内会の盆踊りで、うちわを百本頼みたいの。もちろん、まとめて安くしてくれるわよね？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「百本お買い上げなら、うちわに町内会の名前を刷ってお付けしましょう」",
          effects: { revenue: 2400, laughter: 8, humanity: 6, trouble: 0 },
          result: "「気が利くじゃない！」松子は大喜びで、手付金を置いていった。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「町内一の目利きの奥さんに頼まれちゃ、断れませんや。三割引きで！」",
          effects: { revenue: 1700, laughter: 4, humanity: 4, trouble: 0 },
          result: "「さすが分かってるわね」と松子は上機嫌で注文書に判を押した。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「百本と言わず二百本！ 来年の分まで買っとくのが粋ってもんでさあ！」",
          effects: { revenue: 1500, laughter: 10, humanity: -6, trouble: 12 },
          result: "「調子に乗るんじゃないわよ」と松子はあきれ、注文を八十本に減らした。"
        }
      ]
    },
    {
      id: "E25",
      title: "迷子の子",
      tier: "final",
      character: "crowd",
      product: null,
      dialogue: "夕暮れ、店先で小さな女の子が泣いている。見物の衆「迷子みたいだよ。誰か知らないか？」",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「店はいい、みんなで親を探そう！ 嬢ちゃん、もう大丈夫だ」",
          effects: { revenue: -400, laughter: 4, humanity: 18, trouble: -6 },
          result: "通りじゅうで声をかけ合い、駆けつけた母親が何度も頭を下げた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「嬢ちゃん、この飴を舐めて待ってな。色が三回変わる頃に、母ちゃんが来るからな」",
          effects: { revenue: 300, laughter: 10, humanity: 10, trouble: 0 },
          result: "飴に夢中になっているうちに、本当に母親が迎えに来た。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「迷子の親御さん、いらっしゃいませー！ ついでにお土産もどうぞー！」",
          effects: { revenue: 1100, laughter: 12, humanity: -8, trouble: 12 },
          result: "呼び込みで親は見つかったが、「人の子をだしに商売するな」とヤジが飛んだ。"
        }
      ]
    },
    {
      id: "E26",
      town: "hiyori",
      title: "飛び入り口上大会",
      tier: "final",
      character: "toki",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "今夜は商店街の口上自慢大会だよ。旅の人も飛び入り歓迎だって。出るかい？",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「出ます！ 日本一の口上、とくとご覧あれ！」",
          effects: { revenue: 2000, laughter: 18, humanity: -4, trouble: 14 },
          result: "大げさすぎる口上に会場は総立ち。優勝は逃したが、飴は飛ぶように売れた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「飛び入りの旅商人、日和町の皆さんに一席！」",
          effects: { revenue: 1600, laughter: 14, humanity: 6, trouble: 2 },
          result: "土地の名物を織り込んだ口上が大受けし、特別賞をもらった。"
        },
        {
          id: "C",
          type: "honest",
          text: "「今夜は客席で、皆さんの口上を勉強させてもらいます」",
          effects: { revenue: 500, laughter: 2, humanity: 12, trouble: -4 },
          result: "「殊勝だね」とときが笑い、出場者たちからは飴の注文が入った。"
        }
      ]
    },

    // ---------- 旅の町の場面 ----------
    {
      id: "S01",
      town: "shiomi",
      title: "大漁祝い",
      tier: "normal",
      character: "tatsu",
      product: { icon: "🐱", name: "福招き猫のお守り", blurb: "持てば運気が上向く……かもしれない" },
      dialogue: "今日は大漁だ！ 兄さん、景気のいい口上で祝ってくれや！",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「大漁を呼ぶ招き猫！ 明日の網は魚で破れるぞ！」",
          effects: { revenue: 1700, laughter: 16, humanity: 0, trouble: 8 },
          result: "漁師たちは大笑いで、招き猫を船ごとに一つずつ買っていった。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「さすが親方、海の男の中の男！」",
          effects: { revenue: 900, laughter: 4, humanity: 0, trouble: 2 },
          result: "「世辞はいらねえ。魚と同じで、話も鮮度が命だ」と親方は笑い飛ばした。"
        },
        {
          id: "C",
          type: "help",
          text: "「網の繕い、手伝いますよ。口上はそのあとで」",
          effects: { revenue: 600, laughter: 4, humanity: 14, trouble: -2 },
          result: "繕い終わると、漁師たちが「礼だ」と干物を持たせ、品も買ってくれた。"
        }
      ]
    },
    {
      id: "S02",
      town: "shiomi",
      title: "海女の頼み",
      tier: "normal",
      character: "minami",
      product: { icon: "🪭", name: "和紙のうちわ", blurb: "夏祭りにぴったりの手刷り柄" },
      dialogue: "この浜の子たちに、何か夏の思い出になるもの、ないかな？",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「高いもんはないけど、うちわなら子どもの手にちょうどいい」",
          effects: { revenue: 900, laughter: 2, humanity: 10, trouble: -2 },
          result: "美波は子どもの数だけうちわを買い、浜にうちわの花が咲いた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「この飴を海に沈めると七色の魚に……はならないけど、子どもは喜ぶよ」",
          effects: { revenue: 1100, laughter: 12, humanity: 2, trouble: 0 },
          result: "「ならないんかい」と美波が吹き出し、飴を大袋で買っていった。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この笛を吹けば、イルカが寄ってくる！」",
          effects: { revenue: 1400, laughter: 12, humanity: -4, trouble: 10 },
          result: "子どもたちが一日中笛を吹き続け、浜は大騒ぎになった。"
        }
      ]
    },
    {
      id: "S03",
      town: "shiomi",
      title: "時化の知らせ",
      tier: "mid",
      character: "tatsu",
      product: null,
      dialogue: "おい、午後から時化るぞ！ 港の荷を片付けにゃならん！",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「店はたたんで手伝います！」",
          effects: { revenue: -400, laughter: 2, humanity: 18, trouble: -6 },
          result: "荷を運び終えた頃、雨が降り出した。漁師たちの見る目が変わった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「時化の前に、時化てない値段で売り切りだ！」",
          effects: { revenue: 1300, laughter: 12, humanity: -2, trouble: 4 },
          result: "駆け込みの客で品は売り切れたが、片付けには間に合わなかった。"
        },
        {
          id: "C",
          type: "honest",
          text: "「すまねえ、俺の荷を先に守らせてくれ」",
          effects: { revenue: 600, laughter: 0, humanity: -2, trouble: 0 },
          result: "品は無事だったが、漁師たちの輪には入りそびれた。"
        }
      ]
    },
    {
      id: "S04",
      town: "shiomi",
      title: "浜の花火",
      tier: "final",
      character: "minami",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "今夜、浜で小さな花火をやるの。お店、出してくれる？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「花火の合間に、一発ずつ口上を打ち上げましょう！」",
          effects: { revenue: 2000, laughter: 14, humanity: 6, trouble: 2 },
          result: "花火と口上の掛け合いに浜じゅうが沸き、品は残らず売れた。"
        },
        {
          id: "B",
          type: "help",
          text: "「売るより、子どもたちに線香花火を配りましょう」",
          effects: { revenue: -300, laughter: 4, humanity: 18, trouble: -4 },
          result: "小さな火を囲む子どもたちの顔を、まことはきっと忘れないだろう。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この港いちばんの花火、打ち上げは俺の口上だ！」",
          effects: { revenue: 1800, laughter: 16, humanity: -6, trouble: 14 },
          result: "盛り上がりすぎて見物の船が岸に寄りすぎ、漁師に怒鳴られた。"
        }
      ]
    },
    {
      id: "Y01",
      town: "yunosawa",
      title: "宿の若旦那",
      tier: "normal",
      character: "seikichi",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "うちの宿のお客に、何か面白い土産はないかね。売れるなら帳場に置いてもいい。",
      choices: [
        {
          id: "A",
          type: "flatter",
          text: "「湯ノ沢一の名宿の若旦那に見込まれちゃ、光栄でさあ」",
          effects: { revenue: 1600, laughter: 6, humanity: 2, trouble: 0 },
          result: "若旦那は鼻高々で、宿の帳場に品を並べてくれた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「湯けむりの向こうで色が変わる、湯ノ沢限定の七色飴でどうです」",
          effects: { revenue: 1400, laughter: 12, humanity: 2, trouble: 2 },
          result: "「限定」の一言が効き、宿の客がこぞって買っていった。"
        },
        {
          id: "C",
          type: "honest",
          text: "「正直、ここの名物饅頭にはかないません」",
          effects: { revenue: 300, laughter: 2, humanity: 6, trouble: 0 },
          result: "「そんなこと言われてもねえ」と若旦那は興ざめした顔をした。"
        }
      ]
    },
    {
      id: "Y02",
      town: "yunosawa",
      title: "湯治客の相談",
      tier: "normal",
      character: "shige",
      product: { icon: "🪵", name: "肩たたき棒「ぽんぽこ」", blurb: "叩けば叩くほど肩が軽くなる" },
      dialogue: "腰を悪くしてね。何か楽になる道具はないかね。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「治す道具はねえです。でも肩たたき棒で、少しは楽になるかもしれません」",
          effects: { revenue: 900, laughter: 2, humanity: 12, trouble: -2 },
          result: "繁蔵は「正直でいい」と笑い、二本買っていった。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「この肩たたき棒で、腰もたちまち二十歳に！」",
          effects: { revenue: 1300, laughter: 10, humanity: -6, trouble: 10 },
          result: "繁蔵は眉をひそめ、「温泉より効くとは大きく出たね」と首を振った。"
        },
        {
          id: "C",
          type: "help",
          text: "「宿まで荷物、お持ちしますよ」",
          effects: { revenue: 200, laughter: 2, humanity: 14, trouble: -2 },
          result: "宿に着くと、繁蔵は「礼だよ」と土産を三つ買ってくれた。"
        }
      ]
    },
    {
      id: "Y03",
      town: "yunosawa",
      title: "足湯の口上",
      tier: "mid",
      character: "crowd",
      product: { icon: "🔧", name: "なんでも開けるくん", blurb: "瓶のフタから缶詰まで、これ一本" },
      dialogue: "見物の衆「兄さん、足湯につかりながら口上やってくれよ！」",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「湯加減も口上も、ちょうどいい塩梅でございます！」",
          effects: { revenue: 1100, laughter: 14, humanity: 4, trouble: 2 },
          result: "足湯の客が笑いながら、湯から上がるたびに品を買っていった。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「この足湯につかれば、品物の御利益も倍増！」",
          effects: { revenue: 1400, laughter: 14, humanity: -4, trouble: 12 },
          result: "足湯に人が押し寄せ、宿から「定員を守って」と苦情が来た。"
        },
        {
          id: "C",
          type: "honest",
          text: "「足湯は足湯、商いは商い。今日は湯を楽しみます」",
          effects: { revenue: 0, laughter: 4, humanity: 8, trouble: -4 },
          result: "湯につかって世間話をするうち、自然と客が寄ってきた。"
        }
      ]
    },
    {
      id: "Y04",
      town: "yunosawa",
      title: "宴会の余興",
      tier: "final",
      character: "seikichi",
      product: null,
      dialogue: "今夜の宴会で余興を頼みたい。口上を一席、お礼ははずむよ。",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「天下一の口上で、宴会場をひっくり返してみせましょう！」",
          effects: { revenue: 2200, laughter: 18, humanity: -4, trouble: 12 },
          result: "宴会場は大盛り上がり。お膳が一つひっくり返ったのはご愛嬌。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「若旦那の宿の宴会に呼ばれるとは、旅商人冥利に尽きます」",
          effects: { revenue: 1600, laughter: 6, humanity: 4, trouble: 0 },
          result: "若旦那は上機嫌で、ご祝儀をはずんでくれた。"
        },
        {
          id: "C",
          type: "help",
          text: "「お礼はいらねえ。宿の皆さんへの恩返しってことで」",
          effects: { revenue: 0, laughter: 6, humanity: 18, trouble: -4 },
          result: "無償の余興に宿の者たちが感激し、翌朝、見送りが大勢並んだ。"
        }
      ]
    },
    {
      id: "S05",
      town: "shiomi",
      title: "朝市の場所取り",
      tier: "normal",
      character: "crowd",
      product: { icon: "🍬", name: "七色ハッカ飴", blurb: "舐めるたびに色が変わる、日和町名物" },
      dialogue: "見物の衆「朝市はもう始まってるぞ！ 兄さん、どこに店を出すんだい？」",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「魚屋の隣に陣取って、『魚もびっくりの安さ』で行こう！」",
          effects: { revenue: 1300, laughter: 14, humanity: 0, trouble: 2 },
          result: "魚屋の親父まで笑い出し、客が両方の店を行き来した。"
        },
        {
          id: "B",
          type: "honest",
          text: "「端っこで十分です。邪魔にならないところでやらせてもらいます」",
          effects: { revenue: 600, laughter: 2, humanity: 10, trouble: -2 },
          result: "控えめな場所取りが好印象で、朝市の人たちが品を見に来てくれた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「朝市の真ん中、一番いい場所は俺のもんだ！」",
          effects: { revenue: 1600, laughter: 12, humanity: -6, trouble: 14 },
          result: "場所取りでもめ、朝市の世話役に呼び出されてしまった。"
        }
      ]
    },
    {
      id: "Y05",
      town: "yunosawa",
      title: "湯上がりの土産選び",
      tier: "normal",
      character: "crowd",
      product: { icon: "🪭", name: "和紙のうちわ", blurb: "夏祭りにぴったりの手刷り柄" },
      dialogue: "見物の衆「湯上がりで気分がいいんだ。何か面白いもん見せてくれよ」",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「湯上がりの肌にこの飴！ 舐めればもうひと風呂分あったまる！」",
          effects: { revenue: 1500, laughter: 14, humanity: -2, trouble: 8 },
          result: "浴衣姿の客たちが、げらげら笑いながら飴を買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「湯冷めしないうちに、うちわであおいで……あれ、冷えちまう！」",
          effects: { revenue: 1100, laughter: 14, humanity: 2, trouble: 0 },
          result: "一人ボケツッコミに温泉客が大笑いし、うちわが売れた。"
        },
        {
          id: "C",
          type: "help",
          text: "「足元、気をつけて。宿まで灯りを持っていきますよ」",
          effects: { revenue: 300, laughter: 2, humanity: 14, trouble: -2 },
          result: "夜道を照らして送り届けると、客たちが翌朝そろって店に来てくれた。"
        }
      ]
    },
    {
      id: "T01",
      town: "touge",
      title: "峠の一服",
      tier: "normal",
      character: "oshin",
      product: { icon: "🍬", name: "峠のはっか飴", blurb: "ひと粒で峠の上り坂も涼しく" },
      dialogue: "峠を越える人はみんなくたびれてるんだ。何か、ほっとするものはないかい？",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「女将さん、まずはお茶運び手伝います。飴はそのあとで」",
          effects: { revenue: 600, laughter: 4, humanity: 14, trouble: -2 },
          result: "茶を配り終えると、旅人たちが「さっきの兄さんの飴を」と買ってくれた。"
        },
        {
          id: "B",
          type: "honest",
          text: "「はっか飴です。疲れが取れるとは言いませんが、口はすっとします」",
          effects: { revenue: 900, laughter: 2, humanity: 10, trouble: -2 },
          result: "「正直だねえ」と女将が笑い、茶屋の棚に飴を置いてくれた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この飴をなめれば、峠なんてひとっ飛び！」",
          effects: { revenue: 1500, laughter: 12, humanity: -4, trouble: 10 },
          result: "飛べなかった旅人が文句を言いに戻ってきて、茶屋は大騒ぎになった。"
        }
      ]
    },
    {
      id: "T02",
      town: "touge",
      title: "トラックの荷台",
      tier: "normal",
      character: "genta",
      product: { icon: "📻", name: "手回しラジオ", blurb: "電池いらずで峠でも聞ける" },
      dialogue: "おう、峠道は退屈でよう。何か景気のいいもん、売ってくれや！",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「このラジオ、峠のてっぺんなら外国の放送まで入る！」",
          effects: { revenue: 1600, laughter: 14, humanity: 0, trouble: 8 },
          result: "源太は大喜びでラジオを買い、荷台から大音量で流していった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「退屈な峠道も、ラジオがあれば寄席になりますよ」",
          effects: { revenue: 1200, laughter: 12, humanity: 2, trouble: 0 },
          result: "「寄席か、そりゃいい！」と源太は仲間の分まで買っていった。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「さすが峠の王様、ハンドルさばきが違う！」",
          effects: { revenue: 700, laughter: 2, humanity: -2, trouble: 2 },
          result: "「おだてても荷台には乗せねえぞ」と源太は肩をすくめた。"
        }
      ]
    },
    {
      id: "T03",
      town: "touge",
      title: "峠の雨宿り",
      tier: "mid",
      character: "oshin",
      product: { icon: "☂️", name: "番傘", blurb: "急な雨でも心強い" },
      dialogue: "あらあら、急に降ってきたよ！ 旅人さんたち、びしょ濡れになっちまう！",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「傘はお代はあとで。まずは皆さん、軒下へ！」",
          effects: { revenue: -300, laughter: 4, humanity: 18, trouble: -4 },
          result: "雨が上がると、旅人たちが口々に礼を言い、女将は茶をおごってくれた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「雨の峠で番傘一本、これぞ旅の絵になりますよ」",
          effects: { revenue: 1400, laughter: 12, humanity: 0, trouble: 2 },
          result: "絵になると言われた旅人たちが、次々と番傘を買っていった。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この傘、雷もよけてくれる！」",
          effects: { revenue: 1700, laughter: 14, humanity: -6, trouble: 12 },
          result: "そこへ本当に雷が鳴り、旅人たちは傘を放り出して逃げまどった。"
        }
      ]
    },
    {
      id: "T04",
      town: "touge",
      title: "峠の運び屋",
      tier: "final",
      character: "genta",
      product: { icon: "🧭", name: "方位磁石", blurb: "峠で迷っても北がわかる" },
      dialogue: "兄さん、今夜の便で峠を越えるんだ。最後にでかい商い、やってみねえか？",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「この磁石があれば、夜の峠も昼みてえに走れる！」",
          effects: { revenue: 2000, laughter: 16, humanity: -2, trouble: 10 },
          result: "源太は運転手仲間を集めて、磁石を箱ごと買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「迷ったら北を向く。人生も峠道も同じですよ」",
          effects: { revenue: 1900, laughter: 14, humanity: 4, trouble: 2 },
          result: "「うまいこと言うじゃねえか」と源太は膝を打ち、仲間に宣伝してくれた。"
        },
        {
          id: "C",
          type: "honest",
          text: "「夜の峠は危ないです。磁石より、明日の朝まで待ったほうがいい」",
          effects: { revenue: 500, laughter: 2, humanity: 12, trouble: -4 },
          result: "源太はしぶしぶ出発を延ばし、翌朝、礼に磁石を二つ買っていった。"
        }
      ]
    },
    {
      id: "T05",
      town: "touge",
      title: "茶屋の見物衆",
      tier: "normal",
      character: "crowd",
      product: { icon: "🎐", name: "風鈴", blurb: "峠の風でよく鳴る" },
      dialogue: "見物の衆「峠の風は冷てえや。兄さん、一つ笑わせてくれよ！」",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「峠の風で鳴る風鈴、町に持って帰れば夏でも涼しい！」",
          effects: { revenue: 1300, laughter: 14, humanity: 0, trouble: 2 },
          result: "見物衆がどっと笑い、土産に風鈴がよく売れた。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「峠を越えてきたお客さん方、皆さん健脚ですねえ！」",
          effects: { revenue: 900, laughter: 6, humanity: 2, trouble: 0 },
          result: "褒められた旅人たちは照れ笑いし、ついでに風鈴を買っていった。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この風鈴が鳴ると、天狗が出る！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 12 },
          result: "子どもたちが泣き出し、茶屋の女将に叱られた。"
        }
      ]
    },
    {
      id: "J01",
      town: "joka",
      title: "ご隠居の散歩",
      tier: "normal",
      character: "mido",
      product: { icon: "🖌️", name: "細筆", blurb: "書き味なめらかな上等品" },
      dialogue: "そこの者。この町で物を売るなら、それ相応の口上があろうな？",
      choices: [
        {
          id: "A",
          type: "flatter",
          text: "「ご隠居さまのような目利きにこそ、お見せしたい筆でございます」",
          effects: { revenue: 1300, laughter: 4, humanity: 4, trouble: 0 },
          result: "ご隠居は満足げにうなずき、筆を三本お買い上げになった。"
        },
        {
          id: "B",
          type: "honest",
          text: "「上等ですが、特別な筆ではありません。書き味だけは確かです」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "「正直でよろしい」とご隠居は筆を手に取り、試し書きをして買っていった。"
        },
        {
          id: "C",
          type: "wit",
          text: "「この筆で書けば、字が勝手にうまく……はなりませんが」",
          effects: { revenue: 600, laughter: 10, humanity: -4, trouble: 4 },
          result: "「軽々しい」とご隠居は顔をしかめ、見物人だけがくすくす笑った。"
        }
      ]
    },
    {
      id: "J02",
      town: "joka",
      title: "和菓子屋の看板娘",
      tier: "normal",
      character: "chiyo",
      product: { icon: "🍡", name: "お団子の型", blurb: "家でも城下の団子が作れる" },
      dialogue: "うちの団子、最近売れないの。何かいい売り方、ないかしら？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「団子は三つで一串。お客さんも三人で来れば一串おまけ、ってのは？」",
          effects: { revenue: 1200, laughter: 12, humanity: 4, trouble: 0 },
          result: "千代は手を叩いて喜び、店先に新しい札を貼った。お礼に型も買ってくれた。"
        },
        {
          id: "B",
          type: "help",
          text: "「今日はうちの店先で、団子も一緒に売りましょう」",
          effects: { revenue: 700, laughter: 4, humanity: 14, trouble: -2 },
          result: "露店と和菓子屋が並び、両方の品がよく売れた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この型で作った団子は、殿様も食べたんだ！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 10 },
          result: "「それ、嘘でしょう？」と千代に見抜かれ、町じゅうに噂が広まった。"
        }
      ]
    },
    {
      id: "J03",
      town: "joka",
      title: "お城の茶会",
      tier: "mid",
      character: "mido",
      product: { icon: "🍵", name: "茶せん", blurb: "お点前の練習に" },
      dialogue: "今宵、城で茶会がある。そなたの品、茶人の目にかなうか試してみるか？",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「茶人の目にかなうかはわかりません。ただ、一本一本手で作った品です」",
          effects: { revenue: 1600, laughter: 4, humanity: 12, trouble: -2 },
          result: "ご隠居は茶会でその話をし、茶人たちが茶せんを求めに来た。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「ご隠居さまのお目にかなえば、どなたの目にもかないましょう」",
          effects: { revenue: 1800, laughter: 6, humanity: 2, trouble: 2 },
          result: "ご隠居は気をよくして、茶会の土産にと茶せんをまとめて買った。"
        },
        {
          id: "C",
          type: "wit",
          text: "「茶せんで泡を立てれば、話にも花が咲きますよ」",
          effects: { revenue: 800, laughter: 12, humanity: -4, trouble: 6 },
          result: "「茶の湯を茶化すでない」とご隠居に一喝された。"
        }
      ]
    },
    {
      id: "J04",
      town: "joka",
      title: "城下の夜祭り",
      tier: "final",
      character: "chiyo",
      product: { icon: "🏮", name: "紙ちょうちん", blurb: "夜祭りに灯す手作りのちょうちん" },
      dialogue: "今夜は城下の夜祭りなの。最後に、うちと一緒にひと勝負しない？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「団子とちょうちん、両手がふさがったら……口で食べるしかない！」",
          effects: { revenue: 2000, laughter: 16, humanity: 4, trouble: 2 },
          result: "千代が吹き出し、二人の口上に祭りの客が集まった。"
        },
        {
          id: "B",
          type: "help",
          text: "「暗い道に灯りを。お年寄りの分はただで配ります」",
          effects: { revenue: -200, laughter: 4, humanity: 18, trouble: -4 },
          result: "灯りに照らされた道で、千代が「あんた、いい人ね」と笑った。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「このちょうちんは、お城の天守にも飾られた！」",
          effects: { revenue: 2100, laughter: 14, humanity: -6, trouble: 14 },
          result: "本当かと城の役人が確かめに来て、祭りは一時騒然となった。"
        }
      ]
    },
    {
      id: "J05",
      town: "joka",
      title: "城下の見物衆",
      tier: "normal",
      character: "crowd",
      product: { icon: "🎎", name: "こけし", blurb: "城下の職人が削った素朴な人形" },
      dialogue: "見物の衆「城下の人間は目が肥えてるよ。さあ、どう売る？」",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「職人が一本ずつ削ったこけしです。顔も一つずつ違います」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "見物衆は顔を見比べ、気に入った一本をそれぞれ買っていった。"
        },
        {
          id: "B",
          type: "wit",
          text: "「このこけし、城下の人に似て、目が肥えてる顔をしてる！」",
          effects: { revenue: 1300, laughter: 14, humanity: 0, trouble: 2 },
          result: "どっと笑いが起き、「うちのばあさんに似てる」と次々に売れた。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「さすが城下のお客さん、お目が高い！」",
          effects: { revenue: 1100, laughter: 4, humanity: 0, trouble: 2 },
          result: "見物衆は「わかってるじゃないか」と気をよくして買っていった。"
        }
      ]
    },
    {
      id: "W01",
      town: "yukimi",
      title: "夜明け前の朝市",
      tier: "normal",
      character: "fumi",
      product: { icon: "🧤", name: "毛糸の手袋", blurb: "朝市の寒さもへっちゃら" },
      dialogue: "あんた、こんな寒い朝に露店なんて根性あるね。何売ってんの？",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「毛糸の手袋です。編み目は粗いけど、あったかさは本物です」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "フミは手袋をはめて「本当だ」とうなずき、市の仲間に勧めてくれた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「手袋をすれば、寒さも手も足も出ない！」",
          effects: { revenue: 1200, laughter: 12, humanity: 2, trouble: 0 },
          result: "「うまい！」とフミが笑い、朝市じゅうに広めてくれた。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「おかみさん、こんな寒さでも笑顔が素敵ですね！」",
          effects: { revenue: 600, laughter: 2, humanity: -4, trouble: 2 },
          result: "「寒いのに、口ばっかりあったかいね」とフミは鼻で笑った。"
        }
      ]
    },
    {
      id: "W02",
      town: "yukimi",
      title: "出稼ぎ帰りの土産",
      tier: "normal",
      character: "fuyukichi",
      product: { icon: "🎁", name: "小さな土産袋", blurb: "帰りを待つ家族への贈り物に" },
      dialogue: "久しぶりに村に帰るんだ。家族に何か土産を買いたいんだけど……",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「家族構成を教えて。一人ずつに合う品を選びましょう」",
          effects: { revenue: 800, laughter: 4, humanity: 14, trouble: -2 },
          result: "冬吉は一人ずつの顔を思い浮かべながら選び、うれしそうに帰っていった。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「都会で頑張ってきた息子の土産なら、何でも喜ばれますよ」",
          effects: { revenue: 1300, laughter: 4, humanity: 4, trouble: 0 },
          result: "冬吉は照れながら、土産袋をいっぱいにしていった。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「これは都会で大流行の品！ 村で自慢できる！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 10 },
          result: "「都会でもそういう話にだまされたんだ……」と冬吉はしょんぼりした。"
        }
      ]
    },
    {
      id: "W03",
      town: "yukimi",
      title: "吹雪の朝",
      tier: "mid",
      character: "fumi",
      product: { icon: "🧣", name: "毛糸の襟巻き", blurb: "吹雪の朝の必需品" },
      dialogue: "まずいよ、吹雪いてきた！ 市の荷物、雪に埋もれちまう！",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「襟巻きは後回し！ みんなの荷物を軒下に運びましょう！」",
          effects: { revenue: -300, laughter: 4, humanity: 18, trouble: -6 },
          result: "吹雪がやむと、市の人たちが総出で礼に来て、襟巻きもよく売れた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「吹雪の日こそ襟巻き日和！ 首を守れば商売も守れる！」",
          effects: { revenue: 1400, laughter: 12, humanity: 0, trouble: 4 },
          result: "フミが「調子いいねえ」と笑い、凍えた客たちが襟巻きを求めた。"
        },
        {
          id: "C",
          type: "honest",
          text: "「この吹雪じゃ商売になりません。今日は店じまいします」",
          effects: { revenue: 300, laughter: 0, humanity: 4, trouble: 0 },
          result: "フミは「賢明だね」とうなずいたが、売上はほとんどなかった。"
        }
      ]
    },
    {
      id: "W04",
      town: "yukimi",
      title: "雪見の宴",
      tier: "final",
      character: "fuyukichi",
      product: { icon: "🕯️", name: "雪見ろうそく", blurb: "雪の夜を照らす太いろうそく" },
      dialogue: "今夜は村の雪見の宴なんだ。兄さんも一緒に、何か売ってくれないか？",
      choices: [
        {
          id: "A",
          type: "flatter",
          text: "「冬吉さんが帰ってきた祝いの宴だ。主役が勧めれば皆買いますよ」",
          effects: { revenue: 2000, laughter: 8, humanity: 6, trouble: 2 },
          result: "冬吉が照れながらろうそくを勧め、村じゅうの家に灯りがともった。"
        },
        {
          id: "B",
          type: "help",
          text: "「宴の支度、手伝いますよ。品はそのあとで」",
          effects: { revenue: 300, laughter: 6, humanity: 18, trouble: -4 },
          result: "支度が終わると、村の人たちが「礼だ」とろうそくを全部買ってくれた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「このろうそく、一晩で春を呼ぶ！」",
          effects: { revenue: 2100, laughter: 14, humanity: -8, trouble: 14 },
          result: "春は来ず、溶けたろうそくだけが残った。冬吉は悲しそうな顔をした。"
        }
      ]
    },
    {
      id: "W05",
      town: "yukimi",
      title: "朝市の見物衆",
      tier: "normal",
      character: "crowd",
      product: { icon: "🍠", name: "焼きいもの包み紙", blurb: "新聞紙よりあったかい" },
      dialogue: "見物の衆「寒くて財布の口も凍ってるよ。溶かしてみな！」",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「財布が凍ってるなら、焼きいもで温めましょう！」",
          effects: { revenue: 1300, laughter: 14, humanity: 2, trouble: 2 },
          result: "焼きいもの湯気に客が集まり、財布の口もゆるんだ。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「この包み紙で包めば、雪だって焼きいもになる！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 12 },
          result: "雪を包んだ子どもたちが泣き出し、朝市は大騒ぎになった。"
        },
        {
          id: "C",
          type: "honest",
          text: "「ただの包み紙ですが、二重にしてあるので冷めにくいです」",
          effects: { revenue: 900, laughter: 2, humanity: 10, trouble: -2 },
          result: "朝市のおかみたちが「これは便利」と、まとめて買っていった。"
        }
      ]
    },
    {
      id: "M01",
      town: "monzen",
      title: "小僧さんのお使い",
      tier: "normal",
      character: "chinnen",
      product: { icon: "🧸", name: "からくり人形", blurb: "ぜんまいで歩く小さな人形" },
      dialogue: "和尚さまのお使いの途中なんだけど……その人形、ちょっと見てもいい？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「この人形、お経を読むと止まるんだ。修行が足りないからね」",
          effects: { revenue: 1200, laughter: 14, humanity: 2, trouble: 0 },
          result: "珍念は大笑いし、寺の仲間の分まで小遣いで買っていった。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「この人形、夜になると本堂を歩き回る！」",
          effects: { revenue: 1500, laughter: 14, humanity: -2, trouble: 8 },
          result: "珍念は大喜びで買ったが、夜中に本堂で鳴らして和尚さまに叱られた。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「小僧さん、修行熱心で偉いねえ！」",
          effects: { revenue: 600, laughter: 2, humanity: -4, trouble: 2 },
          result: "「おだてても、お経は短くなりませんよ」と珍念はそっぽを向いた。"
        }
      ]
    },
    {
      id: "M02",
      town: "monzen",
      title: "和尚さんの頼み",
      tier: "normal",
      character: "kakunen",
      product: { icon: "📿", name: "木の数珠", blurb: "手になじむ素朴な数珠" },
      dialogue: "門前で商いをするなら、参拝の方々に失礼のないようにな。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「心得ました。値段もはっきり書いておきます」",
          effects: { revenue: 900, laughter: 2, humanity: 12, trouble: -2 },
          result: "和尚はにっこりうなずき、参拝客に露店を勧めてくれた。"
        },
        {
          id: "B",
          type: "help",
          text: "「境内の掃除、手伝わせてください」",
          effects: { revenue: 500, laughter: 4, humanity: 16, trouble: -4 },
          result: "掃除を終えると、和尚が数珠を十本買い、寺の売店に置いてくれた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この数珠を持てば、どんな願いも叶います！」",
          effects: { revenue: 1600, laughter: 10, humanity: -8, trouble: 10 },
          result: "「方便も、過ぎれば嘘じゃよ」と和尚に静かにたしなめられた。"
        }
      ]
    },
    {
      id: "M03",
      town: "monzen",
      title: "縁日の迷子",
      tier: "mid",
      character: "chinnen",
      product: { icon: "🎈", name: "紙風船", blurb: "ふくらませて遊ぶ昔の玩具" },
      dialogue: "大変！ 縁日で小さい子が迷子になってる！ 泣いちゃって動かないんだ！",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「風船をあげて落ち着かせよう。親御さんを一緒に探そう」",
          effects: { revenue: -300, laughter: 6, humanity: 18, trouble: -4 },
          result: "親が見つかると、珍念が「兄さん、かっこいい！」と目を輝かせた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「迷子の風船、飛んでいく方に親がいる！……かもしれない」",
          effects: { revenue: 1300, laughter: 14, humanity: 2, trouble: 2 },
          result: "子どもが笑い出し、その声で親が駆けつけた。見物人は風船を買っていった。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この風船を持ってれば、絶対迷子にならない！」",
          effects: { revenue: 1700, laughter: 12, humanity: -4, trouble: 12 },
          result: "縁日の子どもたちが風船に殺到し、あちこちで新しい迷子が出た。"
        }
      ]
    },
    {
      id: "M04",
      town: "monzen",
      title: "大祭の夜",
      tier: "final",
      character: "kakunen",
      product: { icon: "🔔", name: "小さな鈴", blurb: "お守りにつける澄んだ音の鈴" },
      dialogue: "今宵は光明寺の大祭じゃ。そなたの商いも、締めくくりにふさわしくな。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「この鈴は、ただの鈴です。でも、鳴るたびに今日を思い出せます」",
          effects: { revenue: 1900, laughter: 6, humanity: 14, trouble: -2 },
          result: "和尚が「よい言葉じゃ」と褒め、参拝客がこぞって鈴を求めた。"
        },
        {
          id: "B",
          type: "help",
          text: "「大祭の売上の一部を、お寺の修繕に納めます」",
          effects: { revenue: 800, laughter: 4, humanity: 20, trouble: -4 },
          result: "和尚は深く頭を下げ、町の人たちが「感心な商人だ」と噂した。"
        },
        {
          id: "C",
          type: "wit",
          text: "「鈴を鳴らせば、仏さまも振り向く……かどうかは和尚さんに聞いて！」",
          effects: { revenue: 2000, laughter: 16, humanity: -2, trouble: 4 },
          result: "和尚も思わず苦笑いし、境内が笑いに包まれた。"
        }
      ]
    },
    {
      id: "M05",
      town: "monzen",
      title: "門前の参拝客",
      tier: "normal",
      character: "crowd",
      product: { icon: "🍘", name: "厄よけせんべい", blurb: "参拝の帰りにぱりっと一枚" },
      dialogue: "見物の衆「お参りの帰りだ。何かご利益のありそうなもん、ないかい？」",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「ご利益はわかりませんが、焼きたてでうまいのは確かです」",
          effects: { revenue: 1000, laughter: 4, humanity: 10, trouble: -2 },
          result: "参拝客は「正直者だ」と笑い、せんべいを土産に買っていった。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「このせんべいを食べれば、一年間厄がよけていく！」",
          effects: { revenue: 1600, laughter: 12, humanity: -6, trouble: 12 },
          result: "寺の人に聞きとがめられ、参拝客の間で口論になった。"
        },
        {
          id: "C",
          type: "wit",
          text: "「厄よけせんべい、割れたら厄も割れた証拠！」",
          effects: { revenue: 1300, laughter: 14, humanity: 2, trouble: 2 },
          result: "参拝客はわざとせんべいを割って大笑いし、またもう一枚買っていった。"
        }
      ]
    },
    {
      id: "K01",
      town: "kuroiwa",
      title: "給料日の炭坑夫",
      tier: "normal",
      character: "iwao",
      product: { icon: "🍶", name: "小さな徳利", blurb: "仕事帰りの一杯に" },
      dialogue: "今日は給料日だ！ 兄ちゃん、景気のいいもん持ってこい！",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「この徳利で飲めば、酒が倍うまくなる！」",
          effects: { revenue: 1700, laughter: 14, humanity: 0, trouble: 8 },
          result: "岩男は大笑いで徳利を買い、仲間を連れて戻ってきた。"
        },
        {
          id: "B",
          type: "help",
          text: "「重い荷物、家まで運びますよ」",
          effects: { revenue: 700, laughter: 4, humanity: 14, trouble: -2 },
          result: "運び終えると、岩男が「気に入った」と徳利を三つ買ってくれた。"
        },
        {
          id: "C",
          type: "wit",
          text: "「徳利は口が細い。給料袋の口も細くしときましょう」",
          effects: { revenue: 800, laughter: 10, humanity: -2, trouble: 4 },
          result: "「難しいこと言われても、わからん！」と岩男は首をかしげた。"
        }
      ]
    },
    {
      id: "K02",
      town: "kuroiwa",
      title: "炭住の井戸端",
      tier: "normal",
      character: "tome",
      product: { icon: "🧺", name: "竹かご", blurb: "洗濯物にも買い物にも" },
      dialogue: "あんた、炭住で物売るなら、子どもと年寄りを大事にしてくれよ。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「かごは丈夫です。値段も炭住向けに安くしておきます」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "トメは「話がわかる」とうなずき、井戸端の仲間に勧めてくれた。"
        },
        {
          id: "B",
          type: "help",
          text: "「おばあちゃんの家の分、届けてきます」",
          effects: { revenue: 600, laughter: 4, humanity: 16, trouble: -4 },
          result: "届け終えると、トメが「あんた、いい子だねえ」とかごを二つ買ってくれた。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「おかみさん、炭住一の美人ですね！」",
          effects: { revenue: 700, laughter: 6, humanity: -4, trouble: 2 },
          result: "「そういうのは、給料日の男衆に言いな」とトメは笑い飛ばした。"
        }
      ]
    },
    {
      id: "K03",
      town: "kuroiwa",
      title: "坑口の非常ベル",
      tier: "mid",
      character: "iwao",
      product: { icon: "🔦", name: "懐中電灯", blurb: "暗い坑道でも安心" },
      dialogue: "坑口のベルが鳴った！ 停電だ、坑道の連中が出てこられねえ！",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「懐中電灯、全部使ってください！ お代はいりません！」",
          effects: { revenue: -400, laughter: 4, humanity: 20, trouble: -6 },
          result: "坑夫たちが無事に出てくると、岩男が肩を抱いて「恩に着る」と言った。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「この懐中電灯、山の向こうまで照らせる！」",
          effects: { revenue: 1800, laughter: 12, humanity: -6, trouble: 12 },
          result: "大げさな話に坑夫たちが怒鳴り、坑口は騒然となった。"
        },
        {
          id: "C",
          type: "honest",
          text: "「電灯はこれだけです。足りない分は、ろうそくで補いましょう」",
          effects: { revenue: 700, laughter: 2, humanity: 12, trouble: -2 },
          result: "岩男は「助かる」とうなずき、電灯を買い取って仲間に配った。"
        }
      ]
    },
    {
      id: "K04",
      town: "kuroiwa",
      title: "ヤマの盆踊り",
      tier: "final",
      character: "tome",
      product: { icon: "👘", name: "手ぬぐい", blurb: "盆踊りの汗ふきに" },
      dialogue: "今夜はヤマの盆踊りだよ。最後に、町のみんなを喜ばせておくれ。",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「やぐら作り、手伝います！」",
          effects: { revenue: 400, laughter: 6, humanity: 18, trouble: -4 },
          result: "やぐらが立つと、トメが「あんたも踊りな」と手ぬぐいを全部買ってくれた。"
        },
        {
          id: "B",
          type: "honest",
          text: "「手ぬぐいは、炭坑の皆さんの汗のために持ってきました」",
          effects: { revenue: 1900, laughter: 4, humanity: 14, trouble: -2 },
          result: "トメが感心して宣伝し、盆踊りの輪に手ぬぐいが揺れた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この手ぬぐいを振れば、踊りがうまくなる！」",
          effects: { revenue: 2000, laughter: 14, humanity: -4, trouble: 12 },
          result: "振りすぎた人が輪から飛び出し、盆踊りは大混乱になった。"
        }
      ]
    },
    {
      id: "K05",
      town: "kuroiwa",
      title: "ヤマの見物衆",
      tier: "normal",
      character: "crowd",
      product: { icon: "🪀", name: "けん玉", blurb: "坑夫の子どもに大人気" },
      dialogue: "見物の衆「仕事明けで疲れてるんだ。何かぱっと楽しいもん、ないか？」",
      choices: [
        {
          id: "A",
          type: "bluff",
          text: "「このけん玉ができたら、坑道の石も一発で割れる！」",
          effects: { revenue: 1600, laughter: 14, humanity: -2, trouble: 8 },
          result: "坑夫たちが本気で挑戦し、けん玉が飛ぶように売れた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「けん玉は、玉と皿の縁結び。うまくいけば夫婦円満！」",
          effects: { revenue: 1100, laughter: 10, humanity: 2, trouble: 2 },
          result: "おかみさんたちがくすくす笑い、亭主にけん玉を買わせた。"
        },
        {
          id: "C",
          type: "help",
          text: "「子どもたちに、けん玉を教えますよ」",
          effects: { revenue: 600, laughter: 6, humanity: 14, trouble: -2 },
          result: "子どもたちが夢中になり、親たちが礼にけん玉を買っていった。"
        }
      ]
    },
    {
      id: "A01",
      town: "aoba",
      title: "苦学生の値切り",
      tier: "normal",
      character: "manabu",
      product: { icon: "✏️", name: "鉛筆の束", blurb: "試験前の必需品" },
      dialogue: "その鉛筆、論理的に考えて、この値段は高すぎると思いませんか？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「論理的に言えば、この鉛筆で書いた答案は全部正解……とは限らない」",
          effects: { revenue: 1100, laughter: 12, humanity: 2, trouble: 0 },
          result: "学は「なるほど」と笑い、試験前の仲間の分まで買っていった。"
        },
        {
          id: "B",
          type: "honest",
          text: "「確かに安くはない。でも芯が折れにくいのは本当です」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "学は一本試し書きして「理にかなっている」と束で買った。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「さすが大学生、頭がいい！」",
          effects: { revenue: 500, laughter: 2, humanity: -4, trouble: 2 },
          result: "「おだてで財布は開きませんよ。中身もないし」と学は肩をすくめた。"
        }
      ]
    },
    {
      id: "A02",
      town: "aoba",
      title: "喫茶ポエム",
      tier: "normal",
      character: "poem",
      product: { icon: "☕", name: "コーヒーカップ", blurb: "喫茶店で使われている厚手のカップ" },
      dialogue: "うちの店の前で商売かい？ 洒落た口上なら、許してあげよう。",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「このカップで飲めば、ブラックも人生の味がしますよ」",
          effects: { revenue: 1200, laughter: 12, humanity: 2, trouble: 0 },
          result: "マスターは「洒落てるねえ」と笑い、店用にカップを買ってくれた。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「この街でいちばん洒落た店の前で売れるなんて光栄です」",
          effects: { revenue: 1300, laughter: 4, humanity: 4, trouble: 0 },
          result: "マスターはまんざらでもない顔で、常連にカップを勧めてくれた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「このカップは、パリの有名なカフェでも使われてる！」",
          effects: { revenue: 1400, laughter: 10, humanity: -6, trouble: 10 },
          result: "「野暮だねえ」とマスターは顔をしかめ、学生たちが真偽をめぐって議論を始めた。"
        }
      ]
    },
    {
      id: "A03",
      town: "aoba",
      title: "試験前夜",
      tier: "mid",
      character: "manabu",
      product: { icon: "📓", name: "大学ノート", blurb: "書きやすい罫線入り" },
      dialogue: "明日は試験なのに、ノートを全部なくしてしまった……どうしよう。",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「仲間のノートを写させてもらおう。一緒に頼みに行くよ」",
          effects: { revenue: -200, laughter: 4, humanity: 18, trouble: -4 },
          result: "学の仲間たちがノートを貸し、学は涙ぐんで礼を言った。"
        },
        {
          id: "B",
          type: "wit",
          text: "「新しいノートなら、間違いも新しく書ける！」",
          effects: { revenue: 1400, laughter: 14, humanity: 2, trouble: 2 },
          result: "学は思わず吹き出し、気を取り直してノートを買った。"
        },
        {
          id: "C",
          type: "honest",
          text: "「ノートは売れるけど、中身は売れないよ。今夜は寝ずに頑張って」",
          effects: { revenue: 900, laughter: 2, humanity: 10, trouble: -2 },
          result: "学は「その通りだ」とうなずき、ノートを五冊買っていった。"
        }
      ]
    },
    {
      id: "A04",
      town: "aoba",
      title: "学園祭の夜",
      tier: "final",
      character: "poem",
      product: { icon: "🎸", name: "ハーモニカ", blurb: "学生の歌声のおともに" },
      dialogue: "今夜は学園祭だ。うちの店でも演奏会をやる。最後に洒落た一席、どうだい？",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「ハーモニカは吹いても吸っても鳴る。人生もそうありたい！」",
          effects: { revenue: 2100, laughter: 16, humanity: 4, trouble: 2 },
          result: "マスターが「名言だ」と拍手し、演奏会の客がハーモニカを買い求めた。"
        },
        {
          id: "B",
          type: "flatter",
          text: "「マスターの演奏会なら、街じゅうの学生が集まりますよ」",
          effects: { revenue: 1900, laughter: 6, humanity: 6, trouble: 0 },
          result: "上機嫌のマスターが宣伝してくれ、ハーモニカがよく売れた。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「このハーモニカを吹けば、誰でもすぐ歌手になれる！」",
          effects: { revenue: 2000, laughter: 14, humanity: -6, trouble: 14 },
          result: "学生たちが一斉に吹き始め、学園祭は騒音で大混乱になった。"
        }
      ]
    },
    {
      id: "A05",
      town: "aoba",
      title: "坂の上の学生たち",
      tier: "normal",
      character: "crowd",
      product: { icon: "🃏", name: "トランプ", blurb: "下宿の夜のおともに" },
      dialogue: "見物の衆（学生たち）「金はないけど暇はある。面白かったら買うよ！」",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「金はないけど暇はある。トランプは暇を宝に変える道具だ！」",
          effects: { revenue: 1300, laughter: 14, humanity: 2, trouble: 2 },
          result: "学生たちが「うまい！」と手を叩き、下宿ごとにトランプを買っていった。"
        },
        {
          id: "B",
          type: "honest",
          text: "「安物ですが、一組あれば下宿の仲間と何年も遊べます」",
          effects: { revenue: 900, laughter: 2, humanity: 10, trouble: -2 },
          result: "学生たちは「それはありがたい」と、小銭を出し合って買った。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「このトランプで勝てば、試験も満点！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 12 },
          result: "徹夜でトランプをした学生たちが試験に落ち、文句を言いに来た。"
        }
      ]
    },
    {
      id: "N01",
      town: "nagi",
      title: "定期船の船長",
      tier: "normal",
      character: "kaizo",
      product: { icon: "⚓", name: "真鍮の錨飾り", blurb: "船乗りのお守り" },
      dialogue: "島で商売とは珍しいな。島の連中は、うまい話には乗らねえぞ。",
      choices: [
        {
          id: "A",
          type: "honest",
          text: "「うまい話はありません。ただ、この錨飾りは真鍮で錆びません」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "海蔵は「まっすぐな奴だ」と笑い、船に飾る分を買ってくれた。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「この錨飾りを付ければ、どんな嵐でも船が沈まない！」",
          effects: { revenue: 1500, laughter: 14, humanity: 0, trouble: 8 },
          result: "海蔵は「でかく出たな！」と大笑いし、船乗り仲間に勧めてくれた。"
        },
        {
          id: "C",
          type: "flatter",
          text: "「さすが島いちばんの船長、貫禄が違います！」",
          effects: { revenue: 600, laughter: 2, humanity: -4, trouble: 2 },
          result: "「世辞は波に流しとけ」と海蔵は手を振った。"
        }
      ]
    },
    {
      id: "N02",
      town: "nagi",
      title: "物知りおばあ",
      tier: "normal",
      character: "kame",
      product: { icon: "🐚", name: "貝殻の首飾り", blurb: "島の浜で拾った貝で作った" },
      dialogue: "あいや、本土の人かい。島のことを知りたけりゃ、まずあたしに聞きな。",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「おばあ、その荷物、家まで持ちますよ」",
          effects: { revenue: 600, laughter: 4, humanity: 14, trouble: -2 },
          result: "家に着くと、おばあが島じゅうに「いい人が来た」と触れ回ってくれた。"
        },
        {
          id: "B",
          type: "wit",
          text: "「島の物知りに聞けば、この首飾りの貝の出身地もわかりますね」",
          effects: { revenue: 1200, laughter: 12, humanity: 4, trouble: 0 },
          result: "おばあは大笑いし、「この貝はあそこの浜だ」と教えて首飾りを買った。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この首飾り、人魚が作ったんです！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 10 },
          result: "「島で嘘ついたら、明日にはみんな知ってるよ」とおばあににらまれた。"
        }
      ]
    },
    {
      id: "N03",
      town: "nagi",
      title: "欠航の知らせ",
      tier: "mid",
      character: "kaizo",
      product: { icon: "🎣", name: "釣り糸", blurb: "島の釣り人の必需品" },
      dialogue: "まずいな、台風で明日の船は欠航だ。島の連中、本土に用があったんだが……",
      choices: [
        {
          id: "A",
          type: "help",
          text: "「島の人の用事、まとめて聞いておきます。船が出たら私が届けます」",
          effects: { revenue: -300, laughter: 4, humanity: 18, trouble: -4 },
          result: "島の人たちが次々と礼を言いに来て、海蔵が「恩に着る」と頭を下げた。"
        },
        {
          id: "B",
          type: "bluff",
          text: "「欠航の日こそ釣り日和！ この糸なら大物間違いなし！」",
          effects: { revenue: 1700, laughter: 14, humanity: -2, trouble: 8 },
          result: "海蔵は「でかく出たな」と笑い、島の釣り人たちが糸を買い込んだ。"
        },
        {
          id: "C",
          type: "honest",
          text: "「台風の日に商売はできません。私も船を待ちます」",
          effects: { revenue: 300, laughter: 0, humanity: 6, trouble: 0 },
          result: "海蔵は「賢明だ」とうなずいたが、売上はほとんどなかった。"
        }
      ]
    },
    {
      id: "N04",
      town: "nagi",
      title: "島の夏祭り",
      tier: "final",
      character: "kame",
      product: { icon: "🎆", name: "線香花火", blurb: "島の夜に小さな火の花" },
      dialogue: "今夜は島の夏祭りさ。本土の人が店を出すなんて、何十年ぶりかねえ。",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「線香花火は、最後に落ちる玉が大きいほど願いが叶う……と島で聞きました」",
          effects: { revenue: 2000, laughter: 16, humanity: 6, trouble: 2 },
          result: "「そんな話、あたしが今作ったよ」とおばあが笑い、島じゅうが花火を買った。"
        },
        {
          id: "B",
          type: "help",
          text: "「島の子どもたちには、花火を一本ずつ配ります」",
          effects: { revenue: 100, laughter: 6, humanity: 20, trouble: -4 },
          result: "子どもたちの笑顔に、おばあが「あんた、また来なよ」と涙ぐんだ。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「この花火は、本土の大花火大会と同じ火薬だ！」",
          effects: { revenue: 2100, laughter: 14, humanity: -8, trouble: 14 },
          result: "翌朝には島じゅうに「嘘つきの商人」と知れ渡っていた。"
        }
      ]
    },
    {
      id: "N05",
      town: "nagi",
      title: "船着き場の見物衆",
      tier: "normal",
      character: "crowd",
      product: { icon: "🧃", name: "ラムネ", blurb: "島の暑さにしゅわっと一本" },
      dialogue: "見物の衆「船を待つ間は暇でなあ。何か面白いことしてくれよ」",
      choices: [
        {
          id: "A",
          type: "wit",
          text: "「ラムネのビー玉は、取り出せたら島の名人。挑戦者求む！」",
          effects: { revenue: 1300, laughter: 14, humanity: 2, trouble: 2 },
          result: "船を待つ客たちが夢中になり、ラムネが次々に売れた。"
        },
        {
          id: "B",
          type: "honest",
          text: "「冷えたラムネです。船の中は暑いですから、一本どうぞ」",
          effects: { revenue: 1000, laughter: 2, humanity: 10, trouble: -2 },
          result: "客たちは「気が利くね」とラムネを買い、船へ持ち込んだ。"
        },
        {
          id: "C",
          type: "bluff",
          text: "「このラムネを飲めば、船酔いしない！」",
          effects: { revenue: 1500, laughter: 12, humanity: -6, trouble: 12 },
          result: "船の上で酔った客たちが戻ってきて、船着き場は大騒ぎになった。"
        }
      ]
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : window);
