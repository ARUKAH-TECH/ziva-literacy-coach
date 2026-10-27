"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Finished, primaryButton, secondaryButton } from "@/components/ui";
import { shuffle, starsFor, useQueryMode } from "@/components/useQueryMode";
import { LETTERS } from "@/content/letters";
import { recordResult } from "@/lib/progress";
import { speak } from "@/lib/speech";

type Letter = (typeof LETTERS)[number];

function sayLetter(x: Letter) {
  speak(`${x.l}. ${x.sound}. ${x.sound}, as in ${x.word}.`, { rate: 0.8 });
}

function Cards() {
  const [open, setOpen] = useState<Letter | null>(null);
  const [lower, setLower] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <button type="button" onClick={() => setLower(!lower)} className={secondaryButton} aria-pressed={lower}>
          {lower ? "Show ABC" : "Show abc"}
        </button>
      </div>
      {open && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-3xl bg-white p-6 text-center shadow">
          <p className="text-8xl font-extrabold text-ziva">
            {open.l}
            <span className="text-gold">{open.l.toLowerCase()}</span>
          </p>
          <p className="text-6xl" aria-hidden="true">{open.emoji}</p>
          <p className="text-2xl font-bold capitalize">
            <span className="text-ziva">{open.word[0]}</span>
            {open.word.slice(1)}
          </p>
          <button type="button" onClick={() => sayLetter(open)} className={primaryButton}>🔊 Hear it again</button>
        </div>
      )}
      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {LETTERS.map((x) => (
          <button
            key={x.l}
            type="button"
            onClick={() => {
              setOpen(x);
              sayLetter(x);
              recordResult(`letters:${x.l}`, 3);
            }}
            aria-label={`Letter ${x.l}, ${x.word}`}
            className={`flex aspect-square flex-col items-center justify-center rounded-2xl text-4xl font-extrabold shadow-sm active:scale-95 ${
              open?.l === x.l ? "bg-gold text-[#14110c]" : "bg-white text-ziva"
            }`}
          >
            {lower ? x.l.toLowerCase() : x.l}
            <span aria-hidden="true" className="text-xl">{x.emoji}</span>
          </button>
        ))}
      </div>
    </>
  );
}

const ROUNDS = 8;

function Quiz() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    () =>
      shuffle(LETTERS)
        .slice(0, ROUNDS)
        .map((target) => ({ target, options: shuffle([target, ...shuffle(LETTERS.filter((x) => x.l !== target.l)).slice(0, 3)]) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed],
  );
  const q = questions[round];
  const done = round >= ROUNDS;

  useEffect(() => {
    if (q && !picked) speak(`Find the letter that says ${q.target.sound}. ${q.target.sound}, as in ${q.target.word}.`, { rate: 0.8 });
  }, [q, picked]);

  useEffect(() => {
    if (done) recordResult("find-letter:quiz", starsFor(score, ROUNDS));
  }, [done, score]);

  if (done) {
    return <Finished stars={starsFor(score, ROUNDS)} message={`You found ${score} of ${ROUNDS} letters.`} onAgain={() => (setRound(0), setScore(0), setPicked(null), setSeed(seed + 1))} nextHref="/phonics/" nextLabel="Blend sounds" />;
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-lg font-semibold text-black/60">Question {round + 1} of {ROUNDS} · ⭐ {score}</p>
      <button type="button" onClick={() => speak(`${q.target.sound}, as in ${q.target.word}`, { rate: 0.8 })} className={primaryButton}>
        🔊 Listen again
      </button>
      <p className="text-6xl" aria-hidden="true">{picked ? q.target.emoji : "❓"}</p>
      <div className="grid w-full grid-cols-2 gap-4">
        {q.options.map((o) => {
          const right = o.l === q.target.l;
          const state = picked ? (right ? "bg-green-500 text-white" : picked === o.l ? "bg-red-400 text-white" : "bg-white opacity-50") : "bg-white text-ziva";
          return (
            <button
              key={o.l}
              type="button"
              disabled={Boolean(picked)}
              onClick={() => {
                setPicked(o.l);
                if (right) setScore(score + 1);
                speak(right ? `Yes! ${q.target.l} for ${q.target.word}.` : `That is ${o.l}. The answer is ${q.target.l}.`);
              }}
              className={`aspect-[4/3] rounded-3xl text-6xl font-extrabold shadow ${state}`}
            >
              {o.l}
              {o.l.toLowerCase()}
            </button>
          );
        })}
      </div>
      {picked && (
        <button type="button" onClick={() => (setPicked(null), setRound(round + 1))} className={primaryButton}>
          Next →
        </button>
      )}
    </div>
  );
}

export default function LettersPage() {
  const mode = useQueryMode();
  const [tab, setTab] = useState<"cards" | "quiz">("cards");
  useEffect(() => {
    if (mode === "quiz") setTab("quiz");
  }, [mode]);
  return (
    <AppShell title="Letters & sounds" back="/learn/">
      <div role="tablist" className="mb-5 grid grid-cols-2 gap-2 rounded-full bg-white p-1 shadow-sm">
        {(["cards", "quiz"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} type="button" onClick={() => setTab(t)} className={`rounded-full py-3 text-lg font-bold ${tab === t ? "bg-ziva text-white" : ""}`}>
            {t === "cards" ? "🔤 Learn" : "👂 Find the letter"}
          </button>
        ))}
      </div>
      {tab === "cards" ? <Cards /> : <Quiz />}
    </AppShell>
  );
}
