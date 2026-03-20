import { View } from "react-native";

export default function GlassCard({ children }: any) {
  return (
    <View
      className="bg-surface dark:bg-surface-dark rounded-3xl w-full p-5 border border-accent-primary/25 dark:border-accent-primary-dark/25 shadow-lg"
    >
      {children}
    </View>
  );
}
