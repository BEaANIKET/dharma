export type MoodTheme = {
  label: string;
  emoji: string;
  accent: string;
  soft: string;
  border: string;
};

export const MOODS: MoodTheme[] = [
  { label: "Anxious", emoji: "😰", accent: "#9B8EC4", soft: "#1a1a38", border: "#252545" },
  { label: "Hopeful", emoji: "😊", accent: "#4ECDC4", soft: "#1a1a38", border: "#252545" },
  { label: "Sad", emoji: "😢", accent: "#9B8EC4", soft: "#1a1a38", border: "#252545" },
  { label: "Angry", emoji: "😡", accent: "#C94058", soft: "#1a1a38", border: "#252545" },
  { label: "Grateful", emoji: "🙏", accent: "#FFD25A", soft: "#1a1a38", border: "#252545" },
  { label: "Tired", emoji: "😴", accent: "#9B8EC4", soft: "#1a1a38", border: "#252545" },
];

export const moodMap = Object.fromEntries(
  MOODS.map((mood) => [mood.label, mood])
) as Record<string, MoodTheme>;
