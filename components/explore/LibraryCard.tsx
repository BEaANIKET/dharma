import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import type { LibraryCardData } from "./data";

interface LibraryCardProps {
  card: LibraryCardData;
  isOpen: boolean;
  onToggle: () => void;
}

export default function LibraryCard({ card, isOpen, onToggle }: LibraryCardProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        marginBottom: isOpen ? 8 : -44,
        zIndex: isOpen ? 5 : 1,
      }}
      className="active:opacity-80"
    >
      <LinearGradient
        colors={card.gradColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isOpen
            ? `${card.accent}30`
            : "rgba(255,255,255,0.07)",
          paddingVertical: 16,
          paddingHorizontal: 18,
        }}
      >
        {/* Header row */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5 flex-1">
            <Text className="text-[24px]">{card.icon}</Text>
            <View className="flex-1">
              <Text className="font-heading text-[19px] text-text-primary dark:text-text-primary-dark">
                {card.title}
              </Text>
              <Text
                className="font-ui text-[10.5px] mt-0.5"
                style={{ color: `${card.accent}88` }}
              >
                {card.sub}
              </Text>
            </View>
          </View>

          {/* Chevron */}
          <View
            className="w-6 h-6 rounded-full bg-white/[0.06] items-center justify-center"
            style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
          >
            <Ionicons
              name="chevron-down"
              size={12}
              color="rgba(255,255,255,0.35)"
            />
          </View>
        </View>

        {/* Expanded CTA */}
        {isOpen && (
          <View
            style={{
              marginTop: 14,
              borderTopWidth: 1,
              borderTopColor: `${card.accent}18`,
              paddingTop: 14,
            }}
          >
            <View
              style={{
                backgroundColor: `${card.accent}12`,
                borderWidth: 1,
                borderColor: `${card.accent}25`,
                borderRadius: 10,
                paddingVertical: 11,
                alignItems: "center",
              }}
            >
              <Text
                className="font-uiMedium text-[13px]"
                style={{ color: card.accent }}
              >
                Open {card.title} →
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
}
