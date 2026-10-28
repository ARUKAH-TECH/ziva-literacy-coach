// Word and sentence banks for the Stages (Beginner → Professional).
// Everyday Ghanaian/West African settings and names; plain British spelling.

/** Picture words: [word, emoji]. Emoji chosen to show well on Android. */
export const PICTURES: [string, string][] = [
  ["cat", "🐈"], ["dog", "🐕"], ["goat", "🐐"], ["hen", "🐔"], ["cow", "🐄"], ["pig", "🐖"], ["fish", "🐟"], ["sun", "☀️"],
  ["moon", "🌙"], ["star", "⭐"], ["tree", "🌳"], ["ball", "⚽"], ["bag", "🎒"], ["book", "📖"], ["cup", "☕"], ["bed", "🛏️"],
  ["car", "🚗"], ["bus", "🚌"], ["egg", "🥚"], ["hat", "🎩"], ["key", "🔑"], ["pen", "🖊️"], ["box", "📦"], ["ant", "🐜"],
  ["bee", "🐝"], ["duck", "🦆"], ["frog", "🐸"], ["lion", "🦁"], ["owl", "🦉"], ["rat", "🐀"], ["sheep", "🐑"], ["snake", "🐍"],
  ["bird", "🐦"], ["horse", "🐎"], ["rabbit", "🐇"], ["mango", "🥭"], ["banana", "🍌"], ["apple", "🍎"], ["orange", "🍊"], ["bread", "🍞"],
  ["rice", "🍚"], ["corn", "🌽"], ["milk", "🥛"], ["cake", "🎂"], ["house", "🏠"], ["door", "🚪"], ["chair", "🪑"], ["clock", "⏰"],
  ["phone", "📱"], ["drum", "🥁"], ["bell", "🔔"], ["ship", "🚢"], ["plane", "✈️"], ["train", "🚆"], ["bike", "🚲"], ["shoe", "👟"],
  ["sock", "🧦"], ["shirt", "👕"], ["dress", "👗"], ["ring", "💍"], ["hand", "✋"], ["foot", "🦶"], ["eye", "👁️"], ["ear", "👂"],
  ["nose", "👃"], ["rain", "🌧️"], ["fire", "🔥"], ["leaf", "🍃"], ["flower", "🌸"], ["nut", "🥜"], ["pot", "🍲"], ["boat", "⛵"],
  ["crab", "🦀"], ["queen", "👸"], ["king", "🤴"], ["baby", "👶"], ["girl", "👧"], ["boy", "👦"], ["heart", "❤️"], ["bat", "🦇"],
  ["fox", "🦊"], ["map", "🗺️"], ["gift", "🎁"], ["tent", "⛺"], ["van", "🚐"], ["web", "🕸️"], ["zebra", "🦓"], ["whale", "🐋"],
];

export const NAMES_GIRLS = ["Ama", "Esi", "Abena", "Akosua", "Adwoa", "Efua", "Akua", "Afia", "Ngozi", "Amina", "Zainab", "Yaa", "Adjoa", "Mansa"];
export const NAMES_BOYS = ["Kofi", "Kwame", "Yaw", "Kojo", "Kwabena", "Kweku", "Kwesi", "Chidi", "Tunde", "Musa", "Emeka", "Kwaku", "Fiifi", "Nana"];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const RELATIVES = ["mother", "father", "grandmother", "grandfather", "sister", "brother", "aunt", "uncle", "teacher"];

