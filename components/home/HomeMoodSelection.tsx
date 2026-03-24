import ContextInput from "@/components/ContextInput";
import MoodCard from "@/components/MoodCard";
import { useMetadataStore } from "@/store/useMetadataStore";
import { textStyles } from "@/theme/typography";
import { RefObject } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

interface HomeMoodSelectionProps {
  selectedMood: string | null;
  context: string;
  onChangeContext: (value: string) => void;
  onSelectMood: (value: string) => void;
  onSubmit: () => void;
  scrollRef?: RefObject<ScrollView | null>;
}

export default function HomeMoodSelection({
  selectedMood,
  context,
  onChangeContext,
  onSelectMood,
  onSubmit,
  scrollRef,
}: HomeMoodSelectionProps) {
  const moods = useMetadataStore((s) => s.moods);
  const isLoadingMoods = useMetadataStore((s) => s.isLoading);

  return (
    <View>
      <Text className="text-5xl leading-tight font-headingSemiBold text-text-primary dark:text-text-primary-dark">
        What&apos;s weighing{"\n"}on you?
      </Text>
      <Text className={`${textStyles.body} mt-2 text-text-secondary dark:text-text-secondary-dark`}>
        Tap one. We&apos;ll handle the rest.
      </Text>

      {isLoadingMoods ? (
        <ActivityIndicator className="my-10 w-full" color="#4ECDC4" />
      ) : (
        <>
          <View className="mt-8 flex-row flex-wrap justify-between">
            {moods.slice(0, -1).map((mood) => (
              <MoodCard
                key={mood.id}
                emoji={mood.emoji}
                label={mood.label}
                description={mood.description}
                isSelected={selectedMood === mood.value}
                onPress={() => onSelectMood(mood.value)}
              />
            ))}
          </View>

          {moods.length > 0 && (() => {
            const last = moods[moods.length - 1];
            return (
              <MoodCard
                key={last.id}
                emoji={last.emoji}
                label={last.label}
                description={""}
                isSelected={selectedMood === last.value}
                fullWidth
                onPress={() => onSelectMood(last.value)}
              />
            );
          })()}
        </>
      )}

      <ContextInput
        value={context}
        onChangeText={onChangeContext}
        onSubmit={onSubmit}
        canSubmit={!!selectedMood}
        scrollRef={scrollRef}
      />

      {selectedMood ? (
        <Pressable
          onPress={onSubmit}
          className="mt-7 self-center rounded-2xl bg-highlight px-9 py-4"
        >
          <Text className="text-2xl font-uiSemiBold text-bg-dark">
            Find my ground {"\u2192"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
