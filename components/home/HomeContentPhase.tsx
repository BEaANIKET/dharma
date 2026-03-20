import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutAnimation, Platform, Pressable, Text, UIManager, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { textStyles } from "@/theme/typography";
import { MainType, MoodLabel, ResolvedHomeRecipe, ThumbDirection } from "./data";
import { VerseCard, BreathingCard, PunyaCard, ReflectionsCard } from "./cards";

// Hex values for Ionicons color prop (className not supported).
// Values must match tailwind.config.js semantic tokens exactly.
const ICON_COLORS = {
  verse:       "#D4960A", // highlight       (bindu-gold-dark, light-mode amber)
  breathing:   "#4ECDC4", // accent-primary-dark  (dharma-teal)
  punya:       "#5AD4A6", // success-dark    (mint green)
  reflections: "#9B8EC4", // accent-secondary-dark  (cosmic-violet)
  secondary:   "#6b6878", // text-secondary
} as const;

type RecipeCardType = "verse" | "breathing" | "punya" | "reflections";

interface HomeContentPhaseProps {
  moodLabel: MoodLabel;
  moodEmoji: string;
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
  hideTopBar?: boolean;
}

export function HomeContentTopBar({
  moodLabel,
  moodEmoji,
  onReset,
}: {
  moodLabel: MoodLabel;
  moodEmoji: string;
  onReset: () => void;
}) {
  return (
    <View className="mb-3 flex-row items-center gap-2  pt-2 pb-1">
      <View className="flex-row items-center rounded-full border border-border  px-3 py-1">
        <Text className="mr-2 text-base">{moodEmoji}</Text>
        <Text className="text-sm font-uiSemiBold text-primary dark:text-text-primary-dark">
          {moodLabel}
        </Text>
      </View>
      <Pressable
        onPress={onReset}
        className="rounded-full border border-border dark:border-border-dark bg-bg dark:bg-bg-dark px-3 py-1"
      >
        <Text className="text-sm font-ui text-secondary dark:text-secondary-dark">Change</Text>
      </Pressable>
    </View>
  );
}

export default function HomeContentPhase({
  moodLabel,
  moodEmoji,
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
  hideTopBar = false,
}: HomeContentPhaseProps) {
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

    let iconColor: string = ICON_COLORS.secondary;
    let emoji = "✨";
    let iconBoxClass = "border-border dark:border-border-dark bg-surface dark:bg-surface-dark";
    let title = "";
    let subtitle = "";
    let cardClass = "bg-surface dark:bg-surface-dark border border-border dark:border-transparent";

    if (card === "verse") {
      iconColor = ICON_COLORS.verse;
      emoji = recipe.verse.emoji || "📖";
      iconBoxClass = "border-highlight/30 bg-highlight/10";
      title = formatGitaRef(recipe.verse.ch, recipe.verse.v);
      subtitle = recipe.verse.english;
      cardClass = "bg-surface dark:bg-highlight-dark/10 border border-border dark:border-transparent";
    } else if (card === "breathing") {
      iconColor = ICON_COLORS.breathing;
      emoji = recipe.breathing.emoji || "🧘";
      iconBoxClass = "border-accent-primary-dark/30 bg-accent-primary-dark/10";
      title = recipe.breathing.name;
      subtitle = `${recipe.breathing.pattern} · ${recipe.breathing.duration}`;
      cardClass = "bg-surface dark:bg-accent-primary-dark/20 border border-border dark:border-transparent";
    } else if (card === "punya") {
      iconColor = ICON_COLORS.punya;
      emoji = recipe.punya.emoji || "🌻";
      iconBoxClass = "border-highlight/30 bg-highlight/10";
      title = "Punya · Good Deed";
      subtitle = recipe.punya.title;
      cardClass = "bg-surface dark:bg-success-dark/20 border border-border dark:border-transparent";
    } else {
      iconColor = ICON_COLORS.reflections;
      emoji = recipe.reflections[0]?.emoji || "🪷";
      iconBoxClass = "border-accent-secondary-dark/30 bg-accent-secondary-dark/10";
      title = "Reflections";
      subtitle = `${recipe.reflections.length} journal prompts`;
      cardClass = "bg-surface dark:bg-accent-secondary-dark/20 border border-border dark:border-transparent";
    }

    return (
      <Pressable
        key={card}
        onPress={() => handleExpand(card)}
        className={`mb-3 flex-row items-center rounded-2xl ${cardClass} px-4 py-4`}
      >
        <View className={`mr-3 h-11 w-11 items-center justify-center rounded-xl border ${iconBoxClass}`}>
          <Text className="text-lg">{emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-uiSemiBold text-primary dark:text-text-primary-dark" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        <Ionicons name="chevron-up-outline" size={16} color={iconColor} />
      </Pressable>
    );
  };

  const renderExpandedCard = (card: RecipeCardType) => {
    if (!recipe) return null;

    if (card === "verse") {
      return (
        <View key={card} className="mb-3">
          <VerseCard
            recipe={recipe}
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            thumbs={thumbs}
            onThumb={onThumb}
          />
        </View>
      );
    }

    if (card === "breathing") {
      return (
        <View key={card} className="mb-3">
          <BreathingCard
            breathing={recipe.breathing}
            breathingActive={breathingActive}
            onToggleBreathing={onToggleBreathing}
          />
        </View>
      );
    }

    if (card === "punya") {
      return (
        <View key={card} className="mb-3">
          <PunyaCard
            punya={recipe.punya}
            thumbs={thumbs}
            onThumb={onThumb}
          />
        </View>
      );
    }

    return (
      <View key={card} className="mb-3">
        <ReflectionsCard reflections={recipe.reflections} />
      </View>
    );
  };

  return (
    <View
      onLayout={(event) => {
        sectionTopY.current = event.nativeEvent.layout.y;
      }}
    >
      {!hideTopBar ? (
        <HomeContentTopBar
          moodLabel={moodLabel}
          moodEmoji={moodEmoji}
          onReset={onReset}
        />
      ) : null}

      {context ? (
        <Text className={`${textStyles.caption} mb-3 font-uiItalic text-secondary/70 dark:text-text-secondary-dark/50`}>
          &quot;{context}&quot;
        </Text>
      ) : null}

      {recipeError ? (
        <View className="mb-3 rounded-xl border border-error/40 dark:border-error-dark/40 bg-error/10 dark:bg-error-dark/10 p-3">
          <Text className="text-sm font-ui text-error dark:text-error-dark">{recipeError}</Text>
          {onRetryRecipe ? (
            <Pressable
              onPress={onRetryRecipe}
              className="mt-2 self-start rounded-full border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-1"
            >
              <Text className="text-xs font-uiSemiBold text-primary dark:text-text-primary-dark">
                Retry
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {recipe ? (
        <View>
          {cardOrder.map((card) =>
            card === expandedCard ? renderExpandedCard(card) : renderCollapsedCard(card)
          )}
        </View>
      ) : (
        <View className="rounded-3xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-5">
          <Text className={`${textStyles.body} text-secondary dark:text-secondary-dark`}>
            We could not load today&apos;s recipe data yet.
          </Text>
          {onRetryRecipe ? (
            <Pressable
              onPress={onRetryRecipe}
              className="mt-4 self-start rounded-full border border-accent-primary-dark bg-accent-primary-dark/15 px-4 py-2"
            >
              <Text className="text-sm font-uiSemiBold text-accent-primary-dark">
                Retry fetch
              </Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}