/** Everyday actions: base, -s form, object, "in the / at the" place. */
export const ACTIONS: { base: string; s: string; obj: string; prep: string; place: string }[] = [
  { base: "eat", s: "eats", obj: "rice", prep: "in the", place: "kitchen" },
  { base: "read", s: "reads", obj: "a book", prep: "in the", place: "library" },
  { base: "play", s: "plays", obj: "football", prep: "on the", place: "field" },
  { base: "wash", s: "washes", obj: "the plates", prep: "in the", place: "kitchen" },
  { base: "sell", s: "sells", obj: "oranges", prep: "at the", place: "market" },
  { base: "plant", s: "plants", obj: "maize", prep: "on the", place: "farm" },
  { base: "sweep", s: "sweeps", obj: "the floor", prep: "in the", place: "classroom" },
  { base: "feed", s: "feeds", obj: "the chickens", prep: "in the", place: "yard" },
  { base: "draw", s: "draws", obj: "a picture", prep: "in the", place: "classroom" },
  { base: "fetch", s: "fetches", obj: "water", prep: "at the", place: "well" },
  { base: "buy", s: "buys", obj: "bread", prep: "at the", place: "shop" },
  { base: "sing", s: "sings", obj: "a song", prep: "in the", place: "church" },
  { base: "cook", s: "cooks", obj: "soup", prep: "in the", place: "kitchen" },
  { base: "ride", s: "rides", obj: "a bicycle", prep: "on the", place: "road" },
  { base: "write", s: "writes", obj: "a letter", prep: "at the", place: "table" },
  { base: "catch", s: "catches", obj: "fish", prep: "at the", place: "river" },
  { base: "pick", s: "picks", obj: "mangoes", prep: "on the", place: "farm" },
  { base: "fly", s: "flies", obj: "a kite", prep: "on the", place: "beach" },
  { base: "carry", s: "carries", obj: "a basket", prep: "to the", place: "market" },
  { base: "water", s: "waters", obj: "the flowers", prep: "in the", place: "garden" },
  { base: "beat", s: "beats", obj: "the drum", prep: "at the", place: "festival" },
  { base: "visit", s: "visits", obj: "a friend", prep: "in the", place: "village" },
  { base: "clean", s: "cleans", obj: "the board", prep: "in the", place: "classroom" },
  { base: "pound", s: "pounds", obj: "fufu", prep: "in the", place: "compound" },
  { base: "watch", s: "watches", obj: "the news", prep: "in the", place: "hall" },
  { base: "count", s: "counts", obj: "the eggs", prep: "in the", place: "kitchen" },
  { base: "paint", s: "paints", obj: "the wall", prep: "at the", place: "school" },
  { base: "kick", s: "kicks", obj: "the ball", prep: "on the", place: "field" },
  { base: "bake", s: "bakes", obj: "a cake", prep: "in the", place: "kitchen" },
  { base: "mend", s: "mends", obj: "a shirt", prep: "in the", place: "shop" },
];

/** Trips: place, past verb, what they bought/did, for whom. */
export const TRIPS: { place: string; did: string; thing: string }[] = [
  { place: "market", did: "bought", thing: "tomatoes" },
  { place: "market", did: "bought", thing: "yams" },
  { place: "shop", did: "bought", thing: "bread" },
  { place: "shop", did: "bought", thing: "soap" },
  { place: "farm", did: "picked", thing: "oranges" },
  { place: "farm", did: "harvested", thing: "cassava" },
  { place: "river", did: "caught", thing: "fish" },
  { place: "library", did: "borrowed", thing: "a storybook" },
  { place: "bakery", did: "bought", thing: "meat pies" },
  { place: "beach", did: "collected", thing: "shells" },
  { place: "garden", did: "picked", thing: "flowers" },
  { place: "bookshop", did: "bought", thing: "a new pen" },
  { place: "chop bar", did: "bought", thing: "banku" },
  { place: "post office", did: "posted", thing: "a letter" },
  { place: "hospital", did: "visited", thing: "a sick friend" },
  { place: "tailor", did: "collected", thing: "a new uniform" },
];

/**
 * Events with a feeling and a reason. {he}/{his} are replaced with she/her
 * or he/his. `good` = a pleasant feeling (wrong options use the other kind).
 */
