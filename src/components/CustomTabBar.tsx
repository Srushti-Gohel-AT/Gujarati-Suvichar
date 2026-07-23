import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Mask, Path, Rect, Stop } from 'react-native-svg';
import { strings } from '../i18n';
import type { TabParamList } from '../navigation/types';
import { createThemedStyles, useTheme } from '../theme';
import {
  CategoriesIcon,
  CategoriesIconSelected,
  HomeIcon,
  HomeIconSelected,
  PostsTabIcon,
  PostsTabIconSelected,
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
  Posts: {
    label: strings.tabs.posts,
    Icon: PostsTabIcon,
    SelectedIcon: PostsTabIconSelected,
  },
  Settings: {
    label: strings.tabs.settings,
    Icon: SettingsIcon,
    SelectedIcon: SettingsIconSelected,
  },
};

/** Figma tab bar edge stroke — restored from main */
const DARK_EDGE_STROKE = 1;

/** Light-theme only: soft outer shadow (Figma 0 0 10px #00000029) */
const FIGMA_SHADOW_BLUR = 10;
const FIGMA_SHADOW_ALPHA = 0x29 / 0xff;
const ANDROID_GLOW_STRENGTH = 0.12;

/**
 * Dark theme partial outline: TL corner + top + bottom + BR corner.
 * Stroke ends fade out (soft) so start/end points are not solid cutoffs.
 * (Exact implementation from main / 8bd997f)
 */
