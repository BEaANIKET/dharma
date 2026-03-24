import DharmaLogo from "@/components/DharmaLogo";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSegments } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
  const [draftCity, setDraftCity] = useState(city);
  const [draftDate, setDraftDate] = useState(date);
  const [loading, setLoading] = useState(false);

  // For Android: show/hide the native date picker
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const slideAnim = useRef(new Animated.Value(300)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setDraftCity(city);
    setDraftDate(date);
    setShowDatePicker(Platform.OS === "ios");
    setModalVisible(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setCity(draftCity);
      setDate(draftDate);
      setLoading(false);
      closeModal();
    }, 1000);
  };

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
            onPress={openModal}
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

      {/* ── Bottom Sheet Modal ── */}
      <Modal transparent visible={modalVisible} animationType="none" onRequestClose={closeModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={closeModal}>
            <Animated.View
              className="flex-1 bg-black/60"
              style={{ opacity: backdropAnim }}
            />
          </TouchableWithoutFeedback>

          {/* Sheet */}
          <Animated.View
            className="bg-surface dark:bg-surface-dark rounded-t-[20px] px-6 pt-3 pb-9"
            style={{ transform: [{ translateY: slideAnim }] }}
          >
            {/* Drag handle */}
            <View className="w-9 h-1 rounded-full bg-text-secondary/30 dark:bg-text-secondary-dark/30 self-center mb-5" />

            {/* Title */}
            <Text className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-6">
              Edit Date & Location
            </Text>

            {/* DATE */}
            <Text className="text-[11px] uppercase tracking-[1.5px] text-text-secondary dark:text-text-secondary-dark mb-2">
              Date
            </Text>

            {/* Android: tappable row to open native picker */}
            {Platform.OS === "android" && (
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark rounded-xl px-4 py-3.5 mb-5 flex-row justify-between items-center"
              >
                <Text className="text-base text-text-primary dark:text-text-primary-dark">
                  {formatDisplay(draftDate)}
                </Text>
                <Ionicons name="calendar-outline" size={18} color="#D4960A" />
              </Pressable>
            )}

            {/* iOS: inline spinner / Android: modal picker on demand */}
            {showDatePicker && (
              <DateTimePicker
                value={draftDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                themeVariant="dark"
                onChange={(_, selected) => {
                  if (Platform.OS === "android") setShowDatePicker(false);
                  if (selected) setDraftDate(selected);
                }}
                style={Platform.OS === "ios" ? { marginBottom: 12, marginHorizontal: -8 } : {}}
              />
            )}

            {/* CITY */}
            <Text className="text-[11px] uppercase tracking-[1.5px] text-text-secondary dark:text-text-secondary-dark mb-2">
              City
            </Text>
            <View className="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark rounded-xl flex-row items-center px-4 mb-7">
              <Ionicons name="location-outline" size={16} color="#D4960A" />
              <TextInput
                value={draftCity}
                onChangeText={setDraftCity}
                placeholder="Enter city"
                placeholderTextColor={undefined} // inherits text-secondary via className
                className="flex-1 ml-2 py-3.5 text-base text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark"
              />
            </View>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={closeModal}
                className="flex-1 py-3.5 rounded-xl bg-surface-secondary dark:bg-surface-secondary-dark items-center"
              >
                <Text className="text-[15px] font-medium text-text-secondary dark:text-text-secondary-dark">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleApply}
                disabled={loading}
                className={`flex-1 py-3.5 rounded-xl bg-highlight items-center justify-center flex-row gap-2 ${loading ? "opacity-75" : "opacity-100"}`}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-[15px] font-semibold text-white">Apply →</Text>
                )}
              </Pressable>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}