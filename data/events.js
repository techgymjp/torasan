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
 * echo      : { tie, effects, text } その縁があると、どの口上を選んでも効果と一文が上乗せされる
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
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : window);
