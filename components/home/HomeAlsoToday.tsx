import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import ThumbButton from "./ThumbButton";
import { MainType, ResolvedHomeRecipe, ThumbDirection } from "./data";

interface HomeAlsoTodayProps {
  mainType: MainType;
  recipe: ResolvedHomeRecipe;
  thumbs: Record<string, ThumbDirection | null>;
  onThumb: (id: string, direction: ThumbDirection) => void;
}

export default function HomeAlsoToday({ mainType, recipe, thumbs, onThumb }: HomeAlsoTodayProps) {
  const verse = recipe.verse;
  const breathing = recipe.breathing;
  const reflections = recipe.reflections;

  return (
    <View className="mt-5">
      <Text className="mb-3 text-sm font-semibold" style={{ color: colors.textSecondary, letterSpacing: 0.5 }}>
        Also Today
      </Text>

      <View className="mb-3 flex-row items-center rounded-2xl border px-4 py-4" style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: mainType === "verse" ? `${colors.accentSage}1F` : colors.primaryTint12,
            borderColor: mainType === "verse" ? `${colors.accentSage}4D` : `${colors.primary}4D`,
            borderWidth: 1,
          }}
        >
          <Ionicons
            name={mainType === "verse" ? "leaf-outline" : "book-outline"}
            size={18}
            color={mainType === "verse" ? colors.accentSage : colors.primary}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold" style={{ color: colors.textPrimary }}>
            {mainType === "verse" ? breathing.name : `Gita ${verse.ch}.${verse.v}`}
          </Text>
          <Text className="text-xs" style={{ color: colors.textMuted }}>
            {mainType === "verse" ? `${breathing.pattern} · ${breathing.duration}` : "Listen to verse with commentary"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </View>

      <View className="mb-3 flex-row items-center rounded-2xl border px-4 py-4" style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${colors.accentRose}1F`,
            borderColor: `${colors.accentRose}4D`,
            borderWidth: 1,
          }}
        >
          <Ionicons name="heart-outline" size={18} color={colors.accentRose} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold" style={{ color: colors.textPrimary }}>
            Punya · Good Deed
          </Text>
          <Text className="text-xs" style={{ color: colors.textMuted }}>
            {recipe.punya}
          </Text>
        </View>
        <ThumbButton direction="up" active={thumbs.punya === "up"} onPress={() => onThumb("punya", "up")} />
      </View>

      <View className="rounded-2xl border px-4 py-4" style={{ borderColor: colors.cardBorder, backgroundColor: colors.backgroundSoft }}>
        <View className="mb-3 flex-row items-center">
          <View
            className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${colors.accentIndigo}1F`,
              borderColor: `${colors.accentIndigo}4D`,
              borderWidth: 1,
            }}
          >
            <Ionicons name="chatbubble-outline" size={18} color={colors.accentIndigo} />
          </View>
          <View>
            <Text className="text-base font-semibold" style={{ color: colors.textPrimary }}>
              Reflections
            </Text>
            <Text className="text-xs" style={{ color: colors.textMuted }}>
              Journal prompts for you
            </Text>
          </View>
        </View>

        {reflections.map((reflection, index) => (
          <View
            key={`${reflection}-${index}`}
            className="rounded-xl border px-3 py-3"
            style={{
              borderColor: colors.cardBorder,
              backgroundColor: colors.background,
              marginBottom: index === reflections.length - 1 ? 0 : 8,
            }}
          >
            <Text className="text-sm italic leading-6" style={{ color: colors.textSecondary }}>
              &quot;{reflection}&quot;
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
