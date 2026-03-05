import { Animated } from "react-native";
import { onboardingPalette as C } from "@/theme/onboarding";

type WelcomeVerseOverlayProps = {
  overlayOp: Animated.Value;
  labelOp: Animated.Value;
  verseTextOp: Animated.Value;
  verseLabel: string;
  typedText: string;
  serif: string;
};

export default function WelcomeVerseOverlay({
  overlayOp,
  labelOp,
  verseTextOp,
  verseLabel,
  typedText,
  serif,
}: WelcomeVerseOverlayProps) {
  return (
    <Animated.View
      className="absolute inset-0 items-center justify-center px-8"
      style={{ opacity: overlayOp }}
      pointerEvents="none"
    >
      <Animated.Text
        className="mb-[18px] text-center text-[10px] uppercase tracking-[4px]"
        style={{ opacity: labelOp, color: C.verseLabel, fontFamily: serif }}
      >
        {verseLabel}
      </Animated.Text>
      <Animated.Text
        className="text-center text-[19px] italic leading-8 tracking-[0.4px]"
        style={{ opacity: verseTextOp, color: C.verseText, fontFamily: serif }}
      >
        {typedText}
      </Animated.Text>
    </Animated.View>
  );
}
