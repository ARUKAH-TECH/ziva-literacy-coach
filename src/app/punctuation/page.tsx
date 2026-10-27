"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Finished } from "@/components/ui";
import { QuizRunner } from "@/components/QuizRunner";
import { shuffle, starsFor } from "@/components/useQueryMode";
import { PUNCTUATION } from "@/content/words";
import { recordResult, useProgress } from "@/lib/progress";

export default function PunctuationPage() {
  const { progress, loaded } = useProgress();
  const level = progress.level === "jhs" ? "jhs" : "p4-6";
  const [seed, setSeed] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const items = useMemo(
    () =>
      shuffle(PUNCTUATION[level]).map((p) => {
        const order = shuffle(p.options.map((_, k) => k));
        return {
          prompt: "Which sentence is punctuated correctly?",
          options: order.map((k) => p.options[k]),
          answer: order.indexOf(p.answer),
          explain: p.tip,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, seed],
  );
  return (
    <AppShell title="Punctuation" back="/learn/">
      {!loaded ? null : score !== null ? (
        <Finished stars={starsFor(score, items.length)} message={`${score} of ${items.length} correct.`} onAgain={() => (setScore(null), setSeed(seed + 1))} nextHref="/spelling/" nextLabel="Spelling" />
      ) : (
        <QuizRunner
          key={seed}
          items={items}
          onDone={(correct) => {
            recordResult(`punctuation:${level}`, starsFor(correct, items.length));
            setScore(correct);
          }}
        />
      )}
    </AppShell>
  );
}
