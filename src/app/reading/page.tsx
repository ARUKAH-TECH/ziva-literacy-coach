"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Finished, Stars, goldButton, primaryButton, secondaryButton } from "@/components/ui";
import { QuizRunner } from "@/components/QuizRunner";
import { starsFor, useQueryMode } from "@/components/useQueryMode";
import { storiesFor, wordCount, type Story } from "@/content/stories";
import { READING_WPM, type LevelId } from "@/lib/levels";
import { recordResult, useProgress } from "@/lib/progress";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";
import { ReadAloudCheck } from "@/components/ReadAloudCheck";

// Typical oral reading targets (words per minute) used as friendly guides.
const WPM_TARGET = READING_WPM;

function StoryText({ story, active }: { story: Story; active: number }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-center text-6xl" aria-hidden="true">{story.emoji}</p>
      <h2 className="text-center text-2xl font-extrabold">{story.title}</h2>
      {story.text.map((p, k) => (
        <p key={k} className={`rounded-xl px-2 ${story.level === "kg" ? "text-3xl leading-[1.5]" : story.level === "p1-3" ? "text-2xl leading-[1.6]" : "text-xl leading-[1.7]"} ${active === k ? "bg-amber-100" : ""}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

function ReadStory({ story, onBack }: { story: Story; onBack: () => void }) {
  const [stage, setStage] = useState<"read" | "quiz" | "done">("read");
  const [active, setActive] = useState(-1);
  const [score, setScore] = useState(0);
  const playing = useRef(false);

  useEffect(() => () => stopSpeaking(), []);

  const readFrom = (k: number) => {
    if (k >= story.text.length) {
      playing.current = false;
      setActive(-1);
      return;
    }
    playing.current = true;
    setActive(k);
    speak(story.text[k], { rate: story.level === "kg" ? 0.8 : 0.9, onEnd: () => playing.current && readFrom(k + 1) });
  };

  if (stage === "done") {
    const stars = starsFor(score, story.questions.length);
    return <Finished stars={stars} message={`${score} of ${story.questions.length} answers correct.`} onAgain={() => (setStage("read"), setScore(0))} nextHref="/reading/" nextLabel="More stories" />;
  }

  if (stage === "quiz") {
    return (
      <QuizRunner
        items={story.questions.map((q) => ({ prompt: q.q, say: q.q, options: q.options, answer: q.answer, explain: q.why }))}
        bigOptions={story.level === "kg"}
        onDone={(correct) => {
          setScore(correct);
          recordResult(`reading:${story.id}`, starsFor(correct, story.questions.length));
          setStage("done");
        }}
      />
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">
        <button type="button" onClick={onBack} className={secondaryButton}>← Stories</button>
        {canSpeak() && (
          <button
            type="button"
            onClick={() => (playing.current ? (playing.current = false, stopSpeaking(), setActive(-1)) : readFrom(0))}
            className={goldButton}
          >
            {active >= 0 ? "⏹ Stop" : "🔊 Read to me"}
          </button>
        )}
        <ReadAloudCheck paragraphs={story.text} storyKey={story.id} big={story.level === "kg"} wpmTarget={READING_WPM[story.level]} />
      </div>
      <StoryText story={story} active={active} />
      <div className="mt-5 flex justify-center">
        <button type="button" onClick={() => (stopSpeaking(), (playing.current = false), setActive(-1), setStage("quiz"))} className={primaryButton}>
          ❓ Answer questions
        </button>
      </div>
    </>
  );
}

function Fluency({ story, level, onBack }: { story: Story; level: LevelId; onBack: () => void }) {
  const [start, setStart] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const words = wordCount(story);
  const target = WPM_TARGET[level];

  useEffect(() => {
    if (start === null) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [start]);

  const seconds = start ? Math.max(0, Math.floor((now - start) / 1000)) : 0;
  const stars = wpm === null ? 0 : wpm >= target ? 5 : wpm >= target * 0.85 ? 4 : wpm >= target * 0.7 ? 3 : wpm >= target * 0.55 ? 2 : wpm >= target * 0.4 ? 1 : 0;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onBack} className={secondaryButton}>← Stories</button>
        <span className="text-black/60">{words} words · goal about {target} words a minute</span>
      </div>
      {wpm === null && start === null && (
        <p className="mb-4 rounded-2xl bg-sky-50 p-4 text-lg">Tap <strong>Start</strong>, read the story aloud clearly, then tap <strong>I’m done</strong>. Accuracy matters more than speed!</p>
      )}
      {start !== null && (
        <p aria-live="polite" className="mb-3 text-center text-4xl font-extrabold tabular-nums text-ziva">⏱️ {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</p>
      )}
      {wpm !== null && (
        <div role="status" className="mb-4 flex flex-col items-center gap-2 rounded-3xl bg-white p-5 text-center shadow">
          <Stars count={stars} size="text-4xl" />
          <p className="text-3xl font-extrabold">{wpm} words a minute</p>
          <p className="text-black/70">
            {stars === 5 ? "Fluent reading: well done!" : "Read it again tomorrow: fluency grows with practice."} Ask a teacher or parent to listen for clear, correct words.
          </p>
        </div>
      )}
      <StoryText story={story} active={-1} />
      <div className="mt-5 flex justify-center gap-3">
        {start === null ? (
          <button type="button" onClick={() => (setWpm(null), setStart(Date.now()), setNow(Date.now()))} className={goldButton}>
            ▶ Start
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              const minutes = Math.max(5, (Date.now() - start) / 1000) / 60;
              const result = Math.round(words / minutes);
              setWpm(result);
              setStart(null);
              const s = result >= target ? 3 : result >= target * 0.75 ? 2 : result >= target * 0.5 ? 1 : 0;
              recordResult(`fluency:${story.id}`, s);
            }}
            className={primaryButton}
          >
            ✋ I’m done
          </button>
        )}
      </div>
    </>
  );
}

export default function ReadingPage() {
  const mode = useQueryMode();
  const { progress, loaded } = useProgress();
  const [open, setOpen] = useState<Story | null>(null);
  const fluency = mode === "fluency";
  const level = progress.level ?? "p1-3";
  const list = storiesFor(progress.level);

  return (
    <AppShell title={fluency ? "Reading speed" : "Reading practice"} back="/learn/">
      {!loaded ? null : open ? (
        fluency ? <Fluency story={open} level={level} onBack={() => setOpen(null)} /> : <ReadStory story={open} onBack={() => setOpen(null)} />
      ) : (
        <div className="grid gap-4">
          <p className="text-lg text-black/70">{fluency ? "Choose a story to read aloud and time yourself." : "Choose a story. Read it, or tap Read to me, then answer the questions."}</p>
          {list.map((s) => {
            const rec = progress.records[`${fluency ? "fluency" : "reading"}:${s.id}`];
            return (
              <button key={s.id} type="button" onClick={() => setOpen(s)} className="flex items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-sm active:scale-[0.98]">
                <span aria-hidden="true" className="text-5xl">{s.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-extrabold">{s.title}</span>
                  <span className="block text-sm text-black/60">{wordCount(s)} words · {s.questions.length} questions</span>
                </span>
                {rec && <Stars count={rec.best} size="text-lg" />}
              </button>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
