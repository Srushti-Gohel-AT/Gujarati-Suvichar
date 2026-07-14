import { darkColors } from './tokens/colors';
import { componentTokens } from './tokens/components';
import { radii } from './tokens/radii';
import { shadows } from './tokens/shadows';
import { spacing } from './tokens/spacing';
import type { Theme } from './types';
import { typography } from './typography';

export const darkTheme: Theme = {
  scheme: 'dark',
  colors: darkColors,
  spacing,
  radii,
  shadows,
  components: componentTokens,
  typography,
};
