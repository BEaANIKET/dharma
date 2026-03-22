import GradientBackground from "@/components/GradientBackground";
import WelcomeForm from "@/components/onboarding/welcome/WelcomeForm";
import WelcomeSkipButton from "@/components/onboarding/welcome/WelcomeSkipButton";
import WelcomeVerseOverlay from "@/components/onboarding/welcome/WelcomeVerseOverlay";
import WelcomeVideoLayer from "@/components/onboarding/welcome/WelcomeVideoLayer";
import StartupLoader from "@/components/StartupLoader";
import { useAuthStore } from "@/store/useAuthStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import {
  onboardingPalette as C,
  onboardingFormCopy,
  onboardingTimings,
  onboardingVerses as VERSES,
} from "@/theme/onboarding";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, Video } from "expo-av";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const introEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blackFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formHeadlineTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const formSubTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const formPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasEnded = useRef(false);

  /* ── State ── */
  const [phase, setPhase] = useState<Phase>("video");
  const [verseIdx, setVerseIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isVideoReady, setIsVideoReady] = useState(false);

  const [typedHeadline, setTypedHeadline] = useState("");
  const [typedSubText, setTypedSubText] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const phone = useOnboardingStore((s) => s.phone);
  const markCompleted = useOnboardingStore((s) => s.markCompleted);
  const requestOtp = useAuthStore((s) => s.requestOtp);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const clearAuthError = useAuthStore((s) => s.clearError);
  const authLoading = useAuthStore((s) => s.isLoading);
  const authError = useAuthStore((s) => s.error);

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

  const stopFormTyping = useCallback(() => {
    if (formHeadlineTimerRef.current) {
      clearInterval(formHeadlineTimerRef.current);
      formHeadlineTimerRef.current = null;
    }
    if (formSubTimerRef.current) {
      clearInterval(formSubTimerRef.current);
      formSubTimerRef.current = null;
    }
    if (formPauseTimerRef.current) {
      clearTimeout(formPauseTimerRef.current);
      formPauseTimerRef.current = null;
    }
  }, []);

  /* ── Stop typing timers ── */
  const stopTyping = useCallback(() => {
    if (typingRef.current) { clearInterval(typingRef.current); typingRef.current = null; }
    if (holdRef.current) { clearTimeout(holdRef.current); holdRef.current = null; }
    typingSoundRef.current?.stopAsync().catch(() => { });
  }, []);

  const stopVideo = useCallback(() => {
    videoRef.current?.stopAsync().catch(() => { });
  }, []);

  const pulseTypeHaptic = useCallback(() => {
    Haptics.selectionAsync().catch(() => { });
  }, []);

  /* ── Type a verse then schedule next ── */
  const startVerse = useCallback(
    (idx: number) => {
      stopTyping();
      const lastVerseIndex = VERSES.length - 1;
      const currentIndex = Math.min(idx, lastVerseIndex);
      const verse = VERSES[currentIndex];
      setTypedText("");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });

      let charIdx = 0;

      typingRef.current = setInterval(() => {
        charIdx++;
        setTypedText(verse.text.slice(0, charIdx));
        pulseTypeHaptic();

        // Avoid expensive per-character audio calls while keeping typing feel.
        if (typingSoundRef.current && charIdx % 3 === 0) {
          typingSoundRef.current
            .replayAsync()
            .catch(() => { });
        }

        if (charIdx >= verse.text.length) {
          clearInterval(typingRef.current!);
          typingRef.current = null;

          holdRef.current = setTimeout(() => {
            Haptics.impactAsync(
              Haptics.ImpactFeedbackStyle.Medium
            ).catch(() => { });

            if (currentIndex >= lastVerseIndex) return;

            easeIn(verseTextOp, 0, VERSE_FADE_MS).start(() => {
              setVerseIdx((prev) => {
                easeOut(verseTextOp, 1, VERSE_FADE_MS).start();
                return Math.min(prev + 1, lastVerseIndex);
              });
            });
          }, VERSE_HOLD_MS);
        }
      }, TYPE_SPEED_MS);
    },
    [pulseTypeHaptic, stopTyping, verseTextOp]
  );
  const typeFormText = useCallback(() => {
    stopFormTyping();

    const { headline, sub } = onboardingFormCopy;

    let hIndex = 0;
    let sIndex = 0;

    setTypedHeadline("");
    setTypedSubText("");

    formHeadlineTimerRef.current = setInterval(() => {
      hIndex++;
      setTypedHeadline(headline.slice(0, hIndex));
      typingSoundRef.current?.replayAsync().catch(() => { });

      if (hIndex >= headline.length) {
        if (formHeadlineTimerRef.current) {
          clearInterval(formHeadlineTimerRef.current);
          formHeadlineTimerRef.current = null;
        }

        // Small pause before sub text starts
        formPauseTimerRef.current = setTimeout(() => {
          formSubTimerRef.current = setInterval(() => {
            sIndex++;
            setTypedSubText(sub.slice(0, sIndex));
            typingSoundRef.current?.replayAsync().catch(() => { });

            if (sIndex >= sub.length) {
              if (formSubTimerRef.current) {
                clearInterval(formSubTimerRef.current);
                formSubTimerRef.current = null;
              }
            }
          }, 28);
        }, 250);
      }
    }, 35);
  }, [stopFormTyping]);

  /* Restart verse when index changes (and still in video phase) */
  useEffect(() => {
    if (!isVideoReady) return;
    if (phase === "video") startVerse(verseIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseIdx, phase, isVideoReady]);

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
    if (introEndTimerRef.current) {
      clearTimeout(introEndTimerRef.current);
      introEndTimerRef.current = null;
    }

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
      stopVideo();

      setPhase("form");
      formStartTimerRef.current = setTimeout(() => {
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
      blackFadeTimerRef.current = setTimeout(() => {
        easeIn(blackFade, 0, 1000).start();
      }, FORM_EASE_DELAY + 120);
    });
  }, [
    blackFade,
    btnOp,
    btnTY,
    fadeVolume,
    formOp,
    formTY,
    headOp,
    headTY,
    inputOp,
    inputTY,
    labelOp,
    overlayOp,
    stopTyping,
    stopVideo,
    stripOp,
    subOp,
    subTY,
    typeFormText,
    verseTextOp,
    videoOpacity,
  ]);

  useEffect(() => {
    if (!isVideoReady) return;
    introEndTimerRef.current = setTimeout(() => {
      onVideoEnd();
    }, INTRO_MAX_MS);

    return () => {
      if (introEndTimerRef.current) {
        clearTimeout(introEndTimerRef.current);
        introEndTimerRef.current = null;
      }
    };
  }, [onVideoEnd, isVideoReady]);

  // Fail-safe: avoid getting stuck forever if the device takes too long to report video readiness.
  useEffect(() => {
    if (isVideoReady) return;
    const timer = setTimeout(() => setIsVideoReady(true), 7000);
    return () => clearTimeout(timer);
  }, [isVideoReady]);

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
      stopFormTyping();
      if (introEndTimerRef.current) clearTimeout(introEndTimerRef.current);
      if (formStartTimerRef.current) clearTimeout(formStartTimerRef.current);
      if (blackFadeTimerRef.current) clearTimeout(blackFadeTimerRef.current);
      if (volTimerRef.current) clearInterval(volTimerRef.current);
      typingSoundRef.current?.unloadAsync().catch(() => { });
      stopVideo();
    };
  }, [stopTyping, stopFormTyping, stopVideo]);

  /* ── Continue ── */
  const onRequestOtp = async () => {
    clearAuthError();
    try {
      await requestOtp(toE164Indian(phone));
      setOtpSent(true);
    } catch {
      // handled by store
    }
  };

  const onVerifyOtp = async () => {
    clearAuthError();
    try {
      const result = await verifyOtp(toE164Indian(phone), otp.trim());
      try {
        await typingSoundRef.current?.stopAsync();
        await typingSoundRef.current?.unloadAsync();
      } catch { }
      try {
        await stopVideo();
      } catch { }
      // TODO: restore isNewUser check — bypassed for testing details flow
      router.replace("/onboarding/details");
    } catch {
      // handled by store
    }
  };

  const onEditPhone = () => {
    clearAuthError();
    setOtp("");
    setOtpSent(false);
  };

  /* ─────────────────────── RENDER ─────────────────────────── */
  return (
    <GradientBackground>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
      >
          <View className="flex-1">

            {/* ── Video layer (fades out cinematically) ── */}
            <WelcomeVideoLayer
              videoOpacity={videoOpacity}
              videoRef={videoRef}
              introMaxMs={INTRO_MAX_MS}
              onVideoEnd={onVideoEnd}
              onVideoReady={() => setIsVideoReady(true)}
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
                verseLabel={VERSES[Math.min(verseIdx, VERSES.length - 1)].label}
                typedText={typedText}
              />
            )}


            {/* ── Form phase content ── */}
            {phase === "form" && (
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                showsVerticalScrollIndicator={false}
              >
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
                  otp={otp}
                  setOtp={setOtp}
                  otpSent={otpSent}
                  isLoading={authLoading}
                  error={authError}
                  onRequestOtp={onRequestOtp}
                  onVerifyOtp={onVerifyOtp}
                  onEditPhone={onEditPhone}
                />
              </ScrollView>
            )}

            {/* ── Skip (video phase only) ── */}
            {phase === "video" && (
              <WelcomeSkipButton
                topInset={insets.top}
                onPress={onVideoEnd}
              />
            )}

            {!isVideoReady && (
              <View className="absolute inset-0 z-30">
                <StartupLoader
                  message="Starting mydharma..."
                  subMessage="Loading welcome experience"
                />
              </View>
            )}

          </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
/* ─── Styles ──────────────────────────────────────────────────── */

function toE164Indian(rawPhone: string) {
  const trimmed = rawPhone.trim();
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  return `+91${digits}`;
}
