"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { QuizRunner } from "@/components/QuizRunner";
import { Finished, primaryButton } from "@/components/ui";
import { starsFor } from "@/components/useQueryMode";
import { ANTONYMS, IDIOMS, MEANINGS, SECTIONS, SYNONYMS, bankQuiz, type SectionId, type WordBankLevel } from "@/content/wordbank";
import { recordResult, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";

const LEVEL_TABS: { id: WordBankLevel; label: string }[] = [
  { id: "p4-6", label: "P4–6" },
  { id: "jhs", label: "JHS" },
];

interface Card {
  key: string;
  head: string;
  line: string;
  sentence: string;
  say: string;
}

function cardsFor(level: WordBankLevel, section: SectionId): Card[] {
  if (section === "meanings")
    return MEANINGS[level].map((e) => ({ key: e.word, head: e.word, line: e.meaning, sentence: e.sentence, say: `${e.word}. ${e.meaning}. ${e.sentence}` }));
  if (section === "synonyms")
    return SYNONYMS[level].map((e) => ({ key: e.word, head: e.word, line: `= ${e.same.join(", ")}`, sentence: e.sentence, say: `${e.word} means the same as ${e.same.join(", or ")}. ${e.sentence}` }));
  if (section === "antonyms")
    return ANTONYMS[level].map((e) => ({ key: e.word, head: `${e.word} ↔ ${e.opposite}`, line: `The opposite of ${e.word} is ${e.opposite}.`, sentence: e.sentence, say: `The opposite of ${e.word} is ${e.opposite}. ${e.sentence}` }));
  return IDIOMS[level].map((e) => ({ key: e.idiom, head: e.idiom, line: e.meaning, sentence: e.sentence, say: `${e.idiom}. This means ${e.meaning}. ${e.sentence}` }));
}

export default function WordBankPage() {
  const { progress, loaded } = useProgress();
  const [level, setLevel] = useState<WordBankLevel>("p4-6");
  const [section, setSection] = useState<SectionId>("meanings");
  const [mode, setMode] = useState<"learn" | "test">("learn");
  const [search, setSearch] = useState("");
  const [seed, setSeed] = useState(0);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (loaded) setLevel(progress.level === "jhs" ? "jhs" : "p4-6");
  }, [loaded, progress.level]);

  const info = SECTIONS.find((s) => s.id === section)!;
  const cards = useMemo(() => cardsFor(level, section), [level, section]);
  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? cards.filter((c) => `${c.head} ${c.line} ${c.sentence}`.toLowerCase().includes(q)) : cards;
  }, [cards, search]);

  const items = useMemo(
    () =>
      bankQuiz(level, section, 10).map((q) => ({
        prompt: (
          <>
            {q.prompt}
            {q.sentence && <span className="mt-2 block text-base font-normal italic text-black/60">{q.sentence}</span>}
          </>
        ),
        say: q.say,
        options: q.options,
        answer: q.answer,
        explain: q.explain,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, section, seed],
  );

  const choose = (fn: () => void) => {
    fn();
    setScore(null);
    setSearch("");
    setSeed((n) => n + 1);
  };

  const tab = (on: boolean) => `rounded-full px-4 py-2 font-bold ${on ? "bg-ziva text-white" : "bg-black/5 text-black/70"}`;

  return (
    <AppShell title="Word bank" back="/learn/">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2" role="group" aria-label="Class">
          {LEVEL_TABS.map((l) => (
            <button key={l.id} type="button" aria-pressed={level === l.id} onClick={() => choose(() => setLevel(l.id))} className={tab(level === l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2" role="group" aria-label="Mode">
          <button type="button" aria-pressed={mode === "learn"} onClick={() => choose(() => setMode("learn"))} className={tab(mode === "learn")}>
            📖 Learn
          </button>
          <button type="button" aria-pressed={mode === "test"} onClick={() => choose(() => setMode("test"))} className={tab(mode === "test")}>
            ✅ Test me
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={section === s.id}
            onClick={() => choose(() => setSection(s.id))}
            className={`rounded-2xl border-2 p-3 text-left ${section === s.id ? "border-ziva bg-sky-50" : "border-black/5 bg-white"}`}
          >
            <span className="block text-2xl" aria-hidden="true">{s.emoji}</span>
            <span className="block font-extrabold leading-tight">{s.title}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-black/70">{info.text}</p>

      {mode === "learn" ? (
        <>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a word…"
            aria-label="Search a word"
            className="mt-4 w-full rounded-2xl border-2 border-black/15 bg-white px-4 py-3 text-lg"
          />
          <p className="mt-2 text-sm text-black/60">
            {shown.length} of {cards.length} · tap 🔊 to listen
          </p>
          <ul className="mt-3 grid gap-3">
            {shown.map((c) => (
              <li key={c.key} className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-xl font-extrabold text-ziva">{c.head}</p>
                  <button type="button" onClick={() => speak(c.say)} aria-label={`Listen: ${c.head}`} className="h-10 w-10 shrink-0 rounded-full bg-ziva/10 text-xl">
                    🔊
                  </button>
                </div>
                <p className="mt-1 text-lg font-semibold">{c.line}</p>
                <p className="mt-1 italic text-black/65">“{c.sentence}”</p>
              </li>
            ))}
          </ul>
          {shown.length === 0 && <p className="mt-3 rounded-2xl bg-white p-4 text-black/60">No word found. Try another spelling.</p>}
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={() => choose(() => setMode("test"))} className={primaryButton}>
              ✅ Test me on {info.title.toLowerCase()}
            </button>
          </div>
        </>
      ) : score !== null ? (
        <div className="mt-5">
          <Finished
            stars={starsFor(score, items.length)}
            message={`${score} of ${items.length} correct in ${info.title}.`}
            onAgain={() => (setScore(null), setSeed(seed + 1))}
          />
        </div>
      ) : (
        <div className="mt-5">
          <QuizRunner
            key={`${level}-${section}-${seed}`}
            items={items}
            onDone={(correct) => {
              recordResult(`wordbank:${section}-${level}`, starsFor(correct, items.length));
              setScore(correct);
            }}
          />
        </div>
      )}
    </AppShell>
  );
}
