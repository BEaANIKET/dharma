import { Pressable, Text } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

type TextButtonProps = {
  label: string;
  onPress: () => void;
  direction?: "forward" | "back";
  disabled?: boolean;
  className?: string;
};

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
          ...typography.quote,
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
