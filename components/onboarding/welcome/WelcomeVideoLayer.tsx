import { useRef, type MutableRefObject } from "react";
import { Animated, StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";

type WelcomeVideoLayerProps = {
  videoOpacity: Animated.Value;
  videoRef: MutableRefObject<Video | null>;
  introMaxMs: number;
  onVideoEnd: () => void;
  onVideoReady: () => void;
};

export default function WelcomeVideoLayer({
  videoOpacity,
  videoRef,
  introMaxMs,
  onVideoEnd,
  onVideoReady,
}: WelcomeVideoLayerProps) {
  const readySentRef = useRef(false);
  const lastResumeAttemptRef = useRef(0);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: videoOpacity }]}>
      <Video
        ref={(r) => {
          videoRef.current = r;
        }}
        source={require("../../../assets/video/v2.mp4")}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        progressUpdateIntervalMillis={120}
        onReadyForDisplay={() => {
          if (readySentRef.current) return;
          readySentRef.current = true;
          onVideoReady();
        }}
        onPlaybackStatusUpdate={(s) => {
          if (!s?.isLoaded) return;
          const position = s.positionMillis ?? 0;

          if (s.didJustFinish || position >= introMaxMs) {
            onVideoEnd();
            return;
          }

          // Recover from occasional unexpected pauses once buffering is complete.
          if (s.shouldPlay && !s.isPlaying && !s.isBuffering) {
            const now = Date.now();
            if (now - lastResumeAttemptRef.current > 1200) {
              lastResumeAttemptRef.current = now;
              videoRef.current?.playAsync().catch(() => { });
            }
          }
        }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}
