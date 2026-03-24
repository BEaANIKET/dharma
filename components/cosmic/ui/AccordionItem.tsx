import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface AccordionItemProps {
  icon?: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  icon,
  title,
  sub,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View className="border-b border-white/[0.08]">
      <Pressable
        onPress={() => setOpen((o) => !o)}
        className="flex-row items-center gap-2.5 py-[11px]"
      >
        {icon ? <Text className="text-[15px]">{icon}</Text> : null}
        <View className="flex-1">
          <Text className="font-uiMedium text-[13px] text-text-primary-dark">
            {title}
          </Text>
          {sub ? (
            <Text className="font-ui text-[9.5px] text-white/30 mt-[1px]">
              {sub}
            </Text>
          ) : null}
        </View>
        <Text
          className="text-[10px] text-white/30"
          style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
        >
          ⌄
        </Text>
      </Pressable>
      {open ? <View className="pb-3">{children}</View> : null}
    </View>
  );
}
