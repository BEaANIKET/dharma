import { Dimensions, Text, View } from "react-native";
import { DayGlance, MuhurtaClock } from "@/components/cosmic/charts";
import { CardContainer, SectionLabel } from "@/components/cosmic/ui";

const { width: SW } = Dimensions.get("window");

export default function CardCaution() {
  const glanceWidth = SW - 68;

  return (
    <View className="px-5 pb-4">
      {/* Dead Zone Hero */}
      <View className="bg-error-dark/[0.11] border border-error-dark/[0.22] rounded-2xl p-4 mb-3">
        <View className="flex-row items-center gap-3 mb-3">
          <View className="w-11 h-11 rounded-xl bg-error-dark/[0.2] items-center justify-center">
            <Text className="text-[20px]">⚠️</Text>
          </View>
          <View>
            <Text className="font-heading text-[22px] text-error-dark leading-[24px] mb-0.5">
              Dead Zone
            </Text>
            <Text className="font-ui text-[10.5px] text-error-dark/70">
              1 hour 33 minutes today
            </Text>
          </View>
        </View>

        {/* Time range */}
        <View
          className="flex-row items-center justify-between rounded-[10px] p-3 mb-3"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <View className="items-center">
            <Text className="font-ui text-[8px] tracking-[0.8px] uppercase text-error-dark/55 mb-0.5">
              Begins
            </Text>
            <Text className="font-uiSemiBold text-[20px] text-error-dark">
              12:42
            </Text>
          </View>
          <View className="flex-1 h-[2px] bg-error-dark/40 mx-3 rounded-sm" />
          <View className="items-center">
            <Text className="font-ui text-[8px] tracking-[0.8px] uppercase text-error-dark/55 mb-0.5">
              Ends
            </Text>
            <Text className="font-uiSemiBold text-[20px] text-error-dark">
              2:15
            </Text>
          </View>
        </View>

        <Text className="font-ui text-[12.5px] text-error-dark/75 leading-[20px]">
          Rahu Kalam — Wednesday's inauspicious window governed by the shadow
          planet. Not superstition — it's structure. Work around it.
        </Text>
      </View>

      {/* Day Glance */}
      <CardContainer className="p-3 mb-3">
        <SectionLabel>Day at a Glance</SectionLabel>
        <DayGlance width={glanceWidth} />
        <View className="flex-row gap-2.5 flex-wrap mt-1.5">
          {[
            { c: "rgba(200,148,58,0.7)", l: "Auspicious" },
            { c: "rgba(58,154,110,0.7)", l: "Nectar" },
            { c: "rgba(184,82,82,0.7)", l: "Avoid" },
            { c: "rgba(255,255,255,0.5)", l: "Now" },
          ].map((lg) => (
            <View key={lg.l} className="flex-row items-center gap-1">
              <View
                className="w-[8px] rounded-[2px]"
                style={{
                  height: lg.l === "Now" ? 2 : 8,
                  backgroundColor: lg.c,
                }}
              />
              <Text className="font-ui text-[8.5px] text-white/30">
                {lg.l}
              </Text>
            </View>
          ))}
        </View>
      </CardContainer>

      {/* Muhurta Clock */}
      <CardContainer className="p-3">
        <SectionLabel>Muhurta Clock</SectionLabel>
        <View className="flex-row items-center gap-3">
          <MuhurtaClock size={148} />
          <View className="flex-1">
            <Text className="font-heading text-[16px] text-text-primary dark:text-text-primary-dark mb-2.5 leading-[19px]">
              Quality of time{"\n"}through the day
            </Text>
            <View className="gap-1.5">
              {[
                { c: "rgba(200,148,58,0.8)", l: "Auspicious" },
                { c: "rgba(58,154,110,0.8)", l: "Nectar / Victory" },
                { c: "rgba(184,82,82,0.7)", l: "Inauspicious" },
              ].map((s) => (
                <View key={s.l} className="flex-row items-center gap-1.5">
                  <View
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ backgroundColor: s.c }}
                  />
                  <Text className="font-ui text-[9.5px] text-white/30">
                    {s.l}
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
