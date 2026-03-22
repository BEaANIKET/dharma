import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Text, View, ScrollView } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import SacredInput from "../ScaredInput";
import FloatingOm from "../FloatingOhm";
import TextButton from "../TextButton";
import SacredDateInput from "../SacredDateInput";

type StepAgeProps = {
  onNext: () => void;
  onBack: () => void;
};

const HEADING_TEXT = "when did your\nsoul arrive?";
const SUB_TEXT =
  "your birth moment shaped a rhythm —\n" +
  "the pattern your body and mind\n" +
  "have been moving with ever since.";

export default function StepAge({ onNext, onBack }: StepAgeProps) {
  const typingSoundRef = useRef<Audio.Sound | null>(null);
  const headingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const subTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [typedHeading, setTypedHeading] = useState("");
  const [typedSubText, setTypedSubText] = useState("");

  const dob = useOnboardingStore((s) => s.dateOfBirth);
  const setDob = useOnboardingStore((s) => s.setDateOfBirth);

  const city = useOnboardingStore((s) => s.city);
  const setCity = useOnboardingStore((s) => s.setCity);

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
    let hIdx = 0;
    let sIdx = 0;
    setTypedHeading("");
    setTypedSubText("");

    headingTimerRef.current = setInterval(() => {
      hIdx++;
      setTypedHeading(HEADING_TEXT.slice(0, hIdx));
      playTypeSound();

      if (hIdx >= HEADING_TEXT.length) {
        if (headingTimerRef.current) {
          clearInterval(headingTimerRef.current);
          headingTimerRef.current = null;
        }

        subTimerRef.current = setInterval(() => {
          sIdx++;
          setTypedSubText(SUB_TEXT.slice(0, sIdx));
          playTypeSound();

          if (sIdx >= SUB_TEXT.length && subTimerRef.current) {
            clearInterval(subTimerRef.current);
            subTimerRef.current = null;
          }
        }, 28);
      }
    }, 36);

    return () => {
      if (headingTimerRef.current) {
        clearInterval(headingTimerRef.current);
        headingTimerRef.current = null;
      }
      if (subTimerRef.current) {
        clearInterval(subTimerRef.current);
        subTimerRef.current = null;
      }
    };
  }, [playTypeSound]);

  return (
    <View className="flex-1 px-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexGrow: 1 }} />

        {/* Floating Dharma — sits just above content */}
        <View className="mb-4">
          <FloatingOm size={24} opacity={0.7} top={0} left={35} />
        </View>

        <View className="pb-16">

          {/* Step label */}
          <Text className="mb-8 text-xs uppercase tracking-[0.2em] font-ui text-accent-secondary dark:text-accent-secondary-dark opacity-70">
            step 2 of 2  ·  your origins
          </Text>

          {/* Heading */}
          <Text className="text-4xl leading-tight mb-4 font-headingMediumItalic text-text-primary dark:text-text-primary-dark">
            {typedHeading}
          </Text>

          <Text className="text-sm leading-relaxed mb-10 font-heading text-text-secondary dark:text-text-secondary-dark">
            {typedSubText}
          </Text>

          {/* DOB */}
          <View className="mb-8">

            <SacredDateInput
              label="DATE OF BIRTH"
              value={dob}
              onChange={setDob}
            />
          </View>

          {/* City */}
          <View className="mb-12">
            <SacredInput
              label="your city"
              value={city}
              onChangeText={setCity}
              placeholder="where do you live?"
              placeholderTextColor="#a8a4a0"
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

        <View style={{ flexGrow: 1 }} />
      </ScrollView>
    </View>
  );
}
