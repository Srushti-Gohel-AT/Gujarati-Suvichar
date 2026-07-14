import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
  color?: string;
  backgroundColor?: string;
  size?: number;
};

export function MoonIcon({
  color = '#1A67FF',
  backgroundColor = '#ECF7FF',
  size = 32,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx={16} cy={16} r={16} fill={backgroundColor} />
      <Path
        d="M14.6013 8.97656C14.2477 10.1466 14.2181 11.3907 14.5157 12.5762C14.8133 13.7617 15.427 14.8443 16.2913 15.7086C17.1556 16.5729 18.2382 17.1866 19.4237 17.4842C20.6092 17.7818 21.8533 17.7522 23.0234 17.3986C22.6842 18.5139 22.0619 19.5223 21.2172 20.3257C20.3725 21.129 19.3341 21.7 18.2032 21.9828C17.0723 22.2656 15.8874 22.2508 14.7639 21.9396C13.6405 21.6285 12.6168 21.0318 11.7925 20.2075C10.9682 19.3832 10.3714 18.3594 10.0603 17.236C9.74915 16.1125 9.73428 14.9276 10.0171 13.7967C10.3 12.6658 10.8709 11.6275 11.6742 10.7827C12.4776 9.93803 13.486 9.31577 14.6013 8.97656Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
