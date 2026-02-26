import { Pressable, Text } from "react-native";
import { colors } from "@/theme/colors";

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
  accentColor = colors.primary,
  softColor = colors.primarySurface,
  borderColor = colors.primary,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="mt-8 mb-8 w-full rounded-2xl  py-4 items-center justify-center border"
      style={{
        backgroundColor: disabled ? colors.disabledCard : softColor,
        borderColor: disabled ? colors.disabledBorder : borderColor,
        transform: [{ scale: true && !disabled ? 0.98 : 1 }],
      }}
    >
      <Text
        className="text-lg italic"
        style={{ color: disabled ? colors.textDisabled : accentColor }}
      >
        Curate my spiritual experience →
      </Text>
    </Pressable>
  );
}
