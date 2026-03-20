import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WEEK_LABELS } from "./data";

interface ProfileStreakCardProps {
  streak: number;
}

export default function ProfileStreakCard({ streak }: ProfileStreakCardProps) {
  const activeDays = streak % 7;

  return (
    <View
      className="mb-6 rounded-3xl border border-highlight/30 bg-highlight/10 p-6"
    >
      <View
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-highlight/10"
      />

      <View className="items-center">
        <Ionicons name="flame-outline" size={32} color="#FFD25A" />
        <Text className="mt-1 text-3xl leading-tight font-heading text-highlight dark:text-highlight-dark">
          {streak}
        </Text>
        <Text className="mt-1 text-sm font-ui text-secondary dark:text-secondary-dark">
          Day Streak
        </Text>

        <View className="mt-4 flex-row">
          {WEEK_LABELS.map((day, index) => {
            const isActive = index < activeDays;
            return (
              <View key={`${day}-${index}`} className="mx-[3px] items-center">
                {isActive ? (
                  <LinearGradient
                    colors={["#FFD25A", "#D4960A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-7 w-7 items-center justify-center rounded-full"
                  >
                    <Ionicons name="checkmark" size={12} color="#111128" />
                  </LinearGradient>
                ) : (
                  <View className="h-7 w-7 items-center justify-center rounded-full border border-border dark:border-border-dark bg-surface dark:bg-surface-dark" />
                )}
                <Text className="mt-1 text-xs font-ui text-secondary dark:text-secondary-dark">
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
