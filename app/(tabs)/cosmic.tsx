import EnergyTab from "@/components/cosmic/EnergyTab";
import MuhurtaTab from "@/components/cosmic/MuhurtaTab";
import PanchangTab from "@/components/cosmic/PanchangTab";
import GradientBackground from "@/components/GradientBackground";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SUB_TABS = [
  { key: "energy", label: "Energy", icon: "🌕" },
  { key: "panchang", label: "Panchang", icon: "📅" },
  { key: "muhurta", label: "Muhurta", icon: "⏰" },
] as const;

type SubTab = (typeof SUB_TABS)[number]["key"];

export default function Cosmic() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<SubTab>("energy");

  return (
    <GradientBackground>
      <View className="flex-1">
        {/* ── Sub-tabs ── */}
        <View className="flex-row px-3.5 pt-[7px] gap-0.5 border-b border-white/[0.08]">
          {SUB_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 py-1.5 pb-2 items-center gap-0.5 border-b-[2.5px] ${
                  isActive ? "border-highlight" : "border-transparent"
                }`}
              >
                <Text className="text-[13px]">{tab.icon}</Text>
                <Text
                  className={`text-[9.5px] ${
                    isActive
                      ? "font-uiSemiBold text-highlight"
                      : "font-ui text-white/30"
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── Content ── */}
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: insets.bottom + 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "energy" && <EnergyTab />}
          {activeTab === "panchang" && <PanchangTab />}
          {activeTab === "muhurta" && <MuhurtaTab />}
        </ScrollView>
      </View>
    </GradientBackground>
  );
}
