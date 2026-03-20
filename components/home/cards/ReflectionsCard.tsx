import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ResolvedHomeRecipe } from "../data";

// accent-secondary-dark token value — required for Ionicons color prop
const ACCENT_SECONDARY = "#9B8EC4";

interface ReflectionsCardProps {
  reflections: ResolvedHomeRecipe["reflections"];
}

export default function ReflectionsCard({ reflections }: ReflectionsCardProps) {
  return (
    <View className="rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-4">
      {/* Eyebrow label */}
      <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-accent-secondary dark:text-accent-secondary-dark">
        FOR YOU RIGHT NOW
      </Text>

      {/* Title row */}
      <View className="mt-3 flex-row items-center gap-[14px]">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-accent-secondary/10 dark:bg-accent-secondary-dark/10 border border-accent-secondary/30 dark:border-accent-secondary-dark/30">
          <Ionicons name="chatbubble-outline" size={20} color={ACCENT_SECONDARY} />
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-headingBold text-primary dark:text-text-primary-dark">
            Reflections
          </Text>
          <Text className="text-sm font-ui text-secondary dark:text-secondary-dark">
            Journal prompts for you
          </Text>
        </View>
      </View>

      {/* Prompts */}
      <View className="mt-4 gap-2">
        {reflections.map((reflection, index) => (
          <View
            key={`${reflection.question}-${index}`}
            className="rounded-xl px-3 py-3 bg-bg dark:bg-bg-dark border border-border dark:border-border-dark"
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
