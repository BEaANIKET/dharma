import { Text, View } from "react-native";
import AnimatedPressable from "@/components/AnimatedPressable";
import { onboardingPalette as C } from "@/theme/onboarding";

type WelcomeSkipButtonProps = {
  topInset: number;
  sans: string;
  onPress: () => void;
};

export default function WelcomeSkipButton({ topInset, sans, onPress }: WelcomeSkipButtonProps) {
  return (
    <View
      className="absolute left-0 right-0 top-0 z-20 flex-row justify-end px-5"
      style={{ paddingTop: topInset + 16 }}
    >
      <AnimatedPressable
        onPress={onPress}
        className="min-h-9 justify-center rounded-[20px] border border-onboardingWhite10 bg-onboardingWhite06 px-4 py-2"
        accessibilityLabel="Skip intro"
      >
        <Text
          className="text-[11px] uppercase tracking-[4px]"
          style={{ color: C.white30, fontFamily: sans }}
        >
          skip
        </Text>
      </AnimatedPressable>
    </View>
  );
}
