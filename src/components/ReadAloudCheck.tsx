"use client";

import { useEffect, useRef, useState } from "react";
import { Stars, goldButton, primaryButton, secondaryButton } from "@/components/ui";
import { starsFor } from "@/components/useQueryMode";
import { useOnline } from "@/components/useOnline";
import { ACCENTS, getAccent, setAccent, type AccentCode } from "@/lib/accent";
import { clock } from "@/lib/levels";
import { hasConsent, setConsent } from "@/lib/consent";
import { alignBest, pronunciationTip, similarity, normalize, soundChunks, splitWords, syllables, type WordResult } from "@/lib/readCheck";
import { recordResult } from "@/lib/progress";
import { speak, stopSpeaking } from "@/lib/speech";

// "Read aloud & check": the child reads each paragraph; the phone's speech
// recognition (Chrome/Google, needs internet) writes down what it heard, and
// the app marks each word and helps with the ones to practise.
// Nothing is recorded or saved by ZIVA.

/* Minimal typing for the browser speech-recognition API. */
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}
// Accents this phone's speech service said it can't do (we then use en-GB).
const unsupportedLangs = new Set<string>();

function newRecognition(): Recognition | null {
  if (typeof window === "undefined") return null;
  const W = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  const R = W.SpeechRecognition ?? W.webkitSpeechRecognition;
  if (!R) return null;
  const r = new R();
  const accent = getAccent();
  // Listen in the reader's own English (e.g. Nigerian), so the accent is understood.
  r.lang = unsupportedLangs.has(accent) ? "en-GB" : accent;
  // Several guesses of what was said: a word counts if any guess matches.
  r.maxAlternatives = 5;
  return r;
}

/** All the phone's guesses for one result, best first. */
function alternatives(result: ArrayLike<{ transcript: string }>) {
  const out: string[] = [];
  for (let i = 0; i < result.length; i++) if (result[i]?.transcript) out.push(result[i].transcript);
  return out;
}

const COLORS: Record<WordResult["status"], string> = {
  ok: "bg-emerald-100 text-emerald-950",
  almost: "bg-amber-200 text-amber-950 underline decoration-wavy decoration-amber-600",
  wrong: "bg-rose-200 text-rose-950 underline decoration-wavy decoration-rose-600",
  missed: "bg-black/10 text-black/50 line-through",
};

