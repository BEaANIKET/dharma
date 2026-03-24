import React from "react";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";
import { timeToDecimal } from "../panchangData";

interface DayGlanceProps {
  width?: number;
}

export default function DayGlance({ width = 310 }: DayGlanceProps) {
  const W = width;
  const H = 46;
  const S = 6;
  const E = 19.5;
  const span = E - S;
  const xOf = (sh: string) =>
    Math.max(0, Math.min(W, ((timeToDecimal(sh) - S) / span) * W));

  const bars = [
    { s: "04:59 AM", e: "05:46 AM", c: "rgba(200,148,58,0.6)", y: 8, h: 6 },
    { s: "06:33 AM", e: "04:17 PM", c: "rgba(255,200,70,0.11)", y: 6, h: 36 },
    { s: "08:48 AM", e: "10:28 AM", c: "rgba(58,154,110,0.72)", y: 14, h: 8 },
    { s: "02:46 PM", e: "03:35 PM", c: "rgba(58,154,110,0.5)", y: 24, h: 6 },
    { s: "04:17 PM", e: "06:52 PM", c: "rgba(200,148,58,0.6)", y: 14, h: 8 },
    { s: "08:05 AM", e: "09:38 AM", c: "rgba(184,82,82,0.5)", y: 30, h: 6 },
    { s: "12:42 PM", e: "02:15 PM", c: "rgba(184,82,82,0.82)", y: 30, h: 6 },
    { s: "07:06 AM", e: "06:52 PM", c: "rgba(184,82,82,0.07)", y: 6, h: 36 },
  ];

  const now_h = new Date().getHours() + new Date().getMinutes() / 60;
  const nowX =
    now_h >= S && now_h <= E ? ((now_h - S) / span) * W : -1;

  return (
    <Svg width={W} height={H + 16} viewBox={`0 0 ${W} ${H + 16}`}>
      <Rect
        x={0}
        y={4}
        width={W}
        height={H}
        rx={5}
        fill="rgba(255,255,255,0.02)"
      />
      {bars.map((b, i) => {
        const x1 = xOf(b.s);
        const x2 = xOf(b.e);
        return (
          <Rect
            key={i}
            x={x1}
            y={b.y}
            width={Math.max(2, x2 - x1)}
            height={b.h}
            rx={2}
            fill={b.c}
          />
        );
      })}
      {[6, 8, 10, 12, 14, 16, 18].map((t) => {
        const x = ((t - S) / span) * W;
        return (
          <React.Fragment key={t}>
            <Line
              x1={x}
              y1={H + 4}
              x2={x}
              y2={H + 8}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />
            <SvgText
              x={x}
              y={H + 15}
              fontSize={7.5}
              fill="rgba(255,255,255,0.2)"
              fontFamily="Inter-Regular"
              textAnchor="middle"
            >
              {t > 12 ? t - 12 : t}
              {t >= 12 ? "p" : "a"}
            </SvgText>
          </React.Fragment>
        );
      })}
      {nowX > 0 ? (
        <Line
          x1={nowX}
          y1={4}
          x2={nowX}
          y2={H + 3}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={1.5}
          strokeDasharray="3 2"
        />
      ) : null}
    </Svg>
  );
}
