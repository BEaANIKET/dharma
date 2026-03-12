import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import ThumbButton from "@/components/home/ThumbButton";
import { PREFERENCES } from "./data";

export default function ProfilePreferences() {
  return (
    <View className="mb-6">
      <Text className="text-sm font-uiSemiBold" style={{ color: colors.textPrimary }}>
        Your Preferences
      </Text>
      <Text className="mt-1 text-xs font-ui" style={{ color: colors.textMuted }}>
        Thumbs up/down on any card teaches Sthira what resonates with you.
      </Text>

      <View className="mt-3">
        {PREFERENCES.map((item) => (
          <View
            key={item.label}
            className="mb-2 flex-row items-center rounded-2xl border px-3 py-3"
            style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
          >
            <Ionicons name={item.icon} size={16} color={colors.textSecondary} />
            <Text className="ml-3 flex-1 text-sm font-ui" style={{ color: colors.textPrimary }}>
              {item.label}
            </Text>
            <ThumbButton direction="up" active={item.pref === "up"} onPress={() => {}} />
            <View className="w-2" />
            <ThumbButton direction="down" active={item.pref === "down"} onPress={() => {}} />
          </View>
        ))}
      </View>
    </View>
  );
}
