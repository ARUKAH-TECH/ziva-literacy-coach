import type { LevelId } from "@/lib/levels";

// Things to trace. "stroke" items are drawn as guide paths on a 400×300
// board; "text" items are drawn as dotted letters on handwriting lines.
export type TraceItem =
  | { kind: "stroke"; id: string; label: string; path: string }
  | { kind: "text"; id: string; label: string; text: string };

export interface TraceSet {
  id: string;
  title: string;
  emoji: string;
  items: TraceItem[];
}

const strokes: TraceItem[] = [
  { kind: "stroke", id: "down", label: "Standing line", path: "M200 40 L200 260" },
  { kind: "stroke", id: "across", label: "Sleeping line", path: "M60 150 L340 150" },
  { kind: "stroke", id: "slant", label: "Slanting line", path: "M90 250 L310 50" },
  { kind: "stroke", id: "circle", label: "Circle", path: "M200 50 A100 100 0 1 0 200.1 50" },
  { kind: "stroke", id: "zigzag", label: "Zigzag", path: "M50 210 L110 90 L170 210 L230 90 L290 210 L350 90" },
  { kind: "stroke", id: "wave", label: "Wave", path: "M40 150 C90 60 130 60 160 150 S230 240 280 150 S350 70 370 120" },
  { kind: "stroke", id: "hump", label: "Hump", path: "M70 250 L70 120 C70 50 190 50 190 120 L190 250 M190 120 C190 50 310 50 310 120 L310 250" },
  { kind: "stroke", id: "spiral", label: "Snail", path: "M200 150 C200 130 230 130 230 150 C230 180 180 185 175 150 C170 110 240 100 255 150 C270 205 160 215 150 150 C140 85 270 70 285 150" },
];

const letters = (s: string, prefix: string): TraceItem[] =>
  s.split("").map((ch) => ({ kind: "text", id: `${prefix}-${ch}`, label: ch, text: ch }));

const words = (list: string[], prefix: string): TraceItem[] =>
  list.map((w) => ({ kind: "text", id: `${prefix}-${w.toLowerCase().replace(/[^a-z]+/g, "-")}`, label: w, text: w }));

const SETS: Record<string, TraceSet> = {
  strokes: { id: "strokes", title: "Pre-writing strokes", emoji: "〰️", items: strokes },
  capitals: { id: "capitals", title: "Capital letters", emoji: "🔠", items: letters("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "cap") },
  small: { id: "small", title: "Small letters", emoji: "🔡", items: letters("abcdefghijklmnopqrstuvwxyz", "low") },
  numbers: { id: "numbers", title: "Numbers", emoji: "🔢", items: letters("0123456789", "num") },
  words: {
    id: "words",
    title: "Words",
    emoji: "✍️",
    items: words(["cat", "sun", "goat", "mango", "school", "Ghana", "friend", "water", "happy", "teacher"], "word"),
  },
  sentences: {
    id: "sentences",
    title: "Sentences",
    emoji: "📃",
    items: words(
      [
        "I love to read.",
        "Kofi has a red ball.",
        "We sing in the morning.",
        "Ama helps her mother.",
        "Reading makes me wise.",
        "Kind words are sweet.",
        "Practice makes perfect.",
        "Accra is a busy city.",
      ],
      "sent",
    ),
  },
};

export const SETS_FOR_LEVEL: Record<LevelId, string[]> = {
  kg: ["strokes", "capitals", "small", "numbers"],
  "p1-3": ["small", "capitals", "words", "sentences"],
  "p4-6": ["words", "sentences", "small"],
  jhs: ["sentences", "words"],
};

export function traceSet(id: string) {
  return SETS[id];
}
