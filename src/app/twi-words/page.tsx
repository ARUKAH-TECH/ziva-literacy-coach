"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TWI_GROUPS, TWI_WORDS, findTwi, type TwiWord } from "@/content/twi";
import { speak, stopSpeaking } from "@/lib/speech";

// Twi → English: type a Twi word or saying (any spelling, even "y3den") and
// see its English name, how to say it, and a sentence. Works offline.

function WordCard({ w }: { w: TwiWord }) {
  return (
    <li className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-4xl" aria-hidden="true">
          {w.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-black/50">Twi: {w.twi}</p>
          <p className="text-2xl font-extrabold leading-tight text-ziva">{w.english}</p>
          {w.say && <p className="mt-1 text-sm text-black/60">Say it: {w.say}</p>}
          <p className="mt-2 text-black/80">{w.example}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => speak(w.english.replace(/\(.*?\)/g, ""))} className="rounded-full bg-ziva px-4 py-2 font-bold text-white">
          🔊 Hear the English
        </button>
        <button type="button" onClick={() => speak(w.example)} className="rounded-full border-2 border-ziva px-4 py-2 font-bold text-ziva">
          🔊 Hear the sentence
        </button>
      </div>
    </li>
  );
}

export default function TwiWordsPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const results = useMemo(() => (query.trim() ? findTwi(query) : []), [query]);
  const browsing = !query.trim();
  const shown = browsing && group ? TWI_WORDS.filter((w) => w.group === group) : results;

  return (
    <AppShell title="Twi → English words" back="/learn/">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-black/70">Type a Twi word or saying, even phone spelling like “y3den”, and see what it is called in English.</p>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            stopSpeaking();
            setQuery(e.target.value);
          }}
          placeholder="e.g. bankuta, apotoyewa, ne tirim yɛ den"
          aria-label="Type a Twi or English word"
          autoComplete="off"
          className="mt-4 w-full rounded-full border-4 border-ziva bg-white px-5 py-3 text-lg"
        />

        {!browsing && results.length === 0 && (
          <p className="mt-6 rounded-3xl bg-amber-100 p-4 text-amber-900">
            We don&apos;t have “{query.trim()}” yet. Check the spelling, or ask your teacher. New words are added often.
          </p>
        )}

        {browsing && (
          <div className="mt-6 flex flex-wrap gap-2">
            {TWI_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroup(group === g.id ? null : g.id)}
                className={`rounded-full px-4 py-2 font-bold ${group === g.id ? "bg-ziva text-white" : "bg-white text-ziva shadow-sm"}`}
              >
                {g.emoji} {g.title}
              </button>
            ))}
          </div>
        )}
        {browsing && !group && <p className="mt-4 text-black/60">Or tap a group to see its words ({TWI_WORDS.length} words and sayings).</p>}

        <ul className="mt-6 flex flex-col gap-3">
          {shown.slice(0, 40).map((w) => (
            <WordCard key={`${w.twi}-${w.english}`} w={w} />
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
