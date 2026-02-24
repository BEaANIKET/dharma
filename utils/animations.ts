import { useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";

type FadeSlideOptions = {
  fromY?: number;
  duration?: number;
  delay?: number;
};

type StaggerOptions = {
  fromY?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
};

export function useFadeSlideIn({
  fromY = 20,
  duration = 600,
  delay = 0,
}: FadeSlideOptions = {}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(fromY)).current;

  const start = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const style = useMemo(
    () => ({ opacity, transform: [{ translateY }] }),
    [opacity, translateY]
  );

  return { style, start, opacity, translateY };
}

export function useStaggeredFadeUp(
  count: number,
  {
    fromY = 18,
    duration = 520,
    delay = 0,
    stagger = 110,
  }: StaggerOptions = {}
) {
  const opacities = useRef(
    Array.from({ length: count }, () => new Animated.Value(0))
  ).current;
  const translateYs = useRef(
    Array.from({ length: count }, () => new Animated.Value(fromY))
  ).current;

  const styles = useMemo(
    () =>
      opacities.map((opacity, index) => ({
        opacity,
        transform: [{ translateY: translateYs[index] }],
      })),
    [opacities, translateYs]
  );

  const start = () => {
    const animations = opacities.map((opacity, index) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateYs[index], {
          toValue: 0,
          duration,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(stagger, animations).start();
  };

  return { styles, start };
}
