import Svg, {
  Circle,
  G,
  Path,
  Text as SvgText,
} from "react-native-svg";
import { C, NAKSHATRA_NAMES, PD, polar } from "../panchangData";

interface NakshatraWheelProps {
  size?: number;
}

export default function NakshatraWheel({ size = 130 }: NakshatraWheelProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 2;
  const rI = size / 2 - 20;
  const total = NAKSHATRA_NAMES.length;
  const ci = PD.nakshatra_idx;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {NAKSHATRA_NAMES.map((n, i) => {
        const a0 = (i / total) * 360 - 90;
        const a1 = ((i + 1) / total) * 360 - 90;
        const aMid = (a0 + a1) / 2;
        const p0 = polar(cx, cy, R, a0 + 0.4);
        const p1 = polar(cx, cy, R, a1 - 0.4);
        const p2 = polar(cx, cy, rI, a1 - 0.4);
        const p3 = polar(cx, cy, rI, a0 + 0.4);
        const isCur = i === ci;
        const isNext = i === (ci + 1) % total;
        const fill = isCur
          ? C.gold
          : isNext
            ? "rgba(200,148,58,0.28)"
            : "rgba(255,255,255,0.05)";
        const lp = polar(cx, cy, (R + rI) / 2, aMid);
        return (
          <G key={i}>
            <Path
              d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${rI} ${rI} 0 0 0 ${p3.x} ${p3.y} Z`}
              fill={fill}
              stroke={
                isCur ? "rgba(200,148,58,0.5)" : "rgba(255,255,255,0.04)"
              }
              strokeWidth={0.5}
            />
            {(isCur || isNext) && (
              <SvgText
                x={lp.x}
                y={lp.y + 3}
                fontSize={5}
                textAnchor="middle"
                fill={
                  isCur
                    ? "rgba(20,15,5,0.9)"
                    : "rgba(200,148,58,0.7)"
                }
                fontFamily="Inter-SemiBold"
                fontWeight="600"
              >
                {n.substring(0, 3)}
              </SvgText>
            )}
          </G>
        );
      })}
      <Circle
        cx={cx}
        cy={cy}
        r={rI - 2}
        fill={C.bg}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={0.5}
      />
      <SvgText x={cx} y={cy - 6} fontSize={16} textAnchor="middle">
        ⭐
      </SvgText>
      <SvgText
        x={cx}
        y={cy + 8}
        fontSize={9}
        textAnchor="middle"
        fill={C.sub}
        fontFamily="CormorantGaramond-Regular"
      >
        U.Phalguni
      </SvgText>
      <SvgText
        x={cx}
        y={cy + 18}
        fontSize={7}
        textAnchor="middle"
        fill={C.hint}
        fontFamily="Inter-Regular"
      >
        12 of 27
      </SvgText>
    </Svg>
  );
}
