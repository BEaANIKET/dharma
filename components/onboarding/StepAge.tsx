import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Platform, Text, View, ScrollView } from "react-native";
import SacredInput from "../ScaredInput";
import FloatingOm from "../FloatingOhm";
import TextButton from "../TextButton";
import { colors } from "@/theme/colors";
import SacredDateInput from "../SacredDateInput";

type StepAgeProps = {
  onNext: () => void;
  onBack: () => void;
};

const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";

export default function StepAge({ onNext, onBack }: StepAgeProps) {

  const dob = useOnboardingStore((s) => s.dateOfBirth);
  const setDob = useOnboardingStore((s) => s.setDateOfBirth);

  const city = useOnboardingStore((s) => s.city);
  const setCity = useOnboardingStore((s) => s.setCity);

  return (
    <View className="flex-1 px-6 justify-center">

      {/* Floating Dharma */}
      <View className="ml-3 mt-16">
        <FloatingOm size={24} opacity={0.7} top={80} left={35} />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center pt-24 pb-24">

          {/* Heading */}
          <Text
            className="text-[34px] leading-[42px] mb-4 text-onboardingWhite90"
            style={{ fontFamily: SERIF }}
          >
            when did your{"\n"}soul arrive?
          </Text>

          <Text
            className="text-[13px] leading-6 mb-12 text-onboardingWhite30"
          >
            your birth moment shaped a rhythm —
            the pattern your body and mind
            have been moving with ever since.
          </Text>

          {/* DOB */}
          <View className="mb-8">

            <SacredDateInput
              label="DATE OF BIRTH"
              value={dob}
              onChange={setDob}
              labelColor={colors.onboardingGoldLabel}
              activeLabelColor={colors.primary}
              textColor={colors.onboardingWhite90}
              underlineColor={colors.primary}
              underlineBaseColor={colors.onboardingWhite10}
            />
          </View>

          {/* City */}
          <View className="mb-12">
            <SacredInput
              label="your city"
              value={city}
              onChangeText={setCity}
              placeholder="where do you live?"
              placeholderTextColor={colors.onboardingWhite18}
              labelColor={colors.onboardingGoldLabel}
              activeLabelColor={colors.primary}
              textColor={colors.onboardingWhite90}
              underlineColor={colors.primary}
              underlineBaseColor={colors.onboardingWhite06}
            />
          </View>

          {/* Buttons */}
          <View className="flex-row justify-between items-center">

            <TextButton
              label="back"
              direction="back"
              onPress={onBack}
            />

            <TextButton
              label="continue"
              // disabled={!valid}
              onPress={onNext}
            />

          </View>

        </View>
      </ScrollView>
    </View>
  );
}