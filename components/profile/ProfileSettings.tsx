import { ActivityIndicator, Pressable, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";

// Token hex values for Ionicons color prop (className not supported)
const ICON_COLOR_LIGHT = "#6b6878"; // text-secondary
const ICON_COLOR_DARK  = "#a8a4a0"; // text-secondary-dark

export default function ProfileSettings() {
  const isDark      = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const logout      = useAuthStore((state) => state.logout);
  const isLoading   = useAuthStore((state) => state.isLoading);

  const iconColor = isDark ? ICON_COLOR_DARK : ICON_COLOR_LIGHT;

  const handleLogout = async () => {
    await logout();
    router.replace("/onboarding");
  };

  return (
    <View>
      <Text className="mb-3 text-sm font-uiSemiBold text-primary dark:text-text-primary-dark">
        Settings
      </Text>

      {/* ── Notifications ───────────────────────────── */}
      <Pressable
        onPress={() => { /* TODO: open notification settings */ }}
        className="mb-2 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-4"
      >
        <Ionicons name="notifications-outline" size={16} color={iconColor} />
        <View className="ml-3 flex-1">
          <Text className="text-sm font-ui text-primary dark:text-text-primary-dark">
            Notifications
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
            Daily verse at 7:00 AM
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={iconColor} />
      </Pressable>

      {/* ── Appearance / Dark Mode ───────────────────── */}
      <Pressable
        onPress={toggleTheme}
        className="mb-2 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-4"
      >
        <Ionicons
          name={isDark ? "moon" : "sunny-outline"}
          size={16}
          color={iconColor}
        />
        <View className="ml-3 flex-1">
          <Text className="text-sm font-ui text-primary dark:text-text-primary-dark">
            Appearance
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
            {isDark ? "Dark mode" : "Light mode"}
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#D8D4CC", true: "#3BAFA8" }}
          thumbColor={isDark ? "#4ECDC4" : "#F5F3EF"}
        />
      </Pressable>

      {/* ── Language ────────────────────────────────── */}
      <Pressable
        onPress={() => { /* TODO: open language settings */ }}
        className="mb-2 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-4"
      >
        <Ionicons name="language-outline" size={16} color={iconColor} />
        <View className="ml-3 flex-1">
          <Text className="text-sm font-ui text-primary dark:text-text-primary-dark">
            Language
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
            English + Sanskrit
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={iconColor} />
      </Pressable>

      {/* ── Logout ──────────────────────────────────── */}
      <Pressable
        onPress={handleLogout}
        disabled={isLoading}
        className="mt-4 flex-row items-center justify-center rounded-2xl border border-error/30 bg-error/10 px-4 py-4"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#C94058" />
        ) : (
          <>
            <Ionicons name="log-out-outline" size={16} color="#C94058" />
            <Text className="ml-2 text-sm font-uiSemiBold text-error dark:text-error">
              Log out
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
