import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { useMemo } from 'react';
import { useTheme } from './ThemeContext';

export function useNavigationTheme(): NavigationTheme {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      ...(theme.scheme === 'dark' ? DarkTheme : DefaultTheme),
      colors: {
        ...(theme.scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
        primary: theme.colors.primary,
        background: theme.colors.surface,
        card: theme.colors.surface,
        text: theme.colors.textPrimary,
        border: theme.colors.border,
      },
    }),
    [theme],
  );
}
