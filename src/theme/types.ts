import type { SemanticColors } from './tokens/colors';
import type { componentTokens } from './tokens/components';
import type { radii } from './tokens/radii';
import type { shadows } from './tokens/shadows';
import type { spacing } from './tokens/spacing';
import type { typography } from './typography';

export type ColorScheme = 'light' | 'dark';
export type ColorSchemePreference = ColorScheme | 'system';

export type Theme = {
  scheme: ColorScheme;
  colors: SemanticColors;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: typeof shadows;
  components: typeof componentTokens;
  typography: typeof typography;
};
