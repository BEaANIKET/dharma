import { View, TextInput, Text } from "react-native";
import { useState } from "react";

export default function ContextInput() {
  const [text, setText] = useState("");

  return (
    <View className="mt-6 w-full">
      <Text className="text-secondary dark:text-secondary-dark pb-2"> ADD MORE CONTEXT (OPTIONAL)</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What happened today? I'm listening..."
        placeholderTextColor="#6b6878"
        multiline
        textAlignVertical="top"
        className="bg-surface dark:bg-surface-dark rounded-2xl p-4 h-32 text-primary dark:text-parchment border border-border/40 dark:border-border-dark/40"
      />
    </View>
  );
}
