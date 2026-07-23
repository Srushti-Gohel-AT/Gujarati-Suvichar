import { Platform, type TextStyle } from 'react-native';

/**
 * Anek Gujarati — use typography presets below instead of raw font values.
 *
 * Android resolves fonts by filename (no fontWeight with custom family).
 * iOS resolves fonts by PostScript name from each static TTF.
 */
export const fontFamily = {
  regular: 'AnekGujarati-Regular',
  medium: 'AnekGujarati-Medium',
  bold: 'AnekGujarati-Bold',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

type WeightKey = keyof typeof fontWeight;

const weightToFamily: Record<WeightKey, string> = {
  regular: fontFamily.regular,
  medium: fontFamily.medium,
  semiBold: fontFamily.bold,
  bold: fontFamily.bold,
};

/**
 * Android: weight-specific font file only (fontWeight breaks custom fonts).
 * iOS: font file + fontWeight for design-token parity.
 */
function fontForWeight(
  weight: WeightKey,
): Pick<TextStyle, 'fontFamily' | 'fontWeight'> {
  if (Platform.OS === 'android') {
    return { fontFamily: weightToFamily[weight] };
  }
  return {
    fontFamily: weightToFamily[weight],
    fontWeight: fontWeight[weight],
  };
}

type TypographyStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing'
>;

export const typography = {
  /** Bottom tab label — Anek Gujarati Bold, 16px; line-height matches icon for alignment */
  tabLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    ...(Platform.OS === 'ios' ? { fontWeight: fontWeight.bold } : {}),
    lineHeight: 24,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Persistent app header title — Bold 18; taller line-height for Gujarati glyphs */
  appHeaderTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    ...(Platform.OS === 'ios' ? { fontWeight: fontWeight.bold } : {}),
    lineHeight: 28,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Home / section headings — Anek Gujarati Bold 18, line-height 100% */
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    ...(Platform.OS === 'ios' ? { fontWeight: fontWeight.bold } : {}),
    // lineHeight: 18,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Category card labels — Anek Gujarati Medium 14, line-height 100% */
  categoryLabel: {
    ...fontForWeight('medium'),
    fontSize: 14,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Quote text inside popular quote cards — SemiBold 20 */
  quoteCardText: {
    ...fontForWeight('semiBold'),
    fontSize: 20,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Quote card action count — Anek Gujarati Medium 16, line-height 100% */
  quoteActionCount: {
    ...fontForWeight('medium'),
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Navigation header titles */
  navigationTitle: {
    ...fontForWeight('bold'),
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Large screen headings */
  heading1: {
    ...fontForWeight('bold'),
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Medium screen headings */
  heading2: {
    ...fontForWeight('bold'),
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Default body copy */
  body: {
    ...fontForWeight('regular'),
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Settings list row labels — Medium 16; line-height 22 prevents Gujarati clipping */
  settingsLabel: {
    ...fontForWeight('medium'),
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Version label below settings list — SemiBold 14 */
  versionLabel: {
    ...fontForWeight('semiBold'),
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  } satisfies TypographyStyle,

  /** Secondary / supporting text */
  bodySmall: {
    ...fontForWeight('regular'),
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  } satisfies TypographyStyle,
} as const;
