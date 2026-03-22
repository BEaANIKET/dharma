import { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";

import GradientBackground from "@/components/GradientBackground";
import StepAge from "@/components/onboarding/StepAge";
import StepComplete from "@/components/onboarding/StepComplete";
import StepName from "@/components/onboarding/StepName";

export default function OnboardingDetails() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <View className="flex-1">
            {step === 0 && <StepName onNext={next} />}
            {step === 1 && <StepAge onNext={next} onBack={back} />}
            {/* {step === 2 && <StepGender onNext={next} onBack={back} />} */}
            {step === 2 && <StepComplete />}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
}
