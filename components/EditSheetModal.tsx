import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import SectionLabel from "@/components/cosmic/ui/SectionLabel";

function formatDisplay(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface EditSheetModalProps {
  visible: boolean;
  city: string;
  date: Date;
  onApply: (city: string, date: Date) => void;
  onClose: () => void;
}

export default function EditSheetModal({
  visible,
  city,
  date,
  onApply,
  onClose,
}: EditSheetModalProps) {
  const [draftCity, setDraftCity] = useState(city);
  const [draftDate, setDraftDate] = useState(date);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");
  const [cityFocused, setCityFocused] = useState(false);

  // Sheet animations
  const slideAnim = useRef(new Animated.Value(300)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  // City underline animations
  const cityUnderlineScale = useRef(new Animated.Value(0)).current;
  const cityUnderlineOp = useRef(new Animated.Value(0)).current;

  const animate = (val: Animated.Value, to: number, dur: number) =>
    Animated.timing(val, {
      toValue: to,
      duration: dur,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

  const openSheet = () => {
    setDraftCity(city);
    setDraftDate(date);
    setShowDatePicker(Platform.OS === "ios");
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

  const closeSheet = () => {
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
    ]).start(() => onClose());
  };

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      onApply(draftCity, draftDate);
      setLoading(false);
      closeSheet();
    }, 1000);
  };

  const onCityFocus = () => {
    setCityFocused(true);
    Animated.parallel([
      animate(cityUnderlineScale, 1, 420),
      animate(cityUnderlineOp, 1, 420),
    ]).start();
  };

  const onCityBlur = () => {
    setCityFocused(false);
    Animated.parallel([
      animate(cityUnderlineScale, 0, 300),
      animate(cityUnderlineOp, 0, 300),
    ]).start();
  };

  useEffect(() => {
    if (visible) openSheet();
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={closeSheet}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={closeSheet}>
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
          <Text className="text-xl font-headingMedium text-text-primary dark:text-text-primary-dark mb-1">
            Edit Cosmic Details
          </Text>
          <Text className="text-xs font-ui text-text-secondary dark:text-text-secondary-dark mb-7">
            Update location and date for your readings
          </Text>

          {/* Separator */}
          <View className="h-px bg-border dark:bg-border-dark mb-6" />

          {/* ── Date Field ── */}
          <View className="w-full mb-6">
            <SectionLabel variant="gold" className="mb-2">
              Date
            </SectionLabel>

            {/* Android: tappable row */}
            {Platform.OS === "android" && (
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="flex-row items-center justify-between py-2"
              >
                <Text className="text-lg font-ui text-text-primary dark:text-text-primary-dark">
                  {formatDisplay(draftDate)}
                </Text>
                <Ionicons name="calendar-outline" size={18} color="#D4960A" />
              </Pressable>
            )}

            {/* iOS: inline spinner / Android: native picker */}
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
                style={
                  Platform.OS === "ios"
                    ? { marginBottom: 4, marginHorizontal: -8 }
                    : {}
                }
              />
            )}

            {/* Base underline */}
            <View className="h-px w-full mt-2 bg-border dark:bg-border-dark" />
          </View>

          {/* ── City Field ── */}
          <View className="w-full mb-8">
            <SectionLabel
              variant={cityFocused ? "teal" : "gold"}
              className="mb-2"
            >
              City
            </SectionLabel>

            <View className="flex-row items-center py-2">
              <Ionicons
                name="location-outline"
                size={16}
                color={cityFocused ? "#4ECDC4" : "#D4960A"}
              />
              <TextInput
                value={draftCity}
                onChangeText={setDraftCity}
                placeholder="Enter city"
                placeholderTextColor="#6b6878"
                className="flex-1 ml-2 text-lg font-ui text-text-primary dark:text-text-primary-dark"
                onFocus={onCityFocus}
                onBlur={onCityBlur}
              />
            </View>

            {/* Base underline */}
            <View className="h-px w-full mt-2 bg-border dark:bg-border-dark" />

            {/* Animated focus underline */}
            <Animated.View
              className="absolute bottom-0 h-[1.5px] w-full bg-accent-primary dark:bg-accent-primary-dark"
              style={{
                opacity: cityUnderlineOp,
                transform: [{ scaleX: cityUnderlineScale }],
              }}
            />
          </View>

          {/* ── Buttons ── */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={closeSheet}
              className="flex-1 py-3.5 rounded-xl border border-border dark:border-border-dark items-center"
            >
              <Text className="text-[15px] font-uiMedium text-text-secondary dark:text-text-secondary-dark">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleApply}
              disabled={loading}
              className={`flex-1 py-3.5 rounded-xl bg-highlight dark:bg-highlight-dark items-center justify-center flex-row gap-2 ${loading ? "opacity-75" : "opacity-100"}`}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#111128" />
              ) : (
                <Text className="text-[15px] font-uiSemiBold text-night-indigo">
                  Apply
                </Text>
              )}
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
