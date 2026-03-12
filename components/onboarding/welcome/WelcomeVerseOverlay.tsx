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
      className="absolute inset-0 items-start justify-end px-8 pb-24"
      style={{ opacity: overlayOp }}
      pointerEvents="none"
    >
      <Animated.Text
        className="mb-[14px] text-left text-xs uppercase tracking-widest font-heading"
        style={{ opacity: labelOp, color: C.verseLabel }}
      >
        {verseLabel}
      </Animated.Text>
      <Animated.Text
        className="text-left text-lg italic leading-relaxed tracking-wide font-headingItalic"
        style={{ opacity: verseTextOp, color: C.verseText }}
      >
        {typedText}
      </Animated.Text>
    </Animated.View>
  );
}
