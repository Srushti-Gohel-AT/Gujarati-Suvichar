import { useMemo } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme';
import { SearchIcon } from './icons';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const { theme } = useTheme();
  const { searchBar } = theme.components;
  const styles = useMemo(() => createSearchBarStyles(theme), [theme]);
  const borderColor =
    theme.scheme === 'dark' ? theme.colors.border : searchBar.borderColor;

  return (
    <View
      style={[
        styles.container,
        {
          height: searchBar.height,
          borderRadius: searchBar.borderRadius,
          borderWidth: searchBar.borderWidth,
          borderColor,
          paddingHorizontal: searchBar.paddingHorizontal,
          marginHorizontal: searchBar.marginHorizontal,
          marginTop: searchBar.marginTop,
          marginBottom: searchBar.marginBottom,
          gap: searchBar.iconGap,
        },
      ]}>
      <SearchIcon color={theme.colors.textMuted} size={searchBar.iconSize} />
      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          style={[
            styles.input,
            { transform: [{ translateY: searchBar.textOpticalOffset }] },
          ]}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityRole="search"
          accessibilityLabel={placeholder}
          underlineColorAndroid="transparent"
          {...(Platform.OS === 'android'
            ? { includeFontPadding: false, textAlignVertical: 'center' as const }
            : null)}
        />
      </View>
    </View>
  );
}

function createSearchBarStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const font = theme.typography.searchInput;

  return createThemedStyles(theme, t => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: t.colors.surface,
    },
    inputWrap: {
      flex: 1,
      justifyContent: 'center',
      height: '100%',
      overflow: 'hidden',
    },
    input: {
      width: '100%',
      margin: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
      fontFamily: font.fontFamily,
      fontSize: font.fontSize,
      letterSpacing: font.letterSpacing,
      color: t.colors.textPrimary,
      // Avoid lineHeight on TextInput — it top-aligns Gujarati on iOS
      ...(Platform.OS === 'ios'
        ? { height: 22 }
        : {
            height: 24,
            fontWeight: font.fontWeight,
          }),
    },
  }));
}
