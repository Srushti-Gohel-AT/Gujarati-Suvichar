import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { strings } from '../i18n';
import { LikedQuotesScreen } from '../screens/LikedQuotesScreen';
import { MainScreen } from '../screens/MainScreen';
import { QuoteCardEditScreen } from '../screens/QuoteCardEditScreen';
import { useTheme } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LikedQuotes"
        component={LikedQuotesScreen}
        options={{
          title: strings.navigation.likedQuotesTitle,
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTitleStyle: {
            ...theme.typography.navigationTitle,
            color: theme.colors.textPrimary,
          },
          headerTintColor: theme.colors.textPrimary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="QuoteCardEdit"
        component={QuoteCardEditScreen}
        options={{
          title: strings.navigation.quoteCardEditTitle,
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTitleStyle: {
            ...theme.typography.navigationTitle,
            color: theme.colors.textPrimary,
          },
          headerTintColor: theme.colors.textPrimary,
          headerShadowVisible: false,
          animation: 'fade',
          animationDuration: 300,
        }}
      />
    </Stack.Navigator>
  );
}
