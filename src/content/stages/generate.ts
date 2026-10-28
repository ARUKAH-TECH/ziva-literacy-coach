// Builds the Stages: for each class and skill, 3 levels (Beginner →
// Intermediate → Professional), 5 stages per level, 20 works per stage.
// Everything is generated the same way every time from the banks, so a
// work's id (and the child's stars on it) stays stable.

import type { TraceItem } from "@/content/handwriting";
import type { LevelId } from "@/lib/levels";
import * as B from "@/content/stages/banks";

export type SkillId = "writing" | "reading" | "spelling" | "words";

export type Work =
  | { kind: "trace"; id: string; item: TraceItem }
  | {
      kind: "choice";
      id: string;
      prompt: string;
      say?: string;
      picture?: string;
      passage?: string;
      options: string[];
      answer: number;
      explain?: string;
      big?: boolean;
    }
  | { kind: "spell"; id: string; word: string; sentence?: string; picture?: string };

export interface Stage {
  n: number;
  works: Work[];
}
export interface PathLevel {
  id: "beginner" | "intermediate" | "professional";
  title: string;
  emoji: string;
  blurb: string;
  stages: Stage[];
}

export const STAGES_PER_LEVEL = 5;
export const WORKS_PER_STAGE = 20;
export const PASS_STARS = 4;

export const SKILLS: { id: SkillId; title: string; emoji: string; text: string }[] = [
  { id: "writing", title: "Writing", emoji: "✏️", text: "Trace and write — letters to sentences" },
  { id: "reading", title: "Reading", emoji: "📖", text: "Read, then answer the question" },
  { id: "spelling", title: "Spelling", emoji: "📝", text: "Listen and spell" },
  { id: "words", title: "Sounds & words", emoji: "🔤", text: "Sounds, rhymes, meanings and grammar" },
];

const LEVEL_INFO: Omit<PathLevel, "stages">[] = [
  { id: "beginner", title: "Beginner", emoji: "🌱", blurb: "Start here" },
  { id: "intermediate", title: "Intermediate", emoji: "🌿", blurb: "Getting stronger" },
  { id: "professional", title: "Professional", emoji: "🌳", blurb: "Master level" },
];

