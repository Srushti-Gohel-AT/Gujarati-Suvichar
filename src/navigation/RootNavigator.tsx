import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import { Platform, Pressable } from 'react-native';
import { ChevronLeftIcon } from '../components/icons';
import { strings } from '../i18n';
import { LikedQuotesScreen } from '../screens/LikedQuotesScreen';
import { MainScreen } from '../screens/MainScreen';
import { QuoteCardEditScreen } from '../screens/QuoteCardEditScreen';
import { SubcategoriesScreen } from '../screens/SubcategoriesScreen';
import { useTheme } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { theme } = useTheme();
  const { subcategoryHeader } = theme.components;
  const headerBackground =
    theme.scheme === 'dark' ? theme.colors.surface : subcategoryHeader.background;
  const headerBorder =
    theme.scheme === 'dark' ? theme.colors.border : subcategoryHeader.borderColor;

  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          ...theme.typography.navigationTitle,
          color: theme.colors.textPrimary,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.colors.surface },
        gestureEnabled: true,
        // Keep previous screen painted under the sliding card (no Home flash)
        detachPreviousScreen: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
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
        }}
      />
      <Stack.Screen
        name="QuoteCardEdit"
        component={QuoteCardEditScreen}
        options={{
          title: strings.navigation.quoteCardEditTitle,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="Subcategories"
        component={SubcategoriesScreen}
        options={({ navigation, route }) => ({
          title: route.params.categoryName,
          headerStyle: {
            backgroundColor: headerBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: subcategoryHeader.borderWidth,
            borderBottomColor: headerBorder,
            ...(Platform.OS === 'android'
              ? { height: subcategoryHeader.barHeight + 24 }
              : null),
          },
          headerTitleStyle: {
            ...theme.typography.subcategoryHeaderTitle,
            color: theme.colors.textPrimary,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: subcategoryHeader.paddingHorizontal,
          },
          headerRightContainerStyle: {
            paddingRight: subcategoryHeader.paddingHorizontal,
          },
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={8}
              onPress={() => navigation.goBack()}
              style={{
                width: subcategoryHeader.backIconSize,
                height: subcategoryHeader.backIconSize,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ChevronLeftIcon
                color={theme.colors.textPrimary}
                size={subcategoryHeader.backIconSize}
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
