import { colors } from "@/theme/tokens";

export type MoodTheme = {
  label: string;
  emoji: string;
  accent: string;
  soft: string;
  border: string;
};

export const MOODS: MoodTheme[] = [
  { label: "Anxious", emoji: "😰", accent: colors.accentIndigo, soft: colors.backgroundElevated, border: colors.accentIndigo },
  { label: "Hopeful", emoji: "😊", accent: colors.accentSage, soft: colors.backgroundElevated, border: colors.accentSageDeep },
  { label: "Sad", emoji: "😢", accent: colors.accentIndigo, soft: colors.backgroundElevated, border: colors.accentIndigo },
  { label: "Angry", emoji: "😡", accent: colors.accentRose, soft: colors.backgroundElevated, border: colors.accentRose },
  { label: "Grateful", emoji: "🙏", accent: colors.primary, soft: colors.backgroundElevated, border: colors.primarySoft },
  { label: "Tired", emoji: "😴", accent: colors.accentIndigo, soft: colors.backgroundElevated, border: colors.accentIndigo },
];

export const moodMap = Object.fromEntries(
  MOODS.map((mood) => [mood.label, mood])
) as Record<string, MoodTheme>;
