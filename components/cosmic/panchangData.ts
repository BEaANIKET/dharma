/* ── Panchang Data & Helpers ── */

export interface PanchangData {
  date: string;
  location: string;
  vara: string;
  month: string;
  tithi: string;
  tithi_end: string;
  tithi_next: string;
  tithi_num: number;
  nakshatra: string;
  nakshatra_end: string;
  nakshatra_next: string;
  nakshatra_idx: number;
  yoga: string;
  yoga_end: string;
  yoga_next: string;
  karana: string;
  karana_end: string;
  karana_next: string;
  paksha: string;
  sunrise: string;
  sunrise_h: number;
  sunset: string;
  sunset_h: number;
  moonrise: string;
  moonrise_h: number;
  moonset: string;
  moon_day: number;
  moon_phase: string;
  moon_pct: number;
  vikram: string;
  shaka: string;
  gujarati: string;
  samvatsara: string;
  chandramasa: string;
  gate: string;
  moonsign: string;
  sunsign: string;
  surya_nak: string;
  ritu: string;
  ayana: string;
  madhyahna: string;
  dinamana: string;
  ratrimana: string;
  festivals: string[];
  events: string[];
  auspicious: AuspiciousWindow[];
  inauspicious: InauspiciousWindow[];
}

export interface AuspiciousWindow {
  n: string;
  t: string;
  hi: boolean;
  note: string;
}

export interface InauspiciousWindow {
  n: string;
  t: string;
  sev: "med" | "high";
  note: string;
}

export interface OracleData {
  do_today: string[];
  avoid_today: string[];
  color_wear: { hex: string; name: string; chakra?: string; reason: string };
  color_avoid: { hex: string; name: string; reason: string };
  food_nourishing: string[];
  food_avoid: string[];
  herb: { name: string; benefit: string };
  finance: string;
  health: string;
  spiritual: string;
  direction_favor: string;
  direction_avoid: string;
  direction_note: string;
}

/** Static panchang data — will be replaced by API */
export const PD: PanchangData = {
  date: "April 1, 2026",
  location: "Mumbai",
  vara: "Budhawara",
  month: "Chaitra",
  tithi: "Chaturdashi",
  tithi_end: "upto 07:06 AM",
  tithi_next: "Purnima",
  tithi_num: 14,
  nakshatra: "Uttara Phalguni",
  nakshatra_end: "upto 04:17 PM",
  nakshatra_next: "Hasta",
  nakshatra_idx: 11,
  yoga: "Vriddhi",
  yoga_end: "upto 02:51 PM",
  yoga_next: "Dhruva",
  karana: "Vishti",
  karana_end: "upto 07:20 PM",
  karana_next: "Bava",
  paksha: "Shukla Paksha",
  sunrise: "06:33 AM",
  sunrise_h: 6.55,
  sunset: "06:52 PM",
  sunset_h: 18.87,
  moonrise: "06:25 PM",
  moonrise_h: 18.42,
  moonset: "06:21 AM, Apr 02",
  moon_day: 14,
  moon_phase: "Waxing Gibbous",
  moon_pct: 93,
  vikram: "2083 Siddharthi",
  shaka: "1948 Parabhava",
  gujarati: "2082 Pingala",
  samvatsara: "Siddharthi (until Apr 21, 2026) → Raudra",
  chandramasa: "Chaitra – Purnimanta | Chaitra – Amanta",
  gate: "18",
  moonsign: "Kanya",
  sunsign: "Meena",
  surya_nak: "Revati",
  ritu: "Vasant (Spring)",
  ayana: "Uttarayana",
  madhyahna: "12:42 PM",
  dinamana: "12h 19m",
  ratrimana: "11h 40m",
  festivals: [
    "Panguni Uthiram",
    "Chaitra Purnima Vrat",
    "Anvadhan",
    "Swarochisha Manvadi",
  ],
  events: [
    "Bhadra (all day)",
    "Sarvartha Siddhi Yoga",
    "Ravi Yoga",
    "Aadal Yoga",
  ],
  auspicious: [
    { n: "Brahma Muhurta", t: "04:59–05:46 AM", hi: true, note: "Prime meditation" },
    { n: "Pratah Sandhya", t: "05:23–06:33 AM", hi: false, note: "Dawn junction" },
    { n: "Amrit Kalam", t: "08:48–10:28 AM", hi: true, note: "Nectar window" },
    { n: "Ravi Yoga", t: "06:33 AM–04:17 PM", hi: true, note: "Solar vitality" },
    { n: "Vijaya Muhurta", t: "02:46–03:35 PM", hi: false, note: "Victory hour" },
    { n: "Sarvartha Siddhi", t: "04:17 PM →", hi: true, note: "All-purpose success — rare" },
    { n: "Godhuli Muhurta", t: "06:51–07:15 PM", hi: false, note: "Sacred twilight" },
  ],
  inauspicious: [
    { n: "Yamaganda", t: "08:05–09:38 AM", sev: "med", note: "Avoid important starts" },
    { n: "Gulikai Kalam", t: "11:10 AM–12:42 PM", sev: "med", note: "Inauspicious window" },
    { n: "Rahu Kalam", t: "12:42–02:15 PM", sev: "high", note: "No new ventures" },
    { n: "Dur Muhurtam", t: "12:18–01:07 PM", sev: "med", note: "Within Rahu Kalam" },
    { n: "Bhadra", t: "07:06 AM–07:20 PM", sev: "high", note: "Vishti Karana active" },
  ],
};

/* ── SVG Geometry Helpers ── */

export function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function timeToDecimal(s: string): number {
  if (!s) return 0;
  const clean = s.replace(/,.*/, "").trim();
  const parts = clean.split(" ");
  const time = parts[0];
  const ap = parts[1];
  if (!time) return 0;
  const [hh, mm] = time.split(":").map(Number);
  return (
    hh +
    (ap === "PM" && hh !== 12 ? 12 : ap === "AM" && hh === 12 ? -12 : 0) +
    (mm || 0) / 60
  );
}

/* ── Theme Colors for SVG (dark mode values) ── */
export const C = {
  bg: "#111128",
  surface: "#0b0b1a",
  border: "#252545",
  text: "#E8E4DC",
  sub: "#a8a4a0",
  hint: "rgba(255,255,255,0.3)",
  gold: "#D4960A",
  goldBright: "#FFD25A",
  goldBg: "rgba(212,150,10,0.12)",
  goldBd: "rgba(212,150,10,0.25)",
  teal: "#4ECDC4",
  tealBg: "rgba(78,205,196,0.11)",
  tealBd: "rgba(78,205,196,0.22)",
  red: "#E85D75",
  redBg: "rgba(232,93,117,0.11)",
  redBd: "rgba(232,93,117,0.22)",
  cell: "rgba(255,255,255,0.055)",
  cellBd: "rgba(255,255,255,0.09)",
};

export const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "P.Phalguni", "U.Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "P.Ashadha", "U.Ashadha", "Shravana", "Dhanishtha",
  "Shatabhisha", "P.Bhadra", "U.Bhadra", "Revati",
];
