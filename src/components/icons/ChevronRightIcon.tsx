import Svg, { Path } from 'react-native-svg';

type IconProps = {
  color?: string;
  size?: number;
};

export function ChevronRightIcon({ color = '#5D6166', size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M5.75 12.5L10.25 8L5.75 3.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
