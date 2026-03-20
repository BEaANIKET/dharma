import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface SacredInputProps extends TextInputProps {
  label?: string;
  error?: string;
  prefixText?: string;
  prefixColor?: string;

  /* Color overrides (for onboarding or default theme) */
  labelColor?: string;
  activeLabelColor?: string;
  textColor?: string;
  underlineColor?: string;
  underlineBaseColor?: string;
  errorColor?: string;
}

export default function SacredInput({
  label,
  error,
  prefixText,
  prefixColor,
  labelColor,
  activeLabelColor,
  textColor,
  underlineColor,
  underlineBaseColor,
  errorColor,
  style,
  ...props
}: SacredInputProps) {
  const [focused, setFocused] = useState(false);

  const underlineScale = useRef(new Animated.Value(0)).current;
  const underlineOp = useRef(new Animated.Value(0)).current;

  const animate = (val: Animated.Value, to: number, dur: number) =>
    Animated.timing(val, {
      toValue: to,
      duration: dur,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

  const onFocus = () => {
    setFocused(true);
    Animated.parallel([
      animate(underlineScale, 1, 420),
      animate(underlineOp, 1, 420),
    ]).start();
  };

  const onBlur = () => {
    setFocused(false);
    Animated.parallel([
      animate(underlineScale, 0, 300),
      animate(underlineOp, 0, 300),
    ]).start();
  };

  return (
    <View className="w-full  mb-6">
      {label && (
        <Text
          className={`mb-2 text-xs uppercase tracking-widest font-ui ${
            focused ? "text-accent-primary dark:text-accent-primary-dark" : "text-text-secondary/70 dark:text-text-secondary-dark/50"
          }`}
        >
          {label}
        </Text>
      )}

      <View className="flex-row items-center">
        {prefixText ? (
          <Text
            className="mr-2 text-lg font-ui text-text-primary dark:text-text-primary-dark"
          >
            {prefixText}
          </Text>
        ) : null}

        <TextInput
          {...props}
          className="flex-1 text-lg py-2 font-uitext-text-primary dark:text-text-primary-dark placeholder:text-text-primary dark:placeholder:text-text-primary-dark/35"          // style={style}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>

      {/* Base underline */}
      <View className="h-px w-full mt-2 bg-border dark:bg-border-dark" />

      {/* Animated gold underline */}
      <Animated.View
        className="absolute bottom-0 h-[1.5px] w-full bg-accent-primary dark:bg-accent-primary-dark"
        style={{
          opacity: underlineOp,
          transform: [{ scaleX: underlineScale }],
        }}
      />

      {error && (
        <Text
          className="mt-2 text-xs font-ui text-error dark:text-error-dark"
        >
          {error}
        </Text>
      )}
    </View>
  );
}
