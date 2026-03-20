import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "@/components/GradientBackground";
import HomeContentPhase, { HomeContentTopBar } from "@/components/home/HomeContentPhase";
import HomeLoadingPhase from "@/components/home/HomeLoadingPhase";
import HomeMoodSelection from "@/components/home/HomeMoodSelection";
import { MainType, resolveRecipeForMood, ThumbDirection } from "@/components/home/data";
import { friendlyMessage, recipeApi, RecipeApiResponse } from "@/services/api";
import { useMoodStore } from "@/store/useMoodStore";
import { useMetadataStore } from "@/store/useMetadataStore";

type HomePhase = "selection" | "loading" | "content";

export default function MoodScreen() {
  const selectedMood = useMoodStore((state) => state.selectedMood);
  const setMood = useMoodStore((state) => state.setMood);
  const insets = useSafeAreaInsets();

  const fetchMetadata = useMetadataStore((s) => s.fetchMetadata);
  const getMoodByValue = useMetadataStore((s) => s.getMoodByValue);

  const [phase, setPhase] = useState<HomePhase>("selection");
  const [context, setContext] = useState("");
  const [mainType, setMainType] = useState<MainType>("verse");
  const [breathingActive, setBreathingActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbs, setThumbs] = useState<Record<string, ThumbDirection | null>>({});
  const [recipeResponse, setRecipeResponse] = useState<RecipeApiResponse | null>(null);
  const [recipeError, setRecipeError] = useState<string | null>(null);

  const loadingTimerRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  const selectedMoodData = selectedMood ? getMoodByValue(selectedMood) : undefined;
  const moodLabel = selectedMoodData?.label ?? null;
  const moodEmoji = selectedMoodData?.emoji ?? "🕉️";
  const resolvedRecipe = useMemo(() => resolveRecipeForMood(recipeResponse), [recipeResponse]);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  const clearTimers = () => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  const submitMood = async () => {
    if (!selectedMood) return;

    clearTimers();
    setMainType("verse");
    setBreathingActive(false);
    setIsPlaying(false);
    setRecipeError(null);
    setRecipeResponse(null);
    setPhase("loading");

    const loadingDelay = new Promise<void>((resolve) => {
      loadingTimerRef.current = globalThis.setTimeout(() => resolve(), 2100);
    });

    try {
      const [response] = await Promise.all([
        recipeApi.getRecipe({
          mood: selectedMood.toLowerCase(),
          feelings: context.trim(),
        }),
        loadingDelay,
      ]);

      setRecipeResponse(response);

      if (!resolveRecipeForMood(response)) {
        console.log("[Home] Incomplete /recipe payload", {
          mood: selectedMood,
          context: context.trim(),
          response,
        });
        setRecipeError("Recipe response is incomplete. Please retry.");
      }
    } catch (error) {
      console.log("[Home] /recipe request failed", {
        mood: selectedMood,
        context: context.trim(),
        error,
      });

      setRecipeError(friendlyMessage(error));
      await loadingDelay;
    }

    setPhase("content");
  };

  const resetFlow = () => {
    clearTimers();
    setMood(null);
    setContext("");
    setPhase("selection");
    setBreathingActive(false);
    setIsPlaying(false);
    setThumbs({});
    setRecipeResponse(null);
    setRecipeError(null);
  };

  const handleThumb = (id: string, direction: ThumbDirection) => {
    setThumbs((prev) => ({
      ...prev,
      [id]: prev[id] === direction ? null : direction,
    }));
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <GradientBackground>
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-5"
        contentContainerStyle={{
          paddingTop: 14,
          paddingBottom: insets.bottom + 30,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={phase === "content" && moodLabel ? [0] : undefined}
      >
        {phase === "content" && moodLabel ? (
          <HomeContentTopBar
            moodLabel={moodLabel}
            moodEmoji={moodEmoji}
            onReset={resetFlow}
          />
        ) : null}

        {phase === "selection" ? (
          <HomeMoodSelection
            selectedMood={selectedMood}
            context={context}
            onChangeContext={setContext}
            onSelectMood={setMood}
            onSubmit={submitMood}
          />
        ) : null}

        {phase === "loading" ? (
          <HomeLoadingPhase moodEmoji={moodEmoji} />
        ) : null}

        {phase === "content" && moodLabel ? (
          <HomeContentPhase
            moodLabel={moodLabel}
            moodEmoji={moodEmoji}
            context={context}
            mainType={mainType}
            recipe={resolvedRecipe}
            recipeError={recipeError}
            onRetryRecipe={submitMood}
            onRequestScrollTo={(y) =>
              scrollRef.current?.scrollTo({ y, animated: true })
            }
            isPlaying={isPlaying}
            breathingActive={breathingActive}
            thumbs={thumbs}
            onReset={resetFlow}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
            onToggleBreathing={() => setBreathingActive((prev) => !prev)}
            onThumb={handleThumb}
            hideTopBar
          />
        ) : null}
      </ScrollView>
    </GradientBackground>
  );
}
