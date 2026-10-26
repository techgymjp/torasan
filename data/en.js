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
      }
    },

    towns: {
      hiyori: { name: "Hiyori-cho Shopping Street", blurb: "An old-fashioned shopping street full of familiar faces." },
      shiomi: { name: "Shiomi Harbor", blurb: "A harbor town of fishermen and divers. Big talk goes over well." },
      yunosawa: { name: "Yunosawa Hot Springs", blurb: "A steamy hot-spring town. Inn guests loosen their purse strings." }
    },

    journeyEndings: {
      j_grand: { name: "A Grand Finale", title: "Peddler of Renown", text: "Three towns of profit, laughter and new ties. At the teahouse on the mountain pass, a stranger says, \"I've heard all about you.\"" },
      j_chaos: { name: "Bird of Trouble", title: "Notorious Troublemaker", text: "Trouble followed Makoto from town to town — one day ended in being all but chased out. Word spread ahead: \"That pitchman is coming!\" Still, Makoto walks on with a light step." },
      j_kind: { name: "The Kind Road", title: "Welcome Anywhere", text: "The profits were modest. But in all three towns, someone now says, \"Come back anytime.\" That's the greatest fortune of all." },
      j_rich: { name: "Famous Peddler", title: "Top-Earning Traveler", text: "Three towns, sold and sold again. Hugging a heavy wallet, Makoto unfolds the map to the next stop." },
      j_onward: { name: "Onward to the Next Journey", title: "Wanderer of the Winds", text: "Three towns without great fortune or great trouble — yet each left a small memory. Today, too, Makoto sets off for the next town." }
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
