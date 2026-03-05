import { Animated, KeyboardAvoidingView, Platform, Text } from "react-native";
import PrimaryGlowButton from "@/components/onboarding/PrimaryGlowButton";
import SacredInput from "@/components/ScaredInput";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { colors } from "@/theme/colors";
import { onboardingPalette as C } from "@/theme/onboarding";

type WelcomeFormProps = {
  formOp: Animated.Value;
  formTY: Animated.Value;
  headOp: Animated.Value;
  headTY: Animated.Value;
  subOp: Animated.Value;
  subTY: Animated.Value;
  inputOp: Animated.Value;
  inputTY: Animated.Value;
  btnOp: Animated.Value;
  btnTY: Animated.Value;
  typedHeadline: string;
  typedSubText: string;
  serif: string;
  sans: string;
  onContinue: () => void;
};

export default function WelcomeForm({
  formOp,
  formTY,
  headOp,
  headTY,
  subOp,
  subTY,
  inputOp,
  inputTY,
  btnOp,
  btnTY,
  typedHeadline,
  typedSubText,
  serif,
  sans,
  onContinue,
}: WelcomeFormProps) {
  const phone = useOnboardingStore((s) => s.phone);
  const setPhone = useOnboardingStore((s) => s.setPhone);

  return (
    <Animated.View
      style={[
        { position: "absolute", left: 24, right: 24, bottom: 0, paddingBottom: 52 },
        { opacity: formOp, transform: [{ translateY: formTY }] },
      ]}
    >
      <Text className="mb-4 text-xs tracking-[3px]" style={{ color: C.goldOm, fontFamily: serif }}>
        ॐ  dharma
      </Text>

      <Animated.Text
        className="mb-[18px] text-4xl italic leading-[46px]"
        style={{
          opacity: headOp,
          transform: [{ translateY: headTY }],
          color: C.white90,
          fontFamily: serif,
        }}
      >
        {typedHeadline}
      </Animated.Text>

      <Animated.View className="mb-4 h-px w-8" style={{ opacity: headOp, backgroundColor: C.goldFaint }} />

      <Animated.Text
        className="mb-8 text-[15px] italic leading-[25px]"
        style={{
          opacity: subOp,
          transform: [{ translateY: subTY }],
          color: C.white30,
          fontFamily: serif,
        }}
      >
        {typedSubText}
      </Animated.Text>

      <Animated.View
        style={[
          { width: "100%" },
          { opacity: inputOp, transform: [{ translateY: inputTY }] },
        ]}
      >
        <SacredInput
          label="mobile number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={15}
          placeholder="+91 XXXXX XXXXX"
          placeholderTextColor={C.white18}
          selectionColor={C.goldLabel}
          labelColor={C.goldLabel}
          activeLabelColor={C.goldOm}
          textColor={C.white90}
          underlineColor={C.goldLabel}
          underlineBaseColor={C.white06}
          errorColor={colors.accentRose}
        />
      </Animated.View>

      <Animated.View
        style={[
          { marginTop: 24 },
          { opacity: btnOp, transform: [{ translateY: btnTY }] },
        ]}
      >
        <PrimaryGlowButton
          label="continue →"
          onPress={onContinue}
          disabled={phone.trim().length < 7}
        />
        <Text
          className="mt-[18px] text-center text-[11px] leading-[18px] tracking-[0.4px]"
          style={{ color: C.privacy, fontFamily: sans }}
        >
          ∴  your data is sacred · encrypted · never sold
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
