import type { Lesson, Topic } from "../types";
import { B7 } from "./b7";
import { B8 } from "./b8";
import { B9 } from "./b9";
import { PRIMARY } from "./primary";
import { KG } from "./kg";
import { TOPICS_B7 } from "./topics-b7";

// Detailed lessons (topics) per class, keyed by content standard.
const TOPICS: Record<string, Record<string, Topic[]>> = {
  b7: TOPICS_B7,
};

const ALL: Lesson[] = [...KG, ...PRIMARY, ...B7, ...B8, ...B9].map((l) => {
  const topics = TOPICS[l.cls]?.[l.code];
  return topics ? { ...l, topics } : l;
});

export const ALL_LESSONS = ALL;

export function findLesson(cls: string, code: string) {
  return ALL.find((l) => l.cls === cls && l.code === code) ?? null;
}

export const lessonCount = (cls: string) => ALL.filter((l) => l.cls === cls).length;
