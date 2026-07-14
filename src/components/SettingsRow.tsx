import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme';

type SettingsRowProps = {
  label: string;
  icon: ReactNode;
  rightElement: ReactNode;
  onPress?: () => void;
};

export function SettingsRow({
  label,
  icon,
  rightElement,
  onPress,
}: SettingsRowProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createRowStyles(theme), [theme]);

  const rowContent = (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconSlot}>{icon}</View>
        <View style={styles.labelSlot}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
      <View style={styles.rightSlot}>{rightElement}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.rowPressed]}>
        {rowContent}
      </Pressable>
    );
  }

  return rowContent;
}

function createRowStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { settings } = theme.components;

  return createThemedStyles(theme, t => ({
    row: {
      minHeight: settings.rowHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      overflow: 'visible',
    },
    rowPressed: {
      opacity: 0.7,
    },
    left: {
      flex: 1,
      minHeight: settings.rowHeight,
      flexDirection: 'row',
      alignItems: 'center',
      gap: settings.iconLabelGap,
      marginRight: 8,
      overflow: 'visible',
    },
    iconSlot: {
      width: settings.iconSize,
      height: settings.iconSize,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    labelSlot: {
      flex: 1,
      minHeight: settings.rowHeight,
      justifyContent: 'center',
      overflow: 'visible',
    },
    label: {
      ...t.typography.settingsLabel,
      color: t.colors.textPrimary,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    rightSlot: {
      minHeight: settings.rowHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
}
