import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PD } from "@/components/cosmic/panchangData";

import SacredSeal from "./SacredSeal";
import {
  CardCaution,
  CardGuide,
  CardMoment,
  CardPanchang,
  CardScore,
  CardVibe,
} from "./cards";
import LibraryCard from "./LibraryCard";
import { CARD_DEFS, CardDef, LIBRARY_CARDS } from "./data";

const { width: SCREEN_W } = Dimensions.get("window");
const CARD_H_PAD = 9; // horizontal padding around each card sheet

function CardContent({ cardKey }: { cardKey: string }) {
  switch (cardKey) {
    case "vibe":
      return <CardVibe />;
    case "score":
      return <CardScore />;
    case "moment":
      return <CardMoment />;
    case "caution":
      return <CardCaution />;
    case "guide":
      return <CardGuide />;
    case "panchang":
      return <CardPanchang />;
    default:
      return null;
  }
}

export default function ExploreContent() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [absorbed, setAbsorbed] = useState<Set<number>>(new Set([0]));
  const [listHeight, setListHeight] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const idx = viewableItems[0].index ?? 0;
        setCurrentIdx(idx);
        setAbsorbed((prev) => {
          if (prev.has(idx)) return prev;
          return new Set([...prev, idx]);
        });
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const goto = (idx: number) => {
    flatListRef.current?.scrollToIndex({ index: idx, animated: true });
  };

  const getItemLayout = (_: unknown, index: number) => ({
    length: SCREEN_W,
    offset: SCREEN_W * index,
    index,
  });

  const onListAreaLayout = (e: LayoutChangeEvent) => {
    setListHeight(e.nativeEvent.layout.height);
  };

  const renderCard = ({ item }: { item: CardDef }) => (
    <View
      style={{
        width: SCREEN_W,
        height: listHeight,
        paddingHorizontal: CARD_H_PAD,
      }}
    >
      {/* ── Card Sheet ── */}
      <View className="flex-1 bg-surface-dark rounded-[22px] border border-white/[0.07] overflow-hidden">
        {/* Card Header */}
        <View className="flex-row items-center gap-2.5 px-5 pt-4 pb-2.5">
          <View className="w-[38px] h-[38px] rounded-[12px] bg-highlight/10 items-center justify-center">
            <Text className="text-[18px]">{item.icon}</Text>
          </View>
          <View className="flex-1">
            <Text className="font-headingMedium text-[20px] text-text-primary dark:text-text-primary-dark leading-[22px]">
              {item.title}
            </Text>
            <Text className="font-ui text-[10.5px] text-text-secondary dark:text-text-secondary-dark mt-[1px]">
              {item.sub}
            </Text>
          </View>
        </View>

        {/* Card Content — vertically scrollable */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <CardContent cardKey={item.key} />
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* ── Top row ── */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-1">
        <View>
          <Text className="font-headingBold text-[26px] text-text-primary dark:text-text-primary-dark leading-[28px]">
            Cosmic Digest
          </Text>
          <Text className="font-ui text-[11px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
            {PD.date} · {PD.vara}
          </Text>
        </View>
        <SacredSeal absorbed={absorbed} />
      </View>

      {/* ── Progress bars (story-style) ── */}
      {/* <View className="flex-row gap-[2px] px-5 pb-2.5">
        {CARD_DEFS.map((_, i) => (
          <View
            key={i}
            className="flex-1 h-[2.5px] rounded-sm"
            style={{
              backgroundColor: absorbed.has(i)
                ? "#D4960A"
                : i === currentIdx
                  ? "rgba(200,148,58,0.45)"
                  : "rgba(255,255,255,0.07)",
            }}
          />
        ))}
      </View> */}

      {/* ── Swipeable cards area ── */}
      <View className="flex-1" onLayout={onListAreaLayout}>
        {listHeight > 0 && (
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={CARD_DEFS}
            keyExtractor={(item) => item.key}
            renderItem={renderCard}
            getItemLayout={getItemLayout}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            style={{ height: listHeight }}
          />
        )}
      </View>

      {/* ── Dot indicators ── */}
      <View className="flex-row justify-center items-center gap-[5px] pt-2.5 pb-1">
        {CARD_DEFS.map((_, i) => (
          <Pressable key={i} onPress={() => goto(i)}>
            <View
              className="h-[6px] rounded-full"
              style={{
                width: i === currentIdx ? 18 : 6,
                backgroundColor:
                  i === currentIdx
                    ? "#D4960A"
                    : absorbed.has(i)
                      ? "rgba(200,148,58,0.5)"
                      : "rgba(255,255,255,0.12)",
              }}
            />
          </Pressable>
        ))}
      </View>

      {/* ── Dharma Library ── */}
      <View className="px-5 pt-2.5">
        <Text className="text-[9px] tracking-[1.2px] uppercase font-uiSemiBold text-white/30 mb-1.5">
          YOUR DHARMA
        </Text>
        <Text className="font-heading text-[20px] text-text-primary dark:text-text-primary-dark mb-3">
          Library
        </Text>
      </View>
      <View
        className="px-5"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        {LIBRARY_CARDS.map((card) => (
          <LibraryCard
            key={card.id}
            card={card}
            isOpen={expanded === card.id}
            onToggle={() =>
              setExpanded((e) => (e === card.id ? null : card.id))
            }
          />
        ))}
      </View>
    </View>
  );
}
