import { Image, StyleProp, View, ViewStyle } from 'react-native';

const WAVE_IMAGE = require('../../assets/rating/rating-wave-bg.png');

type WaveBackgroundProps = {
  height: number;
  style?: StyleProp<ViewStyle>;
};

export function WaveBackground({ height, style }: WaveBackgroundProps) {
  return (
    <View style={[{ width: '100%', height }, style]}>
      <Image
        source={WAVE_IMAGE}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height }}
        resizeMode="stretch"
      />
    </View>
  );
}
