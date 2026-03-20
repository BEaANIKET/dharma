import { ReactNode } from "react";
import { View } from "react-native";

type OnboardingCardProps = {
  children: ReactNode;
  className?: string;
};

export default function OnboardingCard({ children, className }: OnboardingCardProps) {
  return (
    <View
      className={`bg-surface/40 dark:bg-surface-dark/40 rounded-2xl border border-border/40 dark:border-border-dark/40 px-5 py-5 shadow-lg ${className ?? ""}`}
    >
      {children}
    </View>
  );
}
