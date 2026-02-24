import { Pressable, Text, View } from "react-native";

interface MoodCardProps {
  emoji: string;
  label: string;
  isSelected?: boolean;
  accentColor?: string;
  softColor?: string;
  borderColor?: string;
  onPress: () => void;
}

export default function MoodCard({
  emoji,
  label,
  isSelected = false,
  accentColor = "#22D3EE",
  softColor = "#151C2F",
  borderColor = "#22D3EE",
  onPress,
}: MoodCardProps) {

  return (
    <Pressable
      onPress={onPress}
      className="w-[23%] rounded-2xl px-2 py-4 items-center border mb-4"
      style={{
        backgroundColor: isSelected
          ? softColor
          : "#151C2F",
        borderColor: isSelected
          ? borderColor
          : "#BFA6A1",
      }}
    >
      <Text className="text-3xl">{emoji}</Text>
      <Text
        className={`mt-2 text-center text-xs ${isSelected ? "font-semibold" : "text-textSecondary"}`}
        style={isSelected ? { color: accentColor } : undefined}
      >
        {label}
      </Text>
      {/* {isSelected ? (
        <View
          className="mt-3 px-2 py-1 rounded-full"
          style={{ backgroundColor: `${accentColor}30` }}
        >
          <Text className="text-xs" style={{ color: accentColor }}>
            Selected
          </Text>
        </View>
      ) : null} */}
    </Pressable>
  );
}
