import { CLASSES } from "@/content/creative-arts/curriculum";
import { ALL_LESSONS } from "@/content/creative-arts/lessons";
import { CaSearch, type Entry } from "@/components/ca/CaSearch";

export const metadata = {
  title: "Search Creative Arts topics",
  description: "Search free Creative Arts lessons for KG, Primary and JHS: drawing, colour, printing, weaving, music, dance, drama and more.",
};

// The search index is built when the app is built and saved inside this page,
// so searching works offline and nothing is sent anywhere.
export default function SearchPage() {
  const label = (cls: string) => CLASSES.find((c) => c.id === cls)?.label ?? cls.toUpperCase();
  const level = (cls: string) => CLASSES.find((c) => c.id === cls)?.level ?? "";
  const entries: Entry[] = [];
  for (const l of ALL_LESSONS) {
    const href = `/creative-arts/${l.cls}/${l.code.replace(/\./g, "-")}/`;
    entries.push({
      title: l.title,
      cls: l.cls,
      classLabel: label(l.cls),
      level: level(l.cls),
      code: l.code,
      href,
      emoji: l.emoji,
      blurb: l.intro,
      text: [l.title, l.intro, ...l.sections.map((s) => s.heading), ...l.words.map(([w]) => w)].join(" "),
    });
    (l.topics ?? []).forEach((t, i) =>
      entries.push({
        title: t.title,
        cls: l.cls,
        classLabel: label(l.cls),
        level: level(l.cls),
        code: l.code,
        href: `${href}${i + 1}/`,
        emoji: t.emoji ?? l.emoji,
        blurb: t.explain[0].slice(0, 140),
        text: [t.title, l.title, ...t.remember, ...(t.examples ?? []).map(([h]) => h)].join(" "),
      }),
    );
  }
  return <CaSearch entries={entries} />;
}
