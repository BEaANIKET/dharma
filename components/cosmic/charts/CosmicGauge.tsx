import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";
import { arcPath, C, polar } from "../panchangData";

interface CosmicGaugeProps {
  score: number;
  size?: number;
}

export default function CosmicGauge({ score, size = 152 }: CosmicGaugeProps) {
  const scale = size / 152;
  const H = Math.round(98 * scale);
  const cx = 76 * scale;
  const cy = 92 * scale;
  const R = 60 * scale;

  const startA = -210;
  const endA = 30;
  const range = 240;
  const fillA = startA + (score / 10) * range;
  const needlePt = polar(cx, cy, R, fillA);
  const coverLarge = fillA + 180 < endA ? 1 : 0;

  const segments = [
    { from: startA, to: startA + range * 0.4, c: "rgba(184,82,82,0.55)" },
    { from: startA + range * 0.4, to: startA + range * 0.7, c: "rgba(200,148,58,0.65)" },
    { from: startA + range * 0.7, to: startA + range, c: "rgba(58,154,110,0.65)" },
  ];

  return (
    <Svg width={size} height={H} viewBox={`0 0 ${size} ${H}`}>
      {/* Background arc */}
      <Path
        d={arcPath(cx, cy, R, startA, endA, 1)}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={9 * scale}
        fill="none"
        strokeLinecap="round"
      />
      {/* Colored segments */}
      {segments.map((seg, i) => (
        <Path
          key={i}
          d={arcPath(cx, cy, R, seg.from, seg.to, 0)}
          stroke={seg.c}
          strokeWidth={9 * scale}
          fill="none"
        />
      ))}
      {/* Cover unfilled */}
      <Path
        d={arcPath(cx, cy, R, fillA, endA, coverLarge)}
        stroke={C.bg}
        strokeWidth={10 * scale}
        fill="none"
      />
      {/* Needle */}
      <Circle
        cx={needlePt.x}
        cy={needlePt.y}
        r={6 * scale}
        fill={C.gold}
      />
      <Circle
        cx={needlePt.x}
        cy={needlePt.y}
        r={11 * scale}
        fill="none"
        stroke="rgba(200,148,58,0.3)"
        strokeWidth={1}
      />
      {/* Score */}
      <SvgText
        x={cx}
        y={cy - 12 * scale}
        fontSize={26 * scale}
        textAnchor="middle"
        fill={C.gold}
        fontFamily="CormorantGaramond-Regular"
      >
        {score}
      </SvgText>
      <SvgText
        x={cx}
        y={cy + 3 * scale}
        fontSize={8.5 * scale}
        textAnchor="middle"
        fill={C.hint}
        fontFamily="Inter-Regular"
      >
        /10
      </SvgText>
    </Svg>
  );
}
