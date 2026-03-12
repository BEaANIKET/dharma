import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import GradientBackground from "@/components/GradientBackground";
import DharmaHeader from "@/components/DharmaHeader";
import { useMoodStore } from "@/store/useMoodStore";
import { moodMap } from "@/constants/moodThemes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedCard from "@/components/ThemedCard";

export default function Practices() {

  const selectedMood = useMoodStore((state) => state.selectedMood);
  const selectedTheme = selectedMood ? moodMap[selectedMood] : null;
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <ScrollView
        className="flex-1 px-5 pt-16"
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false} >
        <DharmaHeader />

        <Text className=" text-textSecondary text-xl py-2 ">Generated for you . just now</Text>

        <ThemedCard theme={selectedTheme}>
          <View className="flex-row items-center">
            <Text className="mr-4 text-3xl">
              {selectedTheme?.emoji}
            </Text>

            <View className=" flex-col ">
              <Text style={{ color: selectedTheme?.accent }} className=" text- ">
                {selectedMood}
              </Text>
              <Text className=" text-textSecondary flex-1 leading-7">
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
              </Text>

            </View>
          </View>
        </ThemedCard>

        <ThemedCard
          className="mt-6 rounded-3xl border border-white/5 p-6 flex-row items-center"
        >
          {/* Score Circle */}
          <View className="w-16 h-16 rounded-full border border-white/10 items-center justify-center mr-5">
            <Text className="text-white text-base font-medium">
              0
            </Text>

            <Text className="text-white/40 text-xs mt-1">
              of 4
            </Text>
          </View>

          {/* Text Section */}
          <View className="flex-1">
            <Text className="text-white text-lg font-medium mb-1">
              Begin your practice
            </Text>

            <Text className="text-white/40 text-sm">
              Tap any card below
            </Text>
          </View>
        </ThemedCard>

        <ThemedCard
          className="mt-6"
          padding={false}
        >
          <View className="p-6">
            {/* Header */}
            <View className="flex-row items-center mb-4">
              <Text className="mr-2 text-lg">📖</Text>
              <Text className="text-yellow-500 tracking-widest text-xs">
                BHAGAVAD GITA 2.47
              </Text>
            </View>

            {/* Sanskrit */}
            <Text className="text-white/70 text-lg mb-4 leading-7">
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
            </Text>

            {/* English Translation */}
            <Text className="text-white text-xl leading-8 mb-6">
              "You have a right to perform your prescribed duties,
              but you are not entitled to the fruits of your actions."
            </Text>

            {/* Commentary Section */}
            <View className="flex-row">

              {/* Golden Left Line */}
              <View className="w-[2px] bg-yellow-500 mr-4 rounded-full" />

              {/* Commentary Text */}
              <Text className="text-white/60 italic flex-1 leading-7">
                Mercury retrograde today pulls your mind toward outcomes.
                The Gita answers: act with full heart, release the result.
                Your anxiety about what happens next is the battlefield.
              </Text>
            </View>

          </View>
        </ThemedCard>

        <ThemedCard
          className="mt-6"
          padding={false}
        >
          <View className="p-6">
            {/* Header */}
            <View className="flex-row items-center mb-4">
              <Text className="mr-2 text-lg">📖</Text>
              <Text className="text-yellow-500 tracking-widest text-xs">
                BHAGAVAD GITA 2.47
              </Text>
            </View>

            {/* Sanskrit */}
            <Text className="text-white/70 text-lg mb-4 leading-7">
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
            </Text>

            {/* English Translation */}
            <Text className="text-white text-xl leading-8 mb-6">
              "You have a right to perform your prescribed duties,
              but you are not entitled to the fruits of your actions."
            </Text>

            {/* Commentary Section */}
            <View className="flex-row">

              {/* Golden Left Line */}
              <View className="w-[2px] bg-yellow-500 mr-4 rounded-full" />

              {/* Commentary Text */}
              <Text className="text-white/60 italic flex-1 leading-7">
                Mercury retrograde today pulls your mind toward outcomes.
                The Gita answers: act with full heart, release the result.
                Your anxiety about what happens next is the battlefield.
              </Text>
            </View>

          </View>
        </ThemedCard>

      </ScrollView>
    </GradientBackground >
  );
}
