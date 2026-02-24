import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import GlassCard from "@/components/GlassCard";
import MoodCard from "@/components/MoodCard";
import NotSureButton from "@/components/NotSureButton";
import ContextInput from "@/components/ContextInput";
import PrimaryButton from "@/components/PrimaryButton";
import DharmaHeader from "@/components/DharmaHeader";
import { MOODS, moodMap } from "@/constants/moodThemes";
import { useMoodStore } from "@/store/useMoodStore";

export default function MoodScreen() {
  const selectedMood = useMoodStore((state) => state.selectedMood);
  const setMood = useMoodStore((state) => state.setMood);
  const insets = useSafeAreaInsets();
  const selectedTheme = selectedMood ? moodMap[selectedMood] : null;

  return (
    <GradientBackground>
      <ScrollView
        className="flex-1 px-5 pt-16"
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <DharmaHeader />
        <Text className="text-textPrimary text-2xl font-semibold mb-6">
          How’s your spirit today?
        </Text>

        <GlassCard>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="h-12 w-12 rounded-full items-center justify-center bg-cyan-400/20 border border-cyan-300/40">
                <View className="h-5 w-5 rounded-full bg-cyan-300" />
              </View>
              <View className="ml-4">
                <Text className="text-primary text-2xl font-medium">
                  Today&apos;s Cosmic Energy
                </Text>
                <Text className="text-textSecondary mt-1">
                  Ekadashi · Rohini · Mercury ☿ Retrograde
                </Text>
              </View>
            </View>
            <Feather name="chevron-down" size={18} color="#67E8F9" />
          </View>
        </GlassCard>

        <View className="flex-row flex-wrap justify-between mt-6">
          {MOODS.map((mood) => (
            <MoodCard
              key={mood.label}
              emoji={mood.emoji}
              label={mood.label}
              isSelected={selectedMood === mood.label}
              accentColor={mood.accent}
              softColor={mood.soft}
              borderColor={mood.border}
              onPress={() => setMood(mood.label)}
            />
          ))}
        </View>

        <NotSureButton />
        <ContextInput />
        <PrimaryButton
          disabled={!selectedMood}
          accentColor={selectedTheme?.accent}
          softColor={selectedTheme?.soft}
          borderColor={selectedTheme?.border}
          onPress={() => router.push("/loading")}
        />
      </ScrollView>
    </GradientBackground>
  );
}
