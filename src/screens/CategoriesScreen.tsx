import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { strings } from '../i18n';
import { createThemedStyles, useTheme } from '../theme';

export function CategoriesScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{strings.screens.categories.title}</Text>
      <Text style={styles.subtitle}>{strings.screens.categories.subtitle}</Text> */}
    </View>
  );
}

function createScreenStyles(theme: ReturnType<typeof useTheme>['theme']) {
  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: t.colors.surface,
    },
    title: {
      ...t.typography.heading2,
      color: t.colors.textPrimary,
      marginBottom: t.spacing.sm,
    },
    subtitle: {
      ...t.typography.body,
      color: t.colors.textSecondary,
    },
  }));
}
