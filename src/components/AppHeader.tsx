import { Platform, Pressable, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useMemo } from 'react';
import { strings } from '../i18n';
import { createThemedStyles, useTheme } from '../theme';
import { HeaderHeartIcon, HeaderLogoIcon } from './icons';

const HEADER_TOP_SHADOW_MASK_HEIGHT = 20;

type AppHeaderProps = {
  onHeartPress: () => void;
};

export function AppHeader({ onHeartPress }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useTheme();
  const { header } = theme.colors;
  const { header: headerLayout } = theme.components;
  const screenBackground = theme.colors.surface;
  const styles = useMemo(() => createHeaderStyles(theme), [theme]);
  const bottomRadius = headerLayout.borderRadius;

  return (
    <View style={[styles.outer, { backgroundColor: screenBackground }]}>
      <View
        pointerEvents="none"
        style={[
          styles.statusBarFill,
          {
            height: insets.top,
            backgroundColor: header.background,
          },
        ]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.headerContainer}>
          {!isDark ? (
            <View
              pointerEvents="none"
              style={[
                styles.topShadowMask,
                { backgroundColor: header.background },
              ]}
            />
          ) : null}

          <View
            style={[
              styles.headerShadowShell,
              !isDark && theme.shadows.headerBottom,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
                backgroundColor: header.background,
              },
            ]}>
            <View
              style={[
                styles.headerFrame,
                {
                  borderBottomLeftRadius: bottomRadius,
                  borderBottomRightRadius: bottomRadius,
                },
              ]}>
              <View style={styles.content}>
                <View style={styles.titleGroup}>
                  <View style={styles.logo}>
                    <HeaderLogoIcon
                      width={headerLayout.logoWidth}
                      height={headerLayout.logoHeight}
                    />
                  </View>
                  <Text
                    style={[styles.title, { color: header.title }]}
                    numberOfLines={1}>
                    {strings.app.title}
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={strings.app.headerAccessibilityLabel}
                  onPress={onHeartPress}
                  style={({ pressed }) => [
                    styles.heartButton,
                    {
                      backgroundColor: header.heartFill,
                      borderColor: header.heartBorder,
                      borderWidth: header.heartBorderWidth,
                    },
                    pressed && styles.heartButtonPressed,
                  ]}
                  hitSlop={4}>
                  <HeaderHeartIcon
                    color={header.heartIcon}
                    size={headerLayout.heartIconSize}
                  />
                </Pressable>
              </View>

              <View
                pointerEvents="none"
                style={[
                  styles.bottomBorderArc,
                  {
                    height: bottomRadius,
                    borderColor: header.border,
                    borderBottomLeftRadius: bottomRadius,
                    borderBottomRightRadius: bottomRadius,
                    borderBottomWidth: headerLayout.frameBorderBottomWidth,
                    borderLeftWidth: headerLayout.frameBorderBottomWidth,
                    borderRightWidth: headerLayout.frameBorderBottomWidth,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function createHeaderStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { header: headerLayout } = theme.components;

  return createThemedStyles(theme, t => ({
    outer: {
      width: '100%',
      position: 'relative',
      overflow: 'visible',
    },
    statusBarFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    safeArea: {
      width: '100%',
      backgroundColor: 'transparent',
      zIndex: 2,
      overflow: 'visible',
    },
    headerContainer: {
      width: '100%',
      position: 'relative',
      overflow: 'visible',
    },
    topShadowMask: {
      position: 'absolute',
      top: -HEADER_TOP_SHADOW_MASK_HEIGHT,
      left: -24,
      right: -24,
      height: HEADER_TOP_SHADOW_MASK_HEIGHT,
      zIndex: 2,
    },
    headerShadowShell: {
      width: '100%',
      overflow: 'visible',
    },
    headerFrame: {
      width: '100%',
      position: 'relative',
      overflow: 'visible',
    },
    bottomBorderArc: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    content: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: headerLayout.gap,
      paddingBottom: headerLayout.paddingBottom,
      paddingHorizontal: headerLayout.paddingHorizontal,
      overflow: 'visible',
    },
    titleGroup: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: headerLayout.titleGroupGap,
      marginRight: 8,
      minWidth: 0,
      minHeight: Math.max(headerLayout.logoHeight, 28),
      overflow: 'visible',
    },
    logo: {
      width: headerLayout.logoWidth,
      height: headerLayout.logoHeight,
      flexShrink: 0,
    },
    title: {
      ...t.typography.appHeaderTitle,
      flexShrink: 1,
      ...(Platform.OS === 'android' ? { includeFontPadding: true } : {}),
      textAlignVertical: 'center',
    },
    heartButton: {
      width: headerLayout.heartButtonSize,
      height: headerLayout.heartButtonSize,
      borderRadius: headerLayout.heartButtonSize / 2,
      padding: headerLayout.heartButtonPadding,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    heartButtonPressed: {
      opacity: 0.7,
    },
  }));
}
