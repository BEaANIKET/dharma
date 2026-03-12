import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Pressable, ScrollView, Text, View } from "react-native";
import { colors } from "@/theme/colors";
import { textStyles } from "@/theme/typography";
import BreathingVisual from "./BreathingVisual";
import { MainType, ThumbDirection, ResolvedHomeRecipe } from "./data";

interface HomeMainCardProps {
  mainType: MainType;
  recipe: ResolvedHomeRecipe;
  isPlaying: boolean;
  breathingActive: boolean;
  thumbs: Record<string, ThumbDirection | null>;
  onTogglePlay: () => void;
  onToggleBreathing: () => void;
  onThumb: (id: string, direction: ThumbDirection) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

// --- Helper Component: Animated Audio Waveform ---
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
          className="bg-primary"
          style={{
            width: 3,
            height: 16,
            transform: [{ scaleY: anim }],
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
}

// --- Main Component ---
export default function HomeMainCard({
  mainType,
  recipe,
  isPlaying,
  breathingActive,
  onTogglePlay,
  onToggleBreathing,
}: HomeMainCardProps) {
  const verse = recipe.verse;
  const breathing = recipe.breathing;
  const [openInsightIndex, setOpenInsightIndex] = useState<number | null>(null);

  // --- 1. VERSE CARD RENDER ---
  if (mainType === "verse") {
    const insights = verse.deeper_insights?.length
      ? verse.deeper_insights
      : [
          { emoji: "🌊", title: "The Ocean That Doesn't Ask...", inference: "" },
          { emoji: "🔥", title: "Desires Will Not Stop", inference: "" },
          { emoji: "🧘", title: "The Devotee's True Strength", inference: "" },
        ];

    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="rounded-3xl border p-4 "
          style={{ width: CARD_WIDTH, borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft, minHeight: 660 }}
        >
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-textMuted">FOR YOU RIGHT NOW</Text>

          <View className="mt-3 flex-row items-start gap-[14px]">
            {/* <View className="h-12 w-12 items-center justify-center rounded-[14px]" style={{ backgroundColor: `${colors.primary}1A` }}>
              <Text className="text-2xl"></Text>
            </View> */}
            <View className="flex-1 pr-2">
              <Text className="text-2xl font-headingBold text-textPrimary">{verse.title}</Text>
              <Text className="text-sm text-textSecondary">{verse.subtitle}</Text>
              <View className="mt-3 flex-row items-center gap-2">
                <View className="border border-cardBorder px-2 py-1 rounded-md">
                  <Text className={`${textStyles.label} uppercase text-textSecondary`}>
                    {verse.tag || "GITA"}
                  </Text>
                </View>
                <Text className={`${textStyles.caption} text-textMuted`}>5 MINS</Text>
              </View>
            </View>

            <Pressable
              onPress={onTogglePlay}
              className="rounded-2xl px-4 py-4 "
            >
              <AudioWaveform isPlaying={isPlaying} />
            </Pressable>
          </View>

          <View className="mt-6 rounded-2xl border p-5 items-center" style={{ borderColor: colors.cardBorder }}>
            <Text className="text-center text-lg leading-relaxed text-textPrimary font-devanagari">
              {verse.sanskrit}
            </Text>
            <Text className="text-xs text-textMuted mt-4 font-uiSemiBold tracking-wider uppercase">
              ✨ The Gita in its purest form
            </Text>
          </View>

          <View className="mt-4 rounded-2xl border p-5 items-center" style={{ borderColor: colors.cardBorder }}>
            <View className=" rounded-2xl px-5 py-3 items-center mb-5 border border-cardBorder">
              <Text className="text-lg mb-1">🧠</Text>
              <Text className={`${textStyles.label} text-primary uppercase`}>
                Decode the Wisdom
              </Text>
              {/* <Text className={`${textStyles.label} text-textMuted uppercase`}>
                Word-for-Word Breakdown
              </Text> */}
            </View>
            <Text className="text-center text-base leading-relaxed text-textSecondary font-uiMedium">
              "{verse.english}"
            </Text>
          </View>

          <View className="mt-5 rounded-2xl border p-5" style={{ borderColor: colors.cardBorder }}>
            <View className="flex-row items-center mb-4">
              <Text className="text-xl mr-3">🔔</Text>
              <View>
                <Text className="text-base font-uiBold text-textPrimary">{verse.deeper_insights_title || "Deeper Insight"}</Text>
                <Text className="text-xs font-ui text-textSecondary">
                  Exploring the layers of this teaching
                </Text>
              </View>
            </View>

            {insights.map((insight, index) => (
              <View
                key={`${insight.title}-${index}`}
                className="rounded-xl px-4 py-2 mb-2 bg-backgroundSoft border border-cardBorder"
              >
                <Pressable
                  onPress={() =>
                    setOpenInsightIndex((prev) => (prev === index ? null : index))
                  }
                  className="flex-row items-center"
                >
                  <Text className="text-lg mr-3">{insight.emoji}</Text>
                  <Text className="flex-1 text-sm font-uiSemiBold text-textSecondary">{insight.title}</Text>
                  <Text className="text-xs text-textMuted">{openInsightIndex === index ? "▲" : "▼"}</Text>
                </Pressable>
                {openInsightIndex === index && insight.inference ? (
                  <Text className="mt-2 text-xs text-textMuted leading-relaxed">{insight.inference}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // --- 2. BREATHING CARD RENDER ---
  return <BreathingCard breathing={breathing} breathingActive={breathingActive} onToggleBreathing={onToggleBreathing} />;
}

// --- Internal Helper: Breathing Card Implementation ---
function BreathingCard({ breathing, breathingActive, onToggleBreathing }: any) {
  const phases = useMemo(() => {
    // Basic parser for pattern "4-4-4" etc
    return [{ label: "INHALE", seconds: 4 }, { label: "HOLD", seconds: 4 }, { label: "EXHALE", seconds: 6 }];
  }, []);

  const scrollRef = useRef<ScrollView>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const [page, setPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [tried, setTried] = useState(false);

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
      <View className="mb-4 flex-row items-center justify-center gap-[6px]">
        {[0, 1].map((dot) => (
          <View key={dot} style={{ width: page === dot ? 20 : 6, height: 6, borderRadius: 999, backgroundColor: page === dot ? colors.breathingMint : "rgba(78,205,196,0.25)" }} />
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH))}
        scrollEventThrottle={16}
        contentContainerStyle={{ gap: 16 }}
      >
        {/* Breathing Page 1 */}
        <View className="rounded-3xl border px-7 pt-10 pb-8" style={{ width: CARD_WIDTH, borderColor: "rgba(78,205,196,0.2)", backgroundColor: colors.backgroundSoft, minHeight: 660 }}>
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-textMuted">FOR YOU RIGHT NOW</Text>
          <View className="mt-3 flex-row items-center gap-[14px]">
            <View className="h-12 w-12 items-center justify-center rounded-[14px]" style={{ backgroundColor: "rgba(78,205,196,0.12)" }}>
              <Text className="text-2xl">{breathing.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-headingBold text-textPrimary">{breathing.name}</Text>
              <Text className="text-sm text-textSecondary">{breathing.desc}</Text>
            </View>
          </View>

          <Pressable onPress={onToggleBreathing} className="items-center py-10">
            <BreathingVisual active={breathingActive} tried={tried} scale={scale} secondsLeft={secondsLeft} />
          </Pressable>

          <View className="flex-1">
            <Text className="text-xl leading-relaxed font-headingSemiBoldItalic text-textSecondary">{breathing.science}</Text>
          </View>

          <Pressable onPress={handleTried} className="bg-primary rounded-2xl py-[17px] items-center">
            <Text className="text-lg font-uiBold text-backgroundDeep">I did this practice</Text>
          </Pressable>
        </View>

        {/* Breathing Page 2 (Stats) */}
        <View className="rounded-3xl border px-6 pt-8 pb-7" style={{ width: CARD_WIDTH, borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
           <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-textMuted">WHAT JUST HAPPENED</Text>
           <View className="mt-8 gap-6">
              <Text className="text-base leading-relaxed text-textSecondary font-uiItalic">
                Slow breathing can help shift your nervous system toward calm and reduce stress load.
              </Text>
           </View>
        </View>
      </ScrollView>
    </View>
  );
}
