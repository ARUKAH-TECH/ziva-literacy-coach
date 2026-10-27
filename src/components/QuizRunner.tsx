"use client";

import { useState } from "react";
import { primaryButton } from "@/components/ui";
import { speak } from "@/lib/speech";

export interface QuizItem {
  prompt: React.ReactNode;
  /** Read aloud when the speaker button is tapped. */
  say?: string;
  options: string[];
  answer: number;
  explain?: string;
}

/** One question at a time with instant, kind feedback. */
export function QuizRunner({ items, onDone, bigOptions = false }: { items: QuizItem[]; onDone: (correct: number) => void; bigOptions?: boolean }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const item = items[i];
  if (!item) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-lg font-semibold text-black/60">
        Question {i + 1} of {items.length} · ⭐ {correct}
      </p>
      <div className="rounded-3xl bg-white p-5 text-xl font-bold shadow-sm">
        {item.prompt}
        {item.say && (
          <button type="button" onClick={() => speak(item.say!)} aria-label="Read the question aloud" className="ml-2 align-middle text-2xl">
            🔊
          </button>
        )}
      </div>
      <div className="grid gap-3">
        {item.options.map((option, k) => {
          const right = k === item.answer;
          const look =
            picked === null ? "bg-white border-black/10" : right ? "bg-green-100 border-green-600" : picked === k ? "bg-red-100 border-red-500" : "bg-white border-black/5 opacity-60";
          return (
            <button
              key={k}
              type="button"
              disabled={picked !== null}
              onClick={() => {
                setPicked(k);
                if (right) setCorrect(correct + 1);
                speak(right ? "Correct!" : "Not quite.");
              }}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left ${bigOptions ? "text-xl" : "text-lg"} font-semibold ${look}`}
            >
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ziva/10 font-extrabold text-ziva">
                {picked !== null && right ? "✓" : picked === k ? "✗" : String.fromCharCode(65 + k)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div role="status" className={`rounded-2xl p-4 text-lg ${picked === item.answer ? "bg-green-50 text-green-900" : "bg-amber-50 text-amber-900"}`}>
          <p className="font-bold">{picked === item.answer ? "✅ Correct!" : `The answer is: ${item.options[item.answer]}`}</p>
          {item.explain && <p className="mt-1">{item.explain}</p>}
        </div>
      )}
      {picked !== null && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (i + 1 >= items.length) onDone(correct);
              else {
                setI(i + 1);
                setPicked(null);
              }
            }}
            className={primaryButton}
          >
            {i + 1 >= items.length ? "See my stars" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
