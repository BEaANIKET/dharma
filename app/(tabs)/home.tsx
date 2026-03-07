import { useState } from "react";
import { Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import MoodCard from "@/components/MoodCard";
import { useMoodStore } from "@/store/useMoodStore";
import { colors } from "@/theme/colors";
import NotSureButton from "@/components/NotSureButton";

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";
const MOOD_OPTIONS = [
  { label: "Anxious", emoji: "😰", accent: "#D4943A", text: colors.backgroundDeep },
  { label: "Lost", emoji: "😔", accent: "#8B8FA3", text: colors.backgroundDeep },
  { label: "Angry", emoji: "😤", accent: "#E35D5D", text: colors.backgroundDeep },
  { label: "Numb", emoji: "😶", accent: "#8C8AA0", text: colors.backgroundDeep },
  { label: "Overthinking", emoji: "🌀", accent: "#5A8DEE", text: colors.backgroundDeep },
  { label: "Heartbroken", emoji: "💔", accent: "#C56A8F", text: colors.backgroundDeep },
];

export default function MoodScreen() {
  const selectedMood = useMoodStore((state) => state.selectedMood);
  const setMood = useMoodStore((state) => state.setMood);
  const insets = useSafeAreaInsets();
  const [context, setContext] = useState("");
  const selectedTheme = MOOD_OPTIONS.find((mood) => mood.label === selectedMood);

  return (
    <GradientBackground>
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: insets.bottom + 30 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <Text
          className="text-5xl leading-[56px]"
          style={{ color: colors.onboardingWhite90, fontFamily: SERIF }}
        >
          What&apos;s weighing{"\n"}on you?
        </Text>
        <Text className="mt-2 text-xl text-textSecondary">
          Tap one. We&apos;ll handle the rest.
        </Text>

        <View className="mt-9 flex-row flex-wrap justify-between">
          {MOOD_OPTIONS.map((mood) => (
            <MoodCard
              key={mood.label}
              emoji={mood.emoji}
              label={mood.label}
              isSelected={selectedMood === mood.label}
              accentColor={colors.primary}
              // softColor={colors.primarySurface}
              borderColor={colors.primarySoft}
              onPress={() => setMood(mood.label)}
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
            onChangeText={setContext}
            placeholder="Or tell us more... (optional)"
            placeholderTextColor={colors.textSecondary}
            className="h-14 flex-1 text-xl"
            style={{ color: colors.textPrimary }}
          />
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: colors.primary }}
          >
            <Ionicons name="paper-plane-outline" size={20} color={colors.backgroundDeep} />
          </Pressable>
        </View>

        {selectedMood ? (
          <Pressable
            onPress={() => router.push("/loading")}
            className="mt-7 self-center rounded-2xl px-9 py-4"
            style={{ backgroundColor: selectedTheme?.accent ?? colors.primary }}
          >
            <Text
              className="text-2xl font-semibold"
              style={{ color: selectedTheme?.text ?? colors.backgroundDeep }}
            >
              Find my ground {"\u2192"}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </GradientBackground>
  );
}
