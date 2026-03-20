import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface BreathingVisualProps {
  active: boolean;
  tried: boolean;
  scale: Animated.Value;
  secondsLeft: number;
}

export default function BreathingVisual({ active, tried, scale, secondsLeft }: BreathingVisualProps) {
  return (
    <View className="h-[132px] w-[132px] items-center justify-center">
      <Animated.View
        className={`h-20 w-20 items-center justify-center rounded-full shadow-lg ${tried ? "bg-accent-primary-dark/25" : "bg-accent-primary-dark"}`}
        style={{
          transform: [{ scale }],
          shadowOpacity: active ? 0.62 : tried ? 0.2 : 0.32,
          shadowRadius: active ? 26 : 12,
          shadowOffset: { width: 0, height: 0 },
          elevation: active ? 10 : 3,
        }}
      >
        {tried ? (
          <Text className="text-2xl text-text-primary-dark">
            ✓
          </Text>
        ) : active ? (
          <Text className="text-xl font-uiBold text-text-primary-dark">
            {secondsLeft}
          </Text>
        ) : null}
        <View
          className="absolute top-[12px] left-[14px] h-4 w-4 rounded-full bg-text-primary-dark/35"
        />
      </Animated.View>
    </View>
  );
}
