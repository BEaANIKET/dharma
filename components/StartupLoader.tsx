import { ActivityIndicator, Image, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

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
      style={{ backgroundColor: colors.background }}
    >
      <Image
        source={require("../assets/images/mydharmalogo.png")}
        resizeMode="contain"
        className="h-[180px] w-[180px]"
      />
      <Text className="mt-6 text-lg font-semibold text-center font-ui" style={{ color: colors.textPrimary }}>
        {message}
      </Text>
      {!!subMessage && (
        <Text className="mt-2 text-sm text-center font-ui" style={{ color: colors.textSecondary }}>
          {subMessage}
        </Text>
      )}
      <ActivityIndicator color={colors.primary} size="small" style={{ marginTop: 18 }} />
    </View>
  );
}
