import DharmaLogo from "@/components/DharmaLogo";
import EditSheetModal from "@/components/EditSheetModal";
import { Ionicons } from "@expo/vector-icons";
import { useSegments } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

function formatDisplay(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AppHeader() {
  const segments = useSegments();
  const activeTab = segments[1] ?? "home";
  const isCosmic = activeTab === "cosmic";

  const [city, setCity] = useState("Mumbai");
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-bg dark:bg-bg-dark px-5 pb-3 pt-2">
      <View className={`flex-row justify-between ${isCosmic ? "items-start" : "items-center"}`}>
        {/* Left: Logo + Date */}
        <View className="flex-row items-center">
          <View className="mr-3 mt-1">
            <DharmaLogo size={36} showWordmark={false} />
          </View>
          <View className="flex h-full">
            {isCosmic && (
              <Text className="text-xs uppercase tracking-[0.15em] font-ui text-accent-secondary dark:text-accent-secondary-dark">
                cosmic energy
              </Text>
            )}
            <Text className="text-2xl font-headingMedium text-text-primary dark:text-text-primary-dark">
              {formatDisplay(date)}
            </Text>
            {isCosmic && (
              <View className="mt-1 flex-row items-center">
                <Ionicons name="location-sharp" size={12} color="#D4960A" />
                <Text className="ml-1 text-xs font-ui text-highlight dark:text-highlight-dark">
                  {city}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Right */}
        {isCosmic ? (
          <Pressable
            onPress={() => setModalVisible(true)}
            className="mt-1 flex-row items-center rounded-full bg-highlight/20 px-3 py-1.5"
          >
            <Ionicons name="pencil" size={14} color="#D4960A" />
            <Text className="ml-1.5 text-sm font-ui text-highlight dark:text-highlight-dark">
              Edit
            </Text>
          </Pressable>
        ) : (
          <View className="flex-row items-center rounded-full bg-highlight/20 px-3 py-1.5">
            <Ionicons name="location-sharp" size={14} color="#D4960A" />
            <Text className="ml-1.5 text-sm font-ui text-highlight dark:text-highlight-dark">
              {city}
            </Text>
          </View>
        )}
      </View>

      <EditSheetModal
        visible={modalVisible}
        city={city}
        date={date}
        onApply={(newCity, newDate) => {
          setCity(newCity);
          setDate(newDate);
        }}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
