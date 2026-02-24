import { Redirect } from "expo-router";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Index() {
  const onboardingCompleted = useOnboardingStore((state) => state.completed);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }
  if (!isAuthenticated) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/mood" />;
}
