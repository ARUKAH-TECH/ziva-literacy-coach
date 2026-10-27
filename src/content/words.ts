import type { LevelId } from "@/lib/levels";

// Spelling: the word, and a sentence that shows its meaning.
export const SPELLING: Record<Exclude<LevelId, "kg">, { word: string; sentence: string }[]> = {
  "p1-3": [
    { word: "cat", sentence: "The cat is sleeping." },
    { word: "sun", sentence: "The sun is hot today." },
    { word: "book", sentence: "I read my book." },
    { word: "fish", sentence: "Mother cooked fish." },
    { word: "school", sentence: "We walk to school." },
    { word: "water", sentence: "Drink clean water." },
    { word: "happy", sentence: "Kofi is happy." },
    { word: "green", sentence: "The leaf is green." },
    { word: "friend", sentence: "Ama is my friend." },
    { word: "play", sentence: "We play football." },
  ],
  "p4-6": [
    { word: "beautiful", sentence: "The garden is beautiful." },
    { word: "because", sentence: "I stayed home because it rained." },
    { word: "friendship", sentence: "Their friendship is strong." },
    { word: "favourite", sentence: "Jollof is my favourite food." },
    { word: "neighbour", sentence: "Our neighbour sells bread." },
    { word: "library", sentence: "We borrowed books from the library." },
    { word: "February", sentence: "February is the second month." },
    { word: "environment", sentence: "Keep the environment clean." },
    { word: "different", sentence: "Every leaf is different." },
    { word: "tomorrow", sentence: "We have a test tomorrow." },
  ],
  jhs: [
    { word: "necessary", sentence: "It is necessary to revise every day." },
    { word: "separate", sentence: "Separate the plastics from the paper." },
    { word: "accommodation", sentence: "The school provides accommodation for boarders." },
    { word: "government", sentence: "The government built a new road." },
    { word: "responsibility", sentence: "Keeping the class clean is our responsibility." },
    { word: "occasionally", sentence: "We occasionally visit the museum." },
    { word: "conscience", sentence: "Let your conscience guide you." },
    { word: "independence", sentence: "Ghana gained independence in 1957." },
    { word: "pronunciation", sentence: "Her pronunciation is very clear." },
    { word: "definitely", sentence: "I will definitely attend the meeting." },
  ],
};

// Vocabulary: choose the meaning.
export const VOCABULARY: Record<"p4-6" | "jhs", { word: string; sentence: string; options: string[]; answer: number }[]> = {
  "p4-6": [
    { word: "enormous", sentence: "The elephant was enormous.", options: ["very small", "very big", "very fast", "very old"], answer: 1 },
    { word: "brave", sentence: "The brave girl spoke at assembly.", options: ["afraid", "tired", "showing courage", "quiet"], answer: 2 },
    { word: "fragile", sentence: "Carry the fragile glass carefully.", options: ["easily broken", "very heavy", "very cheap", "shiny"], answer: 0 },
    { word: "generous", sentence: "Our generous neighbour shared her mangoes.", options: ["selfish", "happy to give", "angry", "rich"], answer: 1 },
    { word: "rapid", sentence: "The river has a rapid current.", options: ["slow", "dirty", "fast", "deep"], answer: 2 },
    { word: "ancient", sentence: "We visited an ancient castle at Cape Coast.", options: ["very old", "very new", "very tall", "very far"], answer: 0 },
    { word: "assist", sentence: "Please assist your younger sister.", options: ["stop", "help", "call", "watch"], answer: 1 },
    { word: "delighted", sentence: "She was delighted with her results.", options: ["sad", "angry", "very pleased", "surprised"], answer: 2 },
  ],
  jhs: [
    { word: "diligent", sentence: "Diligent students revise every day.", options: ["lazy", "hard-working and careful", "clever", "talkative"], answer: 1 },
    { word: "reluctant", sentence: "He was reluctant to apologise.", options: ["eager", "unwilling", "able", "proud"], answer: 1 },
    { word: "abundant", sentence: "Rain makes food abundant in the season.", options: ["scarce", "expensive", "plentiful", "fresh"], answer: 2 },
    { word: "consequence", sentence: "Lateness has a consequence.", options: ["a result", "a reason", "a reward", "a rule"], answer: 0 },
    { word: "integrity", sentence: "A leader needs integrity.", options: ["wealth", "honesty and strong principles", "power", "popularity"], answer: 1 },
    { word: "obsolete", sentence: "Some old phones are now obsolete.", options: ["expensive", "no longer used", "popular", "broken"], answer: 1 },
    { word: "meticulous", sentence: "She kept meticulous notes.", options: ["very careful and precise", "messy", "short", "colourful"], answer: 0 },
    { word: "advocate", sentence: "She is an advocate for girls’ education.", options: ["opponent", "supporter who speaks for a cause", "teacher", "judge"], answer: 1 },
  ],
};

