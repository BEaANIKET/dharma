import { useAuthStore } from "@/store/useAuthStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { router } from "expo-router";
import { onboardingPalette as C } from "@/theme/onboarding";

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";

export default function StepComplete() {
  const name = useOnboardingStore((s) => s.name);
  const phone = useOnboardingStore((s) => s.phone);
  const markCompleted = useOnboardingStore((s) => s.markCompleted);
  const setOnboardingUser = useAuthStore((s) => s.setOnboardingUser);

  useEffect(() => {
    markCompleted();
    setOnboardingUser({ name, phone });

    const t = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 1200);

    return () => clearTimeout(t);
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text
        className="text-3xl italic"
        style={{ color: C.goldLabel, fontFamily: SERIF }}
      >
        welcome.
      </Text>
    </View>
  );
}
