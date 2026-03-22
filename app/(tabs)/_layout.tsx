import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-bg dark:bg-bg-dark">
      <AppHeader />
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            height: 78,
            paddingTop: 8,
            paddingBottom: 10,
          },

          tabBarBackground: () => (
            <View className="flex-1 bg-bg dark:bg-bg-dark" />
          ),

          tabBarLabelStyle: {
            fontSize: 13,
            marginTop: 2,
          },

          tabBarActiveTintColor: "#4ECDC4",
          tabBarInactiveTintColor: "#6b6878",
        }}
      >
        {/* ---------------- HOME ---------------- */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <View
                className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
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
                className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
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

        {/* ---------------- COSMIC ---------------- */}
        <Tabs.Screen
          name="cosmic"
          options={{
            title: "Cosmic",
            tabBarIcon: ({ focused, color, size }) => (
              <View
                className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
                  }`}
              >
                <Ionicons
                  name={focused ? "planet" : "planet-outline"}
                  size={size}
                  color={color}
                />
              </View>
            ),
          }}
        />

        {/* ---------------- PROFILE ---------------- */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <View
                className={`w-[38px] h-[38px] rounded-[12px] items-center justify-center ${focused ? "bg-accent-primary-dark/15 dark:bg-accent-primary-dark/15" : "bg-transparent"
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
    </View>
  );
}
