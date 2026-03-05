import {
  Text,
  View,
  Platform,
  ScrollView,
} from "react-native";
import SacredInput from "../ScaredInput";
import PrimaryGlowButton from "./PrimaryGlowButton";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import FloatingOm from "../FloatingOhm";
import { colors } from "@/theme/colors";
import TextButton from "../TextButton";

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";
const SANS = Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif";

type StepNameProps = {
  onNext: () => void;
};

export default function StepName({ onNext }: StepNameProps) {
  const name = useOnboardingStore((s) => s.name);
  const setName = useOnboardingStore((s) => s.setName);

  const email = useOnboardingStore((s) => s.email);
  const setEmail = useOnboardingStore((s) => s.setEmail);

  const valid =
    name.trim().length > 1 &&
    email.trim().length > 4 &&
    email.includes("@");

  return (
    <View className="flex-1 px-6 justify-center">

      <View className=" ml-3 mt-16 ">
        <FloatingOm size={24} opacity={0.7} top={80} left={35} />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center z-10 pt-24 pb-24">
          {/* Quote */}
          <View className="mb-8 pl-4 border-l border-onboardingGoldFaint">
            <Text
              className="text-[13px] italic leading-6 mb-3 text-onboardingWhite30"
              style={{ fontFamily: SERIF }}
            >
              “नामरूप — name and form —{"\n"}
              is the root of all existence.”
            </Text>

            <Text
              className="text-[10px] uppercase tracking-[2px] text-onboardingVerseLabel"
              style={{ fontFamily: SANS }}
            >
              Vedic philosophy
            </Text>
          </View>

          {/* Heading */}
          <Text
            className="text-[34px] leading-[42px] mb-12 text-onboardingWhite90"
            style={{ fontFamily: SERIF }}
          >
            what shall the{"\n"}cosmos call you?
          </Text>

          {/* Name */}
          <View className="mb-8 text-primarySoft">
            <SacredInput
              label="your name"
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor={colors.onboardingWhite18}
              labelColor={colors.onboardingGoldLabel}
              activeLabelColor={colors.primary}
              textColor={colors.onboardingWhite90}
              underlineColor={colors.primary}
              underlineBaseColor={colors.onboardingWhite06}
            />
          </View>

          {/* Email */}
          <View className="mb-12">
            <SacredInput
              label="your email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.onboardingWhite18}
              labelColor={colors.onboardingGoldLabel}
              activeLabelColor={colors.primary}
              textColor={colors.onboardingWhite90}
              underlineColor={colors.primary}
              underlineBaseColor={colors.onboardingWhite06}
            />
          </View>

          {/* <PrimaryGlowButton
            label="continue →"
            onPress={onNext}
            disabled={!valid}
          /> */}
          <View className=" p-1 items-end">
            <TextButton
              label="continue"
              onPress={onNext}
            />
          </View>


        </View>
      </ScrollView>
    </View>
  );
}
