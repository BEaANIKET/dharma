import { useEffect, useState } from "react";
import { router } from "expo-router";
import StartupLoader from "@/components/StartupLoader";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Index() {
  const onboardingCompleted = useOnboardingStore((state) => state.completed);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let mounted = true;

    const bootstrapApp = async () => {
      try {
        // TODO: Add token read + `/me` API validation here before routing.
        // Keep startup loader visible until auth bootstrap is complete.
      } finally {
        if (!mounted) return;
        setIsBootstrapping(false);
      }
    };

    bootstrapApp();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isBootstrapping) return;

    if (!onboardingCompleted) {
      router.replace("/onboarding");
      return;
    }
    if (!isAuthenticated) {
      router.replace("/onboarding");
      return;
    }

    router.replace("/(tabs)/mood");
  }, [isAuthenticated, isBootstrapping, onboardingCompleted]);

  return (
    <StartupLoader
      message="Starting mydharma..."
      subMessage="Checking session and loading your space"
    />
  );
}
