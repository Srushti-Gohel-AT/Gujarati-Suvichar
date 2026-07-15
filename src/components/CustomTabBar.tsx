import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { strings } from '../i18n';
import type { TabParamList } from '../navigation/types';
import { createThemedStyles, useTheme } from '../theme';
import {
  CategoriesIcon,
  CategoriesIconSelected,
  FavoritesIcon,
  FavoritesTabIcon,
  HomeIcon,
  HomeIconSelected,
  SettingsIcon,
  SettingsIconSelected,
} from './icons';

type TabRouteName = keyof TabParamList;

type TabIconProps = {
  color?: string;
  size?: number;
};

type TabConfig = {
  label: string;
  Icon: ComponentType<TabIconProps>;
  SelectedIcon: ComponentType<TabIconProps>;
};

const TAB_CONFIG: Record<TabRouteName, TabConfig> = {
  Home: {
    label: strings.tabs.home,
    Icon: HomeIcon,
    SelectedIcon: HomeIconSelected,
  },
  Categories: {
    label: strings.tabs.categories,
    Icon: CategoriesIcon,
    SelectedIcon: CategoriesIconSelected,
  },
  Favorites: {
    label: strings.tabs.favorites,
    Icon: FavoritesIcon,
    SelectedIcon: FavoritesTabIcon,
  },
  Settings: {
    label: strings.tabs.settings,
    Icon: SettingsIcon,
    SelectedIcon: SettingsIconSelected,
  },
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const { tabBar } = theme.colors;
  const { tabBar: tabBarLayout } = theme.components;
  const styles = useMemo(() => createTabBarStyles(theme), [theme]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, tabBarLayout.bottomInsetMin),
          paddingHorizontal: tabBarLayout.horizontalMargin,
        },
      ]}>
      <View
        style={[
          styles.pill,
          {
            backgroundColor: tabBar.containerBackground,
            borderColor: tabBar.containerBorder,
          },
        ]}>
        <View style={styles.tabRow}>
            {state.routes.map((route, index) => {
                const routeName = route.name as TabRouteName;
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const config = TAB_CONFIG[routeName];
                const IconComponent = isFocused
                  ? config.SelectedIcon
                  : config.Icon;
                const iconColor = isFocused
                  ? tabBar.activeIcon
                  : tabBar.inactiveIcon;
                const isFavoritesTab = routeName === 'Favorites';

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                };

                return (
                  <Pressable
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={
                      options.tabBarAccessibilityLabel ?? config.label
                    }
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={({ pressed }) => [
                      styles.tabItem,
                      isFocused && [
                        styles.tabItemActive,
                        { backgroundColor: tabBar.activePillBackground },
                      ],
                      pressed && styles.tabItemPressed,
                    ]}>
                    {isFocused ? (
                      <View style={styles.tabActiveContent}>
                        <View style={styles.tabIconSlot}>
                          {isFavoritesTab ? (
                            <FavoritesTabIcon
                              color={iconColor}
                              size={tabBarLayout.iconSize}
                              variant={isDark ? 'dark' : 'light'}
                            />
                          ) : (
                            <IconComponent
                              color={iconColor}
                              size={tabBarLayout.iconSize}
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.tabLabel,
                            { color: tabBar.activeLabel },
                          ]}>
                          {config.label}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.tabIconSlot}>
                        <IconComponent
                          color={iconColor}
                          size={tabBarLayout.iconSize}
                        />
                      </View>
                    )}
                  </Pressable>
                );
              })}
        </View>
      </View>
    </View>
  );
}

function createTabBarStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { tabBar: tabBarLayout } = theme.components;

  return createThemedStyles(theme, t => ({
    wrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
    },
    pill: {
      width: '100%',
      height: tabBarLayout.height,
      borderRadius: tabBarLayout.height,
      borderWidth: 1,
      ...t.shadows.tabBar,
    },
    tabRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: tabBarLayout.rowPaddingHorizontal,
    },
    tabItem: {
      height: tabBarLayout.itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabItemPressed: {
      opacity: 0.85,
    },
    tabItemActive: {
      width: tabBarLayout.itemWidth,
      height: tabBarLayout.itemHeight,
      borderRadius: tabBarLayout.activePillBorderRadius,
      borderWidth:
        t.colors.tabBar.activePillBorder === 'transparent' ? 0 : 1,
      borderColor: t.colors.tabBar.activePillBorder,
      ...(t.colors.tabBar.showActivePillShadow
        ? t.shadows.tabBarActivePill
        : {}),
    },
    tabActiveContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tabBarLayout.activePillGap,
      paddingHorizontal: tabBarLayout.activePillPaddingHorizontal,
    },
    tabIconSlot: {
      width: tabBarLayout.iconSize,
      height: tabBarLayout.iconSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabLabel: {
      ...t.typography.tabLabel,
      lineHeight: tabBarLayout.iconSize,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  }));
}
