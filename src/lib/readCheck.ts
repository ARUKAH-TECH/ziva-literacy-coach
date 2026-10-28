// Compares what the phone heard with the words of the story, and builds
// friendly help (sounds, syllables, a tip) for words to practise.

export type WordStatus = "ok" | "almost" | "wrong" | "missed";

export interface WordResult {
  word: string; // as printed in the story
  status: WordStatus;
  heard?: string;
}

const NUMBERS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
  "20": "twenty", "100": "hundred", "200": "two hundred",
};

export function normalize(word: string) {
  const w = word.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9']/g, "").replace(/'s$/, "s").replace(/'/g, "");
  return NUMBERS[w] ?? w;
}

export function splitWords(text: string) {
  return text.split(/\s+/).map((w) => w.trim()).filter((w) => normalize(w).length > 0);
}

/** A rough "sounds like" key so the recogniser's spelling choices don't count as mistakes. */
function soundKey(w: string) {
  return w
    .replace(/ph/g, "f")
    .replace(/ck|q/g, "k")
    .replace(/c([eiy])/g, "s$1")
    .replace(/c/g, "k")
    .replace(/x/g, "ks")
    .replace(/wh/g, "w")
    .replace(/kn/g, "n")
    .replace(/wr/g, "r")
    .replace(/igh/g, "i")
    .replace(/ee|ea|ie|ey|y$/g, "i")
    .replace(/oo|ou|ew|ue/g, "u")
    .replace(/ai|ay/g, "a")
    .replace(/oa|ow/g, "o")
    .replace(/([a-z])\1+/g, "$1")
    .replace(/e$/, "");
}