export const EVENTS: { event: string; feeling: string; good: boolean; reason: string }[] = [
  { event: "won the reading competition", feeling: "proud", good: true, reason: "{he} had practised reading every day" },
  { event: "lost the bus fare", feeling: "worried", good: false, reason: "there was a hole in {his} pocket" },
  { event: "got a new school bag", feeling: "happy", good: true, reason: "{his} old bag was torn" },
  { event: "missed the morning assembly", feeling: "sorry", good: false, reason: "{he} woke up late" },
  { event: "scored the winning goal", feeling: "excited", good: true, reason: "{he} had trained hard all week" },
  { event: "broke a glass cup", feeling: "sad", good: false, reason: "the floor was wet" },
  { event: "finished the homework early", feeling: "relaxed", good: true, reason: "{he} started straight after school" },
  { event: "could not find the house keys", feeling: "confused", good: false, reason: "{he} had left them in the car" },
  { event: "planted a mango tree", feeling: "hopeful", good: true, reason: "{he} wanted fruit for the family" },
  { event: "shared lunch with a new pupil", feeling: "glad", good: true, reason: "the new pupil had no food" },
  { event: "was chosen as class prefect", feeling: "honoured", good: true, reason: "{he} was always honest" },
  { event: "fell off the bicycle", feeling: "hurt", good: false, reason: "{he} rode too fast down the hill" },
  { event: "saw a big snake in the bush", feeling: "afraid", good: false, reason: "the snake was very close" },
  { event: "received a letter from a cousin", feeling: "delighted", good: true, reason: "{he} had not heard from the cousin for a long time" },
  { event: "failed the spelling test", feeling: "disappointed", good: false, reason: "{he} did not revise" },
  { event: "cleaned the whole compound", feeling: "tired", good: false, reason: "the compound was very dirty" },
  { event: "returned a lost purse to its owner", feeling: "pleased", good: true, reason: "{he} knew it was the right thing to do" },
  { event: "sang a solo in church", feeling: "nervous", good: false, reason: "the church was full of people" },
  { event: "visited the Kakum canopy walk", feeling: "amazed", good: true, reason: "the trees were very tall" },
  { event: "came first in the class test", feeling: "joyful", good: true, reason: "{he} had studied hard" },
];

// ── KG ────────────────────────────────────────────────────────────────────
export const SIGHT_KG = ["a", "I", "is", "it", "in", "at", "an", "am", "on", "up", "to", "go", "no", "my", "me", "we", "he", "she", "the", "and", "see", "can", "you", "look", "come", "here", "big", "red", "run", "play"];
export const CVC_KG = ["cat", "bat", "hat", "mat", "rat", "pan", "fan", "man", "van", "can", "bag", "cap", "map", "jam", "bed", "hen", "pen", "ten", "net", "leg", "web", "pig", "wig", "big", "sit", "pin", "tin", "lip", "zip", "dot", "hot", "pot", "box", "fox", "dog", "log", "top", "mop", "sun", "bun", "run", "cup", "bus", "mud", "hug", "rug", "nut", "hut", "tub", "six"];
export const PHRASES_KG = ["a cat", "a red hat", "my dog", "a big pig", "the sun", "a hot pot", "my mum", "a fat hen", "I can run", "I see a bus", "a cup of tea", "Ama can hop", "Kofi has a pen", "the dog sat", "I am six", "a box of nuts", "a pig in mud", "we can sing", "the bed is red", "I like rice"];

