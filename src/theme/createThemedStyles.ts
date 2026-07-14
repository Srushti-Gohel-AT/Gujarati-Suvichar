import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import type { Theme } from './types';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export function createThemedStyles<T extends NamedStyles<T>>(
  theme: Theme,
  factory: (theme: Theme) => T,
): T {
  return StyleSheet.create(factory(theme));
}
