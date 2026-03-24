import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface MoonSVGProps {
  size?: number;
}

export default function MoonSVG({ size = 56 }: MoonSVGProps) {
  const r = size / 2 - 1;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="mg" cx="55%" cy="38%" r="65%">
          <Stop offset="0%" stopColor="#F0E4BA" />
          <Stop offset="55%" stopColor="#CEB87A" />
          <Stop offset="100%" stopColor="#8A6830" />
        </RadialGradient>
        <ClipPath id="mc">
          <Circle cx={cx} cy={cy} r={r} />
        </ClipPath>
      </Defs>
      <Circle cx={cx} cy={cy} r={r} fill="#16162A" />
      <Circle cx={cx} cy={cy} r={r} fill="url(#mg)" />
      <Ellipse
        cx={size * 0.3}
        cy={cy}
        rx={size * 0.15}
        ry={r}
        fill="#16162A"
        clipPath="url(#mc)"
        opacity={0.92}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.5}
      />
    </Svg>
  );
}
