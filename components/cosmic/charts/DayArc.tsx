import React from "react";
import Svg, { Circle, Defs, LinearGradient, Path, Stop, Text as SvgText } from "react-native-svg";
import { PD } from "../panchangData";

interface DayArcProps {
  width?: number;
}

export default function DayArc({ width = 300 }: DayArcProps) {
  const W = width;
  const H = 54;
  const PAD = 2;

  // Quadratic bezier point along the arc
  // P0 = (0, H), P1 = (W/2, -H*0.6) [control], P2 = (W, H)
  const bezier = (t: number) => {
    const p0x = 0,     p0y = H;
    const p1x = W / 2, p1y = -H * 0.5; // control point (peak)
    const p2x = W,     p2y = H;
    const x = (1 - t) ** 2 * p0x + 2 * (1 - t) * t * p1x + t ** 2 * p2x;
    const y = (1 - t) ** 2 * p0y + 2 * (1 - t) * t * p1y + t ** 2 * p2y;
    return { x, y };
  };

  // ── Force t = 0.5 for preview (noon / midday) ──
  const t = 0.5;

  const tm = Math.max(
    0,
    Math.min(1, (PD.moonrise_h - PD.sunrise_h) / (PD.sunset_h - PD.sunrise_h))
  );

  const now_h = new Date().getHours() + new Date().getMinutes() / 60;
  const isDay = now_h >= PD.sunrise_h && now_h <= PD.sunset_h;

  const sun = bezier(t);
  const moon = bezier(tm);

  // Build the progress trail path along bezier
  const progressPath = (() => {
    if (t <= 0) return "";
    const steps = 60;
    let d = `M ${PAD} ${H}`;
    for (let i = 1; i <= steps; i++) {
      const ti = (i / steps) * t;
      const p = bezier(ti);
      d += ` L ${p.x} ${p.y}`;
    }
    return d;
  })();

  const LABEL_Y = H + 20;

  return (
    <Svg width={W} height={H + 28} viewBox={`0 0 ${W} ${H + 28}`}>
      <Defs>
        <LinearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="rgba(255,160,40,0.0)" />
          <Stop offset="0.4" stopColor="rgba(255,185,60,0.5)" />
          <Stop offset="1" stopColor="rgba(255,210,80,0.85)" />
        </LinearGradient>
      </Defs>

      {/* Full arc track */}
      <Path
        d={`M ${PAD} ${H} Q ${W / 2} ${-H * 0.5} ${W - PAD} ${H}`}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* Progress trail */}
      {t > 0 && (
        <Path
          d={progressPath}
          stroke="url(#trailGrad)"
          strokeWidth={1.8}
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* Moon dot */}
      <Circle
        cx={moon.x}
        cy={moon.y}
        r={3.5}
        fill="rgba(220,210,180,0.7)"
      />

      {/* Sun glow layers */}
      <Circle cx={sun.x} cy={sun.y} r={18} fill="rgba(255,200,70,0.04)" />
      <Circle cx={sun.x} cy={sun.y} r={12} fill="rgba(255,200,70,0.08)" />

      {/* Sun ring */}
      <Circle
        cx={sun.x}
        cy={sun.y}
        r={8}
        fill="none"
        stroke="rgba(255,210,80,0.22)"
        strokeWidth={1.2}
      />

      {/* Sun core */}
      <Circle cx={sun.x} cy={sun.y} r={5.5} fill="rgba(255,215,80,0.97)" />

      {/* Sunrise label */}
      <SvgText
        x={PAD}
        y={LABEL_Y}
        fontSize={8.5}
        fill="rgba(255,255,255,0.28)"
        fontFamily="Inter-Regular"
      >
        🌅 {PD.sunrise}
      </SvgText>

      {/* Sunset label */}
      <SvgText
        x={W - PAD}
        y={LABEL_Y}
        fontSize={8.5}
        fill="rgba(255,255,255,0.28)"
        fontFamily="Inter-Regular"
        textAnchor="end"
      >
         {PD.sunset}
      </SvgText>

      {/* "Noon" tick under sun for reference */}
      <SvgText
        x={sun.x}
        y={LABEL_Y}
        fontSize={7.5}
        fill="rgba(255,210,80,0.35)"
        fontFamily="Inter-Regular"
        textAnchor="middle"
      >
        ☀ noon
      </SvgText>
    </Svg>
  );
}