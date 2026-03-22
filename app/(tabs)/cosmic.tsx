import EnergyTab from "@/components/cosmic/EnergyTab";
import GradientBackground from "@/components/GradientBackground";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SUB_TABS = [
  { key: "energy", label: "Energy", icon: "🔴" },
  { key: "panchang", label: "Panchang", icon: "📅" },
  { key: "muhurta", label: "Muhurta", icon: "⏱️" },
] as const;

type SubTab = (typeof SUB_TABS)[number]["key"];

export default function Cosmic() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<SubTab>("energy");

  return (
    <GradientBackground>
      <View className="flex-1">
        {/* ── Sub-tabs ── */}
        <View className="px-5 pb-4 pt-3">
          <View className="flex-row justify-between">
            {SUB_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  className="items-center"
                >
                  <View
                    className={`h-[42px] w-[42px] items-center justify-center rounded-full ${
                      isActive
                        ? "bg-accent-primary-dark/20"
                        : "bg-surface dark:bg-surface-dark"
                    }`}
                  >
                    <Text className="text-lg">{tab.icon}</Text>
                  </View>
                  <Text
                    className={`mt-1.5 text-xs font-ui ${
                      isActive
                        ? "text-highlight dark:text-highlight-dark"
                        : "text-primary dark:text-text-primary-dark"
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {isActive && (
                    <View className="mt-1 h-0.5 w-6 rounded-full bg-accent-primary dark:bg-accent-primary-dark" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ── Divider ── */}
        <View className="h-px bg-border dark:bg-border-dark" />

        {/* ── Content ── */}
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingTop: 20, paddingBottom: insets.bottom + 30 }}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "energy" && <EnergyTab />}

          {activeTab !== "energy" && (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-lg font-ui text-text-secondary dark:text-text-secondary-dark">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} — coming soon
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </GradientBackground>
  );
}
