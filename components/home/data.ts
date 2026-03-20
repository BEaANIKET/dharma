import { RecipeApiResponse } from "@/services/api";

/** Mood value string from the metadata API (e.g. "ANXIOUS", "GRATEFUL"). */
export type MoodLabel = string;

export type MainType = "verse" | "breathing";
export type ThumbDirection = "up" | "down";

export const LOADING_STEPS = [
  "Consulting all 700 Gita verses...",
  "Filtering practices for your current state...",
  "Weaving your path for today...",
];

export type ResolvedHomeRecipe = {
  verse: {
    ch: number;
    v: number;
    emoji: string;
    title: string;
    subtitle: string;
    sanskrit: string;
    english: string;
    science: string;
    tag: string;
    connection: string;
    deeper_insights: Array<{ emoji: string; title: string; inference: string }>;
    deeper_insights_title: string;
  };
  breathing: {
    name: string;
    pattern: string;
    subtitle: string;
    duration: string;
    desc: string;
    science: string;
    emoji: string;
    ai_impact: Array<{ emoji: string; point: string }>;
    steps: string[];
    breath_phases: Array<{ name: string; seconds: number; instruction: string }>;
  };
  reflections: Array<{ emoji: string; question: string }>;
  punya: {
    title: string;
    subtitle: string;
    activity: string;
    duration: string;
    emoji: string;
    ai_why: string;
    ai_impact: Array<{ emoji: string; point: string }>;
  };
};

const asRecord = (value: unknown) => (value && typeof value === "object" ? (value as Record<string, unknown>) : {});
const cleanDummySuffix = (value: string) => value.replace(/\s*_DUMMY_\s*/g, " ").replace(/\s{2,}/g, " ").trim();
const toString = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? cleanDummySuffix(value) : fallback;
const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};
const toImpactList = (value: unknown): Array<{ emoji: string; point: string }> => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const record = asRecord(item);
      const point = toString(record.point);
      if (!point) return null;
      return {
        emoji: toString(record.emoji, "✨"),
        point,
      };
    })
    .filter((item): item is { emoji: string; point: string } => Boolean(item));
};

const toDeeperInsights = (value: unknown): Array<{ emoji: string; title: string; inference: string }> => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const record = asRecord(item);
      const title = toString(record.title);
      const inference = toString(record.inference ?? record.point ?? record.text);
      if (!title || !inference) return null;
      return {
        emoji: toString(record.emoji, "✨"),
        title,
        inference,
      };
    })
    .filter((item): item is { emoji: string; title: string; inference: string } => Boolean(item));
};

const toBreathPhases = (
  value: unknown
): Array<{ name: string; seconds: number; instruction: string }> => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const record = asRecord(item);
      const name = toString(record.name);
      const instruction = toString(record.instruction);
      const seconds = toNumber(record.seconds, 0);
      if (!name || !instruction || seconds <= 0) return null;
      return { name, seconds, instruction };
    })
    .filter((item): item is { name: string; seconds: number; instruction: string } => Boolean(item));
};

const toStringList = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => toString(item)).filter((item) => item.length > 0);
};

const parseChapterVerse = (value: unknown) => {
  if (typeof value !== "string") return { ch: 0, v: 0 };
  const match = value.match(/(\d+)\s*[.:]\s*(\d+)/);
  if (!match) return { ch: 0, v: 0 };
  return { ch: Number(match[1]), v: Number(match[2]) };
};

export function resolveRecipeForMood(recipe?: RecipeApiResponse | null): ResolvedHomeRecipe | null {
  if (!recipe) return null;

  const gita = asRecord(recipe.gita);
  const breathing = asRecord(recipe.breathing);
  const punya = asRecord(recipe.punya);
  const reflectionsRaw = recipe.reflections;
  const parsedRef = parseChapterVerse(toString(gita.title));

  const ch = toNumber(
    gita.ch ?? gita.chapter ?? gita.chapter_no ?? gita.chapter_number ?? parsedRef.ch,
    0
  );
  const v = toNumber(
    gita.v ?? gita.verse ?? gita.verse_no ?? gita.verse_number ?? parsedRef.v,
    0
  );

  const resolvedVerse = {
    ch,
    v,
    emoji: toString(gita.emoji, "📖"),
    title: toString(gita.title),
    subtitle: toString(gita.subtitle),
    sanskrit: toString(gita.sanskrit_text),
    english: toString(gita.english_translation ?? gita.english ?? gita.translation),
    science: toString(gita.science ?? gita.neuroscience ?? gita.ai_why ?? gita.why ?? gita.commentary),
    tag: toString(gita.tag ?? gita.domain ?? gita.activity_type, "GITA"),
    connection: toString(gita.connection ?? gita.commentary ?? gita.why ?? gita.ai_why),
    deeper_insights: toDeeperInsights(gita.deeper_insights),
    deeper_insights_title: toString(gita.deeper_insights_title),
  };

  const resolvedBreathing = {
    name: toString(breathing.title),
    pattern: toString(breathing.pattern ?? breathing.subtitle ?? breathing.animation),
    subtitle: toString(breathing.subtitle),
    duration: toString(
      breathing.duration ??
        (typeof breathing.duration_mins === "number" ? `${breathing.duration_mins} min` : "") ??
        (typeof breathing.duration_seconds === "number" ? `${Math.round(breathing.duration_seconds / 60)} min` : "")
    ),
    desc: toString(
      breathing.instructions ?? breathing.desc ?? breathing.short_descp ?? breathing.context?.short_descp
    ),
    science: toString(breathing.science ?? breathing.ai_why ?? breathing.why),
    emoji: toString(breathing.emoji, "🫁"),
    ai_impact: toImpactList(breathing.ai_impact),
    steps: toStringList(breathing.steps),
    breath_phases: toBreathPhases(breathing.breath_phases),
  };

  const resolvedReflections = Array.isArray(reflectionsRaw)
    ? reflectionsRaw
        .map((item) => {
          if (typeof item === "string") {
            const question = toString(item);
            return question ? { emoji: "🪷", question } : null;
          }
          const record = asRecord(item);
          const question = toString(record.question ?? record.prompt ?? record.text);
          if (!question) return null;
          return {
            emoji: toString(record.emoji, "🪷"),
            question,
          };
        })
        .filter((item): item is { emoji: string; question: string } => Boolean(item))
    : [];

  const resolvedPunya = {
    title: toString(punya.title),
    subtitle: toString(punya.subtitle),
    activity: toString(
      punya.activity ??
        punya.action_text ??
        punya.action ??
        punya.short_descp ??
        punya.why ??
        punya.ai_why
    ),
    duration: toString(
      punya.duration ?? (typeof punya.duration_mins === "number" ? `${punya.duration_mins} min` : "")
    ),
    emoji: toString(punya.emoji, "🌻"),
    ai_why: toString(punya.ai_why ?? punya.why),
    ai_impact: toImpactList(punya.ai_impact),
  };

  if (
    !resolvedVerse.sanskrit ||
    !resolvedVerse.english ||
    !resolvedBreathing.name ||
    !resolvedBreathing.duration ||
    !resolvedBreathing.desc ||
    !resolvedPunya.title ||
    !resolvedPunya.activity ||
    resolvedReflections.length === 0
  ) {
    return null;
  }

  return {
    verse: resolvedVerse,
    breathing: resolvedBreathing,
    reflections: resolvedReflections,
    punya: resolvedPunya,
  };
}
