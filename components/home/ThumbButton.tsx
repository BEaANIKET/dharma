import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThumbDirection } from "./data";

interface ThumbButtonProps {
  direction: ThumbDirection;
  active: boolean;
  onPress: () => void;
}

export default function ThumbButton({ direction, active, onPress }: ThumbButtonProps) {
  const isUp = direction === "up";
  const iconName = isUp ? "thumbs-up-outline" : "thumbs-down-outline";
  const activeColor = isUp ? "#4ECDC4" : "#C94058";

  return (
    <Pressable
      onPress={onPress}
      className={`h-10 w-10 items-center justify-center rounded-xl border ${
        active
          ? isUp
            ? "border-accent-primary-dark bg-accent-primary-dark/20"
            : "border-error dark:border-error-dark bg-error/20 dark:bg-error-dark/20"
          : "border-border dark:border-border-dark bg-transparent"
      }`}
    >
      <Ionicons name={iconName} size={16} color={active ? activeColor : "#6b6878"} />
    </Pressable>
  );
}