// ── P1–3 ─────────────────────────────────────────────────────────────────
export const SPELL_P13: { word: string; sentence?: string }[][] = [
  // Level 1: short vowel words
  "cat bat hat mat rat sat fan man pan van can map cap tap bag rag wag jam ham bed red pen hen ten net wet leg peg web big dig pig wig fig sit hit pin tin bin win lip zip hot pot dot hop mop top box fox dog log fog sun run fun bun cup pup bus mud hug rug jug nut cut hut tub rub yes kid lid six mix fix job not got"
    .split(" ").map((word) => ({ word })),
  // Level 2: sh ch th ck, blends, long vowels
  "ship shop fish dish wish chip chin chat much rich this that then with moth bath path thin duck sock back neck kick lock frog flag flat clap clip crab drum drip plan plug slip spot star stop swim tree trip green sleep sheep feet seed bee tea sea read meat rain tail snail train play day say may boat coat road goat soap moon food spoon pool book look good cook foot cake make lake bike kite time nine home bone rope cube tube"
    .split(" ").map((word) => ({ word })),
  // Level 3: everyday words
  [
    { word: "school", sentence: "We walk to school." }, { word: "water", sentence: "Drink clean water." }, { word: "happy", sentence: "Kofi is happy." },
    { word: "friend", sentence: "Ama is my friend." }, { word: "teacher", sentence: "Our teacher is kind." }, { word: "mother", sentence: "My mother cooks well." },
    { word: "father", sentence: "My father is a farmer." }, { word: "sister", sentence: "My sister can sing." }, { word: "brother", sentence: "My brother is tall." },
    { word: "apple", sentence: "The apple is red." }, { word: "orange", sentence: "I ate an orange." }, { word: "mango", sentence: "The mango is sweet." },
    { word: "banana", sentence: "Monkeys like bananas." }, { word: "garden", sentence: "Flowers grow in the garden." }, { word: "market", sentence: "Mother went to the market." },
    { word: "morning", sentence: "We pray in the morning." }, { word: "evening", sentence: "We eat supper in the evening." }, { word: "every", sentence: "I read every day." },
    { word: "because", sentence: "I am late because it rained." }, { word: "about", sentence: "Tell me about your school." }, { word: "after", sentence: "We play after school." },
    { word: "again", sentence: "Read it again." }, { word: "house", sentence: "Our house is big." }, { word: "mouse", sentence: "The cat saw a mouse." },
    { word: "round", sentence: "The ball is round." }, { word: "sound", sentence: "I heard a loud sound." }, { word: "little", sentence: "The baby is little." },
    { word: "people", sentence: "Many people came." }, { word: "pretty", sentence: "Her dress is pretty." }, { word: "many", sentence: "I have many books." },
    { word: "said", sentence: "She said thank you." }, { word: "they", sentence: "They are my friends." }, { word: "there", sentence: "Put it there." },
    { word: "where", sentence: "Where is my pen?" }, { word: "were", sentence: "We were happy." }, { word: "what", sentence: "What is your name?" },
    { word: "when", sentence: "When is the party?" }, { word: "which", sentence: "Which bag is yours?" }, { word: "your", sentence: "Wash your hands." },
    { word: "their", sentence: "That is their house." }, { word: "could", sentence: "I could not sleep." }, { word: "would", sentence: "Would you like tea?" },
    { word: "should", sentence: "You should be kind." }, { word: "yellow", sentence: "The banana is yellow." }, { word: "purple", sentence: "She has a purple bag." },
    { word: "seven", sentence: "I am seven years old." }, { word: "eleven", sentence: "Eleven players make a team." }, { word: "twelve", sentence: "A year has twelve months." },
    { word: "Monday", sentence: "School starts on Monday." }, { word: "Friday", sentence: "We wear our traditional cloth on Friday." }, { word: "Sunday", sentence: "We go to church on Sunday." },
    { word: "birthday", sentence: "Today is my birthday." }, { word: "window", sentence: "Open the window." }, { word: "table", sentence: "Put the cup on the table." },
    { word: "pencil", sentence: "Sharpen your pencil." }, { word: "rabbit", sentence: "The rabbit is fast." }, { word: "kitchen", sentence: "Mother is in the kitchen." },
    { word: "chicken", sentence: "We ate chicken and rice." }, { word: "button", sentence: "A button fell off my shirt." }, { word: "picnic", sentence: "We had a picnic." },
    { word: "football", sentence: "Boys and girls play football." }, { word: "basket", sentence: "Put the yams in the basket." }, { word: "ladder", sentence: "Climb the ladder carefully." },
    { word: "money", sentence: "Keep your money safe." }, { word: "uniform", sentence: "My school uniform is clean." }, { word: "thank", sentence: "Thank your teacher." },
    { word: "please", sentence: "Please pass the salt." }, { word: "sorry", sentence: "Say sorry when you are wrong." }, { word: "hungry", sentence: "I am hungry." },
  ],
];

export const WORDS_P13_WRITE = ["school", "Ghana", "friend", "water", "happy", "teacher", "mother", "father", "garden", "market", "orange", "mango", "rabbit", "pencil", "table", "window", "chicken", "yellow", "Monday", "Sunday", "birthday", "basket", "football", "uniform", "kitchen", "people", "little", "because", "morning", "evening"];

