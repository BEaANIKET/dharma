import MoodCard from "@/components/MoodCard";
import { useMetadataStore } from "@/store/useMetadataStore";
import { textStyles } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

interface HomeMoodSelectionProps {
  selectedMood: string | null;
  context: string;
  onChangeContext: (value: string) => void;
  onSelectMood: (value: string) => void;
  onSubmit: () => void;
}

export default function HomeMoodSelection({
  selectedMood,
  context,
  onChangeContext,
  onSelectMood,
  onSubmit,
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

      <View
        className="mt-5 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4"
      >
        <TextInput
          value={context}
          onChangeText={onChangeContext}
          placeholder="What happened today? I'm listening... "
          placeholderTextColor="#6b6878"
          className="h-14 flex-1 text-xl font-ui text-primary dark:text-parchment"
        />
        <Pressable
          onPress={onSubmit}
          className={`h-11 w-11 items-center justify-center rounded-2xl ${selectedMood ? "bg-accent-primary dark:bg-accent-primary-dark" : "bg-surface dark:bg-surface-dark opacity-50"}`}
        >
          <Ionicons name="paper-plane-outline" size={20} color="#09090F" />
        </Pressable>
      </View>

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
