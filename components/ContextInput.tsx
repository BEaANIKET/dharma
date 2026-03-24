import { Ionicons } from "@expo/vector-icons";
import { RefObject, useCallback, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, TextInput, View } from "react-native";

let SpeechModule: typeof import("expo-speech-recognition").ExpoSpeechRecognitionModule | null =
  null;
let useSpeechEvent: typeof import("expo-speech-recognition").useSpeechRecognitionEvent | null =
  null;

try {
  const mod = require("expo-speech-recognition");
  SpeechModule = mod.ExpoSpeechRecognitionModule;
  useSpeechEvent = mod.useSpeechRecognitionEvent;
} catch {
  // Native module unavailable (Expo Go) — voice disabled
}

interface ContextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  scrollRef?: RefObject<ScrollView | null>;
}

// Wrapper hook — calls the real hook when available, no-ops otherwise.
// Hooks must be called unconditionally, so we always call this.
function useSpeechRecognition(
  event: string,
  handler: (e: any) => void,
) {
  // When native module is available, use the real hook
  if (useSpeechEvent) {
    useSpeechEvent(event as any, handler);
  }
  // Otherwise this is a no-op — hook call count stays stable
  // because SpeechModule is determined at module load time (constant).
}

export default function ContextInput({
  value,
  onChangeText,
  onSubmit,
  canSubmit,
  scrollRef,
}: ContextInputProps) {
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<View>(null);
  const hasText = value.trim().length > 0;

  useSpeechRecognition("result", (event) => {
    const transcript = event.results[0]?.transcript ?? "";
    if (transcript) {
      onChangeText(transcript);
    }
  });

  useSpeechRecognition("end", () => {
    setIsListening(false);
  });

  useSpeechRecognition("error", () => {
    setIsListening(false);
  });

  const handleMicPress = useCallback(async () => {
    if (!SpeechModule) {
      Alert.alert(
        "Voice unavailable",
        "Speech recognition requires a dev build. Run: npx expo run:android",
      );
      return;
    }

    if (isListening) {
      SpeechModule.stop();
      setIsListening(false);
      return;
    }

    const { granted } = await SpeechModule.requestPermissionsAsync();
    if (!granted) return;

    SpeechModule.start({
      lang: "en-US",
      interimResults: true,
    });
    setIsListening(true);
  }, [isListening]);

  return (
    <View
      ref={inputRef}
      className="mt-5 flex-row items-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-4"
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setTimeout(() => {
            inputRef.current?.measureLayout(
              scrollRef?.current?.getInnerViewNode() as any,
              (_x, y) => {
                scrollRef?.current?.scrollTo({ y, animated: true });
              },
              () => {},
            );
          }, 300);
        }}
        placeholder="What happened today? I'm listening..."
        placeholderTextColor="#6b6878"
        className="h-14 flex-1 text-xl font-ui text-primary dark:text-parchment"
      />

      {hasText ? (
        <Pressable
          onPress={onSubmit}
          disabled={!canSubmit}
          className={`h-11 w-11 items-center justify-center rounded-2xl ${
            canSubmit
              ? "bg-accent-primary dark:bg-accent-primary-dark"
              : "bg-surface dark:bg-surface-dark opacity-50"
          }`}
        >
          <Ionicons name="paper-plane-outline" size={20} color="#09090F" />
        </Pressable>
      ) : (
        <Pressable
          onPress={handleMicPress}
          className={`h-11 w-11 items-center justify-center rounded-2xl ${
            isListening
              ? "bg-red-500"
              : "bg-accent-primary dark:bg-accent-primary-dark"
          }`}
        >
          <Ionicons
            name={isListening ? "stop" : "mic"}
            size={20}
            color="#09090F"
          />
        </Pressable>
      )}
    </View>
  );
}
