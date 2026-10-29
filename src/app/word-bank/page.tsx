"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Paywall } from "@/components/Paywall";
import { QuizRunner } from "@/components/QuizRunner";
import { Finished, Stars, primaryButton, secondaryButton } from "@/components/ui";
import { starsFor } from "@/components/useQueryMode";
import { QUESTIONS_PER_STAGE, SECTIONS, freeQuestionsIn, wordBankStages, wordStageKey, type WordBankLevel } from "@/content/wordbank";
import { recordResult, useProgress } from "@/lib/progress";
import { speak, stopSpeaking } from "@/lib/speech";
import { useAccess } from "@/lib/subscription";

const PASS = 4;
const LEVEL_TABS: { id: WordBankLevel; label: string }[] = [
  { id: "p4-6", label: "P4 to P6" },
  { id: "jhs", label: "JHS" },
];
const TIERS = [
  { emoji: "🌱", title: "Beginner" },
  { emoji: "🌿", title: "Intermediate" },
  { emoji: "🌳", title: "Professional" },
];
const tierOf = (n: number, total: number) => TIERS[Math.min(2, Math.floor(((n - 1) * 3) / total))];
const sectionEmoji = Object.fromEntries(SECTIONS.map((s) => [s.id, s.emoji]));

type View = { stage: number | null; mode: "study" | "test" | "done"; score: number; asked: number; seed: number };

