export interface DharmaCardData {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  accent: "gold" | "teal" | "violet" | "mint";
}

export interface CategoryData {
  id: string;
  label: string;
  emoji: string;
  accent: "gold" | "teal" | "violet" | "mint";
}

export const DHARMA_CARDS: DharmaCardData[] = [
  {
    id: "reflection",
    emoji: "🪷",
    title: "Daily Reflection",
    subtitle: "Pause & Look Within",
    description:
      "A gentle prompt to turn inward. Reflect on your day, your emotions, and your growth with guided introspection.",
    accent: "violet",
  },
  {
    id: "meditation",
    emoji: "🧘",
    title: "Guided Meditation",
    subtitle: "Stillness in Motion",
    description:
      "Curated meditation sessions from ancient traditions. Breathe, center, and dissolve the noise around you.",
    accent: "teal",
  },
  {
    id: "quote",
    emoji: "✦",
    title: "Spiritual Quote",
    subtitle: "Words That Illuminate",
    description:
      "Timeless wisdom from the Bhagavad Gita, Upanishads, and enlightened masters — one verse at a time.",
    accent: "gold",
  },
  {
    id: "habits",
    emoji: "🔥",
    title: "Habit Builder",
    subtitle: "Sacred Discipline",
    description:
      "Build spiritual routines that stick. Track your sadhana, prayers, and daily practices with gentle accountability.",
    accent: "gold",
  },
  {
    id: "community",
    emoji: "🙏",
    title: "Community",
    subtitle: "Sangha — Together We Rise",
    description:
      "Connect with fellow seekers. Share reflections, join group meditations, and walk the path together.",
    accent: "mint",
  },
];

export const CATEGORIES: CategoryData[] = [
  { id: "all", label: "All", emoji: "🕉️", accent: "gold" },
  { id: "vedanta", label: "Vedanta", emoji: "📜", accent: "gold" },
  { id: "yoga", label: "Yoga", emoji: "🧘", accent: "teal" },
  { id: "mantra", label: "Mantra", emoji: "🔔", accent: "violet" },
  { id: "ayurveda", label: "Ayurveda", emoji: "🌿", accent: "mint" },
  { id: "jyotish", label: "Jyotish", emoji: "⭐", accent: "gold" },
  { id: "bhakti", label: "Bhakti", emoji: "💛", accent: "gold" },
];