// ── helpers ──────────────────────────────────────────────────────────────

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type R = () => number;
const pick = <T,>(r: R, list: T[]) => list[Math.floor(r() * list.length)];
function shuffled<T>(r: R, list: T[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Options = answer + up to n-1 distinct wrong ones (never equal to the answer), shuffled. */
function choices(r: R, answer: string, wrongPool: string[], n = 3) {
  const wrong = shuffled(
    r,
    [...new Set(wrongPool)].filter((w) => w !== answer),
  ).slice(0, n - 1);
  const options = shuffled(r, [answer, ...wrong]);
  return { options, answer: options.indexOf(answer) };
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const name = (r: R) => {
  const girl = r() < 0.5;
  return { n: pick(r, girl ? B.NAMES_GIRLS : B.NAMES_BOYS), he: girl ? "she" : "he", his: girl ? "her" : "his", girl };
};
const text = (id: string, t: string): Work => ({ kind: "trace", id, item: { kind: "text", id, label: t, text: t } });
const isGood = (t: string) => t.length <= 46;

/** Every real word in the banks — a "wrong spelling" must never be one of these. */
const REAL_WORDS = new Set(
  [
    ...B.PICTURES.map(([w]) => w), ...B.SIGHT_KG, ...B.CVC_KG, ...B.SPELL_P13.flat().map((w) => w.word), ...B.SPELL_P46.flat(), ...B.SPELL_JHS.flat(),
    ...B.SYNONYM_GROUPS.flat(), ...B.OPPOSITES_EASY.flat(), ...B.OPPOSITES_HARD.flat(), ...B.PAST_TENSE.flat(), ...B.PLURALS.flat(),
    "sad", "bad", "mad", "had", "dad", "bed", "bud", "bid", "bad", "ten", "tan", "tin", "ton", "pin", "pan", "pun", "hut", "hat", "hit", "hot",
    "mop", "map", "cop", "cup", "cap", "lip", "lap", "net", "nut", "not", "sit", "set", "sat", "pet", "pit", "pot", "put",
  ].map((w) => w.toLowerCase()),
);

/** Plausible wrong spellings of a word. */
export function misspell(word: string, r: R): string[] {
  const out = new Set<string>();
  const w = word;
  const tries: (() => string)[] = [
    () => w.replace(/([bcdfgklmnprstz])\1/, "$1"), // drop a double
    () => w.replace(/([aeiou])([bcdfglmnprt])([aeiou])/, "$1$2$2$3"), // add a double
    () => (w.includes("ie") ? w.replace("ie", "ei") : w.replace("ei", "ie")),
    () => w.replace(/e$/, ""),
    () => w.replace(/ph/, "f").replace(/ck/, "k"),
    () => w.replace(/c([eiy])/, "s$1"),
    () => w.replace(/([aeiou])/, (m) => ({ a: "e", e: "i", i: "e", o: "u", u: "o" })[m] as string),
    () => {
      const i = 1 + Math.floor(r() * Math.max(1, w.length - 2));
      return w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2);
    },
    () => w.replace(/([aeiou])[aeiou]/, "$1"),
    () => w.replace(/tion$/, "shun").replace(/sure$/, "shure"),
  ];
  for (const t of shuffled(r, tries)) {
    const m = t();
    if (m && m !== w && m.length >= 2 && !m.includes("undefined") && !REAL_WORDS.has(m.toLowerCase())) out.add(m);
    if (out.size >= 3) break;
  }
  if (out.size < 2) out.add(w + (w.endsWith("e") ? "e" : "h"));
  return [...out];
}

function spellChoice(id: string, word: string, r: R, picture?: string): Work {
  const c = choices(r, word, misspell(word, r), 3);
  return { kind: "choice", id, prompt: "Which spelling is correct?", say: word, picture, ...c, explain: `The correct spelling is “${word}”.`, big: true };
}

// ── reading ──────────────────────────────────────────────────────────────

function actionWork(id: string, r: R, mode: "who" | "what" | "where"): Work {
  const a = pick(r, B.ACTIONS);
  const p = name(r);
  const sentence = `${p.n} ${a.s} ${a.obj} ${a.prep} ${a.place}.`;
  if (mode === "who") {
    const c = choices(r, p.n, [...B.NAMES_GIRLS, ...B.NAMES_BOYS]);
    return { kind: "choice", id, passage: sentence, prompt: `Who ${a.s} ${a.obj}?`, ...c };
  }
  if (mode === "what") {
    const c = choices(r, a.obj, B.ACTIONS.map((x) => x.obj));
    return { kind: "choice", id, passage: sentence, prompt: `What does ${p.n} ${a.base}?`, ...c };
  }
  const c = choices(r, `${a.prep} ${a.place}`, B.ACTIONS.filter((x) => x.place !== a.place).map((x) => `${x.prep} ${x.place}`));
  return { kind: "choice", id, passage: sentence, prompt: `Where does ${p.n} ${a.base} ${a.obj}?`, ...c };
}

function tripWork(id: string, r: R, mode: number): Work {
  const t = pick(r, B.TRIPS);
  const p = name(r);
  const day = pick(r, B.DAYS);
  const rel = pick(r, B.RELATIVES);
  const passage = `On ${day}, ${p.n} went to the ${t.place} with ${p.his} ${rel}. They ${t.did} ${t.thing}. Then they went home happily.`;
  const qs = [
    () => ({ prompt: `When did ${p.n} go to the ${t.place}?`, ...choices(r, `On ${day}`, B.DAYS.map((d) => `On ${d}`)) }),
    () => ({ prompt: `Where did ${p.n} go?`, ...choices(r, `To the ${t.place}`, B.TRIPS.filter((x) => x.place !== t.place).map((x) => `To the ${x.place}`)) }),
    () => ({ prompt: `What did they get at the ${t.place}?`, ...choices(r, cap(t.thing), B.TRIPS.filter((x) => x.thing !== t.thing).map((x) => cap(x.thing))) }),
    () => ({ prompt: `Who went with ${p.n}?`, ...choices(r, `${cap(p.his)} ${rel}`, B.RELATIVES.filter((x) => x !== rel).map((x) => `${cap(p.his)} ${x}`)) }),
  ];
  return { kind: "choice", id, passage, ...qs[mode % qs.length]() };
}

function fill(t: string, p: { he: string; his: string }) {
  return t.replace(/\{he\}/g, p.he).replace(/\{his\}/g, p.his);
}

function eventWork(id: string, r: R, mode: number): Work {
  const e = pick(r, B.EVENTS);
  const p = name(r);
  const reason = fill(e.reason, p);
  const passage = `${p.n} ${e.event}. ${cap(p.he)} felt ${e.feeling} because ${reason}.`;
  const others = B.EVENTS.filter((x) => x !== e);
  const qs = [
    () => ({ prompt: `How did ${p.n} feel?`, ...choices(r, cap(e.feeling), B.EVENTS.filter((x) => x.good !== e.good).map((x) => cap(x.feeling))) }),
    () => ({ prompt: `Why did ${p.n} feel ${e.feeling}?`, ...choices(r, cap(`because ${reason}`), others.map((x) => cap(`because ${fill(x.reason, p)}`))) }),
    () => ({ prompt: `What happened to ${p.n}?`, ...choices(r, cap(`${p.he} ${e.event}`), others.map((x) => cap(`${p.he} ${x.event}`))) }),
  ];
  return { kind: "choice", id, passage, ...qs[mode % qs.length]() };
}

function storyWork(id: string, r: R, mode: number): Work {
  const t = pick(r, B.TRIPS);
  const e = pick(r, B.EVENTS);
  const p = name(r);
  const day = pick(r, B.DAYS);
  const rel = pick(r, B.RELATIVES);
  const reason = fill(e.reason, p);
  const passage =
    `Last ${day}, ${p.n} went to the ${t.place} with ${p.his} ${rel}. There, they ${t.did} ${t.thing}. ` +
    `Later that day, ${p.n} ${e.event}. ${cap(p.he)} felt ${e.feeling} because ${reason}.`;
  const title = `${p.n}'s ${day}`;
  const qs = [
    () => ({ prompt: "Which is the best title for this story?", ...choices(r, title, [`A trip to the moon`, `How to cook soup`, `${p.n}'s first day at school`, `The lost goat`, `A football match`]) }),
    () => ({ prompt: `How did ${p.n} feel later that day?`, ...choices(r, cap(e.feeling), B.EVENTS.filter((x) => x.good !== e.good).map((x) => cap(x.feeling))) }),
    () => ({ prompt: `Why did ${p.n} feel ${e.feeling}?`, ...choices(r, cap(`because ${reason}`), B.EVENTS.filter((x) => x !== e).map((x) => cap(`because ${fill(x.reason, p)}`))) }),
    () => ({ prompt: "What happened FIRST in the story?", ...choices(r, `${p.n} went to the ${t.place}`, [`${p.n} ${e.event}`, `${p.n} felt ${e.feeling}`, `${p.n} went to sleep`]) }),
    () => ({ prompt: `What did they do at the ${t.place}?`, ...choices(r, `They ${t.did} ${t.thing}`, B.TRIPS.filter((x) => x.thing !== t.thing).map((x) => `They ${x.did} ${x.thing}`)) }),
  ];
  return { kind: "choice", id, passage, ...qs[mode % qs.length]() };
}

// ── words (sounds, meanings, grammar) ────────────────────────────────────

const PIC = new Map(B.PICTURES);
/** Things a child can sensibly "have" (for "Ama has a …"). */
const HAS_A = ["cat", "dog", "goat", "hen", "pig", "fish", "ball", "bag", "book", "cup", "hat", "key", "pen", "box", "duck", "drum", "bell", "bike", "shoe", "sock", "shirt", "dress", "ring", "cake", "mango", "banana", "rabbit", "phone", "clock", "gift", "map", "kite", "toy"].filter((w) => PIC.has(w));
const picWords = B.PICTURES.map(([w]) => w);

function firstSoundWork(id: string, r: R): Work {
  const [word, emoji] = pick(r, B.PICTURES);
  const letter = word[0];
  const wrong = B.PICTURES.filter(([w]) => w[0] !== letter).map(([w, e]) => `${e} ${w}`);
  const c = choices(r, `${emoji} ${word}`, wrong);
  return { kind: "choice", id, prompt: `Which one starts with the sound of “${letter}”?`, say: `Which one starts with ${letter}?`, ...c, big: true };
}

function rhymeWork(id: string, r: R): Work {
  const fam = pick(r, B.RHYMES);
  const [a, b] = shuffled(r, fam);
  const wrong = B.RHYMES.filter((f) => f !== fam).flat();
  const c = choices(r, b, wrong);
  return { kind: "choice", id, prompt: `Which word rhymes with “${a}”?`, say: `Which word rhymes with ${a}?`, ...c, big: true, explain: `${cap(a)} and ${b} end with the same sound.` };
}

function blendWork(id: string, r: R): Work {
  const word = pick(r, B.CVC_KG);
  const c = choices(r, word, B.CVC_KG.filter((w) => w[1] !== word[1] || w[0] !== word[0]));
  return {
    kind: "choice",
    id,
    prompt: `Put the sounds together: ${word.split("").join(" – ")}`,
    say: `${word.split("").join(", ")}. What word is it?`,
    picture: PIC.get(word),
    ...c,
    big: true,
  };
}

function oppositeWork(id: string, r: R, list: [string, string][]): Work {
  const [a, b] = pick(r, list);
  const flip = r() < 0.5;
  const q = flip ? b : a;
  const ans = flip ? a : b;
  const wrong = list.flatMap(([x, y]) => [x, y]).filter((w) => w !== a && w !== b);
  return { kind: "choice", id, prompt: `What is the opposite of “${q}”?`, ...choices(r, ans, wrong), big: true };
}

function synonymWork(id: string, r: R): Work {
  const g = pick(r, B.SYNONYM_GROUPS);
  const [a, b] = shuffled(r, g);
  const wrong = B.SYNONYM_GROUPS.filter((x) => x !== g).flat();
  return { kind: "choice", id, prompt: `Which word means the same as “${a}”?`, ...choices(r, b, wrong), big: true };
}

function pastWork(id: string, r: R): Work {
  const [base, past] = pick(r, B.PAST_TENSE);
  const p = name(r);
  const wrong = [`${base}ed`, `${base}s`, base.endsWith("e") ? `${base}d` : `${base}ing`].filter((w) => w !== past);
  return {
    kind: "choice",
    id,
    prompt: `Today ${p.n} ${B.PAST_TENSE.some(([b]) => b === base) ? "will" : ""} ${base}. Yesterday ${p.n} ___.`.replace(/\s+/g, " "),
    ...choices(r, past, wrong),
    explain: `The past tense of “${base}” is “${past}”.`,
    big: true,
  };
}

function pluralWork(id: string, r: R): Work {
  const [one, many] = pick(r, B.PLURALS);
  const wrong = [`${one}s`, `${one}es`, one.endsWith("y") ? `${one}s` : `${one}ies`, `${many}s`].filter((w) => w !== many);
  return { kind: "choice", id, prompt: `One ${one}, two ___`, ...choices(r, many, wrong), big: true };
}

function homophoneWork(id: string, r: R): Work {
  const h = pick(r, B.HOMOPHONES);
  const ans = h.options[h.answer];
  return { kind: "choice", id, prompt: "Choose the right word.", passage: h.sentence, ...choices(r, ans, h.options, h.options.length), big: true };
}

function questionMarkWork(id: string, r: R): Work {
  const a = pick(r, B.ACTIONS);
  const p = name(r);
  const right = `Does ${p.n} ${a.base} ${a.obj} ${a.prep} ${a.place}?`;
  const wrong = [
    `does ${p.n} ${a.base} ${a.obj} ${a.prep} ${a.place}?`,
    `Does ${p.n} ${a.base} ${a.obj} ${a.prep} ${a.place}.`,
    `Does ${p.n.toLowerCase()} ${a.base} ${a.obj} ${a.prep} ${a.place}?`,
  ];
  return { kind: "choice", id, prompt: "Which sentence is written correctly?", ...choices(r, right, wrong, 4), explain: "A question starts with a capital letter, names have capitals, and it ends with a question mark." };
}

function listCommaWork(id: string, r: R): Work {
  const p = name(r);
  const [x, y, z] = shuffled(r, ["yams", "rice", "beans", "tomatoes", "onions", "bread", "eggs", "oranges", "fish", "plantain"]);
  const right = `${p.n} bought ${x}, ${y} and ${z}.`;
  const wrong = [`${p.n} bought ${x} ${y} and ${z}.`, `${p.n} bought, ${x} ${y}, and, ${z}.`, `${p.n.toLowerCase()} bought ${x}, ${y} and ${z}.`];
  return { kind: "choice", id, prompt: "Which sentence is punctuated correctly?", ...choices(r, right, wrong, 4), explain: "Use commas to separate things in a list, and begin names with a capital letter." };
}

/** Words whose meanings are too close to be wrong options for each other. */
const CLOSE_MEANINGS = [
  ["diligent", "meticulous", "prudent", "vigilant", "persevere", "resilient"],
  ["meagre", "scarce"], ["frugal", "prudent"], ["candid", "integrity"], ["benevolent", "humble"], ["abundant", "prosperous", "adequate"],
  ["lethargic", "tedious"], ["pessimistic", "hostile"], ["commence", "anticipate"], ["negligent", "lethargic"],
];
const close = (a: string, b: string) => CLOSE_MEANINGS.some((g) => g.includes(a) && g.includes(b));

function vocabWork(id: string, r: R, reverse: boolean): Work {
  const [word, meaning] = pick(r, B.VOCAB_JHS);
  const shares = (a: string, b: string) => a.split(/\W+/).some((w) => w.length > 4 && b.includes(w));
  if (reverse) {
    const wrong = B.VOCAB_JHS.filter(([w, m]) => w !== word && !shares(m, meaning) && !close(w, word)).map(([w]) => w);
    return { kind: "choice", id, prompt: `Which word means “${meaning}”?`, ...choices(r, word, wrong, 4) };
  }
  const wrong = B.VOCAB_JHS.filter(([w, m]) => w !== word && !shares(m, meaning) && !close(w, word)).map(([, m]) => m);
  return { kind: "choice", id, prompt: `What does “${word}” mean?`, ...choices(r, meaning, wrong, 4) };
}

function concordWork(id: string, r: R): Work {
  const c = pick(r, B.CONCORD);
  return { kind: "choice", id, prompt: "Choose the correct word.", passage: c.sentence, ...choices(r, c.options[0], [c.options[1]], 2), big: true };
}

function prepositionWork(id: string, r: R): Work {
  const c = pick(r, B.PREPOSITIONS);
  return { kind: "choice", id, prompt: "Choose the correct word.", passage: c.sentence, ...choices(r, c.answer, c.others, 3), big: true };
}

// ── builders per skill ───────────────────────────────────────────────────

type Maker = (id: string, r: R, k: number) => Work;

/** n works from a list of makers, used in turn. */
function fromMakers(prefix: string, makers: Maker[], n = STAGES_PER_LEVEL * WORKS_PER_STAGE): Work[] {
  const out: Work[] = [];
  const seen = new Set<string>();
  for (let k = 0, guard = 0; out.length < n && guard < n * 8; k++, guard++) {
    const id = `${prefix}.${out.length}`;
    const w = makers[k % makers.length](id, rng(`${prefix}:${guard}`), Math.floor(k / makers.length));
    const key = w.kind === "choice" ? `${w.passage ?? ""}|${w.prompt}|${w.options[w.answer]}` : w.kind === "spell" ? w.word : w.item.label;
    if (seen.has(key) && guard < n * 6) continue; // avoid repeats while we can
    seen.add(key);
    out.push(w);
  }
  return out;
}

/** n trace works from a list of texts (in order, repeating if short). */
function fromTexts(prefix: string, texts: string[], n = STAGES_PER_LEVEL * WORKS_PER_STAGE): Work[] {
  const list = texts.filter(isGood);
  return Array.from({ length: n }, (_, i) => text(`${prefix}.${i}`, list[i % list.length]));
}

/** Spelling: type each word once; then "which spelling is correct" for the rest. */
function fromSpelling(prefix: string, words: { word: string; sentence?: string; picture?: string }[], n = STAGES_PER_LEVEL * WORKS_PER_STAGE): Work[] {
  return Array.from({ length: n }, (_, i) => {
    const w = words[i % words.length];
    const id = `${prefix}.${i}`;
    return i < words.length ? { kind: "spell" as const, id, word: w.word, sentence: w.sentence, picture: w.picture } : spellChoice(id, w.word, rng(id), w.picture);
  });
}

const STROKE_ITEMS: TraceItem[] = [
  { kind: "stroke", id: "down", label: "Standing line", path: "M200 40 L200 260" },
  { kind: "stroke", id: "across", label: "Sleeping line", path: "M60 150 L340 150" },
  { kind: "stroke", id: "slant", label: "Slanting line", path: "M90 250 L310 50" },
  { kind: "stroke", id: "circle", label: "Circle", path: "M200 50 A100 100 0 1 0 200.1 50" },
  { kind: "stroke", id: "zigzag", label: "Zigzag", path: "M50 210 L110 90 L170 210 L230 90 L290 210 L350 90" },
  { kind: "stroke", id: "wave", label: "Wave", path: "M40 150 C90 60 130 60 160 150 S230 240 280 150 S350 70 370 120" },
  { kind: "stroke", id: "hump", label: "Hump", path: "M70 250 L70 120 C70 50 190 50 190 120 L190 250 M190 120 C190 50 310 50 310 120 L310 250" },
  { kind: "stroke", id: "cross", label: "Cross", path: "M200 50 L200 250 M90 150 L310 150" },
  { kind: "stroke", id: "cup", label: "Cup", path: "M90 80 C90 260 310 260 310 80" },
  { kind: "stroke", id: "hill", label: "Hill", path: "M60 240 C120 40 280 40 340 240" },
];

const SMALL = "abcdefghijklmnopqrstuvwxyz".split("");
const CAPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NUMS = "0123456789".split("");
const actionSentences = (r: R, n: number) =>
  Array.from({ length: n }, () => {
    const a = pick(r, B.ACTIONS);
    const p = name(r);
    return `${p.n} ${a.s} ${a.obj} ${a.prep} ${a.place}.`;
  });
const eventSentences = () =>
  B.EVENTS.map((e, i) => {
    const n = i % 2 ? B.NAMES_BOYS[i % B.NAMES_BOYS.length] : B.NAMES_GIRLS[i % B.NAMES_GIRLS.length];
    return `${n} ${e.event}.`;
  });

function writing(cls: LevelId, L: number, prefix: string): Work[] {
  if (cls === "kg") {
    if (L === 0) {
      const strokes = STROKE_ITEMS.map((s, i): Work => ({ kind: "trace", id: `${prefix}.s${i}`, item: s }));
      const rest = [...NUMS, ...CAPS, ...SMALL];
      const out: Work[] = [...strokes, ...strokes.slice(0, 10)];
      for (let i = 0; out.length < 100; i++) out.push(text(`${prefix}.${out.length}`, rest[i % rest.length]));
      return out.map((w, i) => ({ ...w, id: `${prefix}.${i}` }));
    }
    if (L === 1) return fromTexts(prefix, [...SMALL, ...B.SIGHT_KG, ...CAPS, ...B.CVC_KG.slice(0, 20)]);
    return fromTexts(prefix, [...B.CVC_KG, ...B.PHRASES_KG, ...B.SIGHT_KG]);
  }
  if (cls === "p1-3") {
    if (L === 0) return fromTexts(prefix, [...SMALL, ...CAPS, ...B.CVC_KG]);
    if (L === 1) return fromTexts(prefix, B.SPELL_P13[1].map((w) => w.word));
    return fromTexts(prefix, [...B.WORDS_P13_WRITE, ...actionSentences(rng(prefix), 70)]);
  }
  if (cls === "p4-6") {
    if (L === 0) return fromTexts(prefix, [...B.SPELL_P46[0], ...B.WORDS_P13_WRITE, ...B.NAMES_GIRLS, ...B.NAMES_BOYS]);
    if (L === 1) return fromTexts(prefix, actionSentences(rng(prefix), 100));
    return fromTexts(prefix, [...B.PROVERBS, ...eventSentences(), ...actionSentences(rng(prefix), 60)]);
  }
  if (L === 0) return fromTexts(prefix, [...B.SPELL_JHS[0], ...B.SPELL_P46[2]]);
  if (L === 1) return fromTexts(prefix, [...eventSentences(), ...actionSentences(rng(prefix), 80)]);
  return fromTexts(prefix, [...B.PROVERBS, ...B.CONCORD.map((c) => c.sentence.replace("___", c.options[0])), ...actionSentences(rng(prefix), 50)]);
}

function reading(cls: LevelId, L: number, prefix: string): Work[] {
  const pictureWord: Maker = (id, r) => {
    const [w, e] = pick(r, B.PICTURES);
    return { kind: "choice", id, prompt: "Which word goes with the picture?", picture: e, ...choices(r, w, picWords), big: true };
  };
  const findLetter: Maker = (id, r) => {
    const upper = r() < 0.5;
    const set = upper ? CAPS : SMALL;
    const l = pick(r, set);
    return { kind: "choice", id, prompt: `Tap the letter “${l}”`, say: `Find the letter ${l.toLowerCase()}`, ...choices(r, l, set, 4), big: true };
  };
  const tiny: Maker = (id, r, k) => {
    const [w, e] = pick(r, B.PICTURES.filter(([x]) => HAS_A.includes(x)));
    const p = name(r);
    const passage = `${p.n} has a ${w}. ${e}`;
    return k % 2
      ? { kind: "choice", id, passage, prompt: `What does ${p.n} have?`, ...choices(r, `a ${w}`, HAS_A.map((x) => `a ${x}`)), big: true }
      : { kind: "choice", id, passage, prompt: `Who has a ${w}?`, ...choices(r, p.n, [...B.NAMES_GIRLS, ...B.NAMES_BOYS]), big: true };
  };
  const act = (mode: "who" | "what" | "where"): Maker => (id, r) => actionWork(id, r, mode);
  const trip: Maker = (id, r, k) => tripWork(id, r, k);
  const ev: Maker = (id, r, k) => eventWork(id, r, k);
  const story: Maker = (id, r, k) => storyWork(id, r, k);

  const plan: Record<LevelId, Maker[][]> = {
    kg: [[findLetter, pictureWord], [pictureWord, tiny], [tiny, act("who"), pictureWord]],
    "p1-3": [[pictureWord, act("who"), act("what")], [act("what"), act("where"), trip], [trip, ev]],
    "p4-6": [[act("where"), trip], [trip, ev], [ev, story]],
    jhs: [[trip, ev], [ev, story], [story]],
  };
  return fromMakers(prefix, plan[cls][L]);
}

function spelling(cls: LevelId, L: number, prefix: string): Work[] {
  if (cls === "kg") {
    const pics = B.PICTURES.filter(([w]) => w.length <= 5);
    if (L === 0) {
      return fromMakers(prefix, [
        (id, r) => {
          const [w, e] = pick(r, pics);
          return { kind: "choice", id, prompt: `Which letter does “${w}” start with?`, say: w, picture: e, ...choices(r, w[0], SMALL, 4), big: true };
        },
      ]);
    }
    if (L === 1) {
      const three = pics.filter(([w]) => w.length === 3);
      return fromMakers(prefix, [
        (id, r) => {
          const [w, e] = pick(r, three);
          const gap = 1 + Math.floor(r() * 2);
          const shown = w.split("").map((c, i) => (i === gap ? "_" : c)).join(" ");
          return { kind: "choice", id, prompt: `Which letter is missing?  ${shown}`, say: w, picture: e, ...choices(r, w[gap], SMALL, 4), big: true };
        },
      ]);
    }
    return fromMakers(prefix, [(id, r) => {
      const [w, e] = pick(r, pics);
      return spellChoice(id, w, r, e);
    }]);
  }
  const list =
    cls === "p1-3"
      ? B.SPELL_P13[L].map((w) => ({ ...w, picture: PIC.get(w.word) }))
      : (cls === "p4-6" ? B.SPELL_P46 : B.SPELL_JHS)[L].map((word) => ({ word }));
  return fromSpelling(prefix, list);
}

function words(cls: LevelId, L: number, prefix: string): Work[] {
  const M = (f: (id: string, r: R) => Work): Maker => (id, r) => f(id, r);
  const opp = (list: [string, string][]): Maker => (id, r) => oppositeWork(id, r, list);
  const plan: Record<LevelId, Maker[][]> = {
    kg: [[M(firstSoundWork)], [M(rhymeWork), M(firstSoundWork)], [M(blendWork), M(rhymeWork)]],
    "p1-3": [[M(firstSoundWork), M(blendWork)], [M(rhymeWork), opp(B.OPPOSITES_EASY)], [opp(B.OPPOSITES_EASY), M(pluralWork), M(pastWork)]],
    "p4-6": [[M(synonymWork), opp(B.OPPOSITES_EASY)], [opp(B.OPPOSITES_HARD), M(pastWork), M(pluralWork)], [M(homophoneWork), M(questionMarkWork), M(listCommaWork), M(synonymWork)]],
    jhs: [
      [(id, r) => vocabWork(id, r, false), M(synonymWork)],
      [M(concordWork), M(prepositionWork), opp(B.OPPOSITES_HARD)],
      [(id, r) => vocabWork(id, r, true), M(homophoneWork), M(questionMarkWork), M(listCommaWork), M(concordWork)],
    ],
  };
  return fromMakers(prefix, plan[cls][L]);
}

const cache = new Map<string, PathLevel[]>();

/** The whole path for one class and skill. */
export function buildPath(cls: LevelId, skill: SkillId): PathLevel[] {
  const key = `${cls}:${skill}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const make = { writing, reading, spelling, words }[skill];
  const levels = LEVEL_INFO.map((info, L) => {
    const all = make(cls, L, `${cls}.${skill}.${L}`);
    return {
      ...info,
      stages: Array.from({ length: STAGES_PER_LEVEL }, (_, s) => ({
        n: s + 1,
        works: all.slice(s * WORKS_PER_STAGE, (s + 1) * WORKS_PER_STAGE).map((w, i) => ({ ...w, id: `${cls}.${skill}.${L}.${s}.${i}` })),
      })),
    };
  });
  cache.set(key, levels);
  return levels;
}

export const recordKeyFor = (workId: string) => `stage:${workId}`;
