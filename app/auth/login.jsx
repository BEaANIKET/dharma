import { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import GlassCard from "@/components/GlassCard";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim().length > 0 && password.trim().length > 0;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const handleLogin = () => {
    if (!canSubmit) return;
    login({ email: email.trim().toLowerCase() });
    router.replace("/");
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View
            className="flex-1 px-6 justify-center gap-8"
            style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 }}
          >
            <AnimatedPressable
              onPress={() => router.back()}
              className="self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2"
            >
              <Text className="text-textSecondary">Back</Text>
            </AnimatedPressable>

            <View className="items-center">
              <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
                <Text className="text-6xl">🕉</Text>
              </Animated.View>
              <Text className="mt-6 text-primary text-2xl tracking-widest">WELCOME BACK</Text>
              <Text className="mt-3 text-textSecondary text-center px-6">
                Continue your mindful practice
              </Text>
            </View>

            <GlassCard>
              <Text className="text-textSecondary mb-2">Email</Text>
              <TextInput
                placeholder="you@dharma.com"
                placeholderTextColor="#6B7280"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-textPrimary"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text className="text-textSecondary mt-5 mb-2">Password</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-textPrimary"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <AnimatedPressable
                onPress={handleLogin}
                disabled={!canSubmit}
                className="mt-8 rounded-2xl border py-4 items-center"
                style={{
                  borderColor: canSubmit ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.12)",
                  backgroundColor: canSubmit ? "rgba(34,211,238,0.2)" : "rgba(255,255,255,0.05)",
                }}
              >
                <Text className="text-lg" style={{ color: canSubmit ? "#22D3EE" : "#9CA3AF" }}>
                  Enter Temple
                </Text>
              </AnimatedPressable>
            </GlassCard>

            <AnimatedPressable onPress={() => router.push("/auth/register")} className="mt-1">
              <Text className="text-center text-textSecondary">
                New here? <Text className="text-primary">Create account</Text>
              </Text>
            </AnimatedPressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
