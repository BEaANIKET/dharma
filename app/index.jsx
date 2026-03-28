import { useAuthStore } from "@/store/useAuthStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

export default function Index() {
  const onboardingCompleted = useOnboardingStore((state) => state.completed);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const bootstrap = useAuthStore((state) => state.bootstrap);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let mounted = true;

    const bootstrapApp = async () => {
      try {
        await bootstrap();
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

    if (!isAuthenticated) {
      router.replace("/onboarding");
      return;
    }

    const hasProfileIdentity = Boolean(user?.name);
    if (!onboardingCompleted && !hasProfileIdentity) {
      router.replace("/onboarding");
      return;
    }

    router.replace("/(tabs)/home");
  }, [isAuthenticated, isBootstrapping, onboardingCompleted, user?.name]);

  return (
    <View className="flex-1">
      <Image
        source={require("@/assets/images/dark-splash-android.png")}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
}
