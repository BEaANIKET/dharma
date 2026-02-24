import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0B1020",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#2DD4BF",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood",
          tabBarIcon: () => <Text>✨</Text>,
        }}
      />
      <Tabs.Screen
        name="practices"
        options={{
          title: "Practice",
          tabBarIcon: () => <Text>🧘</Text>,
        }}
      />
      <Tabs.Screen
        name="cosmic"
        options={{
          title: "Cosmic",
          tabBarIcon: () => <Text>🌙</Text>,
        }}
      />
      <Tabs.Screen
        name="story"
        options={{
          title: "Story",
          tabBarIcon: () => <Text>📖</Text>,
        }}
      />
    </Tabs>
  );
}
