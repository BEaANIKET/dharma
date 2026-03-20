import { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  Animated,
  Easing,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface SacredDateInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;

  labelColor?: string;
  activeLabelColor?: string;
  textColor?: string;
  underlineColor?: string;
  underlineBaseColor?: string;
}

export default function SacredDateInput({
  label,
  value,
  onChange,
  labelColor,
  activeLabelColor,
  textColor,
  underlineColor,
  underlineBaseColor,
}: SacredDateInputProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  const underlineScale = useRef(new Animated.Value(0)).current;
  const underlineOp = useRef(new Animated.Value(0)).current;

  const animate = (val: Animated.Value, to: number, dur: number) =>
    Animated.timing(val, {
      toValue: to,
      duration: dur,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

  const onFocus = () => {
    setFocused(true);
    setShow(true);

    Animated.parallel([
      animate(underlineScale, 1, 420),
      animate(underlineOp, 1, 420),
    ]).start();
  };

  const handleChange = (_: any, selected?: Date) => {
    setShow(false);
    setFocused(false);

    Animated.parallel([
      animate(underlineScale, 0, 300),
      animate(underlineOp, 0, 300),
    ]).start();

    if (selected) {
      onChange(selected);
    }
  };

  const formattedDate = value
    ? value.toLocaleDateString("en-GB")
    : "select date";

  return (
    <View className="w-full mb-6">

      {/* Label */}
      {label && (
        <Text
          className={`mb-2 text-xs uppercase tracking-widest font-ui ${
            focused ? "text-accent-primary dark:text-accent-primary-dark" : "text-text-secondary/70 dark:text-text-secondary-dark/50"
          }`}
        >
          {label}
        </Text>
      )}

      {/* Pressable input */}
      <Pressable
        onPress={onFocus}
        className="flex-row items-center justify-between py-2"
      >
        <Text className="text-lg font-ui text-text-primary dark:text-text-primary-dark">
          {formattedDate}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={18}
          color="#6b6878"
        />
      </Pressable>

      {/* Base underline */}
      <View className="h-px w-full mt-2 bg-border dark:bg-border-dark" />

      {/* Animated underline */}
      <Animated.View
        className="absolute bottom-0 h-[1.5px] w-full bg-accent-primary dark:bg-accent-primary-dark"
        style={{
          opacity: underlineOp,
          transform: [{ scaleX: underlineScale }],
        }}
      />

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          maximumDate={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
