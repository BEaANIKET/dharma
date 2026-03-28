import Svg, { Circle, Path } from "react-native-svg";
import { C, polar } from "@/components/cosmic/panchangData";

interface SacredSealProps {
  absorbed: Set<number>;
  size?: number;
}

export default function SacredSeal({ absorbed, size = 40 }: SacredSealProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 3;
  const total = 6;
  const allDone = absorbed.size === total;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="rgba(200,148,58,0.12)"
        strokeWidth={1}
      />
      {Array.from({ length: total }, (_, i) => {
        const a0 = (i / total) * 360 - 90;
        const a1 = ((i + 1) / total) * 360 - 90;
        const p0 = polar(cx, cy, R, a0 + 2);
        const p1 = polar(cx, cy, R, a1 - 2);
        const isOn = absorbed.has(i);
        const d = `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y} Z`;
        return (
          <Path
            key={i}
            d={d}
            fill={isOn ? "rgba(200,148,58,0.3)" : "rgba(255,255,255,0.04)"}
            stroke={
              isOn ? "rgba(200,148,58,0.6)" : "rgba(255,255,255,0.08)"
            }
            strokeWidth={0.5}
          />
        );
      })}
      <Circle
        cx={cx}
        cy={cy}
        r={3}
        fill={allDone ? C.gold : "rgba(200,148,58,0.3)"}
      />
    </Svg>
  );
}
