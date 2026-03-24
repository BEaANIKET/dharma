import React from "react";
import Svg, {
  Circle,
  Line,
  Path,
  Text as SvgText,
} from "react-native-svg";
import { C, polar } from "../panchangData";

interface MuhurtaClockProps {
  size?: number;
}

export default function MuhurtaClock({ size = 148 }: MuhurtaClockProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 3;
  const r = size / 2 - 25;
  const tDeg = (h: number) => (h / 24) * 360 - 90;

  const wins = [
    { s: 4.98, e: 5.77, c: "rgba(200,148,58,0.65)" },
    { s: 6.55, e: 16.28, c: "rgba(255,200,70,0.13)" },
    { s: 8.8, e: 10.47, c: "rgba(58,154,110,0.72)" },
    { s: 14.77, e: 15.58, c: "rgba(58,154,110,0.52)" },
    { s: 16.28, e: 18.87, c: "rgba(200,148,58,0.6)" },
    { s: 8.08, e: 9.63, c: "rgba(184,82,82,0.5)" },
    { s: 11.17, e: 12.7, c: "rgba(184,82,82,0.4)" },
    { s: 12.7, e: 14.25, c: "rgba(184,82,82,0.82)" },
    { s: 7.1, e: 19.33, c: "rgba(184,82,82,0.07)" },
  ];

  const now_h = new Date().getHours() + new Date().getMinutes() / 60;
  const np = polar(cx, cy, R - 4, tDeg(now_h));
  const nowTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={cx}
        cy={cy}
        r={R}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={0.5}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill={C.surface}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={0.5}
      />

      {/* Time windows */}
      {wins.map((w, i) => {
        const a0 = tDeg(w.s);
        const a1 = tDeg(w.e);
        const large = w.e - w.s > 12 ? 1 : 0;
        const mid = (R + r) / 2;
        const pa0 = polar(cx, cy, r + 1, a0);
        const pa1 = polar(cx, cy, r + 1, a1);
        const pb0 = polar(cx, cy, R - 1, a0);
        const pb1 = polar(cx, cy, R - 1, a1);
        return (
          <Path
            key={i}
            d={`M ${pa0.x} ${pa0.y} A ${mid} ${mid} 0 ${large} 1 ${pa1.x} ${pa1.y} L ${pb1.x} ${pb1.y} A ${mid} ${mid} 0 ${large} 0 ${pb0.x} ${pb0.y} Z`}
            fill={w.c}
          />
        );
      })}

      {/* Hour markers */}
      {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
        const a = tDeg(h);
        const p1 = polar(cx, cy, R - 2, a);
        const p2 = polar(cx, cy, R - 8, a);
        const lp = polar(cx, cy, r - 5, a);
        const lbl =
          h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`;
        return (
          <React.Fragment key={h}>
            <Line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.8}
            />
            <SvgText
              x={lp.x}
              y={lp.y + 3}
              fontSize={7}
              textAnchor="middle"
              fill="rgba(255,255,255,0.2)"
              fontFamily="Inter-Regular"
            >
              {lbl}
            </SvgText>
          </React.Fragment>
        );
      })}

      {/* Now hand */}
      <Line
        x1={cx}
        y1={cy}
        x2={np.x}
        y2={np.y}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx={np.x} cy={np.y} r={3} fill="rgba(255,255,255,0.9)" />
      <Circle cx={cx} cy={cy} r={3.5} fill={C.gold} />
      <SvgText
        x={cx}
        y={cy + 5}
        fontSize={9}
        textAnchor="middle"
        fill={C.sub}
        fontFamily="Inter-Medium"
        fontWeight="500"
      >
        {nowTime}
      </SvgText>
    </Svg>
  );
}