// Punctuation: pick the correctly punctuated sentence.
export const PUNCTUATION: Record<"p4-6" | "jhs", { options: string[]; answer: number; tip: string }[]> = {
  "p4-6": [
    { options: ["where is my bag", "Where is my bag?", "Where is my bag.", "where is my bag?"], answer: 1, tip: "A question starts with a capital letter and ends with a question mark." },
    { options: ["kofi and ama went to accra.", "Kofi and Ama went to Accra.", "Kofi and ama went to accra.", "kofi and Ama went to Accra"], answer: 1, tip: "Names of people and places begin with capital letters." },
    { options: ["We bought yam rice and beans.", "We bought, yam rice and beans.", "We bought yam, rice and beans.", "We bought yam rice, and, beans."], answer: 2, tip: "Use commas to separate items in a list." },
    { options: ["What a lovely day!", "What a lovely day?", "what a lovely day!", "What a lovely day,"], answer: 0, tip: "An exclamation mark shows strong feeling." },
    { options: ["Its a sunny day.", "It’s a sunny day.", "Its’ a sunny day.", "It’s a sunny day?"], answer: 1, tip: "It’s = it is. The apostrophe shows the missing letter." },
    { options: ["The dog wagged it’s tail.", "The dog wagged its tail.", "The dog wagged its’ tail.", "the dog wagged its tail."], answer: 1, tip: "“Its” (no apostrophe) shows ownership." },
  ],
  jhs: [
    { options: ["“Come here,” said the teacher.", "“Come here” said the teacher.", "Come here, said the teacher.", "“Come here.” said the teacher."], answer: 0, tip: "In direct speech, put a comma before the closing quotation mark when the sentence continues." },
    { options: ["However we finished the work.", "However, we finished the work.", "However; we finished the work.", "however, we finished the work."], answer: 1, tip: "Put a comma after an introductory word such as “However”." },
    { options: ["I have three subjects: English, Science and Maths.", "I have three subjects; English, Science and Maths.", "I have three subjects, English: Science and Maths.", "I have three subjects English, Science and Maths."], answer: 0, tip: "A colon introduces a list after a complete statement." },
    { options: ["The girls’ uniforms were washed.", "The girls uniforms were washed.", "The girl’s’ uniforms were washed.", "The girls uniform’s were washed."], answer: 0, tip: "For plural nouns ending in s, the apostrophe goes after the s: girls’." },
    { options: ["It rained heavily, the match was cancelled.", "It rained heavily; the match was cancelled.", "It rained heavily the match was cancelled.", "It rained heavily: the match, was cancelled."], answer: 1, tip: "A semicolon joins two closely related complete sentences." },
    { options: ["My brother, who lives in Ho, is a nurse.", "My brother who lives in Ho, is a nurse.", "My brother, who lives in Ho is a nurse.", "My brother who, lives in Ho is a nurse."], answer: 0, tip: "Extra information in the middle of a sentence is enclosed by a pair of commas." },
  ],
};
