import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotSureButton() {
  return (
    <Pressable className="mt-6 w-full">
      <View className="border border-dashed border-white/20 rounded-2xl p-4 flex-row items-center justify-center bg-card">
        <Feather name="wind" size={20} color="#22D3EE" />
        <Text className="text-textSecondary ml-3 text-base">
          I&apos;m not sure what I&apos;m feeling
        </Text>
      </View>
    </Pressable>
  );
}
