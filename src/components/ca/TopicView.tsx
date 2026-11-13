"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Diagram } from "@/components/ca/Diagram";
import type { ClassId } from "@/content/creative-arts/curriculum";
import type { LessonQuestion, Topic } from "@/content/creative-arts/types";
import { speak, stopSpeaking } from "@/lib/speech";

const card = "rounded-3xl bg-white p-5 shadow-sm";

/** Moves options round by a fixed amount per question so the answer isn't always first. */
function mix(q: LessonQuestion): LessonQuestion {
  let h = 0;
  for (const ch of q.q) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const n = q.options.length;
  const shift = h % n;
  return { ...q, options: q.options.map((_, i) => q.options[(i + shift) % n]), answer: (q.answer - shift + n) % n };
}

function Check({ items: raw }: { items: LessonQuestion[] }) {
  const items = raw.map(mix);
  const [picked, setPicked] = useState<Record<number, number>>({});
  return (
    <ol className="grid gap-3">
      {items.map((q, n) => (
        <li key={n} className={card}>
          <p className="text-lg font-bold">
            {n + 1}. {q.q}{" "}
            <button type="button" onClick={() => speak(q.q)} aria-label="Read the question aloud" className="align-middle">
              🔊
            </button>
          </p>
          <div className="mt-2 grid gap-2">
            {q.options.map((o, k) => {
              const chosen = picked[n];
              const look = chosen === undefined ? "border-black/10 bg-white" : k === q.answer ? "border-green-600 bg-green-50" : chosen === k ? "border-red-500 bg-red-50" : "border-black/5 opacity-60";
              return (
                <button key={k} type="button" disabled={chosen !== undefined} onClick={() => setPicked({ ...picked, [n]: k })} className={`rounded-2xl border-2 px-4 py-2.5 text-left font-semibold ${look}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked[n] !== undefined && (
            <p className={`mt-2 font-bold ${picked[n] === q.answer ? "text-green-700" : "text-amber-700"}`}>
              {picked[n] === q.answer ? "✅ Correct!" : `The answer is: ${q.options[q.answer]}`}
              {q.explain ? <span className="block font-normal text-black/70">{q.explain}</span> : null}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function TopicView(props: { cls: ClassId; classLabel: string; code: string; lessonTitle: string; area: string; subStrand: string; topic: Topic; index: number; total: number; titles: string[] }) {
  const { cls, classLabel, code, lessonTitle, area, topic, index, total, titles } = props;
  const base = `/creative-arts/${cls}/${code.replace(/\./g, "-")}/`;
  const readAll = () =>
    speak(
      [topic.title, ...topic.explain, ...(topic.examples ?? []).map(([h, t]) => `${h}. ${t}`), topic.steps ? `${topic.steps.title}. ${topic.steps.items.join(". ")}` : "", topic.fact ? `Did you know? ${topic.fact}` : "", "Remember.", ...topic.remember]
        .filter(Boolean)
        .join(" "),
    );
  return (
    <AppShell title={`Creative Arts · ${cls.toUpperCase()} ${code}`} back={base}>
      <article className="grid gap-4">
        <header className={card}>
          <p className="text-sm font-bold text-black/50">
            {classLabel} · {area} · Lesson {index + 1} of {total}
          </p>
          <p className="mt-1 text-sm font-semibold text-ziva">{lessonTitle}</p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ziva">
            <span aria-hidden="true">{topic.emoji ?? "📘"} </span>
            {topic.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={readAll} className="rounded-full bg-ziva px-4 py-2 font-bold text-white">
              🔊 Read this lesson to me
            </button>
            <button type="button" onClick={stopSpeaking} className="rounded-full border-2 border-ziva px-4 py-2 font-bold text-ziva">
              ⏹ Stop
            </button>
          </div>
        </header>

        <section className={card}>
          <h2 className="text-xl font-extrabold text-ziva">📖 Explanation</h2>
          <div className="mt-2 grid gap-3 text-lg leading-relaxed">
            {topic.explain.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {topic.diagram && <Diagram id={topic.diagram} />}
        </section>

        {topic.examples && (
          <section className={card}>
            <h2 className="text-xl font-extrabold text-ziva">🌍 Examples</h2>
            <ul className="mt-2 grid gap-3">
              {topic.examples.map(([h, t]) => (
                <li key={h} className="rounded-2xl bg-amber-50 p-3">
                  <p className="font-bold">{h}</p>
                  <p className="text-black/80">{t}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {topic.steps && (
          <section className={card}>
            <h2 className="text-xl font-extrabold text-ziva">🛠 {topic.steps.title}</h2>
            <ol className="mt-2 grid gap-2">
              {topic.steps.items.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ziva font-bold text-white">{i + 1}</span>
                  <span className="pt-1 text-lg">{s}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {topic.fact && (
          <p className="rounded-3xl bg-sky-50 p-4 text-lg">
            <span className="font-bold">💡 Did you know? </span>
            {topic.fact}
          </p>
        )}

        <section className="rounded-3xl border-2 border-green-600/30 bg-green-50 p-5">
          <h2 className="text-xl font-extrabold text-green-800">✅ Remember</h2>
          <ul className="mt-2 grid list-disc gap-1 pl-5 text-lg">
            {topic.remember.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-extrabold text-ziva">❓ Quick check</h2>
          <Check items={topic.check} />
        </section>

        <nav className="flex flex-wrap justify-between gap-3">
          {index > 0 ? (
            <Link href={`${base}${index}/`} className="rounded-full border-2 border-ziva px-5 py-3 font-bold text-ziva">
              ← {titles[index - 1]}
            </Link>
          ) : (
            <span />
          )}
          {index + 1 < total ? (
            <Link href={`${base}${index + 2}/`} className="rounded-full bg-ziva px-5 py-3 font-bold text-white">
              Next: {titles[index + 1]} →
            </Link>
          ) : (
            <Link href={`${base}#quiz`} className="rounded-full bg-gold px-5 py-3 font-bold text-[#14110c]">
              ⭐ Take the topic quiz →
            </Link>
          )}
        </nav>
      </article>
    </AppShell>
  );
}
