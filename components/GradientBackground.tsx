import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { colors } from "@/theme/colors";

export default function GradientBackground({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSoft, colors.backgroundDeep]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
