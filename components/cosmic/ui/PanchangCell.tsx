import { Text, View } from "react-native";
import SectionLabel from "./SectionLabel";

interface PanchangCellProps {
  label: string;
  value: string;
  sub?: string;
  gold?: boolean;
}

export default function PanchangCell({
  label,
  value,
  sub,
  gold,
}: PanchangCellProps) {
  return (
    <View
      className={`rounded-xl p-[11px] border ${
        gold
          ? "bg-surface dark:bg-surface-dark border-highlight"
          : "bg-surface dark:bg-surface-dark border-white/10"
      }`}
    >
      <SectionLabel variant={gold ? "gold" : "default"}>{label}</SectionLabel>
      <Text
        className={`font-heading text-[16px] text-text-primary-dark leading-[18px] ${
          sub ? "mb-[3px]" : ""
        }`}
      >
        {value}
      </Text>
      {sub ? (
        <Text className="font-ui text-[9.5px] text-white/30 leading-[13px]">
          {sub}
        </Text>
      ) : null}
    </View>
  );
}
