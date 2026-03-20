import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import FloatingOrbs from "./FloatingOrbs";
import Starfield from "./Starfield";

type CosmicBackgroundProps = {
  children: ReactNode;
};

export default function CosmicBackground({ children }: CosmicBackgroundProps) {
  return (
    <View className="flex-1 bg-bg dark:bg-night-indigo">
      <LinearGradient
        colors={["#09090F", "#111128", "#1a1a38"]}
        style={StyleSheet.absoluteFillObject}
      />
      <Starfield />
      <FloatingOrbs />
      {children}
    </View>
  );
}
