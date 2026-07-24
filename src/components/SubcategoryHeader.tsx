import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createThemedStyles, useTheme } from '../theme';
import { ChevronLeftIcon } from './icons';

type SubcategoryHeaderProps = {
  title: string;
  onBack: () => void;
};

export function SubcategoryHeader({ title, onBack }: SubcategoryHeaderProps) {
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useTheme();
  const layout = theme.components.subcategoryHeader;
  const styles = useMemo(() => createHeaderStyles(theme), [theme]);

  const backgroundColor = isDark
    ? theme.colors.surface
    : layout.background;
  const borderColor = isDark ? theme.colors.border : layout.borderColor;

  return (
    <View style={{ backgroundColor }}>
      <View style={{ height: insets.top, backgroundColor }} />
      <View
        style={[
          styles.bar,
          {
            height: layout.barHeight,
            paddingTop: layout.paddingVertical,
            paddingBottom: layout.paddingVertical,
            paddingHorizontal: layout.paddingHorizontal,
            gap: layout.gap,
            borderBottomWidth: layout.borderWidth,
            borderBottomColor: borderColor,
            backgroundColor,
          },
        ]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          onPress={onBack}
          style={styles.sideSlot}>
          <ChevronLeftIcon
            color={theme.colors.textPrimary}
            size={layout.backIconSize}
          />
        </Pressable>

        <Text
          style={[styles.title, { color: theme.colors.textPrimary }]}
          numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.sideSlot} />
      </View>
    </View>
  );
}

function createHeaderStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { backIconSize } = theme.components.subcategoryHeader;

  return createThemedStyles(theme, t => ({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sideSlot: {
      width: backIconSize,
      height: backIconSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      flex: 1,
      ...t.typography.subcategoryHeaderTitle,
      textAlign: 'center',
    },
  }));
}
