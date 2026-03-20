import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { useThemeStore } from "@/store/useThemeStore";

// Token values from tailwind.config.js
const BG_DARK    = "#111128"; // bg-dark  — night-indigo
const BG_LIGHT   = "#E8E4DC"; // bg       — parchment

export default function GradientBackground({ children }: { children: ReactNode }) {
  const isDark = useThemeStore((state) => state.isDark);
  const bg = isDark ? BG_DARK : BG_LIGHT;

  return (
    <LinearGradient
      colors={[bg, bg, bg]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
