export type TabBarBlurType = 'light' | 'dark' | 'xlight';

export type TabBarColors = {
  background: string;
  /** Figma navbar frosted fill (e.g. white @ 20% in light mode). */
  containerBackground: string;
  inactiveIcon: string;
  activeIcon: string;
  activeLabel: string;
  activePillBackground: string;
  activePillBorder: string;
  containerBorder: string;
  blurType: TabBarBlurType;
  blurAmountIos: number;
  blurAmountAndroid: number;
  blurFallback: string;
  ripple: string;
  shadow: string;
  showActivePillShadow: boolean;
};

export type HeaderColors = {
  background: string;
  title: string;
  border: string;
  heartIcon: string;
  heartFill: string;
  heartBorder: string;
  heartBorderWidth: number;
};

export type SemanticColors = {
  primary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  accent: string;
  settingsIcon: string;
  iconCircleBg: string;
  starFilled: string;
  starOutline: string;
  modalBackdrop: string;
  statusBar: string;
  onPrimary: string;
  header: HeaderColors;
  tabBar: TabBarColors;
  toggle: {
    trackOn: string;
    trackOff: string;
    thumb: string;
  };
  rating: {
    headerBackground: string;
    cardBackground: string;
    badgeBackground: string;
    badgeBorder: string;
    submitBackground: string;
    submitText: string;
    title: string;
    dismiss: string;
    starFilled: string;
    starEmpty: string;
  };
};

/** Figma light-mode navbar fill — white @ 20% (prefer rgba for Android compositing) */
const LIGHT_TAB_BAR_CONTAINER_BACKGROUND = 'rgba(255, 255, 255, 0.2)';

/** Header heart button — shared fill/icon; border color varies by theme */
const HEADER_HEART_BORDER_LIGHT = '#DDDDDD';
const HEADER_HEART_BORDER_DARK = '#B0B0B0';
const HEADER_HEART_FILL = '#FFFFFF';
const HEADER_HEART_FILL_DARK = '#000000';
const HEADER_HEART_ICON = '#1A67FF';
const HEADER_HEART_BORDER_WIDTH = 1;

/** Dark-mode settings accent — toggle track and settings row icons */
const DARK_SETTINGS_ACCENT = '#65B2FF';

const lightTabBar: TabBarColors = {
  background: 'transparent',
  containerBackground: LIGHT_TAB_BAR_CONTAINER_BACKGROUND,
  inactiveIcon: '#3D343D',
  activeIcon: '#1A67FF',
  activeLabel: '#1A67FF',
  activePillBackground: '#F0F2FF',
  activePillBorder: 'transparent',
  containerBorder: 'rgba(255, 255, 255, 0.45)',
  blurType: 'light',
  blurAmountIos: 20,
  blurAmountAndroid: 24,
  blurFallback: LIGHT_TAB_BAR_CONTAINER_BACKGROUND,
  ripple: 'rgba(26, 103, 255, 0.12)',
  shadow: '#000000',
  showActivePillShadow: false,
};

/** Figma dark-mode navbar — fill #FFFFFF @ 25%, border @ 50%, blur 20 */
const DARK_TAB_BAR_CONTAINER_BACKGROUND = 'rgba(255, 255, 255, 0.25)';

const darkTabBar: TabBarColors = {
  background: 'transparent',
  containerBackground: DARK_TAB_BAR_CONTAINER_BACKGROUND,
  inactiveIcon: '#FFFFFF',
  activeIcon: '#FFFFFF',
  activeLabel: '#FFFFFF',
  activePillBackground: 'rgba(255, 255, 255, 0.25)',
  activePillBorder: 'rgba(255, 255, 255, 0.5)',
  containerBorder: 'rgba(255, 255, 255, 0.5)',
  blurType: 'dark',
  blurAmountIos: 20,
  blurAmountAndroid: 20,
  blurFallback: DARK_TAB_BAR_CONTAINER_BACKGROUND,
  ripple: 'rgba(255, 255, 255, 0.12)',
  shadow: '#FFFFFF',
  showActivePillShadow: false,
};

export const lightColors: SemanticColors = {
  primary: '#1A67FF',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textMuted: '#9E9E9E',
  border: '#DDDDDD',
  borderLight: '#E0E0E0',
  accent: '#E65100',
  settingsIcon: '#1A67FF',
  iconCircleBg: '#ECF7FF',
  starFilled: '#FFC107',
  starOutline: '#D0D0D0',
  modalBackdrop: 'rgba(0, 0, 0, 0.45)',
  statusBar: '#FFFFFF',
  onPrimary: '#FFFFFF',
  header: {
    background: '#FFFFFF',
    title: '#1A1A1A',
    border: '#E2E2E2',
    heartIcon: HEADER_HEART_ICON,
    heartFill: HEADER_HEART_FILL,
    heartBorder: HEADER_HEART_BORDER_LIGHT,
    heartBorderWidth: HEADER_HEART_BORDER_WIDTH,
  },
  tabBar: lightTabBar,
  toggle: {
    trackOn: '#1A67FF',
    trackOff: '#E0E0E0',
    thumb: '#FFFFFF',
  },
  rating: {
    headerBackground: '#1A67FF',
    cardBackground: '#FFFFFF',
    badgeBackground: '#FFFFFF',
    badgeBorder: '#FFC800',
    submitBackground: '#1A67FF',
    submitText: '#FFFFFF',
    title: '#1A1A1A',
    dismiss: '#9E9E9E',
    starFilled: '#FFC800',
    starEmpty: '#D0D0D0',
  },
};

export const darkColors: SemanticColors = {
  primary: '#1A67FF',
  background: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textMuted: '#9E9E9E',
  border: '#333333',
  borderLight: '#333333',
  accent: '#E65100',
  settingsIcon: DARK_SETTINGS_ACCENT,
  iconCircleBg: '#2A2A2A',
  starFilled: '#FFC107',
  starOutline: '#D0D0D0',
  modalBackdrop: 'rgba(0, 0, 0, 0.6)',
  statusBar: '#000000',
  onPrimary: '#FFFFFF',
  header: {
    background: '#000000',
    title: '#FFFFFF',
    border: '#666666',
    heartIcon: DARK_SETTINGS_ACCENT,
    heartFill: HEADER_HEART_FILL_DARK,
    heartBorder: HEADER_HEART_BORDER_DARK,
    heartBorderWidth: HEADER_HEART_BORDER_WIDTH,
  },
  tabBar: darkTabBar,
  toggle: {
    trackOn: DARK_SETTINGS_ACCENT,
    trackOff: '#E0E0E0',
    thumb: '#FFFFFF',
  },
  rating: {
    headerBackground: '#1A67FF',
    cardBackground: '#1E1E1E',
    badgeBackground: '#FFFFFF',
    badgeBorder: '#FFC800',
    submitBackground: '#1A67FF',
    submitText: '#FFFFFF',
    title: '#FFFFFF',
    dismiss: '#9E9E9E',
    starFilled: '#FFC800',
    starEmpty: '#D0D0D0',
  },
};
