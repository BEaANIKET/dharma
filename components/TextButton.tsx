import { Pressable, Text, Platform } from "react-native";
import { colors } from "@/theme/colors";

type TextButtonProps = {
  label: string;
  onPress: () => void;
  direction?: "forward" | "back";
  disabled?: boolean;
  className?: string;
};

const SERIF_ITALIC =
  Platform.OS === "ios" ? "Georgia-Italic" : "serif";

export default function TextButton({
  label,
  onPress,
  direction = "forward",
  disabled = false,
  className = "",
}: TextButtonProps) {
  const arrow = direction === "forward" ? " →" : "← ";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center ${className}`}
      style={({ pressed }) => ({
        opacity: disabled ? 0.3 : pressed ? 0.5 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
    >
      <Text
        className="text-[17px] tracking-wide"
        style={{
          fontFamily: SERIF_ITALIC,
          fontStyle: "italic",
          color: !disabled
            ? colors.primary
            : colors.onboardingGoldLabel,
        }}
      >
      {direction === "back" ? arrow + label : label + arrow}
    </Text>
    </Pressable >
  );
}