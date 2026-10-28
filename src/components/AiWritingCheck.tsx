"use client";

import { useEffect, useState } from "react";
import { Stars, goldButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { aiCheckHandwriting, type AiFeedback } from "@/lib/aiCheck";
import { hasConsent, setConsent } from "@/lib/consent";
import { photoForUpload } from "@/lib/handwritingCheck";
import { speak } from "@/lib/speech";
import { compareWriting, type Mark, type MarkedChar } from "@/lib/writingDiff";

const CORRECT_STYLE: Record<Mark, string> = {
  ok: "",
  fix: "rounded bg-emerald-200 font-black text-emerald-900 underline decoration-emerald-600 decoration-4 underline-offset-4",
  case: "rounded bg-amber-200 font-black text-amber-950 underline decoration-amber-600 decoration-4 underline-offset-4",
  shape: "rounded bg-orange-100 underline decoration-orange-500 decoration-dotted decoration-4 underline-offset-4",
  wrong: "",
  extra: "",
};
const WROTE_STYLE: Record<Mark, string> = {
  ok: "",
  fix: "",
  case: "rounded bg-amber-200 text-amber-950",
  shape: "",
  wrong: "rounded bg-rose-200 text-rose-900 underline decoration-wavy decoration-rose-600",
  extra: "rounded bg-rose-100 text-rose-800 line-through decoration-rose-600 decoration-2",
};

function Line({ words, style, big }: { words: MarkedChar[][]; style: Record<Mark, string>; big?: boolean }) {
  return (
    <p className={`flex flex-wrap gap-x-4 gap-y-2 break-words ${big ? "text-4xl leading-tight" : "text-2xl leading-snug"} font-semibold tracking-wide`}>
      {words.map((w, i) => (
        <span key={i} className="whitespace-nowrap">
          {w.map((c, k) => (
            <span key={k} className={`px-[1px] ${style[c.mark]}`}>
              {c.ch}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}

/**
 * Optional AI check of a handwriting photo (or video frame). It reads the
 * writing, then the app rewrites the exercise correctly and marks every part
 * to fix. Needs a parent/teacher's consent and internet; the photo is not saved.
 */
export function AiWritingCheck({ image, target, level, isShape = false }: { image: Blob | null; target: string; level: string; isShape?: boolean }) {
  const online = useOnline();
  const [consent, setConsentState] = useState(false);
  const [ai, setAi] = useState<AiFeedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setConsentState(hasConsent("ai-photo")), []);
  useEffect(() => {
    setAi(null);
    setError(null);
  }, [image, target]);

  async function run() {
    if (!image) return;
    setBusy(true);
    setError(null);
    try {
      const data = await photoForUpload(image);
      const res = await aiCheckHandwriting(data, target, level);
      if (res.ok) {
        setAi(res);
        speak(res.summary || "Here is your feedback.");
      } else setError(res.message);
    } catch {
      setError("That picture couldn't be prepared. Please try another photo.");
    } finally {
      setBusy(false);
    }
  }

  const compared = ai && ai.readText && !isShape ? compareWriting(target, ai.readText, ai.letters.map((l) => l.letter)) : null;

  return (
    <div className="rounded-2xl border-2 border-dashed border-ziva/30 p-4">
      <p className="font-bold">🤖 AI check — reads your writing and rewrites it correctly (needs internet)</p>
      {!consent ? (
        <label className="mt-2 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5"
            onChange={(e) => {
              setConsent("ai-photo", e.target.checked);
              setConsentState(e.target.checked);
            }}
          />
          <span>
            <strong>For a parent or teacher:</strong> I agree to send this picture of handwriting to the ZIVA AI checker so it can read the writing.
            Only the picture is sent — no name. It is not saved. Please show only the paper, not the child.
          </span>
        </label>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button type="button" onClick={run} disabled={busy || !online || !image} className={goldButton}>
            {busy ? "Reading your writing…" : ai ? "🤖 Check again" : "🤖 AI check"}
          </button>
          {!online && <span className="text-sm font-semibold text-amber-800">Connect to the internet to use the AI check.</span>}
          <button
            type="button"
            onClick={() => {
              setConsent("ai-photo", false);
              setConsentState(false);
            }}
            className="text-xs text-black/50 underline"
          >
            Turn off AI check
          </button>
        </div>
      )}
      {error && <p role="alert" className="mt-3 font-semibold text-rose-700">{error}</p>}

      {ai && (
        <div role="status" className="mt-4 flex flex-col gap-3">
          <Stars count={ai.stars} size="text-3xl" />
          {ai.summary && <p className="text-lg font-semibold">{ai.summary}</p>}

          {compared ? (
            <>
              <div className="rounded-2xl bg-black/5 p-4">
                <p className="mb-2 text-sm font-bold text-black/60">✍️ What you wrote</p>
                <Line words={compared.wrote} style={WROTE_STYLE} />
              </div>
              <div className="rounded-2xl bg-white p-4 ring-2 ring-emerald-400">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-emerald-800">✅ Correct writing</p>
                  <button type="button" onClick={() => speak(target, { rate: 0.8 })} className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-900">
                    🔊 Listen
                  </button>
                </div>
                <Line words={compared.correct} style={CORRECT_STYLE} big />
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-black/60">
                  <span><span className="rounded bg-emerald-200 px-1 font-bold">a</span> letter to fix or add</span>
                  <span><span className="rounded bg-amber-200 px-1 font-bold">A</span> capital / small letter</span>
                  <span><span className="rounded bg-orange-100 px-1 underline decoration-dotted decoration-orange-500">g</span> make the shape neater</span>
                  <span><span className="rounded bg-rose-200 px-1">x</span> mistake in your writing</span>
                </p>
              </div>
              {compared.perfect ? (
                <p className="rounded-2xl bg-emerald-50 p-4 text-lg font-bold text-emerald-900">🌟 Every word is correct!</p>
              ) : (
                <div className="rounded-2xl bg-rose-50 p-4">
                  <p className="font-bold text-rose-900">🔧 Corrections</p>
                  <ol className="mt-2 list-decimal pl-5 text-rose-950">
                    {compared.corrections.map((c) => (
                      <li key={c} className="mt-1">{c}</li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          ) : (
            <p className="rounded-xl bg-black/5 p-3">
              <span className="text-sm text-black/60">The AI read:</span> <span className="font-bold">{ai.readText ? `“${ai.readText}”` : "(nothing clear)"}</span>
            </p>
          )}

          {ai.letters.length > 0 && (
            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="font-bold text-orange-900">🔤 Letter shapes</p>
              <ul className="mt-2 flex flex-col gap-2">
                {ai.letters.map((l, i) => (
                  <li key={i} className="rounded-xl bg-white p-3">
                    <span className="text-2xl font-extrabold">{l.letter}</span> <span className="text-orange-950">{l.issue}</span>
                    {l.tip && <p className="mt-1 text-sm text-black/70">💡 {l.tip}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {ai.strengths.length > 0 && <ul className="list-disc rounded-2xl bg-emerald-50 p-4 pl-8 text-emerald-950">{ai.strengths.map((s) => <li key={s}>{s}</li>)}</ul>}
          {ai.nextSteps.length > 0 && (
            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="font-bold text-sky-900">👉 What to practise next</p>
              <ul className="mt-1 list-disc pl-5 text-sky-950">{ai.nextSteps.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          )}
          {compared && !compared.perfect && (
            <p className="rounded-2xl bg-sky-100 p-3 font-semibold text-sky-950">✏️ Now copy the correct writing once more, then check again.</p>
          )}
          <p className="text-xs text-black/50">AI feedback can make mistakes — a teacher or parent knows best.</p>
        </div>
      )}
    </div>
  );
}
