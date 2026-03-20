import { ActivityIndicator, Text, View } from "react-native";
import DharmaLogo from "@/components/DharmaLogo";

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
      className={`${fullscreen ? "flex-1" : ""} items-center justify-center px-8 bg-bg dark:bg-bg-dark`}
    >
      <DharmaLogo size={120} showWordmark />
      <Text className="mt-6 text-lg font-semibold text-center font-ui text-primary dark:text-text-primary-dark">
        {message}
      </Text>
      {!!subMessage && (
        <Text className="mt-2 text-sm text-center font-ui text-secondary dark:text-secondary-dark">
          {subMessage}
        </Text>
      )}
      <ActivityIndicator color="#4ECDC4" size="small" style={{ marginTop: 18 }} />
    </View>
  );
}
