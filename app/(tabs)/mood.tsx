import { useEffect, useRef } from "react";
import { Animated, Easing, Platform, ScrollView, Text, View } from "react-native";
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
import { colors } from "@/theme/colors";

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";

export default function MoodScreen() {
  const selectedMood = useMoodStore((state) => state.selectedMood);
  const setMood = useMoodStore((state) => state.setMood);
  const insets = useSafeAreaInsets();
  const selectedTheme = selectedMood ? moodMap[selectedMood] : null;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [glow]);

  const glowCardStyle = {
    transform: [{ translateY: glow.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }],
    shadowColor: colors.glow,
    shadowOpacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.12, 0.32] }),
    shadowRadius: glow.interpolate({ inputRange: [0, 1], outputRange: [14, 26] }),
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  };

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
        <Text
          className="mb-6 text-4xl italic leading-[46px]"
          style={{ color: colors.onboardingWhite90, fontFamily: SERIF }}
        >
          How’s your spirit today?
        </Text>

        <Animated.View style={glowCardStyle}>
          <GlassCard>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-12 w-12 rounded-full items-center justify-center border border-primary/40 bg-primary/20">
                  <View className="h-5 w-5 rounded-full bg-glow" />
                </View>
                <View className="ml-4">
                  <Text
                    className="text-2xl italic"
                    style={{ color: colors.primary, fontFamily: SERIF }}
                  >
                    Today&apos;s Cosmic Energy
                  </Text>
                  <Text
                    className="mt-1"
                    style={{ color: colors.onboardingWhite30, fontFamily: SERIF }}
                  >
                    Ekadashi · Rohini · Mercury ☿ Retrograde
                  </Text>
                </View>
              </View>
              <Feather name="chevron-down" size={18} color={colors.glow} />
            </View>
          </GlassCard>
        </Animated.View>

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
