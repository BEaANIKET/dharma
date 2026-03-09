import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

interface BreathingVisualProps {
  active: boolean;
  pattern?: string;
}

type BreathPhase = {
  label: "Inhale" | "Hold" | "Exhale";
  seconds: number;
  animate: boolean;
  targetScale?: number;
};

function buildPhases(pattern?: string): BreathPhase[] {
  const values = (pattern?.match(/\d+/g) ?? [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (values.length >= 4) {
    return [
      { label: "Inhale", seconds: values[0], animate: true, targetScale: 1.35 },
      { label: "Hold", seconds: values[1], animate: false },
      { label: "Exhale", seconds: values[2], animate: true, targetScale: 0.9 },
      { label: "Hold", seconds: values[3], animate: false },
    ];
  }

  if (values.length === 3) {
    return [
      { label: "Inhale", seconds: values[0], animate: true, targetScale: 1.35 },
      { label: "Hold", seconds: values[1], animate: false },
      { label: "Exhale", seconds: values[2], animate: true, targetScale: 0.9 },
    ];
  }

  if (values.length === 2) {
    return [
      { label: "Inhale", seconds: values[0], animate: true, targetScale: 1.35 },
      { label: "Exhale", seconds: values[1], animate: true, targetScale: 0.9 },
    ];
  }

  return [
    { label: "Inhale", seconds: 4, animate: true, targetScale: 1.35 },
    { label: "Hold", seconds: 4, animate: false },
    { label: "Exhale", seconds: 4, animate: true, targetScale: 0.9 },
    { label: "Hold", seconds: 4, animate: false },
  ];
}

export default function BreathingVisual({ active, pattern }: BreathingVisualProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [phaseLabel, setPhaseLabel] = useState<BreathPhase["label"]>("Inhale");

  useEffect(() => {
    const phases = buildPhases(pattern);

    const stopRunningCycle = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };

    if (!active) {
      stopRunningCycle();
      scale.setValue(1);
      setPhaseLabel("Inhale");
      return;
    }

    let cancelled = false;

    const runPhase = (index: number) => {
      if (cancelled) return;
      const phase = phases[index];
      const nextIndex = (index + 1) % phases.length;
      const durationMs = phase.seconds * 1000;

      setPhaseLabel(phase.label);

      if (phase.animate && phase.targetScale) {
        const animation = Animated.timing(scale, {
          toValue: phase.targetScale,
          duration: durationMs,
          useNativeDriver: true,
        });
        animationRef.current = animation;
        animation.start(({ finished }) => {
          if (!finished || cancelled) return;
          runPhase(nextIndex);
        });
        return;
      }

      timeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        runPhase(nextIndex);
      }, durationMs);
    };

    runPhase(0);

    return () => {
      cancelled = true;
      stopRunningCycle();
    };
  }, [active, pattern, scale]);

  return (
    <View className="items-center">
      <Animated.View
        className="h-24 w-24 items-center justify-center rounded-full border"
        style={{
          borderColor: `${colors.accentSage}50`,
          backgroundColor: `${colors.accentSage}22`,
          transform: [{ scale }],
        }}
      >
        <Ionicons name="leaf-outline" size={26} color={colors.accentSage} />
      </Animated.View>
      {active ? (
        <Text className="mt-8 text-sm font-semibold" style={{ color: colors.accentSage }}>
          {phaseLabel}
        </Text>
      ) : null}
    </View>
  );
}
