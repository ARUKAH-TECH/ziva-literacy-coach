// Turns a learner's saved stars into a simple report for parents/teachers.

import type { Progress, RecordEntry } from "@/lib/progress";

export const SKILLS = [
  { id: "phonics", label: "Letters & phonics", emoji: "🔤", href: "/phonics/", prefixes: ["letters", "find-letter", "phonics"] },
  { id: "reading", label: "Reading", emoji: "📖", href: "/reading/", prefixes: ["reading", "read-aloud"] },
  { id: "fluency", label: "Reading speed", emoji: "⏱️", href: "/reading/?mode=fluency", prefixes: ["fluency"] },
  { id: "handwriting", label: "Handwriting", emoji: "✏️", href: "/handwriting/", prefixes: ["handwriting", "paper", "write-speed"] },
  { id: "spelling", label: "Spelling", emoji: "📝", href: "/spelling/", prefixes: ["spelling"] },
  { id: "vocabulary", label: "Word meanings", emoji: "💡", href: "/vocabulary/", prefixes: ["vocabulary", "wordbank"] },
  { id: "punctuation", label: "Punctuation", emoji: "❗", href: "/punctuation/", prefixes: ["punctuation"] },
] as const;

export type SkillId = (typeof SKILLS)[number]["id"];

const STAGE_SKILL: Record<string, SkillId> = { writing: "handwriting", reading: "reading", spelling: "spelling" };

export function skillOf(key: string): SkillId | null {
  const prefix = key.split(":")[0];
  if (prefix === "stage") {
    // stage:<class>.<skill>.<level>.<stage>.<work>
    const [cls, skill] = (key.split(":")[1] ?? "").split(".");
    if (skill === "words") return cls === "kg" || cls === "p1-3" ? "phonics" : "vocabulary";
    return STAGE_SKILL[skill] ?? null;
  }
  return SKILLS.find((s) => (s.prefixes as readonly string[]).includes(prefix))?.id ?? null;
}

const ACTIVITY_NAMES: Record<string, string> = {
  letters: "Letter",
  "find-letter": "Find the letter quiz",
  phonics: "Blend the sounds",
  reading: "Story questions",
  "read-aloud": "Read aloud & check",
  fluency: "Reading speed",
  handwriting: "Tracing",
  paper: "Writing on paper",
  "write-speed": "Timed writing",
  spelling: "Spelling",
  vocabulary: "Word meanings",
  wordbank: "Word bank",
  punctuation: "Punctuation",
};

const LEVEL_NAMES = ["Beginner", "Intermediate", "Professional"];
const SKILL_NAMES: Record<string, string> = { writing: "Writing", reading: "Reading", spelling: "Spelling", words: "Sounds & words" };

export function activityName(key: string) {
  const [prefix, rest] = key.split(":");
  if (prefix === "stage") {
    const [, skill, L, s, w] = (rest ?? "").split(".");
    return `${SKILL_NAMES[skill] ?? skill} · ${LEVEL_NAMES[Number(L)] ?? ""} stage ${Number(s) + 1} · work ${Number(w) + 1}`;
  }
  if (prefix === "wordbank") {
    const [section, ...lvl] = (rest ?? "").split("-");
    const names: Record<string, string> = { meanings: "word meanings", synonyms: "synonyms", antonyms: "antonyms", idioms: "idioms" };
    return `Word bank · ${names[section] ?? section}${lvl.length ? ` (${lvl.join("-") === "jhs" ? "JHS" : "P4–6"})` : ""}`;
  }
  const base = ACTIVITY_NAMES[prefix] ?? prefix;
  return rest && !["quiz", "all", "kg", "p1-3", "p4-6", "jhs"].includes(rest) ? `${base} · ${rest.replace(/-/g, " ")}` : base;
}

export interface SkillSummary {
  id: SkillId;
  label: string;
  emoji: string;
  href: string;
  done: number;
  avg: number; // 0–5
  tries: number;
}

export interface Report {
  activities: number;
  tries: number;
  avg: number;
  stars: number; // 0–5 overall
  daysThisWeek: number;
  daysThisMonth: number;
  lastActive: string | null;
  skills: SkillSummary[];
  strong: SkillSummary[];
  needs: SkillSummary[];
  recent: { key: string; name: string; entry: RecordEntry }[];
  last14: { day: string; practised: boolean }[];
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export function buildReport(p: Partial<Progress> | undefined): Report {
  const records = Object.entries(p?.records ?? {});
  const days = new Set(p?.days ?? []);
  const today = new Date();
  const ago = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return dayKey(d);
  };
  const inLast = (n: number) => [...days].filter((d) => d > ago(n)).length;

  const skills: SkillSummary[] = SKILLS.map((s) => {
    const mine = records.filter(([k]) => skillOf(k) === s.id).map(([, r]) => r);
    const avg = mine.length ? mine.reduce((a, r) => a + r.best, 0) / mine.length : 0;
    return { id: s.id, label: s.label, emoji: s.emoji, href: s.href, done: mine.length, avg, tries: mine.reduce((a, r) => a + r.tries, 0) };
  });
  const tried = skills.filter((s) => s.done > 0);
  const avg = records.length ? records.reduce((a, [, r]) => a + r.best, 0) / records.length : 0;
  const recent = records
    .map(([key, entry]) => ({ key, name: activityName(key), entry }))
    .sort((a, b) => (a.entry.last < b.entry.last ? 1 : -1));
  return {
    activities: records.length,
    tries: records.reduce((a, [, r]) => a + r.tries, 0),
    avg,
    stars: Math.round(avg),
    daysThisWeek: inLast(7),
    daysThisMonth: inLast(30),
    lastActive: recent[0]?.entry.last ?? null,
    skills,
    strong: tried.filter((s) => s.avg >= 4).sort((a, b) => b.avg - a.avg),
    needs: tried.filter((s) => s.avg < 3).sort((a, b) => a.avg - b.avg),
    recent: recent.slice(0, 12),
    last14: Array.from({ length: 14 }, (_, i) => {
      const d = ago(13 - i);
      return { day: d, practised: days.has(d) };
    }),
  };
}

export function whenText(iso: string | null) {
  if (!iso) return "Not started yet";
  const then = new Date(iso);
  const days = Math.floor((Date.now() - then.getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return then.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
