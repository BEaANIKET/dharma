import { ReactNode } from "react";
import { View } from "react-native";
import { colors } from "@/theme/colors";

type OnboardingCardProps = {
  children: ReactNode;
  className?: string;
};

export default function OnboardingCard({ children, className }: OnboardingCardProps) {
  return (
    <View
      className={`bg-white/5 rounded-2xl border border-white/10 px-5 py-5 ${className ?? ""}`}
      style={{
        shadowColor: colors.primary,
        shadowOpacity: 0.18,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      {children}
    </View>
  );
}
