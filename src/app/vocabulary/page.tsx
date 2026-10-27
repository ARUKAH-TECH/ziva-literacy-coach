"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Finished } from "@/components/ui";
import { QuizRunner } from "@/components/QuizRunner";
import { shuffle, starsFor } from "@/components/useQueryMode";
import { VOCABULARY } from "@/content/words";
import { recordResult, useProgress } from "@/lib/progress";

export default function VocabularyPage() {
  const { progress, loaded } = useProgress();
  const level = progress.level === "jhs" ? "jhs" : "p4-6";
  const [seed, setSeed] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const items = useMemo(
    () =>
      shuffle(VOCABULARY[level]).map((v) => ({
        prompt: (
          <>
            What does <span className="text-ziva">“{v.word}”</span> mean?
            <span className="mt-2 block text-base font-normal italic text-black/60">{v.sentence}</span>
          </>
        ),
        say: `What does ${v.word} mean? ${v.sentence}`,
        options: v.options,
        answer: v.answer,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, seed],
  );
  return (
    <AppShell title="Word meanings" back="/learn/">
      {!loaded ? null : score !== null ? (
        <Finished stars={starsFor(score, items.length)} message={`${score} of ${items.length} meanings correct.`} onAgain={() => (setScore(null), setSeed(seed + 1))} nextHref="/punctuation/" nextLabel="Punctuation" />
      ) : (
        <QuizRunner
          key={seed}
          items={items}
          onDone={(correct) => {
            recordResult(`vocabulary:${level}`, starsFor(correct, items.length));
            setScore(correct);
          }}
        />
      )}
    </AppShell>
  );
}
