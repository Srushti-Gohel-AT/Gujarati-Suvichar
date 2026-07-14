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

export async function loadThemePreference(): Promise<ColorSchemePreference | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return isValidPreference(stored) ? stored : null;
  } catch {
    return null;
  }
}

export async function saveThemePreference(
  preference: ColorSchemePreference,
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Native module unavailable — preference still applies for this session.
  }
}
