import { Pressable, Text, View } from "react-native";

interface MoodCardProps {
  emoji: string;
  label: string;
  description?: string;
  isSelected?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}

export default function MoodCard({
  emoji,
  label,
  description,
  isSelected = false,
  fullWidth = false,
  onPress,
}: MoodCardProps) {
  const selectedClass = isSelected
    ? "border-accent-primary-dark bg-accent-primary-dark/10"
    : "border-border dark:border-border-dark bg-surface dark:bg-surface-dark";

  if (fullWidth) {
    return (
      <Pressable
        onPress={onPress}
        className={`mt-3 w-full flex-row items-center rounded-3xl border px-5 py-4 ${selectedClass}`}
      >
        <Text className="text-3xl">{emoji}</Text>
        <View className="ml-4 flex-1">
          <Text
            className={
              isSelected
                ? "text-base font-uiBold text-accent-primary-dark"
                : "text-base font-uiMedium text-text-primary dark:text-text-primary-dark"
            }
          >
            {label}
          </Text>
          {description ? (
            <Text className="mt-0.5 text-xs font-ui text-text-secondary dark:text-text-secondary-dark">
              {description}
            </Text>
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 h-[104px] w-[31.7%] items-center justify-center rounded-3xl border px-2 ${selectedClass}`}
    >
      <Text className="text-3xl">{emoji}</Text>
      <Text
        className={
          isSelected
            ? "mt-1.5 text-center text-sm font-uiBold text-accent-primary-dark"
            : "mt-1.5 text-center text-sm font-uiMedium text-text-primary dark:text-text-primary-dark"
        }
        numberOfLines={1}
      >
        {label}
      </Text>
      {description ? (
        <Text
          className="mt-0.5 text-center text-[10px] font-ui text-text-secondary dark:text-text-secondary-dark"
          numberOfLines={1}
        >
          {description}
        </Text>
      ) : null}
    </Pressable>
  );
}
