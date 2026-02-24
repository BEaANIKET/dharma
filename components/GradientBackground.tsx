import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

export default function GradientBackground({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={["#0C1222", "#111827", "#0A0F1E"]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}