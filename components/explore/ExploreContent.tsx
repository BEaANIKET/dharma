import SectionLabel from "@/components/cosmic/ui/SectionLabel";
import { useRef, useState } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CategoryChip from "./CategoryChip";
import DharmaCard, { OVERLAP, VISIBLE_STEP } from "./DharmaCard";
import { CATEGORIES, DHARMA_CARDS } from "./data";

export default function ExploreContent() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <Animated.ScrollView
      className="flex-1 px-5"
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: insets.bottom + 40,
      }}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      {/* ── Section Title ── */}
      <View className="mb-2">
        <Text className="text-3xl font-headingBold text-text-primary dark:text-text-primary-dark">
          My Dharma
        </Text>
        <Text className="text-sm font-ui text-text-secondary dark:text-text-secondary-dark mt-1">
          Your path, your pace, your practice.
        </Text>
      </View>

      {/* ── Categories ── */}
      <View className="mt-5 mb-6">
        <SectionLabel variant="gold" className="mb-3 ml-0.5">
          Explore paths
        </SectionLabel>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 20 }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onPress={() => setActiveCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* ── Divider ── */}
      <View className="h-px bg-border dark:bg-border-dark mb-5" />

      {/* ── Card Stack ── */}
      <SectionLabel variant="default" className="mb-4 ml-0.5">
        Your dharma toolkit
      </SectionLabel>

      <View style={{ paddingBottom: OVERLAP + 12 }}>
        {DHARMA_CARDS.map((card, index) => (
          <DharmaCard
            key={card.id}
            card={card}
            index={index}
            scrollY={scrollY}
          />
        ))}
      </View>

      {/* ── Bottom Wisdom ── */}
      <View className="mt-6 items-center pb-4">
        <View className="h-px w-16 bg-border dark:bg-border-dark mb-4" />
        <Text className="text-xs font-headingMedium text-text-secondary/50 dark:text-text-secondary-dark/50 italic text-center">
          "Yoga is the journey of the self,{"\n"}through the self, to the self."
        </Text>
        <Text className="text-[9px] font-uiSemiBold text-highlight/40 dark:text-highlight-dark/40 mt-2 tracking-[1.5px] uppercase">
          Bhagavad Gita 6.20
        </Text>
      </View>
    </Animated.ScrollView>
  );
}