// Rhyme families
export const RHYMES: string[][] = [
  ["cat", "bat", "hat", "mat", "rat", "sat"], ["pan", "fan", "man", "van", "can", "ran"], ["pig", "big", "dig", "wig", "fig"],
  ["hop", "mop", "top", "pop", "shop"], ["sun", "run", "fun", "bun"], ["bed", "red", "fed", "led"], ["hug", "mug", "rug", "jug", "bug"],
  ["bell", "well", "sell", "tell", "shell"], ["cake", "lake", "make", "bake", "snake"], ["night", "light", "right", "kite", "bite"],
  ["ten", "hen", "pen", "men"], ["log", "dog", "fog", "frog"], ["tree", "bee", "see", "three"], ["boat", "coat", "goat", "float"],
  ["rain", "train", "chain", "pain"], ["king", "ring", "sing", "wing"], ["book", "cook", "look", "hook"], ["ball", "tall", "wall", "fall"],
];

// Opposites (simple)
export const OPPOSITES_EASY: [string, string][] = [
  ["big", "small"], ["hot", "cold"], ["up", "down"], ["in", "out"], ["fast", "slow"], ["happy", "sad"], ["tall", "short"], ["open", "shut"],
  ["day", "night"], ["wet", "dry"], ["old", "new"], ["full", "empty"], ["clean", "dirty"], ["hard", "soft"], ["light", "dark"], ["good", "bad"],
  ["yes", "no"], ["come", "go"], ["boy", "girl"], ["top", "bottom"], ["high", "low"], ["near", "far"], ["early", "late"], ["first", "last"],
  ["thick", "thin"], ["loud", "quiet"], ["rich", "poor"], ["right", "wrong"], ["push", "pull"], ["give", "take"],
];

// ── P4–6 ─────────────────────────────────────────────────────────────────
export const SPELL_P46: string[][] = [
  "answer believe bicycle breakfast calendar caught certain children clothes country cousin daughter decide describe early earth eight enough exercise famous field finally fruit grammar guard guess guide heard heart history island knife laugh learn length listen machine minute mountain notice ocean often parent picture piece plenty promise quarter question quickly"
    .split(" "),
  "beautiful because friendship favourite neighbour library February environment different tomorrow remember reply science scissors sentence shoulder soldier special station straight strange strength suddenly sugar surprise thought though through together tongue towards trouble usually various vegetable weight whole wonderful world write wrong young address arrive busy"
    .split(" "),
  "dictionary disappear experience important interest knowledge language medicine naughty opposite paragraph peaceful perhaps possible potato pressure probably purpose receive chocolate business height forward island accident actually breathe build centre circle complete consider continue difficult disappoint extreme imagine increase material natural occasion ordinary particular popular position recent regular separate therefore"
    .split(" "),
];

/** Groups of words with the same meaning (wrong options always come from other groups). */
export const SYNONYM_GROUPS: string[][] = [
  ["big", "large", "huge", "enormous"], ["small", "tiny", "little"], ["happy", "glad", "delighted", "joyful"], ["sad", "unhappy", "sorrowful"],
  ["fast", "quick", "rapid", "swift"], ["begin", "start", "commence"], ["end", "finish", "complete"], ["shut", "close"], ["help", "assist", "aid"],
  ["brave", "courageous", "bold"], ["clever", "intelligent", "bright"], ["rich", "wealthy", "prosperous"], ["angry", "cross", "furious"],
  ["easy", "simple"], ["hard", "difficult", "tough"], ["shout", "yell", "scream"], ["buy", "purchase"], ["enough", "sufficient", "adequate"],
  ["old", "ancient", "aged"], ["quiet", "silent", "calm"], ["gift", "present"], ["journey", "trip", "voyage"], ["cry", "weep", "sob"],
  ["shy", "timid"], ["neat", "tidy"], ["tired", "weary", "exhausted"], ["mend", "repair", "fix"], ["choose", "select", "pick"],
  ["answer", "reply", "respond"], ["mistake", "error", "fault"], ["wet", "damp", "soaked"], ["kind", "generous", "caring"],
  ["afraid", "scared", "frightened"], ["strong", "powerful", "mighty"], ["pretty", "beautiful", "lovely"], ["talk", "speak", "chat"],
];

