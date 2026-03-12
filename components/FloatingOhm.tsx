import { useEffect, useRef } from "react";
import { Text, View, Animated, Easing } from "react-native";
import { colors } from "@/theme/tokens";

type FloatingOmProps = {
  size?: number;
  color?: string;
  opacity?: number;
  top?: number;
  left?: number;
  rotate?: string;
};

export default function FloatingOm({
  size = 180,
  color = colors.onboardingGoldOm,
  opacity = 0.035,
  top = 160,
  left = 40,
  rotate = "0deg",
}: FloatingOmProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating up/down loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Breathing scale loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        transform: [
          // { translateY: floatAnim },
          // { scale: scaleAnim },
        ],
      }}
    >
      <Text
        className="font-heading"
        style={{
          fontSize: size,
          color,
          opacity,
        }}
      >
        ॐ MyDharma
      </Text>
    </Animated.View>
  );
}
