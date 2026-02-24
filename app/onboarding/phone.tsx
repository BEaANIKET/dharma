import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CosmicBackground from "@/components/onboarding/CosmicBackground";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import PrimaryGlowButton from "@/components/onboarding/PrimaryGlowButton";
import PhoneInput from "@/components/onboarding/PhoneInput";
import { useStaggeredFadeUp } from "@/utils/animations";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function OnboardingPhone() {
  const insets = useSafeAreaInsets();
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const phone = useOnboardingStore((state) => state.phone);
  const setPhone = useOnboardingStore((state) => state.setPhone);
  const { styles, start } = useStaggeredFadeUp(4, {
    fromY: 22,
    duration: 600,
    delay: 120,
    stagger: 120,
  });

  useEffect(() => {
    start();
    Animated.timing(screenOpacity, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [start]);

  return (
    <CosmicBackground>
      <Animated.View
        className="flex-1 px-6"
        style={{ paddingTop: insets.top + 16, opacity: screenOpacity }}
      >
        <View className="flex-row justify-end" />

        <View style={{ marginTop: 24 }}>
        <Animated.View style={styles[0]}>
          <Text className="text-cyan-100 text-xs uppercase tracking-[0.32em]">
            Onboarding
          </Text>
          <Text className="text-textPrimary text-3xl font-semibold mt-3">
            Spiritual Awakening Begins
          </Text>
          <Text className="text-textSecondary text-base mt-2 leading-6">
            Enter your contact number
          </Text>
        </Animated.View>

        <Animated.View style={styles[1]} className="mt-6">
          <OnboardingCard>
            <PhoneInput value={phone} onChange={setPhone} />
          </OnboardingCard>
        </Animated.View>

        <Animated.View style={styles[2]} className="mt-8">
          <PrimaryGlowButton
            label="Continue"
            onPress={() => router.push("/onboarding/details")}
            disabled={phone.trim().length < 7}
            footer={
              <Text className="text-textMuted text-xs">
                We will never share your number.
              </Text>
            }
          />
        </Animated.View>
        </View>
      </Animated.View>
    </CosmicBackground>
  );
}
