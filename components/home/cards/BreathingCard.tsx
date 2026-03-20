import { useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import BreathingVisual from "../BreathingVisual";
import { ResolvedHomeRecipe } from "../data";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

interface BreathingCardProps {
  breathing: ResolvedHomeRecipe["breathing"];
  breathingActive: boolean;
  onToggleBreathing: () => void;
}

export default function BreathingCard({ breathing, breathingActive, onToggleBreathing }: BreathingCardProps) {
  const scrollRef = useRef<ScrollView>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const [page, setPage] = useState(0);
  const [secondsLeft] = useState(4);
  const [tried, setTried] = useState(false);

  const phases = useMemo(() => {
    if (Array.isArray(breathing.breath_phases) && breathing.breath_phases.length > 0) {
      return breathing.breath_phases.map((phase) => ({
        label: phase.name,
        seconds: phase.seconds,
      }));
    }
    return [{ label: "INHALE", seconds: 4 }, { label: "HOLD", seconds: 4 }, { label: "EXHALE", seconds: 6 }];
  }, [breathing.breath_phases]);

  void phases;

  const handleTried = () => {
    setTried(true);
    if (breathingActive) onToggleBreathing();
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: CARD_WIDTH + 16, animated: true });
      setPage(1);
    }, 500);
  };

  return (
    <View>
      {/* Pagination dots */}
      <View className="mb-4 flex-row items-center justify-center gap-[6px]">
        {[0, 1].map((dot) => (
          <View
            key={dot}
            className={`h-[6px] rounded-full ${
              page === dot
                ? "w-5 bg-accent-primary dark:bg-accent-primary-dark"
                : "w-[6px] bg-accent-primary/25 dark:bg-accent-primary-dark/25"
            }`}
          />
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH))}
        scrollEventThrottle={16}
        contentContainerClassName="gap-4"
      >
        {/* Page 1: Practice */}
        <View
          className="rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-4"
          style={{ width: CARD_WIDTH, minHeight: 620 }}
        >
          {/* Eyebrow label */}
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-accent-primary dark:text-accent-primary-dark">
            FOR YOU RIGHT NOW
          </Text>

          {/* Title row */}
          <View className="mt-3 flex-row items-center gap-[14px]">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary/10 dark:bg-accent-primary-dark/10 border border-accent-primary/30 dark:border-accent-primary-dark/30">
              <Text className="text-2xl">{breathing.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-headingBold text-primary dark:text-text-primary-dark">
                {breathing.name}
              </Text>
              <Text className="text-sm font-ui text-secondary dark:text-secondary-dark">
                {breathing.pattern} · {breathing.duration}
              </Text>
            </View>
          </View>

          {/* Breathing orb */}
          <Pressable onPress={onToggleBreathing} className="items-center py-8">
            <BreathingVisual
              active={breathingActive}
              tried={tried}
              scale={scale}
              secondsLeft={secondsLeft}
            />
          </Pressable>

          {/* Why this helps */}
          <View className="rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-4">
            <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-accent-primary dark:text-accent-primary-dark">
              WHY THIS HELPS
            </Text>
            <Text className="mt-2 text-sm leading-relaxed font-ui text-secondary dark:text-secondary-dark">
              {breathing.science}
            </Text>
          </View>

          {/* Steps */}
          {Array.isArray(breathing.steps) && breathing.steps.length > 0 ? (
            <View className="mt-3 rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-4">
              <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-accent-primary dark:text-accent-primary-dark">
                STEPS
              </Text>
              <View className="mt-3 gap-2">
                {breathing.steps.map((step, index) => (
                  <View key={`${step}-${index}`} className="flex-row items-start gap-3">
                    <Text className="text-xs font-uiSemiBold text-accent-primary dark:text-accent-primary-dark">
                      {index + 1}.
                    </Text>
                    <Text className="flex-1 text-sm leading-relaxed font-ui text-secondary dark:text-secondary-dark">
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* CTA */}
          <Pressable
            onPress={handleTried}
            className="bg-accent-primary dark:bg-accent-primary-dark rounded-2xl py-4 mt-4 items-center"
          >
            <Text className="text-base font-uiBold text-bg dark:text-bg-dark">I did this practice</Text>
          </Pressable>
        </View>

        {/* Page 2: What just happened */}
        <View
          className="rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark px-6 pt-8 pb-7"
          style={{ width: CARD_WIDTH }}
        >
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-accent-primary dark:text-accent-primary-dark">
            WHAT JUST HAPPENED
          </Text>

          {tried && Array.isArray(breathing.ai_impact) && breathing.ai_impact.length > 0 ? (
            <View className="mt-4">
              <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-accent-primary dark:text-accent-primary-dark">
                IMPACT
              </Text>
              <View className="mt-3 gap-3">
                {breathing.ai_impact.map((impact, index) => (
                  <View
                    key={`${impact.point}-${index}`}
                    className="flex-row rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-3 items-start gap-3"
                  >
                    <Text className="text-lg">{impact.emoji}</Text>
                    <Text className="flex-1 text-sm leading-relaxed font-ui text-secondary dark:text-secondary-dark">
                      {impact.point}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
