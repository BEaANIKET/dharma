import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SectionLabel } from "@/components/cosmic/ui";

export default function CardMoment() {
  const [revealed, setRevealed] = useState(false);

  return (
    <View className="px-5 pb-4">
      {/* Hero */}
      <View className="items-center mb-5">
        <View className="w-[68px] h-[68px] rounded-[20px] bg-highlight/[0.12] border border-highlight/[0.28] items-center justify-center mb-3.5">
          <Text className="text-[30px]">🌟</Text>
        </View>
        <Text className="font-heading text-[24px] text-text-primary dark:text-text-primary-dark text-center leading-[30px] mb-1.5">
          Something rare happens{"\n"}at 4:17 PM today
        </Text>
        <Text className="font-ui text-[11.5px] text-text-secondary dark:text-text-secondary-dark">
          It holds until tomorrow's sunrise
        </Text>
      </View>

      {!revealed ? (
        <Pressable
          onPress={() => setRevealed(true)}
          className="p-4 rounded-[14px] border border-highlight/[0.38] bg-highlight/[0.1] mb-4 active:opacity-70"
        >
          <Text className="font-uiSemiBold text-[13.5px] text-highlight text-center">
            Reveal what it means →
          </Text>
        </Pressable>
      ) : (
        <View>
          {/* What it is */}
          <View className="bg-highlight/[0.07] border border-highlight/[0.22] rounded-[14px] p-4 mb-3">
            <Text className="font-heading text-[19px] text-highlight mb-2">
              Sarvartha Siddhi Yoga
            </Text>
            <Text className="font-ui text-[12.5px] text-text-secondary dark:text-text-secondary-dark leading-[21px]">
              "That which accomplishes all purposes." This yoga activates when
              day, nakshatra, and yoga align in a rare configuration. It holds
              from 4:17 PM through sunrise — 14 hours of elevated karmic
              potency.
            </Text>
          </View>

          {/* How to use */}
          <View className="bg-dharma-teal/[0.08] border border-dharma-teal/[0.22] rounded-xl p-3 mb-3">
            <SectionLabel variant="teal">HOW TO USE IT</SectionLabel>
            <Text className="font-ui text-[12.5px] text-text-secondary dark:text-text-secondary-dark leading-[20px]">
              Set one clear intention at exactly 4:17 PM. Write it. Or speak it
              at moonrise (6:25 PM) when the near-full moon rises at
              near-sunset — the most charged moment of the month.
            </Text>
          </View>

          {/* Timing cards */}
          <View className="flex-row gap-2">
            <View className="flex-1 bg-white/[0.055] border border-white/[0.09] rounded-[11px] p-2.5">
              <SectionLabel>Activates</SectionLabel>
              <Text className="font-heading text-[17px] text-highlight">
                4:17 PM
              </Text>
            </View>
            <View className="flex-1 bg-white/[0.055] border border-white/[0.09] rounded-[11px] p-2.5">
              <SectionLabel>Holds until</SectionLabel>
              <Text className="font-heading text-[17px] text-text-primary dark:text-text-primary-dark">
                Sunrise
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
