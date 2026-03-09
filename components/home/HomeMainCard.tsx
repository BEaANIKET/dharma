import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import BreathingVisual from "./BreathingVisual";
import ThumbButton from "./ThumbButton";
import { MainType, ThumbDirection, ResolvedHomeRecipe } from "./data";

interface HomeMainCardProps {
  mainType: MainType;
  recipe: ResolvedHomeRecipe;
  isPlaying: boolean;
  breathingActive: boolean;
  thumbs: Record<string, ThumbDirection | null>;
  onTogglePlay: () => void;
  onToggleBreathing: () => void;
  onThumb: (id: string, direction: ThumbDirection) => void;
}

export default function HomeMainCard({
  mainType,
  recipe,
  isPlaying,
  breathingActive,
  thumbs,
  onTogglePlay,
  onToggleBreathing,
  onThumb,
}: HomeMainCardProps) {
  const verse = recipe.verse;
  const breathing = recipe.breathing;

  if (mainType === "verse") {
    return (
      <View className="rounded-3xl border p-5" style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-[11px] uppercase" style={{ color: colors.primary, letterSpacing: 1.4 }}>
            Bhagavad Gita · Ch.{verse.ch} V.{verse.v}
          </Text>
          <View className="flex-row items-center rounded-xl px-2 py-1" style={{ backgroundColor: colors.primaryTint12 }}>
            <Ionicons name="volume-high-outline" size={12} color={colors.primary} />
            <Text className="ml-1 text-[10px]" style={{ color: colors.primary }}>
              Audio
            </Text>
          </View>
        </View>

        <Text className="mb-3 text-2xl leading-9" style={[typography.devanagari, { color: colors.primary }]}>
          {verse.sanskrit}
        </Text>
        <Text className="mb-4 text-2xl italic leading-9" style={[typography.heading, { color: colors.textPrimary }]}>
          &quot;{verse.english}&quot;
        </Text>

        <View
          className="mb-3 rounded-r-xl border-l-2 px-3 py-2"
          style={{ borderLeftColor: `${colors.primary}66`, backgroundColor: `${colors.primary}14` }}
        >
          <Text className="mb-1 text-[10px] uppercase" style={{ color: colors.primary, letterSpacing: 1 }}>
            Why this verse for you
          </Text>
          <Text className="text-sm leading-6" style={{ color: colors.textSecondary }}>
            {verse.connection}
          </Text>
        </View>

        <View className="mb-4 rounded-xl border p-3" style={{ borderColor: colors.cardBorder, backgroundColor: colors.background }}>
          <View className="mb-1 flex-row items-center">
            <Ionicons name="sparkles-outline" size={11} color={colors.accentSage} />
            <Text className="ml-1 text-[10px] uppercase" style={{ color: colors.accentSage, letterSpacing: 1 }}>
              {verse.tag}
            </Text>
          </View>
          <Text className="text-sm leading-6" style={{ color: colors.textSecondary }}>
            {verse.science}
          </Text>
        </View>

        <View className="items-center">
          <Pressable
            onPress={onTogglePlay}
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={22}
              color={colors.backgroundDeep}
              style={!isPlaying ? { marginLeft: 2 } : undefined}
            />
          </Pressable>
        </View>

        <View className="mt-4 flex-row justify-center gap-3">
          <ThumbButton direction="up" active={thumbs.main === "up"} onPress={() => onThumb("main", "up")} />
          <ThumbButton direction="down" active={thumbs.main === "down"} onPress={() => onThumb("main", "down")} />
        </View>
      </View>
    );
  }

  return (
    <View className="rounded-3xl border p-5" style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
      <Text className="mb-4 text-center text-[11px] uppercase" style={{ color: colors.accentSage, letterSpacing: 1.4 }}>
        Guided Breathing · {breathing.pattern}
      </Text>

      <View className="mb-8 items-center">
        <BreathingVisual active={breathingActive} pattern={breathing.pattern} />
      </View>

      <Text className="mb-1 text-center text-4xl" style={[typography.heading, { color: colors.textPrimary }]}>
        {breathing.name}
      </Text>
      <Text className="mb-1 text-center text-sm" style={{ color: colors.textSecondary }}>
        {breathing.desc}
      </Text>
      <Text className="mb-4 text-center text-xs" style={{ color: colors.textMuted }}>
        {breathing.duration}
      </Text>

      <View
        className="mb-4 rounded-r-xl border-l-2 px-3 py-2"
        style={{ borderLeftColor: `${colors.accentSage}66`, backgroundColor: `${colors.accentSage}14` }}
      >
        <Text className="mb-1 text-[10px] uppercase" style={{ color: colors.accentSage, letterSpacing: 1 }}>
          Why this for you
        </Text>
        <Text className="text-sm leading-6" style={{ color: colors.textSecondary }}>
          {breathing.science}
        </Text>
      </View>

      <Pressable
        onPress={onToggleBreathing}
        className="rounded-2xl px-5 py-4"
        style={{
          backgroundColor: breathingActive ? colors.backgroundElevated : colors.accentSage,
          borderColor: colors.cardBorder,
          borderWidth: breathingActive ? 1 : 0,
        }}
      >
        <Text className="text-center text-base font-semibold" style={{ color: breathingActive ? colors.accentSage : colors.backgroundDeep }}>
          {breathingActive ? "Pause Session" : "Begin Session"}
        </Text>
      </Pressable>

      <View className="mt-4 flex-row justify-center gap-3">
        <ThumbButton direction="up" active={thumbs.main === "up"} onPress={() => onThumb("main", "up")} />
        <ThumbButton direction="down" active={thumbs.main === "down"} onPress={() => onThumb("main", "down")} />
      </View>
    </View>
  );
}
