"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Stars, praise, primaryButton, secondaryButton } from "@/components/ui";
import { TracePad, type TraceScore } from "@/components/TracePad";
import { PaperCheck } from "@/components/PaperCheck";
import { TimedWriting } from "@/components/TimedWriting";
import { SETS_FOR_LEVEL, traceSet } from "@/content/handwriting";
import { recordResult, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";

export default function HandwritingPage() {
  const { progress, loaded } = useProgress();
  const sets = SETS_FOR_LEVEL[progress.level ?? "kg"];
  const [setId, setSetId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<TraceScore | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (loaded && !setId) setSetId(sets[0]);
  }, [loaded, setId, sets]);

  const set = setId ? traceSet(setId) : null;
  const item = set?.items[index];

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min((set?.items.length ?? 1) - 1, next)));
    setResult(null);
  };

  return (
    <AppShell title="Handwriting" back="/learn/">
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2">
          {sets.map((id) => {
            const s = traceSet(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={setId === id}
                onClick={() => (setSetId(id), setIndex(0), setResult(null))}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-base font-bold shadow-sm ${setId === id ? "bg-ziva text-white" : "bg-white"}`}
              >
                {s.emoji} {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {set && item && (
        <>
          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous" className="h-12 w-12 rounded-full bg-white text-2xl shadow disabled:opacity-30">
              ‹
            </button>
            <div className="text-center">
              <p className="text-2xl font-extrabold">{item.kind === "stroke" ? item.label : `Trace: ${item.label}`}</p>
              <p className="text-sm text-black/60">
                {index + 1} of {set.items.length}
                {progress.records[`handwriting:${item.id}`] && <> · best <Stars count={progress.records[`handwriting:${item.id}`].best} size="text-sm" /></>}
              </p>
            </div>
            <button type="button" onClick={() => go(index + 1)} disabled={index === set.items.length - 1} aria-label="Next" className="h-12 w-12 rounded-full bg-white text-2xl shadow disabled:opacity-30">
              ›
            </button>
          </div>
          <p className="mt-2 text-center text-black/70">
            {item.kind === "stroke" ? "Start at the green dot and follow the dotted path." : "Trace over the dotted letters. Sit on the red line."}
            {item.kind === "text" && (
              <button type="button" onClick={() => speak(item.text.length === 1 ? `${item.text}` : item.text, { rate: 0.8 })} className="ml-2 font-semibold text-ziva underline">
                🔊 Hear it
              </button>
            )}
          </p>
          <div className="mt-4">
            <TracePad
              key={`${item.id}-${attempt}`}
              item={item}
              onChecked={(score) => {
                setResult(score);
                recordResult(`handwriting:${item.id}`, score.stars);
                speak(score.stars === 0 ? "Let's try again." : praise(score.stars));
              }}
            />
          </div>
          {result && (
            <div role="status" className="mt-5 flex flex-col items-center gap-2 rounded-3xl bg-white p-5 text-center shadow">
              <Stars count={result.stars} size="text-4xl" />
              <p className="text-lg font-bold">{result.tip}</p>
              <p className="text-sm text-black/60">
                Traced {Math.round(result.coverage * 100)}% of the guide · {Math.round(result.accuracy * 100)}% on the line
              </p>
              <div className="mt-2 flex gap-3">
                <button type="button" onClick={() => (setResult(null), setAttempt(attempt + 1))} className={secondaryButton}>🔁 Again</button>
                {index < set.items.length - 1 && (
                  <button type="button" onClick={() => go(index + 1)} className={primaryButton}>Next →</button>
                )}
              </div>
            </div>
          )}
          <PaperCheck
            target={item.kind === "text" ? item.text : item.label}
            prompt={item.kind === "text" ? "Write" : "Draw"}
            level={progress.level ?? "kg"}
            recordKey={`paper:${item.id}`}
          />
          <TimedWriting
            target={item.kind === "text" ? item.text : item.label}
            isShape={item.kind !== "text"}
            level={progress.level ?? "kg"}
            recordKey={item.id}
          />
        </>
      )}
    </AppShell>
  );
}
