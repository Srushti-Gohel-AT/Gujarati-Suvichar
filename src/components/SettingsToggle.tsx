import { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme';

type SettingsToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SettingsToggle({ value, onValueChange }: SettingsToggleProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createToggleStyles(theme), [theme]);
  const { toggle } = theme.colors;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? toggle.trackOn : toggle.trackOff },
      ]}>
      <View
        style={[
          styles.thumb,
          value ? styles.thumbOn : styles.thumbOff,
          { backgroundColor: toggle.thumb },
        ]}
      />
    </Pressable>
  );
}

function createToggleStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { settings } = theme.components;

  return createThemedStyles(theme, () => ({
    track: {
      width: settings.toggleTrackWidth,
      height: settings.toggleTrackHeight,
      borderRadius: settings.toggleTrackHeight / 2,
      justifyContent: 'center',
      paddingHorizontal: settings.toggleThumbMargin,
    },
    thumb: {
      width: settings.toggleThumbSize,
      height: settings.toggleThumbSize,
      borderRadius: settings.toggleThumbSize / 2,
    },
    thumbOff: {
      alignSelf: 'flex-start',
    },
    thumbOn: {
      alignSelf: 'flex-end',
    },
  }));
}
