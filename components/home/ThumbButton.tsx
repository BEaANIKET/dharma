import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { ThumbDirection } from "./data";

interface ThumbButtonProps {
  direction: ThumbDirection;
  active: boolean;
  onPress: () => void;
}

export default function ThumbButton({ direction, active, onPress }: ThumbButtonProps) {
  const isUp = direction === "up";
  const iconName = isUp ? "thumbs-up-outline" : "thumbs-down-outline";
  const activeColor = isUp ? colors.accentSage : colors.accentRose;

  return (
    <Pressable
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-xl border"
      style={{
        borderColor: active ? activeColor : colors.cardBorder,
        backgroundColor: active ? `${activeColor}20` : "transparent",
      }}
    >
      <Ionicons name={iconName} size={16} color={active ? activeColor : colors.textMuted} />
    </Pressable>
  );
}
