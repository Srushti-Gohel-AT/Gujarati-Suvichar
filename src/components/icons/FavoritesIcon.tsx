import Svg, { Path } from 'react-native-svg';

type IconProps = {
  color?: string;
  size?: number;
};

export function FavoritesIcon({ color = '#000000', size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.39338 9.66527C1.49922 6.8736 2.54422 3.68277 5.47505 2.7386C7.01672 2.2411 8.71838 2.53443 10.0001 3.4986C11.2126 2.5611 12.9767 2.24443 14.5167 2.7386C17.4476 3.68277 18.4992 6.8736 17.6059 9.66527C16.2142 14.0903 10.0001 17.4986 10.0001 17.4986C10.0001 17.4986 3.83172 14.1419 2.39338 9.66527Z"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3335 5.5835C14.2252 5.87183 14.8552 6.66766 14.931 7.60183"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
