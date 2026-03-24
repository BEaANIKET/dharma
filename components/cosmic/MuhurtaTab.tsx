import { Dimensions, Text, View } from "react-native";
import { PD } from "./panchangData";
import {
  AccordionItem,
  CardContainer,
  SectionLabel,
  TimingRow,
} from "./ui";

const { width: SW } = Dimensions.get("window");

/* ── Key Window Card ── */
function KeyWindowCard({
  icon,
  label,
  title,
  time,
  variant,
}: {
  icon: string;
  label: string;
  title: string;
  time: string;
  variant: "gold" | "error" | "goldBright";
}) {
  const variantStyles = {
    gold: {
      container: "bg-highlight/[0.12] border-highlight/25",
      label: "text-highlight",
    },
    goldBright: {
      container: "bg-highlight-dark/[0.07] border-highlight-dark/[0.18]",
      label: "text-highlight-dark/[0.85]",
    },
    error: {
      container: "bg-error-dark/[0.11] border-error-dark/[0.22]",
      label: "text-error-dark",
    },
  };

  const s = variantStyles[variant];

  return (
    <View className={`w-[48%] border rounded-xl p-3 ${s.container}`}>
      <View className="flex-row items-center gap-1 mb-[5px]">
        <Text className="text-[12px]">{icon}</Text>
        <Text
          className={`font-uiSemiBold text-[7px] tracking-[0.8px] uppercase opacity-75 ${s.label}`}
        >
          {label}
        </Text>
      </View>
      <Text className="font-heading text-[14px] text-text-primary-dark mb-0.5">
        {title}
      </Text>
      <Text className="font-uiMedium text-[10px] text-white/30">{time}</Text>
    </View>
  );
}

export default function MuhurtaTab() {
  const glanceWidth = SW - 66;

  return (
    <View>
      {/* ── Muhurta Clock ── */}
      {/* <CardContainer className="p-3.5 mb-[11px]">
        <SectionLabel>Muhurta Clock · 24-Hour</SectionLabel>
        <View className="flex-row items-center gap-[13px]">
          <MuhurtaClock size={148} />
          <View className="flex-1">
            <Text className="font-heading text-[16px] text-text-primary-dark mb-[9px] leading-[19px]">
              Quality of time through the day
            </Text>
            <View className="gap-[5px]">
              {[
                { c: "rgba(200,148,58,0.8)", l: "Auspicious" },
                { c: "rgba(58,154,110,0.8)", l: "Nectar / Victory" },
                { c: "rgba(184,82,82,0.7)", l: "Inauspicious" },
                { c: "rgba(255,255,255,0.5)", l: "Now (dashed)", dashed: true },
              ].map((s) => (
                <View
                  key={s.l}
                  className="flex-row items-center gap-[5px]"
                >
                  <View
                    className="w-[9px] rounded-[2px]"
                    style={{
                      height: s.dashed ? 2 : 9,
                      backgroundColor: s.c,
                    }}
                  />
                  <Text className="font-ui text-[9.5px] text-white/30">
                    {s.l}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </CardContainer> */}

      {/* ── Day at a Glance ── */}
      {/* <CardContainer className="p-[13px] mb-[11px]">
        <SectionLabel>Day at a Glance</SectionLabel>
        <DayGlance width={glanceWidth} />
        <View className="flex-row gap-[9px] flex-wrap mt-1.5">
          {[
            { c: "rgba(200,148,58,0.7)", l: "Auspicious" },
            { c: "rgba(58,154,110,0.7)", l: "Nectar" },
            { c: "rgba(184,82,82,0.7)", l: "Avoid" },
            { c: "rgba(255,255,255,0.5)", l: "Now" },
          ].map((lg) => (
            <View key={lg.l} className="flex-row items-center gap-1">
              <View
                className="w-[9px] h-[7px] rounded-[2px]"
                style={{ backgroundColor: lg.c }}
              />
              <Text className="font-ui text-[8.5px] text-white/30">
                {lg.l}
              </Text>
            </View>
          ))}
        </View>
      </CardContainer> */}

      {/* ── Key Windows ── */}
      <View className="mb-3">
        <SectionLabel>Key Windows</SectionLabel>
        <View className="flex-row flex-wrap gap-[7px]">
          <KeyWindowCard
            icon="✦"
            label="NECTAR WINDOW"
            title="Amrit Kalam"
            time="08:48–10:28 AM"
            variant="gold"
          />
          <KeyWindowCard
            icon="🌟"
            label="RARE ALL-PURPOSE"
            title="Sarvartha Siddhi"
            time="4:17 PM →"
            variant="gold"
          />
          <KeyWindowCard
            icon="⚠️"
            label="AVOID VENTURES"
            title="Rahu Kalam"
            time="12:42–2:15 PM"
            variant="error"
          />
          <KeyWindowCard
            icon="☀️"
            label="SOLAR VITALITY"
            title="Ravi Yoga"
            time="All morning"
            variant="goldBright"
          />
        </View>
      </View>

      {/* ── Auspicious Timings ── */}
      <CardContainer className="px-[13px] mb-2.5">
        <AccordionItem
          icon="⏰"
          title="Auspicious Timings"
          sub={`${PD.auspicious.length} windows today`}
          defaultOpen
        >
          {PD.auspicious.map((a, i) => (
            <TimingRow
              key={i}
              item={a}
              isLast={i === PD.auspicious.length - 1}
            />
          ))}
        </AccordionItem>
      </CardContainer>

      {/* ── Inauspicious Timings ── */}
      <CardContainer className="px-[13px]">
        <AccordionItem
          icon="⚠️"
          title="Inauspicious Timings"
          sub="Avoid these windows"
        >
          {PD.inauspicious.map((a, i) => (
            <TimingRow
              key={i}
              item={a}
              isLast={i === PD.inauspicious.length - 1}
            />
          ))}
        </AccordionItem>
      </CardContainer>
    </View>
  );
}
