import { View } from "react-native";

export default function GlassCard({ children }: any) {
  return (
    <View
      className="bg-card rounded-3xl w-full p-5 border border-cyan-300/25"
      style={{
        shadowColor: "#22D3EE",
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      }}
    >
      {children}
    </View>
  );
}
