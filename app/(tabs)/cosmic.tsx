import GradientBackground from "@/components/GradientBackground";
import { Text, View } from "react-native";

export default function Cosmic() {
  return (
    <GradientBackground>
      <View className="flex-1 justify-center items-center">
        <Text className="text-textPrimary text-xl">
          Cosmic Screen
        </Text>
      </View>
    </GradientBackground>
  );
}