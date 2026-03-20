import { ReactNode } from "react";
import { Text, View } from "react-native";
import AnimatedPressable from "../AnimatedPressable";

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
        className={`rounded-2xl px-5 py-4 items-center justify-center border
        ${
          isDisabled
            ? "bg-surface dark:bg-surface-dark border-border dark:border-border-dark"
            : "bg-accent-primary dark:bg-accent-primary-dark border-accent-primary dark:border-accent-primary-dark"
        }`}
        containerStyle={{
          shadowOpacity: isDisabled ? 0.1 : 0.35,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        <Text
          className={`text-base font-uiSemiBold tracking-wide
          ${
            isDisabled
              ? "text-text-secondary dark:text-text-secondary-dark"
              : "text-night-indigo"
          }`}
        >
          {label}
        </Text>
      </AnimatedPressable>

      {footer ? <View className="mt-3 items-center">{footer}</View> : null}
    </View>
  );
}