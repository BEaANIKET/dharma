import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutAnimation, Platform, Pressable, Text, UIManager, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { textStyles } from "@/theme/typography";
import { MOOD_OPTIONS, MainType, MoodLabel, ResolvedHomeRecipe, ThumbDirection } from "./data";
import HomeMainCard from "./HomeMainCard";

type RecipeCardType = "verse" | "breathing" | "punya" | "reflections";

interface HomeContentPhaseProps {
  moodLabel: MoodLabel;
  context: string;
  mainType: MainType;
  recipe: ResolvedHomeRecipe | null;
  recipeError?: string | null;
  onRetryRecipe?: () => void;
  onRequestScrollTo?: (y: number) => void;
  isPlaying: boolean;
  breathingActive: boolean;
  thumbs: Record<string, ThumbDirection | null>;
  onReset: () => void;
  onTogglePlay: () => void;
  onToggleBreathing: () => void;
  onThumb: (id: string, direction: ThumbDirection) => void;
}

export default function HomeContentPhase({
  moodLabel,
  context,
  mainType,
  recipe,
  recipeError,
  onRetryRecipe,
  onRequestScrollTo,
  isPlaying,
  breathingActive,
  thumbs,
  onReset,
  onTogglePlay,
  onToggleBreathing,
  onThumb,
}: HomeContentPhaseProps) {
  const moodTheme = MOOD_OPTIONS.find((mood) => mood.label === moodLabel);
  const sectionTopY = useRef(0);
  const [expandedCard, setExpandedCard] = useState<RecipeCardType>(mainType);
  const formatGitaRef = (ch: number, v: number) =>
    ch > 0 && v > 0 ? `Bhagavad Gita ${ch}.${v}` : "Bhagavad Gita";

  useEffect(() => {
    setExpandedCard(mainType);
  }, [mainType]);

  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const cardOrder = useMemo(() => {
    const allCards: RecipeCardType[] = ["verse", "breathing", "punya", "reflections"];
    return [expandedCard, ...allCards.filter((card) => card !== expandedCard)];
  }, [expandedCard]);

  const handleExpand = (card: RecipeCardType) => {
    if (card === expandedCard) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCard(card);
    if (onRequestScrollTo) {
      globalThis.setTimeout(() => onRequestScrollTo(Math.max(0, sectionTopY.current - 8)), 80);
    }
  };

  const renderCollapsedCard = (card: RecipeCardType) => {
    if (!recipe) return null;

    let icon: keyof typeof Ionicons.glyphMap = "chevron-forward";
    let iconColor = colors.textSecondary;
    let title = "";
    let subtitle = "";

    if (card === "verse") {
      icon = "book-outline";
      iconColor = colors.primary;
      title = formatGitaRef(recipe.verse.ch, recipe.verse.v);
      subtitle = recipe.verse.english;
    } else if (card === "breathing") {
      icon = "leaf-outline";
      iconColor = colors.accentSage;
      title = recipe.breathing.name;
      subtitle = `${recipe.breathing.pattern} · ${recipe.breathing.duration}`;
    } else if (card === "punya") {
      icon = "heart-outline";
      iconColor = colors.accentRose;
      title = "Punya · Good Deed";
      subtitle = recipe.punya.title;
    } else {
      icon = "chatbubble-outline";
      iconColor = colors.accentIndigo;
      title = "Reflections";
      subtitle = `${recipe.reflections.length} journal prompts`;
    }

    return (
      <Pressable
        key={card}
        onPress={() => handleExpand(card)}
        className="mb-3 flex-row items-center rounded-2xl border px-4 py-4"
        style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
      >
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-xl border"
          style={{
            borderColor: `${iconColor}4D`,
            backgroundColor: `${iconColor}1A`,
          }}
        >
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-uiSemiBold" style={{ color: colors.textPrimary }}>
            {title}
          </Text>
          <Text className="text-xs font-ui" numberOfLines={1} style={{ color: colors.textMuted }}>
            {subtitle}
          </Text>
        </View>
        <Ionicons name="chevron-up-outline" size={16} color={colors.textMuted} />
      </Pressable>
    );
  };

  const renderExpandedCard = (card: RecipeCardType) => {
    if (!recipe) return null;

    if (card === "verse" || card === "breathing") {
      return (
        <View key={card} className="mb-3">
          <HomeMainCard
            mainType={card}
            recipe={recipe}
            isPlaying={isPlaying}
            breathingActive={breathingActive}
            thumbs={thumbs}
            onTogglePlay={onTogglePlay}
            onToggleBreathing={onToggleBreathing}
            onThumb={onThumb}
          />
        </View>
      );
    }

    if (card === "punya") {
      return (
        <View
          key={card}
          className="mb-3 rounded-3xl border px-7 pt-10 pb-8"
          style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
        >
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-textMuted">FOR YOU RIGHT NOW</Text>

          <View className="mt-3 flex-row items-center gap-[14px]">
            <View className="h-12 w-12 items-center justify-center rounded-[14px]" style={{ backgroundColor: `${colors.accentRose}1A` }}>
              <Text className="text-2xl">{recipe.punya.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-headingBold text-textPrimary">{recipe.punya.title}</Text>
              <Text className="text-sm text-textSecondary">{recipe.punya.subtitle || "A small act of kindness"}</Text>
            </View>
          </View>

          <View className="mt-5 rounded-2xl border p-5" style={{ borderColor: colors.cardBorder, backgroundColor: colors.background }}>
            <Text className="text-base leading-relaxed text-textSecondary font-uiMedium">
              {recipe.punya.activity}
            </Text>
          </View>

          {recipe.punya.ai_why ? (
            <View className="mt-4 rounded-2xl border p-5" style={{ borderColor: colors.cardBorder, backgroundColor: colors.background }}>
              <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-textMuted">WHY THIS HELPS</Text>
              <Text className="mt-2 text-sm leading-relaxed text-textSecondary">
                {recipe.punya.ai_why}
              </Text>
            </View>
          ) : null}

          {recipe.punya.ai_impact.length > 0 ? (
            <View className="mt-4 rounded-2xl border p-5" style={{ borderColor: colors.cardBorder, backgroundColor: colors.background }}>
              <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-textMuted">IMPACT</Text>
              <View className="mt-3 gap-3">
                {recipe.punya.ai_impact.map((impact, index) => (
                  <View key={`${impact.point}-${index}`} className="flex-row items-start gap-3">
                    <Text className="text-lg">{impact.emoji}</Text>
                    <Text className="flex-1 text-sm leading-relaxed text-textSecondary">{impact.point}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View className="mt-5 flex-row justify-center gap-3">
            <Pressable
              onPress={() => onThumb("punya", "up")}
              className="rounded-full border px-4 py-2"
              style={{
                borderColor: thumbs.punya === "up" ? colors.accentSage : colors.cardBorder,
                backgroundColor: thumbs.punya === "up" ? `${colors.accentSage}20` : "transparent",
              }}
            >
              <Text className="font-ui" style={{ color: thumbs.punya === "up" ? colors.accentSage : colors.textSecondary }}>
                Helpful
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onThumb("punya", "down")}
              className="rounded-full border px-4 py-2"
              style={{
                borderColor: thumbs.punya === "down" ? colors.accentRose : colors.cardBorder,
                backgroundColor: thumbs.punya === "down" ? `${colors.accentRose}20` : "transparent",
              }}
            >
              <Text className="font-ui" style={{ color: thumbs.punya === "down" ? colors.accentRose : colors.textSecondary }}>
                Skip
              </Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return (
      <View
        key={card}
        className="mb-3 rounded-3xl border p-5"
        style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
      >
        <View className="mb-3 flex-row items-center">
          <View
            className="mr-3 h-11 w-11 items-center justify-center rounded-xl border"
            style={{ borderColor: `${colors.accentIndigo}4D`, backgroundColor: `${colors.accentIndigo}1A` }}
          >
            <Ionicons name="chatbubble-outline" size={18} color={colors.accentIndigo} />
          </View>
          <View>
            <Text className="text-base font-uiSemiBold" style={{ color: colors.textPrimary }}>
              Reflections
            </Text>
            <Text className="text-xs font-ui" style={{ color: colors.textMuted }}>
              Journal prompts for you
            </Text>
          </View>
        </View>

        {recipe.reflections.map((reflection, index) => (
          <View
            key={`${reflection}-${index}`}
            className="rounded-xl border px-3 py-3"
            style={{
              borderColor: colors.cardBorder,
              backgroundColor: colors.background,
              marginBottom: index === recipe.reflections.length - 1 ? 0 : 8,
            }}
          >
            <Text className="text-sm leading-6 font-uiItalic" style={{ color: colors.textSecondary }}>
              &quot;{reflection}&quot;
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View
      onLayout={(event) => {
        sectionTopY.current = event.nativeEvent.layout.y;
      }}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <View
          className="flex-row items-center rounded-full border px-3 py-1"
          style={{
            backgroundColor: colors.primaryTint12,
            borderColor: `${colors.primary}4D`,
          }}
        >
          <Text className="mr-2 text-base">{moodTheme?.emoji ?? "🕉️"}</Text>
          <Text className="text-sm font-uiSemiBold" style={{ color: colors.primary }}>
            {moodLabel}
          </Text>
        </View>
        <Pressable
          onPress={onReset}
          className="rounded-full border px-3 py-1"
          style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
        >
          <Text className="text-sm font-ui" style={{ color: colors.textSecondary }}>
            Change
          </Text>
        </Pressable>
      </View>

      {context ? (
        <Text className={`${textStyles.caption} mb-3 font-uiItalic`} style={{ color: colors.textMuted }}>
          &quot;{context}&quot;
        </Text>
      ) : null}

      {recipeError ? (
        <View className="mb-3 rounded-xl border p-3" style={{ borderColor: `${colors.accentRose}66`, backgroundColor: `${colors.accentRose}12` }}>
          <Text className="text-sm font-ui" style={{ color: colors.accentRose }}>
            {recipeError}
          </Text>
          {onRetryRecipe ? (
            <Pressable
              onPress={onRetryRecipe}
              className="mt-2 self-start rounded-full border px-3 py-1"
              style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
            >
              <Text className="text-xs font-uiSemiBold" style={{ color: colors.textPrimary }}>
                Retry
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {recipe ? (
        <View>
          {cardOrder.map((card) => (card === expandedCard ? renderExpandedCard(card) : renderCollapsedCard(card)))}
        </View>
      ) : (
        <View className="rounded-3xl border p-5" style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
          <Text className={`${textStyles.body}`} style={{ color: colors.textSecondary }}>
            We could not load today&apos;s recipe data yet.
          </Text>
          {onRetryRecipe ? (
            <Pressable
              onPress={onRetryRecipe}
              className="mt-4 self-start rounded-full border px-4 py-2"
              style={{ borderColor: colors.primarySoft, backgroundColor: colors.primarySurface }}
            >
              <Text className="text-sm font-uiSemiBold" style={{ color: colors.primary }}>
                Retry fetch
              </Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}
