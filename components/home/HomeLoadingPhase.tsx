import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { LOADING_STEPS } from "./data";

interface HomeLoadingPhaseProps {
  moodEmoji: string;
}

export default function HomeLoadingPhase({ moodEmoji }: HomeLoadingPhaseProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const floatY = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.4)).current;
  const dots = useMemo(() => [0, 1, 2], []);

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -12, duration: 900, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.35, duration: 550, useNativeDriver: true }),
      ])
    );
    floatLoop.start();
    pulseLoop.start();

    const timer = setInterval(() => {
      setStepIndex((current) => (current + 1) % LOADING_STEPS.length);
    }, 1200);

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
      clearInterval(timer);
    };
  }, [floatY, pulse]);

  return (
    <View className="mt-24 items-center px-5">
      <Animated.Text style={{ transform: [{ translateY: floatY }], fontSize: 84 }}>{moodEmoji}</Animated.Text>

      <Text className="mt-10 text-center text-xl italic leading-9 font-ui text-text-primary dark:text-text-primary-dark">
        {LOADING_STEPS[stepIndex]}
      </Text>

      <View className="mt-8 flex-row">
        {dots.map((dot) => (
          <Animated.View
            key={dot}
            className={`mx-2 h-4 w-4 rounded-full ${dot === stepIndex ? "bg-accent-primary dark:bg-accent-primary-dark" : "bg-border dark:bg-border-dark"}`}
            style={{
              opacity: dot === stepIndex ? pulse : 0.75,
            }}
          />
        ))}
      </View>
    </View>
  );
}
