import { router } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";

export default function Loading() {
  useEffect(() => {
    const routeTimer = setTimeout(() => {
      router.replace("/(tabs)/explore");
    }, 5200);

    return () => clearTimeout(routeTimer);
  }, []);

  return (
    <View className=" flex-1">
      <Image
        source={require("@/assets/images/dark-splash-android.png")}
        className=" w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
}
