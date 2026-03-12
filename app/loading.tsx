import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { router } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import { useMoodStore } from "@/store/useMoodStore";
import { moodMap } from "@/constants/moodThemes";
import { colors } from "@/theme/tokens";

const LOADING_STEPS = [
  "Consulting all 700 Gita verses...",
  "Filtering shlokas for your current mood...",
  "Weaving your practice together...",
];

export default function Loading() {
  const selectedMood = useMoodStore((state) => state.selectedMood);
  const selectedTheme = selectedMood ? moodMap[selectedMood] : null;
  const moodEmoji = selectedTheme?.emoji ?? "🕉️";

  const [stepIndex, setStepIndex] = useState(0);
  const floatY = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.5)).current;
  const dots = useMemo(() => [0, 1, 2], []);

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, {
          toValue: -14,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(floatY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.35,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    pulseLoop.start();

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
    };
  }, [floatY, pulse]);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setStepIndex((current) => (current + 1) % LOADING_STEPS.length);
    }, 1700);

    const routeTimer = setTimeout(() => {
      router.replace("/(tabs)/explore");
    }, 5200);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(routeTimer);
    };
  }, []);

  return (
    <GradientBackground>
      <View className="flex-1 justify-center items-center px-6">
        <Animated.Text
          style={{
            transform: [{ translateY: floatY }],
            fontSize: 88,
          }}
        >
          {moodEmoji}
        </Animated.Text>

        <Text className="text-textPrimary text-xl italic text-center mt-10 leading-10 font-ui">
          {LOADING_STEPS[stepIndex]}
        </Text>

        <View className="flex-row mt-8">
          {dots.map((dot) => (
            <Animated.View
              key={dot}
              className="h-4 w-4 rounded-full mx-2"
              style={{
                backgroundColor:
                  dot === stepIndex ? selectedTheme?.accent ?? colors.primary : colors.cardBorder,
                opacity: dot === stepIndex ? pulse : 0.7,
              }}
            />
          ))}
        </View>

        <Text className="text-textMuted mt-16 font-ui tracking-widest">
          DHARMA AI
        </Text>
      </View>
    </GradientBackground>
  );
}
