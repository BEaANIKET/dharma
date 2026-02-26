import { Text, TextInput, View } from "react-native";
import { colors } from "@/theme/colors";

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  return (
    <View className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex-row items-center">
      <View className="px-3 py-2 rounded-full bg-cyan-400/10 border border-cyan-300/30">
        <Text className="text-cyan-100 text-sm font-semibold">+1</Text>
      </View>
      <TextInput
        className="flex-1 ml-3 text-textPrimary text-base"
        placeholder="(555) 000-0000"
        placeholderTextColor={colors.textMuted}
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChange}
        autoCorrect={false}
      />
    </View>
  );
}
