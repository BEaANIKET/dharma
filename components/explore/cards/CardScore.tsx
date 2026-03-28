import { Text, View } from "react-native";
import { CosmicGauge, LunarRing } from "@/components/cosmic/charts";
import { C } from "@/components/cosmic/panchangData";
import { CardContainer, SectionLabel } from "@/components/cosmic/ui";
import { AUSP } from "../data";

export default function CardScore() {
  return (
    <View className="px-5 pb-4">
      <Text className="font-ui text-[11.5px] text-text-secondary dark:text-text-secondary-dark mb-3 leading-[18px]">
        The Panchang evaluates every day across four dimensions. Today's
        alignment is exceptional — driven by a near-Purnima Tithi and a rare
        afternoon yoga.
      </Text>

      {/* Gauge Card */}
      <CardContainer className="p-4 mb-3">
        <SectionLabel>Today's Auspiciousness</SectionLabel>
        <View className="flex-row items-center gap-3">
          <CosmicGauge score={AUSP.overall} />
          <View className="flex-1">
            <Text className="font-heading text-[16px] text-text-primary dark:text-text-primary-dark mb-2.5 leading-[19px]">
              Today's auspiciousness
            </Text>
            <View className="gap-1.5">
              {AUSP.scores.map((s) => (
                <View key={s.label} className="flex-row items-center gap-2">
                  <Text className="font-ui text-[9.5px] text-text-secondary dark:text-text-secondary-dark w-14">
                    {s.label}
                  </Text>
                  <View className="flex-1 h-[3px] rounded-sm bg-white/[0.07] overflow-hidden">
                    <View
                      className="h-full rounded-sm"
                      style={{
                        width: `${(s.value / 10) * 100}%`,
                        backgroundColor: s.color,
                      }}
                    />
                  </View>
                  <Text className="font-ui text-[9.5px] text-text-secondary dark:text-text-secondary-dark w-3">
                    {s.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </CardContainer>

      {/* Score Insight */}
      <View className="bg-highlight/[0.06] border border-highlight/[0.14] rounded-xl p-3 mb-3">
        <Text className="font-ui text-[12.5px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
          <Text className="font-uiMedium text-highlight">
            8.4 is exceptional.{" "}
          </Text>
          Sarvartha Siddhi Yoga — activating at 4:17 PM — is the primary
          driver. One of the few yogas that turns an already-strong day into a
          rare window.
        </Text>
      </View>

      {/* Lunar Ring */}
      <SectionLabel>Lunar Cycle · Day 14 of 30</SectionLabel>
      <CardContainer className="p-3">
        <View className="flex-row items-center gap-3">
          <LunarRing size={128} />
          <View className="flex-1">
            <Text className="font-heading text-[17px] text-text-primary dark:text-text-primary-dark leading-[19px] mb-1">
              Lunar Day 14
            </Text>
            <Text className="font-ui text-[10.5px] text-text-secondary dark:text-text-secondary-dark mb-2.5">
              Purnima in ~18h · Peak tonight
            </Text>
            <View className="gap-1.5">
              {[
                { c: "rgba(200,148,58,0.7)", l: "Waxing (1–14)" },
                { c: "rgba(180,180,200,0.5)", l: "Waning (15–30)" },
                { c: C.gold, l: "Today" },
              ].map((lg) => (
                <View key={lg.l} className="flex-row items-center gap-1.5">
                  <View
                    className="w-[8px] h-[8px] rounded-[2px]"
                    style={{ backgroundColor: lg.c }}
                  />
                  <Text className="font-ui text-[9.5px] text-text-secondary dark:text-text-secondary-dark">
                    {lg.l}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </CardContainer>
    </View>
  );
}
