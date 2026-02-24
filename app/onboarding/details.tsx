import { useEffect, useMemo } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CosmicBackground from "@/components/onboarding/CosmicBackground";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import PrimaryGlowButton from "@/components/onboarding/PrimaryGlowButton";
import GenderPills from "@/components/onboarding/GenderPills";
import { useStaggeredFadeUp } from "@/utils/animations";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function OnboardingDetails() {
  const insets = useSafeAreaInsets();
  const name = useOnboardingStore((state) => state.name);
  const age = useOnboardingStore((state) => state.age);
  const gender = useOnboardingStore((state) => state.gender);
  const setName = useOnboardingStore((state) => state.setName);
  const setAge = useOnboardingStore((state) => state.setAge);
  const setGender = useOnboardingStore((state) => state.setGender);
  const markCompleted = useOnboardingStore((state) => state.markCompleted);
  const phone = useOnboardingStore((state) => state.phone);
  const setOnboardingUser = useAuthStore((state) => state.setOnboardingUser);
  const { styles, start } = useStaggeredFadeUp(5, {
    fromY: 22,
    duration: 600,
    delay: 140,
    stagger: 120,
  });

  const isValid = useMemo(() => {
    const parsedAge = Number(age);
    return name.trim().length >= 2 && Number.isFinite(parsedAge) && parsedAge > 0 && !!gender;
  }, [age, gender, name]);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <CosmicBackground>
      <View className="flex-1 px-6" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row justify-end" />

        <View style={{ marginTop: 24 }}>
        <Animated.View style={styles[0]}>
          <Text className="text-cyan-100 text-xs uppercase tracking-[0.32em]">
            Personalize
          </Text>
          <Text className="text-textPrimary text-3xl font-semibold mt-3">
            Tell us about you
          </Text>
        </Animated.View>

        <Animated.View style={styles[1]} className="mt-6">
          <OnboardingCard>
            <Text className="text-textSecondary text-xs uppercase tracking-[0.3em]">
              Name
            </Text>
            <TextInput
              className="text-textPrimary text-base mt-2"
              placeholder="Your full name"
              placeholderTextColor="#6B7280"
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
          </OnboardingCard>
        </Animated.View>

        <Animated.View style={styles[2]} className="mt-5">
          <OnboardingCard>
            <Text className="text-textSecondary text-xs uppercase tracking-[0.3em]">
              Age
            </Text>
            <TextInput
              className="text-textPrimary text-base mt-2"
              placeholder="Enter age"
              placeholderTextColor="#6B7280"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </OnboardingCard>
        </Animated.View>

        <Animated.View style={styles[3]} className="mt-5">
          <OnboardingCard>
            <Text className="text-textSecondary text-xs uppercase tracking-[0.3em]">
              Gender
            </Text>
            <View className="mt-3">
              <GenderPills value={gender} onChange={setGender} />
            </View>
          </OnboardingCard>
        </Animated.View>

        <Animated.View style={styles[4]} className="mt-8">
          <PrimaryGlowButton
            label="Continue to Dharma"
            onPress={() => {
              markCompleted();
              setOnboardingUser({ name, phone });
              router.replace("/(tabs)/mood");
            }}
            disabled={!isValid}
            footer={
              <Text className="text-textMuted text-xs">
                You can update this later.
              </Text>
            }
          />
        </Animated.View>
        </View>
      </View>
    </CosmicBackground>
  );
}
