import { ReactNode } from "react";
import { Text, View } from "react-native";
import AnimatedPressable from "../AnimatedPressable";
import { colors } from "@/theme/colors";

type PrimaryGlowButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  footer?: ReactNode;
};

export default function PrimaryGlowButton({
  label,
  onPress,
  disabled,
  footer,
}: PrimaryGlowButtonProps) {
  return (
    <View>
      <AnimatedPressable
        onPress={onPress}
        disabled={disabled}
        className={`rounded-2xl px-5 py-4 items-center justify-center border border-cyan-300/40 ${
          disabled ? "bg-white/5" : "bg-cyan-400/20"
        }`}
        containerStyle={{
          shadowColor: colors.primary,
          shadowOpacity: disabled ? 0.1 : 0.3,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        <Text className="text-cyan-100 text-base font-semibold tracking-wide">
          {label}
        </Text>
      </AnimatedPressable>
      {footer ? <View className="mt-3 items-center">{footer}</View> : null}
    </View>
  );
}
