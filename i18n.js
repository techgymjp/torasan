/*
 * 表示言語（日本語 / 英語）。端末の言語が日本語なら日本語、それ以外は英語。タイトル画面で切り替えも可能
 * 画面の文言はここ、人物・イベント・結末の英訳は data/en.js にある。
 */
(function (root) {
  "use strict";

  const dict = {
    ja: {
      "doc.title": "啖呵売！昭和人情商店街",
      "doc.desc": "売って笑わせ、失敗して、最後は人情。旅商人の口上と騒動を楽しむ、ブラウザで遊べる会話選択型ドタバタ喜劇。",

      "title.kicker": "昭和人情喜劇　{town}の巻",
      "title.main": "啖呵売！",
      "title.sub": "昭和人情商店街",
      "title.copy": "売って笑わせ、失敗して、最後は人情。",
      "title.shop1": "飴", "title.shop2": "団子", "title.shop3": "金物", "title.shop4": "八百屋",
      "title.menu": "タイトルメニュー",
      "title.start": "商売を始める",
      "title.howto": "遊び方",
      "title.records": "記録を見る",
      "title.note": "※本作は昭和の露店と人情喜劇から着想を得たオリジナル作品です。登場人物・台詞はすべて創作です。",
      "opt.music": "音楽",
      "opt.sfx": "効果音",
      "opt.motion": "演出を控えめにする",
      "legal.privacy": "プライバシーポリシー",
      "legal.adSettings": "広告の設定",
      "url.privacy": "https://techgym.jp/privacy-policy/",

      "act.1": "第一幕", "act.2": "第二幕", "act.3": "第三幕", "act.4": "第四幕", "act.5": "第五幕",
      "hud.of": " ／ 全五幕",
      "hud.params": "パラメーター",
      "hud.sep": "・",
      "hud.momentum": "勢い",
      "hud.momentumFull": "満タン！ 次の大風呂敷は大騒動に",
      "hud.momentumAria": "勢い {n} / 3",
      "stat.revenue": "売上",
      "stat.customers": "客",
      "stat.customersLong": "客数",
      "stat.laughter": "笑い",
      "stat.humanity": "人情",
      "stat.trouble": "騒動",
      "money": "{n}円",
      "people": "{n}人",
      "times": "{n}回",
      "mute.off": "音を消す",
      "mute.on": "音を鳴らす",

      "type.bluff": "大風呂敷",
      "type.wit": "機転",
      "type.honest": "正直",
      "type.flatter": "お世辞",
      "type.help": "お助け",

      "play.trait": "人物メモ：{t}",
      "play.known": "常連帳 … {list}",
      "play.learned": "常連帳に{name}の好みを書き込んだ。",
      "choice.knownLike": "◎ 好み",
      "choice.knownDislike": "× 苦手",
      "records.regulars": "常連帳",
      "records.regularsEmpty": "まだ誰の好みも分かっていません。相性◎や×が出ると書き込まれます。",
      "records.likes": "好き",
      "stock.heading": "開店前の仕入れ",
      "stock.headingTown": "{town}で開店前の仕入れ",
      "title.journey": "旅に出る",
      "journey.stockHeading": "第{n}の町：{town}",
      "journey.hud": "旅 {n}/{total}：{town}",
      "journey.hudDetour": "寄り道：{town}",
      "journey.stockHeadingDetour": "寄り道：{town}",
      "journey.logDetour": "寄り道 {town}　売上 {revenue}・人情 {humanity}（合計に入らない）",
      "journey.townDone": "{town}での商い、これにて終い",
      "journey.townText": "評判（人情 {humanity}）と縁を携えて、次の町へ。",
      "journey.townTextBack": "評判（人情 {humanity}）と縁を携えて、ひとまず{town}へ戻る。この町には、順番が来たらもう一度来られる。",
      "journey.nextTown": "次の町へ ▶",
      "map.heading": "旅の町一覧",
      "map.lead": "旅では10の町を順番に回り、すべての町を巡ったらフィナーレです。途中でタイトルに戻っても、次は続きから再開できます。",
      "map.step": "次の町：{town}",
      "map.progress": "旅の進み {n} / {total}",
      "map.num": "{n}.",
      "map.go": "ここで商売する ▶",
      "map.back": "町一覧へ",
      "map.done": "済　売上 {revenue}",
      "map.locked": "🔒 順番が来ると行ける",
      "map.detourDone": "寄り道済み　売上 {revenue}（順番が来たらもう一度）",
      "map.unlock": "📺 広告を見て鍵を開ける（旅に1回）",
      "map.unlocked": "広告を見終わりました。鍵が開いた町へ行けます。",
      "map.unlockSkipped": "広告を最後まで見ると、鍵を開けられます。",
      "journey.again": "もう一度旅に出る",
      "journey.logLine": "{n}. {town}　売上 {revenue}・人情 {humanity}",
      "journey.total": "旅の売上 合計 {revenue}",
      "journey.best": "（旅の自己ベスト！）",
      "journey.ending": "旅の結末「{name}」",
      "records.journeys": "旅の結末",
      "records.journeyBest": "旅の最高売上：{revenue}",
      "records.towns": "町めぐり",
      "records.townBest": "最高売上 {revenue}",
      "records.townUnseen": "まだ行っていない町",
      "share.journeyText": "『啖呵売！昭和人情商店街』で3つの町を回り、旅の結末「{name}」にたどり着いた！称号は「{title}」、旅の売上{revenue}。",
      "howto.journey": "<strong>旅に出る</strong>：10の町を順番に回り、すべての町を巡ったらフィナーレ（旅の結末）です。町ごとに仕入れ直し、人情（評判）の半分と縁を次の町へ持ち越します。途中でやめても、次は続きから再開できます。Android 版では、広告を見て鍵を開ければ、順番の来ていない町に旅で1回寄り道できます（寄り道は3幕。商売したあとは元の町に戻り、その町に順番が来たら、前回を覚えている人たちとの再訪の場面が待っています）。「商売を始める」は、いまいる町（旅で最後に商売した町）で1日の商売をします。",
      "stock.lead": "予算の中で、今日の品を3つまで選びましょう。品ごとに効く口上や相手が違います。",
      "stock.budget": "予算 {budget}　残り {left}（{n} / {max} 品）",
      "stock.open": "この品揃えで開店 ▶",
      "stock.cost": "仕入れ",
      "play.goods": "仕入れた「{names}」が効いた！",
      "records.dislikes": "苦手",
      "play.choices": "口上を選ぶ（数字キー1〜3でも選べます）",
      "play.deltas": "今回の変化",
      "play.voice": "{name}：{text}",
      "play.like": "相性◎ — {name}の好む口上だった！",
      "play.dislike": "相性× — {name}の嫌う口上だった……",
      "play.overheat": "大風呂敷の連発で調子に乗りすぎた！ 騒動が上乗せされた。",
      "play.echo": "縁が生きた！ {text}",
      "play.tie": "この出会いは、あとの幕に響くかもしれない……",
      "play.followUpTag": "縁",
      "play.momentumUp": "勢いに乗った！（勢い {n}）",
      "play.momentumBonus": "勢いで売上アップ +{amount}",
      "play.cashOut": "勢いを売上に変えて締めた！ +{amount}",
      "play.momentumLost": "勢いが途切れた……",
      "play.bust": "勢い余って大騒動！ 騒動が大きく増え、勢いが途切れた。",
      "stamp.bust": "勢い余って大騒動！",
      "howto.stock": "<strong>仕入れ</strong>：開店前に、予算3,000円で品を3つまで選びます。品ごとに効く口上や相手が違います。",
      "howto.momentum": "<strong>勢い</strong>：笑いを取るとたまり（最大3）、大風呂敷の売上が伸びます。満タンで大風呂敷を切ると大騒動。正直・お助けに切り替えると、勢いを売上に変えて締められます。",
      "play.customers": "客 +{n}人",
      "play.next": "次の幕へ ▶",
      "play.result": "本日の結果を見る ▶",
      "play.quit": "商売をやめて、タイトルに戻りますか？",

      "stamp.overheat": "調子に乗りすぎ！",
      "stamp.flop": "大失敗！",
      "stamp.hit": "大ウケ！",
      "stamp.uproar": "大騒ぎ！",
      "stamp.ninjo": "人情！",
      "stamp.sale": "毎度あり！",

      "result.kicker": "本日の商い、これにて幕",
      "result.new": "新しい結末を発見！",
      "result.ending": "「{name}」",
      "result.honor": "称号：",
      "result.best": "自己ベスト！",
      "result.log": "本日の口上をふりかえる",
      "result.logHead": "{act}「{title}」",
      "result.retry": "もう一度商売する",
      "result.toTitle": "タイトルへ",
      "redo.button": "📺 広告を見て口上を言い直す",
      "redo.done": "口上を選び直せます。",
      "redo.loading": "広告を読み込み中…",
      "redo.unavailable": "広告を読み込めませんでした。少し時間をおいて試してください。",
      "redo.skipped": "広告を最後まで見ると、言い直せます。",

      "share.heading": "結果をシェアする",
      "share.native": "📤 シェア",
      "share.x": "𝕏 ポスト",
      "share.copy": "🔗 URLをコピー",
      "share.copied": "URLをコピーしました！",
      "share.copyFail": "コピーできませんでした。URL：{url}",
      "share.title": "啖呵売！昭和人情商店街",
      "share.text": "『啖呵売！昭和人情商店街』で結末「{name}」にたどり着いた！称号は「{title}」、売上{revenue}。",
      "share.hashtag": "啖呵売昭和人情商店街",
      "share.dialog": "結果をシェア",

      "howto.heading": "遊び方",
      "howto.1": "あなたは旅商人<strong>風間まこと</strong>。日和町商店街の露店で、<strong>全五幕</strong>の商売に挑みます。",
      "howto.2": "各幕に客や騒動が現れます。<strong>3つの口上</strong>から1つを選びましょう<span class=\"kbd-only\">（数字キー1〜3でも選べます）</span>。",
      "howto.3": "口上には型があります。",
      "howto.bluff": "笑いと売上が大きいが、騒動も増える。",
      "howto.wit": "売上と笑いをバランスよく。",
      "howto.honest": "人情が上がる。売上は控えめ。",
      "howto.flatter": "機嫌は取れるが、見抜かれると逆効果。",
      "howto.help": "人情が大きく上がるが、売上を失うことも。",
      "howto.4": "客にはそれぞれ<strong>好きな口上・嫌いな口上</strong>があります。最初は分かりませんが、相性◎や×が出ると<strong>常連帳</strong>に書き込まれ、次からは選択肢に印が付きます。",
      "howto.5": "<strong>大風呂敷を続けると「調子に乗りすぎ」</strong>で騒動が上乗せされます。",
      "howto.6": "最後に、売上・笑い・人情・騒動のバランスで<strong>結末</strong>が決まります。全5種の結末を集めましょう。",
      "howto.ok": "わかった！",

      "records.heading": "商い帳（記録）",
      "records.plays": "プレイ回数",
      "records.best": "最高売上",
      "records.lastTitle": "最後の称号",
      "records.zukan": "結末図鑑",
      "records.count": "（{n} / {total}）",
      "records.num": "其の{n}",
      "records.unknown": "？？？",
      "records.unseen": "まだ見ぬ結末",
      "records.honor": "称号：{t}",
      "records.warning": "※このブラウザでは記録を保存できません。ゲームはそのまま遊べます。",
      "records.close": "閉じる"
    },

    en: {
      "doc.title": "Tankabai! Showa Shopping Street",
      "doc.desc": "Sell, get laughs, mess up, and win them over with heart. A comic choice-based game about a traveling street peddler, playable in your browser.",

      "title.kicker": "A Showa-Era Comedy — {town}",
      "title.main": "Tankabai!",
      "title.sub": "Showa Shopping Street",
      "title.copy": "Sell, get laughs, mess up — and win them over with heart.",
      "title.shop1": "Candy", "title.shop2": "Dango", "title.shop3": "Tools", "title.shop4": "Veggies",
      "title.menu": "Title menu",
      "title.start": "Open for Business",
      "title.howto": "How to Play",
      "title.records": "Records",
      "title.note": "* An original work inspired by Showa-era street stalls and heartfelt comedies. All characters and lines are fictional.",
      "opt.music": "Music",
      "opt.sfx": "Sound FX",
      "opt.motion": "Reduce effects",
      "legal.privacy": "Privacy Policy",
      "legal.adSettings": "Ad settings",
      "url.privacy": "https://techgym.jp/privacy-policy-en/",

      "act.1": "Act I", "act.2": "Act II", "act.3": "Act III", "act.4": "Act IV", "act.5": "Act V",
      "hud.of": " / 5 Acts",
      "hud.params": "Stats",
      "hud.sep": "·",
      "hud.momentum": "Momentum",
      "hud.momentumFull": "Full! Another tall tale means uproar",
      "hud.momentumAria": "Momentum {n} / 3",
      "stat.revenue": "Sales",
      "stat.customers": "Customers",
      "stat.customersLong": "Customers",
      "stat.laughter": "Laughs",
      "stat.humanity": "Heart",
      "stat.trouble": "Trouble",
      "money": "¥{n}",
      "people": "{n}",
      "times": "{n}",
      "mute.off": "Mute",
      "mute.on": "Unmute",

      "type.bluff": "Tall Tale",
      "type.wit": "Quick Wit",
      "type.honest": "Honesty",
      "type.flatter": "Flattery",
      "type.help": "Lend a Hand",

      "play.trait": "Notes: {t}",
      "play.known": "Regulars' book — {list}",
      "play.learned": "You noted {name}'s taste in your regulars' book.",
      "choice.knownLike": "◎ Likes",
      "choice.knownDislike": "× Dislikes",
      "records.regulars": "Regulars' Book",
      "records.regularsEmpty": "You don't know anyone's tastes yet. They're written down when you get a great or bad match.",
      "records.likes": "Likes",
      "stock.heading": "Stock Up Before Opening",
      "stock.headingTown": "Stock Up in {town}",
      "title.journey": "Go on a Journey",
      "journey.stockHeading": "Town {n}: {town}",
      "journey.hud": "Journey {n}/{total}: {town}",
      "journey.hudDetour": "Detour: {town}",
      "journey.stockHeadingDetour": "Detour: {town}",
      "journey.logDetour": "Detour {town} — Sales {revenue} · Heart {humanity} (not counted)",
      "journey.townDone": "Business in {town} is done",
      "journey.townText": "Carrying your reputation (Heart {humanity}) and ties, you head for the next town.",
      "journey.townTextBack": "Carrying your reputation (Heart {humanity}) and ties, you head back to {town}. You can come back here when its turn comes.",
      "journey.nextTown": "Next Town ▶",
      "map.heading": "Towns on the Journey",
      "map.lead": "A journey visits all 10 towns in order — finish them all for the grand finale. If you return to the title midway, you'll pick up where you left off.",
      "map.step": "Next town: {town}",
      "map.progress": "Journey progress {n} / {total}",
      "map.num": "{n}.",
      "map.go": "Do business here ▶",
      "map.back": "Back to Towns",
      "map.done": "Done · Sales {revenue}",
      "map.locked": "🔒 Opens when its turn comes",
      "map.detourDone": "Detour done · Sales {revenue} (play again when its turn comes)",
      "map.unlock": "📺 Watch an ad to unlock (once per journey)",
      "map.unlocked": "Unlocked! You can now travel to that town.",
      "map.unlockSkipped": "Watch the ad to the end to unlock it.",
      "journey.again": "Go on Another Journey",
      "journey.logLine": "{n}. {town} — Sales {revenue} · Heart {humanity}",
      "journey.total": "Journey sales total: {revenue}",
      "journey.best": "(New journey best!)",
      "journey.ending": "Journey's end: “{name}”",
      "records.journeys": "Journey Endings",
      "records.journeyBest": "Best journey sales: {revenue}",
      "records.towns": "Towns Visited",
      "records.townBest": "Best sales {revenue}",
      "records.townUnseen": "Not visited yet",
      "share.journeyText": "I traveled through 3 towns in Tankabai! Showa Shopping Street and reached the ending “{name}” — title: “{title}”, journey sales: {revenue}.",
      "howto.journey": "<strong>Go on a journey</strong>: Visit all 10 towns in order — finish them all for the grand finale. Restock in each town and carry half your Heart (reputation) and your ties to the next. If you stop midway, you'll resume where you left off. On Android, watch an ad to take a 3-act detour to a town ahead of its turn once per journey (afterwards you return to where you were; when that town's turn comes, people who remember you await with new scenes). \"Open for Business\" opens a one-day stall in the town you're in now (the last town you did business in on a journey).",
      "stock.lead": "Pick up to 3 goods within your budget. Each one helps with different pitches or customers.",
      "stock.budget": "Budget {budget} · Left {left} ({n} / {max} items)",
      "stock.open": "Open with These Goods ▶",
      "stock.cost": "Stock cost",
      "play.goods": "Your {names} paid off!",
      "records.dislikes": "Dislikes",
      "play.choices": "Choose your pitch (keys 1–3 also work)",
      "play.deltas": "Changes this turn",
      "play.voice": "{name}: {text}",
      "play.like": "Great match — {name} loves that kind of pitch!",
      "play.dislike": "Bad match — {name} can't stand that kind of pitch...",
      "play.overheat": "Too many tall tales in a row — you got carried away! Extra trouble.",
      "play.echo": "An earlier encounter pays off! {text}",
      "play.tie": "This encounter may come back in a later act...",
      "play.followUpTag": "Tie",
      "play.momentumUp": "You're on a roll! (Momentum {n})",
      "play.momentumBonus": "Momentum boosts sales +{amount}",
      "play.cashOut": "You cashed in your momentum! +{amount}",
      "play.momentumLost": "Your momentum fizzled out...",
      "play.bust": "Carried away by momentum — uproar! Trouble shoots up and your momentum is gone.",
      "stamp.bust": "Total Uproar!",
      "howto.stock": "<strong>Stock up</strong>: Before opening, pick up to 3 goods with a ¥3,000 budget. Each one helps with different pitches or customers.",
      "howto.momentum": "<strong>Momentum</strong>: Builds up when you get laughs (max 3) and boosts tall-tale sales. Tell a tall tale at full momentum and it turns into uproar. Switch to Honesty or Lend a Hand to cash your momentum in as sales.",
      "play.customers": "Customers +{n}",
      "play.next": "Next Act ▶",
      "play.result": "See Today's Results ▶",
      "play.quit": "Close up shop and return to the title screen?",

      "stamp.overheat": "Carried Away!",
      "stamp.flop": "Total Flop!",
      "stamp.hit": "Big Laughs!",
      "stamp.uproar": "Uproar!",
      "stamp.ninjo": "Heartwarming!",
      "stamp.sale": "Thank You!",

      "result.kicker": "And so the curtain falls on today's trade",
      "result.new": "New ending discovered!",
      "result.ending": "“{name}”",
      "result.honor": "Title: ",
      "result.best": "New best!",
      "result.log": "Look back on today's pitches",
      "result.logHead": "{act}: {title}",
      "result.retry": "Do Business Again",
      "result.toTitle": "Back to Title",
      "redo.button": "📺 Watch an ad to redo your pitch",
      "redo.done": "Choose your pitch again.",
      "redo.loading": "Loading ad…",
      "redo.unavailable": "Couldn't load an ad. Please try again in a moment.",
      "redo.skipped": "Watch the ad to the end to redo it.",

      "share.heading": "Share Your Result",
      "share.native": "📤 Share",
      "share.x": "𝕏 Post",
      "share.copy": "🔗 Copy URL",
      "share.copied": "URL copied!",
      "share.copyFail": "Couldn't copy. URL: {url}",
      "share.title": "Tankabai! Showa Shopping Street",
      "share.text": "I reached the ending “{name}” in Tankabai! Showa Shopping Street — title: “{title}”, sales: {revenue}.",
      "share.hashtag": "Tankabai",
      "share.dialog": "Share your result",

      "howto.heading": "How to Play",
      "howto.1": "You are <strong>Makoto Kazama</strong>, a traveling peddler. Run a street stall on Hiyori-cho Shopping Street over <strong>five acts</strong>. (<em>Tankabai</em> is the fast-talking sales patter of Japan's old street vendors.)",
      "howto.2": "Each act brings a customer or a commotion. Pick one of <strong>three pitches</strong><span class=\"kbd-only\"> (or press keys 1–3)</span>.",
      "howto.3": "Every pitch has a type:",
      "howto.bluff": "Big laughs and sales, but more trouble.",
      "howto.wit": "A good balance of sales and laughs.",
      "howto.honest": "Raises heart. Modest sales.",
      "howto.flatter": "Wins people over — unless they see through it.",
      "howto.help": "Raises heart a lot, but may cost you sales.",
      "howto.4": "Each customer has <strong>pitches they love and hate</strong>. You won't know at first, but great or bad matches are written in your <strong>regulars' book</strong>, and the choices get marked next time.",
      "howto.5": "<strong>Telling tall tales back to back gets you “carried away”</strong> and adds extra trouble.",
      "howto.6": "In the end, your balance of sales, laughs, heart and trouble decides the <strong>ending</strong>. Collect all 5 endings!",
      "howto.ok": "Got it!",

      "records.heading": "Ledger (Records)",
      "records.plays": "Games played",
      "records.best": "Best sales",
      "records.lastTitle": "Last title",
      "records.zukan": "Endings",
      "records.count": "({n} / {total})",
      "records.num": "No. {n}",
      "records.unknown": "???",
      "records.unseen": "Not yet seen",
      "records.honor": "Title: {t}",
      "records.warning": "* Records can't be saved in this browser. You can still play the game.",
      "records.close": "Close"
    }
  };

  const KANJI_NUM = "一二三四五六七八九十";
  const STORE_KEY = "tankabai.lang";
  let saved = null;
  try { saved = root.localStorage.getItem(STORE_KEY); } catch (e) { /* 保存不可 */ }
  const deviceLang = (root.navigator.languages && root.navigator.languages[0]) || root.navigator.language || "ja";
  let lang = dict[saved] ? saved : (/^ja\b/i.test(deviceLang) ? "ja" : "en");
  const listeners = [];

  // t("play.voice", { name: "小春", text: "…" }) → "小春：…"
  function t(key, vars) {
    let s = dict[lang][key];
    if (s === undefined) s = dict.ja[key];
    if (s === undefined) return key;
    return vars ? s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; }) : s;
  }

  // 1 → "其の一"（日本語）/ "No. 1"（英語）
  function ordinal(i) {
    return t("records.num", { n: lang === "ja" ? KANJI_NUM[i] || String(i + 1) : String(i + 1) });
  }

  // 人物・イベント・結末の文章。英語は data/en.js、足りないところは日本語のまま
  function data(kind, id) {
    const en = lang === "en" && root.TankaData.en ? (root.TankaData.en[kind] || {})[id] || {} : {};
    return en;
  }

  // data-i18n（文字）/ data-i18n-html（タグを含む。辞書の固定文だけ）/ data-i18n-attr="属性:キー" を書き換える
  function apply() {
    const doc = root.document;
    doc.documentElement.lang = lang;
    doc.title = t("doc.title");
    const desc = doc.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("doc.desc"));
    doc.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    doc.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.dataset.i18nHtml); });
    doc.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(";").forEach(function (pair) {
        const p = pair.split(":");
        el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    doc.querySelectorAll("[data-lang]").forEach(function (el) {
      const on = el.dataset.lang === lang;
      el.classList.toggle("is-on", on);
      el.setAttribute("aria-pressed", String(on));
    });
  }

  function setLang(l) {
    if (!dict[l] || l === lang) return;
    lang = l;
    try { root.localStorage.setItem(STORE_KEY, l); } catch (e) { /* 保存不可 */ }
    apply();
    listeners.forEach(function (f) { f(l); });
  }

  root.TankaI18n = {
    t: t,
    ordinal: ordinal,
    data: data,
    apply: apply,
    setLang: setLang,
    get lang() { return lang; },
    onChange: function (f) { listeners.push(f); },
    dict: dict
  };
})(window);
