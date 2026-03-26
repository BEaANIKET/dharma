import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import type { DharmaCardData } from "./data";

/* ── accent → theme-token mapping ── */
const accentStyles: Record<
  DharmaCardData["accent"],
  {
    bg: string;
    border: string;
    badge: string;
    badgeText: string;
    title: string;
    icon: string;
  }
> = {
  gold: {
    bg: "bg-highlight/[0.06]",
    border: "border-highlight/[0.14]",
    badge: "bg-highlight/[0.14]",
    badgeText: "text-highlight dark:text-highlight-dark",
    title: "text-highlight dark:text-highlight-dark",
    icon: "#D4960A",
  },
  teal: {
    bg: "bg-dharma-teal/[0.08]",
    border: "border-dharma-teal/[0.18]",
    badge: "bg-dharma-teal/[0.14]",
    badgeText: "text-dharma-teal",
    title: "text-accent-primary dark:text-accent-primary-dark",
    icon: "#4ECDC4",
  },
  violet: {
    bg: "bg-cosmic-violet/[0.08]",
    border: "border-cosmic-violet/[0.18]",
    badge: "bg-cosmic-violet/[0.14]",
    badgeText: "text-cosmic-violet",
    title: "text-accent-secondary dark:text-accent-secondary-dark",
    icon: "#9B8EC4",
  },
  mint: {
    bg: "bg-success-dark/[0.08]",
    border: "border-success-dark/[0.18]",
    badge: "bg-success-dark/[0.14]",
    badgeText: "text-success dark:text-success-dark",
    title: "text-success dark:text-success-dark",
    icon: "#5AD4A6",
  },
};

interface DharmaCardProps {
  card: DharmaCardData;
  index: number;
  scrollY: Animated.Value;
}

const CARD_HEIGHT = 172;
const OVERLAP = 20;
const VISIBLE_STEP = CARD_HEIGHT - OVERLAP;

export { CARD_HEIGHT, OVERLAP, VISIBLE_STEP };

export default function DharmaCard({ card, index, scrollY }: DharmaCardProps) {
  const s = accentStyles[card.accent];
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const inputRange = [
    (index - 1) * VISIBLE_STEP,
    index * VISIBLE_STEP,
    (index + 1) * VISIBLE_STEP,
  ];

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.97, 1, 0.97],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [
      (index - 2) * VISIBLE_STEP,
      (index - 1) * VISIBLE_STEP,
      index * VISIBLE_STEP,
      (index + 1.5) * VISIBLE_STEP,
    ],
    outputRange: [0.6, 0.85, 1, 0.7],
    extrapolate: "clamp",
  });

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      damping: 20,
      stiffness: 300,
    }).start();

  const onPressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start();

  return (
    <Animated.View
      style={{
        transform: [
          { scale: Animated.multiply(scale, scaleAnim) },
        ],
        opacity,
        zIndex: 10 - index,
        marginBottom: -OVERLAP,
      }}
    >
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <View
          className={`rounded-[18px] border p-5 ${s.bg} ${s.border}`}
          style={{ minHeight: CARD_HEIGHT }}
        >
          {/* Top row: badge + arrow */}
          <View className="flex-row items-center justify-between mb-3">
            <View className={`rounded-full px-2.5 py-[3px] ${s.badge} flex-row items-center gap-1.5`}>
              <Text className="text-sm">{card.emoji}</Text>
              <Text className={`font-uiSemiBold text-[10px] uppercase tracking-[1px] ${s.badgeText}`}>
                {card.subtitle}
              </Text>
            </View>
            <View className="bg-white/[0.06] rounded-full w-7 h-7 items-center justify-center">
              <Ionicons name="arrow-forward" size={14} color={s.icon} />
            </View>
          </View>

          {/* Title */}
          <Text className={`text-2xl font-headingBold ${s.title} mb-1.5`}>
            {card.title}
          </Text>

          {/* Description */}
          <Text className="text-[12.5px] leading-[18px] font-ui text-text-secondary dark:text-text-secondary-dark">
            {card.description}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
