export const onboardingPalette = {
  bg: "#111128",
  goldDim: "rgba(255,210,90,0.42)",
  goldFaint: "rgba(255,210,90,0.28)",
  goldLabel: "rgba(255,210,90,0.65)",
  goldOm: "rgba(255,210,90,0.30)",
  white90: "rgba(232,228,220,0.90)",
  white30: "rgba(232,228,220,0.30)",
  white18: "rgba(232,228,220,0.18)",
  white10: "rgba(232,228,220,0.10)",
  white06: "rgba(232,228,220,0.06)",
  strip: "#0D0C14",
  verseLabel: "rgba(232,228,220,0.50)",
  verseText: "rgba(232,228,220,0.87)",
  privacy: "rgba(232,228,220,0.15)",
  vignetteStart: "rgba(9,9,15,0.55)",
  vignetteEnd: "rgba(9,9,15,0.97)",
  black: "#000000",
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
