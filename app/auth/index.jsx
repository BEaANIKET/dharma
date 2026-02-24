import { Text, View, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import GradientBackground from "@/components/GradientBackground";
import GlassCard from "@/components/GlassCard";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthHome() {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  /* 🔥 Floating Animation */
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  return (
    <GradientBackground>
      <View
        className="flex-1 px-6 justify-center gap-8"
        style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 }}
      >
        {/* Back Button */}
        {/* <AnimatedPressable
          onPress={() => router.back()}
          style="self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2"
        >
          <Text className="text-textSecondary">Back</Text>
        </AnimatedPressable> */}

        {/* Center Content */}
        <View className="items-center">
          <Animated.View
            style={{
              transform: [{ translateY: floatAnim }],
            }}
          >
            <Text className="text-6xl">🕉</Text>
          </Animated.View>

          <Text className="mt-6 text-primary text-2xl tracking-widest">
            DHARMA AI
          </Text>

          <Text className="mt-3 text-textSecondary text-center px-6">
            Begin your spiritual login journey
          </Text>
        </View>

        {/* Glass Card */}
        <GlassCard>
          {isAuthenticated ? (
            <>
              <Text className="text-primary text-xl text-center">
                You are signed in
              </Text>

              <Text className="text-textSecondary mt-2 text-center">
                {user?.name} · {user?.email}
              </Text>

              <AnimatedPressable
                onPress={() => router.replace("/")}
                className="mt-8 rounded-2xl border border-primary/50 bg-cyan-400/20 py-4 items-center"
              >
                <Text className="text-primary text-lg">
                  Continue to Home
                </Text>
              </AnimatedPressable>

              <AnimatedPressable
                onPress={logout}
                className="mt-4 rounded-2xl border border-white/15 bg-white/5 py-4 items-center"
              >
                <Text className="text-textPrimary text-lg">
                  Sign out
                </Text>
              </AnimatedPressable>
            </>
          ) : (
            <>
              <Text className="text-primary text-xl text-center">
                Choose your path
              </Text>

              <Text className="text-textSecondary mt-2 text-center">
                Enter as a returning seeker or create your new sacred account.
              </Text>

              <AnimatedPressable
                onPress={() => router.push("/auth/login")}
                className="mt-8 rounded-2xl border border-primary/50 bg-cyan-400/20 py-4 items-center"
              >
                <Text className="text-primary text-lg">Login</Text>
              </AnimatedPressable>

              <AnimatedPressable
                onPress={() => router.push("/auth/register")}
                className="mt-4 rounded-2xl border border-white/15 bg-white/5 py-4 items-center"
              >
                <Text className="text-textPrimary text-lg">
                  Register
                </Text>
              </AnimatedPressable>
            </>
          )}
        </GlassCard>

        {/* Footer */}
        <Text className="text-center text-textMuted">
          Lokah Samastah Sukhino Bhavantu
        </Text>
      </View>
    </GradientBackground>
  );
}
