/* ── Explore Tab Data ── */

export interface CardDef {
  key: string;
  icon: string;
  title: string;
  sub: string;
}

export const CARD_DEFS: CardDef[] = [
  { key: "vibe", icon: "🌕", title: "Today's Vibe", sub: "Moon · Phase · Energy" },
  { key: "score", icon: "📊", title: "Cosmic Score", sub: "Auspiciousness · 8.4/10" },
  { key: "moment", icon: "✦", title: "Key Moment", sub: "The window you shouldn't miss" },
  { key: "caution", icon: "⚠️", title: "Caution Zones", sub: "Dead zones · Timing map" },
  { key: "guide", icon: "🧭", title: "Today's Guide", sub: "Do · Avoid · Color · Food" },
  { key: "panchang", icon: "📜", title: "Full Panchang", sub: "Five limbs · Deep reference" },
];

/** AI-powered daily guidance — static for now, will connect to API */
export const AI = {
  archetype: "The Gathering Light",
  vibe: "Pre-Purnima clarity. Mercury sharpens everything today.",
  planet: "Mercury (Budha)",
  gifts: "Communication · Analysis · Precision",
  do: [
    "Write, plan, present — Mercury sharpens every word",
    "Finalize agreements — Uttara Phalguni rules enduring contracts",
    "Set an intention at exactly 4:17 PM today",
    "Seek wisdom or mentorship — Guru is Raja this year",
    "Face East or South for important conversations",
  ],
  dont: [
    "Rahu Kalam 12:42–2:15 PM — no new ventures",
    "Avoid North direction — Disha Shool all day",
    "No confrontations during Yamaganda 8:05–9:38 AM",
    "Bhadra all day — avoid auspicious ceremonies",
    "Honor health signals — Baana = Roga today",
  ],
  color_wear: "#2D6A4F",
  color_name: "Emerald",
  color_why: "Mercury's green amplifies clarity and precision today.",
  color_avoid: "#7B1515",
  color_avoid_name: "Deep Red",
  food: "Sattvic and light — fresh fruits, coconut water, green vegetables, Tulsi tea.",
  spiritual:
    "Moonrise at 6:25 PM — near-full moon rises at near-sunset. Sit outside. Look up.",
};

/** Dharma Library — stacked overlay cards */
export interface LibraryCardData {
  id: string;
  icon: string;
  title: string;
  sub: string;
  accent: string;
  gradColors: [string, string];
}

export const LIBRARY_CARDS: LibraryCardData[] = [
  {
    id: "bhagavad",
    icon: "📖",
    title: "Bhagavad Gita",
    sub: "Day 2 of 239",
    accent: "#C8943A",
    gradColors: ["rgba(200,148,58,0.08)", "rgba(200,148,58,0.02)"],
  },
  {
    id: "yoga",
    icon: "🧘",
    title: "Yoga & Breath",
    sub: "3 practices",
    accent: "#3A9A6E",
    gradColors: ["rgba(58,154,110,0.08)", "rgba(58,154,110,0.02)"],
  },
  {
    id: "mantra",
    icon: "🔔",
    title: "Mantras",
    sub: "Today's sacred sound",
    accent: "#7B70A0",
    gradColors: ["rgba(123,112,160,0.08)", "rgba(123,112,160,0.02)"],
  },
  {
    id: "journal",
    icon: "✍️",
    title: "Reflection",
    sub: "Evening prompt",
    accent: "#B85252",
    gradColors: ["rgba(184,82,82,0.08)", "rgba(184,82,82,0.02)"],
  },
];

/** Auspiciousness scores — static, will be computed from panchang data */
export const AUSP = {
  overall: 8.4,
  scores: [
    { label: "Tithi", value: 9, color: "rgba(200,148,58,0.85)" },
    { label: "Yoga", value: 8, color: "rgba(58,154,110,0.8)" },
    { label: "Nakshatra", value: 7, color: "rgba(180,180,255,0.7)" },
    { label: "Vara", value: 7, color: "rgba(180,130,200,0.75)" },
  ],
};
