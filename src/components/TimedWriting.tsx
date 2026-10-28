"use client";

import { useEffect, useRef, useState } from "react";
import { Stars, goldButton, primaryButton, secondaryButton } from "@/components/ui";
import { AiWritingCheck } from "@/components/AiWritingCheck";
import { hasConsent, setConsent } from "@/lib/consent";
import { checkPaperHandwriting, type PaperCheck } from "@/lib/handwritingCheck";
import { WRITING_LPM, clock, type LevelId } from "@/lib/levels";
import { recordResult } from "@/lib/progress";
import { speak } from "@/lib/speech";

// Timed writing: a stopwatch (and, if allowed, a video of the paper) while
// the child writes. Shows the time taken and letters per minute, then checks
// the finished writing from the last video frame.
// The video stays on this phone — it is never uploaded. It is gone when the
// page closes unless the parent taps "Save video".

const MAX_SECONDS = 180;

function pickMime() {
  if (typeof MediaRecorder === "undefined") return null;
  for (const m of ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"]) {
    if (MediaRecorder.isTypeSupported?.(m)) return m;
  }
  return "";
}

const lettersIn = (text: string) => (text.match(/[A-Za-z]/g) ?? []).length;

type Phase = "idle" | "ready" | "countdown" | "writing" | "done";

