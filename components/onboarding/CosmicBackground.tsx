import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "@/theme/colors";
import FloatingOrbs from "./FloatingOrbs";
import Starfield from "./Starfield";

type CosmicBackgroundProps = {
  children: ReactNode;
};

export default function CosmicBackground({ children }: CosmicBackgroundProps) {
  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={[colors.cosmicGradientTop, colors.background, colors.backgroundElevated]}
        style={StyleSheet.absoluteFillObject}
      />
      <Starfield />
      <FloatingOrbs />
      {children}
    </View>
  );
}
