import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import type { CategoryData } from "./data";

const accentStyles: Record<
  CategoryData["accent"],
  { active: string; activeBorder: string; activeText: string }
> = {
  gold: {
    active: "bg-highlight/[0.14]",
    activeBorder: "border-highlight/30",
    activeText: "text-highlight dark:text-highlight-dark",
  },
  teal: {
    active: "bg-dharma-teal/[0.12]",
    activeBorder: "border-dharma-teal/25",
    activeText: "text-dharma-teal",
  },
  violet: {
    active: "bg-cosmic-violet/[0.12]",
    activeBorder: "border-cosmic-violet/25",
    activeText: "text-cosmic-violet",
  },
  mint: {
    active: "bg-success-dark/[0.12]",
    activeBorder: "border-success-dark/25",
    activeText: "text-success dark:text-success-dark",
  },
};

interface CategoryChipProps {
  category: CategoryData;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  category,
  isActive,
  onPress,
}: CategoryChipProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const s = accentStyles[category.accent];

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.93,
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

  const containerClass = isActive
    ? `${s.active} ${s.activeBorder}`
    : "bg-white/[0.06] border-white/10";

  const textClass = isActive
    ? s.activeText
    : "text-text-secondary dark:text-text-secondary-dark";

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View
          className={`rounded-full px-3.5 py-[7px] border flex-row items-center gap-1.5 ${containerClass}`}
        >
          <Text className="text-xs">{category.emoji}</Text>
          <Text className={`font-uiMedium text-[11px] ${textClass}`}>
            {category.label}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
