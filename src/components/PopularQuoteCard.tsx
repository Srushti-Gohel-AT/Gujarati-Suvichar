import { useMemo, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { QuotePost } from '../api/posts';
import { createThemedStyles, useTheme } from '../theme';
import { stripHtml } from '../utils/stripHtml';
import {
  QuoteCopyIcon,
  QuoteDownloadIcon,
  QuoteHeartIcon,
  QuoteShareIcon,
} from './icons';

type PopularQuoteCardProps = {
  quote: QuotePost;
};

type ActionItem = {
  key: string;
  count: number;
  accessibilityLabel: string;
  icon: ReactNode;
};

export function PopularQuoteCard({ quote }: PopularQuoteCardProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createCardStyles(theme), [theme]);
  const layout = theme.components.homePopularQuote;

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
      <View style={styles.content}>
        <Text style={styles.quoteText}>{quoteText}</Text>
      </View>
      <View style={styles.actionBar}>
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

function createCardStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const layout = theme.components.homePopularQuote;

  return createThemedStyles(theme, t => ({
    card: {
      width: '100%',
      height: layout.cardHeight,
      borderRadius: layout.cardRadius,
      backgroundColor: layout.cardBackground,
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
    },
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.actionIconGap,
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    actionItemPressed: {
      opacity: 0.7,
    },
    actionCount: {
      ...t.typography.quoteActionCount,
      color: layout.actionCountColor,
    },
  }));
}