export const OPPOSITES_HARD: [string, string][] = [
  ["accept", "refuse"], ["ancient", "modern"], ["arrive", "depart"], ["brave", "cowardly"], ["cheap", "expensive"], ["deep", "shallow"],
  ["entrance", "exit"], ["friend", "enemy"], ["generous", "selfish"], ["guilty", "innocent"], ["humble", "proud"], ["increase", "decrease"],
  ["inside", "outside"], ["lend", "borrow"], ["maximum", "minimum"], ["often", "seldom"], ["polite", "rude"], ["profit", "loss"],
  ["remember", "forget"], ["strong", "weak"], ["success", "failure"], ["victory", "defeat"], ["visible", "invisible"], ["wide", "narrow"],
  ["wisdom", "foolishness"], ["temporary", "permanent"], ["export", "import"], ["majority", "minority"], ["include", "exclude"], ["artificial", "natural"],
];

export const PAST_TENSE: [string, string][] = [
  ["go", "went"], ["eat", "ate"], ["see", "saw"], ["come", "came"], ["run", "ran"], ["write", "wrote"], ["take", "took"], ["give", "gave"],
  ["sing", "sang"], ["swim", "swam"], ["drink", "drank"], ["buy", "bought"], ["bring", "brought"], ["think", "thought"], ["catch", "caught"],
  ["teach", "taught"], ["sleep", "slept"], ["keep", "kept"], ["feel", "felt"], ["leave", "left"], ["make", "made"], ["say", "said"],
  ["tell", "told"], ["sell", "sold"], ["stand", "stood"], ["sit", "sat"], ["fly", "flew"], ["draw", "drew"], ["know", "knew"], ["grow", "grew"],
  ["throw", "threw"], ["break", "broke"], ["speak", "spoke"], ["choose", "chose"], ["wake", "woke"], ["drive", "drove"], ["ride", "rode"],
  ["fall", "fell"], ["find", "found"], ["win", "won"],
];

export const PLURALS: [string, string][] = [
  ["child", "children"], ["man", "men"], ["woman", "women"], ["foot", "feet"], ["tooth", "teeth"], ["mouse", "mice"], ["goose", "geese"],
  ["sheep", "sheep"], ["box", "boxes"], ["baby", "babies"], ["knife", "knives"], ["leaf", "leaves"], ["wife", "wives"], ["city", "cities"],
  ["bus", "buses"], ["church", "churches"], ["potato", "potatoes"], ["tomato", "tomatoes"], ["glass", "glasses"], ["lady", "ladies"],
  ["half", "halves"], ["wolf", "wolves"], ["fish", "fish"], ["ox", "oxen"], ["person", "people"],
];

export const HOMOPHONES: { sentence: string; options: string[]; answer: number }[] = [
  { sentence: "I can ___ the sea from here.", options: ["see", "sea"], answer: 0 },
  { sentence: "We have ___ books each.", options: ["to", "too", "two"], answer: 2 },
  { sentence: "The children played in ___ garden.", options: ["their", "there", "they're"], answer: 0 },
  { sentence: "Put the bag over ___.", options: ["their", "there", "they're"], answer: 1 },
  { sentence: "I ___ a letter yesterday.", options: ["red", "read"], answer: 1 },
  { sentence: "The ___ was blowing strongly.", options: ["wind", "wined"], answer: 0 },
  { sentence: "She ___ the race.", options: ["one", "won"], answer: 1 },
  { sentence: "Do you ___ the answer?", options: ["no", "know"], answer: 1 },
  { sentence: "Mother bought a ___ of shoes.", options: ["pear", "pair"], answer: 1 },
  { sentence: "We ___ our food quickly.", options: ["ate", "eight"], answer: 0 },
  { sentence: "The baker sells fresh ___.", options: ["bred", "bread"], answer: 1 },
  { sentence: "I am going ___ school.", options: ["to", "too", "two"], answer: 0 },
  { sentence: "Kofi is tall and Yaw is tall ___.", options: ["to", "too", "two"], answer: 1 },
  { sentence: "There are seven days in a ___.", options: ["weak", "week"], answer: 1 },
  { sentence: "The ___ shines in the day.", options: ["son", "sun"], answer: 1 },
  { sentence: "Please ___ for me at the gate.", options: ["weight", "wait"], answer: 1 },
  { sentence: "The boat has a white ___.", options: ["sale", "sail"], answer: 1 },
  { sentence: "I have a pain in my ___.", options: ["heel", "heal"], answer: 0 },
  { sentence: "___ going to the party?", options: ["Who's", "Whose"], answer: 0 },
  { sentence: "___ bag is this?", options: ["Who's", "Whose"], answer: 1 },
  { sentence: "The dog wagged ___ tail.", options: ["its", "it's"], answer: 0 },
  { sentence: "___ raining outside.", options: ["Its", "It's"], answer: 1 },
  { sentence: "The shop has a ___ on shoes this week.", options: ["sale", "sail"], answer: 0 },
  { sentence: "Can you ___ the door?", options: ["close", "clothes"], answer: 0 },
];

