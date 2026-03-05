import type { MutableRefObject } from "react";
import { Animated, StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";

type WelcomeVideoLayerProps = {
  videoOpacity: Animated.Value;
  videoRef: MutableRefObject<Video | null>;
  introMaxMs: number;
  onVideoEnd: () => void;
};

export default function WelcomeVideoLayer({
  videoOpacity,
  videoRef,
  introMaxMs,
  onVideoEnd,
}: WelcomeVideoLayerProps) {
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: videoOpacity }]}>
      <Video
        ref={(r) => {
          videoRef.current = r;
        }}
        source={require("../../../assets/video/v2.mp4")}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        onPlaybackStatusUpdate={(s) => {
          if (!s?.isLoaded) return;
          if (s.didJustFinish || (s.positionMillis ?? 0) >= introMaxMs) onVideoEnd();
        }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}
