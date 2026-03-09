import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { WEEK_LABELS } from "./data";

interface ProfileStreakCardProps {
  streak: number;
}

export default function ProfileStreakCard({ streak }: ProfileStreakCardProps) {
  const activeDays = streak % 7;

  return (
    <View
      className="mb-6 rounded-3xl border p-6"
      style={{
        borderColor: `${colors.primary}40`,
        backgroundColor: `${colors.primary}14`,
      }}
    >
      <View
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full"
        style={{ backgroundColor: `${colors.primary}1A` }}
      />

      <View className="items-center">
        <Ionicons name="flame-outline" size={32} color={colors.primary} />
        <Text className="mt-1 text-6xl leading-[58px]" style={[typography.heading, { color: colors.primary }]}>
          {streak}
        </Text>
        <Text className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
          Day Streak
        </Text>

        <View className="mt-4 flex-row">
          {WEEK_LABELS.map((day, index) => {
            const isActive = index < activeDays;
            return (
              <View key={`${day}-${index}`} className="mx-[3px] items-center">
                {isActive ? (
                  <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-7 w-7 items-center justify-center rounded-full"
                  >
                    <Ionicons name="checkmark" size={12} color={colors.backgroundDeep} />
                  </LinearGradient>
                ) : (
                  <View
                    className="h-7 w-7 items-center justify-center rounded-full border"
                    style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
                  />
                )}
                <Text className="mt-1 text-[10px]" style={{ color: colors.textMuted }}>
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
