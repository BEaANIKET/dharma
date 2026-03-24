import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { DirCompass } from "./charts";
import { OracleData } from "./panchangData";
import { CardContainer, SectionLabel } from "./ui";

export default function OracleSection() {
  const [ai, setAi] = useState<OracleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [guideTab, setGuideTab] = useState<"do" | "dont">("do");

  const items = guideTab === "do" ? ai?.do_today : ai?.avoid_today;
  const isBad = guideTab === "dont";

  const generate = async () => {
    setLoading(true);
    // TODO: integrate with API
    setTimeout(() => {
      setAi({
        do_today: [
          "Begin an important contract or agreement during Sarvartha Siddhi (after 4:17 PM)",
          "Practice gratitude meditation during Amrit Kalam (8:48–10:28 AM)",
          "Wear yellow or gold to honor Brihaspati and amplify Mercury's communicative energy",
          "Chant Vishnu Sahasranama during Brahma Muhurta for spiritual protection",
          "Make charitable donations of green items to align with Mercury's benevolence",
        ],
        avoid_today: [
          "Do not start new ventures during Rahu Kalam (12:42–2:15 PM)",
          "Avoid traveling North — Disha Shool is active in that direction",
          "Do not sign financial documents during Bhadra (active all day until 7:20 PM)",
          "Avoid consuming tamasic foods, especially after sunset",
          "Do not begin construction or renovation work today",
        ],
        color_wear: {
          hex: "#2D6A4F",
          name: "Forest Green",
          chakra: "Heart",
          reason: "Aligns with Mercury's energy for communication and healing",
        },
        color_avoid: {
          hex: "#7B1515",
          name: "Deep Red",
          reason: "Clashes with today's Shukla Paksha energy and Bhadra influence",
        },
        food_nourishing: ["Moong dal khichdi", "Fresh coconut water", "Tulsi tea", "Seasonal fruits"],
        food_avoid: ["Onion & garlic", "Leftover rice", "Heavy meats", "Stale food"],
        herb: {
          name: "Brahmi",
          benefit: "Enhances Mercury's intellectual gifts, calms the mind during Bhadra's unsettling energy.",
        },
        finance: "Avoid major transactions during Bhadra. After 4:17 PM Sarvartha Siddhi Yoga activates — ideal for investments and contracts.",
        health: "Focus on breathing exercises during Amrit Kalam. Mercury day supports nervous system healing — avoid screen strain.",
        spiritual: "Chant 'Om Budhaya Namaha' 108 times. Evening Purnima meditation under moonlight amplifies spiritual gains.",
        direction_favor: "East, South",
        direction_avoid: "North",
        direction_note: "Disha Shool points North today. Rahu occupies Southwest. East and South bring prosperity.",
      });
      setLoading(false);
    }, 1500);
  };

  /* ── Empty state ── */
  if (!ai && !loading) {
    return (
      <View className="bg-highlight/5 border border-highlight/25 rounded-[15px] p-5 items-center mb-3.5">
        <Text className="text-[26px] mb-2.5">✦</Text>
        <Text className="font-heading text-[20px] text-text-primary dark:text-text-primary-dark mb-[7px]">
          Oracle Reading
        </Text>
        <Text className="font-ui text-[11.5px] text-text-secondary dark:text-text-secondary-dark mb-4 leading-[19px] text-center">
          AI-powered daily guidance from today's Panchang — Do/Avoid, Colors,
          Food, Finance, Health, Spiritual & Direction.
        </Text>
        <Pressable
          onPress={generate}
          className="py-[11px] px-[26px] bg-highlight/15 border border-highlight/25 rounded-[11px]"
        >
          <Text className="font-uiSemiBold text-[13px] text-highlight">
            ✦ Generate Today's Oracle
          </Text>
        </Pressable>
      </View>
    );
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <CardContainer className="p-[26px] items-center mb-3.5 bg-surface dark:bg-surface-dark">
        <Text className="font-headingItalic text-[15px] text-text-secondary dark:text-text-secondary-dark leading-[26px] text-center">
          Reading the cosmic patterns...{"\n"}Consulting the Panchang oracle...
        </Text>
      </CardContainer>
    );
  }

  /* ── Oracle results ── */
  return (
    <View className="gap-[13px]">
      {/* Do / Avoid toggle */}
      <View>
        <View className="flex-row bg-white/[0.04] rounded-[10px] p-[3px] mb-[11px]">
          {(["do", "dont"] as const).map((t) => {
            const active = guideTab === t;
            const label = t === "do" ? "✦ Do Today" : "⚠ Avoid Today";
            return (
              <Pressable
                key={t}
                onPress={() => setGuideTab(t)}
                className={`flex-1 py-2 rounded-lg items-center border ${
                  active
                    ? t === "do"
                      ? "bg-dharma-teal/[0.18] border-dharma-teal/30"
                      : "bg-error-dark/[0.18] border-error-dark/30"
                    : "bg-transparent border-transparent"
                }`}
              >
                <Text
                  className={`font-uiSemiBold text-[11px] ${
                    active
                      ? t === "do"
                        ? "text-dharma-teal"
                        : "text-error-dark"
                      : "text-text-secondary dark:text-text-secondary-dark"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="gap-1.5">
          {items?.map((d, i) => (
            <View
              key={i}
              className={`p-3 border rounded-[11px] ${
                isBad
                  ? "bg-error-dark/[0.11] border-error-dark/[0.22]"
                  : "bg-dharma-teal/[0.11] border-dharma-teal/[0.22]"
              }`}
            >
              <Text className="font-ui text-[12px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
                {d}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Colors */}
      <View>
        <SectionLabel>Colors for Today</SectionLabel>
        <View className="flex-row gap-[9px]">
          <CardContainer variant="teal" className="flex-1 p-3 bg-surface dark:bg-surface-dark">
            <SectionLabel variant="teal">WEAR</SectionLabel>
            <View
              className="w-10 h-10 rounded-[10px] mb-2"
              style={{ backgroundColor: ai!.color_wear.hex }}
            />
            <Text className="font-heading text-[14px] text-text-primary dark:text-text-primary-dark mb-[3px]">
              {ai!.color_wear.name}
            </Text>
            {ai!.color_wear.chakra ? (
              <Text className="font-ui text-[9px] text-dharma-teal mb-[3px]">
                {ai!.color_wear.chakra} chakra
              </Text>
            ) : null}
            <Text className="font-ui text-[9px] text-text-secondary dark:text-text-secondary-dark leading-[13px]">
              {ai!.color_wear.reason}
            </Text>
          </CardContainer>

          <CardContainer variant="error" className="flex-1 p-3 bg-surface dark:bg-surface-dark">
            <SectionLabel variant="error">AVOID</SectionLabel>
            <View
              className="w-10 h-10 rounded-[10px] mb-2"
              style={{ backgroundColor: ai!.color_avoid.hex }}
            />
            <Text className="font-heading text-[14px] text-text-primary dark:text-text-primary-dark mb-[3px]">
              {ai!.color_avoid.name}
            </Text>
            <Text className="font-ui text-[9px] text-text-secondary dark:text-text-secondary-dark leading-[13px]">
              {ai!.color_avoid.reason}
            </Text>
          </CardContainer>
        </View>
      </View>

      {/* Food */}
      <View>
        <SectionLabel>Food & Body</SectionLabel>
        <View className="flex-row gap-[9px] mb-[9px]">
          <CardContainer variant="teal" className="flex-1 p-3 bg-surface dark:bg-surface-dark">
            <SectionLabel variant="teal">Nourishing</SectionLabel>
            {ai!.food_nourishing.map((f, i) => (
              <Text
                key={i}
                className="font-ui text-[11px] text-text-secondary dark:text-text-secondary-dark mb-1"
              >
                🌿 {f}
              </Text>
            ))}
          </CardContainer>

          <CardContainer variant="error" className="flex-1 p-3 bg-surface dark:bg-surface-dark">
            <SectionLabel variant="error">Best Avoided</SectionLabel>
            {ai!.food_avoid.map((f, i) => (
              <Text
                key={i}
                className="font-ui text-[11px] text-text-secondary dark:text-text-secondary-dark mb-1"
              >
                ⚡ {f}
              </Text>
            ))}
          </CardContainer>
        </View>

        {ai!.herb ? (
          <View className="bg-surface dark:bg-surface-dark border border-white/10 rounded-[11px] p-3">
            <Text className="font-uiSemiBold text-[10.5px] text-highlight mb-1">
              🌿 Herb of the Day: {ai!.herb.name}
            </Text>
            <Text className="font-ui text-[11px] text-text-secondary dark:text-text-secondary-dark leading-[18px] italic">
              {ai!.herb.benefit}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Life domains */}
      <View>
        <SectionLabel>Life Domains</SectionLabel>
        <CardContainer className="px-[13px] bg-surface dark:bg-surface-dark">
          {[
            { icon: "💰", label: "Finance", text: ai!.finance },
            { icon: "💊", label: "Health", text: ai!.health },
            { icon: "🕯️", label: "Spiritual", text: ai!.spiritual, last: true },
          ].map((s) => (
            <View
              key={s.label}
              className={`py-3 ${s.last ? "" : "border-b border-white/[0.08]"}`}
            >
              <View className="flex-row gap-[9px] items-start">
                <View className="w-[30px] h-[30px] rounded-lg bg-white/5 items-center justify-center">
                  <Text className="text-[13px]">{s.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-uiSemiBold text-[11px] text-text-primary dark:text-text-primary-dark mb-[3px]">
                    {s.label}
                  </Text>
                  <Text className="font-ui text-[12px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
                    {s.text}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </CardContainer>
      </View>

      {/* Direction */}
      <View>
        <SectionLabel>Direction Guide</SectionLabel>
        <CardContainer className="p-[13px] bg-surface dark:bg-surface-dark">
          <View className="flex-row items-center gap-[13px]">
            <DirCompass size={114} />
            <View className="flex-1">
              <View className="mb-[7px]">
                <Text className="font-uiSemiBold text-[9px] text-dharma-teal mb-0.5">
                  FAVOR
                </Text>
                <Text className="font-heading text-[15px] text-text-primary dark:text-text-primary-dark">
                  {ai!.direction_favor}
                </Text>
              </View>
              <View className="mb-[7px]">
                <Text className="font-uiSemiBold text-[9px] text-error-dark mb-0.5">
                  AVOID
                </Text>
                <Text className="font-heading text-[15px] text-text-primary dark:text-text-primary-dark">
                  {ai!.direction_avoid}
                </Text>
              </View>
              <Text className="font-ui text-[10px] text-text-secondary dark:text-text-secondary-dark leading-4">
                {ai!.direction_note}
              </Text>
            </View>
          </View>
        </CardContainer>
      </View>

      {/* Refresh */}
      <Pressable
        onPress={() => setAi(null)}
        className="py-[9px] bg-surface dark:bg-surface-dark border border-white/10 rounded-[11px] items-center"
      >
        <Text className="font-ui text-[11px] text-text-secondary dark:text-text-secondary-dark">
          ↺ Refresh Oracle Reading
        </Text>
      </Pressable>
    </View>
  );
}