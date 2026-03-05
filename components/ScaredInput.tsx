import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TextInputProps,
  View,
  Platform,
} from "react-native";

interface SacredInputProps extends TextInputProps {
  label?: string;
  error?: string;

  /* Color overrides (for onboarding or default theme) */
  labelColor?: string;
  activeLabelColor?: string;
  textColor?: string;
  underlineColor?: string;
  underlineBaseColor?: string;
  errorColor?: string;
}

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";
const SANS = Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif";

export default function SacredInput({
  label,
  error,
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
    <View className="w-full mb-6">
      {label && (
        <Text
          className="mb-2 text-[11px] uppercase tracking-[4px]"
          style={{
            fontFamily: SANS,
            color: focused
              ? activeLabelColor ?? underlineColor
              : labelColor,
          }}
        >
          {label}
        </Text>
      )}

      <TextInput
        {...props}
        className="text-[18px] py-2"
        style={[
          {
            fontFamily: SERIF,
            color: textColor,
          },
          style,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {/* Base underline */}
      <View
        className="h-px w-full mt-2"
        style={{ backgroundColor: underlineBaseColor }}
      />

      {/* Animated gold underline */}
      <Animated.View
        className="absolute bottom-0 h-[1.5px] w-full"
        style={{
          backgroundColor: underlineColor,
          opacity: underlineOp,
          transform: [{ scaleX: underlineScale }],
        }}
      />

      {error && (
        <Text
          className="mt-2 text-xs"
          style={{ color: errorColor, fontFamily: SANS }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}