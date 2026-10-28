"use client";

import { useEffect, useRef, useState } from "react";
import { Stars, primaryButton, secondaryButton, goldButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { checkPaperHandwriting, photoForUpload, type PaperCheck as Result } from "@/lib/handwritingCheck";
import { aiCheckHandwriting, type AiFeedback } from "@/lib/aiCheck";
import { hasConsent, setConsent } from "@/lib/consent";
import { recordResult } from "@/lib/progress";
import { speak } from "@/lib/speech";

const LABELS: Record<keyof Result["scores"], string> = {
  size: "Letter size",
  line: "On the line",
  spacing: "Spacing",
  slant: "Straight letters",
  neat: "Neatness",
};

function Meter({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  const color = value >= 0.7 ? "bg-emerald-500" : value >= 0.45 ? "bg-amber-400" : "bg-rose-400";
  return (
    <div>
      <div className="flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span>{value >= 0.7 ? "👍" : value >= 0.45 ? "🙂" : "✍️"}</span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-black/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(6, pct)}%` }} />
      </div>
    </div>
  );
}

/**
 * Write on paper, then take or upload a photo. The phone checks how the
 * writing looks (private, works offline). With a parent/teacher's consent
 * and internet, an AI check can also read the letters.
 */
export function PaperCheck({ target, prompt, level, recordKey }: { target: string; prompt: string; level: string; recordKey: string }) {
  const online = useOnline();
  const camera = useRef<HTMLInputElement>(null);
  const gallery = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [consent, setConsentState] = useState(false);
  const [ai, setAi] = useState<AiFeedback | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => setConsentState(hasConsent("ai-photo")), []);
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);
  useEffect(() => {
    // New exercise → start fresh.
    setPhoto(null);
    setPreview(null);
    setResult(null);
    setProblem(null);
    setAi(null);
    setAiError(null);
  }, [target]);

  async function onPick(file: File | undefined) {
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setProblem(null);
    setAi(null);
    setAiError(null);
    setBusy(true);
    const check = await checkPaperHandwriting(file);
    setBusy(false);
    if (check.ok) {
      setResult(check);
      recordResult(recordKey, check.stars);
      speak(check.stars >= 4 ? "Lovely writing!" : "Good work. Look at the tips to make it even better.");
    } else {
      setProblem(check.message);
    }
  }

  async function runAi() {
    if (!photo) return;
    setAiBusy(true);
    setAiError(null);
    try {
      const image = await photoForUpload(photo);
      const res = await aiCheckHandwriting(image, target, level);
      if (res.ok) {
        setAi(res);
        speak(res.summary || "Here is your feedback.");
      } else setAiError(res.message);
    } catch {
      setAiError("That photo couldn't be prepared. Please try another photo.");
    } finally {
      setAiBusy(false);
    }
  }

  return (
    <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-xl font-extrabold">📷 Check writing on paper</p>
      <p className="mt-1 text-black/70">
        {prompt} <span className="font-bold text-ziva">“{target}”</span> on paper, then take a clear photo.
      </p>

      <input ref={camera} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onPick(e.target.files?.[0])} />
      <input ref={gallery} type="file" accept="image/*" className="hidden" onChange={(e) => onPick(e.target.files?.[0])} />
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => camera.current?.click()} className={primaryButton}>
          📸 Take photo
        </button>
        <button type="button" onClick={() => gallery.current?.click()} className={secondaryButton}>
          🖼️ Upload photo
        </button>
      </div>
      <p className="mt-2 text-sm text-black/50">Tip: good light, paper flat, writing fills most of the photo.</p>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element -- local photo preview, never uploaded unless AI check is chosen
        <img src={preview} alt="Your handwriting photo" className="mt-4 max-h-64 w-full rounded-2xl object-contain ring-1 ring-black/10" />
      )}
      {busy && <p className="mt-4 text-lg font-semibold">🔎 Checking your writing…</p>}
      {problem && <p role="alert" className="mt-4 rounded-2xl bg-amber-100 p-4 font-semibold text-amber-950">{problem}</p>}

      {result && (
        <div role="status" className="mt-5 flex flex-col gap-4">
          <div className="text-center">
            <Stars count={result.stars} size="text-4xl" />
            <p className="mt-1 text-sm text-black/60">
              Checked on this phone · {result.letters} letters found on {result.lines} line{result.lines === 1 ? "" : "s"}
            </p>
          </div>
          <div className="grid gap-3">
            {(Object.keys(LABELS) as (keyof Result["scores"])[]).map((k) => (
              <Meter key={k} label={LABELS[k]} value={result.scores[k]} />
            ))}
          </div>
          {result.strengths.length > 0 && (
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="font-bold text-emerald-900">✅ Well done</p>
              <ul className="mt-1 list-disc pl-5 text-emerald-950">{result.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          )}
          {result.next.length > 0 && (
            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="font-bold text-sky-900">👉 To improve</p>
              <ul className="mt-1 list-disc pl-5 text-sky-950">{result.next.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          )}
          <p className="text-xs text-black/50">The phone check looks at size, lines, spacing and neatness. It can&apos;t read which letters you wrote — use the AI check for that.</p>

          {/* Optional AI check */}
          <div className="rounded-2xl border-2 border-dashed border-ziva/30 p-4">
            <p className="font-bold">🤖 AI check — reads the letters (needs internet)</p>
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
                  <strong>For a parent or teacher:</strong> I agree to send this photo of handwriting to the ZIVA AI checker so it can read the
                  writing. Only the photo is sent — no name. It is not saved. Please photograph only the paper, not the child.
                </span>
              </label>
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button type="button" onClick={runAi} disabled={aiBusy || !online} className={goldButton}>
                  {aiBusy ? "Reading your writing…" : "🤖 AI check"}
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
            {aiError && <p role="alert" className="mt-3 font-semibold text-rose-700">{aiError}</p>}
            {ai && (
              <div role="status" className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Stars count={ai.stars} size="text-3xl" />
                </div>
                {ai.summary && <p className="text-lg font-semibold">{ai.summary}</p>}
                <p className="rounded-xl bg-black/5 p-3">
                  <span className="text-sm text-black/60">The AI read:</span>{" "}
                  <span className="font-bold">{ai.readText ? `“${ai.readText}”` : "(nothing clear)"}</span>
                  {ai.readText && (
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-sm font-bold ${ai.matchesTarget ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
                      {ai.matchesTarget ? "✅ Matches" : "✍️ Not quite the same"}
                    </span>
                  )}
                </p>
                {ai.letters.length > 0 && (
                  <div className="rounded-2xl bg-rose-50 p-4">
                    <p className="font-bold text-rose-900">🔤 Letters to fix</p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {ai.letters.map((l, i) => (
                        <li key={i} className="rounded-xl bg-white p-3">
                          <span className="text-2xl font-extrabold">{l.letter}</span> <span className="text-rose-900">{l.issue}</span>
                          {l.tip && <p className="mt-1 text-sm text-black/70">💡 {l.tip}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {ai.strengths.length > 0 && (
                  <ul className="list-disc rounded-2xl bg-emerald-50 p-4 pl-8 text-emerald-950">{ai.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
                )}
                {ai.nextSteps.length > 0 && (
                  <div className="rounded-2xl bg-sky-50 p-4">
                    <p className="font-bold text-sky-900">👉 What to practise next</p>
                    <ul className="mt-1 list-disc pl-5 text-sky-950">{ai.nextSteps.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                )}
                <p className="text-xs text-black/50">AI feedback can make mistakes — a teacher or parent knows best.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
