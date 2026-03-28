import { Dimensions, Text, View } from "react-native";
import { DayArc, MoonSVG } from "@/components/cosmic/charts";
import { PD } from "@/components/cosmic/panchangData";
import { Chip, SectionLabel } from "@/components/cosmic/ui";
import { AI } from "../data";

const { width: SW } = Dimensions.get("window");

export default function CardVibe() {
  const arcWidth = SW - 72;

  return (
    <View className="px-5 pb-4">
      {/* Moon + Phase */}
      <View className="flex-row items-center gap-3.5 mb-4">
        <MoonSVG size={60} />
        <View className="flex-1">
          <Text className="font-headingBold text-[28px] text-text-primary dark:text-text-primary-dark leading-[28px]">
            {PD.moon_phase}
          </Text>
          <Text className="font-ui text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
            {PD.moon_pct}% · Purnima tonight
          </Text>
          <View className="mt-1.5 self-start">
            <Chip text="Chaitra Purnima Vrat" variant="gold" />
          </View>
        </View>
      </View>

      {/* Day Arc */}
      <View className="mb-5 -ml-0.5">
        <DayArc width={arcWidth} />
      </View>

      {/* Archetype Quote */}
      <View
        className="mb-4 pl-3.5"
        style={{ borderLeftWidth: 2, borderLeftColor: "rgba(200,148,58,0.4)" }}
      >
        <Text className="font-heading text-[22px] text-text-primary dark:text-text-primary-dark leading-[26px] mb-1.5">
          {AI.archetype}
        </Text>
        <Text className="font-ui text-[12.5px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
          {AI.vibe}
        </Text>
      </View>

      {/* Day Ruler + Paksha */}
      <View className="flex-row gap-2.5">
        <View className="flex-1 bg-highlight/[0.08] border border-highlight/[0.22] rounded-xl p-2.5">
          <SectionLabel variant="gold">Day Ruler</SectionLabel>
          <Text className="font-heading text-[17px] text-highlight dark:text-highlight-dark mb-0.5">
            {AI.planet}
          </Text>
          <Text className="font-ui text-[9.5px] text-highlight/55 leading-[15px]">
            {AI.gifts}
          </Text>
        </View>
        <View className="flex-1 bg-white/[0.055] border border-white/[0.09] rounded-xl p-2.5">
          <SectionLabel>Paksha</SectionLabel>
          <Text className="font-heading text-[17px] text-text-primary dark:text-text-primary-dark mb-0.5">
            Shukla
          </Text>
          <Text className="font-ui text-[9.5px] text-text-secondary dark:text-text-secondary-dark leading-[15px]">
            Bright half · Waxing
          </Text>
        </View>
      </View>
    </View>
  );
}
