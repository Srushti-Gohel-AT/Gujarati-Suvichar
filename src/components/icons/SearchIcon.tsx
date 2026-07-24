import Svg, { Path } from 'react-native-svg';

type IconProps = {
  color?: string;
  size?: number;
};

export function SearchIcon({ color = '#7A7A7A', size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.80589 17.2959C13.9428 17.2959 17.2964 13.9423 17.2964 9.80541C17.2964 5.66854 13.9428 2.31494 9.80589 2.31494C5.66902 2.31494 2.31543 5.66854 2.31543 9.80541C2.31543 13.9423 5.66902 17.2959 9.80589 17.2959Z"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.0156 15.4043L17.9523 18.3334"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
