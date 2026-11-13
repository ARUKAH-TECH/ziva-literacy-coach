// Twi words and sayings learners know but may not know in English: things,
// body parts, nature, colours, feelings and common sayings.
// Type the Twi (with ɛ/ɔ, e/o, or phone spelling 3/c like "y3den") or the
// English to find it. To add a word: copy a line and change it.
// `also` = other spellings people type; `say` = how to say the English word.

export interface TwiWord {
  twi: string;
  also?: string[];
  english: string;
  emoji: string;
  group: TwiGroup;
  example: string;
  say?: string;
}

export const TWI_GROUPS = [
  { id: "kitchen", title: "Kitchen & cooking", emoji: "🍲" },
  { id: "home", title: "In the home", emoji: "🏠" },
  { id: "wear", title: "Clothes & body care", emoji: "👕" },
  { id: "food", title: "Food & farm produce", emoji: "🌽" },
  { id: "tools", title: "Tools, school & music", emoji: "🛠️" },
  { id: "animals", title: "Animals", emoji: "🐢" },
  { id: "body", title: "Body & health", emoji: "🩺" },
  { id: "nature", title: "Nature, time & weather", emoji: "🌦️" },
  { id: "colours", title: "Colours", emoji: "🎨" },
  { id: "sayings", title: "Feelings & sayings", emoji: "💬" },
  { id: "greetings", title: "Greetings & polite words", emoji: "👋" },
  { id: "days", title: "Days, months & time", emoji: "📅" },
  { id: "numbers", title: "Numbers", emoji: "🔢" },
  { id: "shapes", title: "Shapes", emoji: "🔷" },
  { id: "adinkra", title: "Adinkra symbols & patterns", emoji: "🔣" },
  { id: "family", title: "Family & people", emoji: "👨‍👩‍👧" },
  { id: "jobs", title: "Jobs", emoji: "👩‍🏫" },
  { id: "places", title: "Places", emoji: "🏫" },
  { id: "actions", title: "Actions (doing words)", emoji: "🏃" },
] as const;
export type TwiGroup = (typeof TWI_GROUPS)[number]["id"];

