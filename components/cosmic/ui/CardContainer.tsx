import { View } from "react-native";

export type CardVariant = "cell" | "gold" | "teal" | "error";

const variantClasses: Record<CardVariant, string> = {
  cell: "bg-surface dark:bg-surface-dark border-white/10",
  gold: "bg-highlight/5 border-highlight/[0.14]",
  teal: "bg-dharma-teal/[0.11] border-dharma-teal/[0.22]",
  error: "bg-error-dark/[0.11] border-error-dark/[0.22]",
};

interface CardContainerProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

export default function CardContainer({
  children,
  variant = "cell",
  className = "",
}: CardContainerProps) {
  return (
    <View
      className={`border rounded-[13px] ${variantClasses[variant]} ${className}`}
    >
      {children}
    </View>
  );
}
