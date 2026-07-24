import { BlurView } from '@react-native-community/blur';
import { useMemo } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme';

type CategoryGridCardProps = {
  title: string;
  imageUrl?: string;
  onPress?: () => void;
};

export function CategoryGridCard({
  title,
  imageUrl,
  onPress,
}: CategoryGridCardProps) {
  const { theme } = useTheme();
  const { categoryGrid } = theme.components;
  const { tabBar } = theme.colors;
  const styles = useMemo(() => createCardStyles(theme), [theme]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          aspectRatio: categoryGrid.cardAspectRatio,
          borderRadius: categoryGrid.cardRadius,
          backgroundColor: categoryGrid.fallbackBackground,
        },
        pressed && onPress ? styles.pressed : null,
      ]}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            { borderRadius: categoryGrid.cardRadius },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { borderRadius: categoryGrid.cardRadius },
          ]}
        />
      )}
      <View
        style={[
          styles.overlay,
          {
            height: categoryGrid.overlayHeight,
            paddingTop: categoryGrid.overlayPaddingVertical,
            paddingBottom: categoryGrid.overlayPaddingVertical,
            gap: categoryGrid.overlayGap,
            borderBottomLeftRadius: categoryGrid.cardRadius,
            borderBottomRightRadius: categoryGrid.cardRadius,
          },
        ]}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={tabBar.blurType}
          blurAmount={
            Platform.OS === 'ios'
              ? categoryGrid.overlayBlurAmountIos
              : categoryGrid.overlayBlurAmountAndroid
          }
          reducedTransparencyFallbackColor={categoryGrid.overlayTint}
          {...(Platform.OS === 'android'
            ? { overlayColor: 'transparent' }
            : null)}
        />
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: categoryGrid.overlayTint },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.overlayTopBorder,
            {
              height: categoryGrid.overlayTopBorderWidth,
              backgroundColor: categoryGrid.overlayTopBorder,
            },
          ]}
        />
        <Text
          style={[styles.label, { color: categoryGrid.labelColor }]}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

function createCardStyles(theme: ReturnType<typeof useTheme>['theme']) {
  return createThemedStyles(theme, t => ({
    card: {
      flex: 1,
      overflow: 'hidden',
    },
    pressed: {
      opacity: 0.88,
    },
    image: {
      ...absoluteFill,
    },
    fallback: {
      ...absoluteFill,
      backgroundColor: t.components.categoryGrid.fallbackBackground,
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: t.spacing.sm,
      overflow: 'hidden',
    },
    overlayTopBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
    },
    label: {
      ...t.typography.categoryGridLabel,
      textAlign: 'center',
      zIndex: 1,
    },
  }));
}

const absoluteFill = {
  position: 'absolute' as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
