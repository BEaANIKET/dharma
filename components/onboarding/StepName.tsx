import {
  Text,
  View,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import SacredInput from "../ScaredInput";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import TextButton from "../TextButton";
import FloatingOm from "../FloatingOhm";

type StepNameProps = {
  onNext: () => void;
};

export default function StepName({ onNext }: StepNameProps) {
  const headingText = "what shall the\ncosmos call you?";
  const typingSoundRef = useRef<Audio.Sound | null>(null);
  const headingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [typedHeading, setTypedHeading] = useState("");

  const scrollRef = useRef<ScrollView>(null);
  const emailY = useRef(0);
  const nameY = useRef(0);

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

  const onNameChange = useCallback((value: string) => setName(value), [setName]);
  const onEmailChange = useCallback((value: string) => setEmail(value), [setEmail]);

  const scrollToY = (y: number) => {
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 24), animated: true });
  };

  return (
    <View className="flex-1">
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={{ flexGrow: 1 }} />

        {/* ── Watermark ॐ — sits just above the content ── */}
        <View className=" mb-4">
          <FloatingOm size={24} opacity={0.7} top={0} left={35} />
        </View>

        <View className="pb-16">

          {/* Step label */}
          <Text className="mb-8 text-xs uppercase tracking-[0.2em] font-ui text-accent-secondary dark:text-accent-secondary-dark opacity-70">
            step 1 of 2  ·  your identity
          </Text>

          {/* Quote block */}
          <View
            style={{
              marginBottom: 28,
              paddingLeft: 14,
              borderLeftWidth: 2,
              borderLeftColor: "rgba(155, 142, 196, 0.3)",
            }}
          >
            <Text className="text-sm italic leading-relaxed mb-2 font-headingItalic text-text-secondary dark:text-text-secondary-dark">
              {`"नामरूप — name and form —\nis the root of all existence."`}
            </Text>
            <Text className="text-xs uppercase tracking-widest font-ui text-accent-secondary-dark">
              Vedic philosophy
            </Text>
          </View>

          {/* Heading */}
          <Text className="text-4xl leading-tight mb-10 font-headingMediumItalic text-text-primary dark:text-text-primary-dark">
            {typedHeading}
          </Text>

          {/* Name input */}
          <View
            onLayout={(e) => { nameY.current = e.nativeEvent.layout.y; }}
          >
            <SacredInput
              label="your name"
              value={name}
              onChangeText={onNameChange}
              placeholder="Full name"
              placeholderTextColor="#a8a4a0"
              onFocus={() => scrollToY(nameY.current)}
              returnKeyType="next"
            />
          </View>

          {/* Email input */}
          <View
            onLayout={(e) => { emailY.current = e.nativeEvent.layout.y; }}
          >
            <SacredInput
              label="your email"
              value={email}
              onChangeText={onEmailChange}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#a8a4a0"
              onFocus={() => scrollToY(emailY.current)}
              returnKeyType="done"
            />
          </View>

          {/* Continue */}
          <View className="items-end mt-4">
            <TextButton
              label="continue"
              onPress={onNext}
              disabled={!valid}
            />
          </View>

        </View>

        <View style={{ flexGrow: 1 }} />
      </ScrollView>
    </View>
  );
}
