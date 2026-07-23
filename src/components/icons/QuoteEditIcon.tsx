import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type IconProps = {
  size?: number;
};

const STROKE = 1.2;
const CX = 15;
const CY = 15;
const ARC_R = 15 - STROKE / 2;

/** Point on rim; θ in degrees, 0 = right, clockwise (SVG y-down). */
function rim(θDeg: number) {
  const θ = (θDeg * Math.PI) / 180;
  return {
    x: CX + ARC_R * Math.cos(θ),
    y: CY + ARC_R * Math.sin(θ),
  };
}

/**
 * Figma quote-card edit control — 30×30 circle + pen.
 * Soft greyish rim at TL + BR (like dark tab bar), biased to sides not center.
 */
export function QuoteEditIcon({ size = 30 }: IconProps) {
  // Left-biased TL arc (stay on left, don't reach top-center)
  const tlStart = rim(160);
  const tlEnd = rim(240);
  // Right-biased BR arc (stay on right, don't reach bottom-center)
  const brStart = rim(75);
  const brEnd = rim(15);

  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Defs>
        {/* Longer soft fade — greyer, more blur at start/end */}
        <LinearGradient id="editTlFade" x1="0" y1="0.2" x2="0.85" y2="0.9">
          <Stop offset="0" stopColor="#B0B0B0" stopOpacity="0" />
          <Stop offset="0.2" stopColor="#BEBEBE" stopOpacity="0.22" />
          <Stop offset="0.42" stopColor="#C8C8C8" stopOpacity="0.52" />
          <Stop offset="0.55" stopColor="#CACACA" stopOpacity="0.58" />
          <Stop offset="0.7" stopColor="#BEBEBE" stopOpacity="0.28" />
          <Stop offset="0.88" stopColor="#B0B0B0" stopOpacity="0.08" />
          <Stop offset="1" stopColor="#A8A8A8" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient id="editBrFade" x1="0.9" y1="0.85" x2="0.15" y2="0.2">
          <Stop offset="0" stopColor="#A8A8A8" stopOpacity="0" />
          <Stop offset="0.2" stopColor="#B8B8B8" stopOpacity="0.2" />
          <Stop offset="0.42" stopColor="#C4C4C4" stopOpacity="0.48" />
          <Stop offset="0.55" stopColor="#C6C6C6" stopOpacity="0.52" />
          <Stop offset="0.7" stopColor="#B8B8B8" stopOpacity="0.25" />
          <Stop offset="0.88" stopColor="#A8A8A8" stopOpacity="0.07" />
          <Stop offset="1" stopColor="#A0A0A0" stopOpacity="0" />
        </LinearGradient>
      </Defs>

      <Circle cx={CX} cy={CY} r={15} fill="white" fillOpacity={0.15} />

      {/* Top-left rim — left side, soft grey blur ends */}
      <Path
        d={`M ${tlStart.x} ${tlStart.y} A ${ARC_R} ${ARC_R} 0 0 1 ${tlEnd.x} ${tlEnd.y}`}
        stroke="url(#editTlFade)"
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="round"
      />

      {/* Bottom-right rim — right side, soft grey blur ends */}
      <Path
        d={`M ${brStart.x} ${brStart.y} A ${ARC_R} ${ARC_R} 0 0 0 ${brEnd.x} ${brEnd.y}`}
        stroke="url(#editBrFade)"
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="round"
      />

      <Path
        d="M15.9531 20.3623H20.5081"
        stroke="white"
        strokeWidth={1.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8982 9.89919C16.9382 9.17919 15.5768 9.37347 14.8568 10.3328C14.8568 10.3328 11.276 15.1028 10.0339 16.7578C8.79175 18.4135 9.96675 20.4649 9.96675 20.4649C9.96675 20.4649 12.2839 20.9978 13.5082 19.3656C14.7332 17.7342 18.331 12.9406 18.331 12.9406C19.051 11.9813 18.8575 10.6192 17.8982 9.89919Z"
        stroke="white"
        strokeWidth={1.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9316 11.5796L17.4059 14.1874"
        stroke="white"
        strokeWidth={1.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
