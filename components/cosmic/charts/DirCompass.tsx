import Svg, {
  Circle,
  G,
  Line,
  Text as SvgText,
} from "react-native-svg";
import { C, polar } from "../panchangData";

interface DirCompassProps {
  size?: number;
}

export default function DirCompass({ size = 114 }: DirCompassProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 4;

  const dirs = [
    { l: "N", a: 0, bad: true },
    { l: "NE", a: 45 },
    { l: "E", a: 90, good: true },
    { l: "SE", a: 135 },
    { l: "S", a: 180, good: true },
    { l: "SW", a: 225, rahu: true },
    { l: "W", a: 270 },
    { l: "NW", a: 315 },
  ] as const;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={cx}
        cy={cy}
        r={R}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.5}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={R * 0.5}
        fill="rgba(255,255,255,0.01)"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={0.5}
      />

      {[0, 45, 90, 135].map((a) => {
        const p1 = polar(cx, cy, R * 0.15, a);
        const p2 = polar(cx, cy, R * 0.88, a + 180);
        return (
          <Line
            key={a}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={
              a % 90 === 0
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.05)"
            }
            strokeWidth={a % 90 === 0 ? 0.8 : 0.5}
            strokeDasharray={a % 90 !== 0 ? "2 3" : undefined}
          />
        );
      })}

      {dirs.map((d, i) => {
        const lp = polar(cx, cy, R - 8, d.a);
        const op = polar(cx, cy, R * 0.6, d.a);
        const bad = "bad" in d && d.bad;
        const rahu = "rahu" in d && d.rahu;
        const good = "good" in d && d.good;
        const c = bad
          ? "rgba(184,82,82,0.88)"
          : rahu
            ? "rgba(130,90,90,0.75)"
            : good
              ? "rgba(58,154,110,0.88)"
              : "rgba(255,255,255,0.32)";
        return (
          <G key={i}>
            {(bad || rahu || good) && (
              <Circle
                cx={op.x}
                cy={op.y}
                r={bad ? 7 : 6}
                fill={
                  bad
                    ? "rgba(184,82,82,0.1)"
                    : rahu
                      ? "rgba(130,90,90,0.1)"
                      : "rgba(58,154,110,0.1)"
                }
                stroke={c}
                strokeWidth={0.8}
              />
            )}
            <SvgText
              x={lp.x}
              y={lp.y + 4}
              fontSize={d.l.length === 1 ? 11 : 7.5}
              textAnchor="middle"
              fill={c}
              fontFamily="Inter-Regular"
              fontWeight={d.l.length === 1 ? "600" : "400"}
            >
              {d.l}
            </SvgText>
          </G>
        );
      })}

      <Circle
        cx={cx}
        cy={cy}
        r={9}
        fill="rgba(200,148,58,0.1)"
        stroke="rgba(200,148,58,0.28)"
        strokeWidth={0.8}
      />
      <Circle cx={cx} cy={cy} r={3} fill={C.gold} />
    </Svg>
  );
}
