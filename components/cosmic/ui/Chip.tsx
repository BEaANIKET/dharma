import { Text, View } from "react-native";

export type ChipVariant = "default" | "gold" | "teal";

const containerVariants: Record<ChipVariant, string> = {
  default: "bg-white/[0.06] border-white/10",
  gold: "bg-highlight/[0.12] border-highlight/25",
  teal: "bg-dharma-teal/[0.11] border-dharma-teal/[0.22]",
};

const textVariants: Record<ChipVariant, string> = {
  default: "text-secondary-dark",
  gold: "text-highlight",
  teal: "text-dharma-teal",
};

interface ChipProps {
  text: string;
  variant?: ChipVariant;
  className?: string;
}

export default function Chip({
  text,
  variant = "default",
  className = "",
}: ChipProps) {
  return (
    <View
      className={`rounded-full px-2.5 py-[3px] border ${containerVariants[variant]} ${className}`}
    >
      <Text className={`font-uiMedium text-[10px] ${textVariants[variant]}`}>
        {text}
      </Text>
    </View>
  );
}
