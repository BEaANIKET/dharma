import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";

export default function DharmaHeader() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initials = user?.name?.trim().charAt(0).toUpperCase() ?? null;

  const handleProfilePress = () => {
    if (!isAuthenticated) {
      router.push("/onboarding");
      return;
    }
    setOpen(true);
  };

  const handleSignOut = async () => {
    await logout();
    setOpen(false);
    router.replace("/onboarding");
  };

  return (
    <>
      <View className="w-full flex-row items-center justify-between px-1 pb-6">

        {/* LEFT */}
        <View className="flex-row items-center gap-3">
          <Pressable className="flex-row items-center bg-surface/40 dark:bg-surface-dark border border-border/40 dark:border-border-dark/40 px-4 py-2 rounded-xl">
            <Text className="text-highlight dark:text-highlight-dark text-sm font-medium">EN</Text>
            <Text className="text-text-secondary/60 dark:text-text-secondary-dark/40 mx-2">|</Text>
            <Text className="text-text-secondary/70 dark:text-text-secondary-dark/60 text-sm">हि</Text>
          </Pressable>

          <Pressable className="bg-surface/40 dark:bg-surface-dark/40 border border-border/40 dark:border-border-dark/40 p-3 rounded-xl">
            <Feather name="settings" size={18} color="#6b6878" />
          </Pressable>
        </View>

        {/* CENTER */}
        <View className="absolute top-[30%] left-0 right-0 items-center">
          <Text className="text-highlight dark:text-highlight-dark text-xl tracking-widest">
            🕉 Dharma AI
          </Text>
        </View>

        {/* PROFILE BUTTON */}
        <Pressable
          onPress={handleProfilePress}
          className="bg-surface/40 dark:bg-surface-dark/40 border border-border/40 dark:border-border-dark/40 rounded-xl h-11 w-11 items-center justify-center"
        >
          {initials ? (
            <Text className="text-highlight dark:text-highlight-dark font-semibold text-base">{initials}</Text>
          ) : (
            <Feather name="user" size={18} color="#6b6878" />
          )}
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 bg-bg-dark/65 justify-end"
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={() => { }}
            className="rounded-t-3xl overflow-hidden"
          >
            <LinearGradient
              colors={["#111128", "#1a1a38", "#09090F"]}
              className="p-6 rounded-t-3xl"
            >
              <View className="w-12 h-1 bg-text-primary-dark/20 rounded-full self-center mb-6" />

              <View className="bg-surface/40 dark:bg-surface-dark/40 border border-border/40 dark:border-border-dark/40 rounded-2xl p-5">
                <Text className="text-highlight dark:text-highlight-dark tracking-widest text-xs mb-4">
                  🕉 DHARMA PROFILE
                </Text>

                <View className="flex-row items-center">
                  <View className="h-16 w-16 rounded-2xl items-center justify-center bg-accent-primary/20 dark:bg-accent-primary-dark/20 border border-accent-primary/30 dark:border-accent-primary-dark/30 mr-4">
                    <Text className="text-highlight dark:text-highlight-dark text-2xl font-semibold">
                      {initials ?? "D"}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-text-primary-dark text-xl">
                      {user?.name ?? "Dharma Seeker"}
                    </Text>
                    <Text className="text-text-secondary-dark mt-1">
                      {user?.mobile ?? user?.email ?? "seeker@dharma.ai"}
                    </Text>
                  </View>
                </View>

                <View className="h-[1px] bg-text-primary-dark/10 my-6" />
                <Text className="text-secondary-dark">
                  Keep showing up. Your inner balance grows one mindful day at a time.
                </Text>
              </View>

              <Pressable
                onPress={handleSignOut}
                disabled={isLoading}
                className="mt-6 bg-surface/40 dark:bg-surface-dark/40 border border-border/40 dark:border-border-dark/40 rounded-2xl p-4 items-center"
              >
                <Text className="text-secondary-dark">{isLoading ? "Signing out..." : "Sign out"}</Text>
              </Pressable>
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
