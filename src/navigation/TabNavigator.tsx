import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '../components/CustomTabBar';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PostsScreen } from '../screens/PostsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTheme } from '../theme';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // Instant swap — fade leaves the previous tab visible at low opacity
        animation: 'none',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 0,
        },
        sceneStyle: {
          backgroundColor: theme.colors.surface,
          // No bottom padding — content must draw under the floating translucent tab bar
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
