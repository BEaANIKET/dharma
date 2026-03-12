import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "CormorantGaramond-Light": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-Light.ttf"),
    "CormorantGaramond-LightItalic": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-LightItalic.ttf"),
    "CormorantGaramond-Regular": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-Regular.ttf"),
    "CormorantGaramond-Italic": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-Italic.ttf"),
    "CormorantGaramond-Medium": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-Medium.ttf"),
    "CormorantGaramond-MediumItalic": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-MediumItalic.ttf"),
    "CormorantGaramond-SemiBold": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-SemiBold.ttf"),
    "CormorantGaramond-SemiBoldItalic": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-SemiBoldItalic.ttf"),
    "CormorantGaramond-Bold": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-Bold.ttf"),
    "CormorantGaramond-BoldItalic": require("../assets/fonts/Cormorant_Garamond/static/CormorantGaramond-BoldItalic.ttf"),

    "Inter-Thin": require("../assets/fonts/Inter/static/Inter_18pt-Thin.ttf"),
    "Inter-ThinItalic": require("../assets/fonts/Inter/static/Inter_18pt-ThinItalic.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter/static/Inter_18pt-ExtraLight.ttf"),
    "Inter-ExtraLightItalic": require("../assets/fonts/Inter/static/Inter_18pt-ExtraLightItalic.ttf"),
    "Inter-Light": require("../assets/fonts/Inter/static/Inter_18pt-Light.ttf"),
    "Inter-LightItalic": require("../assets/fonts/Inter/static/Inter_18pt-LightItalic.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/static/Inter_18pt-Regular.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter/static/Inter_18pt-Italic.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/static/Inter_18pt-Medium.ttf"),
    "Inter-MediumItalic": require("../assets/fonts/Inter/static/Inter_18pt-MediumItalic.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/static/Inter_18pt-SemiBold.ttf"),
    "Inter-SemiBoldItalic": require("../assets/fonts/Inter/static/Inter_18pt-SemiBoldItalic.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/static/Inter_18pt-Bold.ttf"),
    "Inter-BoldItalic": require("../assets/fonts/Inter/static/Inter_18pt-BoldItalic.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter/static/Inter_18pt-ExtraBold.ttf"),
    "Inter-ExtraBoldItalic": require("../assets/fonts/Inter/static/Inter_18pt-ExtraBoldItalic.ttf"),
    "Inter-Black": require("../assets/fonts/Inter/static/Inter_18pt-Black.ttf"),
    "Inter-BlackItalic": require("../assets/fonts/Inter/static/Inter_18pt-BlackItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="loading" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" options={{ animation: "fade" }} />
    </Stack>
  );
}
