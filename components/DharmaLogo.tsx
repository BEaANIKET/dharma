import Svg, { Circle, Path } from "react-native-svg";
import { Text, View } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";

/**
 * DharmaLogo
 *
 * Renders the brand mark (lotus + figure + flame) as a scalable SVG.
 * Optionally shows the "my / Dharma" wordmark below.
 *
 * Props:
 *   size        — height of the mark in px (width scales proportionally)
 *   showWordmark — render "my Dharma" text below the mark
 */

// Original path coordinate space: x 43–257, y 8–197
// ViewBox crops to that bounding box → aspect ratio 214 × 189 ≈ 1.13
const VIEWBOX = "43 8 214 189";
const ASPECT  = 214 / 189; // width / height

interface DharmaLogoProps {
  size?: number;
  showWordmark?: boolean;
}

export default function DharmaLogo({ size = 48, showWordmark = false }: DharmaLogoProps) {
  const isDark = useThemeStore((s) => s.isDark);

  const width  = size * ASPECT;
  const height = size;

  // Wordmark text colors follow the theme
  const wordmarkSub  = "#4ECDC4";                          // dharma-teal — always
  const wordmarkMain = isDark ? "#E8E4DC" : "#111128";     // parchment / night-indigo

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={width} height={height} viewBox={VIEWBOX}>

        {/* ── Flame / teardrop  (bindu-gold) ─────────────────── */}
        <Path
          d="M150,12 C159,22 159,33 150,37 C141,33 141,22 150,12"
          fill="none"
          stroke="#FFD25A"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* ── Lotus petals  (cosmic-violet) ───────────────────── */}
        <Path d="M150.0,170.0 C123.0,152.0 111.8,110.0 134.2,68.0 C144.6,53.6 155.4,53.6 165.8,68.0 C188.2,110.0 177.0,152.0 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M150.0,170.0 C119.9,170.9 89.2,145.4 84.3,101.8 C84.7,85.5 92.9,79.7 108.4,85.0 C147.7,104.5 161.2,142.0 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M150.0,170.0 C138.8,142.0 152.3,104.5 191.6,85.0 C207.1,79.7 215.3,85.5 215.7,101.8 C210.8,145.4 180.1,170.9 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M150.0,170.0 C126.8,184.3 91.0,178.1 67.3,146.1 C60.2,133.1 64.0,124.9 78.6,122.0 C118.3,119.6 146.0,143.0 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M150.0,170.0 C154.0,143.0 181.7,119.6 221.4,122.0 C236.0,124.9 239.8,133.1 232.7,146.1 C209.0,178.1 173.2,184.3 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M150.0,170.0 C133.5,186.8 95.0,193.8 56.5,179.8 C43.3,173.4 43.3,166.6 56.5,160.2 C95.0,146.2 133.5,153.2 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M150.0,170.0 C166.5,153.2 205.0,146.2 243.5,160.2 C256.7,166.6 256.7,173.4 243.5,179.8 C205.0,193.8 166.5,186.8 150.0,170.0"
          fill="none" stroke="#9B8EC4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* ── Human figure  (dharma-teal) ─────────────────────── */}
        <Circle cx="150" cy="105" r="12" fill="none" stroke="#4ECDC4" strokeWidth="2.3" />

        <Path d="M144,130 C134,135 120,147 108,160 C102,167 100,173 102,177"
          fill="none" stroke="#4ECDC4" strokeWidth="2.3" strokeLinecap="round" />
        <Circle cx="102" cy="177" r="3" fill="none" stroke="#4ECDC4" strokeWidth="2.3" />

        <Path d="M156,130 C166,135 180,147 192,160 C198,167 200,173 198,177"
          fill="none" stroke="#4ECDC4" strokeWidth="2.3" strokeLinecap="round" />
        <Circle cx="198" cy="177" r="3" fill="none" stroke="#4ECDC4" strokeWidth="2.3" />

        <Path d="M145,130 C143,145 142,157 143,167"
          fill="none" stroke="#4ECDC4" strokeWidth="2.3" strokeLinecap="round" />
        <Path d="M155,130 C157,145 158,157 157,167"
          fill="none" stroke="#4ECDC4" strokeWidth="2.3" strokeLinecap="round" />

        <Path d="M143,167 C132,173 110,181 95,185 C88,187 85,188 88,191 C95,193 112,192 132,187 C142,183 148,179 150,177"
          fill="none" stroke="#4ECDC4" strokeWidth="2.3" strokeLinecap="round" />
        <Path d="M157,167 C168,173 190,181 205,185 C212,187 215,188 212,191 C205,193 188,192 168,187 C158,183 152,179 150,177"
          fill="none" stroke="#4ECDC4" strokeWidth="2.3" strokeLinecap="round" />

        {/* ── Bindu  (gold glow at heart) ─────────────────────── */}
        <Circle cx="150" cy="133" r="5"   fill="#FFD25A" opacity={0.15} />
        <Circle cx="150" cy="133" r="2.5" fill="#FFD25A" opacity={0.25} />

      </Svg>

      {showWordmark ? (
        <View style={{ alignItems: "center", marginTop: size * 0.18 }}>
          <Text
            style={{
              fontFamily: "CormorantGaramond-Light",
              fontSize: size * 0.28,
              letterSpacing: size * 0.07,
              color: wordmarkSub,
              opacity: 0.8,
            }}
          >
            my
          </Text>
          <Text
            style={{
              fontFamily: "CormorantGaramond-Medium",
              fontSize: size * 0.48,
              letterSpacing: size * 0.04,
              color: wordmarkMain,
              marginTop: -(size * 0.04),
            }}
          >
            Dharma
          </Text>
        </View>
      ) : null}
    </View>
  );
}
