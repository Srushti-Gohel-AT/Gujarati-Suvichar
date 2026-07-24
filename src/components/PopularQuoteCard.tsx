import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useMemo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { QuotePost } from '../api/posts';
import type { RootStackParamList } from '../navigation/types';
import { createThemedStyles, useTheme } from '../theme';
import { stripHtml } from '../utils/stripHtml';
import {
  QuoteCopyIcon,
  QuoteDownloadIcon,
  QuoteEditIcon,
  QuoteHeartIcon,
  QuoteShareIcon,
} from './icons';

type PopularQuoteCardProps = {
  quote: QuotePost;
  backgroundColor?: string;
};

type ActionItem = {
  key: string;
  count: number;
  accessibilityLabel: string;
  icon: ReactNode;
};

type RootNavigation = StackNavigationProp<RootStackParamList>;

export function PopularQuoteCard({
  quote,
  backgroundColor,
}: PopularQuoteCardProps) {
  const navigation = useNavigation<RootNavigation>();
  const { theme } = useTheme();
  const layout = theme.components.homePopularQuote;
  const cardBg =
    backgroundColor ?? layout.cardBackgrounds[0] ?? '#CC2E49';
  const styles = useMemo(
    () => createCardStyles(theme, cardBg),
    [theme, cardBg],
  );

  if (!quote?.shaayriText) {
    return null;
  }

  const plainText = stripHtml(quote.shaayriText)
    .replace(/^["“]+/, '')
    .replace(/["”]+$/, '');
  const quoteText = `"${plainText}"`;

  const actions: ActionItem[] = [
    {
      key: 'favorite',
      count: quote.favoriteCount,
      accessibilityLabel: 'Favorite',
      icon: (
        <QuoteHeartIcon
          color={layout.actionCountColor}
          size={layout.actionIconSize}
        />
      ),
    },
    {
      key: 'copy',
      count: quote.copyCount,
      accessibilityLabel: 'Copy',
      icon: (
        <QuoteCopyIcon
          color={layout.actionCountColor}
          size={layout.actionIconSize}
        />
      ),
    },
    {
      key: 'download',
      count: quote.downloadCount,
      accessibilityLabel: 'Download',
      icon: (
        <QuoteDownloadIcon
          color={layout.actionCountColor}
          size={layout.actionIconSize}
        />
      ),
    },
    {
      key: 'share',
      count: quote.shareCount,
      accessibilityLabel: 'Share',
      icon: (
        <QuoteShareIcon
          color={layout.actionCountColor}
          size={layout.actionIconSize}
        />
      ),
    },
  ];

  return (
    <View style={styles.card}>
      <View pointerEvents="none" style={styles.decorLarge} />
      <View pointerEvents="none" style={styles.decorSmall} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Edit quote"
        onPress={() =>
          navigation.navigate('QuoteCardEdit', { quoteId: quote.id })
        }
        style={({ pressed }) => [
          styles.editButton,
          pressed && styles.editButtonPressed,
        ]}>
        <QuoteEditIcon size={layout.editButtonSize} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.quoteText}>{quoteText}</Text>
      </View>
      <View style={styles.actionBar}>
        <View pointerEvents="none" style={styles.actionBarTopBorder} />
        {actions.map(action => (
          <Pressable
            key={action.key}
            accessibilityRole="button"
            accessibilityLabel={`${action.accessibilityLabel}, ${action.count}`}
            style={({ pressed }) => [
              styles.actionItem,
              pressed && styles.actionItemPressed,
            ]}>
            {action.icon}
            <Text style={styles.actionCount}>{action.count}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function createCardStyles(
  theme: ReturnType<typeof useTheme>['theme'],
  cardBackground: string,
) {
  const layout = theme.components.homePopularQuote;

  return createThemedStyles(theme, t => ({
    card: {
      width: '100%',
      height: layout.cardHeight,
      borderRadius: layout.cardRadius,
      backgroundColor: cardBackground,
      overflow: 'hidden',
      position: 'relative',
    },
    decorLarge: {
      position: 'absolute',
      top: layout.decorLargeOffset,
      left: layout.decorLargeOffset,
      width: layout.decorLargeSize,
      height: layout.decorLargeSize,
      borderRadius: layout.decorLargeSize / 2,
      backgroundColor: layout.decorColor,
      opacity: layout.decorOpacity,
    },
    decorSmall: {
      position: 'absolute',
      top: layout.decorSmallTop,
      right: layout.decorSmallRight,
      width: layout.decorSmallSize,
      height: layout.decorSmallSize,
      borderRadius: layout.decorSmallSize / 2,
      backgroundColor: layout.decorColor,
      opacity: layout.decorOpacity,
    },
    editButton: {
      position: 'absolute',
      top: layout.editButtonTop,
      right: layout.editButtonRight,
      width: layout.editButtonSize,
      height: layout.editButtonSize,
      zIndex: 3,
    },
    editButtonPressed: {
      opacity: 0.7,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: layout.cardPaddingHorizontal,
      paddingTop: layout.cardPaddingVertical,
      paddingBottom: layout.cardPaddingVertical,
      zIndex: 1,
    },
    quoteText: {
      ...t.typography.quoteCardText,
      color: layout.quoteColor,
      textAlign: 'center',
    },
    actionBar: {
      height: layout.actionBarHeight,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: layout.actionBarBackground,
      borderBottomLeftRadius: layout.cardRadius,
      borderBottomRightRadius: layout.cardRadius,
      zIndex: 2,
      position: 'relative',
    },
    actionBarTopBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: StyleSheet.hairlineWidth,
      backgroundColor: layout.actionBarTopBorder,
    },
    actionItem: {
      width: layout.actionItemWidth,
      height: layout.actionItemHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: layout.actionIconGap,
    },
    actionItemPressed: {
      opacity: 0.7,
    },
    actionCount: {
      ...t.typography.quoteActionCount,
      color: layout.actionCountColor,
      textAlign: 'center',
      includeFontPadding: false,
      textShadowColor: 'transparent',
      textShadowRadius: 0,
      textShadowOffset: { width: 0, height: 0 },
    },
  }));
}
