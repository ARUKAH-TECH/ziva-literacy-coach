"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";

interface Item {
  code: string;
  area: string;
  strand: string;
  subStrand: string;
  title: string;
  emoji: string;
  ready: boolean;
}

/** A class's Creative Arts lessons, grouped by strand and sub-strand, with stars earned. */
export function ClassLessons({ cls, label, items }: { cls: string; label: string; items: Item[] }) {
  const { progress } = useProgress();
  const strands = [...new Set(items.map((i) => i.strand))];
  return (
    <AppShell title={`Creative Arts · ${label}`} back="/creative-arts/">
      <Link href="/creative-arts/search/" className="mb-5 flex items-center gap-3 rounded-2xl border-2 border-ziva/30 bg-white px-4 py-3 text-lg text-black/50">
        <span aria-hidden="true">🔍</span> Search a topic
      </Link>
      {strands.map((st) => (
        <section key={st} className="mb-6">
          <h2 className="text-xl font-extrabold text-ziva">{st}</h2>
          {[...new Set(items.filter((i) => i.strand === st).map((i) => i.subStrand))].map((ss) => (
            <div key={ss} className="mt-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/50">{ss}</h3>
              <ul className="mt-2 grid gap-2">
                {items
                  .filter((i) => i.strand === st && i.subStrand === ss)
                  .map((i) => {
                    const best = progress.records[`ca:${cls}:${i.code}`]?.best ?? 0;
                    return (
                      <li key={i.code}>
                        <Link href={`/creative-arts/${cls}/${i.code.replace(/\./g, "-")}/`} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                          <span className="text-3xl" aria-hidden="true">
                            {i.emoji}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-bold text-black/50">
                              {cls.toUpperCase()} {i.code} · {i.area}
                            </span>
                            <span className={`block font-bold leading-snug ${i.ready ? "text-lg" : "text-base text-black/70"}`}>{i.ready ? i.title : i.title.length > 140 ? `${i.title.slice(0, 140)}…` : i.title}</span>
                            {!i.ready && <span className="mt-1 block text-xs font-semibold text-amber-700">Curriculum page · notes coming soon</span>}
                          </span>
                          {best > 0 && <span className="shrink-0 font-bold text-amber-500">{"⭐".repeat(best)}</span>}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </AppShell>
  );
}
