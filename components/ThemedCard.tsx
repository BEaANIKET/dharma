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
  accent: "#3B82F6",
  soft: "#1E293B",
  border: "#334155",
};

export default function ThemedCard({
  theme,
  children,
  style,
  padding = true,
  className = "",
}: Props) {
  const resolvedTheme = theme ?? defaultTheme;
  return (
    <LinearGradient
      colors={[resolvedTheme.soft, resolvedTheme.soft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderColor: resolvedTheme.border,
          shadowColor: resolvedTheme.accent,
          shadowOpacity: 0.25,
          shadowRadius: 25,
        },
        style,
      ]}
      className={`rounded-3xl border overflow-hidden ${
        padding ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </LinearGradient>
  );
}