export const TWI_WORDS: TwiWord[] = [
  // Kitchen & cooking
  { twi: "bankuta", english: "wooden spatula", emoji: "🥄", group: "kitchen", example: "Mother turns the banku with a wooden spatula." , say: "WUD-un SPATCH-uh-luh" },
  { twi: "apotoyewa", also: ["apotoyiwa"], english: "earthenware grinding bowl", emoji: "🥣", group: "kitchen", example: "We grind pepper and tomatoes in the earthenware grinding bowl." , say: "UR-thun-wair" },
  { twi: "asanka", english: "earthenware grinding bowl", emoji: "🥣", group: "kitchen", example: "The soup is served in an earthenware grinding bowl." },
  { twi: "tapoli", english: "wooden grinder (pestle for the grinding bowl)", emoji: "🪵", group: "kitchen", example: "She crushes the pepper with a wooden grinder." },
  { twi: "waduro", english: "mortar", emoji: "🪵", group: "kitchen", example: "We pound fufu in a mortar." , say: "MOR-tuh" },
  { twi: "woma", english: "pestle", emoji: "🪵", group: "kitchen", example: "Father lifts the pestle to pound the fufu." , say: "PESS-ul (the t is silent)" },
  { twi: "kukuo", english: "clay cooking pot", emoji: "🏺", group: "kitchen", example: "Grandma cooks the soup in a clay cooking pot." },
  { twi: "dadesɛn", english: "metal cooking pot (saucepan)", emoji: "🍲", group: "kitchen", example: "The rice is boiling in the saucepan." },
  { twi: "ahina", english: "water pot (earthenware)", emoji: "🏺", group: "kitchen", example: "The water in the earthenware pot is cool." },
  { twi: "kuruwa", english: "cup", emoji: "🥤", group: "kitchen", example: "Please give me a cup of water." },
  { twi: "atere", english: "spoon (ladle)", emoji: "🥄", group: "kitchen", example: "Stir the soup with the ladle." },
  { twi: "sɛkan", english: "knife", emoji: "🔪", group: "kitchen", example: "Cut the plantain carefully with the knife." },
  { twi: "kyɛnsee", english: "basin", emoji: "🥣", group: "kitchen", example: "Wash the plates in the basin." , say: "BAY-sun" },
  { twi: "toa", english: "bottle", emoji: "🍾", group: "kitchen", example: "Fill the bottle with clean water." },
  { twi: "ankora", english: "barrel (water storage drum)", emoji: "🛢️", group: "kitchen", example: "We store rain water in a big barrel." , say: "BA-rul" },
  { twi: "bokiti", english: "bucket", emoji: "🪣", group: "kitchen", example: "Carry the bucket to the tap." },
  { twi: "koraa", english: "calabash", emoji: "🥥", group: "kitchen", example: "The palm wine was served in a calabash." , say: "KAL-uh-bash" },
  { twi: "bukyia", english: "hearth (three cooking stones)", emoji: "🔥", group: "kitchen", example: "The pot sits on the hearth over the fire." , say: "HARTH" },
  { twi: "nnyina", english: "firewood", emoji: "🪵", group: "kitchen", example: "We gathered firewood for cooking." },
  { twi: "gyabidie", english: "charcoal", emoji: "⚫", group: "kitchen", example: "Auntie lights the charcoal in the coal pot." },

  // In the home
  { twi: "akonnwa", also: ["akonwa"], english: "chair (stool)", emoji: "🪑", group: "home", example: "Sit on the stool, please." },
  { twi: "mpa", english: "bed", emoji: "🛏️", group: "home", example: "Make your bed every morning." },
  { twi: "kɛtɛ", english: "sleeping mat", emoji: "🧺", group: "home", example: "Grandpa rests on a sleeping mat." },
  { twi: "sumiɛ", also: ["sumie"], english: "pillow", emoji: "🛏️", group: "home", example: "Put your head on the pillow." },
  { twi: "kuntu", english: "blanket", emoji: "🛌", group: "home", example: "The blanket keeps me warm at night." },
  { twi: "praeɛ", also: ["prae", "praee"], english: "broom", emoji: "🧹", group: "home", example: "Sweep the compound with the broom." },
  { twi: "ahwehwɛ", english: "mirror", emoji: "🪞", group: "home", example: "Look in the mirror and comb your hair." },
  { twi: "kanea", english: "lamp (light)", emoji: "🪔", group: "home", example: "Switch on the lamp, it is dark." },
  { twi: "papa", english: "hand fan", emoji: "🪭", group: "home", example: "It is hot, so I wave the hand fan." },
  { twi: "kotoku", english: "sack (bag)", emoji: "💰", group: "home", example: "The farmer carries maize in a sack." },
  { twi: "mpoma", english: "window", emoji: "🪟", group: "home", example: "Open the window to let in fresh air." },
  { twi: "safoa", english: "key", emoji: "🔑", group: "home", example: "Use the key to open the door." },
  { twi: "krado", english: "padlock", emoji: "🔒", group: "home", example: "Lock the gate with the padlock." , say: "PAD-lok" },
  { twi: "panee", also: ["pane"], english: "needle", emoji: "🪡", group: "home", example: "Mother sews the button with a needle." },
  { twi: "ahoma", english: "rope (string)", emoji: "🪢", group: "home", example: "Tie the goat with a rope." },
  { twi: "kyinii", english: "umbrella", emoji: "☂️", group: "home", example: "Take your umbrella, it is raining." , say: "um-BREL-uh" },

  // Clothes & body care
  { twi: "ntoma", english: "cloth", emoji: "👘", group: "wear", example: "She wore a beautiful kente cloth." },
  { twi: "mpaboa", english: "shoes (sandals)", emoji: "👟", group: "wear", example: "Put on your shoes before you go out." },
  { twi: "kyɛ", english: "hat", emoji: "👒", group: "wear", example: "Wear a hat in the hot sun." },
  { twi: "duku", english: "headscarf", emoji: "🧕", group: "wear", example: "Grandma ties a headscarf to church." , say: "HED-skarf" },
  { twi: "ahwenee", english: "beads", emoji: "📿", group: "wear", example: "The girl wore colourful beads." },
  { twi: "kawa", english: "ring", emoji: "💍", group: "wear", example: "The bride has a gold ring." },
  { twi: "afe", english: "comb", emoji: "🪮", group: "wear", example: "Comb your hair neatly." },
  { twi: "sapɔ", also: ["sapo"], english: "bathing sponge", emoji: "🧽", group: "wear", example: "Scrub your body with the sponge." },
  { twi: "samina", english: "soap", emoji: "🧼", group: "wear", example: "Wash your hands with soap and water." },

  // Food & farm produce
  { twi: "bankye", english: "cassava", emoji: "🥔", group: "food", example: "Gari is made from cassava." , say: "kuh-SAH-vuh" },
  { twi: "bayerɛ", also: ["bayere"], english: "yam", emoji: "🍠", group: "food", example: "We ate boiled yam with stew." },
  { twi: "borɔdeɛ", also: ["brodee", "borode"], english: "plantain", emoji: "🍌", group: "food", example: "Fried ripe plantain is called kelewele." },
  { twi: "kwadu", english: "banana", emoji: "🍌", group: "food", example: "A banana is a sweet fruit." },
  { twi: "aburo", english: "maize (corn)", emoji: "🌽", group: "food", example: "Roasted maize is tasty." },
  { twi: "nkatie", english: "groundnuts (peanuts)", emoji: "🥜", group: "food", example: "Groundnut soup is made from groundnuts." },
  { twi: "ntorɔwa", also: ["ntorowa", "ntrowa"], english: "garden eggs (eggplant)", emoji: "🍆", group: "food", example: "Garden eggs make a good stew." },
  { twi: "amako", also: ["mako"], english: "pepper", emoji: "🌶️", group: "food", example: "The pepper made the soup hot." },
  { twi: "nkruma", also: ["nkuruma"], english: "okra", emoji: "🫛", group: "food", example: "Okra soup is slippery and nice." , say: "OH-kruh" },
  { twi: "abrɔbɛ", also: ["aborobe", "abrobe"], english: "pineapple", emoji: "🍍", group: "food", example: "The pineapple is ripe and sweet." },
  { twi: "ankaa", english: "orange", emoji: "🍊", group: "food", example: "I peeled an orange." },
  { twi: "brɔfrɛ", also: ["borofre", "brofre"], english: "pawpaw (papaya)", emoji: "🥭", group: "food", example: "Pawpaw is good for the body." , say: "PAW-paw (puh-PIE-uh)" },
  { twi: "kube", english: "coconut", emoji: "🥥", group: "food", example: "Drink the water inside the coconut." },
  { twi: "ɛmo", also: ["emo"], english: "rice", emoji: "🍚", group: "food", example: "We had rice and stew for lunch." },
  { twi: "abɛ", also: ["abe"], english: "palm nuts", emoji: "🌴", group: "food", example: "Palm nut soup is made from palm nuts." },
  { twi: "kontomire", also: ["nkontomire"], english: "cocoyam leaves", emoji: "🥬", group: "food", example: "Kontomire stew is made with cocoyam leaves." },
  { twi: "mankani", also: ["mmankani"], english: "cocoyam", emoji: "🥔", group: "food", example: "Cocoyam can be boiled or pounded." },
  { twi: "nkyene", english: "salt", emoji: "🧂", group: "food", example: "Add a little salt to the food." },
  { twi: "nkwan", english: "soup", emoji: "🍲", group: "food", example: "The light soup is ready." },
  { twi: "dɔkono", also: ["dokono"], english: "kenkey", emoji: "🍙", group: "food", example: "Kenkey is eaten with fish and pepper." },

  // Tools, school & music
  { twi: "adare", english: "cutlass (machete)", emoji: "🔪", group: "tools", example: "The farmer weeds with a cutlass." , say: "KUT-lus (muh-SHET-ee)" },
  { twi: "akuma", english: "axe", emoji: "🪓", group: "tools", example: "He splits the firewood with an axe." },
  { twi: "kɛntɛn", also: ["kenten", "akɛntɛn"], english: "basket", emoji: "🧺", group: "tools", example: "Put the tomatoes in the basket." },
  { twi: "kahyire", also: ["kahire", "kayire"], english: "head pad", emoji: "🛞", group: "tools", example: "She puts a head pad under the load on her head." },
  { twi: "afiri", english: "trap", emoji: "🪤", group: "tools", example: "The hunter set a trap in the bush." },
  { twi: "twene", english: "drum", emoji: "🥁", group: "tools", example: "The drummer beats the drum at the festival." },
  { twi: "dawuro", also: ["dawuru"], english: "gong (bell)", emoji: "🔔", group: "tools", example: "The town crier beats the gong." },
  { twi: "kyerɛwdua", also: ["kyerewdua"], english: "pen (pencil)", emoji: "✏️", group: "tools", example: "Write your name with a pencil." },
  { twi: "nwoma", english: "book", emoji: "📘", group: "tools", example: "Open your book to page five." },

  // Animals
  { twi: "akyekyedeɛ", also: ["akyekyedee", "akyekyede"], english: "tortoise", emoji: "🐢", group: "animals", example: "The tortoise walks slowly." , say: "TOR-tus" },
  { twi: "apɔnkyerɛne", also: ["aponkyerene"], english: "frog", emoji: "🐸", group: "animals", example: "The frog jumped into the pond." },
  { twi: "kɔtɔkɔ", also: ["kotoko"], english: "porcupine", emoji: "🦔", group: "animals", example: "The porcupine has sharp quills." , say: "POR-kew-pine" },
  { twi: "kɔtɔ", also: ["koto"], english: "crab", emoji: "🦀", group: "animals", example: "A crab walks sideways." },
  { twi: "abirekyie", also: ["aponkye"], english: "goat", emoji: "🐐", group: "animals", example: "The goat is eating grass." },
  { twi: "odwan", english: "sheep", emoji: "🐑", group: "animals", example: "The sheep has thick wool." },
  { twi: "akokɔ", also: ["akoko"], english: "chicken (fowl)", emoji: "🐔", group: "animals", example: "The chicken laid an egg." },
  { twi: "prako", english: "pig", emoji: "🐖", group: "animals", example: "The pig rolls in the mud." },
  { twi: "anomaa", english: "bird", emoji: "🐦", group: "animals", example: "A bird is singing in the tree." },
  { twi: "akura", also: ["akuraa"], english: "mouse", emoji: "🐭", group: "animals", example: "The cat chased the mouse." },
  { twi: "ɔkraman", also: ["okraman", "kraman"], english: "dog", emoji: "🐕", group: "animals", example: "The dog guards the house." },
  { twi: "agyinamoa", english: "cat", emoji: "🐈", group: "animals", example: "The cat is sleeping on the mat." },
  { twi: "ɔwɔ", also: ["owo"], english: "snake", emoji: "🐍", group: "animals", example: "Stay away from the snake!" },
  { twi: "nwansena", english: "housefly", emoji: "🪰", group: "animals", example: "Cover the food to keep the houseflies away." },
  { twi: "ntontom", also: ["ntɔntɔm"], english: "mosquito", emoji: "🦟", group: "animals", example: "Sleep under a net so mosquitoes cannot bite you." , say: "muh-SKEE-toh" },
  { twi: "dɛnkyɛm", also: ["denkyem"], english: "crocodile", emoji: "🐊", group: "animals", example: "The crocodile lives in the river." , say: "KROK-uh-dile" },
  { twi: "ɔkɔdeɛ", also: ["okodee", "okode"], english: "eagle", emoji: "🦅", group: "animals", example: "The eagle flies high in the sky." },
  { twi: "ananse", english: "spider", emoji: "🕷️", group: "animals", example: "Kwaku Ananse is a clever spider in our stories." },
  { twi: "osebɔ", also: ["osebo"], english: "leopard", emoji: "🐆", group: "animals", example: "The leopard has spots." , say: "LEP-urd" },
  { twi: "ɔsono", also: ["osono", "sono"], english: "elephant", emoji: "🐘", group: "animals", example: "The elephant has a long trunk." },
  // Body & health
  { twi: "tiri", also: ["ti"], english: "head", emoji: "🙂", group: "body", example: "Touch your head with your hand." },
  { twi: "ani", english: "eye", emoji: "👁️", group: "body", example: "Close your eyes and pray." },
  { twi: "aso", english: "ear", emoji: "👂", group: "body", example: "Listen with your ears." },
  { twi: "hwene", english: "nose", emoji: "👃", group: "body", example: "We smell with our nose." },
  { twi: "ano", english: "mouth", emoji: "👄", group: "body", example: "Close your mouth when you chew." },
  { twi: "ɛse", also: ["ese", "se"], english: "tooth (teeth)", emoji: "🦷", group: "body", example: "Brush your teeth every morning." },
  { twi: "tɛkrɛma", also: ["tekrema"], english: "tongue", emoji: "👅", group: "body", example: "We taste food with our tongue." },
  { twi: "kɔn", also: ["kon"], english: "neck", emoji: "🧣", group: "body", example: "She wears beads around her neck." },
  { twi: "abasa", english: "arm", emoji: "💪", group: "body", example: "Raise your arm if you know the answer." },
  { twi: "nsa", english: "hand", emoji: "✋", group: "body", example: "Wash your hands before you eat." },
  { twi: "nsateaa", also: ["nsatea"], english: "finger", emoji: "☝️", group: "body", example: "Count on your fingers." },
  { twi: "kotodwe", also: ["kotodwi"], english: "knee", emoji: "🦵", group: "body", example: "He fell and hurt his knee." },
  { twi: "nan", english: "leg (foot)", emoji: "🦶", group: "body", example: "Stand on one leg." },
  { twi: "akoma", english: "heart", emoji: "❤️", group: "body", example: "My heart beats fast when I run." },
  { twi: "yafunu", also: ["yafuno"], english: "stomach (belly)", emoji: "🫃", group: "body", example: "My stomach is full.", say: "STUM-uk" },
  { twi: "mogya", english: "blood", emoji: "🩸", group: "body", example: "The nurse took some blood for a test." },
  { twi: "dompe", english: "bone", emoji: "🦴", group: "body", example: "The dog is chewing a bone." },
  { twi: "atiridii", also: ["atiridi"], english: "malaria (fever)", emoji: "🤒", group: "body", example: "Sleep under a mosquito net to prevent malaria.", say: "muh-LAIR-ee-uh" },
  { twi: "ɛwa", also: ["ewa"], english: "cough", emoji: "😷", group: "body", example: "Cover your mouth when you cough.", say: "KOFF" },
  { twi: "ti pae", also: ["tipae", "me ti pae"], english: "headache", emoji: "🤕", group: "body", example: "I have a headache, so I will rest." },
  { twi: "aduro", english: "medicine", emoji: "💊", group: "body", example: "Take your medicine after food." },
  { twi: "ayaresabea", english: "hospital", emoji: "🏥", group: "body", example: "The sick man was taken to the hospital." },

  // Nature, time & weather
  { twi: "osuo", also: ["osu"], english: "rain", emoji: "🌧️", group: "nature", example: "The rain is falling heavily." },
  { twi: "owia", english: "sun", emoji: "☀️", group: "nature", example: "The sun rises in the east." },
  { twi: "ɔsram", also: ["osram"], english: "moon", emoji: "🌙", group: "nature", example: "The moon is bright tonight." },
  { twi: "nsoromma", english: "stars", emoji: "⭐", group: "nature", example: "Count the stars in the sky." },
  { twi: "mframa", english: "wind", emoji: "🌬️", group: "nature", example: "The wind is blowing the leaves." },
  { twi: "anyinam", english: "lightning", emoji: "⚡", group: "nature", example: "Lightning flashed across the sky.", say: "LITE-ning" },
  { twi: "aprannaa", also: ["aprana", "apranaa"], english: "thunder", emoji: "🌩️", group: "nature", example: "The thunder was very loud." },
  { twi: "ɛpo", also: ["epo"], english: "sea", emoji: "🌊", group: "nature", example: "Fishermen go to sea in canoes." },
  { twi: "asubɔnten", also: ["asubonten"], english: "river", emoji: "🏞️", group: "nature", example: "The river flows into the sea." },
  { twi: "bepɔ", also: ["bepo"], english: "mountain (hill)", emoji: "⛰️", group: "nature", example: "We climbed to the top of the mountain." },
  { twi: "kwaeɛ", also: ["kwae", "kwaee"], english: "forest (bush)", emoji: "🌳", group: "nature", example: "Many animals live in the forest." },
  { twi: "dua", english: "tree (stick)", emoji: "🌳", group: "nature", example: "Birds build nests in the tree." },
  { twi: "nhwiren", also: ["nhwirem"], english: "flower", emoji: "🌺", group: "nature", example: "The flower smells sweet." },
  { twi: "anwea", also: ["ahwea"], english: "sand", emoji: "🏖️", group: "nature", example: "Children play in the sand." },
  { twi: "ɔboɔ", also: ["obo", "oboo", "ɔbo"], english: "stone", emoji: "🪨", group: "nature", example: "Do not throw stones." },
  { twi: "nsuo", also: ["nsu"], english: "water", emoji: "💧", group: "nature", example: "Drink clean water every day." },
  { twi: "ewiem", english: "sky", emoji: "🌤️", group: "nature", example: "The sky is blue today." },
  { twi: "anɔpa", also: ["anopa"], english: "morning", emoji: "🌅", group: "nature", example: "Good morning, teacher!" },
  { twi: "anwummerɛ", also: ["anwummere", "anwumere"], english: "evening", emoji: "🌇", group: "nature", example: "We play football in the evening." },
  { twi: "anadwo", english: "night", emoji: "🌃", group: "nature", example: "We sleep at night." },

  // Colours
  { twi: "kɔkɔɔ", also: ["kokoo", "koko"], english: "red", emoji: "🟥", group: "colours", example: "The tomato is red." },
  { twi: "tuntum", english: "black", emoji: "⬛", group: "colours", example: "The board is black." },
  { twi: "fitaa", also: ["fita"], english: "white", emoji: "⬜", group: "colours", example: "Milk is white." },
  { twi: "ahabammono", also: ["ahaban mono"], english: "green", emoji: "🟩", group: "colours", example: "The leaves are green." },
  { twi: "akokɔsradeɛ", also: ["akokosrade", "akokɔsrade"], english: "yellow", emoji: "🟨", group: "colours", example: "The ripe banana is yellow." },
  { twi: "bruu", also: ["bru"], english: "blue", emoji: "🟦", group: "colours", example: "The sky is blue." },

  // Feelings & sayings
  { twi: "ne tirim yɛ den", also: ["ne tiri yɛ den", "ne trim yɛ den", "ne tirim ye den"], english: "stubborn (headstrong)", emoji: "😤", group: "sayings", example: "The stubborn boy would not listen to advice.", say: "STUB-urn" },
  { twi: "ne bo afuw", also: ["ne bo afu", "ne bo afuo"], english: "angry", emoji: "😠", group: "sayings", example: "Father was angry because I came home late." },
  { twi: "n'ani agye", also: ["ani agye", "nani agye"], english: "happy (glad)", emoji: "😀", group: "sayings", example: "She is happy because she passed her exam." },
  { twi: "ne werɛ ahow", also: ["ne were ahow", "ne werɛ aho"], english: "sad (sorrowful)", emoji: "😢", group: "sayings", example: "He was sad when his friend travelled." },
  { twi: "ɔkɔm de me", also: ["okom de me", "kɔm de me"], english: "I am hungry", emoji: "🍽️", group: "sayings", example: "I am hungry; is the food ready?" },
  { twi: "sukɔm de me", also: ["sukom de me"], english: "I am thirsty", emoji: "🥤", group: "sayings", example: "I am thirsty; please give me water.", say: "THUR-stee" },
  { twi: "mabrɛ", also: ["mabre", "ɔbrɛ"], english: "I am tired", emoji: "😩", group: "sayings", example: "I am tired after the long walk." },
  { twi: "ne ho yɛ hyew", also: ["ne ho ye hyew"], english: "he (she) has a fever", emoji: "🤒", group: "sayings", example: "The baby has a fever, so we went to the clinic.", say: "FEE-vuh" },
  { twi: "ahantan", also: ["ɔyɛ ahantan"], english: "proud (arrogant)", emoji: "😏", group: "sayings", example: "Do not be arrogant; be humble.", say: "AIR-uh-gunt" },
  { twi: "ahobrɛaseɛ", also: ["ahobreasee"], english: "humble (humility)", emoji: "🙇", group: "sayings", example: "A humble person respects everyone.", say: "HUM-bul" },
  { twi: "kwadwofoɔ", also: ["kwadwofo", "kwadwofoo", "ɔyɛ kwadwofoɔ"], english: "lazy (lazy person)", emoji: "😴", group: "sayings", example: "A lazy farmer will have no harvest." },
  { twi: "nyansafoɔ", also: ["nyansafo", "ɔyɛ nyansafoɔ"], english: "wise (wise person)", emoji: "🦉", group: "sayings", example: "A wise child listens to advice." },
  { twi: "akokoɔduro", also: ["akokoduro"], english: "brave (courage)", emoji: "🦁", group: "sayings", example: "David was brave when he faced Goliath.", say: "BRAYV" },
  { twi: "ɔsuro", also: ["osuro", "osuro"], english: "afraid (fearful)", emoji: "😨", group: "sayings", example: "The little girl is afraid of the dark.", say: "uh-FRAYD" },
  { twi: "ɔfɛre", also: ["ofere", "ɔfɛre ade"], english: "shy", emoji: "😳", group: "sayings", example: "The new pupil is shy, so be kind to her." },
  { twi: "sika kɔkɔɔ", also: ["sika kokoo"], english: "gold", emoji: "🥇", group: "colours", example: "The winner got a gold medal." },
  { twi: "dwetɛ", also: ["dwete"], english: "silver", emoji: "🥈", group: "colours", example: "Grandma has a silver bangle." },
  { twi: "ahabammono ne bruu", also: ["ahabammono ne bru"], english: "green and blue (teal)", emoji: "🦚", group: "colours", example: "The peacock has green and blue feathers.", say: "TEEL" },
  { twi: "maakye", also: ["mema wo akye", "me ma wo akye"], english: "good morning", emoji: "🌅", group: "greetings", example: "Good morning, Madam!" },
  { twi: "maaha", also: ["mema wo aha"], english: "good afternoon", emoji: "🌞", group: "greetings", example: "Good afternoon, sir." },
  { twi: "maadwo", also: ["mema wo adwo"], english: "good evening", emoji: "🌆", group: "greetings", example: "Good evening, everybody." },
  { twi: "medaase", also: ["meda wo ase", "meda w'ase"], english: "thank you", emoji: "🙏", group: "greetings", example: "Thank you for the gift." },
  { twi: "mepa wo kyɛw", also: ["mepa wo kyew", "mepawokyew", "mesrɛ wo"], english: "please", emoji: "🙏", group: "greetings", example: "Please, may I go out?" },
  { twi: "akwaaba", also: ["akwaba"], english: "welcome", emoji: "🤗", group: "greetings", example: "Welcome to our school!" },
  { twi: "ɛte sɛn?", also: ["ete sen", "wo ho te sɛn", "wo ho te sen"], english: "how are you?", emoji: "🙂", group: "greetings", example: "Good morning! How are you today?" },
  { twi: "me ho yɛ", also: ["me ho ye", "ɛyɛ"], english: "I am fine", emoji: "😊", group: "greetings", example: "I am fine, thank you." },
  { twi: "kafra", also: ["kafa"], english: "sorry (excuse me)", emoji: "🙇", group: "greetings", example: "Sorry, I stepped on your foot." },
  { twi: "nante yie", also: ["nantew yie", "nante yiye"], english: "goodbye (walk well)", emoji: "👋", group: "greetings", example: "Goodbye, see you tomorrow!" },
  { twi: "da yie", also: ["da yiye"], english: "good night (sleep well)", emoji: "🌙", group: "greetings", example: "Good night, sleep well." },
  { twi: "me din de", also: ["me din de"], english: "my name is", emoji: "📛", group: "greetings", example: "My name is Ama." },
  { twi: "yoo", also: ["yo"], english: "okay (alright)", emoji: "👌", group: "greetings", example: "Okay, I will do it now." },
  { twi: "Kwasiada", also: ["kwasida"], english: "Sunday", emoji: "📅", group: "days", example: "We go to church on Sunday." },
  { twi: "Dwoada", also: ["dwowda", "dwowda"], english: "Monday", emoji: "📅", group: "days", example: "School starts on Monday." },
  { twi: "Benada", also: ["benada"], english: "Tuesday", emoji: "📅", group: "days", example: "We have sports on Tuesday." },
  { twi: "Wukuada", also: ["wukuda"], english: "Wednesday", emoji: "📅", group: "days", example: "Wednesday is in the middle of the week." },
  { twi: "Yawoada", also: ["yawda", "yaoda"], english: "Thursday", emoji: "📅", group: "days", example: "Thursday comes after Wednesday." },
  { twi: "Efiada", also: ["fiada"], english: "Friday", emoji: "📅", group: "days", example: "On Friday we clean the classroom." },
  { twi: "Memeneda", also: ["memeneda", "mememeneda"], english: "Saturday", emoji: "📅", group: "days", example: "There is no school on Saturday." },
  { twi: "Ɔpɛpɔn", also: ["opepon"], english: "January", emoji: "🗓️", group: "days", example: "My birthday is in January." },
  { twi: "Ɔgyefuo", also: ["ogyefuo", "ogyefo"], english: "February", emoji: "🗓️", group: "days", example: "My birthday is in February." },
  { twi: "Ɔbɛnem", also: ["obenem"], english: "March", emoji: "🗓️", group: "days", example: "My birthday is in March." },
  { twi: "Oforisuo", also: ["oforisu"], english: "April", emoji: "🗓️", group: "days", example: "My birthday is in April." },
  { twi: "Kotonimma", also: ["kotonima"], english: "May", emoji: "🗓️", group: "days", example: "My birthday is in May." },
  { twi: "Ayɛwohomumu", also: ["ayewohomumu"], english: "June", emoji: "🗓️", group: "days", example: "My birthday is in June." },
  { twi: "Kitawonsa", also: ["kitawonsa"], english: "July", emoji: "🗓️", group: "days", example: "My birthday is in July." },
  { twi: "Ɔsanaa", also: ["osanaa", "osana"], english: "August", emoji: "🗓️", group: "days", example: "My birthday is in August." },
  { twi: "Ɛbɔ", also: ["ebo"], english: "September", emoji: "🗓️", group: "days", example: "My birthday is in September." },
  { twi: "Ahinime", also: ["ahinime"], english: "October", emoji: "🗓️", group: "days", example: "My birthday is in October." },
  { twi: "Obubuo", also: ["obubu"], english: "November", emoji: "🗓️", group: "days", example: "My birthday is in November." },
  { twi: "Ɔpɛnimma", also: ["openimma", "openima"], english: "December", emoji: "🗓️", group: "days", example: "My birthday is in December." },
  { twi: "ɛnnɛ", also: ["nne", "enne", "ɛnnɛ"], english: "today", emoji: "📆", group: "days", example: "Today is a happy day." },
  { twi: "ɔkyena", also: ["okyena"], english: "tomorrow", emoji: "➡️", group: "days", example: "We will play football tomorrow." },
  { twi: "ɛnnora", also: ["nnora", "ennora"], english: "yesterday", emoji: "⬅️", group: "days", example: "Yesterday it rained." },
  { twi: "dapɛn", also: ["dapen"], english: "week", emoji: "🗓️", group: "days", example: "There are seven days in a week." },
  { twi: "bosome", also: ["bosom"], english: "month", emoji: "🌙", group: "days", example: "There are twelve months in a year." },
  { twi: "afe", also: ["afi"], english: "year", emoji: "🎆", group: "days", example: "Happy new year!" },
  { twi: "dɔnhwere", also: ["donhwere", "dɔnhwerew"], english: "hour", emoji: "⏰", group: "days", example: "Wait for one hour." },
  { twi: "baako", also: ["biako"], english: "one (1)", emoji: "🔢", group: "numbers", example: "I have one nose and two eyes." },
  { twi: "mmienu", also: ["abien"], english: "two (2)", emoji: "🔢", group: "numbers", example: "Can you count up to two?" },
  { twi: "mmiɛnsa", also: ["abiesa", "mmiensa"], english: "three (3)", emoji: "🔢", group: "numbers", example: "Can you count up to three?" },
  { twi: "ɛnan", also: ["anan", "enan"], english: "four (4)", emoji: "🔢", group: "numbers", example: "Can you count up to four?" },
  { twi: "enum", also: ["anum"], english: "five (5)", emoji: "🔢", group: "numbers", example: "Can you count up to five?" },
  { twi: "nsia", also: ["asia"], english: "six (6)", emoji: "🔢", group: "numbers", example: "Can you count up to six?" },
  { twi: "nson", also: ["ason"], english: "seven (7)", emoji: "🔢", group: "numbers", example: "Can you count up to seven?" },
  { twi: "nwɔtwe", also: ["awɔtwe", "nwotwe", "awotwe"], english: "eight (8)", emoji: "🔢", group: "numbers", example: "Can you count up to eight?" },
  { twi: "nkron", also: ["akron"], english: "nine (9)", emoji: "🔢", group: "numbers", example: "Can you count up to nine?" },
  { twi: "du", english: "ten (10)", emoji: "🔢", group: "numbers", example: "Can you count up to ten?" },
  { twi: "aduonu", english: "twenty (20)", emoji: "🔢", group: "numbers", example: "Can you count up to twenty?" },
  { twi: "ɔha", also: ["oha"], english: "one hundred (100)", emoji: "🔢", group: "numbers", example: "Can you count up to one hundred?" },
  { twi: "apem", english: "one thousand (1000)", emoji: "🔢", group: "numbers", example: "Can you count up to one thousand?" },
  { twi: "kurukuruwa", also: ["kurukuru"], english: "circle (round)", emoji: "⚪", group: "shapes", example: "The sun looks like a circle.", say: "SUR-kul" },
  { twi: "ahinasa", also: ["ahinasa"], english: "triangle (three corners)", emoji: "🔺", group: "shapes", example: "A triangle has three sides.", say: "TRY-ang-gul" },
  { twi: "ahinanan", also: ["ahinanan"], english: "square (four corners)", emoji: "🟥", group: "shapes", example: "A square has four equal sides.", say: "SKWAIR" },
  { twi: "ahinanan tenten", also: ["ahinanan tenten"], english: "rectangle (long square)", emoji: "▭", group: "shapes", example: "The door is a rectangle.", say: "REK-tang-gul" },
  { twi: "nsoromma nsɛsoɔ", also: ["nsoromma"], english: "star shape", emoji: "⭐", group: "shapes", example: "She drew a star shape." },
  { twi: "akoma nsɛsoɔ", english: "heart shape", emoji: "❤️", group: "shapes", example: "The card has a heart shape on it." },
  { twi: "tenten", english: "long", emoji: "📏", group: "shapes", example: "The snake is long." },
  { twi: "tiawa", also: ["tiaa"], english: "short (small)", emoji: "🤏", group: "shapes", example: "The pencil is short." },
  { twi: "kɛseɛ", also: ["kese", "kɛse"], english: "big", emoji: "🐘", group: "shapes", example: "An elephant is big." },
  { twi: "ketewa", also: ["kakra"], english: "small", emoji: "🐜", group: "shapes", example: "An ant is small." },
  { twi: "Gye Nyame", english: "except God (God is supreme)", emoji: "🔣", group: "adinkra", example: "Gye Nyame reminds us that God is above all." },
  { twi: "Sankofa", english: "go back and get it (learn from the past)", emoji: "🔣", group: "adinkra", example: "Sankofa teaches us to learn from the past." },
  { twi: "Dwennimmen", english: "ram's horns (humility and strength)", emoji: "🔣", group: "adinkra", example: "Dwennimmen means being strong and humble." },
  { twi: "Adinkrahene", english: "chief of the Adinkra (greatness and leadership)", emoji: "🔣", group: "adinkra", example: "Adinkrahene stands for greatness.", say: "uh-DING-kruh" },
  { twi: "Nyame Dua", english: "tree of God (God's presence)", emoji: "🔣", group: "adinkra", example: "Nyame Dua shows that God is with us." },
  { twi: "Akoma", english: "heart (patience and love)", emoji: "🔣", group: "adinkra", example: "Akoma reminds us to be patient." },
  { twi: "Duafe", english: "wooden comb (beauty and good care)", emoji: "🔣", group: "adinkra", example: "Duafe stands for beauty and cleanliness." },
  { twi: "Funtunfunefu Denkyemfunefu", english: "joined crocodiles (unity)", emoji: "🔣", group: "adinkra", example: "The joined crocodiles teach us unity." },
  { twi: "Mframadan", english: "wind-resistant house (being ready and strong)", emoji: "🔣", group: "adinkra", example: "Mframadan means standing firm in hard times." },
  { twi: "Nkyinkyim", english: "twisting (taking initiative, being flexible)", emoji: "🔣", group: "adinkra", example: "Nkyinkyim shows that life's journey twists and turns." },
  { twi: "Ese ne Tekrema", english: "teeth and tongue (friendship and working together)", emoji: "🔣", group: "adinkra", example: "Teeth and tongue work together like good friends." },
  { twi: "Aya", english: "fern (endurance)", emoji: "🔣", group: "adinkra", example: "Aya stands for endurance and never giving up." },
  { twi: "Hye Won Hye", english: "that which does not burn (imperishable)", emoji: "🔣", group: "adinkra", example: "Hye Won Hye stands for being unbreakable." },
  { twi: "Mpatapo", english: "knot of peace (reconciliation)", emoji: "🔣", group: "adinkra", example: "Mpatapo reminds us to make peace after a quarrel." },
  { twi: "Osram ne Nsoromma", english: "moon and star (love and faithfulness)", emoji: "🔣", group: "adinkra", example: "The moon and star show faithful love." },
  { twi: "Fawohodie", english: "freedom (independence)", emoji: "🔣", group: "adinkra", example: "Fawohodie stands for freedom." },
  { twi: "Kente", english: "kente cloth (woven patterned cloth)", emoji: "🧵", group: "adinkra", example: "Kente is woven in colourful patterns." },
  { twi: "abusua", english: "family", emoji: "👨‍👩‍👧", group: "family", example: "I love my family." },
  { twi: "maame", also: ["ɛna", "ena"], english: "mother", emoji: "👩", group: "family", example: "My mother cooks delicious food." },
  { twi: "agya", also: ["papa"], english: "father", emoji: "👨", group: "family", example: "My father is a farmer." },
  { twi: "nana", english: "grandparent", emoji: "👵", group: "family", example: "Nana tells us stories at night." },
  { twi: "nua", also: ["nuabarima", "nuabaa"], english: "brother or sister (sibling)", emoji: "🧒", group: "family", example: "My sibling and I share a room.", say: "SIB-ling" },
  { twi: "wɔfa", also: ["wofa"], english: "uncle (mother's brother)", emoji: "🧔", group: "family", example: "My uncle visited us." },
  { twi: "sewaa", also: ["sewa"], english: "aunt (father's sister)", emoji: "👩", group: "family", example: "My aunt bought me a dress." },
  { twi: "ɔba", also: ["oba"], english: "child", emoji: "👶", group: "family", example: "Every child should go to school." },
  { twi: "ntaafoɔ", also: ["ntaafo", "ntaafoo"], english: "twins", emoji: "👯", group: "family", example: "The twins look alike." },
  { twi: "kunu", english: "husband", emoji: "🤵", group: "family", example: "Her husband is a teacher." },
  { twi: "yere", english: "wife", emoji: "👰", group: "family", example: "His wife is a nurse." },
  { twi: "adamfo", also: ["adamfo"], english: "friend", emoji: "🤝", group: "family", example: "A good friend helps you." },
  { twi: "ɔbarima", also: ["obarima"], english: "man", emoji: "👨", group: "family", example: "The man is tall." },
  { twi: "ɔbaa", also: ["obaa"], english: "woman", emoji: "👩", group: "family", example: "The woman is selling oranges." },
  { twi: "abofra", also: ["abofra"], english: "child (young person)", emoji: "🧒", group: "family", example: "The young child is playing." },
  { twi: "akwakora", also: ["akwakora"], english: "old man", emoji: "👴", group: "family", example: "The old man walks with a stick." },
  { twi: "aberewa", also: ["aberewa"], english: "old woman", emoji: "👵", group: "family", example: "The old woman sells kenkey." },
  { twi: "okuani", also: ["okuafoɔ", "okuafo"], english: "farmer", emoji: "👨‍🌾", group: "jobs", example: "The farmer grows maize." },
  { twi: "ɔkyerɛkyerɛfoɔ", also: ["kyerɛkyerɛfoɔ", "okyerekyerefo", "kyerekyerefo"], english: "teacher", emoji: "👩‍🏫", group: "jobs", example: "Our teacher is kind." },
  { twi: "dɔkota", also: ["dokota"], english: "doctor", emoji: "🧑‍⚕️", group: "jobs", example: "The doctor treats sick people." },
  { twi: "nɛɛse", also: ["nese", "neese"], english: "nurse", emoji: "👩‍⚕️", group: "jobs", example: "The nurse gave me an injection." },
  { twi: "ɔdwadini", also: ["odwadini"], english: "trader (seller)", emoji: "🧺", group: "jobs", example: "The trader sells cloth at the market." },
  { twi: "ɔpofoɔ", also: ["opofo", "opofoo"], english: "fisherman", emoji: "🎣", group: "jobs", example: "The fisherman catches fish at sea." },
  { twi: "ɔbɔmmɔfoɔ", also: ["obommofo"], english: "hunter", emoji: "🏹", group: "jobs", example: "The hunter went into the forest." },
  { twi: "duadwumfoɔ", also: ["duadwumfo"], english: "carpenter", emoji: "🪚", group: "jobs", example: "The carpenter made a table.", say: "KAR-pen-tuh" },
  { twi: "ɔhene", also: ["ohene"], english: "chief (king)", emoji: "👑", group: "jobs", example: "The chief sits on a stool." },
  { twi: "ɔhemmaa", also: ["ohemmaa"], english: "queen mother", emoji: "👸", group: "jobs", example: "The queen mother advises the chief." },
  { twi: "ɔsɔfoɔ", also: ["osofo", "osofoo"], english: "pastor (priest)", emoji: "⛪", group: "jobs", example: "The pastor preached on Sunday." },
  { twi: "adwumayɛfoɔ", also: ["adwumayefo"], english: "worker", emoji: "👷", group: "jobs", example: "The workers built a new school." },
  { twi: "sukuu", also: ["sukuu"], english: "school", emoji: "🏫", group: "places", example: "I walk to school every day." },
  { twi: "asɔredan", also: ["asoredan", "asɔre"], english: "church (building)", emoji: "⛪", group: "places", example: "We pray in the church." },
  { twi: "gua", also: ["guam"], english: "market", emoji: "🛒", group: "places", example: "Mother buys tomatoes at the market." },
  { twi: "afuom", also: ["afuo", "afum"], english: "farm", emoji: "🌾", group: "places", example: "We planted cassava on the farm." },
  { twi: "fie", also: ["fiee"], english: "house (home)", emoji: "🏠", group: "places", example: "Our house is near the school." },
  { twi: "kurom", also: ["kuro"], english: "town", emoji: "🏘️", group: "places", example: "The town has a big market." },
  { twi: "akuraa", english: "village", emoji: "🛖", group: "places", example: "Grandpa lives in a village." },
  { twi: "kwan", english: "road (path)", emoji: "🛣️", group: "places", example: "Look left and right before crossing the road." },
  { twi: "abɔnten", also: ["abonten"], english: "street (outside)", emoji: "🚸", group: "places", example: "The children are playing outside." },
  { twi: "ahemfie", also: ["ahenfie"], english: "palace", emoji: "🏰", group: "places", example: "The chief lives in the palace." },
  { twi: "adwumam", also: ["adwuma"], english: "workplace (office)", emoji: "🏢", group: "places", example: "Father has gone to his workplace." },
  { twi: "didi", english: "eat", emoji: "🍽️", group: "actions", example: "Wash your hands before you eat." },
  { twi: "nom", english: "drink", emoji: "🥤", group: "actions", example: "Drink water when you are thirsty." },
  { twi: "da", english: "sleep", emoji: "😴", group: "actions", example: "Children should sleep early." },
  { twi: "kenkan", english: "read", emoji: "📖", group: "actions", example: "I like to read storybooks." },
  { twi: "kyerɛw", also: ["kyerew"], english: "write", emoji: "✍️", group: "actions", example: "Write your name neatly." },
  { twi: "tu mmirika", also: ["tu mmirka"], english: "run", emoji: "🏃", group: "actions", example: "Run to the finish line!" },
  { twi: "sa", english: "dance", emoji: "💃", group: "actions", example: "We dance at the festival." },
  { twi: "to dwom", english: "sing", emoji: "🎤", group: "actions", example: "Let us sing a song." },
  { twi: "di agorɔ", also: ["di agoro"], english: "play", emoji: "⚽", group: "actions", example: "We play football after school." },
  { twi: "sere", english: "laugh", emoji: "😂", group: "actions", example: "The joke made us laugh." },
  { twi: "su", english: "cry", emoji: "😭", group: "actions", example: "The baby began to cry." },
  { twi: "bɔ mpaeɛ", also: ["bo mpaee", "bɔ mpae"], english: "pray", emoji: "🙏", group: "actions", example: "We pray before we eat." },
  { twi: "hohoro", english: "wash", emoji: "🧼", group: "actions", example: "Wash the plates after eating." },
  { twi: "pra", english: "sweep", emoji: "🧹", group: "actions", example: "Sweep the classroom every morning." },
  { twi: "noa", english: "cook", emoji: "🍳", group: "actions", example: "Father will cook today." },
  { twi: "tena ase", english: "sit down", emoji: "🪑", group: "actions", example: "Please sit down quietly." },
  { twi: "sɔre", also: ["sore"], english: "stand up", emoji: "🧍", group: "actions", example: "Stand up when the teacher enters." },
  { twi: "kasa", english: "speak (talk)", emoji: "🗣️", group: "actions", example: "Speak clearly in class." },
  { twi: "tie", english: "listen", emoji: "👂", group: "actions", example: "Listen to the teacher." },
  { twi: "hwɛ", also: ["hwe"], english: "look (watch)", emoji: "👀", group: "actions", example: "Look at the board." },
];

