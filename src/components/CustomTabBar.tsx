import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.shadowWrapper}>
        <View
          style={[
            styles.container,
            {
              borderColor: tabBar.containerBorder,
              backgroundColor:
                tabBar.background === 'transparent'
                  ? undefined
                  : tabBar.background,
            },
          ]}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: tabBar.blurFallback,
                opacity: 0.95,
              },
            ]}
          />
          {tabBar.containerBackground !== 'transparent' ? (
            <View
              style={[
                styles.containerBackground,
                { backgroundColor: tabBar.containerBackground },
              ]}
            />
          ) : null}
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
                  android_ripple={{
                    color: tabBar.ripple,
                    borderless: false,
                  }}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={[
                    styles.tabItem,
                    isFocused && [
                      styles.tabItemActive,
                      {
                        backgroundColor: tabBar.activePillBackground,
                        borderColor: tabBar.activePillBorder,
                        borderWidth:
                          tabBar.activePillBorder === 'transparent' ? 0 : 1,
                      },
                    ],
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
                    <IconComponent
                      color={iconColor}
                      size={tabBarLayout.iconSize}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
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
    shadowWrapper: {
      width: '100%',
      borderRadius: tabBarLayout.height,
      ...t.shadows.tabBar,
      backgroundColor: 'transparent',
    },
    container: {
      width: '100%',
      height: tabBarLayout.height,
      borderRadius: tabBarLayout.height,
      overflow: 'hidden',
      borderWidth: 1,
    },
    containerBackground: {
      ...StyleSheet.absoluteFill,
    },
    tabRow: {
      flex: 1,
      height: tabBarLayout.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: tabBarLayout.rowPaddingHorizontal,
    },
    tabItem: {
      height: tabBarLayout.itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    tabItemActive: {
      alignSelf: 'center',
      borderRadius: tabBarLayout.itemHeight / 2,
      paddingHorizontal: tabBarLayout.activePillPaddingHorizontal,
      ...(t.colors.tabBar.showActivePillShadow
        ? t.shadows.tabBarActivePill
        : {}),
    },
    tabActiveContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tabBarLayout.activePillGap,
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
