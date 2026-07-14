import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { loadThemePreference, saveThemePreference } from './themeStorage';
import type { ColorScheme, ColorSchemePreference, Theme } from './types';

type ThemeContextValue = {
  theme: Theme;
  colorScheme: ColorScheme;
  colorSchemePreference: ColorSchemePreference;
  isDark: boolean;
  setColorScheme: (scheme: ColorScheme) => void;
  setColorSchemePreference: (preference: ColorSchemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveScheme(
  preference: ColorSchemePreference,
  systemScheme: ColorSchemeName,
): ColorScheme {
  if (preference === 'system') {
    return systemScheme === 'dark' ? 'dark' : 'light';
  }
  return preference;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] =
    useState<ColorSchemePreference>('system');
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() ?? 'light',
  );

  useEffect(() => {
    loadThemePreference().then(stored => {
      if (stored) {
        setPreference(stored);
      }
    });
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme ?? 'light');
    });
    return () => subscription.remove();
  }, []);

  const colorScheme = resolveScheme(preference, systemScheme);
  const isDark = colorScheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    if (preference === 'system') {
      return;
    }
    Appearance.setColorScheme(preference);
  }, [preference]);

  const setColorSchemePreference = useCallback(
    (nextPreference: ColorSchemePreference) => {
      setPreference(nextPreference);
      void saveThemePreference(nextPreference);
    },
    [],
  );

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      setColorSchemePreference(scheme);
    },
    [setColorSchemePreference],
  );

  const value = useMemo(
    () => ({
      theme,
      colorScheme,
      colorSchemePreference: preference,
      isDark,
      setColorScheme,
      setColorSchemePreference,
    }),
    [
      theme,
      colorScheme,
      preference,
      isDark,
      setColorScheme,
      setColorSchemePreference,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
