import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export type Preference = {
  label: string;
  pref: "up" | "down" | null;
  icon: keyof typeof Ionicons.glyphMap;
};

export type SettingItem = {
  label: string;
  sub: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export const STATS = [
  { label: "Verses Heard", key: "verses", icon: "book-outline", color: colors.primary },
  { label: "Minutes Breathed", key: "minutes", icon: "leaf-outline", color: colors.accentSage },
  { label: "Deeds Done", key: "deeds", icon: "heart-outline", color: colors.accentRose },
] as const;

export const PREFERENCES: Preference[] = [
  { label: "Bhagavad Gita Verses", pref: "up", icon: "book-outline" },
  { label: "Breathing Exercises", pref: "up", icon: "leaf-outline" },
  { label: "Good Deeds (Punya)", pref: null, icon: "heart-outline" },
  { label: "Reflection Prompts", pref: "down", icon: "chatbubble-outline" },
  { label: "Hindu Mythology Stories", pref: null, icon: "sparkles-outline" },
];

export const SETTINGS: SettingItem[] = [
  { label: "Notifications", sub: "Daily verse at 7:00 AM", icon: "notifications-outline" },
  { label: "Dark Mode", sub: "Always on", icon: "moon-outline" },
  { label: "Language", sub: "English + Sanskrit", icon: "language-outline" },
];
