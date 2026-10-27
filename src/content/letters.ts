// Alphabet with Ghana-friendly picture words. `sound` is how the phonics
// sound is read aloud ("a, as in ant").
export const LETTERS = [
  { l: "A", word: "ant", emoji: "🐜", sound: "a" },
  { l: "B", word: "ball", emoji: "⚽", sound: "buh" },
  { l: "C", word: "cat", emoji: "🐱", sound: "kuh" },
  { l: "D", word: "drum", emoji: "🥁", sound: "duh" },
  { l: "E", word: "egg", emoji: "🥚", sound: "eh" },
  { l: "F", word: "fish", emoji: "🐟", sound: "fff" },
  { l: "G", word: "goat", emoji: "🐐", sound: "guh" },
  { l: "H", word: "hen", emoji: "🐔", sound: "huh" },
  { l: "I", word: "insect", emoji: "🐞", sound: "ih" },
  { l: "J", word: "jollof", emoji: "🍛", sound: "juh" },
  { l: "K", word: "key", emoji: "🔑", sound: "kuh" },
  { l: "L", word: "lion", emoji: "🦁", sound: "lll" },
  { l: "M", word: "mango", emoji: "🥭", sound: "mmm" },
  { l: "N", word: "nose", emoji: "👃", sound: "nnn" },
  { l: "O", word: "orange", emoji: "🍊", sound: "o" },
  { l: "P", word: "pineapple", emoji: "🍍", sound: "puh" },
  { l: "Q", word: "queen", emoji: "👑", sound: "kwuh" },
  { l: "R", word: "rain", emoji: "🌧️", sound: "rrr" },
  { l: "S", word: "sun", emoji: "☀️", sound: "sss" },
  { l: "T", word: "tree", emoji: "🌳", sound: "tuh" },
  { l: "U", word: "umbrella", emoji: "☂️", sound: "uh" },
  { l: "V", word: "van", emoji: "🚐", sound: "vvv" },
  { l: "W", word: "water", emoji: "💧", sound: "wuh" },
  { l: "X", word: "box", emoji: "📦", sound: "ks" },
  { l: "Y", word: "yam", emoji: "🍠", sound: "yuh" },
  { l: "Z", word: "zebra", emoji: "🦓", sound: "zzz" },
] as const;

// Words to blend sound by sound (Primary 1–3 and Kindergarten).
export const BLEND_WORDS = {
  kg: [
    { word: "cat", emoji: "🐱" }, { word: "sun", emoji: "☀️" }, { word: "hen", emoji: "🐔" },
    { word: "pot", emoji: "🍲" }, { word: "bus", emoji: "🚌" }, { word: "map", emoji: "🗺️" },
    { word: "pig", emoji: "🐷" }, { word: "cup", emoji: "🥤" },
  ],
  "p1-3": [
    { word: "fish", emoji: "🐟", parts: ["f", "i", "sh"] }, { word: "goat", emoji: "🐐", parts: ["g", "oa", "t"] },
    { word: "rain", emoji: "🌧️", parts: ["r", "ai", "n"] }, { word: "chair", emoji: "🪑", parts: ["ch", "air"] },
    { word: "drum", emoji: "🥁", parts: ["d", "r", "u", "m"] }, { word: "frog", emoji: "🐸", parts: ["f", "r", "o", "g"] },
    { word: "tree", emoji: "🌳", parts: ["t", "r", "ee"] }, { word: "ship", emoji: "🚢", parts: ["sh", "i", "p"] },
    { word: "market", emoji: "🛒", parts: ["mar", "ket"] }, { word: "teacher", emoji: "🧑‍🏫", parts: ["tea", "cher"] },
    { word: "banana", emoji: "🍌", parts: ["ba", "na", "na"] }, { word: "football", emoji: "⚽", parts: ["foot", "ball"] },
  ],
} as const;
