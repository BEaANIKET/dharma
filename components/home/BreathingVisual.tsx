import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { colors } from "@/theme/colors";

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
        className="h-20 w-20 items-center justify-center rounded-full"
        style={{
          transform: [{ scale }],
          backgroundColor: tried ? "rgba(78,205,196,0.22)" : colors.breathingMint,
          shadowColor: colors.breathingMint,
          shadowOpacity: active ? 0.62 : tried ? 0.2 : 0.32,
          shadowRadius: active ? 26 : 12,
          shadowOffset: { width: 0, height: 0 },
          elevation: active ? 10 : 3,
        }}
      >
        {tried ? (
          <Text className="text-2xl" style={{ color: "#d4fff9" }}>
            ✓
          </Text>
        ) : active ? (
          <Text className="text-xl font-uiBold" style={{ color: "#e5fffb" }}>
            {secondsLeft}
          </Text>
        ) : null}
        <View
          className="absolute top-[12px] left-[14px] h-4 w-4 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.35)",
          }}
        />
      </Animated.View>
    </View>
  );
}
