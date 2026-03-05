import { useState } from "react";
import {
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import StepName from "@/components/onboarding/StepName";
import StepAge from "@/components/onboarding/StepAge";
import StepGender from "@/components/onboarding/StepGender";
import StepComplete from "@/components/onboarding/StepComplete";

export default function OnboardingDetails() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <SafeAreaView className="flex-1 bg-onboardingBg">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View className="flex-1">
          {step === 0 && <StepName onNext={next} />}
          {step === 1 && <StepAge onNext={next} onBack={back} />}
          {/* {step === 2 && <StepGender onNext={next} onBack={back} />} */}
          {step === 2 && <StepComplete />}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