function WordHelp({ result, onClose }: { result: WordResult; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "listening" | "good" | "again">("idle");
  const rec = useRef<Recognition | null>(null);
  const chunks = soundChunks(result.word);
  const parts = syllables(result.word);
  const clean = result.word.replace(/[^A-Za-z'’-]/g, "");

  useEffect(() => () => rec.current?.abort(), []);

  function sayIt() {
    const r = newRecognition();
    if (!r) return;
    rec.current = r;
    r.continuous = false;
    r.interimResults = false;
    let heard: string[] = [];
    r.onresult = (e) => {
      heard = e.results[0] ? alternatives(e.results[0]) : [];
    };
    r.onend = () => {
      const ok = heard.some((g) => g.split(/\s+/).some((h) => similarity(normalize(h), normalize(clean)) >= 0.8));
      setState(ok ? "good" : "again");
      speak(ok ? "Well done!" : "Nearly. Listen and try again.");
    };
    r.onerror = (e) => {
      if (e.error === "language-not-supported") unsupportedLangs.add(getAccent());
      setState("again");
    };
    setState("listening");
    r.start();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-label={`Practise ${clean}`} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <p className="text-4xl font-extrabold">{clean}</p>
          <button type="button" onClick={onClose} aria-label="Close" className="h-10 w-10 rounded-full bg-black/5 text-xl">✕</button>
        </div>
        {result.heard && result.status !== "ok" && (
          <p className="mt-1 text-black/60">
            The phone heard: <span className="font-bold">“{result.heard}”</span>
          </p>
        )}
        {result.status === "missed" && <p className="mt-1 text-black/60">This word was skipped.</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => speak(clean, { rate: 0.55 })} className={goldButton}>🐢 Hear it slowly</button>
          <button type="button" onClick={() => speak(clean, { rate: 0.9 })} className={secondaryButton}>🔊 Normal</button>
        </div>
        <p className="mt-4 text-sm font-semibold text-black/60">Sounds</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {chunks.map((c, i) => (
            <button key={i} type="button" onClick={() => speak(c, { rate: 0.6 })} className="rounded-xl bg-sky-100 px-3 py-2 text-xl font-bold">
              {c}
            </button>
          ))}
        </div>
        {parts.length > 1 && (
          <>
            <p className="mt-3 text-sm font-semibold text-black/60">Parts (clap them)</p>
            <p className="mt-1 text-2xl font-extrabold tracking-wide">{parts.join(" · ")}</p>
          </>
        )}
        <p className="mt-4 rounded-2xl bg-amber-50 p-3">💡 {pronunciationTip(clean)}</p>
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={sayIt} disabled={state === "listening"} className={primaryButton}>
            {state === "listening" ? "🎙️ Listening…" : "🎤 Now you say it"}
          </button>
          {state === "good" && <span className="text-lg font-bold text-emerald-700">✅ Well done!</span>}
          {state === "again" && <span className="text-lg font-bold text-amber-700">🔁 Try again</span>}
        </div>
      </div>
    </div>
  );
}

export function ReadAloudCheck({ paragraphs, storyKey, big, wpmTarget }: { paragraphs: string[]; storyKey: string; big: boolean; wpmTarget?: number }) {
  const online = useOnline();
  const [supported, setSupported] = useState(true);
  const [consent, setConsentState] = useState(false);
  const [open, setOpen] = useState(false);
  const [k, setK] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [results, setResults] = useState<WordResult[][]>([]);
  const [help, setHelp] = useState<WordResult | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const rec = useRef<Recognition | null>(null);
  const finalText = useRef("");
  const finalAlts = useRef<string[][]>([]);
  const wantListening = useRef(false);
  const [accent, setAccentState] = useState<AccentCode>("en-NG");
  // Timer: seconds taken for each part, and a live clock while reading.
  const [times, setTimes] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const partStart = useRef(0);
  const tick = useRef<number | null>(null);
  const stopTick = () => {
    if (tick.current !== null) window.clearInterval(tick.current);
    tick.current = null;
  };
  useEffect(() => stopTick, []);

  useEffect(() => {
    setSupported(Boolean(newRecognition()));
    setConsentState(hasConsent("voice"));
    setAccentState(getAccent());
    return () => {
      wantListening.current = false;
      rec.current?.abort();
    };
  }, []);

  const words = splitWords(paragraphs[k] ?? "");

  function start() {
    stopSpeaking();
    const r = newRecognition();
    if (!r) return;
    rec.current = r;
    r.continuous = true;
    r.interimResults = true;
    finalText.current = "";
    finalAlts.current = [];
    setHeard("");
    r.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const text = e.results[i][0]?.transcript ?? "";
        if (e.results[i].isFinal) {
          finalText.current += ` ${text}`;
          finalAlts.current.push(alternatives(e.results[i]));
        } else interim += ` ${text}`;
      }
      setHeard(`${finalText.current} ${interim}`.trim());
    };
    // Phones stop listening after a pause: carry on until "I've finished".
    r.onend = () => {
      if (wantListening.current) {
        try {
          r.start();
        } catch {
          setListening(false);
        }
      } else setListening(false);
    };
    r.onerror = (e) => {
      if (e.error === "language-not-supported" && !unsupportedLangs.has(getAccent())) {
        // This phone can't listen in that accent yet — carry on with en-GB.
        unsupportedLangs.add(getAccent());
        r.lang = "en-GB";
        return; // onend restarts it
      }
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        wantListening.current = false;
        setListening(false);
        stopTick();
        alertMic();
      }
    };
    wantListening.current = true;
    setListening(true);
    r.start();
    partStart.current = performance.now();
    setElapsed(0);
    stopTick();
    tick.current = window.setInterval(() => setElapsed((performance.now() - partStart.current) / 1000), 250);
  }

  const [micBlocked, setMicBlocked] = useState(false);
  function alertMic() {
    setMicBlocked(true);
  }

  function finish() {
    stopTick();
    const took = (performance.now() - partStart.current) / 1000;
    setTimes((t) => {
      const n = [...t];
      n[k] = took;
      return n;
    });
    wantListening.current = false;
    rec.current?.stop();
    setListening(false);
    // Build whole-paragraph guesses from the phone's alternatives.
    const segs = finalAlts.current;
    const guesses = segs.length
      ? Array.from({ length: Math.max(...segs.map((s) => s.length)) }, (_, a) => segs.map((s) => s[a] ?? s[0]).join(" "))
      : [heard];
    // Also mix: each segment's best guess with one segment swapped (cheap and helps a lot).
    if (segs.length > 1) segs.forEach((s, i) => s.slice(1).forEach((alt) => guesses.push(segs.map((x, j) => (j === i ? alt : x[0])).join(" "))));
    const res = alignBest(words, guesses.slice(0, 40));
    const next = [...results];
    next[k] = res;
    setResults(next);
    const good = res.filter((r) => r.status === "ok").length + res.filter((r) => r.status === "almost").length * 0.5;
    speak(good === res.length ? "Excellent reading!" : good / res.length >= 0.8 ? "Good reading! Let's practise a few words." : "Good try! Let's practise some words.");
  }

  const done = showSummary;
  const all = results.flat().filter(Boolean);
  const correct = all.filter((r) => r.status === "ok").length;
  // "Nearly" words get half credit: the word was recognisable.
  const credit = correct + all.filter((r) => r.status === "almost").length * 0.5;
  const totalSeconds = times.reduce((a, b) => a + (b || 0), 0);
  // Words read well per minute (a common way teachers measure reading fluency).
  const wcpm = totalSeconds > 0 ? Math.round((credit / totalSeconds) * 60) : 0;

  useEffect(() => {
    if (done && all.length) recordResult(`read-aloud:${storyKey}`, starsFor(credit, all.length));
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={secondaryButton}>
        🎤 Read aloud &amp; check me
      </button>
    );
  }

  return (
    <section className="mt-4 w-full rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xl font-extrabold">🎤 Read aloud &amp; check</p>
        <button type="button" onClick={() => (wantListening.current = false, rec.current?.abort(), setOpen(false))} className="text-sm text-black/50 underline">
          Close
        </button>
      </div>

      {!supported ? (
        <p className="mt-3 rounded-2xl bg-amber-100 p-4 font-semibold">
          {typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent)
            ? "This iPhone can't listen to reading here. Open the app in Safari, and turn on Siri & Dictation in Settings → Siri (or Keyboard → Enable Dictation)."
            : "This browser can't listen to reading. Open the app in Google Chrome or Microsoft Edge to use this."}
        </p>
      ) : !consent ? (
        <label className="mt-3 flex items-start gap-3 rounded-2xl bg-sky-50 p-4 text-sm">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5"
            onChange={(e) => {
              setConsent("voice", e.target.checked);
              setConsentState(e.target.checked);
            }}
          />
          <span>
            <strong>For a parent or teacher:</strong> to check reading, the phone&apos;s speech service (Google, through Chrome) listens and turns the
            child&apos;s voice into words. It needs internet. ZIVA does not record or save the voice. Tick to allow.
          </span>
        </label>
      ) : !online ? (
        <p className="mt-3 rounded-2xl bg-amber-100 p-4 font-semibold">📴 Connect to the internet to check reading aloud.</p>
      ) : done ? (
        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <Stars count={starsFor(credit, all.length)} size="text-4xl" />
          <p className="text-xl font-bold">
            {correct} of {all.length} words read well
          </p>
          {totalSeconds > 0 && (
            <div className="w-full rounded-2xl bg-sky-50 p-4">
              <p className="text-3xl font-extrabold tabular-nums text-ziva">⏱️ {clock(totalSeconds)}</p>
              <p className="text-lg font-bold">{wcpm} words a minute read well</p>
              {wpmTarget && (
                <p className="text-sm text-black/60">
                  Guide for this class: about {wpmTarget} a minute.{" "}
                  {credit / all.length < 0.8 ? "Read every word clearly first — then speed up." : wcpm >= wpmTarget ? "Great pace! 🚀" : wcpm >= wpmTarget * 0.7 ? "Nearly there — read it again tomorrow." : "Read every word clearly first; speed grows with practice."}
                </p>
              )}
              {paragraphs.length > 1 && (
                <p className="mt-1 text-xs text-black/50">
                  {times.map((t, i) => (t ? `Part ${i + 1}: ${clock(t)}` : null)).filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          )}
          {all.some((r) => r.status !== "ok") ? (
            <>
              <p className="text-black/70">Tap a word to hear it and practise:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[...new Map(all.filter((r) => r.status !== "ok").map((r) => [normalize(r.word), r])).values()].map((r) => (
                  <button key={r.word} type="button" onClick={() => setHelp(r)} className={`rounded-xl px-3 py-2 text-lg font-bold ${COLORS[r.status]}`}>
                    {r.word.replace(/[^A-Za-z'’-]/g, "")}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-lg">Every word read clearly. Amazing! 🌟</p>
          )}
          <button type="button" onClick={() => (setResults([]), setTimes([]), setK(0), setHeard(""), setShowSummary(false))} className={secondaryButton}>
            🔁 Read again
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <label className="mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm">
            <span className="font-semibold">🌍 Reader&apos;s English:</span>
            <select
              value={accent}
              disabled={listening}
              onChange={(e) => {
                const code = e.target.value as AccentCode;
                setAccent(code);
                setAccentState(code);
              }}
              className="rounded-lg border border-black/15 bg-white px-2 py-1 font-semibold"
            >
              {ACCENTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
            <span className="w-full text-black/60">We check that each word is said correctly — not whether it sounds British or American.</span>
          </label>
          <p className="text-sm font-semibold text-black/60">
            Part {k + 1} of {paragraphs.length} — tap <strong>Start</strong>, read this aloud, then tap <strong>I&apos;ve finished</strong>.
          </p>
          <p className={`mt-3 flex flex-wrap gap-x-1.5 gap-y-2 rounded-2xl bg-amber-50 p-4 ${big ? "text-3xl leading-snug" : "text-2xl leading-snug"}`}>
            {(results[k] ?? words.map((w) => ({ word: w, status: "ok" as const }))).map((r, i) => (
              <button
                key={i}
                type="button"
                disabled={!results[k]}
                onClick={() => setHelp(r)}
                className={`rounded-lg px-1 ${results[k] ? COLORS[r.status] : ""}`}
              >
                {r.word}
              </button>
            ))}
          </p>
          {micBlocked && (
            <p role="alert" className="mt-3 rounded-2xl bg-rose-100 p-3 font-semibold text-rose-900">
              The microphone is blocked. In Chrome tap ⋮ → Settings → Site settings → Microphone, and allow learn.zivarukah.com.
            </p>
          )}
          {listening && (
            <p aria-live="off" className="mt-3 text-center text-4xl font-extrabold tabular-nums text-ziva">
              ⏱️ {clock(elapsed)}
            </p>
          )}
          {listening && (
            <p className="mt-3 min-h-[3rem] rounded-xl bg-black/5 p-3 text-black/70">
              🎙️ <em>{heard || "Listening… start reading"}</em>
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            {!results[k] &&
              (listening ? (
                <button type="button" onClick={finish} className={goldButton}>
                  ✅ I&apos;ve finished
                </button>
              ) : (
                <button type="button" onClick={start} className={primaryButton}>
                  🎤 Start
                </button>
              ))}
            {results[k] && (
              <>
                {times[k] ? (
                  <p className="w-full text-lg font-bold">
                    ⏱️ {clock(times[k])} ·{" "}
                    {Math.round((results[k].filter((r) => r.status !== "missed" && r.status !== "wrong").length / times[k]) * 60)} words a minute
                  </p>
                ) : null}
                <p className="w-full text-sm text-black/70">
                  🟩 read well · 🟨 nearly · 🟥 different word · ⬜ skipped — <strong>tap a coloured word for help</strong>.
                </p>
                <button type="button" onClick={() => (setResults(results.map((r, i) => (i === k ? (undefined as unknown as WordResult[]) : r))), setTimes(times.map((t, i) => (i === k ? 0 : t))), setHeard(""))} className={secondaryButton}>
                  🔁 Read this part again
                </button>
                {k < paragraphs.length - 1 ? (
                  <button type="button" onClick={() => (setK(k + 1), setHeard(""))} className={primaryButton}>
                    Next part →
                  </button>
                ) : (
                  <button type="button" onClick={() => setShowSummary(true)} className={primaryButton}>
                    See my result
                  </button>
                )}
              </>
            )}
          </div>
          <p className="mt-3 text-xs text-black/50">
            Your accent is fine — saying words the way they are spelt is correct reading. The phone&apos;s listening isn&apos;t perfect and noise can confuse it. Read clearly in a quiet place. A teacher or parent knows best.
          </p>
        </div>
      )}
      {help && <WordHelp result={help} onClose={() => setHelp(null)} />}
    </section>
  );
}
