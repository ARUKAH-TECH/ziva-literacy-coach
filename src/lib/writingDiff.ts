// Compares what the child wrote (as read from the photo) with the exercise,
// letter by letter, so the app can rewrite the text correctly and show
// exactly which parts to fix.

export type Mark = "ok" | "fix" | "case" | "wrong" | "extra" | "shape";

export interface MarkedChar {
  ch: string;
  mark: Mark;
}

export interface WritingComparison {
  /** The correct writing, with the letters to fix marked. */
  correct: MarkedChar[][];
  /** What the child wrote, with mistakes marked. */
  wrote: MarkedChar[][];
  corrections: string[];
  perfect: boolean;
}

const LETTERS = /[A-Za-z]/;
const PUNCT_NAMES: Record<string, string> = {
  ".": "the full stop (.)",
  ",": "the comma (,)",
  "?": "the question mark (?)",
  "!": "the exclamation mark (!)",
  "'": "the apostrophe (')",
  ":": "the colon (:)",
  ";": "the semicolon (;)",
  '"': "the speech marks (\")",
};
const TURNED: Record<string, string> = { b: "d", d: "b", p: "q", q: "p", n: "u", u: "n", m: "w", w: "m" };

const tokens = (text: string) =>
  text
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .split(/\s+/)
    .filter(Boolean);
const lettersOf = (w: string) => w.replace(/[^A-Za-z]/g, "");

/** Case-insensitive longest-common-subsequence match between two words. */
function charMatch(t: string, w: string) {
  const n = t.length, m = w.length;
  const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      L[i][j] = t[i].toLowerCase() === w[j].toLowerCase() ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const tm: Mark[] = Array(n).fill("fix");
  const wm: Mark[] = Array(m).fill("wrong");
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (t[i].toLowerCase() === w[j].toLowerCase()) {
      const same = t[i] === w[j];
      tm[i] = same ? "ok" : "case";
      wm[j] = same ? "ok" : "case";
      i++;
      j++;
    } else if (L[i + 1][j] >= L[i][j + 1]) i++;
    else j++;
  }
  return { tm, wm, common: L[0][0] };
}

function likeness(t: string, w: string) {
  if (!t.length || !w.length) return 0;
  return (2 * charMatch(t, w).common) / (t.length + w.length);
}

function punctNotes(t: string, w: string) {
  const tl = lettersOf(t) || t;
  const tp = t.replace(/[A-Za-z]/g, ""), wp = w.replace(/[A-Za-z]/g, "");
  const out: string[] = [];
  for (const p of tp) if (!wp.includes(p)) out.push(`Add ${PUNCT_NAMES[p] ?? `“${p}”`} after “${tl}”`);
  for (const p of wp) if (!tp.includes(p)) out.push(`Leave out the “${p}” after “${tl}”`);
  return out;
}

function note(t: string, w: string): string | null {
  if (t === w) return null;
  const main = spellingNote(t, w);
  const extra = lettersOf(t).toLowerCase() === lettersOf(w).toLowerCase() ? [] : punctNotes(t, w);
  return [main, ...extra].filter(Boolean).join(". ") || null;
}

function spellingNote(t: string, w: string): string | null {
  const tl = lettersOf(t), wl = lettersOf(w);
  if (tl.toLowerCase() === wl.toLowerCase()) {
    const out: string[] = [];
    for (let i = 0; i < tl.length; i++) {
      if (tl[i] !== wl[i]) {
        out.push(
          tl[i] === tl[i].toUpperCase()
            ? i === 0
              ? `Start “${tl}” with a capital ${tl[i]}`
              : `Use a capital ${tl[i]} in “${tl}”`
            : `Use a small ${tl[i]} in “${tl}” (you wrote ${wl[i]})`,
        );
        break;
      }
    }
    out.push(...punctNotes(t, w));
    return out.join(". ") || null;
  }
  if (tl.length === wl.length) {
    const diffs = [...tl.toLowerCase()].map((c, i) => [c, wl[i].toLowerCase()] as const).filter(([a, b]) => a !== b);
    if (diffs.length && diffs.every(([a, b]) => TURNED[b] === a)) {
      const [a, b] = diffs[0];
      return `“${wl}” should be “${tl}”: your ${b} is turned round; it should be ${a}`;
    }
    if (diffs.length === 1) {
      const [a, b] = diffs[0];
      return `“${wl}” → “${tl}”: write ${a}, not ${b}`;
    }
  }
  const { tm } = charMatch(tl, wl);
  const missing = [...tl].filter((_, i) => tm[i] === "fix");
  if (wl.length < tl.length && likeness(tl, wl) * (tl.length + wl.length) === 2 * wl.length) {
    return `“${w}” → “${tl}”: missing letter${missing.length > 1 ? "s" : ""} ${missing.join(", ")}`;
  }
  return `“${wl || w}” → spell it “${tl}”`;
}

