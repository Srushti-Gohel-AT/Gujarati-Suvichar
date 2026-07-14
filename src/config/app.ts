import { Linking, Platform } from 'react-native';

export const ANDROID_PACKAGE_NAME = 'com.agreemtech.gujaratisuvichar';

const PLAY_STORE_WEB_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
const PLAY_STORE_MARKET_URL = `market://details?id=${ANDROID_PACKAGE_NAME}`;

export async function openPlayStore(): Promise<void> {
  if (Platform.OS !== 'android') {
    return;
  }

  try {
    const canOpenMarket = await Linking.canOpenURL(PLAY_STORE_MARKET_URL);
    await Linking.openURL(
      canOpenMarket ? PLAY_STORE_MARKET_URL : PLAY_STORE_WEB_URL,
    );
  } catch {
    await Linking.openURL(PLAY_STORE_WEB_URL).catch(() => undefined);
  }
}

export function getPlayStoreShareUrl(): string {
  return PLAY_STORE_WEB_URL;
}
