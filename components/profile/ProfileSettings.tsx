import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { SETTINGS } from "./data";

export default function ProfileSettings() {
  return (
    <View>
      <Text className="mb-3 text-sm font-uiSemiBold" style={{ color: colors.textPrimary }}>
        Settings
      </Text>

      {SETTINGS.map((item) => (
        <Pressable
          key={item.label}
          className="mb-2 flex-row items-center rounded-2xl border px-4 py-4"
          style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}
        >
          <Ionicons name={item.icon} size={16} color={colors.textSecondary} />
          <View className="ml-3 flex-1">
            <Text className="text-sm font-ui" style={{ color: colors.textPrimary }}>
              {item.label}
            </Text>
            <Text className="text-xs font-ui" style={{ color: colors.textMuted }}>
              {item.sub}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
        </Pressable>
      ))}
    </View>
  );
}