/**
 * Lines up written words with exercise words (allowing missing, extra and
 * joined-up words), then marks letters.
 * `shapeLetters` = letters the AI said are badly formed (marked even if spelt right).
 */
export function compareWriting(target: string, written: string, shapeLetters: string[] = []): WritingComparison {
  let tWords = tokens(target);
  let wWords = tokens(written);
  const corrections: string[] = [];

  // A single letter or word written several times: compare each copy.
  const repeated = tWords.length === 1 && wWords.length > 1;
  if (repeated) tWords = Array(wWords.length).fill(tWords[0]);

  // Joined-up words ("greengrass"): split them and note the missing space.
  const split: string[] = [];
  for (const w of repeated ? [] : wWords) {
    const lw = lettersOf(w).toLowerCase();
    let done = false;
    for (let i = 0; i + 1 < tWords.length && !done; i++) {
      const a = lettersOf(tWords[i]).toLowerCase(), b = lettersOf(tWords[i + 1]).toLowerCase();
      if (a && b && lw === a + b) {
        const cut = w.search(/[A-Za-z]/) + a.length;
        split.push(w.slice(0, cut), w.slice(cut));
        corrections.push(`Leave a finger space between “${lettersOf(tWords[i])}” and “${lettersOf(tWords[i + 1])}”`);
        done = true;
      }
    }
    if (!done) split.push(w);
  }
  if (!repeated) wWords = split;

  // Word alignment (dynamic programming).
  const n = tWords.length, m = wWords.length;
  const D = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  for (let i = 1; i <= n; i++) D[i][0] = i;
  for (let j = 1; j <= m; j++) D[0][j] = j;
  const pairCost = (i: number, j: number) => {
    const s = likeness(tWords[i], wWords[j]);
    return s < 0.34 ? 1.9 : 1 - s;
  };
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      D[i][j] = Math.min(D[i - 1][j - 1] + pairCost(i - 1, j - 1), D[i - 1][j] + 1, D[i][j - 1] + 1);

  const pairs: [number | null, number | null][] = [];
  let i = n, j = m;
  if (repeated) {
    // Copy by copy.
    for (let k = m - 1; k >= 0; k--) pairs.push([k, k]); // reversed below
    i = 0;
    j = 0;
  }
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + pairCost(i - 1, j - 1)) {
      pairs.push([i - 1, j - 1]);
      i--;
      j--;
    } else if (i > 0 && (j === 0 || D[i][j] === D[i - 1][j] + 1)) {
      pairs.push([i - 1, null]);
      i--;
    } else {
      pairs.push([null, j - 1]);
      j--;
    }
  }
  pairs.reverse();

  const shapes = new Set(shapeLetters.filter((s) => s.length === 1).map((s) => s.toLowerCase()));
  const shapeWords = new Set(shapeLetters.filter((s) => s.length > 1).map((s) => lettersOf(s).toLowerCase()));
  const correct: MarkedChar[][] = [];
  const wrote: MarkedChar[][] = [];

  for (const [ti, wi] of pairs) {
    if (ti !== null && wi !== null) {
      const t = tWords[ti], w = wWords[wi];
      // Same length: compare letter by letter in place (shows swaps like deb/bed).
      const { tm, wm } =
        t.length === w.length
          ? {
              tm: [...t].map((c, k): Mark => (c === w[k] ? "ok" : c.toLowerCase() === w[k].toLowerCase() ? "case" : "fix")),
              wm: [...w].map((c, k): Mark => (c === t[k] ? "ok" : c.toLowerCase() === t[k].toLowerCase() ? "case" : "wrong")),
            }
          : charMatch(t, w);
      const wholeShape = shapeWords.has(lettersOf(t).toLowerCase());
      correct.push([...t].map((ch, k) => ({ ch, mark: tm[k] === "ok" && (wholeShape || (LETTERS.test(ch) && shapes.has(ch.toLowerCase()))) ? "shape" : tm[k] })));
      wrote.push([...w].map((ch, k) => ({ ch, mark: wm[k] })));
      const c = note(t, w);
      if (c) corrections.push(c);
    } else if (ti !== null) {
      correct.push([...tWords[ti]].map((ch) => ({ ch, mark: "fix" as Mark })));
      corrections.push(`Missing word: “${lettersOf(tWords[ti]) || tWords[ti]}”`);
    } else if (wi !== null) {
      wrote.push([...wWords[wi]].map((ch) => ({ ch, mark: "extra" as Mark })));
      corrections.push(`Leave out “${wWords[wi]}”: it isn't in the exercise`);
    }
  }

  const unique = [...new Set(corrections)];
  const perfect = unique.length === 0 && correct.every((w) => w.every((c) => c.mark === "ok" || c.mark === "shape"));
  return { correct, wrote, corrections: unique.slice(0, 10), perfect };
}
