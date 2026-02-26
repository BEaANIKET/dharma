import { Text, View } from "react-native";
import AnimatedPressable from "../AnimatedPressable";
import { colors } from "@/theme/colors";

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
                ? "bg-cyan-400/20 border-cyan-300/60"
                : "bg-white/5 border-white/10"
            } mr-3 mb-3`}
            containerStyle={{
              shadowColor: colors.primary,
              shadowOpacity: isActive ? 0.25 : 0.1,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 0 },
            }}
          >
            <Text className="text-cyan-100 text-sm font-semibold">
              {option}
            </Text>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}
