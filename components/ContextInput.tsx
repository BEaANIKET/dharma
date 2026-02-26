import { View, TextInput, Text } from "react-native";
import { useState } from "react";
import { colors } from "@/theme/colors";

export default function ContextInput() {
  const [text, setText] = useState("");

  return (
    <View className="mt-6 w-full">
      <Text className=" text-textSecondary pb-2 "> ADD MORE CONTEXT (OPTIONAL)</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What happened today? I'm listening..."
        placeholderTextColor={colors.textMuted}
        multiline
        textAlignVertical="top"
        className="bg-card rounded-2xl p-4 h-32 text-textPrimary border border-white/5"
      />
    </View>
  );
}
