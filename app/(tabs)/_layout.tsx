import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DharmaLogo from "@/components/DharmaLogo";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",

        /**
         * Header background uses theme tokens
         * so it responds to light/dark mode automatically
         */
        headerBackground: () => (
          <View className="flex-1 bg-bg dark:bg-bg-dark " />
        ),

        /**
         * Custom header title component
         */
        headerTitle: () => (
          <DharmaLogo size={36} showWordmark={false} />
        ),

        /**
         * React Navigation requires inline styles
         * so these cannot be converted to NativeWind
         */
        tabBarStyle: {
          backgroundColor: "transparent", // let tabBarBackground control the color
          borderTopWidth: 0,
          height: 78,
          paddingTop: 8,
          paddingBottom: 10,
        },

        /**
         * Tab bar background using theme color
         */
        tabBarBackground: () => (
          <View className="flex-1 bg-bg dark:bg-bg-dark" />
        ),

        tabBarLabelStyle: {
          fontSize: 13,
          marginTop: 2,
        },

        /**
         * Use theme tokens instead of hardcoded basic hex where possible
         * Note: NativeWind config dictates #4ECDC4 for accent-primary-dark, and we match it here.
         */
        tabBarActiveTintColor: "#4ECDC4", // accent-primary-dark
        tabBarInactiveTintColor: "#6b6878", // text-secondary
      }}
    >
      {/* ---------------- HOME ---------------- */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${
                focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
              }`}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* ---------------- EXPLORE ---------------- */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${
                focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
              }`}
            >
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Hidden center route (used for navigation only) */}
      <Tabs.Screen
        name="cosmic"
        options={{
          href: null,
        }}
      />

      {/* ---------------- PROFILE ---------------- */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${
                focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
              }`}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}