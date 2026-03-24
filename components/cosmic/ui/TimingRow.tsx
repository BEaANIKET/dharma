import { Text, View } from "react-native";

interface TimingRowProps {
  item: {
    n: string;
    t: string;
    sev?: string;
    hi?: boolean;
    note?: string;
  };
  isLast: boolean;
}

export default function TimingRow({ item, isLast }: TimingRowProps) {
  const isSevere = !!item.sev;
  const isHighlight = !!item.hi;

  return (
    <View
      className={`flex-row items-center gap-2.5 py-[11px] ${
        isLast ? "" : "border-b border-white/[0.08]"
      }`}
    >
      <View
        className={`w-[30px] h-[30px] rounded-lg items-center justify-center ${
          isSevere
            ? "bg-error-dark/[0.11]"
            : isHighlight
              ? "bg-highlight/[0.11]"
              : "bg-white/5"
        }`}
      >
        <Text className="text-[13px]">
          {item.sev === "high" ? "🔴" : isHighlight ? "⭐" : "·"}
        </Text>
      </View>

      <View className="flex-1">
        <Text
          className={`text-[12.5px] ${
            isSevere
              ? "font-uiMedium text-error-dark"
              : "font-ui text-secondary-dark"
          }`}
        >
          {item.n}
        </Text>
        {item.note ? (
          <Text className="font-ui text-[9.5px] text-white/30 mt-[1px]">
            {item.note}
          </Text>
        ) : null}
      </View>

      <Text
        className={`font-uiMedium text-[11.5px] ${
          isSevere
            ? "text-error-dark"
            : isHighlight
              ? "text-highlight"
              : "text-text-primary-dark"
        }`}
      >
        {item.t}
      </Text>
    </View>
  );
}
