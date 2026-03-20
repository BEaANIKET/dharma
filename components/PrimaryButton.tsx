import { Pressable, Text } from "react-native";

interface PrimaryButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  accentColor?: string;
  softColor?: string;
  borderColor?: string;
}

export default function PrimaryButton({
  disabled = false,
  onPress,
  accentColor,
  softColor,
  borderColor,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`mt-8 mb-8 w-full rounded-2xl py-4 items-center justify-center border ${
        disabled ? "border-disabled dark:border-disabled-dark bg-disabled dark:bg-disabled-dark" : "border-accent-primary dark:border-accent-primary-dark bg-accent-primary dark:bg-accent-primary-dark"
      }`}
      style={{
        transform: [{ scale: true && !disabled ? 0.98 : 1 }],
      }}
    >
      <Text className={`text-lg font-uiItalic ${disabled ? "text-text-secondary/70 dark:text-text-secondary-dark/50" : "text-bg-dark"}`}>
        Curate my spiritual experience →
      </Text>
    </Pressable>
  );
}
