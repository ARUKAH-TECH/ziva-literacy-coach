"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { QuizRunner } from "@/components/QuizRunner";
import { Finished, MAX_STARS } from "@/components/ui";
import { Diagram } from "@/components/ca/Diagram";
import { ShareButtons } from "@/components/ShareButtons";
import type { ClassId, Standard } from "@/content/creative-arts/curriculum";
import type { Lesson } from "@/content/creative-arts/types";
import { recordResult } from "@/lib/progress";
import { speak, stopSpeaking } from "@/lib/speech";

const card = "rounded-3xl bg-white p-5 shadow-sm";

function Curriculum({ cls, standard, place, open }: { cls: ClassId; standard: Standard; place: { strand: string; subStrand: string }; open?: boolean }) {
  return (
    <details open={open} className="rounded-3xl border-2 border-ziva/20 bg-ziva/5 p-4">
      <summary className="cursor-pointer font-bold text-ziva">📋 Official curriculum ({cls.toUpperCase()} {standard.code})</summary>
      <p className="mt-2 text-sm font-semibold text-black/60">
        {place.strand} · {place.subStrand} · {standard.area}
      </p>
      <p className="mt-2">
        <span className="font-bold">Content standard {cls.toUpperCase()} {standard.code}: </span>
        {standard.standard}
      </p>
      <p className="mt-3 font-bold">Indicators</p>
      <ul className="mt-1 grid gap-1.5">
        {standard.indicators.map((i) => (
          <li key={i.code} className="text-sm">
            <span className="font-bold">{cls.toUpperCase()} {i.code}</span> {i.text}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-black/50">Source: NaCCA, Ministry of Education, Creative Arts curriculum.</p>
    </details>
  );
}

function Quiz({ lesson }: { lesson: Lesson }) {
  const [round, setRound] = useState(0);
  const [done, setDone] = useState<number | null>(null);
  const key = `ca:${lesson.cls}:${lesson.code}`;
  if (done !== null) {
    const stars = Math.round((done / lesson.quiz.length) * MAX_STARS);
    return (
      <Finished
        stars={stars}
        message={`You got ${done} of ${lesson.quiz.length} right.`}
        onAgain={() => {
          setDone(null);
          setRound(round + 1);
        }}
      />
    );
  }
  return (
    <QuizRunner
      key={round}
      items={lesson.quiz.map((q) => ({ prompt: q.q, say: q.q, options: q.options, answer: q.answer, explain: q.explain }))}
      onDone={(correct) => {
        recordResult(key, Math.round((correct / lesson.quiz.length) * MAX_STARS));
        setDone(correct);
      }}
    />
  );
}

function Written({ items, jhs }: { items: Lesson["written"]; jhs: boolean }) {
  const [shown, setShown] = useState<number[]>([]);
  return (
    <ol className="grid gap-3">
      {items.map((w, i) => (
        <li key={i} className={card}>
          <p className="font-bold">
            {i + 1}. {w.q}
          </p>
          {shown.includes(i) ? (
            <p className="mt-2 rounded-2xl bg-green-50 p-3 text-black/80">
              <span className="font-bold text-green-700">{jhs ? "Model answer: " : "Answer: "}</span>
              {w.answer}
            </p>
          ) : (
            <button type="button" onClick={() => setShown([...shown, i])} className="mt-2 rounded-full border-2 border-ziva px-4 py-1.5 text-sm font-bold text-ziva">
              Write your answer first, then tap to check
            </button>
          )}
        </li>
      ))}
    </ol>
  );
}

export function LessonView({ cls, classLabel, standard, place, lesson }: { cls: ClassId; classLabel: string; standard: Standard; place: { strand: string; subStrand: string }; lesson: Lesson | null }) {
  const back = `/creative-arts/${cls}/`;
  if (!lesson) {
    return (
      <AppShell title={`${cls.toUpperCase()} ${standard.code}`} back={back}>
        <Curriculum cls={cls} standard={standard} place={place} open />
        <p className="mt-4 rounded-3xl bg-amber-50 p-4 text-amber-900">Notes, pictures and a quiz for this part are being prepared. The official curriculum is shown above.</p>
      </AppShell>
    );
  }
  const jhs = ["b7", "b8", "b9"].includes(cls);
  const readAll = () => speak([lesson.title, lesson.intro, ...lesson.sections.flatMap((s) => [s.heading, s.text ?? "", ...(s.points ?? [])])].filter(Boolean).join(". "));
  return (
    <AppShell title={`Creative Arts · ${cls.toUpperCase()} ${standard.code}`} back={back}>
      <article className="grid gap-4">
        <header className={card}>
          <p className="text-sm font-bold text-black/50">
            {standard.area} · {place.subStrand}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ziva">
            <span aria-hidden="true">{lesson.emoji} </span>
            {lesson.title}
          </h1>
          <p className="mt-2 text-lg text-black/75">{lesson.intro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={readAll} className="rounded-full bg-ziva px-4 py-2 font-bold text-white">
              🔊 Read the notes to me
            </button>
            <button type="button" onClick={stopSpeaking} className="rounded-full border-2 border-ziva px-4 py-2 font-bold text-ziva">
              ⏹ Stop
            </button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2 text-sm font-bold" aria-label="Lesson parts">
          {[
            ["#notes", "📖 Notes"],
            ["#words", "🔑 Key words"],
            lesson.practical ? ["#practical", "🛠 Practical"] : null,
            ["#quiz", "⭐ Quiz"],
            ["#exam", jhs ? "📝 BECE practice" : "📝 Questions"],
          ]
            .filter(Boolean)
            .map((x) => (
              <a key={x![0]} href={x![0]} className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                {x![1]}
              </a>
            ))}
        </nav>

        <section id="notes" className="grid gap-4 scroll-mt-24">
          {lesson.sections.map((s) => (
            <div key={s.heading} className={card}>
              <h2 className="text-xl font-extrabold text-ziva">{s.heading}</h2>
              {s.text && <p className="mt-2 text-lg leading-relaxed">{s.text}</p>}
              {s.diagram && <Diagram id={s.diagram} />}
              {s.points && (
                <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-lg leading-relaxed">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section id="words" className={`${card} scroll-mt-24`}>
          <h2 className="text-xl font-extrabold text-ziva">🔑 Key words</h2>
          <dl className="mt-2 grid gap-2">
            {lesson.words.map(([w, m]) => (
              <div key={w}>
                <dt className="font-bold">{w}</dt>
                <dd className="text-black/75">{m}</dd>
              </div>
            ))}
          </dl>
        </section>

        {(lesson.materials || lesson.practical) && (
          <section id="practical" className={`${card} scroll-mt-24`}>
            {lesson.materials && (
              <>
                <h2 className="text-xl font-extrabold text-ziva">🧰 Tools and materials</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {lesson.materials.map((m) => (
                    <li key={m} className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold">
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {lesson.practical && (
              <>
                <h2 className="mt-4 text-xl font-extrabold text-ziva">🛠 Practical: {lesson.practical.title}</h2>
                <ol className="mt-2 grid gap-2">
                  {lesson.practical.steps.map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ziva font-bold text-white">{i + 1}</span>
                      <span className="pt-1 text-lg">{s}</span>
                    </li>
                  ))}
                </ol>
                {lesson.practical.safety && <p className="mt-3 rounded-2xl bg-red-50 p-3 font-semibold text-red-800">⚠️ Safety: {lesson.practical.safety}</p>}
              </>
            )}
          </section>
        )}

        <section id="quiz" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-extrabold text-ziva">⭐ Quiz ({lesson.quiz.length} questions)</h2>
          <Quiz lesson={lesson} />
        </section>

        <section id="exam" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-extrabold text-ziva">{jhs ? "📝 BECE-style practice" : "📝 Written questions"}</h2>
          <Written items={lesson.written} jhs={jhs} />
        </section>

        <Curriculum cls={cls} standard={standard} place={place} />

        <ShareButtons
          url={`https://learn.zivarukah.com/creative-arts/${cls}/${standard.code.replace(/\./g, "-")}/`}
          title={lesson.title}
          message={`🎨 *Free Creative Arts lesson (${classLabel})*: ${lesson.title}\nNotes, pictures, practical steps and a quiz on ZIVA Learning 👇`}
          label="Share this lesson"
        />
      </article>
    </AppShell>
  );
}
