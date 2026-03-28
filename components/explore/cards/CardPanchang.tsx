import { Text, View } from "react-native";
import { NakshatraWheel } from "@/components/cosmic/charts";
import { PD } from "@/components/cosmic/panchangData";
import {
  AccordionItem,
  CardContainer,
  PanchangCell,
  SectionLabel,
  TimingRow,
} from "@/components/cosmic/ui";

export default function CardPanchang() {
  return (
    <View className="px-5 pb-4">
      <Text className="font-ui text-[11.5px] text-text-secondary dark:text-text-secondary-dark mb-3 leading-[18px]">
        Five dimensions — one day. The Panchang is an ancient system for reading
        the quality of time itself.
      </Text>

      {/* Five Limbs — top row */}
      <View className="flex-row gap-2 mb-2">
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
            value="U. Phalguni"
            sub={`${PD.nakshatra_end} → ${PD.nakshatra_next}`}
          />
        </View>
      </View>
      {/* Five Limbs — bottom row */}
      <View className="flex-row gap-2 mb-3">
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
          <PanchangCell label="Vara" value="Budha" sub="Wednesday" />
        </View>
      </View>

      {/* Positions grid */}
      <View className="flex-row flex-wrap gap-2 mb-3">
        {[
          { l: "Moon Sign", v: PD.moonsign, s: "Kanya" },
          { l: "Sun Sign", v: PD.sunsign, s: "Meena" },
          { l: "Paksha", v: "Shukla", s: "Bright half" },
          { l: "Season", v: "Vasant", s: "Spring · Uttarayana" },
        ].map((c) => (
          <View key={c.l} className="w-[48%]">
            <PanchangCell label={c.l} value={c.v} sub={c.s} />
          </View>
        ))}
      </View>

      {/* Accordions */}
      <CardContainer className="px-3.5 mb-2.5">
        <AccordionItem
          icon="⭐"
          title="Nakshatra Wheel"
          sub="All 27 lunar mansions"
        >
          <View className="flex-row items-center gap-3 pt-2">
            <NakshatraWheel size={128} />
            <View className="flex-1">
              <Text className="font-heading text-[16px] text-text-primary dark:text-text-primary-dark mb-1">
                Uttara Phalguni
              </Text>
              <Text className="font-ui text-[10px] text-text-secondary dark:text-text-secondary-dark mb-2">
                Nakshatra 12 of 27{"\n"}→ Hasta at 04:17 PM
              </Text>
              <View className="bg-highlight/[0.14] border border-highlight/[0.22] rounded-lg px-2 py-1 self-start mb-1.5">
                <Text className="font-ui text-[9px] text-highlight">
                  Deity: Aryaman
                </Text>
              </View>
              <Text className="font-ui text-[9.5px] text-text-secondary dark:text-text-secondary-dark leading-[15px]">
                Rules enduring contracts & alliances
              </Text>
            </View>
          </View>
        </AccordionItem>

        <AccordionItem
          icon="🗓"
          title="Calendar & Samvat"
          sub="Vedic year system"
        >
          <View className="gap-1.5">
            {(
              [
                ["Vikram Samvat", PD.vikram],
                ["Shaka Samvat", PD.shaka],
                ["Chandramasa", PD.chandramasa],
                ["Madhyahna", PD.madhyahna],
                ["Dinamana", PD.dinamana],
                ["Moon Sign", PD.moonsign],
                ["Sun Sign", PD.sunsign],
                ["Surya Nakshatra", PD.surya_nak],
              ] as [string, string][]
            ).map(([k, v]) => (
              <View key={k} className="flex-row justify-between">
                <Text className="font-ui text-[11px] text-white/30">{k}</Text>
                <Text className="font-uiMedium text-[11px] text-secondary-dark">
                  {v}
                </Text>
              </View>
            ))}
          </View>
        </AccordionItem>

        <AccordionItem
          icon="👑"
          title="Mantri Mandala"
          sub="Planetary cabinet"
        >
          <View className="gap-1.5">
            {(
              [
                ["Raja (King)", "Guru (Jupiter) 👑"],
                ["Mantri (Minister)", "Mangal (Mars) ⚜️"],
                ["Dhanadhipati", "Guru (Jupiter) 💰"],
                ["Senadhipati", "Chandra (Moon) ⚔️"],
              ] as [string, string][]
            ).map(([k, v]) => (
              <View key={k} className="flex-row justify-between">
                <Text className="font-ui text-[11px] text-white/30">{k}</Text>
                <Text className="font-ui text-[11px] text-highlight">{v}</Text>
              </View>
            ))}
          </View>
        </AccordionItem>

        <AccordionItem icon="✦" title="All Auspicious Timings">
          {PD.auspicious.map((a, i) => (
            <TimingRow
              key={i}
              item={a}
              isLast={i === PD.auspicious.length - 1}
            />
          ))}
        </AccordionItem>

        <AccordionItem icon="⚠️" title="All Inauspicious Timings">
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
