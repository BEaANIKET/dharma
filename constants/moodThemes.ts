export type MoodTheme = {
  label: string;
  emoji: string;
  accent: string;
  soft: string;
  border: string;
};

export const MOODS: MoodTheme[] = [
  { label: "Anxious", emoji: "😰", accent: "#60A5FA", soft: "#1D3A68", border: "#3B82F6" },
  { label: "Hopeful", emoji: "😊", accent: "#2DD4BF", soft: "#103A37", border: "#14B8A6" },
  { label: "Sad", emoji: "😢", accent: "#38BDF8", soft: "#0F3243", border: "#0EA5E9" },
  { label: "Angry", emoji: "😡", accent: "#F87171", soft: "#4B1F2B", border: "#EF4444" },
  { label: "Grateful", emoji: "🙏", accent: "#FCD34D", soft: "#4A3B1C", border: "#F59E0B" },
  { label: "Tired", emoji: "😴", accent: "#A78BFA", soft: "#2E234A", border: "#8B5CF6" },
];

export const moodMap = Object.fromEntries(
  MOODS.map((mood) => [mood.label, mood])
) as Record<string, MoodTheme>;
