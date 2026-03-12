import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { STATS } from "./data";

interface ProfileStatsRowProps {
  values: {
    verses: string;
    minutes: string;
    deeds: string;
  };
}

export default function ProfileStatsRow({ values }: ProfileStatsRowProps) {
  return (
    <View className="mb-6 flex-row justify-between">
      {STATS.map((stat) => (
        <View
          key={stat.label}
          className="w-[32%] items-center rounded-2xl border px-2 py-4"
          style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
        >
          <Ionicons name={stat.icon} size={18} color={stat.color} />
          <Text className="mt-2 text-3xl leading-8 font-heading" style={{ color: colors.textPrimary }}>
            {values[stat.key]}
          </Text>
          <Text className="mt-1 text-center text-xs font-ui" style={{ color: colors.textMuted }}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
