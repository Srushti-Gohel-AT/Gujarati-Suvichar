import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
  color?: string;
  backgroundColor?: string;
  size?: number;
};

export function ShareIcon({
  color = '#1A67FF',
  backgroundColor = '#ECF7FF',
  size = 32,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx={16} cy={16} r={16} fill={backgroundColor} />
      <Path
        d="M11.5 18.25C12.7426 18.25 13.75 17.2426 13.75 16C13.75 14.7574 12.7426 13.75 11.5 13.75C10.2574 13.75 9.25 14.7574 9.25 16C9.25 17.2426 10.2574 18.25 11.5 18.25Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.375 23.3125C20.6176 23.3125 21.625 22.3051 21.625 21.0625C21.625 19.8199 20.6176 18.8125 19.375 18.8125C18.1324 18.8125 17.125 19.8199 17.125 21.0625C17.125 22.3051 18.1324 23.3125 19.375 23.3125Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.375 13.1875C20.6176 13.1875 21.625 12.1801 21.625 10.9375C21.625 9.69486 20.6176 8.6875 19.375 8.6875C18.1324 8.6875 17.125 9.69486 17.125 10.9375C17.125 12.1801 18.1324 13.1875 19.375 13.1875Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.4829 12.1538L13.3921 14.7835"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3921 17.2163L17.4829 19.846"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
