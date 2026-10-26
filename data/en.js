/*
 * English translations of the game data (characters, events, endings)
 * Keyed by the same IDs as the Japanese data. Anything missing falls back to Japanese.
 * Text and numbers only — nothing here is ever run as code.
 */
(function (root) {
  "use strict";
  const D = (root.TankaData = root.TankaData || {});

  D.en = {
    characters: {
      makoto: {
        name: "Makoto Kazama",
        role: "Traveling peddler (you)",
        trait: "A smooth talker with a soft heart who can't walk past someone in trouble."
      },
      toki: {
        name: "Toki Hanamura",
        role: "Shopping street organizer",
        hint: "Runs the shopping street association. Can't stand anything crooked.",
        trait: "Tough on business, but soft on anyone who plays it straight.",
        reactions: {
          like: "\"Hmph. For once you're talking sense.\"",
          dislike: "\"All mouth and no manners, that's you!\""
        }
      },
      genzo: {
        name: "Genzo Ono",
        role: "Stubborn clockmaker",
        hint: "A craftsman who's lived by his skill. Doesn't trust smooth talkers.",
        trait: "Hates tall tales and flattery. Respects honesty and real skill.",
        reactions: {
          like: "\"Huh. This youngster's got some sense.\"",
          dislike: "\"Don't you make fun of a craftsman!\""
        }
      },
      koharu: {
        name: "Koharu",
        role: "Curious shopper",
        hint: "A shopper who finds everything fun.",
        trait: "Loves anything fun — and loves spreading it around even more.",
        reactions: {
          like: "\"Ahaha! I'm telling everyone about this!\""
        }
      },
      matsuko: {
        name: "Matsuko",
        role: "Champion haggler",
        hint: "A master haggler. Never opens her purse for nothing.",
        trait: "The best bargainer in the neighborhood. Weak to clever deals and compliments.",
        reactions: {
          like: "\"Oh my, now you're speaking my language!\"",
          dislike: "\"Don't you try to sweet-talk your way out of this!\""
        }
      },
      ginji: {
        name: "Ginji",
        role: "Rival stall owner",
        hint: "The rival stall owner next door.",
        trait: "A rival, but he never says no to a good, clever contest.",
        reactions: {
          like: "\"Heh. Not bad, pal.\"",
          dislike: "\"Oh, it's like that? Then I won't hold back either!\""
        }
      },
      kenta: {
        name: "Kenta",
        role: "Neighborhood kid",
        hint: "A neighborhood kid with a nose for grown-up excuses.",
        trait: "Sees through tricks with sharp questions. Likes straight answers.",
        reactions: {
          like: "\"Hehe, mister, you're a good guy!\"",
          dislike: "\"That's cheating!\""
        }
      },
      sayori: {
        name: "Sayori",
        role: "Lost traveler",
        hint: "A quiet traveler who has lost her way.",
        trait: "Quiet and sincere. Never forgets a kindness in a pinch.",
        reactions: {
          like: "\"That's so kind of you... thank you, truly.\"",
          dislike: "\"Um... that's a bit much.\""
        }
      },
      crowd: {
        name: "The Onlookers",
        role: "Shopping street crowd",
        hint: "The people watching from the street.",
        trait: "They cheer a clever line and heckle anyone who goes too far.",
        reactions: {
          like: "\"Nice one!\" \"Go get 'em, pal!\""
        }
      },
      tamura: {
        name: "Officer Tamura",
        role: "Local beat cop",
        hint: "The local beat cop. Strict about the rules.",
        trait: "Never lets a dodge slide, but goes soft for a straight answer or a good deed.",
        reactions: {
          like: "\"Hm. A commendable attitude.\"",
          dislike: "\"Are you trying to make a fool of an officer?\""
        }
      },
      ume: {
        name: "Granny Ume",
        role: "The street's living memory",
        hint: "A chatty old lady.",
        trait: "Loves anyone who'll sit through her stories, and a good joke. Sees right through flattery.",
        reactions: {
          like: "\"Ho ho, there's something to you, dearie.\"",
          dislike: "\"Flattering an old woman won't get you anything.\""
        }
      },
      shinji: {
        name: "Shinji",
        role: "Window-shopping office worker",
        hint: "You can never tell if this customer actually wants to buy.",
        trait: "Goes along with a lively tall tale or quick wit, but gets bored by too much honesty.",
        reactions: {
          like: "\"Ha, you're a funny one. I'll take one.\"",
          dislike: "\"Huh. That's boring.\""
        }
      },
      tatsu: {
        name: "Tatsugoro",
        role: "Fishing boss",
        hint: "The leader of Shiomi Harbor's fishermen.",
        trait: "Loves big, cheerful talk and people who work up a sweat. Hates flattery.",
        reactions: {
          like: "\"Ha! I like you!\"",
          dislike: "\"Smooth talkers get tossed into the sea.\""
        }
      },
      minami: {
        name: "Minami",
        role: "Harbor diver",
        hint: "A diver the beach kids adore.",
        trait: "Cares about the kids. Likes straight talk and a good joke, dislikes exaggeration.",
        reactions: {
          like: "\"Heh. You're a good one.\"",
          dislike: "\"Kids believe that stuff. Cut it out.\""
        }
      },
      seikichi: {
        name: "Seikichi",
        role: "Young innkeeper",
        hint: "The young master of an old Yunosawa inn.",
        trait: "Weak to flattery and loves a clever sales line. Too much honesty kills his mood.",
        reactions: {
          like: "\"Oh, I like that.\"",
          dislike: "\"Well, that's a buzzkill.\""
        }
      },
      shige: {
        name: "Shigezo",
        role: "Elderly spa guest",
        hint: "An elderly gentleman here to soak a bad back.",
        trait: "Soft on honesty and kindness. Doesn't believe in miracle claims.",
        reactions: {
          like: "\"Hm. You, I can trust.\"",
          dislike: "\"Don't tease an old man.\""
        }
      },
      oshin: {
        name: "Oshin",
        role: "Teahouse mistress",
        hint: "Runs the mountain teahouse all by herself.",
        trait: "Fond of kindness to travelers and honest trade. Can't stand tall tales.",
        reactions: {
          like: "\"For a traveler, you're a thoughtful one.\"",
          dislike: "\"Tell tall tales on this pass and the tengu will snatch you.\""
        }
      },
      genta: {
        name: "Genta",
        role: "Truck driver",
        hint: "A loud driver who runs the pass road every day.",
        trait: "Loves big talk and sharp jokes. Hates sucking up.",
        reactions: {
          like: "\"Ha! I like you — hop in!\"",
          dislike: "\"Flattery won't get you a ride.\""
        }
      },
      mido: {
        name: "Old Master Mido",
        role: "Retired samurai-house elder",
        hint: "A proud elder living in an old mansion below the castle.",
        trait: "Appreciates polite praise and sincerity. Finds wisecracks vulgar.",
        reactions: {
          like: "\"Hm. You know your manners.\"",
          dislike: "\"Mind your flippant tongue.\""
        }
      },
      chiyo: {
        name: "Chiyo",
        role: "Sweet shop daughter",
        hint: "The cheerful face of an old sweet shop in the castle town.",
        trait: "Likes clever talk and helping out. Sees through tall tales instantly.",
        reactions: {
          like: "\"Heh, you're a funny one.\"",
          dislike: "\"That's a lie, isn't it?\""
        }
      },
      fumi: {
        name: "Fumi",
        role: "Morning market vendor",
        hint: "A tough vendor who's at the market before dawn.",
        trait: "Likes honest trade and good jokes. Never trusts flatterers.",
        reactions: {
          like: "\"Now you're talking!\"",
          dislike: "\"It's freezing, but your mouth sure runs warm.\""
        }
      },
      fuyukichi: {
        name: "Fuyukichi",
        role: "Young man back from city work",
        hint: "A good-natured young man just back from working in the city.",
        trait: "Melts at praise and can't refuse helping. Has had enough of tall tales.",
        reactions: {
          like: "\"Heh, you're making me blush.\"",
          dislike: "\"I got fooled by talk like that in the city...\""
        }
      },
      chinnen: {
        name: "Chinnen",
        role: "Temple novice",
        hint: "A mischievous young novice at the temple.",
        trait: "Loves funny stories and big tales. Says flattery gets in the way of training.",
        reactions: {
          like: "\"Wow, amazing! Don't tell the abbot.\"",
          dislike: "\"Flattery won't make the sutras any shorter.\""
        }
      },
      kakunen: {
        name: "Abbot Kakunen",
        role: "Head priest of Komyoji",
        hint: "A gentle priest who watches over the temple town.",
        trait: "Pleased by sincere words and helping hands. Quietly frowns at tall tales.",
        reactions: {
          like: "\"A fine spirit. The Buddha is watching.\"",
          dislike: "\"A convenient fib, stretched too far, is a lie.\""
        }
      },
      iwao: {
        name: "Iwao",
        role: "Coal miner",
        hint: "A miner proud of his strength.",
        trait: "Likes bold talk and people who sweat. Can't stand clever wordplay.",
        reactions: {
          like: "\"Ha! I like you, kid!\"",
          dislike: "\"Talk plain — I don't get your fancy words!\""
        }
      },
      tome: {
        name: "Tome",
        role: "Mining housing matriarch",
        hint: "The big-hearted mom who looks after the miners' housing.",
        trait: "Likes honest people who are kind to kids and elders. Tired of sweet talk.",
        reactions: {
          like: "\"You're a good kid.\"",
          dislike: "\"Save that for the men on payday.\""
        }
      },
      manabu: {
        name: "Manabu",
        role: "Struggling student",
        hint: "A logic-loving student living on a tiny allowance.",
        trait: "Likes sound arguments and quick wits. Immune to flattery.",
        reactions: {
          like: "\"I see — that's logical.\"",
          dislike: "\"Flattery won't open my wallet. It's empty anyway.\""
        }
      },
      poem: {
        name: "The Poem Master",
        role: "Coffee shop owner",
        hint: "Owner of Coffee Poem in the student quarter.",
        trait: "A sucker for stylish phrasing and compliments. Finds tall tales tacky.",
        reactions: {
          like: "\"Very stylish. Coffee's on me.\"",
          dislike: "\"How tacky.\""
        }
      },
      kaizo: {
        name: "Kaizo",
        role: "Ferry captain",
        hint: "Captain of the ferry linking the island and the mainland.",
        trait: "Likes straight talk and big cheerful talk. Throws flattery overboard.",
        reactions: {
          like: "\"Right, I like you. I'll knock some off your fare home.\"",
          dislike: "\"Let the waves carry off your flattery.\""
        }
      },
      kame: {
        name: "Grandma Kame",
        role: "Island know-it-all",
        hint: "An old woman who knows everything about the island.",
        trait: "Likes kind people and good jokes. Spreads any tall tale all over the island.",
        reactions: {
          like: "\"Oh my, you're a funny one.\"",
          dislike: "\"Lie on this island and everyone knows by tomorrow.\""
        }
      }
    },

    events: {
      E01: {
        title: "The Haggler",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "My, these drops are pricey. Knock off half and I'll take three bags.",
        choices: {
          A: {
            text: "\"Half? These are rainbow drops! Cut the price in half and you only get three and a half colors!\"",
            result: "The crowd roars, and the lady laughs her way into opening her purse: \"Three and a half won't do!\""
          },
          B: {
            text: "\"Can't do half. But buy three bags and I'll throw in a fourth!\"",
            result: "\"Oh, you're good at this,\" she says, and buys all four."
          },
          C: {
            text: "\"Against a sharp eye like yours, I don't stand a chance. Twenty percent off, just for you.\"",
            result: "\"A sharp eye, you say? Ohoho!\" She's in a wonderful mood now."
          }
        }
      },
      E02: {
        title: "Show Us!",
        product: { name: "The Open-Anything", blurb: "Jar lids, cans and more — all with one tool" },
        dialogue: "Hey, hey, does that really open anything? Show me right now!",
        choices: {
          A: {
            text: "\"Easy! Jar lids, storehouse doors, even a maiden's locked-up heart — pop, it all opens!\"",
            result: "\"Even hearts?!\" Koharu's shout pulls in onlookers from all down the street."
          },
          B: {
            text: "\"Seeing is believing. Miss, lend me that stubborn soda bottle.\"",
            result: "The cap pops off with a fizz, and a little round of applause breaks out."
          },
          C: {
            text: "\"Honestly? It only really opens jars and cans...\"",
            result: "\"Aww, is that all?\" she says — and buys one anyway."
          }
        }
      },
      E03: {
        title: "It Broke!",
        product: { name: "Seven-Fold Umbrella", blurb: "A new invention that folds to palm size" },
        dialogue: "Mid-demo, a nasty CRACK. \"Hey, it snapped! You're selling junk like that?\"",
        choices: {
          A: {
            text: "\"How embarrassing! The sample broke. If you're worried, take one free.\"",
            result: "Such a clean apology that several people buy one anyway."
          },
          B: {
            text: "\"Behold: 'Bent, but never broken in spirit!' ...Okay, it's broken. This is where you laugh!\"",
            result: "A beat of silence — then the whole crowd bursts out laughing."
          },
          C: {
            text: "\"It's not broken, it transformed! Behold — its second form!\"",
            result: "\"Second form!\" The buzz spreads until the crowd blocks the whole street."
          }
        }
      },
      E04: {
        title: "The Rival",
        product: { name: "Pon-Pon Shoulder Tapper", blurb: "The more you tap, the lighter your shoulders" },
        dialogue: "Heh heh. Sorry, pal. Every customer today's coming to my stall.",
        choices: {
          A: {
            text: "\"Step right up! His goods tap your shoulders — mine tap on the door of destiny!\"",
            result: "The crowd swings back your way, and Ginji folds his arms with a sour face."
          },
          B: {
            text: "\"Ginji, how about it? Let's do a double act together.\"",
            result: "The improvised routine is a smash. Both stalls draw a crowd."
          },
          C: {
            text: "\"No more fighting over customers. I'll send folks to whichever stall suits them.\"",
            result: "Ginji blinks, then grins sheepishly: \"You're a strange one.\""
          }
        }
      },
      E05: {
        title: "The Kid's Question",
        product: { name: "Lucky Cat Charm", blurb: "Brings good fortune... maybe" },
        dialogue: "Mister, does this cat really bring luck? The guy who bought one last year lost the raffle.",
        choices: {
          A: {
            text: "\"He had the cat backwards! Right paw for money, left for friends, both paws up... and you give up!\"",
            result: "The crowd cracks up, but Kenta pouts: \"That's cheating.\""
          },
          B: {
            text: "\"Luck doesn't come from the cat — you bring it yourself. This little guy just cheers you on.\"",
            result: "\"Then he can cheer for me,\" says Kenta, buying one with his allowance."
          },
          C: {
            text: "\"Sharp kid! Keep it today and test it. If luck comes, you pay me.\"",
            result: "Kenta's thrilled. That evening his mother dutifully comes by to pay."
          }
        }
      },
      E06: {
        title: "The Stubborn Craftsman",
        product: { name: "The Craftsman-Proof Screwdriver", blurb: "Spare bits to fit any screw, big or small" },
        dialogue: "Spare me the patter. Let's see if that's the real thing — on this old wall clock.",
        choices: {
          A: {
            text: "\"Best to judge it by hand. Go ahead, test it all you like.\"",
            result: "Genzo silently turns the clock's screws, then says just one thing: \"...Not bad.\""
          },
          B: {
            text: "\"Hold this, and even an amateur becomes a master overnight!\"",
            result: "\"Don't mock the masters!\" Genzo's thunder echoes down the whole street."
          },
          C: {
            text: "\"With hands like yours, sir, any tool becomes a masterpiece.\"",
            result: "Genzo snorts. \"I told you I've no use for flattery.\""
          }
        }
      },
      E07: {
        title: "A Scolding",
        dialogue: "Makoto! What's all this racket? This shopping street isn't your personal stage!",
        choices: {
          A: {
            text: "\"Sorry, I got carried away. Let me help clean up.\"",
            result: "Toki glares for a while, then nods at the corner: \"...The broom's over there.\""
          },
          B: {
            text: "\"Ha! Getting scolded by you is one of this street's famous sights!\"",
            result: "The crowd laughs, but the crease in Toki's brow only gets deeper."
          },
          C: {
            text: "\"To make up for it, please put part of today's sales toward the summer festival.\"",
            result: "\"...That's the one thing about you I can't stay mad at.\""
          }
        }
      },
      E08: {
        title: "The Lost Traveler",
        product: { name: "Safe-Journey Charm Pouch", blurb: "A hand-sewn pouch that wishes you a safe trip" },
        dialogue: "Excuse me, I'm trying to get to the temple by the river, but I'm completely lost...",
        choices: {
          A: {
            text: "\"I'll close up for a bit and walk you there.\"",
            result: "Sayori bows deeply at the temple gate, and Makoto somehow comes back humming."
          },
          B: {
            text: "\"For a temple trip, this charm pouch is perfect. I'll write the directions on the back.\"",
            result: "Sayori giggles and buys one of the pouches."
          },
          C: {
            text: "\"Straight down this way! And try my Safe-Journey Drops — you'll arrive just as you finish one!\"",
            result: "Sayori buys the drops on the spot... but straight down that way is a dead end."
          }
        }
      },
      E09: {
        title: "Sudden Rain",
        echo: "Genzo calls out, \"Use my eaves,\" and lends the awning of his workshop. The goods and the customers stay dry.",
        product: { name: "Washi Paper Fans", blurb: "Hand-printed fans, perfect for summer festivals" },
        dialogue: "A sudden downpour soaks your paper fans. The onlookers cry, \"Whoa, it's pouring! Nobody brought an umbrella!\"",
        choices: {
          A: {
            text: "\"Forget the goods! Everyone, get under my stall's awning!\"",
            result: "Huddled together out of the rain, everyone starts to feel like old friends."
          },
          B: {
            text: "\"Sorry, if my stock gets soaked I'm done for. Let me pack it away first!\"",
            result: "The goods are safe and the rest sell once the rain clears — but the sight of people running off soaked still stings a little."
          },
          C: {
            text: "\"Hold a fan over your head and run for the station! A hundred yen each!\"",
            result: "A line of people dashes off holding fans over their heads, laughing through the rain."
          }
        }
      },
      E10: {
        title: "Last Customer of the Day",
        echo: "Kenta brings his mother along: \"This guy's really nice!\" She buys one too while she's at it.",
        product: { name: "The Last Lucky Cat", blurb: "Only one left today" },
        dialogue: "At dusk, Kenta and a well-dressed gentleman reach for the last lucky cat at the same time. \"Oh...\"",
        choices: {
          A: {
            text: "\"It's yours, kid. Just pay what your allowance covers.\"",
            result: "Kenta runs off hugging the cat, and the gentleman tips his hat: \"Classy move.\""
          },
          B: {
            text: "\"Then let's have an auction! The last lucky cat goes to the highest bidder!\"",
            result: "The gentleman wins it with a fat stack of bills, and Kenta goes home in tears."
          },
          C: {
            text: "\"Sir, I'll deliver the same one to you tomorrow. Today, it's the kid's turn!\"",
            result: "Both customers leave happy. Makoto inks the delivery onto one palm so it won't be forgotten."
          }
        }
      },
      E11: {
        title: "Grateful Pilgrims",
        product: { name: "Safe-Journey Charm Pouch", blurb: "A hand-sewn pouch that wishes you a safe trip" },
        dialogue: "Thank you for earlier. I told everyone at the temple about you, and they all wanted to stop by...",
        choices: {
          A: { text: "\"Well, I'll be. All I did was point the way — this is too kind.\"", result: "The pilgrims pick up charm pouches one after another, and soon the stall is bare." },
          B: { text: "\"Step right up, everyone! Carry this charm and your blessings multiply tenfold!\"", result: "They sell well, but Makoto doesn't miss the small, sad look on Sayori's face." },
          C: { text: "\"Since you came all this way, please — one each, on the house.\"", result: "\"You've done so much for us,\" the pilgrims say, bowing again and again as they leave." }
        }
      },
      E12: {
        title: "The Dead-End Complaint",
        dialogue: "Makoto, that young traveler from earlier was stranded at a dead end! What on earth did you tell her?",
        choices: {
          A: { text: "\"Oh no! I'll find her right now and take her to the temple myself.\"", result: "Out of breath, Makoto catches up, apologizes over and over, and walks her there. On the way back, Toki's face softens a little." },
          B: { text: "\"I'm ashamed. I just wanted the sale and said something careless.\"", result: "\"As long as you know it. Don't you ever do that again.\"" },
          C: { text: "\"Well, a dead end is just one of life's little detours...\"", result: "The onlookers laugh, but Toki shouts, \"This is no laughing matter!\"" }
        }
      },
      E13: {
        title: "Ginji Lends a Hand",
        product: { name: "Pon-Pon Shoulder Tapper", blurb: "The more you tap, the lighter your shoulders" },
        dialogue: "Hey pal, I'm sold out. I'll send my customers your way — how about another round of that double act?",
        choices: {
          A: { text: "\"Been waiting for this! Hiyori-cho's famous double act, take two!\"", result: "The perfectly timed routine draws a crowd, and business booms right up to closing." },
          B: { text: "\"Much obliged. I'll tell everyone Ginji sent them.\"", result: "Customers shuttle between the two stalls, and Ginji laughs: \"We look out for each other.\"" },
          C: { text: "\"Every customer you send is mine now!\"", result: "Sales climb, but Ginji turns his back: \"Biting the hand that feeds you, huh.\"" }
        }
      },
      E14: {
        title: "Ginji's Revenge",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "Heh, you got me good earlier. Now I'm selling the same drops at half price!",
        choices: {
          A: { text: "\"Half-price drops, half the colors! The real rainbow is only here!\"", result: "The price war turns into a heckling free-for-all, and the street fills with gawkers." },
          B: { text: "\"Sorry about earlier. How about we stop fighting over customers?\"", result: "Ginji rubs his nose. \"...Long as you get it,\" he says, and puts his old price tag back." },
          C: { text: "\"I'll take your half-price drops, add my patter, and sell them for double. Deal?\"", result: "Ginji bursts out laughing in disbelief, and the revenge somehow becomes a joint sale." }
        }
      },
      E15: {
        title: "The Beat Cop's Rounds",
        product: { name: "Street Stall Permit", blurb: "Properly filed... supposedly" },
        dialogue: "Evening. Just making my rounds. Is this stall properly registered?",
        choices: {
          A: { text: "\"Yes, right here. If anything's missing, I'll fix it at once.\"", result: "The officer checks the permit, nods — \"Very good\" — and buys a pack of drops." },
          B: { text: "\"All in order. And this item's all in order for your stiff shoulders too, officer.\"", result: "The officer clears his throat, but the corners of his mouth twitch." },
          C: { text: "\"Registration? My patter is the only permit I need!\"", result: "\"Show me your permit!\" At the officer's bark, the onlookers scatter." }
        }
      },
      E16: {
        title: "Just Looking",
        product: { name: "The Open-Anything", blurb: "Jar lids, cans and more — all with one tool" },
        dialogue: "Huh, looks interesting. I'm just looking, though.",
        choices: {
          A: { text: "\"Looking's free! But once you look, your hand opens your wallet all by itself!\"", result: "\"All by itself!\" Shinji laughs — and actually opens his wallet." },
          B: { text: "\"Looking's free, but you learn more by touching. Go on, hold it.\"", result: "The moment it's in his hand, Shinji mutters, \"Oh, this is nice.\"" },
          C: { text: "\"Browsers welcome. If you don't like it, don't buy it.\"", result: "\"Okay, I won't,\" says Shinji, and leaves without buying a thing." }
        }
      },
      E17: {
        title: "Granny Ume's Old Stories",
        product: { name: "Washi Paper Fans", blurb: "Hand-printed fans, perfect for summer festivals" },
        dialogue: "You know, this street used to be lined with night stalls. Plenty of pitchmen like you back then...",
        choices: {
          A: { text: "\"Really? Then what? Take your time, I'm listening.\"", result: "After a long chat, Granny Ume buys three fans: \"That's for listening to me.\"" },
          B: { text: "\"Next to the pitchmen of your day, Granny, I'm just the opening act.\"", result: "\"Oh yes, the pitchmen back then...\" The story picks up steam, and a crowd gathers to listen." },
          C: { text: "\"Granny, I bet you were the prettiest girl in town back then.\"", result: "\"Flattery won't get you anything,\" she says — though she doesn't look displeased." }
        }
      },
      E18: {
        title: "The Neighborhood Bulletin",
        product: { name: "Lucky Cat Charm", blurb: "Brings good fortune... maybe" },
        dialogue: "Hey, want me to write about your stall in the neighborhood bulletin? What should I say?",
        choices: {
          A: { text: "\"Write: 'A god of fortune has come to Hiyori-cho. This cat guarantees a lottery win!'\"", result: "The next morning, readers swarm the stall demanding, \"So when do we win?\"" },
          B: { text: "\"How about: 'Need a helping paw? Sorry, our lucky cats are not for rent.'\"", result: "Readers chuckle at the line, and quite a few stop by." },
          C: { text: "\"Just: 'A small street stall. Drop by if you feel like it.' That's plenty.\"", result: "The modest line goes over well, and neighbors trickle in." }
        }
      },
      E19: {
        title: "Not Quite Rainbow",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "Hey, you! Those drops I bought only changed three colors!",
        choices: {
          A: { text: "\"Sorry about that — the damp may have dulled them. I'll swap them for fresh ones.\"", result: "\"Well, that was easy,\" says Matsuko, cheering up — and buying another bag." },
          B: { text: "\"Your smile will make up the other four colors, ma'am.\"", result: "\"Smooth talker,\" Matsuko laughs, and buys two bags while she's at it." },
          C: { text: "\"If you can't see seven colors, your heart must be clouded!\"", result: "\"Whose heart is clouded?!\" Matsuko's voice rings down the whole street." }
        }
      },
      E20: {
        title: "A Line of Kids",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "Mister, I brought my friends! Let us all try a drop!",
        choices: {
          A: { text: "\"All right, one drop each — go on!\"", result: "Drawn by the kids' cheers, their parents buy drops one after another." },
          B: { text: "\"Samples go to whoever solves my riddle! What candy changes color as you suck it?\"", result: "\"Rainbow Mint Drops!\" the kids chorus, and even passing adults stop to look." },
          C: { text: "\"Suck one of these and you'll ace tomorrow's test, guaranteed!\"", result: "The kids buy happily, but Makoto has a feeling the parents will complain later." }
        }
      },
      E21: {
        title: "The Wrong Item",
        product: { name: "Pon-Pon Shoulder Tapper", blurb: "The more you tap, the lighter your shoulders" },
        dialogue: "An onlooker calls out: \"Hey pal, you gave that customer a back scratcher, not a shoulder tapper!\"",
        choices: {
          A: { text: "\"Oh no! I'll run after them and swap it!\"", result: "Makoto catches up at the end of the street and swaps it. \"Sorry for the trouble,\" the customer laughs." },
          B: { text: "\"Tap your shoulders with a scratcher and it's a tapper; scratch your back with a tapper and it's a scratcher. Both correct!\"", result: "The onlookers roar at logic that makes no sense at all." },
          C: { text: "\"My apologies. Next time that customer comes, they get both.\"", result: "\"Now that's a real merchant!\" someone calls from the crowd." }
        }
      },
      E22: {
        title: "Genzo's Favor",
        product: { name: "The Craftsman-Proof Screwdriver", blurb: "Spare bits to fit any screw, big or small" },
        dialogue: "...I want to give my grandkid something for their birthday. Got anything fit for a craftsman's grandchild?",
        choices: {
          A: { text: "\"Honestly, I don't know if my goods meet your standards. Let's choose together.\"", result: "They look everything over together, and Genzo picks up a small screwdriver: \"This one.\"" },
          B: { text: "\"Tell your grandkid this tool is called 'Grandpa's Apprentice No. 1.'\"", result: "Genzo bursts out laughing — \"That's a good one\" — and buys two." },
          C: { text: "\"Your grandkid will be a master no matter what tool you give them.\"", result: "\"Spare me the flattery.\" Genzo scowls and leaves without buying." }
        }
      },
      E23: {
        title: "Festival Prep",
        dialogue: "Makoto, sorry to ask, but we're short-handed building the festival tower. What about your stall?",
        choices: {
          A: { text: "\"I'll close up and help! Leave the heavy lifting to me.\"", result: "After a sweaty afternoon of work, Toki hands over an ice-cold soda." },
          B: { text: "\"I'll help — and give a pitch from the top of the tower while I'm at it!\"", result: "The pitch from the tower is a hit, though the work falls a little behind." },
          C: { text: "\"With you running things, you won't need more hands!\"", result: "\"All talk, as usual.\" Toki sighs and goes to find someone else." }
        }
      },
      E24: {
        title: "The Big Order",
        product: { name: "Washi Paper Fans", blurb: "Hand-printed fans, perfect for summer festivals" },
        dialogue: "The neighborhood association wants a hundred fans for the summer dance. You'll give us a bulk discount, of course?",
        choices: {
          A: { text: "\"For a hundred, I'll print the association's name on every fan.\"", result: "\"Now that's thoughtful!\" Matsuko leaves a deposit, delighted." },
          B: { text: "\"I can't refuse the sharpest eye in the neighborhood. Thirty percent off!\"", result: "\"You get it,\" says Matsuko, stamping the order form in high spirits." },
          C: { text: "\"Why stop at a hundred? Buy two hundred and you're set for next year — that's style!\"", result: "\"Don't get carried away,\" Matsuko scoffs, and cuts the order to eighty." }
        }
      },
      E25: {
        title: "The Lost Child",
        dialogue: "At dusk, a little girl is crying in front of the stall. The onlookers: \"Looks like she's lost. Anyone know her?\"",
        choices: {
          A: { text: "\"Forget the stall — let's all find her parents! It's okay now, kiddo.\"", result: "Everyone on the street calls out together, and her mother rushes over, bowing again and again." },
          B: { text: "\"Here, suck on this drop. By the time it changes color three times, your mom will be here.\"", result: "While she's busy watching the colors change, her mother really does arrive." },
          C: { text: "\"Calling the lost girl's parents — step right up! And pick up a souvenir while you're here!\"", result: "The pitch finds her parents, but someone heckles: \"Don't use a lost kid to drum up business!\"" }
        }
      },
      E26: {
        title: "The Pitch Contest",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "Tonight's the shopping street's pitch contest. Travelers can jump in too. Want to enter?",
        choices: {
          A: { text: "\"I'm in! Behold the greatest pitch in all Japan!\"", result: "The over-the-top pitch brings the crowd to its feet. No trophy, but the drops fly off the shelf." },
          B: { text: "\"A wandering peddler, here to give Hiyori-cho one pitch!\"", result: "A pitch woven with local specialties wins big laughs — and a special prize." },
          C: { text: "\"Tonight I'll sit in the audience and learn from everyone's pitches.\"", result: "\"How modest,\" Toki laughs, and the contestants order drops from the stall." }
        }
      },
      S01: {
        title: "Celebrating the Big Catch",
        product: { name: "Lucky Cat Charm", blurb: "Brings good fortune... maybe" },
        dialogue: "Huge catch today! Come on, pal, give us a pitch worthy of the celebration!",
        choices: {
          A: { text: "\"The lucky cat that calls the catch! Tomorrow your nets will burst with fish!\"", result: "The fishermen roar with laughter and buy one lucky cat for every boat." },
          B: { text: "\"That's our boss — the manliest man of the sea!\"", result: "\"Spare me. Talk's like fish — it's all about freshness,\" the boss laughs it off." },
          C: { text: "\"Let me help mend the nets. The pitch can wait.\"", result: "When the mending's done, the fishermen hand over dried fish — \"Our thanks\" — and buy a few goods too." }
        }
      },
      S02: {
        title: "The Diver's Request",
        product: { name: "Washi Paper Fans", blurb: "Hand-printed fans, perfect for summer festivals" },
        dialogue: "Got anything that would make a nice summer memory for the kids on this beach?",
        choices: {
          A: { text: "\"Nothing fancy, but these fans are just the right size for little hands.\"", result: "Minami buys one fan for every kid, and the beach blooms with fans." },
          B: { text: "\"Drop this candy in the sea and it turns into a rainbow fish... no, it doesn't. But kids love it.\"", result: "\"It doesn't?\" Minami bursts out laughing and buys a big bag." },
          C: { text: "\"Blow this whistle and the dolphins will come!\"", result: "The kids blow whistles all day long, and the beach turns into chaos." }
        }
      },
      S03: {
        title: "Storm Warning",
        dialogue: "Hey, a storm's coming this afternoon! We've got to secure the cargo at the docks!",
        choices: {
          A: { text: "\"I'll close up and help!\"", result: "Just as the last crate is moved, the rain begins. The fishermen look at Makoto differently now." },
          B: { text: "\"Before the storm hits — a sale with no stormy prices!\"", result: "Last-minute buyers clear out the stock, but Makoto misses the cleanup." },
          C: { text: "\"Sorry, I need to protect my own goods first.\"", result: "The goods are safe, but Makoto never quite joins the fishermen's circle." }
        }
      },
      S04: {
        title: "Fireworks on the Beach",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "We're having small fireworks on the beach tonight. Will you set up your stall?",
        choices: {
          A: { text: "\"Between each firework, I'll launch a pitch of my own!\"", result: "Fireworks and patter trade off, the whole beach cheers, and every last item sells." },
          B: { text: "\"Instead of selling, let's hand out sparklers to the kids.\"", result: "Makoto will never forget the kids' faces lit by those tiny sparks." },
          C: { text: "\"The biggest firework in this harbor? My pitch!\"", result: "It gets so lively that spectator boats crowd the shore, and the fishermen yell at everyone." }
        }
      },
      Y01: {
        title: "The Young Innkeeper",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "Got any fun souvenirs for my inn's guests? If they sell, I'll put them at the front desk.",
        choices: {
          A: { text: "\"Chosen by the young master of the finest inn in Yunosawa? What an honor.\"", result: "The young master puffs up with pride and lines the goods up at the front desk." },
          B: { text: "\"How about Yunosawa-limited rainbow drops that change color through the steam?\"", result: "The word \"limited\" does the trick, and the inn's guests snap them up." },
          C: { text: "\"Honestly, nothing beats the local steamed buns here.\"", result: "\"Well, that's not much help,\" says the young master, deflated." }
        }
      },
      Y02: {
        title: "The Spa Guest's Question",
        product: { name: "Pon-Pon Shoulder Tapper", blurb: "The more you tap, the lighter your shoulders" },
        dialogue: "My back's been bad. Have you got anything that might ease it?",
        choices: {
          A: { text: "\"Nothing that'll cure it. But this shoulder tapper might help a little.\"", result: "\"I like your honesty,\" Shigezo smiles, and buys two." },
          B: { text: "\"With this tapper, your back will feel twenty again in no time!\"", result: "Shigezo frowns. \"Better than the hot springs? That's a big claim,\" he says, shaking his head." },
          C: { text: "\"Let me carry your bags to the inn.\"", result: "At the inn, Shigezo buys three souvenirs: \"For your trouble.\"" }
        }
      },
      Y03: {
        title: "A Pitch from the Foot Bath",
        product: { name: "The Open-Anything", blurb: "Jar lids, cans and more — all with one tool" },
        dialogue: "The onlookers: \"Hey pal, give us a pitch while you soak your feet!\"",
        choices: {
          A: { text: "\"The water's just right, and so is my pitch!\"", result: "The foot-bath crowd laughs and buys something every time they step out." },
          B: { text: "\"Soak in this foot bath and my goods' blessings double!\"", result: "People flood the foot bath, and the inn complains about the crowding." },
          C: { text: "\"A foot bath is for soaking. Business can wait — I'm enjoying the water today.\"", result: "Chatting away in the warm water, customers start drifting over on their own." }
        }
      },
      Y04: {
        title: "The Banquet Act",
        dialogue: "I'd like you to perform at tonight's banquet. One pitch — I'll pay you well.",
        choices: {
          A: { text: "\"With the greatest pitch in the land, I'll turn this banquet hall upside down!\"", result: "The hall goes wild. One tray gets flipped over, but nobody minds." },
          B: { text: "\"Invited to your inn's banquet — a traveling peddler couldn't ask for more.\"", result: "The young master, in high spirits, tips generously." },
          C: { text: "\"No payment needed. Call it thanks to everyone at the inn.\"", result: "The staff are so moved by the free show that a crowd lines up to see Makoto off the next morning." }
        }
      },
      S05: {
        title: "Claiming a Spot at the Morning Market",
        product: { name: "Rainbow Mint Drops", blurb: "Changes color as you suck it — a Hiyori-cho specialty" },
        dialogue: "The onlookers: \"The morning market's already started! Where are you setting up, pal?\"",
        choices: {
          A: { text: "\"Right next to the fishmonger — with prices so low even the fish are shocked!\"", result: "Even the fishmonger laughs, and customers go back and forth between both stalls." },
          B: { text: "\"The far end is fine. I'll set up where I won't be in anyone's way.\"", result: "The modest choice makes a good impression, and market folks come by to browse." },
          C: { text: "\"The best spot, right in the middle of the market, is mine!\"", result: "A fight over the spot breaks out, and the market organizer calls Makoto in." }
        }
      },
      Y05: {
        title: "After-Bath Souvenirs",
        product: { name: "Washi Paper Fans", blurb: "Hand-printed fans, perfect for summer festivals" },
        dialogue: "The onlookers: \"We're feeling great after the bath. Show us something fun!\"",
        choices: {
          A: { text: "\"Fresh from the bath? Try this candy — it warms you up like another soak!\"", result: "Guests in cotton robes buy drops, laughing out loud." },
          B: { text: "\"Fan yourself before you catch a chill... wait, that'll chill you!\"", result: "The one-man comedy routine cracks up the spa guests, and the fans sell." },
          C: { text: "\"Watch your step. I'll carry a lantern for you back to the inn.\"", result: "After Makoto lights their way home, the guests all come by the stall the next morning." }
        }
      },
      T01: {
        title: "A Break on the Pass",
        product: { name: "Mountain Mint Drops", blurb: "One drop and even the uphill feels cool" },
        dialogue: "Everyone crossing the pass is worn out. Got anything to make them feel better?",
        choices: {
          A: { text: "\"Let me help carry the tea first, ma'am. The candy can wait.\"", result: "After the tea is served, travelers ask for \"that young man's candy.\"" },
          B: { text: "\"Mint drops. I won't say they cure fatigue, but they're refreshing.\"", result: "\"How honest,\" Oshin laughs, and puts the drops on her teahouse shelf." },
          C: { text: "\"Suck on one of these and you'll fly over the pass!\"", result: "A traveler who failed to fly comes back to complain, and the teahouse is in an uproar." }
        }
      },
      T02: {
        title: "On the Truck Bed",
        product: { name: "Hand-Crank Radio", blurb: "No batteries needed — works even on the pass" },
        dialogue: "Hey, the pass road is dull as dirt. Sell me something lively!",
        choices: {
          A: { text: "\"At the top of the pass, this radio picks up foreign stations!\"", result: "Genta happily buys one and drives off blasting it from the truck bed." },
          B: { text: "\"With a radio, even a dull mountain road becomes a comedy hall.\"", result: "\"A comedy hall, eh? Love it!\" Genta buys some for his buddies too." },
          C: { text: "\"The King of the Pass! Look at that steering!\"", result: "\"Flattery won't get you a ride,\" Genta shrugs." }
        }
      },
      T03: {
        title: "Sheltering from the Rain",
        product: { name: "Oiled-Paper Umbrella", blurb: "Reliable in a sudden downpour" },
        dialogue: "Oh dear, it's pouring all of a sudden! The travelers will be soaked!",
        choices: {
          A: { text: "\"Pay for the umbrellas later. Everyone, under the eaves!\"", result: "When the rain stops, the travelers thank him one after another, and Oshin treats him to tea." },
          B: { text: "\"A paper umbrella on a rainy pass — now that's a picture.\"", result: "Told they'd look like a painting, travelers snap up umbrellas one after another." },
          C: { text: "\"This umbrella even keeps off lightning!\"", result: "Right then real thunder cracks, and the travelers drop their umbrellas and scatter." }
        }
      },
      T04: {
        title: "The Pass Hauler",
        product: { name: "Pocket Compass", blurb: "Find north even when lost on the pass" },
        dialogue: "Pal, I'm hauling over the pass tonight. How about one last big deal?",
        choices: {
          A: { text: "\"With this compass, you'll drive the pass at night like it's noon!\"", result: "Genta rounds up his driver buddies, and they buy a whole box." },
          B: { text: "\"When lost, face north. Life and mountain roads are alike.\"", result: "\"Nicely put!\" Genta slaps his knee and spreads the word." },
          C: { text: "\"The pass is dangerous at night. Better to wait for morning than trust a compass.\"", result: "Genta grudgingly delays, and the next morning buys two compasses as thanks." }
        }
      },
      T05: {
        title: "Teahouse Onlookers",
        product: { name: "Wind Chime", blurb: "Rings beautifully in the mountain breeze" },
        dialogue: "The onlookers: \"The wind's cold up here. Give us a laugh, pal!\"",
        choices: {
          A: { text: "\"A chime that rings in the pass wind — take it home and stay cool all summer!\"", result: "The crowd bursts out laughing, and wind chimes sell as souvenirs." },
          B: { text: "\"You all crossed the pass? What strong legs you have!\"", result: "The praised travelers grin bashfully and buy a chime on the way." },
          C: { text: "\"When this chime rings, a tengu appears!\"", result: "The kids burst into tears, and the teahouse mistress scolds him." }
        }
      },
      J01: {
        title: "The Elder's Stroll",
        product: { name: "Fine Brush", blurb: "A quality brush that writes smoothly" },
        dialogue: "You there. If you sell in this town, I trust you have a proper pitch?",
        choices: {
          A: { text: "\"A brush I'd like to show a connoisseur like yourself, sir.\"", result: "The elder nods with satisfaction and buys three brushes." },
          B: { text: "\"It's good, but not special. I can vouch for how it writes, though.\"", result: "\"Honest. Good,\" the elder says, tries it out, and buys one." },
          C: { text: "\"Write with this and your handwriting improves by itself... well, not really.\"", result: "\"Flippant,\" the elder frowns, and only the onlookers giggle." }
        }
      },
      J02: {
        title: "The Sweet Shop Girl",
        product: { name: "Dumpling Mold", blurb: "Make castle-town dumplings at home" },
        dialogue: "Our dumplings haven't been selling lately. Any good ideas?",
        choices: {
          A: { text: "\"Three dumplings per skewer. Come as a group of three, get a skewer free?\"", result: "Chiyo claps with joy and posts a new sign. She buys a mold as thanks." },
          B: { text: "\"Let's sell your dumplings at my stall today too.\"", result: "With the stall and the sweet shop side by side, both sell well." },
          C: { text: "\"Dumplings made in this mold were eaten by the lord himself!\"", result: "\"That's a lie, isn't it?\" Chiyo sees right through it, and rumors spread across town." }
        }
      },
      J03: {
        title: "The Castle Tea Ceremony",
        product: { name: "Tea Whisk", blurb: "For practicing the tea ceremony" },
        dialogue: "There is a tea ceremony at the castle tonight. Shall we see if your goods pass a tea master's eye?",
        choices: {
          A: { text: "\"I can't say if they'll pass. But each one is handmade.\"", result: "The elder tells that story at the ceremony, and tea masters come looking for whisks." },
          B: { text: "\"If they pass your eye, sir, they'll pass anyone's.\"", result: "Pleased, the elder buys a batch as gifts for the ceremony." },
          C: { text: "\"Whip up some foam and the conversation blooms too!\"", result: "\"Don't make light of the tea ceremony!\" the elder thunders." }
        }
      },
      J04: {
        title: "Castle Town Night Festival",
        product: { name: "Paper Lanterns", blurb: "Handmade lanterns for the night festival" },
        dialogue: "It's the castle town night festival tonight. Want to team up for one last push?",
        choices: {
          A: { text: "\"Dumplings in one hand, lantern in the other... you'll have to eat with your mouth!\"", result: "Chiyo bursts out laughing, and their double act draws a festival crowd." },
          B: { text: "\"Light for the dark roads. Lanterns are free for the elderly.\"", result: "On the lit-up road, Chiyo smiles: \"You're a good person.\"" },
          C: { text: "\"This lantern once hung in the castle keep!\"", result: "A castle official comes to check, and the festival is briefly thrown into chaos." }
        }
      },
      J05: {
        title: "Castle Town Onlookers",
        product: { name: "Kokeshi Doll", blurb: "Simple wooden dolls carved by local craftsmen" },
        dialogue: "The onlookers: \"Castle town folks have discerning eyes. So, how will you sell?\"",
        choices: {
          A: { text: "\"Each kokeshi is carved by hand. No two faces are alike.\"", result: "The crowd compares the faces, and each buys a favorite." },
          B: { text: "\"These dolls look just like you all — discerning faces!\"", result: "Laughter erupts — \"That one looks like my grandma!\" — and they sell fast." },
          C: { text: "\"Castle town customers have such fine taste!\"", result: "\"You get it,\" the crowd says, pleased, and buys." }
        }
      },
      W01: {
        title: "Market Before Dawn",
        product: { name: "Wool Gloves", blurb: "Shrug off the morning market chill" },
        dialogue: "Running a stall on a freezing morning like this? You've got guts. What are you selling?",
        choices: {
          A: { text: "\"Wool gloves. The knitting's rough, but the warmth is real.\"", result: "Fumi puts them on — \"It's true\" — and recommends them to the other vendors." },
          B: { text: "\"Wear these and the cold can't lay a finger on you!\"", result: "\"Good one!\" Fumi laughs and spreads the word across the market." },
          C: { text: "\"Ma'am, your smile is lovely even in this cold!\"", result: "\"It's freezing, but your mouth sure runs warm,\" Fumi snorts." }
        }
      },
      W02: {
        title: "Gifts for Home",
        product: { name: "Small Gift Bags", blurb: "Presents for the family waiting at home" },
        dialogue: "I'm heading back to my village for the first time in ages. I want gifts for my family...",
        choices: {
          A: { text: "\"Tell me about your family. We'll pick something for each of them.\"", result: "Fuyukichi chooses with each face in mind and leaves happy." },
          B: { text: "\"Gifts from a son who worked hard in the city? They'll love anything.\"", result: "Blushing, Fuyukichi fills up the gift bags." },
          C: { text: "\"This is all the rage in the city! You can show it off back home!\"", result: "\"I got fooled by talk like that in the city...\" Fuyukichi sighs." }
        }
      },
      W03: {
        title: "Blizzard Morning",
        product: { name: "Wool Scarves", blurb: "A must on a snowy morning" },
        dialogue: "Uh-oh, a blizzard's coming in! The market's goods will get buried!",
        choices: {
          A: { text: "\"Forget the scarves! Let's get everyone's goods under the eaves!\"", result: "When the blizzard ends, the whole market comes to thank him, and the scarves sell too." },
          B: { text: "\"Blizzard days are scarf days! Protect your neck, protect your business!\"", result: "\"Smooth talker,\" Fumi laughs, as frozen customers ask for scarves." },
          C: { text: "\"No business in this blizzard. I'm closing up today.\"", result: "\"Wise,\" Fumi nods — but sales are almost nothing." }
        }
      },
      W04: {
        title: "Snow-Viewing Party",
        product: { name: "Snow-Viewing Candles", blurb: "Thick candles to light up snowy nights" },
        dialogue: "Tonight's the village snow-viewing party. Won't you come sell something with me?",
        choices: {
          A: { text: "\"This party's to celebrate your homecoming. If the guest of honor recommends it, everyone buys.\"", result: "Blushing, Fuyukichi recommends the candles, and every house in the village glows." },
          B: { text: "\"Let me help set up the party. Sales can wait.\"", result: "When the setup's done, the villagers buy every candle as thanks." },
          C: { text: "\"This candle summons spring in a single night!\"", result: "Spring doesn't come — only melted wax. Fuyukichi looks heartbroken." }
        }
      },
      W05: {
        title: "Morning Market Onlookers",
        product: { name: "Sweet Potato Wrappers", blurb: "Warmer than newspaper" },
        dialogue: "The onlookers: \"It's so cold our wallets are frozen shut. Thaw 'em out!\"",
        choices: {
          A: { text: "\"Frozen wallets? Let's warm them up with roasted sweet potatoes!\"", result: "The steam draws a crowd, and the wallets loosen." },
          B: { text: "\"Wrap it in this and even snow turns into a sweet potato!\"", result: "Kids who wrapped up snow burst into tears, and the market is in an uproar." },
          C: { text: "\"It's just wrapping paper, but it's doubled so food stays warm.\"", result: "The market women say \"How handy\" and buy in bulk." }
        }
      },
      M01: {
        title: "The Novice's Errand",
        product: { name: "Wind-Up Doll", blurb: "A little doll that walks on a spring" },
        dialogue: "I'm on an errand for the abbot, but... can I take a quick look at that doll?",
        choices: {
          A: { text: "\"This doll stops when you chant sutras. Not enough training, you see.\"", result: "Chinnen roars with laughter and spends his allowance on dolls for his friends." },
          B: { text: "\"At night, this doll walks all around the main hall!\"", result: "Chinnen gleefully buys one — and gets scolded for winding it in the hall at midnight." },
          C: { text: "\"Such a dedicated young novice!\"", result: "\"Flattery won't make the sutras any shorter,\" Chinnen huffs." }
        }
      },
      M02: {
        title: "The Abbot's Request",
        product: { name: "Wooden Prayer Beads", blurb: "Simple beads that feel good in the hand" },
        dialogue: "If you trade at our gate, be sure not to offend the worshippers.",
        choices: {
          A: { text: "\"Understood. I'll post clear prices too.\"", result: "The abbot smiles and recommends the stall to worshippers." },
          B: { text: "\"Let me help sweep the temple grounds.\"", result: "After the sweeping, the abbot buys ten strings of beads for the temple shop." },
          C: { text: "\"Hold these beads and every wish comes true!\"", result: "\"A convenient fib, stretched too far, is a lie,\" the abbot gently chides." }
        }
      },
      M03: {
        title: "Lost at the Fair",
        product: { name: "Paper Balloons", blurb: "An old-fashioned toy you blow up" },
        dialogue: "Oh no! A little kid's lost at the fair! They're crying and won't budge!",
        choices: {
          A: { text: "\"Give them a balloon to calm down. Let's find the parents together.\"", result: "When the parents turn up, Chinnen beams: \"Mister, that was cool!\"" },
          B: { text: "\"Follow the balloon — the parents are where it floats! ...Maybe.\"", result: "The child starts laughing, the parents rush over at the sound, and onlookers buy balloons." },
          C: { text: "\"Hold this balloon and you'll never get lost!\"", result: "Kids at the fair mob the balloons, and new lost children pop up everywhere." }
        }
      },
      M04: {
        title: "Night of the Grand Festival",
        product: { name: "Little Bells", blurb: "Clear-ringing bells for good-luck charms" },
        dialogue: "Tonight is Komyoji's grand festival. Let your trade end in a fitting way.",
        choices: {
          A: { text: "\"These are just bells. But every time they ring, you'll remember today.\"", result: "\"Fine words,\" the abbot says, and worshippers line up for bells." },
          B: { text: "\"I'll donate part of tonight's sales to the temple repairs.\"", result: "The abbot bows deeply, and townsfolk call him a merchant to admire." },
          C: { text: "\"Ring the bell and the Buddha turns around... or so I'm told — ask the abbot!\"", result: "Even the abbot can't help a wry smile, and the grounds fill with laughter." }
        }
      },
      M05: {
        title: "Temple Gate Worshippers",
        product: { name: "Ward-Off Rice Crackers", blurb: "A crisp cracker on the way home from the temple" },
        dialogue: "The onlookers: \"We just finished praying. Got anything that might bring good luck?\"",
        choices: {
          A: { text: "\"Can't promise luck, but they're fresh-baked and delicious.\"", result: "The worshippers laugh — \"An honest man!\" — and buy crackers as souvenirs." },
          B: { text: "\"Eat one and bad luck stays away all year!\"", result: "A temple worker overhears, and an argument breaks out among the worshippers." },
          C: { text: "\"If it breaks, that's proof the bad luck broke too!\"", result: "The worshippers snap their crackers on purpose, laugh, and buy another." }
        }
      },
      K01: {
        title: "Payday Miners",
        product: { name: "Little Sake Flask", blurb: "For a drink after work" },
        dialogue: "It's payday! Kid, bring out something lively!",
        choices: {
          A: { text: "\"Drink from this flask and sake tastes twice as good!\"", result: "Iwao laughs, buys a flask, and comes back with his buddies." },
          B: { text: "\"Let me carry those heavy bags home for you.\"", result: "After the job, Iwao says \"I like you\" and buys three flasks." },
          C: { text: "\"A flask has a narrow neck. Keep your pay envelope narrow too.\"", result: "\"Talk plain — I don't get your fancy words!\" Iwao frowns." }
        }
      },
      K02: {
        title: "By the Housing Well",
        product: { name: "Bamboo Baskets", blurb: "For laundry and shopping alike" },
        dialogue: "If you sell in the miners' housing, look after the kids and old folks.",
        choices: {
          A: { text: "\"These baskets are sturdy. I'll price them cheap for the housing, too.\"", result: "\"You get it,\" Tome nods, and recommends him to the women at the well." },
          B: { text: "\"I'll deliver one to the old lady's house.\"", result: "When he's back, Tome says \"You're a good kid\" and buys two baskets." },
          C: { text: "\"Ma'am, you're the prettiest in the whole housing!\"", result: "\"Save that for the men on payday,\" Tome laughs it off." }
        }
      },
      K03: {
        title: "The Mine Alarm",
        product: { name: "Flashlights", blurb: "Peace of mind in dark tunnels" },
        dialogue: "The mine bell's ringing! Power's out — the guys in the tunnels can't get out!",
        choices: {
          A: { text: "\"Take every flashlight! No charge!\"", result: "When the miners come out safe, Iwao throws an arm around him: \"I owe you.\"" },
          B: { text: "\"This flashlight lights up the far side of the mountain!\"", result: "The miners shout at the tall tale, and the mine entrance is in an uproar." },
          C: { text: "\"This is all I have. We'll make up the rest with candles.\"", result: "\"That helps,\" Iwao nods, buys the lights, and hands them out." }
        }
      },
      K04: {
        title: "The Mine Bon Dance",
        product: { name: "Hand Towels", blurb: "For wiping sweat at the Bon dance" },
        dialogue: "Tonight's the mine's Bon dance. Make the whole town happy to finish off.",
        choices: {
          A: { text: "\"I'll help build the dance tower!\"", result: "Once it's up, Tome buys every towel: \"Now you dance too.\"" },
          B: { text: "\"I brought these towels for the hardworking miners' sweat.\"", result: "Impressed, Tome spreads the word, and towels wave in the dance circle." },
          C: { text: "\"Wave this towel and you'll dance better!\"", result: "Someone waves too hard, flies out of the circle, and the dance turns to chaos." }
        }
      },
      K05: {
        title: "Mine Town Onlookers",
        product: { name: "Kendama", blurb: "A big hit with the miners' kids" },
        dialogue: "The onlookers: \"We're beat after our shift. Got anything fun?\"",
        choices: {
          A: { text: "\"Master this kendama and you'll split mine rock in one blow!\"", result: "The miners take the challenge seriously, and the kendama fly off the stand." },
          B: { text: "\"Kendama joins ball and cup — get it right and your marriage stays happy!\"", result: "The wives giggle and make their husbands buy one." },
          C: { text: "\"I'll teach the kids how to play.\"", result: "The kids are hooked, and their parents buy kendama as thanks." }
        }
      },
      A01: {
        title: "The Student Haggler",
        product: { name: "Bundle of Pencils", blurb: "Essential before exams" },
        dialogue: "Logically speaking, don't you think this price is too high for those pencils?",
        choices: {
          A: { text: "\"Logically, every answer written with these is correct... not necessarily.\"", result: "Manabu laughs — \"I see\" — and buys some for his friends before exams." },
          B: { text: "\"They're not cheap. But the lead really doesn't break easily.\"", result: "Manabu tests one — \"That's logical\" — and buys a bundle." },
          C: { text: "\"A college man! So smart!\"", result: "\"Flattery won't open my wallet. It's empty anyway,\" Manabu shrugs." }
        }
      },
      A02: {
        title: "Coffee Poem",
        product: { name: "Coffee Cups", blurb: "Thick cups like the coffee shop uses" },
        dialogue: "Selling right outside my shop? I'll allow it — if your pitch is stylish.",
        choices: {
          A: { text: "\"Drink black coffee from this cup and it tastes like life itself.\"", result: "\"Very stylish,\" the master laughs and buys cups for the shop." },
          B: { text: "\"An honor to sell in front of the most stylish shop in town.\"", result: "Not displeased, the master recommends the cups to his regulars." },
          C: { text: "\"These cups are used in a famous café in Paris!\"", result: "\"How tacky,\" the master frowns, and the students start debating whether it's true." }
        }
      },
      A03: {
        title: "Night Before the Exam",
        product: { name: "College Notebooks", blurb: "Ruled for easy writing" },
        dialogue: "The exam's tomorrow and I've lost all my notes... What do I do?",
        choices: {
          A: { text: "\"Let's borrow your classmates' notes. I'll go ask with you.\"", result: "His classmates lend their notes, and Manabu thanks him with teary eyes." },
          B: { text: "\"With a new notebook, you can make brand-new mistakes!\"", result: "Manabu bursts out laughing, pulls himself together, and buys a notebook." },
          C: { text: "\"I can sell notebooks, not what goes in them. Stay up and study tonight.\"", result: "\"Exactly right,\" Manabu nods, and buys five notebooks." }
        }
      },
      A04: {
        title: "School Festival Night",
        product: { name: "Harmonicas", blurb: "To go with the students' singing" },
        dialogue: "Tonight's the school festival, and I'm hosting a concert at the shop. How about one last stylish pitch?",
        choices: {
          A: { text: "\"A harmonica plays whether you blow or draw. May life be the same!\"", result: "\"Words to live by,\" the master applauds, and concertgoers buy harmonicas." },
          B: { text: "\"With you hosting, every student in town will show up.\"", result: "In high spirits, the master promotes the stall, and harmonicas sell well." },
          C: { text: "\"Blow this harmonica and anyone becomes a singer!\"", result: "Students all start blowing at once, and the festival drowns in noise." }
        }
      },
      A05: {
        title: "Students on the Hill",
        product: { name: "Playing Cards", blurb: "For nights in the boarding house" },
        dialogue: "The onlookers (students): \"We've got no money but plenty of time. Make us laugh and we'll buy!\"",
        choices: {
          A: { text: "\"No money, plenty of time — cards turn time into treasure!\"", result: "The students clap — \"Good one!\" — and each boarding house buys a deck." },
          B: { text: "\"They're cheap, but one deck keeps a boarding house busy for years.\"", result: "\"That's a blessing,\" the students say, pooling coins to buy." },
          C: { text: "\"Win with these cards and you'll ace your exams!\"", result: "Students who played cards all night fail their exams and come to complain." }
        }
      },
      N01: {
        title: "The Ferry Captain",
        product: { name: "Brass Anchor Charm", blurb: "A sailor's good-luck charm" },
        dialogue: "Selling on the island? That's rare. Folks here don't fall for sweet deals.",
        choices: {
          A: { text: "\"No sweet deals. But this anchor charm is brass and won't rust.\"", result: "\"A straight shooter,\" Kaizo laughs, and buys one for his boat." },
          B: { text: "\"Hang this anchor charm and no storm will ever sink your ship!\"", result: "\"Big talk!\" Kaizo roars with laughter and recommends it to his crew." },
          C: { text: "\"The island's finest captain — what presence!\"", result: "\"Let the waves carry off your flattery,\" Kaizo waves him away." }
        }
      },
      N02: {
        title: "Grandma Who Knows All",
        product: { name: "Seashell Necklaces", blurb: "Made from shells found on the island's beach" },
        dialogue: "Oh, from the mainland? Want to know about the island? Ask me first.",
        choices: {
          A: { text: "\"Grandma, let me carry that home for you.\"", result: "Once home, Grandma tells the whole island \"a good person has come.\"" },
          B: { text: "\"Ask the island's know-it-all and you'll know where these shells came from.\"", result: "Grandma laughs — \"That shell's from that beach over there\" — and buys a necklace." },
          C: { text: "\"A mermaid made this necklace!\"", result: "\"Lie on this island and everyone knows by tomorrow,\" Grandma glares." }
        }
      },
      N03: {
        title: "Ferry Cancelled",
        product: { name: "Fishing Line", blurb: "A must for island anglers" },
        dialogue: "Bad news — typhoon's coming, tomorrow's ferry is cancelled. People had business on the mainland...",
        choices: {
          A: { text: "\"I'll take down everyone's errands. When the ferry runs, I'll handle them.\"", result: "Islanders come to thank him one after another, and Kaizo bows: \"I owe you.\"" },
          B: { text: "\"No ferry? Perfect fishing weather! With this line, a big catch is guaranteed!\"", result: "\"Big talk,\" Kaizo laughs, and island anglers stock up on line." },
          C: { text: "\"No business in a typhoon. I'll wait for the ferry too.\"", result: "\"Wise,\" Kaizo nods — but sales are almost nothing." }
        }
      },
      N04: {
        title: "Island Summer Festival",
        product: { name: "Sparklers", blurb: "Little flowers of fire on an island night" },
        dialogue: "Tonight's the island summer festival. A mainlander running a stall? First time in decades.",
        choices: {
          A: { text: "\"I heard on this island: the bigger the last spark, the more your wish comes true.\"", result: "\"I just made that up myself,\" Grandma laughs, and the whole island buys sparklers." },
          B: { text: "\"I'll give one sparkler to every child on the island.\"", result: "Seeing the kids' smiles, Grandma tears up: \"Come back again, you hear?\"" },
          C: { text: "\"These use the same powder as the big mainland fireworks show!\"", result: "By morning, the whole island knows him as \"the lying merchant.\"" }
        }
      },
      N05: {
        title: "Ferry Dock Onlookers",
        product: { name: "Ramune Soda", blurb: "A fizzy bottle for the island heat" },
        dialogue: "The onlookers: \"Waiting for the ferry is dull. Do something fun!\"",
        choices: {
          A: { text: "\"Get the marble out of the ramune bottle and you're an island master. Challengers wanted!\"", result: "Waiting passengers get hooked, and the ramune sells bottle after bottle." },
          B: { text: "\"Cold ramune. It's hot on the ferry, so grab one.\"", result: "\"Thoughtful,\" the passengers say, buying bottles to take aboard." },
          C: { text: "\"Drink this ramune and you won't get seasick!\"", result: "Seasick passengers come back from the ferry, and the dock is in an uproar." }
        }
      }
    },

    towns: {
      hiyori: { name: "Hiyori-cho Shopping Street", blurb: "An old-fashioned shopping street full of familiar faces." },
      shiomi: { name: "Shiomi Harbor", blurb: "A harbor town of fishermen and divers. Big talk goes over well." },
      yunosawa: { name: "Yunosawa Hot Springs", blurb: "A steamy hot-spring town. Inn guests loosen their purse strings." },
      touge: { name: "Toge Teahouse Inn", blurb: "A post town on the mountain pass where travelers stop for tea. Busy guests, slow teahouse." },
      joka: { name: "Tsurumi Castle Town", blurb: "A castle town famous for sweets. Plenty of people fussy about tradition." },
      yukimi: { name: "Yukimi Morning Market", blurb: "A snowy northern town. The morning market opens before dawn." },
      monzen: { name: "Komyoji Temple Gate Town", blurb: "A town at the gate of a great temple, busy with worshippers and fairs." },
      kuroiwa: { name: "Kuroiwa Mining Town", blurb: "A coal-mining town. On payday, the whole town comes alive." },
      aoba: { name: "Aobadai Student Quarter", blurb: "A hilly college town. No money, but endless debate and laughter." },
      nagi: { name: "Nagi Island", blurb: "A small island reached by ferry, where everyone knows everyone." }
    },

    journeyEndings: {
      j_grand: { name: "A Grand Finale", title: "Peddler of Renown", text: "Three towns of profit, laughter and new ties. At the teahouse on the mountain pass, a stranger says, \"I've heard all about you.\"" },
      j_chaos: { name: "Bird of Trouble", title: "Notorious Troublemaker", text: "Trouble followed Makoto from town to town — one day ended in being all but chased out. Word spread ahead: \"That pitchman is coming!\" Still, Makoto walks on with a light step." },
      j_kind: { name: "The Kind Road", title: "Welcome Anywhere", text: "The profits were modest. But in all three towns, someone now says, \"Come back anytime.\" That's the greatest fortune of all." },
      j_rich: { name: "Famous Peddler", title: "Top-Earning Traveler", text: "Three towns, sold and sold again. Hugging a heavy wallet, Makoto unfolds the map to the next stop." },
      j_onward: { name: "Onward to the Next Journey", title: "Wanderer of the Winds", text: "Three towns without great fortune or great trouble — yet each left a small memory. Today, too, Makoto sets off for the next town." }
    },

    townEndings: {
      shiomi: {
        chaos: { name: "Shiomi Harbor Uproar", title: "Legendary Tall-Talker", text: "Fired up by the pitch, the fishermen threw a huge party on the docks, and Makoto got summoned by the fishing co-op. He slipped away behind the first boat out at dawn." },
        humanity: { name: "Kindness on the Sea Breeze", title: "Always Welcome Back", text: "Sales were modest, but as he left, the fishermen handed him dried fish and the divers a shell necklace. \"Come back, you hear?\" — carried on the sea breeze, that was the best profit of all." },
        prosperity: { name: "Booming Harbor", title: "Best Pitchman in Shiomi", text: "Sold out, wallet bulging... or so it seemed, until he met a young fisherman who'd lost his nets at the dock and found himself handing over half his take." },
        laughter: { name: "Harbor Comedian", title: "Master of Laughs", text: "Sales were so-so. But the fishermen kept laughing about his pitch over drinks — and again out on the boats the next morning." },
        wander: { name: "Tomorrow, the Smell of the Sea", title: "Carefree Peddler", text: "No big profit, no big trouble. Shouldering his pack at the sunset harbor, Makoto sets off, nudged along by the sea air. \"Now then, where shall I set up tomorrow?\"" }
      },
      yunosawa: {
        chaos: { name: "Yunosawa Hot Springs Uproar", title: "Legendary Tall-Talker", text: "Spa guests, overheated by his pitch, partied all night, and he became the topic of the innkeepers' meeting. Makoto slipped away under cover of the steam." },
        humanity: { name: "Kindness in the Steam", title: "Always Welcome Back", text: "Sales were modest, but as he left, the inn maid gave him hot-spring buns and a spa guest a towel. \"Come again\" — that was the best profit of all." },
        prosperity: { name: "Booming Spa Town", title: "Best Pitchman in Yunosawa", text: "Sold out, wallet bulging... until he met an elderly couple who couldn't pay for their inn, and found himself handing over half his take." },
        laughter: { name: "Comedian of the Steam", title: "Master of Laughs", text: "Sales were so-so. But guests said they \"burst out laughing in the bath remembering that pitch,\" and came back in their robes the next day." },
        wander: { name: "Tomorrow, Beyond the Steam", title: "Carefree Peddler", text: "No big profit, no big trouble. After a soak, Makoto shoulders his pack and walks off into the steam. \"Now then, where shall I set up tomorrow?\"" }
      },
      touge: {
        chaos: { name: "Uproar on the Pass", title: "Legendary Tall-Talker", text: "Travelers who took his pitch seriously caused a ruckus on the pass road, and he was summoned to the post-town office. Makoto slipped down the mountain in the fog." },
        humanity: { name: "Kindness on the Pass", title: "Always Welcome Back", text: "Sales were modest, but as he left, the teahouse mistress packed him rice balls and a driver saved him a seat on the truck. \"Cross the pass again sometime\" — that was the best profit of all." },
        prosperity: { name: "Booming Teahouse Inn", title: "Best Pitchman on the Pass", text: "Sold out, wallet bulging... until he met an old peddler woman who'd twisted her ankle on the pass, and found himself handing over half his take." },
        laughter: { name: "Comedian of the Pass", title: "Master of Laughs", text: "Sales were so-so. But travelers said they \"laughed all the way over the pass,\" and carried the story with them." },
        wander: { name: "Tomorrow, Over the Pass", title: "Carefree Peddler", text: "No big profit, no big trouble. After a cup of tea, Makoto shoulders his pack and heads down the sunset pass. \"Now then, where shall I set up tomorrow?\"" }
      },
      joka: {
        chaos: { name: "Castle Town Uproar", title: "Legendary Tall-Talker", text: "His pitch became the talk of the castle town, and castle officials came to inspect. Makoto packed up before dawn and quietly left town." },
        humanity: { name: "Castle Town Kindness", title: "Always Welcome Back", text: "Sales were modest, but as he left, the sweet shop girl gave him dumplings and the old master a parting fan. \"Do come again\" — that was the best profit of all." },
        prosperity: { name: "Booming Castle Town", title: "Best Pitchman in Tsurumi", text: "Sold out, wallet bulging... until he met an old craftsman about to close his shop, and found himself handing over half his take." },
        laughter: { name: "Castle Town Comedian", title: "Master of Laughs", text: "Sales were so-so. But people said it was \"the first time anyone laughed like that in this stuffy town,\" and crowds gathered again the next day." },
        wander: { name: "Tomorrow, the Castle Behind Me", title: "Carefree Peddler", text: "No big profit, no big trouble. With a glance back at the castle in the sunset, Makoto shoulders his pack. \"Now then, where shall I set up tomorrow?\"" }
      },
      yukimi: {
        chaos: { name: "Morning Market Uproar", title: "Legendary Tall-Talker", text: "His pitch threw the whole market into chaos, and he became the topic of the snow-shoveling committee. Makoto packed up by the light of the snow and quietly left." },
        humanity: { name: "Snow Country Kindness", title: "Always Welcome Back", text: "Sales were modest, but as he left, the market woman gave him pickles and Fuyukichi a hand-knit hat. \"Come back when it snows\" — that was the best profit of all." },
        prosperity: { name: "Booming Morning Market", title: "Best Pitchman in Yukimi", text: "Sold out, wallet bulging... until he met a family whose roof had caved in under the snow, and found himself handing over half his take." },
        laughter: { name: "Morning Market Comedian", title: "Master of Laughs", text: "Sales were so-so. But people said \"his pitch makes you forget the cold,\" and gathered again before dawn the next morning." },
        wander: { name: "Tomorrow, the Snowy Road", title: "Carefree Peddler", text: "No big profit, no big trouble. Leaving footprints in fresh snow, Makoto shoulders his pack. \"Now then, where shall I set up tomorrow?\"" }
      },
      monzen: {
        chaos: { name: "Temple Town Uproar", title: "Legendary Tall-Talker", text: "Crowds overflowed the temple gate, and he became the topic of the temple board meeting. Makoto slipped away before the dawn bell rang." },
        humanity: { name: "Temple Gate Kindness", title: "Always Welcome Back", text: "Sales were modest, but as he left, the abbot gave him a charm and little Chinnen secretly slipped him a bun. \"Come visit again\" — that was the best profit of all." },
        prosperity: { name: "Booming Temple Town", title: "Best Pitchman at the Gate", text: "Sold out, wallet bulging... until he saw a mother and child praying with nothing to offer, and found himself handing over half his take." },
        laughter: { name: "Temple Town Comedian", title: "Master of Laughs", text: "Sales were so-so. But so many came \"more for his pitch than for prayers\" that even the abbot smiled wryly." },
        wander: { name: "Tomorrow, with the Temple Bell", title: "Carefree Peddler", text: "No big profit, no big trouble. To the toll of the evening bell, Makoto shoulders his pack. \"Now then, where shall I set up tomorrow?\"" }
      },
      kuroiwa: {
        chaos: { name: "Mining Town Uproar", title: "Legendary Tall-Talker", text: "The miners got so worked up they waved their pay envelopes in the streets, and he became the topic of the union meeting. Makoto slipped away among the night-shift crowd." },
        humanity: { name: "Mining Town Kindness", title: "Always Welcome Back", text: "Sales were modest, but as he left, Tome gave him a lunch box and Iwao a polished lump of coal for luck. \"Come back, you hear?\" — that was the best profit of all." },
        prosperity: { name: "Payday Boom", title: "Best Pitchman in Kuroiwa", text: "Sold out, wallet bulging... until he met the family of a miner hurt on the job, and found himself handing over half his take." },
        laughter: { name: "Mining Town Comedian", title: "Master of Laughs", text: "Sales were so-so. But the miners said they \"kept laughing even down in the tunnels,\" and gathered again after their shift the next day." },
        wander: { name: "Tomorrow, Past the Slag Heap", title: "Carefree Peddler", text: "No big profit, no big trouble. Gazing at the slag heap glowing in the sunset, Makoto shoulders his pack. \"Now then, where shall I set up tomorrow?\"" }
      },
      aoba: {
        chaos: { name: "Student Quarter Uproar", title: "Legendary Tall-Talker", text: "Students debated his pitch all night, and he got called in by the university's student office. Makoto packed up before dawn and quietly walked down the hill." },
        humanity: { name: "Student Quarter Kindness", title: "Always Welcome Back", text: "Sales were modest, but as he left, Manabu gave him a thank-you poem on a scrap of notebook and the master a bag of coffee beans. \"Come again\" — that was the best profit of all." },
        prosperity: { name: "Booming on the Hill", title: "Best Pitchman in Aobadai", text: "Sold out, wallet bulging... until he met a student whose allowance had stopped and couldn't pay tuition, and found himself handing over half his take." },
        laughter: { name: "Student Quarter Comedian", title: "Master of Laughs", text: "Sales were so-so. But students called it \"more fun than studying,\" and skipped class to gather again the next day." },
        wander: { name: "Tomorrow, Beyond the Hill", title: "Carefree Peddler", text: "No big profit, no big trouble. With the students' singing behind him, Makoto shoulders his pack and heads down the hill. \"Now then, where shall I set up tomorrow?\"" }
      },
      nagi: {
        chaos: { name: "Nagi Island Uproar", title: "Legendary Tall-Talker", text: "Word of his pitch spread across the island overnight, and he became the topic of the island meeting. Makoto jumped on the first ferry and quietly left." },
        humanity: { name: "Island Kindness", title: "Always Welcome Back", text: "Sales were modest, but as he left, Grandma Kame gave him brown sugar and Captain Kaizo saved him the best seat on the ferry. \"Come across again\" — that was the best profit of all." },
        prosperity: { name: "Booming Island", title: "Best Pitchman on Nagi", text: "Sold out, wallet bulging... until he met an island fisherman whose boat was wrecked by the typhoon, and found himself handing over half his take." },
        laughter: { name: "Island Comedian", title: "Master of Laughs", text: "Sales were so-so. But \"the whole island is imitating that pitch,\" they said, and gathered at the dock again the next day." },
        wander: { name: "Tomorrow, the Calm Sea", title: "Carefree Peddler", text: "No big profit, no big trouble. Gazing at the calm evening sea, Makoto shoulders his pack and boards the ferry. \"Now then, where shall I set up tomorrow?\"" }
      }
    },

    goods: {
      candy: { name: "Rainbow Mint Drops", blurb: "Tall Tale sales +20%" },
      opener: { name: "The Open-Anything", blurb: "Quick Wit sales +25%" },
      cat: { name: "Lucky Cat Charm", blurb: "Honesty / Lend a Hand: Heart +4" },
      driver: { name: "Universal Screwdriver", blurb: "Sales +40% with the craftsman or the officer" },
      fan: { name: "Washi Paper Fans", blurb: "Sales +30% in the last act (evening)" },
      whistle: { name: "Toy Whistle", blurb: "With Kenta or Koharu: Laughs +6, Heart +2" }
    },

    endings: {
      chaos: {
        name: "Uproar on the Shopping Street",
        title: "Legend of the Tall Tale",
        text: "The patter was such a hit that crowds overflowed, and the shop owners' association made it an agenda item. Makoto packed up before dawn and quietly slipped out of town."
      },
      humanity: {
        name: "The Kind-Hearted Wanderer",
        title: "Always Welcome Back",
        text: "Sales were modest, but on the way out the greengrocer handed over vegetables and the dango shop a wrapped treat. \"Come back anytime\" — those words were the best profit of all."
      },
      prosperity: {
        name: "A Booming Stall",
        title: "Hiyori-cho's Best Pitchman",
        text: "Sold out, wallet bulging... or so it was, until a troubled parent and child on the road home somehow ended up with half the day's take."
      },
      laughter: {
        name: "Master of Laughs",
        title: "Crowd-Pleaser",
        text: "Sales were so-so. But \"I want to hear that guy's patter again!\" — and the next morning, a crowd was already waiting."
      },
      wander: {
        name: "Tomorrow, Another Sky",
        title: "Carefree Peddler",
        text: "No big profit, no big trouble. Under the sunset, Makoto shoulders the pack and heads for the next town. \"Now then, where shall I set up shop tomorrow?\""
      }
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
