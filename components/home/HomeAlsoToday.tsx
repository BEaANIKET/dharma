import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  const formatGitaRef = (ch: number, v: number) => (ch > 0 && v > 0 ? `Gita ${ch}.${v}` : "Bhagavad Gita");

  return (
    <View className="mt-5">
      <Text className="mb-3 text-sm font-uiSemiBold tracking-wide text-secondary dark:text-secondary-dark">
        Also Today
      </Text>

      <View className="mb-3 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-4">
        <View
          className={`mr-3 h-11 w-11 items-center justify-center rounded-xl border ${
            mainType === "verse" ? "border-accent-primary-dark/30 bg-accent-primary-dark/15" : "border-highlight/30 bg-highlight/10"
          }`}
        >
          <Ionicons
            name={mainType === "verse" ? "leaf-outline" : "book-outline"}
            size={18}
            color={mainType === "verse" ? "#4ECDC4" : "#D4960A"}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-uiSemiBold text-text-primary dark:text-text-primary-dark">
            {mainType === "verse" ? breathing.name : formatGitaRef(verse.ch, verse.v)}
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
            {mainType === "verse" ? `${breathing.pattern} · ${breathing.duration}` : "Listen to verse with commentary"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#6b6878" />
      </View>

      <View className="mb-3 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-4">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl border border-highlight/30 bg-highlight/10">
          <Ionicons name="heart-outline" size={18} color="#D4960A" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-uiSemiBold text-text-primary dark:text-text-primary-dark">
            Punya · Good Deed
          </Text>
          <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
            {recipe.punya.title}
          </Text>
        </View>
        <ThumbButton direction="up" active={thumbs.punya === "up"} onPress={() => onThumb("punya", "up")} />
      </View>

      <View className="rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4 py-4">
        <View className="mb-3 flex-row items-center">
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl border border-cosmic-violet/30 bg-cosmic-violet/15">
            <Ionicons name="chatbubble-outline" size={18} color="#9B8EC4" />
          </View>
          <View>
            <Text className="text-base font-uiSemiBold text-text-primary dark:text-text-primary-dark">
              Reflections
            </Text>
            <Text className="text-xs font-ui text-secondary dark:text-secondary-dark">
              Journal prompts for you
            </Text>
          </View>
        </View>

        {reflections.map((reflection, index) => (
          <View
            key={`${reflection.question}-${index}`}
            className={`rounded-xl border border-border dark:border-border-dark bg-bg dark:bg-bg-dark px-3 py-3 ${
              index === reflections.length - 1 ? "mb-0" : "mb-2"
            }`}
          >
            <View className="flex-row items-start gap-2">
              <Text className="text-base">{reflection.emoji}</Text>
              <Text className="flex-1 text-sm leading-6 font-uiItalic text-secondary dark:text-secondary-dark">
                &quot;{reflection.question}&quot;
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
