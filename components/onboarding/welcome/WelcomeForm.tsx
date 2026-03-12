import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
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
  otp: string;
  setOtp: (value: string) => void;
  otpSent: boolean;
  isLoading: boolean;
  error: string | null;
  onRequestOtp: () => void;
  onVerifyOtp: () => void;
  onEditPhone: () => void;
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
  otp,
  setOtp,
  otpSent,
  isLoading,
  error,
  onRequestOtp,
  onVerifyOtp,
  onEditPhone,
}: WelcomeFormProps) {
  const phone = useOnboardingStore((s) => s.phone);
  const setPhone = useOnboardingStore((s) => s.setPhone);
  const otpReveal = useRef(new Animated.Value(otpSent ? 1 : 0)).current;
  const canRequestOtp = phone.trim().length >= 7;
  const canVerifyOtp = otpSent && otp.trim().length >= 4;

  useEffect(() => {
    Animated.timing(otpReveal, {
      toValue: otpSent ? 1 : 0,
      duration: 260,
      useNativeDriver: false,
    }).start();
  }, [otpReveal, otpSent]);

  const otpContainerStyle = {
    opacity: otpReveal,
    maxHeight: otpReveal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 96],
    }),
    transform: [
      {
        translateY: otpReveal.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  } as const;

  return (
    <Animated.View
      style={[
        { position: "absolute", left: 24, right: 24, bottom: 0, paddingBottom: 52 },
        { opacity: formOp, transform: [{ translateY: formTY }] },
      ]}
    >
      <Text className="mb-4 text-xs tracking-widest font-heading" style={{ color: C.goldOm }}>
        ॐ  dharma
      </Text>

      <Animated.Text
        className="mb-[18px] text-3xl italic leading-tight font-headingItalic"
        style={{
          opacity: headOp,
          transform: [{ translateY: headTY }],
          color: C.white90,
        }}
      >
        {typedHeadline}
      </Animated.Text>

      <Animated.View className="mb-4 h-px w-8" style={{ opacity: headOp, backgroundColor: C.goldFaint }} />

      <Animated.Text
        className="mb-8 text-base italic leading-relaxed font-headingItalic"
        style={{
          opacity: subOp,
          transform: [{ translateY: subTY }],
          color: C.white30,
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
        <View>
          <View className="mb-2 flex-row items-center justify-between">
            {otpSent ? (
              <Pressable onPress={onEditPhone} className="rounded-full border px-3 py-1" style={{ borderColor: C.white18 }}>
                <Text className="text-xs tracking-wide font-ui" style={{ color: C.white30 }}>
                  edit
                </Text>
              </Pressable>
            ) : (
              <View />
            )}
          </View>

          <View style={{ opacity: otpSent ? 0.82 : 1 }}>
            <SacredInput
              label="mobile number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={15}
              editable={!otpSent}
              prefixText="+91"
              prefixColor={C.white30}
              placeholder="98765 43210"
              placeholderTextColor={C.white18}
              selectionColor={C.goldLabel}
              labelColor={C.goldLabel}
              activeLabelColor={C.goldOm}
              textColor={C.white90}
              underlineColor={C.goldLabel}
              underlineBaseColor={C.white06}
              errorColor={colors.accentRose}
            />
          </View>

          <Animated.View style={[{ overflow: "hidden" }, otpContainerStyle]}>
            <SacredInput
              label="otp"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={8}
              placeholder="123456"
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
        </View>
      </Animated.View>

      {error ? (
        <Text className="mt-4 text-sm font-ui" style={{ color: colors.accentRose }}>
          {error}
        </Text>
      ) : null}

      <Animated.View
        style={[
          { marginTop: 24 },
          { opacity: btnOp, transform: [{ translateY: btnTY }] },
        ]}
      >
        <PrimaryGlowButton
          label={
            otpSent
              ? isLoading
                ? "verifying..."
                : "continue →"
              : isLoading
                ? "sending..."
                : "send otp →"
          }
          onPress={otpSent ? onVerifyOtp : onRequestOtp}
          disabled={otpSent ? !canVerifyOtp || isLoading : !canRequestOtp || isLoading}
        />
        <Text
          className="mt-4xl text-center text-xs leading-relaxed tracking-wide font-ui"
          style={{ color: C.privacy }}
        >
          ∴  your data is sacred · encrypted · never sold
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
