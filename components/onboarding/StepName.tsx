import {
  Text,
  View,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import SacredInput from "../ScaredInput";
import PrimaryGlowButton from "./PrimaryGlowButton";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import FloatingOm from "../FloatingOhm";
import { colors } from "@/theme/colors";
import TextButton from "../TextButton";
import { typography } from "@/theme/typography";

type StepNameProps = {
  onNext: () => void;
};

export default function StepName({ onNext }: StepNameProps) {
  const headingText = "what shall the\ncosmos call you?";
  const typingSoundRef = useRef<Audio.Sound | null>(null);
  const headingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [typedHeading, setTypedHeading] = useState("");
  const name = useOnboardingStore((s) => s.name);
  const setName = useOnboardingStore((s) => s.setName);

  const email = useOnboardingStore((s) => s.email);
  const setEmail = useOnboardingStore((s) => s.setEmail);

  const valid =
    name.trim().length > 1 &&
    email.trim().length > 4 &&
    email.includes("@");

  useEffect(() => {
    let snd: Audio.Sound | null = null;
    Audio.Sound.createAsync(
      require("../../assets/sfx/mixkit-single-key-type-2533.wav"),
      { volume: 0.25 },
    )
      .then(({ sound }) => {
        snd = sound;
        typingSoundRef.current = sound;
      })
      .catch(() => { });

    return () => {
      snd?.unloadAsync().catch(() => { });
      typingSoundRef.current = null;
    };
  }, []);

  const playTypeSound = useCallback(() => {
    typingSoundRef.current?.replayAsync().catch(() => { });
  }, []);

  useEffect(() => {
    let idx = 0;
    setTypedHeading("");

    headingTimerRef.current = setInterval(() => {
      idx++;
      setTypedHeading(headingText.slice(0, idx));
      playTypeSound();

      if (idx >= headingText.length && headingTimerRef.current) {
        clearInterval(headingTimerRef.current);
        headingTimerRef.current = null;
      }
    }, 38);

    return () => {
      if (headingTimerRef.current) {
        clearInterval(headingTimerRef.current);
        headingTimerRef.current = null;
      }
    };
  }, [headingText, playTypeSound]);

  const onNameChange = useCallback((value: string) => {
    setName(value);
  }, [playTypeSound, setName]);

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, [playTypeSound, setEmail]);

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
        <View className="flex-1 justify-center z-10 pt-0 pb-24">
          {/* Quote */}
          <View className="mb-8 pl-4 border-l border-onboardingGoldFaint">
            <Text
              className="text-[13px] italic leading-6 mb-3 text-onboardingWhite30"
              style={[typography.quote, typography.devanagari]}
            >
              “नामरूप — name and form —{"\n"}
              is the root of all existence.”
            </Text>

            <Text
              className="text-[10px] uppercase tracking-[2px] text-onboardingVerseLabel"
              style={typography.label}
            >
              Vedic philosophy
            </Text>
          </View>

          {/* Heading */}
          <Text
            className="text-[34px] leading-[42px] mb-12 text-onboardingWhite90"
            style={typography.heading}
          >
            {typedHeading}
          </Text>

          {/* Name */}
          <View className="mb-8 text-primarySoft">
            <SacredInput
              label="your name"
              value={name}
              onChangeText={onNameChange}
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
              onChangeText={onEmailChange}
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
