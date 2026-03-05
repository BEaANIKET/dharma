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

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";
const SANS = Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif";

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
          className="mb-2 text-[11px] uppercase tracking-[4px]"
          style={{
            fontFamily: SANS,
            color: focused
              ? activeLabelColor ?? underlineColor
              : labelColor,
          }}
        >
          {label}
        </Text>
      )}

      {/* Pressable input */}
      <Pressable
        onPress={onFocus}
        className="flex-row items-center justify-between py-2"
      >
        <Text
          style={{
            fontFamily: SERIF,
            fontSize: 18,
            color: textColor,
          }}
        >
          {formattedDate}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={18}
          color={labelColor}
        />
      </Pressable>

      {/* Base underline */}
      <View
        className="h-px w-full mt-2"
        style={{ backgroundColor: underlineBaseColor }}
      />

      {/* Animated underline */}
      <Animated.View
        className="absolute bottom-0 h-[1.5px] w-full"
        style={{
          backgroundColor: underlineColor,
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