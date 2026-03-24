import { Dimensions, Text, View } from "react-native";
import { DayArc, LunarRing, MoonSVG, NakshatraWheel } from "./charts";
import OracleSection from "./OracleSection";
import { C, PD } from "./panchangData";
import { CardContainer, Chip, SectionLabel } from "./ui";

const { width: SW } = Dimensions.get("window");

export default function EnergyTab() {
  const arcWidth = SW - 72;

  return (
    <View>
      {/* ── Moon hero card ── */}
      <View className="bg-surface dark:bg-surface-dark rounded-[18px] p-4 mb-3 border border-white/[0.08]">
        {/* Festival chips */}
        <View className="flex-col justify-between items-start mb-2.5 flex-wrap gap-[5px]">
          <View className="flex-row gap-[5px] flex-wrap">
            {PD.festivals.slice(0, 2).map((f) => (
              <Chip key={f} text={`🎉 ${f}`} variant="gold" />
            ))}
          </View>
          <Chip text="Shukla Paksha" />
        </View>

        {/* Moon phase + info */}
        <View className="flex-row items-center gap-3 mb-3">
          <MoonSVG size={60} />
          <View>
            <Text className="font-headingBold text-3xl text-text-primary dark:text-text-primary-dark leading-[28px]">
              {PD.moon_phase}
            </Text>
            <Text className="font-ui text-[10.5px] text-text-secondary dark:text-text-secondary-dark mt-[1px]">
              {PD.moon_pct}% illuminated · Purnima tonight
            </Text>
          </View>
        </View>

        {/* Day arc */}
        <DayArc width={arcWidth} />
      </View>

      {/* ── Cosmic Positions ── */}
      <View className="mb-3.5">
        <SectionLabel>Cosmic Positions · Live Artifacts</SectionLabel>
        <View className="flex-row gap-[9px]">
          {/* Lunar Cycle */}
          <CardContainer className="flex-1 p-[11px] items-center bg-surface dark:bg-surface-dark">
            <SectionLabel>Lunar Cycle</SectionLabel>
            <LunarRing size={128} />
            <View className="mt-[7px] self-start gap-1">
              {[
                { c: "rgba(200,148,58,0.7)", l: "Waxing" },
                { c: "rgba(180,180,200,0.5)", l: "Waning" },
                { c: C.gold, l: "Today (Day 14)" },
              ].map((lg) => (
                <View key={lg.l} className="flex-row items-center gap-1">
                  <View
                    className="w-[7px] h-[7px] rounded-[2px]"
                    style={{ backgroundColor: lg.c }}
                  />
                  <Text className="font-ui text-[9px] text-text-secondary dark:text-text-secondary-dark">
                    {lg.l}
                  </Text>
                </View>
              ))}
            </View>
          </CardContainer>

          {/* Nakshatra Wheel */}
          <CardContainer className="flex-1 p-[11px] items-center bg-surface dark:bg-surface-dark">
            <SectionLabel>Nakshatra Wheel</SectionLabel>
            <NakshatraWheel size={128} />
            <View className="mt-1.5 items-center">
              <Text className="font-heading text-[12px] text-text-primary dark:text-text-primary-dark">
                Uttara Phalguni
              </Text>
              <Text className="font-ui text-[8.5px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
                Deity: Aryaman · 12 of 27
              </Text>
              <Text className="font-ui text-[8.5px] text-text-secondary dark:text-text-secondary-dark mt-[1px]">
                Enduring contracts & alliances
              </Text>
            </View>
          </CardContainer>
        </View>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-white/[0.08] my-1" />

      {/* ── Oracle ── */}
      <OracleSection />
    </View>
  );
}