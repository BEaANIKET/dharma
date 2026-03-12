import { colors } from "@/theme/colors";
import { RecipeApiResponse } from "@/services/api";

export const MOOD_OPTIONS = [
  { label: "Anxious", emoji: "😰", accent: colors.primary, text: colors.backgroundDeep },
  { label: "Lost", emoji: "😔", accent: colors.accentIndigo, text: colors.backgroundDeep },
  { label: "Angry", emoji: "😤", accent: colors.accentRose, text: colors.backgroundDeep },
  { label: "Numb", emoji: "😶", accent: colors.textSecondary, text: colors.backgroundDeep },
  { label: "Overthinking", emoji: "🌀", accent: colors.accentIndigo, text: colors.backgroundDeep },
  { label: "Heartbroken", emoji: "💔", accent: colors.accentRose, text: colors.backgroundDeep },
] as const;

export type MoodLabel = (typeof MOOD_OPTIONS)[number]["label"];
export type MainType = "verse" | "breathing";
export type ThumbDirection = "up" | "down";

export const LOADING_STEPS = [
  "Consulting all 700 Gita verses...",
  "Filtering practices for your current state...",
  "Weaving your path for today...",
];

export const VERSE_DATA: Record<
  MoodLabel,
  { ch: number; v: number; sanskrit: string; english: string; science: string; tag: string; connection: string }
> = {
  Anxious: {
    ch: 2,
    v: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    english: "You aaaaaaaaaaaaaaaaaannhave the right to perform your duty, but never to the fruits of your actions.",
    science:
      "Focusing on process over outcome reduces cortisol and helps shift activity toward rational regulation.",
    tag: "Neuroscience",
    connection:
      "Anxiety often comes from future outcomes. This verse redirects you to the one thing in your control: effort.",
  },
  Lost: {
    ch: 6,
    v: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्",
    english: "Elevate yourself through the power of your own mind. Do not degrade yourself.",
    science: "Intrinsic motivation strongly predicts long-term well-being and personal meaning.",
    tag: "Psychology",
    connection: "When direction feels unclear, this verse points inward. Your next step starts within.",
  },
  Angry: {
    ch: 2,
    v: 63,
    sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः",
    english:
      "From anger comes delusion; from delusion, loss of memory; from loss of memory, destruction of intelligence.",
    science: "Anger rapidly narrows reasoning bandwidth and weakens memory recall under stress.",
    tag: "Biology",
    connection: "This is the exact chain reaction of rage. Pause early, and the whole cascade softens.",
  },
  Numb: {
    ch: 4,
    v: 38,
    sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते",
    english: "In this world, there is nothing as purifying as knowledge.",
    science: "Learning can reactivate reward circuitry and restore curiosity during emotional shutdown.",
    tag: "Neuroscience",
    connection: "Numbness is often freeze. Small doses of learning gently restart engagement.",
  },
  Overthinking: {
    ch: 6,
    v: 35,
    sanskrit: "मनो दुर्निग्रहं चलम्",
    english: "The mind is restless and difficult to control, but it can be trained through practice and detachment.",
    science: "Steady attention practice improves cognitive control and reduces repetitive thought loops.",
    tag: "Neuroscience",
    connection: "Your mind is active, not broken. Repetition and structure turn noise into direction.",
  },
  Heartbroken: {
    ch: 2,
    v: 14,
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः",
    english: "Pleasure and pain are temporary. Endure them with steadiness.",
    science: "Emotional pain and physical pain share neural pathways, and both gradually soften over time.",
    tag: "Psychology",
    connection: "Your pain is real. The verse does not deny it, it reminds you it will move.",
  },
};

export const BREATHING_DATA: Record<
  MoodLabel,
  { name: string; pattern: string; duration: string; desc: string; science: string }
> = {
  Anxious: {
    name: "Box Breathing",
    pattern: "4-4-4-4",
    duration: "3 min",
    desc: "Inhale 4s · Hold 4s · Exhale 4s · Hold 4s",
    science: "Steady breath cadence can calm sympathetic arousal within minutes.",
  },
  Lost: {
    name: "Alternate Nostril",
    pattern: "Nadi Shodhana",
    duration: "5 min",
    desc: "Left in · Right out · Alternate rhythm",
    science: "Alternating flow patterns improve attentional stability and clarity.",
  },
  Angry: {
    name: "Cooling Breath",
    pattern: "Sheetali",
    duration: "4 min",
    desc: "Inhale cool air · Exhale slowly through nose",
    science: "Cooling patterns lower activation and can reduce heart-rate spikes.",
  },
  Numb: {
    name: "Breath of Fire",
    pattern: "Kapalabhati",
    duration: "3 min",
    desc: "Rhythmic exhales · Passive inhales",
    science: "Rhythmic activation can help lift low-energy freeze states.",
  },
  Overthinking: {
    name: "Extended Exhale",
    pattern: "4-7-8",
    duration: "4 min",
    desc: "Inhale 4s · Hold 7s · Exhale 8s",
    science: "Longer exhales can reduce cognitive overdrive and settle rumination.",
  },
  
  Heartbroken: {
    name: "Heart-Opening Breath",
    pattern: "Anahata",
    duration: "6 min",
    desc: "Slow deep breaths · Hands on heart",
    science: "Slow chest breathing increases vagal tone and emotional regulation.",
  },
};

export const REFLECTIONS: Record<MoodLabel, string[]> = {
  Anxious: [
    "What specifically am I afraid will happen?",
    "Has this worst-case scenario actually happened before?",
    "What would I say to a friend feeling this?",
  ],
  Lost: [
    "What made me feel alive in the last month?",
    "If no one judged me, what would I do next?",
    "What is one thing I can control today?",
  ],
  Angry: [
    "Under this anger, what is actually hurt?",
    "Will this still matter in five years?",
    "What boundary do I need to set clearly?",
  ],
  Numb: [
    "When did I last feel something strongly?",
    "What am I protecting myself from right now?",
    "What sensation do I notice in my body?",
  ],
  Overthinking: [
    "Which thoughts are facts, and which are stories?",
    "What is the next single action?",
    "Am I solving this, or rehearsing it?",
  ],
  Heartbroken: [
    "What did this relationship teach me about myself?",
    "What parts of me existed before this person?",
    "What does healing look like one day at a time?",
  ],
};

export const PUNYA_DEEDS = [
  "Send a genuine compliment to someone today",
  "Leave a kind note where a stranger will find it",
  "Donate something you no longer need",
  "Cook a meal for someone without being asked",
  "Call a family member you have not spoken to in a while",
  "Pick up litter in your neighborhood",
  "Forgive someone silently in your heart",
  "Write down three things you are grateful for",
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
