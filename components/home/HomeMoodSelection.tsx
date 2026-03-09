import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MoodCard from "@/components/MoodCard";
import NotSureButton from "@/components/NotSureButton";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MOOD_OPTIONS, MoodLabel } from "./data";

interface HomeMoodSelectionProps {
  selectedMood: MoodLabel | null;
  context: string;
  onChangeContext: (value: string) => void;
  onSelectMood: (mood: MoodLabel) => void;
  onSubmit: () => void;
}

export default function HomeMoodSelection({
  selectedMood,
  context,
  onChangeContext,
  onSelectMood,
  onSubmit,
}: HomeMoodSelectionProps) {
  const selectedTheme = selectedMood ? MOOD_OPTIONS.find((mood) => mood.label === selectedMood) : null;

  return (
    <View>
      <Text className="text-5xl leading-[56px] font-semibold " style={[typography.heading, { color: colors.onboardingWhite90 }]}>
        What&apos;s weighing{"\n"}on you?
      </Text>
      <Text className="mt-2 text-base text-textSecondary" style={typography.body}>
        Tap one. We&apos;ll handle the rest.
      </Text>

      <View className="mt-8 flex-row flex-wrap justify-between">
        {MOOD_OPTIONS.map((mood) => (
          <MoodCard
            key={mood.label}
            emoji={mood.emoji}
            label={mood.label}
            isSelected={selectedMood === mood.label}
            accentColor={colors.primary}
            borderColor={colors.primarySoft}
            onPress={() => onSelectMood(mood.label)}
          />
        ))}
      </View>

      <NotSureButton />

      <View
        className="mt-5 flex-row items-center rounded-2xl border px-4"
        style={{
          backgroundColor: colors.backgroundSoft,
          borderColor: colors.cardBorder,
        }}
      >
        <TextInput
          value={context}
          onChangeText={onChangeContext}
          placeholder="Or tell us more... (optional)"
          placeholderTextColor={colors.textSecondary}
          className="h-14 flex-1 text-xl"
          style={{ color: colors.textPrimary }}
        />
        <Pressable
          onPress={onSubmit}
          className="h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: selectedMood ? colors.primary : colors.backgroundElevated,
            opacity: selectedMood ? 1 : 0.5,
          }}
        >
          <Ionicons name="paper-plane-outline" size={20} color={colors.backgroundDeep} />
        </Pressable>
      </View>

      {selectedMood ? (
        <Pressable
          onPress={onSubmit}
          className="mt-7 self-center rounded-2xl px-9 py-4"
          style={{ backgroundColor: selectedTheme?.accent ?? colors.primary }}
        >
          <Text className="text-2xl font-semibold" style={{ color: selectedTheme?.text ?? colors.backgroundDeep }}>
            Find my ground {"\u2192"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
