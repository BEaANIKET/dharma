import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import CosmicBackground from "@/components/onboarding/CosmicBackground";
import WelcomeVideoLayer from "@/components/onboarding/welcome/WelcomeVideoLayer";
import WelcomeVerseOverlay from "@/components/onboarding/welcome/WelcomeVerseOverlay";
import WelcomeForm from "@/components/onboarding/welcome/WelcomeForm";
import WelcomeSkipButton from "@/components/onboarding/welcome/WelcomeSkipButton";
import {
  onboardingFormCopy,
  onboardingPalette as C,
  onboardingTimings,
  onboardingVerses as VERSES,
} from "@/theme/onboarding";

const {
  INTRO_MAX_MS,
  TYPE_SPEED_MS,
  VERSE_HOLD_MS,
  VERSE_FADE_MS,
  VIDEO_FADE_MS,
  OVERLAY_OUT_MS,
  FORM_DRIFT_MS,
  FORM_EASE_DELAY,
  STAGGER,
} = onboardingTimings;

/* ─── Phase ───────────────────────────────────────────────────── */
type Phase = "video" | "ending" | "form";

export default function OnboardingWelcome() {
  const insets = useSafeAreaInsets();

  /* ── Refs: imperative handles ── */
  const videoRef = useRef<Video | null>(null);
  const typingSoundRef = useRef<Audio.Sound | null>(null);
  const volTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasEnded = useRef(false);

  /* ── State ── */
  const [phase, setPhase] = useState<Phase>("video");
  const [verseIdx, setVerseIdx] = useState(0);
  const [typedText, setTypedText] = useState("");

  const [typedHeadline, setTypedHeadline] = useState("");
  const [typedSubText, setTypedSubText] = useState("");

  /* ── Animated values ── */

  // Video layer
  const videoOpacity = useRef(new Animated.Value(1)).current;

  // Verse overlay
  const overlayOp = useRef(new Animated.Value(1)).current; // whole overlay
  const labelOp = useRef(new Animated.Value(1)).current;
  const verseTextOp = useRef(new Animated.Value(1)).current; // cross-fade between verses

  // Film strips
  const stripOp = useRef(new Animated.Value(0)).current;

  // Form container envelope
  const formOp = useRef(new Animated.Value(0)).current;
  const formTY = useRef(new Animated.Value(48)).current;

  // Black cinematic fade layer (covers everything during transition)
  const blackFade = useRef(new Animated.Value(0)).current;

  // Individual form rows — each has opacity + translateY
  const headOp = useRef(new Animated.Value(0)).current;
  const headTY = useRef(new Animated.Value(22)).current;
  const subOp = useRef(new Animated.Value(0)).current;
  const subTY = useRef(new Animated.Value(22)).current;
  const inputOp = useRef(new Animated.Value(0)).current;
  const inputTY = useRef(new Animated.Value(22)).current;
  const btnOp = useRef(new Animated.Value(0)).current;
  const btnTY = useRef(new Animated.Value(22)).current;

  /* ── Helper: ease-out cubic timing ── */
  const easeOut = (
    val: Animated.Value,
    toValue: number,
    duration: number,
    delay = 0,
  ): Animated.CompositeAnimation =>
    Animated.timing(val, {
      toValue, duration, delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

  const easeIn = (
    val: Animated.Value,
    toValue: number,
    duration: number,
    delay = 0,
  ): Animated.CompositeAnimation =>
    Animated.timing(val, {
      toValue, duration, delay,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    });

  /* ── Gradually reduce video volume ── */
  const fadeVolume = useCallback((durationMs: number) => {
    const start = Date.now();

    volTimerRef.current = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / durationMs);

      // Ease-out curve (cinematic)
      const eased = 1 - Math.pow(t, 2);

      videoRef.current?.setStatusAsync({ volume: eased }).catch(() => { });

      if (t >= 1) {
        clearInterval(volTimerRef.current!);
        volTimerRef.current = null;
      }
    }, 60); // smoother interval
  }, []);
  /* ── Stop typing timers ── */
  const stopTyping = useCallback(() => {
    if (typingRef.current) { clearInterval(typingRef.current); typingRef.current = null; }
    if (holdRef.current) { clearTimeout(holdRef.current); holdRef.current = null; }
  }, []);

  /* ── Type a verse then schedule next ── */
  const startVerse = useCallback(
    (idx: number) => {
      stopTyping();
      const verse = VERSES[idx % VERSES.length];
      setTypedText("");

      let charIdx = 0;

      typingRef.current = setInterval(() => {
        charIdx++;
        setTypedText(verse.text.slice(0, charIdx));

        // 🔊 Play typing sound correctly
        if (typingSoundRef.current) {
          typingSoundRef.current
            .replayAsync()
            .catch(() => { });
        }

        // Optional haptic (safe)
        Haptics.impactAsync(
          Haptics.ImpactFeedbackStyle.Light
        ).catch(() => { });

        if (charIdx >= verse.text.length) {
          clearInterval(typingRef.current!);
          typingRef.current = null;

          holdRef.current = setTimeout(() => {
            Haptics.impactAsync(
              Haptics.ImpactFeedbackStyle.Medium
            ).catch(() => { });

            easeIn(verseTextOp, 0, VERSE_FADE_MS).start(() => {
              setVerseIdx((prev) => {
                easeOut(verseTextOp, 1, VERSE_FADE_MS).start();
                return (prev + 1) % VERSES.length;
              });
            });
          }, VERSE_HOLD_MS);
        }
      }, TYPE_SPEED_MS);
    },
    [stopTyping, verseTextOp]
  );
  const typeFormText = useCallback(() => {
    const { headline, sub } = onboardingFormCopy;

    let hIndex = 0;
    let sIndex = 0;

    setTypedHeadline("");
    setTypedSubText("");

    const headlineTimer = setInterval(() => {
      hIndex++;
      setTypedHeadline(headline.slice(0, hIndex));

      if (hIndex >= headline.length) {
        clearInterval(headlineTimer);

        // Small pause before sub text starts
        setTimeout(() => {
          const subTimer = setInterval(() => {
            sIndex++;
            setTypedSubText(sub.slice(0, sIndex));

            if (sIndex >= sub.length) {
              clearInterval(subTimer);
            }
          }, 28);
        }, 250);
      }
    }, 35);
  }, []);

  /* Restart verse when index changes (and still in video phase) */
  useEffect(() => {
    if (phase === "video") startVerse(verseIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseIdx, phase]);

  /* ── THE CINEMATIC END SEQUENCE ──────────────────────────────
     Timeline (all durations approximate, overlapping):
       0 ms  — stop typing, fire haptic, begin volume fade
       0 ms  — verse overlay fades out (OVERLAY_OUT_MS)
       0 ms  — video opacity fades 1→0 (VIDEO_FADE_MS)
       0 ms  — blackFade fades in in parallel (VIDEO_FADE_MS)
     ~900 ms — overlay gone → phase = "form", film strips in
     ~300 ms — form container begins sliding up (FORM_DRIFT_MS)
     ~300 ms — heading fades in
     ~520 ms — sub-text fades in
     ~740 ms — input fades in
     ~960 ms — button fades in
     ~1200 ms — blackFade eases back to 0 as form settles
  ─────────────────────────────────────────────────────────────── */
  const onVideoEnd = useCallback(() => {
    if (hasEnded.current) return;
    hasEnded.current = true;

    setPhase("ending");
    stopTyping();

    // Start smooth audio fade
    fadeVolume(VIDEO_FADE_MS);

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    ).catch(() => { });

    // Fade visuals
    Animated.parallel([
      easeIn(videoOpacity, 0, VIDEO_FADE_MS),
      easeIn(labelOp, 0, OVERLAY_OUT_MS),
      easeIn(verseTextOp, 0, OVERLAY_OUT_MS),
      easeIn(overlayOp, 0, OVERLAY_OUT_MS),
      easeOut(blackFade, 1, VIDEO_FADE_MS),
    ]).start(() => {

      // ✅ STOP VIDEO AFTER fade completes
      videoRef.current?.stopAsync().catch(() => { });

      setPhase("form");
      setTimeout(() => {
        typeFormText();
      }, FORM_EASE_DELAY + 200);
      easeOut(stripOp, 1, 1200).start();

      Animated.parallel([
        easeOut(formOp, 1, FORM_DRIFT_MS, FORM_EASE_DELAY),
        easeOut(formTY, 0, FORM_DRIFT_MS, FORM_EASE_DELAY),
      ]).start();

      const row = (
        op: Animated.Value,
        ty: Animated.Value,
        delay: number,
      ) =>
        Animated.parallel([
          easeOut(op, 1, 700, delay),
          easeOut(ty, 0, 700, delay),
        ]);

      const base = FORM_EASE_DELAY + 100;

      Animated.parallel([
        row(headOp, headTY, base),
        row(subOp, subTY, base + STAGGER),
        row(inputOp, inputTY, base + STAGGER * 2),
        row(btnOp, btnTY, base + STAGGER * 3),
      ]).start();

      // Fade black layer away gently
      setTimeout(() => {
        easeIn(blackFade, 0, 1000).start();
      }, FORM_EASE_DELAY + 120);
    });
  }, [stopTyping, fadeVolume]);

  /* ── Audio mode ── */
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(() => { });
  }, []);

  /* ── Load keystroke sound ── */
  useEffect(() => {
    let snd: Audio.Sound | null = null;
    Audio.Sound.createAsync(
      require("../../assets/sfx/mixkit-single-key-type-2533.wav"),
      { volume: 0.25 },
    )
      .then(({ sound }) => { snd = sound; typingSoundRef.current = sound; })
      .catch(() => { });
    return () => {
      snd?.unloadAsync().catch(() => { });
      typingSoundRef.current = null;
    };
  }, []);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      stopTyping();
      if (volTimerRef.current) clearInterval(volTimerRef.current);
      typingSoundRef.current?.unloadAsync().catch(() => { });
      videoRef.current?.stopAsync().catch(() => { });
    };
  }, [stopTyping]);

  /* ── Continue ── */
  const onContinue = async () => {
    try { await typingSoundRef.current?.stopAsync(); await typingSoundRef.current?.unloadAsync(); } catch { }
    try { await videoRef.current?.stopAsync(); } catch { }
    router.replace("/onboarding/details");
  };

  /* ─────────────────────── RENDER ─────────────────────────── */
  return (
    <CosmicBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">

            {/* ── Video layer (fades out cinematically) ── */}
            <WelcomeVideoLayer
              videoOpacity={videoOpacity}
              videoRef={videoRef}
              introMaxMs={INTRO_MAX_MS}
              onVideoEnd={onVideoEnd}
            />

            {/* ── Persistent dark vignette (over video, always) ── */}
            <LinearGradient
              colors={[C.vignetteStart, C.vignetteEnd]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />

            {/* ── Black cinematic fade (covers everything during transition) ── */}
            {/* Placed after video + vignette so it visually covers them when animated */}
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: C.black, opacity: blackFade },
              ]}
            />

            {/* ── Verse overlay (video + ending phases) ── */}
            {phase !== "form" && (
              <WelcomeVerseOverlay
                overlayOp={overlayOp}
                labelOp={labelOp}
                verseTextOp={verseTextOp}
                verseLabel={VERSES[verseIdx % VERSES.length].label}
                typedText={typedText}
                serif={SERIF}
              />
            )}


            {/* ── Form phase content ── */}
            {phase === "form" && (
              <WelcomeForm
                formOp={formOp}
                formTY={formTY}
                headOp={headOp}
                headTY={headTY}
                subOp={subOp}
                subTY={subTY}
                inputOp={inputOp}
                inputTY={inputTY}
                btnOp={btnOp}
                btnTY={btnTY}
                typedHeadline={typedHeadline}
                typedSubText={typedSubText}
                serif={SERIF}
                sans={SANS}
                onContinue={onContinue}
              />
            )}

            {/* ── Skip (video phase only) ── */}
            {phase === "video" && (
              <WelcomeSkipButton
                topInset={insets.top}
                sans={SANS}
                onPress={onVideoEnd}
              />
            )}

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </CosmicBackground>
  );
}
/* ─── Styles ──────────────────────────────────────────────────── */
const SERIF = Platform.OS === "ios" ? "Georgia" : "serif";
const SANS = Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif";
