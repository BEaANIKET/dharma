import { Pressable, Text } from "react-native";

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
        className={`text-lg tracking-wide font-uiItalic ${disabled ? "text-text-secondary/70 dark:text-text-secondary-dark/50" : "text-accent-primary dark:text-accent-primary-dark"}`}
      >
        {direction === "back" ? arrow + label : label + arrow}
      </Text>
    </Pressable>
  );
}
