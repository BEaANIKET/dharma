import { Pressable, Text } from "react-native";
import { colors } from "@/theme/colors";

interface MoodCardProps {
  emoji: string;
  label: string;
  isSelected?: boolean;
  accentColor?: string;
  softColor?: string;
  borderColor?: string;
  onPress: () => void;
}

export default function MoodCard({
  emoji,
  label,
  isSelected = false,
  accentColor = colors.primary,
  softColor = colors.backgroundSoft,
  borderColor = colors.primarySoft,
  onPress,
}: MoodCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 h-[104px] w-[31.7%] items-center justify-center rounded-3xl border"
      style={{
        backgroundColor: true ? softColor : colors.backgroundSoft,
        borderColor: isSelected ? borderColor : colors.cardBorder,
      }}
    >
      <Text className="text-[33px]">{emoji}</Text>
      <Text
        className="mt-2 text-center text-[18px]"
        style={{
          color: isSelected ? accentColor : colors.textSecondary,
          fontWeight: isSelected ? "700" : "500",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
