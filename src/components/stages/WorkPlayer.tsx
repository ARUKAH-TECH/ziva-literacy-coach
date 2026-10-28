"use client";

import { useEffect, useRef, useState } from "react";
import { Stars, goldButton, primaryButton } from "@/components/ui";
import { TracePad, type TraceScore } from "@/components/TracePad";
import { PASS_STARS, type Work } from "@/content/stages/generate";
import { speak } from "@/lib/speech";

// One work. The result (stars) is reported with onResult. To go on, the
// learner needs at least 4 stars:
//  - tracing: the tracing check must give 4★ or 5★ (try again until it does);
//  - questions and spelling: right first time = 5★; a wrong answer shows the
//    correct one, then the learner must answer again — right then = 4★.

function Listen({ text, label = "🔊" }: { text: string; label?: string }) {
  return (
    <button type="button" onClick={() => speak(text, { rate: 0.85 })} aria-label="Listen" className="shrink-0 rounded-full bg-gold/30 px-3 py-1.5 text-lg">
      {label}
    </button>
  );
}

function TraceWork({ work, onResult }: { work: Extract<Work, { kind: "trace" }>; onResult: (stars: number) => void }) {
  const [score, setScore] = useState<TraceScore | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    setScore(null);
    setAttempt(0);
  }, [work.id]);
  const label = work.item.label;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xl font-extrabold">Trace: <span className="text-ziva">{label}</span></p>
        {work.item.kind === "text" && <Listen text={label} />}
      </div>
      <TracePad
        key={`${work.id}:${attempt}`}
        item={work.item}
        onChecked={(s) => {
          setScore(s);
          onResult(s.stars);
          speak(s.stars >= PASS_STARS ? "Well done!" : "Try again. You can do it!");
        }}
      />
      {score && (
        <div role="status" className={`rounded-2xl p-4 text-center ${score.stars >= PASS_STARS ? "bg-emerald-50" : "bg-amber-50"}`}>
          <Stars count={score.stars} size="text-3xl" />
          <p className="mt-1 font-bold">{score.tip}</p>
          {score.stars < PASS_STARS && (
            <>
              <p className="mt-1 text-amber-900">You need ⭐⭐⭐⭐ to go on. Trace it again slowly.</p>
              <button type="button" onClick={() => (setScore(null), setAttempt(attempt + 1))} className={`${primaryButton} mt-3`}>
                🔁 Try again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ChoiceWork({ work, onResult }: { work: Extract<Work, { kind: "choice" }>; onResult: (stars: number) => void }) {
  const [order, setOrder] = useState<number[]>(() => work.options.map((_, i) => i));
  const [picked, setPicked] = useState<number | null>(null);
  const [missed, setMissed] = useState(false); // got it wrong once
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    setOrder(work.options.map((_, i) => i));
    setPicked(null);
    setMissed(false);
    setResult(null);
    const t = setTimeout(() => speak([work.passage, work.say ?? work.prompt].filter(Boolean).join(". "), { rate: 0.85 }), 250);
    return () => clearTimeout(t);
  }, [work]);

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === work.answer) {
      const stars = missed ? PASS_STARS : 5;
      setResult(stars);
      onResult(stars);
      speak(missed ? "Good. You got it now!" : "Correct! Well done!");
    } else {
      setMissed(true);
      onResult(1);
      speak(`Not quite. The answer is: ${work.options[work.answer]}.`, { rate: 0.85 });
    }
  }

  function retry() {
    // Shuffle the order so the learner reads the options again.
    setOrder((o) => [...o].sort(() => Math.random() - 0.5));
    setPicked(null);
  }

  const wrongNow = picked !== null && picked !== work.answer;
  return (
    <div className="flex flex-col gap-4">
      {work.picture && <p className="text-center text-8xl leading-none" aria-hidden="true">{work.picture}</p>}
      {work.passage && (
        <div className="flex items-start gap-2 rounded-2xl bg-amber-50 p-4">
          <p className="flex-1 text-xl leading-relaxed">{work.passage}</p>
          <Listen text={work.passage} />
        </div>
      )}
      <div className="flex items-center gap-2">
        <p className="flex-1 text-xl font-extrabold">{work.prompt}</p>
        <Listen text={work.say ?? work.prompt} />
      </div>
      <div className={`grid gap-3 ${work.big && work.options.every((o) => o.length < 14) ? "grid-cols-2" : ""}`}>
        {order.map((i) => {
          const o = work.options[i];
          const isAns = i === work.answer;
          const show = picked !== null;
          const tone = show && isAns ? "border-emerald-500 bg-emerald-100" : show && i === picked ? "border-rose-400 bg-rose-100" : "border-black/10 bg-white";
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left font-bold ${work.big ? "text-2xl" : "text-lg"} ${tone}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {wrongNow && (
        <div role="status" className="rounded-2xl bg-amber-50 p-4">
          <p className="font-bold text-amber-900">Not quite. The answer is “{work.options[work.answer]}”.</p>
          {work.explain && <p className="mt-1 text-amber-950">💡 {work.explain}</p>}
          <p className="mt-1 text-amber-900">Now answer it again to get ⭐⭐⭐⭐ and go on.</p>
          <button type="button" onClick={retry} className={`${primaryButton} mt-3`}>🔁 Answer again</button>
        </div>
      )}
      {result !== null && (
        <div role="status" className="rounded-2xl bg-emerald-50 p-4 text-center">
          <Stars count={result} size="text-3xl" />
          {work.explain && <p className="mt-1 text-emerald-950">💡 {work.explain}</p>}
        </div>
      )}
    </div>
  );
}

function SpellWork({ work, onResult }: { work: Extract<Work, { kind: "spell" }>; onResult: (stars: number) => void }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"typing" | "wrong" | "retype" | "done">("typing");
  const [missed, setMissed] = useState(false);
  const [stars, setStars] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const say = () => speak(`${work.word}. ${work.sentence ?? ""} ${work.word}.`, { rate: 0.8 });

  useEffect(() => {
    setValue("");
    setState("typing");
    setMissed(false);
    setStars(0);
    const t = setTimeout(() => {
      say();
      input.current?.focus();
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work.id]);

  function check(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const ok = value.trim().toLowerCase() === work.word.toLowerCase();
    if (ok) {
      const s = missed ? PASS_STARS : 5;
      setStars(s);
      setState("done");
      onResult(s);
      speak(missed ? "Good. You got it now!" : "Correct!");
    } else {
      setMissed(true);
      setState("wrong");
      onResult(1);
      speak(`The correct spelling is: ${work.word.split("").join(", ")}.`, { rate: 0.8 });
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {work.picture && <p className="text-8xl leading-none" aria-hidden="true">{work.picture}</p>}
      <button type="button" onClick={say} className={goldButton}>🔊 Hear the word</button>
      {state === "wrong" ? (
        <div role="status" className="w-full rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-amber-900">You wrote: <span className="font-bold line-through">{value}</span></p>
          <p className="mt-2 text-4xl font-extrabold tracking-widest text-emerald-800">{work.word}</p>
          <p className="mt-2 text-amber-900">Look at the word, say each letter, then hide it and type it again.</p>
          <button type="button" onClick={() => (setValue(""), setState("retype"), setTimeout(() => input.current?.focus(), 50))} className={`${primaryButton} mt-3`}>
            ✍️ Hide it and type again
          </button>
        </div>
      ) : (
        <form onSubmit={check} className="flex w-full flex-col items-center gap-3">
          <p className="text-black/60">{state === "retype" ? "Type it again from memory:" : "Listen, then type the word."}</p>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={state === "done"}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Type the word"
            className="w-full max-w-sm rounded-2xl border-4 border-ziva/30 bg-white px-4 py-3 text-center text-3xl font-bold tracking-wide"
          />
          {state !== "done" && (
            <button type="submit" disabled={!value.trim()} className={primaryButton}>✅ Check</button>
          )}
        </form>
      )}
      {state === "done" && (
        <div role="status" className="w-full rounded-2xl bg-emerald-50 p-4 text-center">
          <Stars count={stars} size="text-3xl" />
          <p className="mt-1 text-2xl font-extrabold">{work.word}</p>
        </div>
      )}
    </div>
  );
}

export function WorkPlayer({ work, onResult }: { work: Work; onResult: (stars: number) => void }) {
  if (work.kind === "trace") return <TraceWork work={work} onResult={onResult} />;
  if (work.kind === "spell") return <SpellWork work={work} onResult={onResult} />;
  return <ChoiceWork work={work} onResult={onResult} />;
}

