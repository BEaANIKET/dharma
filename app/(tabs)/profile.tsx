import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "@/components/GradientBackground";
import ProfileStreakCard from "@/components/profile/ProfileStreakCard";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import ProfilePreferences from "@/components/profile/ProfilePreferences";
import ProfileSettings from "@/components/profile/ProfileSettings";
import { useAuthStore } from "@/store/useAuthStore";
import { friendlyMessage } from "@/services/api";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      try {
        await fetchCurrentUser();
      } catch (e) {
        if (mounted) {
          setError(friendlyMessage(e));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    void run();
    return () => {
      mounted = false;
    };
  }, [fetchCurrentUser]);

  const streak = user?.stats?.current_streak ?? 0;
  const statsValues = useMemo(
    () => ({
      verses: String(Math.max(0, Math.round((user?.stats?.longest_streak ?? 0) * 3.2))),
      minutes: String(Math.max(0, Math.round((user?.stats?.current_streak ?? 0) * 6.5))),
      deeds: String(Math.max(0, Math.round((user?.stats?.current_streak ?? 0) / 2))),
    }),
    [user]
  );

  return (
    <GradientBackground>
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: insets.bottom + 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 text-3xl leading-tight font-heading text-text-primary dark:text-text-primary-dark">
          Your Journey
        </Text>

        {loading ? (
          <Text className="mb-4 text-sm font-ui text-secondary dark:text-secondary-dark">
            Updating your journey...
          </Text>
        ) : null}
        {error ? (
          <Text className="mb-4 text-sm font-ui text-error dark:text-error-dark">
            {error}
          </Text>
        ) : null}

        <ProfileStreakCard streak={streak} />
        <ProfileStatsRow values={statsValues} />
        <ProfilePreferences />
        <ProfileSettings />
      </ScrollView>
    </GradientBackground>
  );
}
