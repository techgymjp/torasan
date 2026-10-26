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
      }
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
