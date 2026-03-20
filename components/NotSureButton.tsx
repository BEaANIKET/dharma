import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotSureButton() {
  return (
    <Pressable className="mt-6 w-full">
      <View className="border border-dashed border-border/40 dark:border-border-dark/40 rounded-2xl p-4 flex-row items-center justify-center bg-surface dark:bg-surface-dark">
        <Feather name="wind" size={20} color="#4ECDC4" />
        <Text className="text-secondary dark:text-text-secondary-dark ml-3 text-base">
          I&apos;m not sure what I&apos;m feeling
        </Text>
      </View>
    </Pressable>
  );
}
