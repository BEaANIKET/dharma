import { ActivityIndicator, Image, Text, View } from "react-native";

type StartupLoaderProps = {
  message?: string;
  subMessage?: string;
  fullscreen?: boolean;
};

export default function StartupLoader({
  message = "Preparing mydharma...",
  subMessage,
  fullscreen = true,
}: StartupLoaderProps) {
  return (
    <View
      className={fullscreen ? "flex-1 items-center justify-center px-8" : "items-center justify-center px-8"}
      style={{ backgroundColor: "#09080E" }}
    >
      <Image
        source={require("../assets/images/mydharmalogo.png")}
        resizeMode="contain"
        style={{ width: 180, height: 180 }}
      />
      <Text className="mt-6 text-lg font-semibold text-white text-center">{message}</Text>
      {!!subMessage && (
        <Text className="mt-2 text-sm text-center" style={{ color: "rgba(255,255,255,0.72)" }}>
          {subMessage}
        </Text>
      )}
      <ActivityIndicator color="#D4B178" size="small" style={{ marginTop: 18 }} />
    </View>
  );
}
