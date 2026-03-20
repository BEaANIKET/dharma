import { Ionicons } from "@expo/vector-icons";

export type Preference = {
  label: string;
  pref: "up" | "down" | null;
  icon: keyof typeof Ionicons.glyphMap;
};


export const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export const STATS = [
  { label: "Verses Heard", key: "verses", icon: "book-outline", color: "#FFD25A" },
  { label: "Minutes Breathed", key: "minutes", icon: "leaf-outline", color: "#4ECDC4" },
  { label: "Deeds Done", key: "deeds", icon: "heart-outline", color: "#C94058" },
] as const;

export const PREFERENCES: Preference[] = [
  { label: "Bhagavad Gita Verses", pref: "up", icon: "book-outline" },
  { label: "Breathing Exercises", pref: "up", icon: "leaf-outline" },
  { label: "Good Deeds (Punya)", pref: null, icon: "heart-outline" },
  { label: "Reflection Prompts", pref: "down", icon: "chatbubble-outline" },
  { label: "Hindu Mythology Stories", pref: null, icon: "sparkles-outline" },
];

