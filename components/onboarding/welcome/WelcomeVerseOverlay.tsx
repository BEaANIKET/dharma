import { Animated } from "react-native";
import { onboardingPalette as C } from "@/theme/onboarding";

type WelcomeVerseOverlayProps = {
  overlayOp: Animated.Value;
  labelOp: Animated.Value;
  verseTextOp: Animated.Value;
  verseLabel: string;
  typedText: string;
};

export default function WelcomeVerseOverlay({
  overlayOp,
  labelOp,
  verseTextOp,
  verseLabel,
  typedText,
}: WelcomeVerseOverlayProps) {
  return (
    <Animated.View
      className="absolute inset-0 items-start justify-center px-8"
      style={{ opacity: overlayOp, paddingTop: "10%" }}
      pointerEvents="none"
    >
      <Animated.Text
        className="mb-3 text-left text-xs uppercase text-primary dark:text-primary-dark tracking-widest font-heading"
        style={{ opacity: labelOp }}
      >
        {verseLabel}
      </Animated.Text>
      <Animated.Text
        className="text-left text-3xl leading-[1.4] text-primary dark:text-primary-dark tracking-wide font-headingMediumItalic"
        style={{ opacity: verseTextOp }}
      >
        {typedText}
      </Animated.Text>
    </Animated.View>
  );
}
