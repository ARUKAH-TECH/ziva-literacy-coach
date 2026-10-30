"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { VoiceSpeed } from "@/components/VoiceSpeed";
import { Finished, goldButton, primaryButton } from "@/components/ui";
import { shuffle, starsFor } from "@/components/useQueryMode";
import { SPELLING } from "@/content/words";
import { recordResult, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";

const ROUNDS = 8;

export default function SpellingPage() {
  const { progress, loaded } = useProgress();
  const level = progress.level === "kg" || !progress.level ? "p1-3" : progress.level;
  const [seed, setSeed] = useState(0);
  const words = useMemo(() => shuffle(SPELLING[level]).slice(0, ROUNDS), [level, seed]);
  const [i, setI] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const item = words[i];
  const done = i >= words.length;

  const say = () => item && speak(`${item.word}. ${item.sentence} ${item.word}.`, { rate: 0.8 });

  useEffect(() => {
    if (loaded && item && checked === null) {
      say();
      input.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, i]);

  useEffect(() => {
    if (done && loaded) recordResult(`spelling:${level}`, starsFor(score, words.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (!loaded) return <AppShell title="Spelling" back="/learn/">{null}</AppShell>;
  if (done) {
    return (
      <AppShell title="Spelling" back="/learn/">
        <Finished stars={starsFor(score, words.length)} message={`You spelt ${score} of ${words.length} words correctly.`} onAgain={() => (setI(0), setScore(0), setValue(""), setChecked(null), setSeed(seed + 1))} nextHref="/reading/" nextLabel="Read a story" />
      </AppShell>
    );
  }

  const submit = () => {
    if (!value.trim() || checked !== null) return;
    const ok = value.trim().toLowerCase() === item.word.toLowerCase();
    setChecked(ok);
    if (ok) setScore(score + 1);
    speak(ok ? "Correct!" : `The correct spelling is: ${item.word.split("").join(", ")}.`, { rate: 0.85 });
  };

  return (
    <AppShell title="Spelling" back="/learn/">
      <VoiceSpeed className="mb-4" />
      <p className="text-center text-lg font-semibold text-black/60">Word {i + 1} of {words.length} · ⭐ {score}</p>
      <div className="mt-4 flex flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">
        <button type="button" onClick={say} className={goldButton}>🔊 Hear the word</button>
        <p className="text-center text-black/60">Listen, then type the word.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex w-full flex-col items-center gap-3"
        >
          <label htmlFor="spell" className="sr-only">Type the word</label>
          <input
            id="spell"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={checked !== null}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
            className={`w-full max-w-sm rounded-2xl border-4 px-4 py-3 text-center text-3xl font-bold tracking-wider outline-none ${
              checked === null ? "border-ziva/30 focus:border-ziva" : checked ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50"
            }`}
          />
          {checked === null && (
            <button type="submit" disabled={!value.trim()} className={primaryButton}>Check</button>
          )}
        </form>
        {checked !== null && (
          <div role="status" className="text-center">
            <p className="text-2xl font-extrabold">{checked ? "✅ Correct!" : "Not quite."}</p>
            {!checked && (
              <p className="mt-1 text-xl">
                Correct spelling: <span className="font-extrabold tracking-wider text-ziva">{item.word}</span>
              </p>
            )}
            <p className="mt-2 text-black/60">“{item.sentence}”</p>
            <button type="button" onClick={() => (setI(i + 1), setValue(""), setChecked(null))} className={`${primaryButton} mt-4`}>
              Next →
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
