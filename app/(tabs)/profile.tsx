import { Text, View } from "react-native";
import GradientBackground from "../../components/GradientBackground";

export default function Story() {
  return (
    <GradientBackground>
      <View className="flex-1 justify-center items-center">
        <Text className="text-textPrimary text-xl">
          Profile Screen
        </Text>
      </View>
    </GradientBackground>
  );
}