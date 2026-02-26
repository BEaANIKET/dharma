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
  INTRO_MAX_MS: 52000,
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
    label: "श्रीमद् भगवद् गीता · 2.47",
    text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
  },
  {
    label: "श्रीमद् भगवद् गीता · 6.5",
    text: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
  },
  {
    label: "श्रीमद् भगवद् गीता · 2.20",
    text: "न जायते म्रियते वा कदाचित्\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
  },
  {
    label: "श्रीमद् भगवद् गीता · 3.27",
    text: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः।\nअहंकारविमूढात्मा कर्ताहमिति मन्यते॥",
  },
] as const;
