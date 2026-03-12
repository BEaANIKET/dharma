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
  const isDisabled = Boolean(disabled);

  return (
    <View>
      <AnimatedPressable
        onPress={onPress}
        disabled={isDisabled}
        className="rounded-2xl px-5 py-4 items-center justify-center border"
        style={{
          backgroundColor: isDisabled ? colors.disabledCard : colors.primary,
          borderColor: isDisabled ? colors.disabledBorder : colors.primarySoft,
        }}
        containerStyle={{
          shadowColor: colors.glow,
          shadowOpacity: isDisabled ? 0.1 : 0.3,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        <Text
          className="text-base font-uiSemiBold tracking-wide"
          style={{ color: isDisabled ? colors.textDisabled : colors.backgroundDeep }}
        >
          {label}
        </Text>
      </AnimatedPressable>
      {footer ? <View className="mt-3 items-center">{footer}</View> : null}
    </View>
  );
}
