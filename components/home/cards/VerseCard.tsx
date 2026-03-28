import { textStyles } from "@/theme/typography";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, Text, View } from "react-native";
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
    <View className="flex-row items-end h-3 gap-[2px]">
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          className="bg-highlight dark:bg-highlight-dark w-[3px] h-3 rounded-[2px]"
          style={{ transform: [{ scaleY: anim }] }}
        />
      ))}
    </View>
  );
}

export default function VerseCard({ recipe, isPlaying, onTogglePlay }: VerseCardProps) {
  const verse = recipe.verse;
  const [insightsOpen, setInsightsOpen] = useState(false);

  const insights = verse.deeper_insights?.length
    ? verse.deeper_insights
    : [
        { emoji: "🌊", title: "The Ocean That Doesn't Ask...", inference: "" },
        { emoji: "🔥", title: "Desires Will Not Stop", inference: "" },
        { emoji: "🧘", title: "The Devotee's True Strength", inference: "" },
      ];

  return (
    <View
      className="rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-3"
      style={{ width: CARD_WIDTH }}
    >
      {/* Eyebrow label */}
      <Text className="text-[10px] uppercase tracking-widest font-uiSemiBold text-highlight dark:text-highlight-dark">
        FOR YOU RIGHT NOW
      </Text>

      {/* Title row */}
      <View className="mt-2 flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/10 dark:bg-accent-primary-dark/10 border border-accent-primary/30 dark:border-accent-primary-dark/30">
          <Text className="text-xl">{verse.emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-headingBold text-primary dark:text-text-primary-dark" numberOfLines={1}>
            {verse.title.length > 18 ? verse.title.slice(0, 18) + "…" : verse.title}
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
            {verse.subtitle}
          </Text>
          <View className="mt-1 flex-row items-center gap-2">
            <View className="bg-highlight/15 dark:bg-highlight-dark/15 border border-highlight/25 dark:border-highlight-dark/25 px-2 py-[2px] rounded-md">
              <Text className={`${textStyles.label} uppercase text-highlight dark:text-highlight-dark`}>
                {verse.tag || "GITA"}
              </Text>
            </View>
            <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">5 min</Text>
          </View>
        </View>

        {/* Audio play button */}
        <Pressable onPress={onTogglePlay} className="rounded-xl px-3 py-3">
          <AudioWaveform isPlaying={isPlaying} />
        </Pressable>
      </View>

      {/* Sanskrit block */}
      <View className="mt-2 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-3 items-center">
        <Text className="text-center text-sm leading-snug font-devanagari text-primary dark:text-text-primary-dark">
          {verse.sanskrit}
        </Text>
        <Text className="text-[10px] font-uiSemiBold tracking-wider uppercase text-highlight dark:text-highlight-dark mt-2">
          ✨ The Gita in its purest form
        </Text>
      </View>

      {/* Translation / Decode block */}
      <View className="mt-2 rounded-xl bg-highlight/5 dark:bg-highlight-dark/10 border border-highlight/15 dark:border-highlight-dark/20 p-3 items-center">
        <View className="rounded-xl px-4 py-2 items-center mb-2 bg-highlight/15 dark:bg-highlight-dark/20 border border-highlight/20 dark:border-highlight-dark/25">
          <Text className={`${textStyles.label} text-highlight dark:text-highlight-dark uppercase`}>🧠 Decode the Wisdom</Text>
        </View>
        <Text className="text-center text-xs leading-relaxed font-uiMedium text-secondary dark:text-secondary-dark">
          "{verse.english}"
        </Text>
      </View>

      {/* Deeper Insights — single accordion */}
      <View className="mt-2 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark overflow-hidden">
        <Pressable
          onPress={() => setInsightsOpen((prev) => !prev)}
          className="flex-row items-center px-3 py-2"
        >
          <Text className="text-sm mr-2">🔔</Text>
          <Text className="flex-1 text-xs font-uiBold text-primary dark:text-text-primary-dark">
            {verse.deeper_insights_title || "Deeper Insight"}
          </Text>
          <Text className="text-[10px] font-uiSemiBold text-highlight dark:text-highlight-dark">
            {insightsOpen ? "▲" : "▼"}
          </Text>
        </Pressable>

        {insightsOpen && (
          <View className="px-3 pb-2 gap-1">
            {insights.map((insight, index) => (
              <View
                key={`${insight.title}-${index}`}
                className="rounded-lg px-3 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark"
              >
                <Text className="text-xs font-uiSemiBold text-primary dark:text-text-primary-dark">
                  {insight.emoji} {insight.title}
                </Text>
                {insight.inference ? (
                  <Text className="mt-1 text-xs font-ui leading-relaxed text-secondary dark:text-secondary-dark">
                    {insight.inference}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
