"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";

export interface Entry {
  title: string;
  cls: string;
  classLabel: string;
  level: string;
  code: string;
  href: string;
  emoji: string;
  blurb: string;
  text: string;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ɛ]/g, "e")
    .replace(/[ɔ]/g, "o")
    .replace(/[^a-z0-9 ]/g, " ");

const STOP = new Set(["the", "a", "an", "of", "and", "in", "on", "to", "for", "what", "is", "are", "how", "do", "i", "me", "my", "about", "with"]);

/** Simple scoring: whole words in the title count most; also matches word starts ("weav" finds weaving). */
function score(e: Entry, words: string[]) {
  const title = norm(e.title);
  const body = norm(e.text + " " + e.blurb);
  let s = 0;
  for (const w of words) {
    const inTitle = title.split(" ").some((t) => t.startsWith(w));
    const inBody = body.split(" ").some((t) => t.startsWith(w));
    if (!inTitle && !inBody) return 0;
    s += inTitle ? 5 : 1;
  }
  if (title.includes(words.join(" "))) s += 5;
  return s;
}

const SUGGEST = ["colour", "shading", "clay", "weaving", "printing", "pattern", "drum", "scale", "dance", "drama", "design process", "exhibition", "Adinkra", "triads", "kente"];

export function CaSearch({ entries }: { entries: Entry[] }) {
  const { progress } = useProgress();
  const [q, setQ] = useState("");
  const [mine, setMine] = useState(true);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
  }, []);
  const words = useMemo(() => norm(q).split(" ").filter((w) => w.length > 1 && !STOP.has(w)), [q]);
  const level = progress.level;
  const results = useMemo(() => {
    if (!words.length) return [];
    return entries
      .filter((e) => !mine || !level || e.level === level)
      .map((e) => ({ e, s: score(e, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((r) => r.e);
  }, [entries, words, mine, level]);

  return (
    <AppShell title="Search Creative Arts" back="/creative-arts/">
      <label htmlFor="ca-q" className="text-lg font-bold">
        What topic are you looking for?
      </label>
      <input
        id="ca-q"
        type="search"
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="e.g. shading, weaving, drum, colour wheel"
        className="mt-2 w-full rounded-2xl border-2 border-ziva/30 bg-white px-4 py-3 text-lg outline-none focus:border-ziva"
      />
      {level && (
        <div className="mt-3 flex gap-2 text-sm font-bold">
          <button type="button" onClick={() => setMine(true)} className={`rounded-full px-4 py-1.5 ${mine ? "bg-ziva text-white" : "bg-white"}`}>
            My classes
          </button>
          <button type="button" onClick={() => setMine(false)} className={`rounded-full px-4 py-1.5 ${!mine ? "bg-ziva text-white" : "bg-white"}`}>
            All classes
          </button>
        </div>
      )}
      {!words.length && (
        <div className="mt-5">
          <p className="text-sm font-bold text-black/50">Try:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGEST.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full bg-white px-3 py-1.5 font-semibold shadow-sm">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      {words.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-bold text-black/50">
            {results.length ? `${results.length} result${results.length > 1 ? "s" : ""}` : "No results."}
            {!results.length && mine && level ? " Try 'All classes'." : ""}
          </p>
          <ul className="mt-2 grid gap-2">
            {results.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <span className="text-3xl" aria-hidden="true">
                    {e.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-black/50">
                      {e.classLabel} · {e.cls.toUpperCase()} {e.code}
                    </span>
                    <span className="block text-lg font-bold leading-snug">{e.title}</span>
                    <span className="block text-sm text-black/60">{e.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </AppShell>
  );
}
