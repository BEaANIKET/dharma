import { Text, View } from "react-native";
import AnimatedPressable from "../AnimatedPressable";

type GenderOption = "Male" | "Female" | "Other";

type GenderPillsProps = {
  value: GenderOption | null;
  onChange: (value: GenderOption) => void;
};

const options: GenderOption[] = ["Male", "Female", "Other"];

export default function GenderPills({ value, onChange }: GenderPillsProps) {
  return (
    <View className="flex-row flex-wrap -mr-3 -mb-3">
      {options.map((option) => {
        const isActive = value === option;
        return (
          <AnimatedPressable
            key={option}
            onPress={() => onChange(option)}
            className={`px-4 py-2 rounded-full border ${
              isActive
                ? "bg-accent-primary-dark/20 border-accent-primary-dark/60"
                : "bg-surface/40 dark:bg-surface-dark/40 border-border/40 dark:border-border-dark/40"
            } mr-3 mb-3`}
            containerStyle={{
              shadowOpacity: isActive ? 0.25 : 0.1,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 0 },
            }}
          >
            <Text className={`text-sm font-semibold ${isActive ? "text-accent-primary-dark" : "text-text-secondary dark:text-text-secondary-dark"}`}>
              {option}
            </Text>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}
