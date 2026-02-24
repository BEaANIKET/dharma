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
  { label: "Energized", emoji: "🔥", accent: "#FB7185", soft: "#4A2232", border: "#F43F5E" },
  { label: "Confused", emoji: "😕", accent: "#94A3B8", soft: "#2A3342", border: "#64748B" },
  { label: "Heartbroken", emoji: "💔", accent: "#F472B6", soft: "#4A1F3A", border: "#EC4899" },
  { label: "Inspired", emoji: "✨", accent: "#22D3EE", soft: "#123B4A", border: "#06B6D4" },
  { label: "Peaceful", emoji: "😌", accent: "#34D399", soft: "#163A2F", border: "#10B981" },
  { label: "Overwhelmed", emoji: "🌊", accent: "#38BDF8", soft: "#15374A", border: "#0EA5E9" },
];

export const moodMap = Object.fromEntries(
  MOODS.map((mood) => [mood.label, mood])
) as Record<string, MoodTheme>;
