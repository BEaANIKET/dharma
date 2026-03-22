import DharmaLogo from "@/components/DharmaLogo";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function formatDate() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-bg dark:bg-bg-dark px-5 pb-3 "
    >
      <View className="flex-row items-start justify-between">
        {/* Left: Logo + Date + Location */}
        <View className="flex-row items-start">
          <View className="mr-3 mt-1">
            <DharmaLogo size={36} showWordmark={false} />
          </View>
          <View>
            <Text className="text-xs uppercase tracking-[0.15em] font-ui text-accent-secondary dark:text-accent-secondary-dark">
              cosmic energy
            </Text>
            <Text className="text-2xl font-headingMedium text-text-primary dark:text-text-primary-dark">
              {formatDate()}
            </Text>
            <View className="mt-1 flex-row items-center">
              <Ionicons name="location-sharp" size={12} color="#D4960A" />
              <Text className="ml-1 text-xs font-ui text-highlight dark:text-highlight-dark">
                Mumbai
              </Text>
            </View>
          </View>
        </View>

        {/* Right: Edit button */}
        <Pressable className="mt-1 flex-row items-center rounded-full bg-highlight/20 px-3 py-1.5">
          <Ionicons name="pencil" size={14} color="#D4960A" />
          <Text className="ml-1.5 text-sm font-ui text-highlight dark:text-highlight-dark">
            Edit
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