export function TimedWriting({ target, isShape, level, recordKey }: { target: string; isShape: boolean; level: LevelId; recordKey: string }) {
  const [consent, setConsentState] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [useVideo, setUseVideo] = useState(true);
  const [count, setCount] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoExt, setVideoExt] = useState("webm");
  const [check, setCheck] = useState<PaperCheck | null>(null);
  const [frameImg, setFrameImg] = useState<Blob | null>(null);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  useEffect(() => {
    const u = frameImg ? URL.createObjectURL(frameImg) : null;
    setFrameUrl(u);
    return () => void (u && URL.revokeObjectURL(u));
  }, [frameImg]);
  const [problem, setProblem] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const live = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startedAt = useRef(0);
  const timer = useRef<number | null>(null);

  // Short targets (one letter or a short word) are written 5 times so the
  // timing means something.
  const letters = lettersIn(target);
  const repeats = isShape ? 3 : letters <= 3 ? 5 : 1;
  const totalLetters = letters * repeats;
  const guide = WRITING_LPM[level];

  useEffect(() => setConsentState(hasConsent("video")), []);

  // Show the camera once the preview box is on screen.
  useEffect(() => {
    const v = live.current;
    if (phase === "ready" && v && stream.current && v.srcObject !== stream.current) {
      v.srcObject = stream.current;
      v.play().catch(() => {});
    }
  }, [phase]);

  function stopCamera() {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  }
  function clearTimer() {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  }
  function reset() {
    clearTimer();
    stopCamera();
    if (recorder.current?.state === "recording") recorder.current.stop();
    setVideoUrl((u) => (u && URL.revokeObjectURL(u), null));
    setCheck(null);
    setFrameImg(null);
    setProblem(null);
    setElapsed(0);
    setSeconds(0);
    setPhase("idle");
  }

  // New exercise or leaving the page → stop everything.
  useEffect(() => reset, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    reset();
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

  async function open(withVideo: boolean) {
    setCameraError(null);
    setUseVideo(withVideo);
    if (withVideo) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        stream.current = s;
        setPhase("ready");
      } catch {
        setCameraError("The camera couldn't open. In Chrome tap ⋮ → Settings → Site settings → Camera and allow this app — or use the timer without video.");
        setUseVideo(false);
      }
    } else setPhase("ready");
  }

  function begin() {
    setPhase("countdown");
    setCount(3);
    speak("Ready");
    let n = 3;
    const id = window.setInterval(() => {
      n -= 1;
      if (n > 0) setCount(n);
      else {
        window.clearInterval(id);
        go();
      }
    }, 1000);
  }

  function go() {
    speak("Go!");
    chunks.current = [];
    const mime = pickMime();
    if (useVideo && stream.current && mime !== null) {
      try {
        const r = mime ? new MediaRecorder(stream.current, { mimeType: mime, videoBitsPerSecond: 1_200_000 }) : new MediaRecorder(stream.current);
        r.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
        r.onstop = () => {
          const type = r.mimeType || mime || "video/webm";
          setVideoExt(type.includes("mp4") ? "mp4" : "webm");
          setVideoUrl(URL.createObjectURL(new Blob(chunks.current, { type })));
        };
        r.start(1000);
        recorder.current = r;
      } catch {
        recorder.current = null; // timer still works
      }
    }
    startedAt.current = performance.now();
    setElapsed(0);
    setPhase("writing");
    timer.current = window.setInterval(() => {
      const s = (performance.now() - startedAt.current) / 1000;
      setElapsed(s);
      if (s >= MAX_SECONDS) finish();
    }, 250);
  }

  async function lastFrame(): Promise<Blob | null> {
    const v = live.current;
    if (!v || !v.videoWidth) return null;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")?.drawImage(v, 0, 0);
    return new Promise((res) => c.toBlob((b) => res(b), "image/jpeg", 0.9));
  }

  async function finish() {
    if (timer.current === null) return;
    clearTimer();
    const s = (performance.now() - startedAt.current) / 1000;
    setSeconds(s);
    setElapsed(s);
    const frame = useVideo ? await lastFrame() : null;
    if (recorder.current?.state === "recording") recorder.current.stop();
    stopCamera();
    setPhase("done");

    const lpm = !isShape && s > 0 ? Math.round((totalLetters / s) * 60) : null;
    const speedStars = lpm === null ? 0 : lpm >= guide ? 5 : lpm >= guide * 0.8 ? 4 : lpm >= guide * 0.6 ? 3 : lpm >= guide * 0.4 ? 2 : 1;
    if (lpm !== null) recordResult(`write-speed:${recordKey}`, speedStars);
    speak(lpm === null ? `Done in ${Math.round(s)} seconds.` : `Done! ${lpm} letters a minute.`);

    setFrameImg(frame);
    if (frame) {
      const result = await checkPaperHandwriting(frame);
      if (result.ok) setCheck(result);
      else setProblem(`Neatness check: ${result.message}`);
    }
  }

  const lpm = phase === "done" && !isShape && seconds > 0 ? Math.round((totalLetters / seconds) * 60) : null;
  const speedStars = lpm === null ? 0 : lpm >= guide ? 5 : lpm >= guide * 0.8 ? 4 : lpm >= guide * 0.6 ? 3 : lpm >= guide * 0.4 ? 2 : 1;
  const instruction = `${isShape ? "Draw" : "Write"} “${target}”${repeats > 1 ? ` ${repeats} times` : ""}`;

  let advice = "";
  if (lpm !== null) {
    const neat = check?.stars ?? null;
    if (neat !== null && neat <= 2 && lpm >= guide * 0.8) advice = "Good speed — now slow down a little and make every letter neat. Neat first, then fast.";
    else if (lpm >= guide) advice = neat !== null && neat >= 4 ? "Fast and neat — excellent!" : "Great speed for your class!";
    else if (lpm >= guide * 0.6) advice = "Good pace. Practise a little every day and your speed will grow.";
    else advice = "Take your time and form each letter well — speed comes with daily practice. Try writing the same words again tomorrow.";
  }

  return (
    <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-xl font-extrabold">⏱️ Timed writing</p>
      <p className="mt-1 text-black/70">
        How fast do you write? <span className="font-bold text-ziva">{instruction}</span> on paper while the timer runs.
      </p>

      {phase === "idle" && (
        <div className="mt-4 flex flex-col gap-3">
          {!consent ? (
            <label className="flex items-start gap-3 rounded-2xl bg-sky-50 p-4 text-sm">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5"
                onChange={(e) => {
                  setConsent("video", e.target.checked);
                  setConsentState(e.target.checked);
                }}
              />
              <span>
                <strong>For a parent or teacher:</strong> allow the camera to film the paper while the child writes. Point it at the paper and hand
                only — not the child&apos;s face. The video stays on this phone and is never sent anywhere.
              </span>
            </label>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={!consent} onClick={() => open(true)} className={`${primaryButton} disabled:opacity-40`}>
              🎥 Record with video
            </button>
            <button type="button" onClick={() => open(false)} className={secondaryButton}>
              ⏱️ Timer only
            </button>
          </div>
          {cameraError && <p role="alert" className="rounded-2xl bg-amber-100 p-3 font-semibold text-amber-950">{cameraError}</p>}
        </div>
      )}

      {(phase === "ready" || phase === "countdown" || phase === "writing") && (
        <div className="mt-4 flex flex-col items-center gap-3">
          {useVideo && (
            <div className="relative w-full overflow-hidden rounded-2xl bg-black">
              <video ref={live} muted playsInline className="max-h-80 w-full object-contain" />
              {phase === "writing" && recorder.current && (
                <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-sm font-bold text-white">● REC</span>
              )}
              {phase === "countdown" && (
                <span className="absolute inset-0 flex items-center justify-center text-8xl font-extrabold text-white drop-shadow-lg">{count}</span>
              )}
            </div>
          )}
          {!useVideo && phase === "countdown" && <p className="text-8xl font-extrabold text-ziva">{count}</p>}
          <p aria-live="off" className="text-5xl font-extrabold tabular-nums text-ziva">
            ⏱️ {clock(elapsed)}
          </p>
          {phase === "ready" && (
            <>
              <p className="text-center text-sm text-black/60">
                {useVideo ? "Hold the phone above the paper so the whole writing area shows. " : ""}Get your pencil ready, then tap Start.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={begin} className={primaryButton}>▶️ Start</button>
                <button type="button" onClick={reset} className={secondaryButton}>Cancel</button>
              </div>
            </>
          )}
          {phase === "writing" && useVideo && (
            <p className="text-center text-sm font-semibold text-black/60">When you finish, move your hand away so the camera can see all the writing.</p>
          )}
          {phase === "writing" && (
            <button type="button" onClick={finish} className={goldButton}>
              ✅ I&apos;ve finished
            </button>
          )}
        </div>
      )}

      {phase === "done" && (
        <div role="status" className="mt-4 flex flex-col gap-4">
          <div className="rounded-2xl bg-sky-50 p-4 text-center">
            <p className="text-4xl font-extrabold tabular-nums text-ziva">⏱️ {clock(seconds)}</p>
            {lpm !== null ? (
              <>
                <p className="mt-1 text-2xl font-extrabold">{lpm} letters a minute</p>
                <Stars count={speedStars} size="text-3xl" />
                <p className="mt-1 text-sm text-black/60">
                  {totalLetters} letters · guide for this class: about {guide} a minute
                </p>
              </>
            ) : (
              <p className="mt-1 font-semibold">Time taken to draw it {repeats} times</p>
            )}
            {advice && <p className="mt-2 text-lg font-semibold">{advice}</p>}
          </div>

          {check && (
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="font-bold text-emerald-900">✍️ Neatness (from the last video frame)</p>
              <Stars count={check.stars} size="text-2xl" />
              {check.next.length > 0 && <ul className="mt-1 list-disc pl-5 text-emerald-950">{check.next.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>}
            </div>
          )}
          {problem && <p className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-950">{problem}</p>}

          {frameImg && (
            <div>
              <p className="mb-2 text-sm font-semibold text-black/60">The last picture from the video is used for checking:</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- local frame, stays on the phone */}
              <img src={frameUrl ?? ""} alt="Last picture of your writing" className="mb-3 max-h-48 w-full rounded-2xl object-contain ring-1 ring-black/10" />
              <AiWritingCheck image={frameImg} target={target} level={level} isShape={isShape} />
            </div>
          )}

          {videoUrl && (
            <div>
              <p className="mb-2 font-bold">🎬 Watch how the letters were formed</p>
              <video src={videoUrl} controls playsInline className="max-h-80 w-full rounded-2xl bg-black object-contain" />
              <p className="mt-2 text-xs text-black/50">Tip: look at where each letter starts and which way the pencil moves.</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={reset} className={primaryButton}>🔁 Try again</button>
            {videoUrl && (
              <a href={videoUrl} download={`ziva-writing-${Date.now()}.${videoExt}`} className={secondaryButton}>
                💾 Save video
              </a>
            )}
          </div>
          <p className="text-xs text-black/50">
            Speed guides are rough classroom guides, not a test. Neat, correct letters matter more than speed. The video is deleted when you leave
            this page unless you save it.
          </p>
        </div>
      )}
    </section>
  );
}
