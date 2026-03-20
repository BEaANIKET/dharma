import { useMemo } from "react";
import { View } from "react-native";

type Star = {
  top: `${number}%`;
  left: `${number}%`;
  size: number;
  opacity: number;
};

export default function Starfield() {
  const stars = useMemo<Star[]>(
    () => [
      { top: "8%", left: "12%", size: 2, opacity: 0.5 },
      { top: "18%", left: "72%", size: 1.5, opacity: 0.35 },
      { top: "24%", left: "40%", size: 2.5, opacity: 0.6 },
      { top: "32%", left: "18%", size: 1, opacity: 0.3 },
      { top: "36%", left: "82%", size: 1.6, opacity: 0.45 },
      { top: "46%", left: "8%", size: 1.4, opacity: 0.4 },
      { top: "52%", left: "62%", size: 2, opacity: 0.55 },
      { top: "60%", left: "30%", size: 1.2, opacity: 0.35 },
      { top: "66%", left: "88%", size: 2.2, opacity: 0.5 },
      { top: "74%", left: "14%", size: 1.3, opacity: 0.35 },
      { top: "82%", left: "52%", size: 1.6, opacity: 0.4 },
      { top: "90%", left: "78%", size: 1.4, opacity: 0.3 },
    ],
    []
  );

  return (
    <View className="absolute inset-0" pointerEvents="none">
      {stars.map((star, index) => (
        <View
          key={`star-${index}`}
          className="bg-text-primary dark:bg-text-primary-dark"
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </View>
  );
}
