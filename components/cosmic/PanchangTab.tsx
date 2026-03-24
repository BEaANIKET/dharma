import { Text, View } from "react-native";
import { PD } from "./panchangData";
import {
  AccordionItem,
  CardContainer,
  Chip,
  PanchangCell,
  SectionLabel,
} from "./ui";

export default function PanchangTab() {
  return (
    <View>
      {/* ── Sun & Moon card ── */}
      <View className="bg-surface dark:bg-surface-dark border border-highlight-dark/[0.14] rounded-[15px] p-[15px] mb-[11px]">
        <SectionLabel variant="gold">
          Sun & Moon · {PD.location}
        </SectionLabel>

        <View className="flex-row flex-wrap gap-[11px] mb-[11px]">
          {[
            { icon: "🌅", l: "Sunrise", v: PD.sunrise },
            { icon: "🌇", l: "Sunset", v: PD.sunset },
            { icon: "🌕", l: "Moonrise", v: PD.moonrise },
            { icon: "🌑", l: "Moonset", v: PD.moonset },
          ].map((s) => (
            <View
              key={s.l}
              className="flex-row items-center gap-[9px] w-[45%]"
            >
              <Text className="text-[18px]">{s.icon}</Text>
              <View>
                <Text className="font-ui text-[8px] tracking-[0.8px] uppercase text-highlight-dark/[0.42]">
                  {s.l}
                </Text>
                <Text className="font-uiSemiBold text-[13.5px] text-highlight-dark/90">
                  {s.v}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="flex-row gap-3.5 pt-[9px] border-t border-highlight-dark/10">
          {[
            ["Daylight", PD.dinamana],
            ["Night", PD.ratrimana],
            ["Midday", PD.madhyahna],
          ].map(([l, v]) => (
            <View key={l}>
              <Text className="font-ui text-[7.5px] text-white/25 uppercase tracking-[0.6px]">
                {l}
              </Text>
              <Text className="font-uiMedium text-[11.5px] text-secondary-dark">
                {v}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Five Limbs ── */}
      <SectionLabel>Five Limbs · Pancha Anga</SectionLabel>
      <View className="flex-row gap-[7px] mb-[7px]">
        <View className="flex-1">
          <PanchangCell
            label="Tithi"
            value={PD.tithi}
            sub={`${PD.tithi_end} → ${PD.tithi_next}`}
            gold
          />
        </View>
        <View className="flex-1">
          <PanchangCell
            label="Nakshatra"
            value={PD.nakshatra}
            sub={`${PD.nakshatra_end} → ${PD.nakshatra_next}`}
          />
        </View>
      </View>
      <View className="flex-row gap-[7px] mb-[11px]">
        <View className="flex-1">
          <PanchangCell
            label="Yoga"
            value={PD.yoga}
            sub={`${PD.yoga_end} → ${PD.yoga_next}`}
          />
        </View>
        <View className="flex-1">
          <PanchangCell
            label="Karana"
            value={PD.karana}
            sub={`${PD.karana_end} → ${PD.karana_next}`}
          />
        </View>
        <View className="flex-1">
          <PanchangCell label="Vara" value="Budhawara" sub="Wednesday" />
        </View>
      </View>

      {/* ── Lunar Month & Samvat ── */}
      <CardContainer className="px-3.5 mb-2.5">
        <AccordionItem
          icon="🗓"
          title="Lunar Month & Samvat"
          sub="Vikram · Shaka · Gujarati"
          defaultOpen
        >
          <View className="gap-1.5">
            {(
              [
                ["Vikram Samvat", PD.vikram],
                ["Samvatsara", PD.samvatsara],
                ["Shaka Samvat", PD.shaka],
                ["Gujarati Samvat", PD.gujarati],
                ["Chandramasa", PD.chandramasa],
                ["Gate/Pravishte", PD.gate],
                ["Ritu", PD.ritu],
                ["Ayana", PD.ayana],
              ] as [string, string][]
            ).map(([k, v]) => (
              <View
                key={k}
                className="flex-row justify-between gap-2"
              >
                <Text className="font-ui text-[11px] text-white/30">
                  {k}
                </Text>
                <Text className="font-uiMedium text-[11px] text-secondary-dark text-right shrink">
                  {v}
                </Text>
              </View>
            ))}
          </View>
        </AccordionItem>
      </CardContainer>

      {/* ── Rashi & Nakshatra ── */}
      <CardContainer className="px-3.5 mb-2.5">
        <AccordionItem
          icon="⭐"
          title="Rashi & Nakshatra"
          sub="Moon · Sun · Surya Nakshatra"
        >
          <View className="flex-row flex-wrap gap-[7px]">
            {[
              { l: "Moon Sign", v: PD.moonsign },
              { l: "Sun Sign", v: PD.sunsign },
              { l: "Surya Nakshatra", v: PD.surya_nak },
              { l: "Nakshatra Pada", v: "U. Phalguni → Hasta" },
            ].map((c) => (
              <View key={c.l} className="w-[47%]">
                <PanchangCell label={c.l} value={c.v} />
              </View>
            ))}
          </View>
        </AccordionItem>
      </CardContainer>

      {/* ── Festivals & Events ── */}
      <View className="mb-2.5">
        <SectionLabel>Festivals & Events</SectionLabel>
        <View className="flex-row flex-wrap gap-1.5 mb-[7px]">
          {PD.festivals.map((f) => (
            <Chip key={f} text={`🎉 ${f}`} variant="gold" />
          ))}
        </View>
        <View className="flex-row flex-wrap gap-1.5">
          {PD.events.map((e) => (
            <Chip key={e} text={`✦ ${e}`} variant="teal" />
          ))}
        </View>
      </View>
    </View>
  );
}
