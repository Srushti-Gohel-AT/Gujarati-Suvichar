import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { strings } from '../i18n';
import { createThemedStyles, useTheme } from '../theme';

export function HomeScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createScreenStyles(theme, 'home'), [theme]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{strings.screens.home.title}</Text>
      <Text style={styles.subtitle}>{strings.screens.home.subtitle}</Text> */}
    </View>
  );
}

function createScreenStyles(
  theme: ReturnType<typeof useTheme>['theme'],
  variant: 'home' | 'default',
) {
  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: t.colors.surface,
    },
    title: {
      ...(variant === 'home' ? t.typography.heading1 : t.typography.heading2),
      color: variant === 'home' ? t.colors.accent : t.colors.textPrimary,
      marginBottom: t.spacing.sm,
    },
    subtitle: {
      ...t.typography.body,
      color: t.colors.textSecondary,
    },
  }));
}