/** Lower case, ɛ/3 → e, ɔ → o, no accents, spaces or dashes: so any spelling matches. */
export function plain(text: string) {
  return text
    .toLowerCase()
    .replace(/[ɛ3]/g, "e")
    .replace(/[ɔ]/g, "o")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]/g, "");
}

/** Best matches first: exact Twi word, then Twi words starting with it, then English names. */
// Twi has no "c": on phones people type c for ɔ ("akokc").
const plainTwi = (text: string) => plain(text.toLowerCase().replace(/c/g, "o"));

/** How many letters must change to turn a into b (for small spelling mistakes). */
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const keep = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = keep;
    }
  }
  return row[b.length];
}

export function findTwi(query: string): TwiWord[] {
  const q = plain(query);
  const qt = plainTwi(query);
  if (!q) return [];
  const score = (w: TwiWord) => {
    const twiForms = [w.twi, ...(w.also ?? [])].map(plain);
    if (twiForms.includes(qt) || twiForms.includes(q)) return 0;
    if (twiForms.some((t) => t.startsWith(qt))) return 1;
    if (plain(w.english) === q) return 2;
    if (w.english.toLowerCase().split(/[^a-z]+/).some((part) => part && plain(part).startsWith(q))) return 3;
    if (qt.length >= 3 && twiForms.some((t) => t.includes(qt))) return 4;
    // Small spelling mistakes ("ne trim y3den"): 1 letter wrong in 5+, 2 in 9+.
    if (qt.length >= 5 && twiForms.some((t) => distance(qt, t) <= (qt.length >= 9 ? 2 : 1))) return 5;
    return 9;
  };
  return TWI_WORDS.map((w) => ({ w, s: score(w) }))
    .filter((x) => x.s < 9)
    .sort((a, b) => a.s - b.s)
    .map((x) => x.w);
}