export const PROVERBS = [
  "Honesty is the best policy.",
  "Practice makes perfect.",
  "Little drops of water make a mighty ocean.",
  "A friend in need is a friend indeed.",
  "Actions speak louder than words.",
  "Better late than never.",
  "Knowledge is power.",
  "Two heads are better than one.",
  "Where there is a will, there is a way.",
  "Cleanliness is next to godliness.",
  "Time and tide wait for no man.",
  "Slow and steady wins the race.",
  "Do not judge a book by its cover.",
  "Every cloud has a silver lining.",
  "Hard work pays.",
  "One finger cannot pick up a stone.",
  "When the music changes, so does the dance.",
  "The patient dog eats the fattest bone.",
  "A good name is better than riches.",
  "Unity is strength.",
  "Learning has no end.",
  "Respect your elders.",
  "Wisdom is like a baobab tree; no one person can embrace it.",
  "Rain does not fall on one roof alone.",
  "By the time the fool has learned the game, the players have dispersed.",
  "The child who is not embraced by the village will burn it down to feel its warmth.",
  "If you want to go fast, go alone; if you want to go far, go together.",
  "A tree is known by its fruit.",
  "Do unto others as you would have them do unto you.",
  "Prevention is better than cure.",
];

// ── JHS ──────────────────────────────────────────────────────────────────
export const SPELL_JHS: string[][] = [
  "necessary separate government responsibility occasionally conscience independence pronunciation definitely achieve acquire address argument awkward beginning believe calendar category colleague committee competition conscious convenience criticise curiosity deceive desperate develop disappoint embarrass excellent existence familiar foreign"
    .split(" "),
  "accommodation advertisement aggressive amateur apparent benefited bureau cemetery correspondence exaggerate fascinate forty fulfil guarantee harass hindrance humorous hypocrisy immediately incidentally interrupt irrelevant knowledge leisure lightning maintenance millennium miniature mischievous noticeable occurrence parallel parliament"
    .split(" "),
  "perseverance persuade possession privilege profession programme queue receipt recommend reference relevant restaurant rhythm schedule secretary siege sincerely sufficient suspicious temperature thorough twelfth unnecessary vacuum vehicle Wednesday weird yacht questionnaire conscientious entrepreneur psychology acknowledgement bureaucracy"
    .split(" "),
];

export const VOCAB_JHS: [string, string][] = [
  ["diligent", "hard-working and careful"], ["reluctant", "unwilling"], ["abundant", "plentiful"], ["consequence", "a result"],
  ["integrity", "honesty and strong principles"], ["obsolete", "no longer used"], ["meticulous", "very careful and precise"],
  ["advocate", "a supporter who speaks for a cause"], ["candid", "honest and direct"], ["frugal", "careful with money"],
  ["benevolent", "kind and helpful"], ["hostile", "unfriendly"], ["ambiguous", "having more than one meaning"], ["vivid", "bright and clear"],
  ["resilient", "able to recover quickly"], ["eloquent", "speaking well and clearly"], ["negligent", "careless"], ["prudent", "wise and careful"],
  ["tedious", "long and boring"], ["vulnerable", "easily hurt"], ["inevitable", "certain to happen"], ["meagre", "very small in amount"],
  ["lethargic", "tired and slow"], ["optimistic", "hopeful about the future"], ["pessimistic", "expecting the worst"], ["concise", "short and clear"],
  ["hesitate", "pause before acting"], ["deteriorate", "become worse"], ["eradicate", "remove completely"], ["commence", "begin"],
  ["adequate", "enough"], ["anticipate", "expect"], ["compulsory", "required by a rule"], ["prosperous", "successful and wealthy"],
  ["notorious", "famous for something bad"], ["indigenous", "native to a place"], ["scarce", "in short supply"], ["humble", "not proud"],
  ["persevere", "keep trying"], ["vigilant", "watchful"],
];

