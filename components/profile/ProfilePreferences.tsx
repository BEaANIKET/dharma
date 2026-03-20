import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThumbButton from "@/components/home/ThumbButton";
import { PREFERENCES } from "./data";

export default function ProfilePreferences() {
  return (
    <View className="mb-6">
      <Text className="text-sm font-uiSemiBold text-primary dark:text-parchment">
        Your Preferences
      </Text>
      <Text className="mt-1 text-xs font-ui text-secondary dark:text-secondary-dark">
        Thumbs up/down on any card teaches Sthira what resonates with you.
      </Text>

      <View className="mt-3">
        {PREFERENCES.map((item) => (
          <View
            key={item.label}
            className="mb-2 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-3"
          >
            <Ionicons name={item.icon} size={16} color="#6b6878" />
            <Text className="ml-3 flex-1 text-sm font-ui text-primary dark:text-parchment">
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
