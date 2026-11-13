import { notFound } from "next/navigation";
import { CLASSES, STANDARDS, findStandard, placeOf, type ClassId } from "@/content/creative-arts/curriculum";
import { findLesson } from "@/content/creative-arts/lessons";
import { LessonView } from "@/components/ca/LessonView";

export const dynamicParams = false;
export function generateStaticParams() {
  return STANDARDS.map((s) => ({ cls: s.cls, cs: s.code.replace(/\./g, "-") }));
}

export async function generateMetadata({ params }: PageProps<"/creative-arts/[cls]/[cs]">) {
  const { cls, cs } = await params;
  const code = cs.replace(/-/g, ".");
  const lesson = findLesson(cls, code);
  const c = CLASSES.find((x) => x.id === cls);
  const title = lesson ? `${lesson.title} (${cls.toUpperCase()} ${code})` : `Creative Arts ${cls.toUpperCase()} ${code}`;
  return { title, description: lesson ? `${c?.label ?? ""} Creative Arts: ${lesson.intro}` : `Creative Arts ${c?.label ?? ""} content standard ${code}, NaCCA curriculum.` };
}

export default async function LessonPage({ params }: PageProps<"/creative-arts/[cls]/[cs]">) {
  const { cls, cs } = await params;
  const code = cs.replace(/-/g, ".");
  const standard = findStandard(cls, code);
  const c = CLASSES.find((x) => x.id === cls);
  if (!standard || !c) notFound();
  return <LessonView cls={c.id as ClassId} classLabel={c.label} standard={standard} place={placeOf(standard.cls, code)} lesson={findLesson(cls, code)} />;
}
