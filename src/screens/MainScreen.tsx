import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useMemo } from 'react';
import { View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { TabNavigator } from '../navigation/TabNavigator';
import type { RootStackParamList } from '../navigation/types';
import { createThemedStyles, useTheme } from '../theme';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export function MainScreen() {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { theme } = useTheme();
  const styles = useMemo(() => createMainStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppHeader onHeartPress={() => navigation.navigate('LikedQuotes')} />
      <View style={styles.tabs}>
        <TabNavigator />
      </View>
    </View>
  );
}

function createMainStyles(theme: ReturnType<typeof useTheme>['theme']) {
  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    tabs: {
      flex: 1,
    },
  }));
}
