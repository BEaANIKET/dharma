import PrimaryGlowButton from "@/components/onboarding/PrimaryGlowButton";
import SacredInput from "@/components/ScaredInput";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

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
        {
          paddingHorizontal: 24,
          paddingBottom: 52,
          flexGrow: 1,
        },
        { opacity: formOp, transform: [{ translateY: formTY }] },
      ]}
    >
      {/* Spacer pushes form to bottom — unlike justifyContent flex-end,
          this gives ScrollView real content height to scroll */}
      <View style={{ flexGrow: 1 }} />
      <Text className="mb-4 text-xs uppercase tracking-[0.2em] font-ui text-highlight dark:text-highlight-dark">
        ॐ  mydharma
      </Text>

      <Animated.Text
        className="mb-[18px] text-5xl leading-tight font-headingMediumItalic text-text-primary dark:text-text-primary-dark"
        style={{
          opacity: headOp,
          transform: [{ translateY: headTY }],
        }}
      >
        {typedHeadline}
      </Animated.Text>
      <Animated.Text className="absolute" style={{ opacity: 0 }} />

      <Animated.View className="mb-4 h-px w-8 bg-border dark:bg-border-dark" style={{ opacity: headOp }} />

      <Animated.Text
        className="mb-8 text-sm leading-relaxed font-heading text-text-secondary dark:text-text-secondary-dark"
        style={{
          opacity: subOp,
          transform: [{ translateY: subTY }],
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
          {/* Label row — inline with edit button */}
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-xs uppercase tracking-widest font-ui text-accent-secondary dark:text-accent-secondary-dark">
              mobile number
            </Text>
            {otpSent && (
              <Pressable
                onPress={onEditPhone}
                className="rounded-full border border-border dark:border-border-dark px-3 py-1"
              >
                <Text className="text-xs tracking-wide font-ui text-text-secondary dark:text-text-secondary-dark">
                  edit
                </Text>
              </Pressable>
            )}
          </View>

          <View style={{ opacity: otpSent ? 0.7 : 1 }}>
            <SacredInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={15}
              editable={!otpSent}
              prefixText="+91"
              placeholder="98765 43210"
              placeholderTextColor="#6b6878"
              selectionColor="#D4960A"
            />
          </View>

          <Animated.View style={[{ overflow: "hidden" }, otpContainerStyle]}>
            <Text className="mb-2 text-xs uppercase tracking-widest font-ui text-accent-secondary dark:text-accent-secondary-dark">
              one-time password
            </Text>
            <SacredInput
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={8}
              placeholder="123456"
              placeholderTextColor="#6b6878"
              selectionColor="#D4960A"
            />
          </Animated.View>
        </View>
      </Animated.View>

      {error ? (
        <Text className="mt-4 text-sm font-ui text-error dark:text-error-dark">
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
          className="mt-4 text-center text-xs leading-relaxed tracking-wide font-ui text-text-secondary dark:text-text-secondary-dark"
        >
          ∴  your data is sacred · encrypted · never sold
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
