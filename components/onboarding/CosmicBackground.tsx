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
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={["#070B16", "#0C1222", "#101A2F"]}
        style={StyleSheet.absoluteFillObject}
      />
      <Starfield />
      <FloatingOrbs />
      {children}
    </View>
  );
}
