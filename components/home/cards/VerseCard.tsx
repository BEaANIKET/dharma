import { textStyles } from "@/theme/typography";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { ResolvedHomeRecipe, ThumbDirection } from "../data";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

interface VerseCardProps {
  recipe: ResolvedHomeRecipe;
  isPlaying: boolean;
  onTogglePlay: () => void;
  thumbs: Record<string, ThumbDirection | null>;
  onThumb: (id: string, direction: ThumbDirection) => void;
}

function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const animations = useRef(bars.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (isPlaying) {
      const animateBar = (anim: Animated.Value) => {
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 0.7 + 0.3,
            duration: 200 + Math.random() * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 200 + Math.random() * 200,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished && isPlaying) animateBar(anim);
        });
      };
      animations.forEach((anim) => animateBar(anim));
    } else {
      animations.forEach((anim) => {
        anim.stopAnimation();
        Animated.timing(anim, { toValue: 0.3, duration: 200, useNativeDriver: true }).start();
      });
    }
  }, [isPlaying]);

  return (
    <View className="flex-row items-end h-4 gap-[2px]">
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          className="bg-highlight dark:bg-highlight-dark w-[3px] h-4 rounded-[2px]"
          style={{ transform: [{ scaleY: anim }] }}
        />
      ))}
    </View>
  );
}

export default function VerseCard({ recipe, isPlaying, onTogglePlay }: VerseCardProps) {
  const verse = recipe.verse;
  const [openInsightIndex, setOpenInsightIndex] = useState<number | null>(null);

  const insights = verse.deeper_insights?.length
    ? verse.deeper_insights
    : [
        { emoji: "🌊", title: "The Ocean That Doesn't Ask...", inference: "" },
        { emoji: "🔥", title: "Desires Will Not Stop", inference: "" },
        { emoji: "🧘", title: "The Devotee's True Strength", inference: "" },
      ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-4"
      style={{ width: CARD_WIDTH, minHeight: 660 }}
    >
      {/* Eyebrow label */}
      <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-highlight dark:text-highlight-dark">
        FOR YOU RIGHT NOW
      </Text>

      {/* Title row */}
      <View className="mt-3 flex-row items-start gap-[14px]">
        <View className="flex-1 pr-2">
          <Text className="text-2xl font-headingBold text-primary dark:text-text-primary-dark">
            {verse.title}
          </Text>
          <Text className="text-sm font-ui text-secondary dark:text-secondary-dark">
            {verse.subtitle}
          </Text>

          {/* Tag + duration */}
          <View className="mt-3 flex-row items-center gap-2">
            <View className="bg-highlight/15 dark:bg-highlight-dark/15 border border-highlight/25 dark:border-highlight-dark/25 px-2 py-1 rounded-md">
              <Text className={`${textStyles.label} uppercase text-highlight dark:text-highlight-dark`}>
                {verse.tag || "GITA"}
              </Text>
            </View>
            <Text className="text-sm font-ui text-secondary dark:text-secondary-dark">
              5 MINS
            </Text>
          </View>
        </View>

        {/* Audio play button */}
        <Pressable
          onPress={onTogglePlay}
          className="rounded-2xl  px-4 py-4"
        >
          <AudioWaveform isPlaying={isPlaying} />
        </Pressable>
      </View>

      {/* Sanskrit block */}
      <View className="mt-6 rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-5 items-center">
        <Text className="text-center text-lg leading-relaxed font-devanagari text-primary dark:text-text-primary-dark">
          {verse.sanskrit}
        </Text>
        <Text className="text-xs font-uiSemiBold tracking-wider uppercase text-highlight dark:text-highlight-dark mt-4">
          ✨ The Gita in its purest form
        </Text>
      </View>

      {/* Translation / Decode block */}
      <View className="mt-3 rounded-2xl bg-highlight/5 dark:bg-highlight-dark/10 border border-highlight/15 dark:border-highlight-dark/20 p-5 items-center">
        <View className="rounded-xl px-5 py-3 items-center mb-4 bg-highlight/15 dark:bg-highlight-dark/20 border border-highlight/20 dark:border-highlight-dark/25">
          <Text className="text-lg mb-1">🧠</Text>
          <Text className={`${textStyles.label} text-highlight dark:text-highlight-dark uppercase`}>
            Decode the Wisdom
          </Text>
        </View>
        <Text className="text-center text-sm leading-relaxed font-uiMedium text-secondary dark:text-secondary-dark">
          "{verse.english}"
        </Text>
      </View>

      {/* Deeper Insights */}
      <View className="mt-6">
        <View className="flex-row items-center mb-3">
          <Text className="text-xl mr-3">🔔</Text>
          <View>
            <Text className="text-base font-uiBold text-primary dark:text-text-primary-dark">
              {verse.deeper_insights_title || "Deeper Insight"}
            </Text>
            <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
              The ocean doesn't ask the rivers to stop.
            </Text>
          </View>
        </View>

        {insights.map((insight, index) => (
          <View
            key={`${insight.title}-${index}`}
            className="rounded-xl px-4 py-3 mb-2 bg-bg dark:bg-bg-dark border border-border dark:border-border-dark"
          >
            <Pressable
              onPress={() => setOpenInsightIndex((prev) => (prev === index ? null : index))}
              className="flex-row items-center"
            >
              <Text className="text-lg mr-3">{insight.emoji}</Text>
              <Text className="flex-1 text-sm font-uiSemiBold text-primary dark:text-text-primary-dark">
                {insight.title}
              </Text>
              <Text className="text-xs font-uiSemiBold text-highlight dark:text-highlight-dark">
                {openInsightIndex === index ? "▲" : "▼"}
              </Text>
            </Pressable>
            {openInsightIndex === index && insight.inference ? (
              <Text className="mt-2 text-sm font-ui leading-relaxed text-secondary dark:text-secondary-dark">
                {insight.inference}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
