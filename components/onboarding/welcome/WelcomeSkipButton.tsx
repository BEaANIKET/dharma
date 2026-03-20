import { Text, View } from "react-native";
import AnimatedPressable from "@/components/AnimatedPressable";

type WelcomeSkipButtonProps = {
  topInset: number;
  onPress: () => void;
};

export default function WelcomeSkipButton({ topInset, onPress }: WelcomeSkipButtonProps) {
  return (
    <View
      className="absolute left-0 right-0 top-0 z-20 flex-row justify-end px-5"
      style={{ paddingTop: topInset + 16 }}
    >
      <AnimatedPressable
        onPress={onPress}
        className="min-h-9 justify-center rounded-[20px] border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-2"
        accessibilityLabel="Skip intro"
      >
        <Text
          className="text-xs uppercase tracking-widest font-ui text-text-secondary dark:text-text-secondary-dark"
        >
          skip
        </Text>
      </AnimatedPressable>
    </View>
  );
}
