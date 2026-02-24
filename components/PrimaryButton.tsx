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
  accentColor = "#22D3EE",
  softColor = "#274352",
  borderColor = "#22D3EE",
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="mt-8 mb-8 w-full rounded-2xl  py-4 items-center justify-center border"
      style={{
        backgroundColor: disabled ? "rgba(21,28,47,0.75)" : softColor,
        borderColor: disabled ? "rgba(255,255,255,0.12)" : borderColor,
        transform: [{ scale: true && !disabled ? 0.98 : 1 }],
      }}
    >
      <Text
        className="text-lg italic"
        style={{ color: disabled ? "#9CA3AF" : accentColor }}
      >
        Curate my spiritual experience →
      </Text>
    </Pressable>
  );
}
