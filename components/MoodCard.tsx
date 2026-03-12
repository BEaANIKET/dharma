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
      <Text className="text-3xl">{emoji}</Text>
      <Text
        className={
          isSelected
            ? "mt-2 text-center text-lg font-uiBold"
            : "mt-2 text-center text-lg font-uiMedium"
        }
        style={{
          color: isSelected ? accentColor : colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
