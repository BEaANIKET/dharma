import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import CosmicBackground from "@/components/onboarding/CosmicBackground";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import PhoneInput from "@/components/onboarding/PhoneInput";
import PrimaryGlowButton from "@/components/onboarding/PrimaryGlowButton";

/* ─── Palette ─────────────────────────────────────────────────── */
const C = {
  bg: "#070c07",
  goldDim: "rgba(196,162,68,0.42)",
  goldFaint: "rgba(196,162,68,0.28)",
  goldLabel: "rgba(196,162,68,0.65)",
  white90: "rgba(255,255,255,0.90)",
  white30: "rgba(255,255,255,0.30)",
  white18: "rgba(255,255,255,0.18)",
  white10: "rgba(255,255,255,0.10)",
  white06: "rgba(255,255,255,0.06)",
  strip: "#0c0c08",
};

/* ─── Timing constants ────────────────────────────────────────── */
const INTRO_MAX_MS = 52000; // hard cap on video length
const TYPE_SPEED_MS = 55;     // ms per character while typing
const VERSE_HOLD_MS = 1400;  // pause at end of typed verse
const VERSE_FADE_MS = 500;    // cross-fade between verses

// Cinematic end-sequence timing
const VIDEO_FADE_MS = 2200;  // video opacity 1 → 0
const VOL_TICK_MS = 1200;    // volume polling interval
const OVERLAY_OUT_MS = 900;    // verse overlay → 0
const FORM_DRIFT_MS = 1800;  // form container slide-up duration
const FORM_EASE_DELAY = 150;    // wait before form starts entering
// Stagger between heading / sub-text / input / button
const STAGGER = 220;

