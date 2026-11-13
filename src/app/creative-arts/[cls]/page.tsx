import { notFound } from "next/navigation";
import { CLASSES, standardsFor, placeOf, type ClassId } from "@/content/creative-arts/curriculum";
import { findLesson } from "@/content/creative-arts/lessons";
import { ClassLessons } from "@/components/ca/ClassLessons";

export const dynamicParams = false;
export function generateStaticParams() {
  return CLASSES.map((c) => ({ cls: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/creative-arts/[cls]">) {
  const { cls } = await params;
  const c = CLASSES.find((x) => x.id === cls);
  return { title: c ? `Creative Arts ${c.label}: free lessons` : "Creative Arts", description: c ? (c.id === "kg" ? "Free Creative Arts fun for Kindergarten in Ghana: shapes, colours, lines, drawing, patterns, clay, songs, instruments, dance and pretend play." : `Free Creative Arts lessons for ${c.label} in Ghana (NaCCA curriculum): notes, pictures, practicals and quizzes.`) : undefined };
}

export default async function ClassPage({ params }: PageProps<"/creative-arts/[cls]">) {
  const { cls } = await params;
  const c = CLASSES.find((x) => x.id === cls);
  if (!c) notFound();
  const items = standardsFor(c.id as ClassId).map((s) => {
    const lesson = findLesson(s.cls, s.code);
    return { code: s.code, area: s.area, ...placeOf(s.cls, s.code), title: lesson?.title ?? s.standard, emoji: lesson?.emoji ?? "📘", ready: !!lesson, quiz: lesson?.quiz.length ?? 0 };
  });
  return <ClassLessons cls={c.id} label={c.label} items={items} />;
}
