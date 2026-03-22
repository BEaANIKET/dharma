import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

/* ── Dummy data (will be replaced by API) ── */
const ENERGY_DATA = {
  festivals: [
    { label: "Panguni Uthiram", icon: "🪔" },
    { label: "Chaitra Purnima Vrat", icon: "🪔" },
  ],
  paksha: "Shukla Paksha",
  moon: {
    phase: "Waxing Gibbous",
    illumination: 93,
    note: "Purnima tonight",
    dayOfCycle: 14,
    totalDays: 30,
  },
  sun: {
    sunrise: "06:33 AM",
    sunset: "06:26 PM",
    sunriseHour: 6.55,   // 6:33 AM as decimal
    sunsetHour: 18.43,   // 6:26 PM as decimal
  },
  nakshatra: {
    name: "Uttara Phalguni",
    shortName: "U.Phalguni",
    index: 12,
    total: 27,
    deity: "Aryaman",
    meaning: "Enduring contracts & alliances",
  },
};

/* ── Festival Tag Pill ── */
function FestivalTag({
  label,
  icon,
  variant = "festival",
}: {
  label: string;
  icon?: string;
  variant?: "festival" | "neutral";
}) {
  const isFestival = variant === "festival";

  return (
    <View
      className={`mr-2 mb-2 flex-row items-center rounded-full border px-3 py-1.5 ${
        isFestival
          ? "border-[#D4960A]/25 bg-[#D4960A]/8"
          : "border-border dark:border-border-dark bg-surface dark:bg-surface-dark"
      }`}
    >
      {icon ? <Text className="mr-1.5 text-sm">{icon}</Text> : null}
      <Text
        className={`text-xs font-ui ${
          isFestival
            ? "text-[#D4960A]"
            : "text-text-secondary dark:text-text-secondary-dark"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

/* ── Moon Phase Visual ── */
function MoonPhaseIcon({
  size = 80,
  illumination = 93,
}: {
  size?: number;
  illumination?: number;
}) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  // Smaller offset = thinner dark crescent
  const darkOffset = r * ((100 - illumination) / 100) * 2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={cx} cy={cy} r={r} fill="#FFD25A" opacity={0.85} />
      <Circle cx={cx - darkOffset} cy={cy} r={r * 0.92} fill="#1a1a2e" />
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke="#FFD25A" strokeWidth={1} opacity={0.2} />
    </Svg>
  );
}

/* ── Sun Timeline (sunrise → sunset arc) ── */
function SunTimeline({
  sunrise,
  sunset,
  sunriseHour,
  sunsetHour,
}: {
  sunrise: string;
  sunset: string;
  sunriseHour: number;
  sunsetHour: number;
}) {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const dayLength = sunsetHour - sunriseHour;
  const dayProgress = Math.max(0, Math.min(1, (currentHour - sunriseHour) / dayLength));

  // Quadratic bezier: P0(20,38) Q(150,2) P2(280,38)
  // Point on curve at t: B(t) = (1-t)²·P0 + 2(1-t)t·Q + t²·P2
  const t = dayProgress;
  const oneMinusT = 1 - t;
  const dotX = oneMinusT * oneMinusT * 20 + 2 * oneMinusT * t * 150 + t * t * 280;
  const dotY = oneMinusT * oneMinusT * 38 + 2 * oneMinusT * t * 2 + t * t * 38;

  // Split the arc at the sun position using de Casteljau subdivision
  // Left segment: P0 → lerp(P0,Q,t) → B(t)
  const midX = 20 + t * (150 - 20);   // lerp P0.x → Q.x
  const midY = 38 + t * (2 - 38);     // lerp P0.y → Q.y

  const leftArc = `M20,38 Q${midX},${midY} ${dotX},${dotY}`;

  return (
    <View className="mt-5">
      <View className="h-[44px] justify-end">
        <Svg width="100%" height={44} viewBox="0 0 300 44">
          {/* Full arc — dim */}
          <Path
            d="M20,38 Q150,2 280,38"
            fill="none"
            stroke="#252545"
            strokeWidth={1.2}
          />
          {/* Elapsed arc — highlighted, follows the curve exactly to the sun */}
          <Path
            d={leftArc}
            fill="none"
            stroke="#D4960A"
            strokeWidth={1.5}
            opacity={0.7}
          />
          {/* Sun glow */}
          <Circle cx={dotX} cy={dotY} r={10} fill="#FFD25A" opacity={0.12} />
          {/* Sun dot — sits on the arc */}
          <Circle cx={dotX} cy={dotY} r={5} fill="#FFD25A" />
        </Svg>
      </View>
      <View className="mt-2 flex-row justify-between">
        <View className="flex-row items-center">
          <View className="mr-1.5 h-2 w-2 rounded-sm bg-[#FFD25A]/50" />
          <Text className="text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark">
            {sunrise}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark">
            {sunset}
          </Text>
          <View className="ml-1.5 h-2 w-2 rounded-sm bg-[#E85D75]/50" />
        </View>
      </View>
    </View>
  );
}

/* ── Lunar Cycle Card ── */
function LunarCycleCard() {
  const day = 14;
  const total = 30;

  return (
    <View className="flex-1 mr-2 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
      <Text className="text-center text-[10px] uppercase tracking-[0.15em] font-ui text-text-secondary dark:text-text-secondary-dark">
        lunar cycle
      </Text>

      <View className="my-3 items-center">
        <Svg width={100} height={100} viewBox="0 0 100 100">
          {/* Background ring */}
          <Circle cx={50} cy={50} r={38} fill="none" stroke="#252545" strokeWidth={6} />
          {/* Waxing arc (gold) */}
          <Circle
            cx={50} cy={50} r={38}
            fill="none"
            stroke="#D4960A"
            strokeWidth={6}
            strokeDasharray={`${(day / total) * 239} 239`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          {/* Moon icon in center */}
          <Circle cx={50} cy={44} r={10} fill="#D4960A" opacity={0.8} />
          <Circle cx={45} cy={44} r={10} fill="#1a1a2e" />
        </Svg>
        <View className="absolute items-center justify-center" style={{ top: 55 }}>
          <Text className="text-sm font-uiBold text-text-primary dark:text-text-primary-dark">
            Day {day}
          </Text>
          <Text className="text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark">
            of {total}
          </Text>
        </View>
      </View>

      {/* Legend */}
      <View className="mt-1">
        <View className="flex-row items-center mb-1">
          <View className="mr-2 h-2 w-2 rounded-full bg-highlight dark:bg-highlight-dark" />
          <Text className="text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark">Waxing</Text>
        </View>
        <View className="flex-row items-center mb-1">
          <View className="mr-2 h-2 w-2 rounded-full bg-disabled dark:bg-disabled-dark" />
          <Text className="text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark">Waning</Text>
        </View>
        <View className="flex-row items-center">
          <View className="mr-2 h-2 w-2 rounded-full bg-highlight dark:bg-highlight-dark" />
          <Text className="text-[10px] font-ui text-highlight dark:text-highlight-dark">Today (Day {day})</Text>
        </View>
      </View>
    </View>
  );
}

/* ── Nakshatra Wheel Card ── */
function NakshatraCard() {
  const nakshatra = "Uttara Phalguni";
  const shortName = "U.Phalguni";
  const index = 12;
  const total = 27;
  const deity = "Aryaman";
  const meaning = "Enduring contracts & alliances";

  return (
    <View className="flex-1 ml-2 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
      <Text className="text-center text-[10px] uppercase tracking-[0.15em] font-ui text-text-secondary dark:text-text-secondary-dark">
        nakshatra wheel
      </Text>

      <View className="my-3 items-center">
        <Svg width={100} height={100} viewBox="0 0 100 100">
          {/* Background ring */}
          <Circle cx={50} cy={50} r={38} fill="none" stroke="#252545" strokeWidth={6} />
          {/* Progress arc */}
          <Circle
            cx={50} cy={50} r={38}
            fill="none"
            stroke="#D4960A"
            strokeWidth={6}
            strokeDasharray={`${(index / total) * 239} 239`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          {/* Tick marks */}
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i * 90 - 90) * (Math.PI / 180);
            const x1 = 50 + Math.cos(angle) * 34;
            const y1 = 50 + Math.sin(angle) * 34;
            const x2 = 50 + Math.cos(angle) * 42;
            const y2 = 50 + Math.sin(angle) * 42;
            return (
              <Line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#252545" strokeWidth={1}
              />
            );
          })}
          {/* Star in center */}
          <Path
            d="M50,32 L53,44 L65,44 L55,51 L59,63 L50,55 L41,63 L45,51 L35,44 L47,44 Z"
            fill="#FFD25A"
            opacity={0.9}
          />
        </Svg>
        <View className="absolute items-center justify-center" style={{ top: 55 }}>
          <Text className="text-[9px] font-ui text-text-primary dark:text-text-primary-dark">
            {shortName}
          </Text>
          <Text className="text-[8px] font-ui text-text-secondary dark:text-text-secondary-dark">
            {index} of {total}
          </Text>
        </View>
      </View>

      <Text className="text-center text-sm font-uiMedium text-text-primary dark:text-text-primary-dark">
        {nakshatra}
      </Text>
      <Text className="mt-0.5 text-center text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark">
        Deity: {deity} · {index} of {total}
      </Text>
      <Text className="mt-0.5 text-center text-[10px] italic font-ui text-accent-secondary dark:text-accent-secondary-dark">
        {meaning}
      </Text>
    </View>
  );
}

/* ── Oracle Reading Card ── */
function OracleCard({ onGenerate }: { onGenerate?: () => void }) {
  return (
    <View className="mt-5 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 items-center">
      {/* Sparkle icon */}
      <Text className="text-2xl mb-3">✦</Text>

      <Text className="text-xl font-headingMedium text-text-primary dark:text-text-primary-dark">
        Oracle Reading
      </Text>
      <Text className="mt-2 text-center text-xs leading-relaxed font-ui text-text-secondary dark:text-text-secondary-dark">
        AI-powered daily guidance from today's Panchang —{"\n"}
        Do/Avoid, Colors, Food, Finance, Health, Spiritual & Direction.
      </Text>

      <Pressable
        onPress={onGenerate}
        className="mt-5 flex-row items-center rounded-2xl bg-highlight/15 dark:bg-highlight-dark/15 border border-highlight/30 dark:border-highlight-dark/30 px-6 py-3"
      >
        <Text className="text-sm font-uiSemiBold text-highlight dark:text-highlight-dark">
          ✦ Generate Today's Oracle
        </Text>
      </Pressable>
    </View>
  );
}

/* ── Main Energy Tab ── */
export default function EnergyTab() {
  return (
    <View>

      {/* ── Moon Phase Card ── */}
      <View className=" rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-5">
        <View className="flex-row flex-wrap">
          {ENERGY_DATA.festivals.map((f) => (
            <FestivalTag key={f.label} label={f.label} icon={f.icon} />
          ))}
          <FestivalTag label={ENERGY_DATA.paksha} variant="neutral" />
        </View>

        <View className="mt-2 flex-row items-center">
          <MoonPhaseIcon size={80} illumination={ENERGY_DATA.moon.illumination} />
          <View className="ml-4 flex-1">
            <Text className="text-[22px] font-headingSemiBold text-text-primary dark:text-text-primary-dark">
              {ENERGY_DATA.moon.phase}
            </Text>
            <Text className="mt-0.5 text-[11px] font-ui text-text-secondary dark:text-text-secondary-dark">
              {ENERGY_DATA.moon.illumination}% illuminated · {ENERGY_DATA.moon.note}
            </Text>
          </View>
        </View>
        <SunTimeline
          sunrise={ENERGY_DATA.sun.sunrise}
          sunset={ENERGY_DATA.sun.sunset}
          sunriseHour={ENERGY_DATA.sun.sunriseHour}
          sunsetHour={ENERGY_DATA.sun.sunsetHour}
        />
      </View>

      {/* ── Section Header ── */}
      <Text className="mt-6 mb-3 text-[10px] uppercase tracking-[0.2em] font-ui text-text-secondary dark:text-text-secondary-dark">
        cosmic positions · live artifacts
      </Text>

      {/* ── Lunar Cycle + Nakshatra Row ── */}
      <View className="flex-row">
        <LunarCycleCard />
        <NakshatraCard />
      </View>

      {/* ── Oracle Reading ── */}
      <OracleCard onGenerate={() => console.log("Generate oracle")} />
    </View>
  );
}