/** Subject–verb agreement: sentence with ___ and [correct, wrong]. */
export const CONCORD: { sentence: string; options: [string, string] }[] = [
  { sentence: "Each of the boys ___ a book.", options: ["has", "have"] },
  { sentence: "Neither Ama nor her sisters ___ at home.", options: ["are", "is"] },
  { sentence: "The teacher, with her pupils, ___ going to the zoo.", options: ["is", "are"] },
  { sentence: "Everybody ___ to be respected.", options: ["wants", "want"] },
  { sentence: "Mathematics ___ my favourite subject.", options: ["is", "are"] },
  { sentence: "The news ___ good today.", options: ["is", "are"] },
  { sentence: "My trousers ___ torn.", options: ["are", "is"] },
  { sentence: "One of the girls ___ singing.", options: ["is", "are"] },
  { sentence: "Bread and butter ___ my breakfast.", options: ["is", "are"] },
  { sentence: "The cattle ___ grazing in the field.", options: ["are", "is"] },
  { sentence: "Kofi and Yaw ___ brothers.", options: ["are", "is"] },
  { sentence: "Either the pen or the pencils ___ on the table.", options: ["are", "is"] },
  { sentence: "The committee ___ its decision.", options: ["has made", "have made"] },
  { sentence: "There ___ many people at the durbar.", options: ["were", "was"] },
  { sentence: "Somebody ___ knocking at the door.", options: ["is", "are"] },
  { sentence: "The scissors ___ sharp.", options: ["are", "is"] },
  { sentence: "Ten cedis ___ enough for the book.", options: ["is", "are"] },
  { sentence: "The police ___ arrived.", options: ["have", "has"] },
  { sentence: "Not only the students but also the teacher ___ late.", options: ["was", "were"] },
  { sentence: "Every boy and girl ___ a uniform.", options: ["wears", "wear"] },
];

/** Prepositions: sentence with ___, correct, distractors. */
export const PREPOSITIONS: { sentence: string; answer: string; others: string[] }[] = [
  { sentence: "She is good ___ Mathematics.", answer: "at", others: ["in", "on"] },
  { sentence: "He was born ___ 2012.", answer: "in", others: ["on", "at"] },
  { sentence: "We meet ___ Monday.", answer: "on", others: ["in", "at"] },
  { sentence: "The class starts ___ eight o'clock.", answer: "at", others: ["on", "in"] },
  { sentence: "He is afraid ___ dogs.", answer: "of", others: ["from", "with"] },
  { sentence: "She divided the bread ___ the two boys.", answer: "between", others: ["among", "with"] },
  { sentence: "Share the sweets ___ all the pupils.", answer: "among", others: ["between", "to"] },
  { sentence: "I agree ___ you.", answer: "with", others: ["to", "on"] },
  { sentence: "He apologised ___ his mistake.", answer: "for", others: ["of", "at"] },
  { sentence: "He is fond ___ music.", answer: "of", others: ["with", "for"] },
  { sentence: "She congratulated me ___ my success.", answer: "on", others: ["for", "at"] },
  { sentence: "She poured the water ___ the bucket.", answer: "into", others: ["at", "of"] },
  { sentence: "Kofi has lived here ___ 2019.", answer: "since", others: ["for", "from"] },
  { sentence: "We waited ___ two hours.", answer: "for", others: ["since", "by"] },
  { sentence: "The book is different ___ mine.", answer: "from", others: ["than", "with"] },
  { sentence: "He was accused ___ stealing.", answer: "of", others: ["for", "with"] },
  { sentence: "She is interested ___ science.", answer: "in", others: ["on", "at"] },
  { sentence: "I prefer tea ___ coffee.", answer: "to", others: ["than", "over"] },
  { sentence: "The boy is hiding ___ the door.", answer: "behind", others: ["of", "since"] },
  { sentence: "We travelled ___ bus to Kumasi.", answer: "by", others: ["with", "in"] },
];
