import { notFound } from "next/navigation";
import { CLASSES, findStandard, placeOf } from "@/content/creative-arts/curriculum";
import { ALL_LESSONS, findLesson } from "@/content/creative-arts/lessons";
import { TopicView } from "@/components/ca/TopicView";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_LESSONS.flatMap((l) => (l.topics ?? []).map((_, i) => ({ cls: l.cls, cs: l.code.replace(/\./g, "-"), t: String(i + 1) })));
}

export async function generateMetadata({ params }: PageProps<"/creative-arts/[cls]/[cs]/[t]">) {
  const { cls, cs, t } = await params;
  const lesson = findLesson(cls, cs.replace(/-/g, "."));
  const topic = lesson?.topics?.[Number(t) - 1];
  const c = CLASSES.find((x) => x.id === cls);
  return topic ? { title: `${topic.title} · ${c?.label ?? ""} Creative Arts`, description: topic.explain[0]?.slice(0, 160) } : {};
}

export default async function TopicPage({ params }: PageProps<"/creative-arts/[cls]/[cs]/[t]">) {
  const { cls, cs, t } = await params;
  const code = cs.replace(/-/g, ".");
  const lesson = findLesson(cls, code);
  const standard = findStandard(cls, code);
  const c = CLASSES.find((x) => x.id === cls);
  const i = Number(t) - 1;
  const topic = lesson?.topics?.[i];
  if (!lesson || !topic || !standard || !c) notFound();
  return (
    <TopicView
      cls={c.id}
      classLabel={c.label}
      code={code}
      lessonTitle={lesson.title}
      area={standard.area}
      subStrand={placeOf(c.id, code).subStrand}
      topic={topic}
      index={i}
      total={lesson.topics!.length}
      titles={lesson.topics!.map((x) => x.title)}
    />
  );
}
