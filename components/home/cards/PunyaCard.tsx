import { Pressable, Text, View } from "react-native";
import { ResolvedHomeRecipe, ThumbDirection } from "../data";

interface PunyaCardProps {
  punya: ResolvedHomeRecipe["punya"];
  thumbs: Record<string, ThumbDirection | null>;
  onThumb: (id: string, direction: ThumbDirection) => void;
}

export default function PunyaCard({ punya, thumbs, onThumb }: PunyaCardProps) {
  return (
    <View className="rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-4">
      {/* Eyebrow label */}
      <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-success dark:text-success-dark">
        FOR YOU RIGHT NOW
      </Text>

      {/* Title row */}
      <View className="mt-3 flex-row items-center gap-[14px]">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-success/10 dark:bg-success-dark/10 border border-success/30 dark:border-success-dark/30">
          <Text className="text-2xl">{punya.emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-headingBold text-primary dark:text-text-primary-dark">
            {punya.title}
          </Text>
          <Text className="text-sm font-ui text-secondary dark:text-secondary-dark">
            {punya.subtitle || "A small act of kindness"}
          </Text>
        </View>
      </View>

      {/* Activity */}
      <View className="mt-4 rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-4">
        <Text className="text-sm leading-relaxed font-uiMedium text-secondary dark:text-secondary-dark">
          {punya.activity}
        </Text>
      </View>

      {/* Why this helps */}
      {punya.ai_why ? (
        <View className="mt-3 rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-4">
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-success dark:text-success-dark">
            WHY THIS HELPS
          </Text>
          <Text className="mt-2 text-sm leading-relaxed font-ui text-secondary dark:text-secondary-dark">
            {punya.ai_why}
          </Text>
        </View>
      ) : null}

      {/* Impact */}
      {punya.ai_impact.length > 0 ? (
        <View className="mt-3 rounded-2xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-4">
          <Text className="text-xs uppercase tracking-widest font-uiSemiBold text-success dark:text-success-dark">
            IMPACT
          </Text>
          <View className="mt-3 gap-3">
            {punya.ai_impact.map((impact, index) => (
              <View key={`${impact.point}-${index}`} className="flex-row items-start gap-3">
                <Text className="text-lg">{impact.emoji}</Text>
                <Text className="flex-1 text-sm leading-relaxed font-ui text-secondary dark:text-secondary-dark">
                  {impact.point}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {/* Feedback */}
      <View className="mt-5 flex-row justify-center gap-3">
        <Pressable
          onPress={() => onThumb("punya", "up")}
          className={`rounded-full border px-5 py-2 ${
            thumbs.punya === "up"
              ? "border-success dark:border-success-dark bg-success/15 dark:bg-success-dark/15"
              : "border-border dark:border-border-dark bg-transparent"
          }`}
        >
          <Text
            className={`font-uiSemiBold text-sm ${
              thumbs.punya === "up"
                ? "text-success dark:text-success-dark"
                : "text-secondary dark:text-secondary-dark"
            }`}
          >
            Helpful
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onThumb("punya", "down")}
          className={`rounded-full border px-5 py-2 ${
            thumbs.punya === "down"
              ? "border-error dark:border-error-dark bg-error/15 dark:bg-error-dark/15"
              : "border-border dark:border-border-dark bg-transparent"
          }`}
        >
          <Text
            className={`font-uiSemiBold text-sm ${
              thumbs.punya === "down"
                ? "text-error dark:text-error-dark"
                : "text-secondary dark:text-secondary-dark"
            }`}
          >
            Skip
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
