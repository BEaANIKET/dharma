import { useAuthStore } from "@/store/useAuthStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { onboardingPalette as C } from "@/theme/onboarding";

export default function StepComplete() {
  const name = useOnboardingStore((s) => s.name);
  const phone = useOnboardingStore((s) => s.phone);
  const city = useOnboardingStore((s) => s.city);
  const dob = useOnboardingStore((s) => s.dateOfBirth);
  const markCompleted = useOnboardingStore((s) => s.markCompleted);
  const setOnboardingUser = useAuthStore((s) => s.setOnboardingUser);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const completeFlow = async () => {
      markCompleted();
      setOnboardingUser({ name, phone });
      try {
        await updateProfile({
          name: name || null,
          city: city || null,
          dob: dob ? dob.toISOString().slice(0, 10) : null,
        });
      } catch {
        // Profile sync can retry later from app flows.
      } finally {
        if (!mounted) return;
        timer = setTimeout(() => {
          router.replace("/(tabs)/home");
        }, 1200);
      }
    };

    void completeFlow();

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text
        className="text-3xl italic font-heading"
        style={{ color: C.goldLabel }}
      >
        welcome.
      </Text>
    </View>
  );
}
