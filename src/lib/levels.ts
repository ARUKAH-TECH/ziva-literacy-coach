export const LEVELS = [
  { id: "kg", label: "Kindergarten", short: "KG 1–2", emoji: "🧸", blurb: "Letters, sounds, tracing and listening to stories" },
  { id: "p1-3", label: "Primary 1–3", short: "P1–3", emoji: "🎒", blurb: "Phonics, blending, short stories, spelling and neat letters" },
  { id: "p4-6", label: "Primary 4–6", short: "P4–6", emoji: "📘", blurb: "Fluency, vocabulary, comprehension, spelling and punctuation" },
  { id: "jhs", label: "JHS 1–3", short: "JHS", emoji: "🎓", blurb: "Passages, vocabulary, fluency, spelling, punctuation and clear handwriting" },
] as const;

export type LevelId = (typeof LEVELS)[number]["id"];

export function levelInfo(id: LevelId | null) {
  return LEVELS.find((l) => l.id === id) ?? null;
}

/** Every activity in the app. `levels` = which classes see it. */
export const ACTIVITIES = [
  { id: "letters", href: "/letters/", title: "Letters & sounds", emoji: "🔤", skill: "Phonics", levels: ["kg", "p1-3"], text: "Tap a letter to hear its name and sound." },
  { id: "find-letter", href: "/letters/?mode=quiz", title: "Find the letter", emoji: "👂", skill: "Phonics", levels: ["kg", "p1-3"], text: "Listen, then tap the right letter." },
  { id: "handwriting", href: "/handwriting/", title: "Handwriting", emoji: "✏️", skill: "Handwriting", levels: ["kg", "p1-3", "p4-6", "jhs"], text: "Trace strokes, letters, words and sentences." },
  { id: "phonics", href: "/phonics/", title: "Blend the sounds", emoji: "🧩", skill: "Phonics", levels: ["kg", "p1-3"], text: "Tap each sound, then blend them into a word." },
  { id: "reading", href: "/reading/", title: "Stories & questions", emoji: "📖", skill: "Reading", levels: ["kg", "p1-3", "p4-6", "jhs"], text: "Read or listen, then answer questions." },
  { id: "fluency", href: "/reading/?mode=fluency", title: "Reading speed", emoji: "⏱️", skill: "Reading", levels: ["p1-3", "p4-6", "jhs"], text: "Read aloud and see your words per minute." },
  { id: "spelling", href: "/spelling/", title: "Spelling", emoji: "📝", skill: "Spelling", levels: ["p1-3", "p4-6", "jhs"], text: "Listen to the word and type it." },
  { id: "vocabulary", href: "/vocabulary/", title: "Word meanings", emoji: "💡", skill: "Vocabulary", levels: ["p4-6", "jhs"], text: "Choose what each word means." },
  { id: "punctuation", href: "/punctuation/", title: "Punctuation", emoji: "❗", skill: "Writing", levels: ["p4-6", "jhs"], text: "Pick the sentence with correct punctuation." },
] as const;

export type ActivityId = (typeof ACTIVITIES)[number]["id"];

export function activitiesFor(level: LevelId | null) {
  return ACTIVITIES.filter((a) => !level || (a.levels as readonly string[]).includes(level));
}