function editDistance(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

/** 0–1: how alike two words are (spelling and sound). */
export function similarity(a: string, b: string) {
  if (a === b) return 1;
  const s1 = 1 - editDistance(a, b) / Math.max(a.length, b.length, 1);
  const ka = soundKey(a), kb = soundKey(b);
  const s2 = ka === kb ? 0.95 : 1 - editDistance(ka, kb) / Math.max(ka.length, kb.length, 1);
  return Math.max(s1, s2);
}

/**
 * Lines up the story words with the heard words (dynamic programming) and
 * marks each story word: ok / almost / wrong (with what was heard) / missed.
 * `lenient` words (names) only need to be roughly right.
 */
export function alignReading(target: string[], heardText: string): WordResult[] {
  const t = target.map(normalize);
  const h = heardText.split(/\s+/).map(normalize).filter(Boolean);
  const n = t.length, m = h.length;
  const name = target.map((w, i) => i > 0 && /^[A-Z]/.test(w.replace(/^[“"‘']/, "")) && !/[.!?]["”’]?$/.test(target[i - 1]));
  const cost = (i: number, j: number) => {
    const s = similarity(t[i], h[j]);
    const okAt = name[i] ? 0.45 : 0.8;
    return s >= okAt ? 0 : s >= 0.5 ? 0.6 : 1;
  };
  const D = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  const B = Array.from({ length: n + 1 }, () => new Uint8Array(m + 1)); // 1 diag, 2 up (missed), 3 left (extra)
  for (let i = 1; i <= n; i++) { D[i][0] = i; B[i][0] = 2; }
  for (let j = 1; j <= m; j++) { D[0][j] = j * 0.4; B[0][j] = 3; }
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) {
      const diag = D[i - 1][j - 1] + cost(i - 1, j - 1);
      const up = D[i - 1][j] + 1;
      const left = D[i][j - 1] + 0.4;
      const best = Math.min(diag, up, left);
      D[i][j] = best;
      B[i][j] = best === diag ? 1 : best === up ? 2 : 3;
    }
  const out: WordResult[] = new Array(n);
  let i = n, j = m;
  while (i > 0) {
    if (j > 0 && B[i][j] === 1) {
      const c = cost(i - 1, j - 1);
      out[i - 1] = { word: target[i - 1], status: c === 0 ? "ok" : c < 1 ? "almost" : "wrong", heard: h[j - 1] };
      i--; j--;
    } else if (j === 0 || B[i][j] === 2) {
      out[i - 1] = { word: target[i - 1], status: "missed" };
      i--;
    } else {
      j--;
    }
  }
  return out;
}

const GRAPHEMES = ["tion", "igh", "ear", "air", "ure", "sh", "ch", "th", "ph", "wh", "ck", "ng", "qu", "kn", "wr", "ee", "ea", "oo", "ai", "ay", "oa", "ow", "ou", "oi", "oy", "ar", "er", "ir", "or", "ur", "aw", "ew", "ie"];

/** "market" → ["m", "ar", "k", "e", "t"] */
export function soundChunks(word: string) {
  const w = normalize(word);
  const parts: string[] = [];
  for (let i = 0; i < w.length; ) {
    const g = GRAPHEMES.find((x) => w.startsWith(x, i));
    if (g) { parts.push(g); i += g.length; }
    else if (i + 1 < w.length && w[i] === w[i + 1] && !"aeiou".includes(w[i])) { parts.push(w[i] + w[i]); i += 2; }
    else { parts.push(w[i]); i += 1; }
  }
  return parts;
}

/** "market" → ["mar", "ket"] (simple vowel-group rule; good enough to say slowly). */
export function syllables(word: string) {
  const w = normalize(word);
  if (w.length <= 3) return [w];
  const isV = (c: string, k: number) => "aeiou".includes(c) || (c === "y" && k > 0);
  const groups: { start: number; end: number }[] = [];
  for (let k = 0; k < w.length; ) {
    if (isV(w[k], k)) {
      const s = k;
      while (k < w.length && isV(w[k], k)) k++;
      groups.push({ start: s, end: k });
    } else k++;
  }
  // silent final e
  if (groups.length > 1 && w.endsWith("e") && !w.endsWith("le") && groups[groups.length - 1].start === w.length - 1) groups.pop();
  if (groups.length < 2) return [w];
  const cuts: number[] = [];
  for (let g = 1; g < groups.length; g++) {
    const consonants = groups[g].start - groups[g - 1].end;
    cuts.push(consonants >= 2 ? groups[g - 1].end + Math.floor(consonants / 2) : groups[g - 1].end + (consonants === 1 ? 0 : 0));
  }
  const out: string[] = [];
  let prev = 0;
  for (const c of cuts) { if (c > prev) { out.push(w.slice(prev, c)); prev = c; } }
  out.push(w.slice(prev));
  return out.filter(Boolean);
}

/** One short, practical tip for saying the word. */
export function pronunciationTip(word: string) {
  const w = normalize(word);
  if (/tion$/.test(w)) return "“-tion” at the end sounds like “shun”.";
  if (/^kn/.test(w)) return "The k is silent — start with the n sound.";
  if (/^wr/.test(w)) return "The w is silent — start with the r sound.";
  if (/igh/.test(w)) return "“igh” says the long i sound, like in “night”.";
  if (/th/.test(w)) return "For “th”, put the tip of your tongue between your teeth and blow gently.";
  if (/ph/.test(w)) return "“ph” sounds like f.";
  if (/[^aeiou]ed$/.test(w) && w.length > 4) return "Past-tense “-ed”: after t or d say “id”; after p, k, s, sh, ch say “t”; otherwise “d”.";
  if (/[aeiou][^aeiou]e$/.test(w)) return "The e at the end is silent, but it makes the first vowel say its name (like “cake”).";
  if (/ee|ea/.test(w)) return "“ee” and “ea” usually make a long “eee” sound.";
  if (/oo/.test(w)) return "“oo” is like in “moon” (sometimes short, like “book”).";
  if (/sh|ch/.test(w)) return "“sh” is quiet (shhh); “ch” is a short sneeze sound (ch!).";
  if (/ng$/.test(w)) return "End with “ng” at the back of your mouth — don't add a g sound after it.";
  if (syllables(word).length > 1) return "Clap the parts, say each part slowly, then join them together.";
  return "Say each sound, then blend them together smoothly.";
}
