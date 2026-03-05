import { colors } from "@/theme/colors";

export const onboardingPalette = {
  bg: colors.onboardingBg,
  goldDim: colors.onboardingGoldDim,
  goldFaint: colors.onboardingGoldFaint,
  goldLabel: colors.onboardingGoldLabel,
  goldOm: colors.onboardingGoldOm,
  white90: colors.onboardingWhite90,
  white30: colors.onboardingWhite30,
  white18: colors.onboardingWhite18,
  white10: colors.onboardingWhite10,
  white06: colors.onboardingWhite06,
  strip: colors.onboardingStrip,
  verseLabel: colors.onboardingVerseLabel,
  verseText: colors.onboardingVerseText,
  privacy: colors.onboardingPrivacy,
  vignetteStart: colors.onboardingVignetteStart,
  vignetteEnd: colors.onboardingVignetteEnd,
  black: colors.black,
} as const;

export const onboardingTimings = {
  INTRO_MAX_MS: 20000,
  TYPE_SPEED_MS: 55,
  VERSE_HOLD_MS: 1400,
  VERSE_FADE_MS: 500,
  VIDEO_FADE_MS: 2200,
  VOL_TICK_MS: 1200,
  OVERLAY_OUT_MS: 900,
  FORM_DRIFT_MS: 1800,
  FORM_EASE_DELAY: 150,
  STAGGER: 220,
} as const;

export const onboardingFormCopy = {
  headline: "when did your\nsoul arrive?",
  sub: "through the noise… through the scrolling…\nremember who you are.",
} as const;

export const onboardingVerses = [
  {
    label: "reflection",
    text: "when did you last\nfeel truly alive?",
  },
  {
    label: "reflection",
    text: "through the noise…",
  },
  {
    label: "reflection",
    text: "through the scrolling…",
  },
  {
    label: "reflection",
    text: "what happened to\nyour dharma?",
  },
  {
    label: "reflection",
    text: "this is\nnot belief.",
  },
  {
    label: "reflection",
    text: "this is\nnot productivity.",
  },
  {
    label: "reflection",
    text: "this is\nnot random.",
  },
  {
    label: "remembrance",
    text: "remember who you are.",
  },
  {
    label: "arrival",
    text: "welcome to\nDharma.",
  },
] as const;