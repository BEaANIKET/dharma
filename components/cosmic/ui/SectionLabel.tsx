import { Text } from "react-native";

export type LabelVariant = "default" | "gold" | "teal" | "error";

const variantClasses: Record<LabelVariant, string> = {
  default: "text-white/30",
  gold: "text-highlight",
  teal: "text-dharma-teal/60",
  error: "text-error-dark/60",
};

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: LabelVariant;
  className?: string;
}

export default function SectionLabel({
  children,
  variant = "default",
  className = "",
}: SectionLabelProps) {
  return (
    <Text
      className={`text-[9px] tracking-[1.2px] uppercase font-uiSemiBold mb-1.5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Text>
  );
}
