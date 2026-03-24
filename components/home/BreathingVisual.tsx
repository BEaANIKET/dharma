import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

interface BreathingPhase {
  label: string;
  seconds: number;
}

interface BreathingVisualProps {
  active: boolean;
  tried: boolean;
  phases: BreathingPhase[];
}

const SPHERE = 100;

export default function BreathingVisual({ active, tried, phases }: BreathingVisualProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const activeRef = useRef(active);
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  activeRef.current = active;

  const cleanup = useCallback(() => {
    animRef.current?.stop();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runPhase = useCallback(
    (idx: number) => {
      if (!activeRef.current) return;
      const phase = phases[idx];
      if (!phase) return;

      setPhaseIndex(idx);
      setSecondsLeft(phase.seconds);

      const upper = phase.label.toUpperCase();
      const isInhale = upper === "INHALE";
      const isHold = upper === "HOLD";

      const anims: Animated.CompositeAnimation[] = [];

      // Scale: expand on inhale, shrink on exhale, hold keeps current
      if (!isHold) {
        anims.push(
          Animated.timing(scale, {
            toValue: isInhale ? 1.35 : 0.75,
            duration: phase.seconds * 1000,
            useNativeDriver: true,
          }),
        );
      }

      // Countdown timer
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);

      animRef.current = Animated.parallel(anims);
      animRef.current.start(({ finished }) => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (finished && activeRef.current) {
          runPhase((idx + 1) % phases.length);
        }
      });
    },
    [phases, scale],
  );

  useEffect(() => {
    if (active) {
      scale.setValue(1);
      runPhase(0);
    } else {
      cleanup();
      Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      setPhaseIndex(0);
      setSecondsLeft(0);
    }
    return cleanup;
  }, [active]);

  return (
    <View className="items-center">
      {/* Sphere container */}
      <View
        style={{ height: 180, width: 180, alignItems: "center", justifyContent: "center" }}
      >
        {/* Main sphere */}
        <Animated.View
          style={{
            height: SPHERE,
            width: SPHERE,
            borderRadius: SPHERE / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: tried ? "rgba(78,205,196,0.25)" : "#4ECDC4",
            transform: [{ scale }],
            shadowColor: "#4ECDC4",
            shadowOpacity: active ? 1 : 0.5,
            shadowRadius: active ? 60 : 24,
            shadowOffset: { width: 0, height: 0 },
            elevation: active ? 30 : 12,
          }}
        >
          {/* Light reflection */}
          {/* <View
            style={{
              position: "absolute",
              top: 14,
              left: 18,
              height: 18,
              width: 18,
              borderRadius: 9,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          /> */}

          {tried ? (
            <Text style={{ fontSize: 28, color: "#fff" }}>✓</Text>
          ) : active ? (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 32, fontWeight: "700", color: "#09090F" }}>
                {secondsLeft}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#09090F",
                  opacity: 0.6,
                  textTransform: "uppercase",
                }}
              >
                {phases[phaseIndex]?.label}
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#09090F" }}>TAP</Text>
          )}
        </Animated.View>
      </View>

      {/* Phase labels */}
      <View className="mt-2 flex-row items-center justify-center gap-5">
        {phases.map((phase, index) => {
          const isActive = active && phaseIndex === index;
          return (
            <View key={phase.label} className="items-center">
                {/* <View
                  className={`mb-1.5 h-1.5 w-1.5 rounded-full ${
                    isActive
                      ? "bg-accent-primary dark:bg-accent-primary-dark"
                      : "bg-transparent"
                  }`}
                /> */}
              <Text
                className={`text-xs font-uiSemiBold uppercase tracking-wider ${
                  isActive
                    ? "text-accent-primary dark:text-accent-primary-dark"
                    : "text-secondary/30 dark:text-secondary-dark/30"
                }`}
              >
                {phase.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
