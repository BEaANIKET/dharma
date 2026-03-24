import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";
import { C, PD, polar } from "../panchangData";

interface LunarRingProps {
  size?: number;
}

export default function LunarRing({ size = 130 }: LunarRingProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 4;
  const r = size / 2 - 22;
  const total = 30;
  const cur = PD.moon_day;
  const pm = polar(cx, cy, (R + r) / 2, (14 / total) * 360 - 90);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: total }, (_, i) => {
        const a0 = (i / total) * 360 - 90;
        const a1 = ((i + 1) / total) * 360 - 90;
        const p0 = polar(cx, cy, R, a0 + 0.8);
        const p1 = polar(cx, cy, R, a1 - 0.8);
        const p2 = polar(cx, cy, r, a1 - 0.8);
        const p3 = polar(cx, cy, r, a0 + 0.8);
        const isCur = i === cur - 1;
        const isWax = i < 15;
        const isPast = i < cur;
        const fill = isCur
          ? C.gold
          : isPast
            ? isWax
              ? "rgba(200,148,58,0.5)"
              : "rgba(180,180,200,0.4)"
            : "rgba(255,255,255,0.06)";
        return (
          <Path
            key={i}
            d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r} ${r} 0 0 0 ${p3.x} ${p3.y} Z`}
            fill={fill}
            stroke={
              isCur ? "rgba(200,148,58,0.5)" : "rgba(255,255,255,0.03)"
            }
            strokeWidth={0.5}
          />
        );
      })}
      <Circle
        cx={pm.x}
        cy={pm.y}
        r={3}
        fill="rgba(255,255,255,0.9)"
        opacity={0.8}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={r - 2}
        fill={C.bg}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={0.5}
      />
      <SvgText x={cx} y={cy - 6} fontSize={18} textAnchor="middle">
        🌕
      </SvgText>
      <SvgText
        x={cx}
        y={cy + 9}
        fontSize={11}
        textAnchor="middle"
        fill={C.text}
        fontFamily="CormorantGaramond-Regular"
      >
        Day {cur}
      </SvgText>
      <SvgText
        x={cx}
        y={cy + 19}
        fontSize={7.5}
        textAnchor="middle"
        fill={C.hint}
        fontFamily="Inter-Regular"
      >
        of 30
      </SvgText>
    </Svg>
  );
}
