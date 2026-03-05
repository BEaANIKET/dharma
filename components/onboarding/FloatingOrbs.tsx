import { useEffect, useRef } from "react";
import { Animated, type ViewStyle } from "react-native";
import { colors } from "@/theme/colors";

type Percent = `${number}%`;

type OrbProps = {
  size: number;
  top: Percent;
  left: Percent;
  delay: number;
  duration: number;
  opacity: number;
};

function Orb({ size, top, left, delay, duration, opacity }: OrbProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: duration / 2,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 10,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [delay, duration, translateY]);

  const orbStyle = {
    position: "absolute",
    top,
    left,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.primaryTint12,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  } satisfies ViewStyle;

  return (
    <Animated.View
      style={[
        orbStyle,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="none"
    />
  );
}

export default function FloatingOrbs() {
  return (
    <>
      <Orb size={180} top="-6%" left="-14%" delay={0} duration={6800} opacity={0.5} />
      <Orb size={120} top="14%" left="72%" delay={600} duration={6200} opacity={0.35} />
      <Orb size={220} top="58%" left="-18%" delay={1200} duration={7200} opacity={0.4} />
      <Orb size={140} top="72%" left="70%" delay={400} duration={6600} opacity={0.3} />
    </>
  );
}