/* ─── Sanskrit verses ─────────────────────────────────────────── */
const VERSES = [
  {
    label: "श्रीमद् भगवद् गीता · 2.47",
    text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
  },
  {
    label: "श्रीमद् भगवद् गीता · 6.5",
    text: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
  },
  {
    label: "श्रीमद् भगवद् गीता · 2.20",
    text: "न जायते म्रियते वा कदाचित्\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
  },
  {
    label: "श्रीमद् भगवद् गीता · 3.27",
    text: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः।\nअहंकारविमूढात्मा कर्ताहमिति मन्यते॥",
  },
];

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
  const mkAV = (v = 0) => useRef(new Animated.Value(v)).current;
  /* eslint-disable react-hooks/rules-of-hooks */
  const headOp = mkAV(); const headTY = mkAV(22);
  const subOp = mkAV(); const subTY = mkAV(22);
  const inputOp = mkAV(); const inputTY = mkAV(22);
  const btnOp = mkAV(); const btnTY = mkAV(22);
  /* eslint-enable react-hooks/rules-of-hooks */

  /* ── Phone store ── */
  const phone = useOnboardingStore((s) => s.phone);
  const setPhone = useOnboardingStore((s) => s.setPhone);

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
    const headline = "when did your\nsoul arrive?";
    const sub = "through the noise… through the scrolling…\nremember who you are.";

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
          <View style={{ flex: 1 }}>

            {/* ── Video layer (fades out cinematically) ── */}
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: videoOpacity }]}>
              <Video
                ref={(r) => { videoRef.current = r; }}
                source={require("../../assets/video/video.mp4")}
                resizeMode="cover"
                shouldPlay
                onPlaybackStatusUpdate={(s) => {
                  if (!s?.isLoaded) return;
                  if (s.didJustFinish || (s.positionMillis ?? 0) >= INTRO_MAX_MS) onVideoEnd();
                }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>

            {/* ── Persistent dark vignette (over video, always) ── */}
            <LinearGradient
              colors={["rgba(7,12,7,0.55)", "rgba(7,12,7,0.97)"]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />

            {/* ── Black cinematic fade (covers everything during transition) ── */}
            {/* Placed after video + vignette so it visually covers them when animated */}
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: "#000", opacity: blackFade },
              ]}
            />

            {/* ── Verse overlay (video + ending phases) ── */}
            {phase !== "form" && (
              <Animated.View
                style={[styles.verseOverlay, { opacity: overlayOp }]}
                pointerEvents="none"
              >
                <Animated.Text style={[styles.verseLabel, { opacity: labelOp }]}>
                  {VERSES[verseIdx % VERSES.length].label}
                </Animated.Text>
                <Animated.Text style={[styles.verseText, { opacity: verseTextOp }]}>
                  {typedText}
                </Animated.Text>
              </Animated.View>
            )}


            {/* ── Form phase content ── */}
            {phase === "form" && (
              <Animated.View
                style={[
                  styles.formOuter,
                  { opacity: formOp, transform: [{ translateY: formTY }] },
                ]}
              >
                {/* ॐ accent */}
                <Text style={styles.omLabel}>ॐ  dharma</Text>

                {/* Headline */}
                <Animated.Text
                  style={[styles.headline, { opacity: headOp, transform: [{ translateY: headTY }] }]}
                >
                  {typedHeadline}
                </Animated.Text>

                {/* Gold rule */}
                <Animated.View
                  style={[styles.goldRule, { opacity: headOp }]}
                />

                {/* Sub-text */}
                <Animated.Text
                  style={[styles.subText, { opacity: subOp, transform: [{ translateY: subTY }] }]}
                >
                  {typedSubText}
                </Animated.Text>

                {/* Input */}
                <Animated.View
                  style={[
                    styles.inputBlock,
                    { opacity: inputOp, transform: [{ translateY: inputTY }] },
                  ]}
                >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                  >
                    <Text style={styles.inputLabel}>mobile number</Text>
                    <PhoneInput value={phone} onChange={setPhone} />
                    <Text style={styles.inputHint}>
                      for your daily dharmic sunrise message · no spam ever
                    </Text>
                  </KeyboardAvoidingView>
                </Animated.View>

                {/* Button */}
                <Animated.View
                  style={[
                    styles.btnBlock,
                    { opacity: btnOp, transform: [{ translateY: btnTY }] },
                  ]}
                >
                  <PrimaryGlowButton
                    label="continue →"
                    onPress={onContinue}
                    disabled={phone.trim().length < 7}
                    accessibilityLabel="Continue to details"
                  />
                  <Text style={styles.privacyNote}>
                    ∴  your data is sacred · encrypted · never sold
                  </Text>
                </Animated.View>
              </Animated.View>
            )}

            {/* ── Skip (video phase only) ── */}
            {phase === "video" && (
              <View style={[styles.skipRow, { paddingTop: insets.top + 16 }]}>
                <AnimatedPressable
                  onPress={onVideoEnd}
                  style={styles.skipBtn}
                  accessibilityLabel="Skip intro"
                >
                  <Text style={styles.skipText}>skip</Text>
                </AnimatedPressable>
              </View>
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

const styles = StyleSheet.create({
  /* verse overlay */
  verseOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  verseLabel: {
    color: "rgba(224,239,255,0.5)",
    fontSize: 10,
    letterSpacing: 4,
    textTransform: "uppercase",
    fontFamily: SERIF,
    marginBottom: 18,
    textAlign: "center",
  },
  verseText: {
    color: "rgba(255,255,255,0.87)",
    fontSize: 19,
    lineHeight: 32,
    textAlign: "center",
    fontFamily: SERIF,
    fontStyle: "italic",
    letterSpacing: 0.4,
  },

  /* film strips */
  strip: {
    position: "absolute", left: 0, right: 0, height: 50,
    backgroundColor: C.strip,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 7,
  },
  stripTop: { top: 0, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  stripBottom: { bottom: 0, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.04)" },
  stripHole: {
    width: 28, height: 20, borderRadius: 3,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
    backgroundColor: "#080808",
  },
  stripLabel: {
    position: "absolute",
    fontSize: 9, letterSpacing: 2,
    color: "rgba(180,145,55,0.35)",
    fontFamily: SERIF,
  },

  /* form */
  formOuter: {
    position: "absolute",
    left: 24, right: 24, bottom: 0,
    paddingBottom: 52,
  },
  omLabel: {
    fontSize: 12, letterSpacing: 3,
    color: "rgba(196,162,68,0.30)",
    fontFamily: SERIF,
    marginBottom: 16,
  },
  headline: {
    fontSize: 36,
    fontFamily: SERIF,
    fontStyle: "italic",
    color: C.white90,
    lineHeight: 46,
    marginBottom: 18,
  },
  goldRule: {
    width: 32, height: 1,
    backgroundColor: C.goldFaint,
    marginBottom: 16,
  },
  subText: {
    fontSize: 15,
    fontFamily: SERIF,
    fontStyle: "italic",
    color: C.white30,
    lineHeight: 25,
    marginBottom: 32,
  },
  inputBlock: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 11, letterSpacing: 4,
    textTransform: "uppercase",
    color: C.goldLabel,
    fontFamily: SANS,
    fontWeight: "400",
    marginBottom: 10,
  },
  inputHint: {
    fontSize: 12, letterSpacing: 0.3, lineHeight: 19,
    color: C.white18,
    fontFamily: SANS,
    marginTop: 8,
  },
  btnBlock: {
    marginTop: 24,
  },
  privacyNote: {
    fontSize: 11, letterSpacing: 0.4, lineHeight: 18,
    color: "rgba(255,255,255,0.15)",
    fontFamily: SANS,
    textAlign: "center",
    marginTop: 18,
  },

  /* skip */
  skipRow: {
    position: "absolute", top: 0, left: 0, right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    zIndex: 20,
  },
  skipBtn: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.white06,
    borderWidth: 1, borderColor: C.white10,
    minHeight: 36,
    justifyContent: "center",
  },
  skipText: {
    color: C.white30, fontSize: 11,
    letterSpacing: 4,
    textTransform: "uppercase",
    fontFamily: SANS,
  },
});