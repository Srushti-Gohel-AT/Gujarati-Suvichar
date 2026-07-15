import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ColorSchemePreference } from './types';

const STORAGE_KEY = '@theme/colorSchemePreference';

const VALID_PREFERENCES = new Set<ColorSchemePreference>([
  'light',
  'dark',
  'system',
]);

function isValidPreference(
  value: string | null,
): value is ColorSchemePreference {
  return value !== null && VALID_PREFERENCES.has(value as ColorSchemePreference);
}

type ThemePreferencesNative = {
  setPreference: (preference: ColorSchemePreference) => void;
};

function getNativeThemePreferences(): ThemePreferencesNative | undefined {
  return NativeModules.ThemePreferences as ThemePreferencesNative | undefined;
}

export function persistNativeThemePreference(
  preference: ColorSchemePreference,
): void {
  getNativeThemePreferences()?.setPreference(preference);
}

export async function loadThemePreference(): Promise<ColorSchemePreference | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const preference = isValidPreference(stored) ? stored : null;
    if (preference) {
      persistNativeThemePreference(preference);
    }
    return preference;
  } catch {
    return null;
  }
}

export async function saveThemePreference(
  preference: ColorSchemePreference,
): Promise<void> {
  persistNativeThemePreference(preference);

  try {
    await AsyncStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Native module unavailable — preference still applies for this session.
  }
}