export default function WordBankPage() {
  const { progress, loaded } = useProgress();
  const access = useAccess();
  const [level, setLevel] = useState<WordBankLevel>("p4-6");
  const [view, setView] = useState<View>({ stage: null, mode: "study", score: 0, asked: 0, seed: 0 });

  useEffect(() => {
    if (loaded) setLevel(progress.level === "jhs" ? "jhs" : "p4-6");
  }, [loaded, progress.level]);

  const stages = useMemo(() => wordBankStages(level), [level]);
  const best = (n: number) => progress.records[wordStageKey(level, n)]?.best ?? 0;
  const open = (n: number) => n === 1 || best(n - 1) >= PASS;
  const current = stages.find((s) => best(s.n) < PASS)?.n ?? stages.length;
  const passedCount = stages.filter((s) => best(s.n) >= PASS).length;

  const go = (v: Partial<View>) => {
    stopSpeaking();
    setView((old) => ({ ...old, ...v }));
  };

  if (!loaded) return <AppShell title="Word bank" back="/learn/">{null}</AppShell>;

  // ── a stage ──
  if (view.stage !== null && open(view.stage)) {
    const stage = stages[view.stage - 1];
    const tier = tierOf(stage.n, stages.length);
    const free = freeQuestionsIn(stage.n);
    const limit = access.ok ? QUESTIONS_PER_STAGE : free;
    const items = stage.questions.slice(0, limit).map((q) => ({
      prompt: (
        <>
          <span className="mb-1 block text-sm font-bold text-black/60">
            {sectionEmoji[q.section]} {SECTIONS.find((s) => s.id === q.section)?.title}
          </span>
          {q.prompt}
          {q.sentence && <span className="mt-2 block text-base font-normal italic text-black/60">{q.sentence}</span>}
        </>
      ),
      say: q.say,
      options: q.options,
      answer: q.answer,
      explain: q.explain,
    }));
    const stars = starsFor(view.score, QUESTIONS_PER_STAGE);

    return (
      <AppShell title={`Word bank · Stage ${stage.n}`} back="/learn/">
        <div className="flex items-center justify-between gap-2">
          <button type="button" onClick={() => go({ stage: null })} className="text-sm font-bold text-ziva underline">
            ← All stages
          </button>
          <span className="text-sm font-bold text-black/60">
            {tier.emoji} {tier.title} · Stage {stage.n} of {stages.length}
          </span>
        </div>

        {limit === 0 ? (
          <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
            <Paywall onCheck={access.refresh} />
          </section>
        ) : view.mode === "study" ? (
          <>
            <div className="mt-4 rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-5 text-white shadow">
              <p className="text-2xl font-extrabold">📖 Study, then test</p>
              <p className="mt-1 text-white/90">
                Read these {limit < QUESTIONS_PER_STAGE ? limit : QUESTIONS_PER_STAGE} and tap 🔊 to listen. Then take the test: {QUESTIONS_PER_STAGE} questions. Get{" "}
                <strong>⭐⭐⭐⭐</strong> (24 correct) to open the next stage.
              </p>
              <button type="button" onClick={() => go({ mode: "test", seed: view.seed + 1, score: 0, asked: 0 })} className={`${secondaryButton} mt-3`}>
                ▶️ Start the test
              </button>
            </div>
            <ul className="mt-4 grid gap-3">
              {stage.questions.slice(0, limit).map((q, i) => (
                <li key={`${q.id}-${i}`} className="rounded-3xl bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-xl font-extrabold text-ziva">
                      <span aria-hidden="true">{sectionEmoji[q.section]} </span>
                      {q.study.head}
                    </p>
                    <button type="button" onClick={() => speak(q.study.say)} aria-label={`Listen: ${q.study.head}`} className="h-10 w-10 shrink-0 rounded-full bg-ziva/10 text-xl">
                      🔊
                    </button>
                  </div>
                  <p className="mt-1 text-lg font-semibold">{q.study.line}</p>
                  <p className="mt-1 italic text-black/65">“{q.study.sentence}”</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <button type="button" onClick={() => go({ mode: "test", seed: view.seed + 1, score: 0, asked: 0 })} className={primaryButton}>
                ▶️ Start the test
              </button>
            </div>
          </>
        ) : view.mode === "test" ? (
          <div className="mt-4">
            <QuizRunner
              key={`${level}-${stage.n}-${view.seed}`}
              items={items}
              onDone={(correct) => {
                // Only a full stage of 30 counts for stars; the free half of Stage 2 leads to the subscribe screen.
                if (items.length === QUESTIONS_PER_STAGE) recordResult(wordStageKey(level, stage.n), starsFor(correct, QUESTIONS_PER_STAGE));
                go({ mode: "done", score: correct, asked: items.length });
              }}
            />
          </div>
        ) : view.asked < QUESTIONS_PER_STAGE ? (
          <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
            <p className="mb-4 text-center text-lg font-bold">
              You got {view.score} of {view.asked} right. 👏
            </p>
            <Paywall onCheck={access.refresh} />
          </section>
        ) : (
          <div className="mt-4">
            <Finished
              stars={stars}
              message={
                stars >= PASS
                  ? `${view.score} of ${QUESTIONS_PER_STAGE} correct. ${stage.n < stages.length ? `Stage ${stage.n + 1} is open!` : "You finished the whole Word bank! 🏆"}`
                  : `${view.score} of ${QUESTIONS_PER_STAGE} correct. You need 24 to open the next stage. Study the words and try again.`
              }
              onAgain={() => go({ mode: "study" })}
            />
            {stars >= PASS && stage.n < stages.length && (
              <div className="mt-4 flex justify-center">
                <button type="button" onClick={() => go({ stage: stage.n + 1, mode: "study" })} className={primaryButton}>
                  Next: Stage {stage.n + 1} →
                </button>
              </div>
            )}
          </div>
        )}
      </AppShell>
    );
  }

  // ── list of stages ──
  return (
    <AppShell title="Word bank" back="/learn/">
      <div className="flex gap-2" role="group" aria-label="Class">
        {LEVEL_TABS.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={level === l.id}
            onClick={() => setLevel(l.id)}
            className={`rounded-full px-4 py-2 font-bold ${level === l.id ? "bg-ziva text-white" : "bg-black/5 text-black/70"}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-5 text-white shadow">
        <p className="text-2xl font-extrabold">📚 Word bank: {level === "jhs" ? "JHS" : "Primary 4 to 6"}</p>
        <p className="mt-1 text-white/90">
          {SECTIONS.map((s) => `${s.emoji} ${s.title}`).join(" · ")}. {stages.length} stages of {QUESTIONS_PER_STAGE} questions, from 🌱 Beginner to 🌳 Professional. Get{" "}
          <strong>⭐⭐⭐⭐</strong> to open the next stage.
        </p>
        <p className="mt-2 font-bold">
          {passedCount} of {stages.length} stages passed
        </p>
        <span className="mt-1 block h-2 overflow-hidden rounded-full bg-white/25">
          <span className="block h-full rounded-full bg-gold" style={{ width: `${Math.round((passedCount / stages.length) * 100)}%` }} />
        </span>
        <button type="button" onClick={() => go({ stage: current, mode: "study" })} className={`${secondaryButton} mt-3`}>
          {passedCount === stages.length ? "🏆 Practise again" : `▶️ Continue: Stage ${current}`}
        </button>
      </div>

      <ul className="mt-5 grid gap-3">
        {stages.map((s) => {
          const tier = tierOf(s.n, stages.length);
          const isOpen = open(s.n);
          const b = best(s.n);
          const newTier = s.n === 1 || tierOf(s.n - 1, stages.length) !== tier;
          return (
            <li key={s.n}>
              {newTier && (
                <p className="mb-2 mt-2 text-lg font-extrabold">
                  {tier.emoji} {tier.title}
                </p>
              )}
              <button
                type="button"
                disabled={!isOpen}
                onClick={() => go({ stage: s.n, mode: "study" })}
                className={`flex w-full items-center gap-4 rounded-3xl border-2 p-4 text-left shadow-sm ${
                  s.n === current && isOpen ? "border-ziva bg-sky-50" : "border-black/5 bg-white"
                } ${isOpen ? "active:scale-[0.99]" : "opacity-60"}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl font-extrabold">
                  {isOpen ? s.n : "🔒"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-extrabold">Stage {s.n}</span>
                  <span className="block text-sm text-black/60">
                    {QUESTIONS_PER_STAGE} questions · {s.questions.filter((q) => /^[msai]2:/.test(q.id)).length > QUESTIONS_PER_STAGE / 2 ? "Turned round: find the word" : "What does it mean?"}
                  </span>
                  {b > 0 ? <Stars count={b} size="text-lg" /> : <span className="block text-sm font-semibold text-ziva">{isOpen ? "Ready to start" : "Get ⭐⭐⭐⭐ on the stage before"}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
