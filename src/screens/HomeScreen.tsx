import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  fetchCategories,
  getHomeCategories,
  type Category,
} from '../api/categories';
import { PopularQuoteCard } from '../components/PopularQuoteCard';
import { POPULAR_QUOTES } from '../data/popularQuotes';
import { strings } from '../i18n';
import { createThemedStyles, useTheme } from '../theme';

export function HomeScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createScreenStyles(theme), [theme]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await fetchCategories();
      setCategories(getHomeCategories(data));
    } catch {
      setCategoriesError(strings.screens.home.categoriesError);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => {
      const imageUrl = item.image?.imageUrl;
      if (!imageUrl) {
        return null;
      }

      return (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.categoryName}
          style={({ pressed }) => [
            styles.categoryItem,
            pressed && styles.categoryItemPressed,
          ]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <Text style={styles.categoryLabel} numberOfLines={2}>
            {item.categoryName}
          </Text>
        </Pressable>
      );
    },
    [styles],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>
          {strings.screens.home.categoriesTitle}
        </Text>

        {categoriesLoading ? (
          <View style={styles.stateRow}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : categoriesError ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadCategories()}
            style={styles.stateRow}>
            <Text style={styles.stateText}>{categoriesError}</Text>
          </Pressable>
        ) : categories.length === 0 ? (
          <View style={styles.stateRow}>
            <Text style={styles.stateText}>
              {strings.screens.home.categoriesEmpty}
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={categories}
              keyExtractor={item => String(item.id)}
              renderItem={renderCategory}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              nestedScrollEnabled
            />
          </View>
        )}
      </View>

      <View style={styles.popularSection}>
        <Text style={styles.popularSectionTitle}>
          {strings.screens.home.popularTitle}
        </Text>
        <View style={styles.popularCardList}>
          {POPULAR_QUOTES.map((quote, index) => (
            <PopularQuoteCard
              key={quote.id}
              quote={quote}
              backgroundColor={
                theme.components.homePopularQuote.cardBackgrounds[
                  index %
                    theme.components.homePopularQuote.cardBackgrounds.length
                ]
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function createScreenStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const categories = theme.components.homeCategories;
  const popular = theme.components.homePopularQuote;

  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    content: {
      paddingBottom: t.components.tabBar.scenePaddingBottom,
    },
    categoriesSection: {
      paddingTop: categories.sectionTopPadding,
    },
    sectionTitle: {
      ...t.typography.sectionTitle,
      color: t.colors.textPrimary,
      paddingHorizontal: categories.sectionHorizontalPadding,
      marginBottom: categories.titleToListGap,
    },
    listContainer: {
      height: categories.containerHeight,
      paddingLeft: categories.sectionHorizontalPadding,
    },
    listContent: {
      gap: categories.itemGap,
      alignItems: 'flex-start',
      paddingRight: categories.sectionHorizontalPadding,
    },
    categoryItem: {
      width: categories.imageSize,
      height: categories.containerHeight,
      alignItems: 'center',
      gap: categories.labelMarginTop,
    },
    categoryItemPressed: {
      opacity: 0.75,
    },
    categoryImage: {
      width: categories.imageSize,
      height: categories.imageSize,
      borderRadius: categories.imageRadius,
      backgroundColor: t.colors.borderLight,
    },
    categoryLabel: {
      ...t.typography.categoryLabel,
      color: t.colors.textPrimary,
      maxWidth: categories.labelMaxWidth,
      textAlign: 'center',
    },
    stateRow: {
      height: categories.containerHeight,
      paddingHorizontal: categories.sectionHorizontalPadding,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    stateText: {
      ...t.typography.bodySmall,
      color: t.colors.textSecondary,
    },
    popularSection: {
      paddingTop: popular.sectionTopPadding,
    },
    popularSectionTitle: {
      ...t.typography.sectionTitle,
      color: t.colors.textPrimary,
      paddingHorizontal: categories.sectionHorizontalPadding,
      marginBottom: popular.titleToCardGap,
    },
    popularCardList: {
      paddingHorizontal: categories.sectionHorizontalPadding,
      gap: popular.cardGap,
    },
  }));
}
