"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { VoiceSpeed } from "@/components/VoiceSpeed";
import { Finished, goldButton, primaryButton } from "@/components/ui";
import { shuffle, starsFor } from "@/components/useQueryMode";
import { BLEND_WORDS, LETTERS } from "@/content/letters";
import { recordResult, useProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";

// How to say a chunk of letters as a sound.
const CHUNK: Record<string, string> = { sh: "shh", ch: "ch", oa: "oh", ai: "ay", ee: "ee", air: "air", th: "th" };
function soundOf(part: string) {
  if (CHUNK[part]) return CHUNK[part];
  if (part.length === 1) return LETTERS.find((x) => x.l === part.toUpperCase())?.sound ?? part;
  return part; // a syllable such as "mar"
}

type Item = { word: string; emoji: string; parts: string[] };

export default function PhonicsPage() {
  const { progress, loaded } = useProgress();
  const list: Item[] = useMemo(() => {
    const source = progress.level === "kg" ? BLEND_WORDS.kg : BLEND_WORDS["p1-3"];
    return shuffle(
      source.map((w) => ({ word: w.word, emoji: w.emoji, parts: "parts" in w ? [...w.parts] : w.word.split("") })),
    ).slice(0, 6);
  }, [progress.level]);
  const [i, setI] = useState(0);
  const [heard, setHeard] = useState<number[]>([]);
  const [blended, setBlended] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const item = list[i];
  const done = loaded && i >= list.length;
  const choices = useMemo(() => {
    if (!item) return [];
    const others = shuffle(list.filter((x) => x.word !== item.word)).slice(0, 2);
    return shuffle([item, ...others]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.word, round]);

  useEffect(() => {
    if (done) recordResult(`phonics:${progress.level ?? "all"}`, starsFor(score, list.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (!loaded || list.length === 0) return <AppShell title="Blend the sounds" back="/learn/">{null}</AppShell>;
  if (done) {
    return (
      <AppShell title="Blend the sounds" back="/learn/">
        <Finished stars={starsFor(score, list.length)} message={`You read ${score} of ${list.length} words.`} onAgain={() => (setI(0), setScore(0), setHeard([]), setBlended(false), setPicked(null), setRound(round + 1))} nextHref="/reading/" nextLabel="Read a story" />
      </AppShell>
    );
  }

  const allHeard = heard.length === item.parts.length;
  return (
    <AppShell title="Blend the sounds" back="/learn/">
      <VoiceSpeed className="mb-4" />
      <p className="text-center text-lg font-semibold text-black/60">Word {i + 1} of {list.length} · ⭐ {score}</p>
      <p className="mt-2 text-center text-lg">1️⃣ Tap each sound &nbsp; 2️⃣ Blend &nbsp; 3️⃣ Pick the picture</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {item.parts.map((part, k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              speak(soundOf(part), { rate: 0.7 });
              if (!heard.includes(k)) setHeard([...heard, k]);
            }}
            className={`min-w-20 rounded-3xl px-5 py-5 text-5xl font-extrabold shadow active:scale-95 ${heard.includes(k) ? "bg-ziva text-white" : "bg-white text-ziva"}`}
          >
            {part}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          disabled={!allHeard}
          onClick={() => {
            const slow = item.parts.map(soundOf).join("... ");
            speak(`${slow}... ${item.word}!`, { rate: 0.75 });
            setBlended(true);
          }}
          className={goldButton}
        >
          🧩 Blend it!
        </button>
      </div>
      {blended && (
        <>
          <p className="mt-6 text-center text-lg font-semibold">Which picture is “{item.word}”?</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {choices.map((c) => {
              const right = c.word === item.word;
              const look = picked ? (right ? "bg-green-500" : picked === c.word ? "bg-red-400" : "bg-white opacity-50") : "bg-white";
              return (
                <button
                  key={c.word}
                  type="button"
                  disabled={Boolean(picked)}
                  aria-label={c.word}
                  onClick={() => {
                    setPicked(c.word);
                    if (right) setScore(score + 1);
                    speak(right ? `Yes! ${item.word}.` : `That is ${c.word}. Try to remember: ${item.word}.`);
                  }}
                  className={`aspect-square rounded-3xl text-6xl shadow ${look}`}
                >
                  {c.emoji}
                </button>
              );
            })}
          </div>
        </>
      )}
      {picked && (
        <div className="mt-6 flex justify-center">
          <button type="button" onClick={() => (setI(i + 1), setHeard([]), setBlended(false), setPicked(null))} className={primaryButton}>
            Next word →
          </button>
        </div>
      )}
    </AppShell>
  );
}
