import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/colors";

export default function DharmaHeader() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const initials = user?.name?.trim().charAt(0).toUpperCase() ?? null;

  const handleProfilePress = () => {
    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }
    setOpen(true);
  };

  const handleSignOut = () => {
    logout();
    setOpen(false);
    router.replace("/auth");
  };

  return (
    <>
      <View className="w-full flex-row items-center justify-between px-1 pb-6">

        {/* LEFT */}
        <View className="flex-row items-center gap-3">
          <Pressable className="flex-row items-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <Text className="text-primary text-sm font-medium">EN</Text>
            <Text className="text-white/40 mx-2">|</Text>
            <Text className="text-white/60 text-sm">हि</Text>
          </Pressable>

          <Pressable className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <Feather name="settings" size={18} color={colors.textSecondary} />
          </Pressable>
        </View>

        {/* CENTER */}
        <View className="absolute top-[30%] left-0 right-0 items-center">
          <Text className="text-primary text-xl tracking-widest">
            🕉 Dharma AI
          </Text>
        </View>

        {/* PROFILE BUTTON */}
        <Pressable
          onPress={handleProfilePress}
          className="bg-white/5 border border-white/10 rounded-xl h-11 w-11 items-center justify-center"
        >
          {initials ? (
            <Text className="text-primary font-semibold text-base">{initials}</Text>
          ) : (
            <Feather name="user" size={18} color={colors.textSecondary} />
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
          className="flex-1 bg-black/65 justify-end"
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={() => { }}
            className="rounded-t-3xl overflow-hidden"
          >
            <LinearGradient
              colors={[colors.background, colors.backgroundSoft, colors.backgroundDeep]}
              className="p-6 rounded-t-3xl"
            >
              <View className="w-12 h-1 bg-white/20 rounded-full self-center mb-6" />

              <View className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <Text className="text-primary tracking-widest text-xs mb-4">
                  🕉 DHARMA PROFILE
                </Text>

                <View className="flex-row items-center">
                  <View className="h-16 w-16 rounded-2xl items-center justify-center bg-cyan-400/20 border border-cyan-300/30 mr-4">
                    <Text className="text-primary text-2xl font-semibold">
                      {initials ?? "D"}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-textPrimary text-xl">
                      {user?.name ?? "Dharma Seeker"}
                    </Text>
                    <Text className="text-textSecondary mt-1">
                      {user?.email ?? "seeker@dharma.ai"}
                    </Text>
                  </View>
                </View>

                <View className="h-[1px] bg-white/10 my-6" />
                <Text className="text-textSecondary">
                  Keep showing up. Your inner balance grows one mindful day at a time.
                </Text>
              </View>

              <Pressable
                onPress={handleSignOut}
                className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 items-center"
              >
                <Text className="text-white/70">Sign out</Text>
              </Pressable>
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
