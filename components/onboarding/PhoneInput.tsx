import { Text, TextInput, View } from "react-native";

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  return (
    <View className="bg-surface/40 dark:bg-surface-dark/40 border border-border/40 dark:border-border-dark/40 rounded-2xl px-4 py-3 flex-row items-center">
      <View className="px-3 py-2 rounded-full bg-dharma-teal/10 border border-dharma-teal/30">
        <Text className="text-dharma-teal text-sm font-semibold">+1</Text>
      </View>
      <TextInput
        className="flex-1 ml-3 text-text-primary dark:text-text-primary-dark text-base"
        placeholder="(555) 000-0000"
        placeholderTextColor="#6b6878"
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChange}
        autoCorrect={false}
      />
    </View>
  );
}
