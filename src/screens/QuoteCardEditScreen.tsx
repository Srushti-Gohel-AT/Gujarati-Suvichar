import { useMemo } from 'react';
import { View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme';

export function QuoteCardEditScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createScreenStyles(theme), [theme]);

  return <View style={styles.container} />;
}

function createScreenStyles(theme: ReturnType<typeof useTheme>['theme']) {
  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
  }));
}