function DarkTabBarEdgeAccent({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  if (width <= 0) {
    return null;
  }

  const r = height / 2;
  const yTop = DARK_EDGE_STROKE / 2;
  const yBottom = height - DARK_EDGE_STROKE / 2;
  // Soft white (not solid) — same in light & dark
  const edgeColor = '#FFFFFF';
  const softColor = '#FFFFFF';
  const cornerColor = '#FFFFFF';
  const cornerSoftColor = '#FFFFFF';

  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}>
      <Defs>
        {/* Top-left arc — soft white, fade at ends */}
        <LinearGradient id="tlCornerFade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={cornerColor} stopOpacity="0.55" />
          <Stop offset="0.3" stopColor={cornerColor} stopOpacity="0.45" />
          <Stop offset="0.55" stopColor={cornerColor} stopOpacity="0.25" />
          <Stop offset="0.78" stopColor={cornerColor} stopOpacity="0.1" />
          <Stop offset="1" stopColor={cornerColor} stopOpacity="0" />
        </LinearGradient>
        {/* Top edge — soft white, fade before top-right */}
        <LinearGradient id="topEdgeFade" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={edgeColor} stopOpacity="0.4" />
          <Stop offset="0.1" stopColor={edgeColor} stopOpacity="0.45" />
          <Stop offset="0.45" stopColor={edgeColor} stopOpacity="0.35" />
          <Stop offset="0.7" stopColor={edgeColor} stopOpacity="0.15" />
          <Stop offset="0.88" stopColor={edgeColor} stopOpacity="0.05" />
          <Stop offset="1" stopColor={edgeColor} stopOpacity="0" />
        </LinearGradient>
        {/* Bottom edge — soft white, stronger near right */}
        <LinearGradient id="bottomEdgeFade" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={softColor} stopOpacity="0" />
          <Stop offset="0.35" stopColor={softColor} stopOpacity="0" />
          <Stop offset="0.55" stopColor={softColor} stopOpacity="0.08" />
          <Stop offset="0.78" stopColor={softColor} stopOpacity="0.28" />
          <Stop offset="0.92" stopColor={softColor} stopOpacity="0.38" />
          <Stop offset="1" stopColor={softColor} stopOpacity="0.4" />
        </LinearGradient>
        {/* Bottom-right arc — soft white, fade at ends */}
        <LinearGradient id="brCornerFade" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor={cornerSoftColor} stopOpacity="0.5" />
          <Stop offset="0.3" stopColor={cornerSoftColor} stopOpacity="0.4" />
          <Stop offset="0.55" stopColor={cornerSoftColor} stopOpacity="0.22" />
          <Stop offset="0.78" stopColor={cornerSoftColor} stopOpacity="0.08" />
          <Stop offset="1" stopColor={cornerSoftColor} stopOpacity="0" />
        </LinearGradient>
      </Defs>

      {/* Top-left quarter: left mid → top mid */}
      <Path
        d={`M ${DARK_EDGE_STROKE / 2} ${r} A ${r - DARK_EDGE_STROKE / 2} ${
          r - DARK_EDGE_STROKE / 2
        } 0 0 1 ${r} ${yTop}`}
        stroke="url(#tlCornerFade)"
        strokeWidth={DARK_EDGE_STROKE}
        fill="none"
        strokeLinecap="round"
      />

      {/* Top flat edge */}
      <Path
        d={`M ${r} ${yTop} L ${width - r} ${yTop}`}
        stroke="url(#topEdgeFade)"
        strokeWidth={DARK_EDGE_STROKE}
        fill="none"
        strokeLinecap="round"
      />

      {/* Bottom flat edge */}
      <Path
        d={`M ${r} ${yBottom} L ${width - r} ${yBottom}`}
        stroke="url(#bottomEdgeFade)"
        strokeWidth={DARK_EDGE_STROKE}
        fill="none"
        strokeLinecap="round"
      />

      {/* Bottom-right quarter: bottom mid → right mid */}
      <Path
        d={`M ${width - r} ${yBottom} A ${r - DARK_EDGE_STROKE / 2} ${
          r - DARK_EDGE_STROKE / 2
        } 0 0 0 ${width - DARK_EDGE_STROKE / 2} ${r}`}
        stroke="url(#brCornerFade)"
        strokeWidth={DARK_EDGE_STROKE}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * Light-theme outer shadow — same ring math as main, but center is masked out
 * so nothing sits under the glass (bar bg stays unchanged).
 */
function LightTabBarOuterShadow({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  if (width <= 0) {
    return null;
  }

  const pad = FIGMA_SHADOW_BLUR;
  const svgW = width + pad * 2;
  const svgH = height + pad * 2;
  const radius = height / 2;

  return (
    <Svg
      pointerEvents="none"
      width={svgW}
      height={svgH}
      style={{ position: 'absolute', top: -pad, left: -pad }}>
      <Defs>
        <Mask id="lightTabShadowHole" x={0} y={0} width={svgW} height={svgH}>
          {/* White = keep shadow; black = punch hole under the pill */}
          <Rect x={0} y={0} width={svgW} height={svgH} fill="#FFFFFF" />
          <Rect
            x={pad}
            y={pad}
            width={width}
            height={height}
            rx={radius}
            ry={radius}
            fill="#000000"
          />
        </Mask>
      </Defs>
      {Array.from({ length: FIGMA_SHADOW_BLUR }, (_, index) => {
        const expand = index + 1;
        const opacity =
          FIGMA_SHADOW_ALPHA *
          (1 - expand / (FIGMA_SHADOW_BLUR + 1)) *
          ANDROID_GLOW_STRENGTH;
        return (
          <Rect
            key={expand}
            x={pad - expand}
            y={pad - expand}
            width={width + expand * 2}
            height={height + expand * 2}
            rx={radius + expand}
            ry={radius + expand}
            fill={`rgba(0,0,0,${opacity})`}
            mask="url(#lightTabShadowHole)"
          />
        );
      })}
    </Svg>
  );
}

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
  const [barWidth, setBarWidth] = useState(0);

  const onBarLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom:
            Math.max(insets.bottom, tabBarLayout.bottomInsetMin) +
            tabBarLayout.bottomMargin,
          paddingHorizontal: tabBarLayout.horizontalMargin,
        },
      ]}>
      <View style={styles.barHost}>
        {/* Light only: main shadow outside pill — never under glass */}
        {!isDark ? (
          Platform.OS === 'ios' ? (
            <View
              pointerEvents="none"
              style={[
                styles.shadowCast,
                {
                  // Figma: box-shadow: 0px 0px 10px 0px #00000029
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: FIGMA_SHADOW_ALPHA,
                  shadowRadius: FIGMA_SHADOW_BLUR,
                  backgroundColor: 'rgba(255,255,255,0.01)',
                },
              ]}
            />
          ) : (
            <LightTabBarOuterShadow
              width={barWidth}
              height={tabBarLayout.height}
            />
          )
        ) : null}

        <View
          onLayout={onBarLayout}
          style={[
            styles.container,
            {
              backgroundColor: 'transparent',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: tabBar.containerBorder,
              overflow: 'hidden',
            },
          ]}>
          {/* Clean glass: blur only + light tint — no heavy overlay */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType={tabBar.blurType}
            blurAmount={
              Platform.OS === 'ios'
                ? tabBar.blurAmountIos
                : tabBar.blurAmountAndroid
            }
            reducedTransparencyFallbackColor={tabBar.blurFallback}
            {...(Platform.OS === 'android'
              ? { overlayColor: 'transparent' }
              : null)}
          />
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: tabBar.containerBackground },
            ]}
          />
          <DarkTabBarEdgeAccent
            width={barWidth}
            height={tabBarLayout.height}
          />
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
                  android_ripple={null}
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
                        <IconComponent
                          color={iconColor}
                          size={tabBarLayout.iconSize}
                        />
                      </View>
                      <View style={styles.tabLabelSlot}>
                        <Text
                          style={[
                            styles.tabLabel,
                            { color: tabBar.activeLabel },
                          ]}
                          numberOfLines={1}>
                          {config.label}
                        </Text>
                      </View>
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
    barHost: {
      width: '100%',
      height: tabBarLayout.height,
      position: 'relative',
      overflow: 'visible',
    },
    shadowCast: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: tabBarLayout.height,
    },
    container: {
      width: '100%',
      height: tabBarLayout.height,
      borderRadius: tabBarLayout.height,
      overflow: 'hidden',
      elevation: 0,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
    },
    tabRow: {
      flex: 1,
      height: tabBarLayout.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: tabBarLayout.rowPaddingHorizontal,
      paddingVertical: tabBarLayout.rowPaddingVertical,
    },
    tabItem: {
      height: tabBarLayout.itemHeight,
      minWidth: tabBarLayout.itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: tabBarLayout.itemHeight / 2,
      elevation: 0,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowColor: 'transparent',
    },
    tabItemActive: {
      alignSelf: 'center',
      paddingHorizontal: tabBarLayout.activePillPaddingHorizontal,
      elevation: 0,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
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
    tabLabelSlot: {
      justifyContent: 'center',
    },
    tabLabel: {
      ...t.typography.tabLabel,
      includeFontPadding: false,
      textAlignVertical: 'center',
      transform: [{ translateY: 2 }],
    },
  }));
}
