import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { strings } from '../i18n';
import { createThemedStyles, fontFamily, useTheme } from '../theme';
import { RatingStarIcon } from './icons';
import { WaveBackground } from './WaveBackground';

const RATING_STAR_BADGE = require('../../assets/rating/rating-star-badge.png');

type AppRatingModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
};

export function AppRatingModal({
  visible,
  onClose,
  onSubmit,
}: AppRatingModalProps) {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const styles = useMemo(() => createModalStyles(theme), [theme]);
  const { rating: ratingColors } = theme.colors;
  const { ratingModal } = theme.components;

  const handleClose = () => {
    setRating(0);
    onClose();
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
    setRating(0);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
          <View style={styles.header}>
            <WaveBackground
              height={ratingModal.headerHeight}
              style={styles.waveBackground}
            />
            <View
              style={[
                styles.starBadge,
                {
                  borderColor: ratingColors.badgeBorder,
                  backgroundColor: ratingColors.badgeBackground,
                },
              ]}>
              <Image
                source={RATING_STAR_BADGE}
                style={styles.starBadgeImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>{strings.rating.title}</Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(value => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityLabel={strings.rating.starAccessibilityLabel(
                    value,
                  )}
                  onPress={() => setRating(value)}
                  style={styles.starTouch}
                  hitSlop={4}>
                  <RatingStarIcon
                    size={ratingModal.starIconSize}
                    color={
                      value <= rating
                        ? ratingColors.starFilled
                        : ratingColors.starEmpty
                    }
                  />
                </Pressable>
              ))}
            </View>

            <Pressable
              accessibilityRole="button"
              style={[
                styles.submitButton,
                rating === 0 && styles.submitDisabled,
              ]}
              disabled={rating === 0}
              onPress={handleSubmit}>
              <Text style={styles.submitText}>{strings.rating.submit}</Text>
            </Pressable>

            <Pressable accessibilityRole="button" onPress={handleClose}>
              <Text style={styles.dismissText}>{strings.rating.dismiss}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function createModalStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { ratingModal } = theme.components;
  const { rating } = theme.colors;

  return createThemedStyles(theme, t => ({
    backdrop: {
      flex: 1,
      backgroundColor: t.colors.modalBackdrop,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: t.spacing.xxl,
    },
    card: {
      width: '100%',
      maxWidth: ratingModal.maxWidth,
      backgroundColor: rating.cardBackground,
      borderRadius: ratingModal.cardRadius,
      overflow: 'hidden',
      alignItems: 'center',
    },
    header: {
      width: '100%',
      height: ratingModal.headerHeight,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    waveBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    starBadge: {
      width: ratingModal.badgeSize,
      height: ratingModal.badgeSize,
      borderRadius: ratingModal.badgeSize / 2,
      borderWidth: ratingModal.badgeBorderWidth,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -ratingModal.badgeOverlap,
      overflow: 'hidden',
      ...t.shadows.ratingBadge,
    },
    starBadgeImage: {
      width: ratingModal.badgeSize - ratingModal.badgeBorderWidth * 2,
      height: ratingModal.badgeSize - ratingModal.badgeBorderWidth * 2,
    },
    body: {
      width: '100%',
      alignItems: 'center',
      paddingTop: ratingModal.titleMarginTop,
      paddingBottom: t.spacing.xxl,
      paddingHorizontal: ratingModal.contentPaddingHorizontal,
    },
    title: {
      ...t.typography.heading2,
      fontSize: 20,
      lineHeight: 28,
      color: rating.title,
      textAlign: 'center',
      marginBottom: t.spacing.xl,
    },
    starsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: ratingModal.starsGap,
      marginBottom: t.spacing.xxl,
    },
    starTouch: {
      width: ratingModal.starTouchSize,
      height: ratingModal.starTouchSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButton: {
      width: '100%',
      maxWidth: ratingModal.submitButtonMaxWidth,
      height: ratingModal.submitButtonHeight,
      borderRadius: ratingModal.submitButtonHeight / 2,
      backgroundColor: rating.submitBackground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: t.spacing.lg,
    },
    submitDisabled: {
      opacity: 0.45,
    },
    submitText: {
      fontFamily: fontFamily.medium,
      fontSize: 16,
      lineHeight: 20,
      color: rating.submitText,
    },
    dismissText: {
      ...t.typography.bodySmall,
      color: rating.dismiss,
    },
  }));
}
