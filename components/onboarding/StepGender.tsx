import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Text, View } from "react-native";
import GenderPills from "./GenderPills";
import PrimaryGlowButton from "./PrimaryGlowButton";

type StepGenderProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function StepGender({ onNext, onBack }: StepGenderProps) {
  const gender = useOnboardingStore((s) => s.gender);
  const setGender = useOnboardingStore((s) => s.setGender);

  return (
    <View className="flex-1 px-6 justify-center">
      <Text
        className="text-3xl italic leading-tight mb-10 font-heading text-text-primary dark:text-text-primary-dark"
      >
        how does your{"\n"}energy express?
      </Text>

      <GenderPills value={gender} onChange={setGender} />

      <View className="flex-row justify-between mt-10">
        <Text onPress={onBack} className="font-ui text-secondary-dark">
          ← back
        </Text>

        <PrimaryGlowButton
          label="continue →"
          onPress={onNext}
          disabled={!gender}
        />
      </View>
    </View>
  );
}
