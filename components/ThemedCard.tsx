import { ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { MoodTheme } from "@/types/mood";

type Props = {
  theme?: MoodTheme | null;
  children: ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  className?: string; 
};

const defaultTheme: MoodTheme = {
  label: "Default",
  emoji: "✨",
  accent: "#4ECDC4",
  soft: "#1a1a38",
  border: "#252545",
};

export default function ThemedCard({
  theme,
  children,
  style,
  padding = true,
  className = "",
}: Props) {
  return (
    <LinearGradient
      colors={["#1a1a38", "#111128"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[style]}
      className={`rounded-3xl border border-border dark:border-border-dark overflow-hidden shadow-lg ${
        padding ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </LinearGradient>
  );
}
