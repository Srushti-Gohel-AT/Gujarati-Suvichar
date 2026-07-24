import Svg, { Path } from 'react-native-svg';

type IconProps = {
  color?: string;
  size?: number;
};

export function ChevronLeftIcon({ color = '#000000', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.375 5.25L8.625 12L15.375 18.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
