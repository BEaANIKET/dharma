import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { DirCompass } from "@/components/cosmic/charts";
import { CardContainer, SectionLabel } from "@/components/cosmic/ui";
import { AI } from "../data";

export default function CardGuide() {
  const [tab, setTab] = useState<"do" | "dont">("do");
  const isBad = tab === "dont";
  const items = isBad ? AI.dont : AI.do;

  return (
    <View className="px-5 pb-4">
      {/* Toggle */}
      <View className="flex-row bg-white/[0.04] rounded-[11px] p-[3px] mb-4">
        {(["do", "dont"] as const).map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              className={`flex-1 py-2 rounded-[9px] items-center border ${
                active
                  ? t === "do"
                    ? "bg-dharma-teal/[0.18] border-dharma-teal/30"
                    : "bg-error-dark/[0.18] border-error-dark/30"
                  : "bg-transparent border-transparent"
              }`}
            >
              <Text
                className={`font-uiSemiBold text-[11.5px] ${
                  active
                    ? t === "do"
                      ? "text-dharma-teal"
                      : "text-error-dark"
                    : "text-white/30"
                }`}
              >
                {t === "do" ? "✦ Do today" : "⚠ Avoid today"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Items */}
      <View className="gap-2 mb-4">
        {items.map((d, i) => (
          <View
            key={i}
            className={`p-2.5 rounded-xl border ${
              isBad
                ? "bg-error-dark/[0.11] border-error-dark/[0.15]"
                : "bg-dharma-teal/[0.08] border-dharma-teal/[0.15]"
            }`}
          >
            <Text className="font-ui text-[12.5px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
              {d}
            </Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View className="h-px bg-white/[0.07] mb-3" />

      {/* Colors + Direction */}
      <View className="flex-row gap-2.5 mb-3">
        <View className="flex-1 bg-dharma-teal/[0.08] border border-dharma-teal/[0.2] rounded-xl p-2.5">
          <SectionLabel variant="teal">WEAR TODAY</SectionLabel>
          <View
            className="w-[38px] h-[38px] rounded-[9px] mb-2"
            style={{ backgroundColor: AI.color_wear }}
          />
          <Text className="font-heading text-[14px] text-text-primary dark:text-text-primary-dark mb-0.5">
            {AI.color_name}
          </Text>
          <Text className="font-ui text-[9px] text-text-secondary dark:text-text-secondary-dark leading-[13px]">
            {AI.color_why}
          </Text>
        </View>
        <View className="flex-1 bg-white/[0.055] border border-white/[0.09] rounded-xl p-2.5 items-center">
          <SectionLabel>Direction</SectionLabel>
          <DirCompass size={110} />
        </View>
      </View>

      {/* Spiritual */}
      <View className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 mb-2.5">
        <Text className="font-headingItalic text-[14px] text-text-secondary dark:text-text-secondary-dark/70 leading-[22px]">
          {AI.spiritual}
        </Text>
      </View>

      {/* Food */}
      <CardContainer className="p-3">
        <SectionLabel>Food & Body</SectionLabel>
        <Text className="font-ui text-[12.5px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
          {AI.food}
        </Text>
      </CardContainer>
    </View>
  );
}
