import type { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from 'react-native';
import { fetchCategories, type Subcategory } from '../api/categories';
import {
  CategoryImageGrid,
  type CategoryGridItem,
} from '../components/CategoryImageGrid';
import { strings } from '../i18n';
import type { RootStackParamList } from '../navigation/types';
import { createThemedStyles, useTheme } from '../theme';

type Props = StackScreenProps<RootStackParamList, 'Subcategories'>;

export function SubcategoriesScreen({ route }: Props) {
  const { categoryId } = route.params;
  const { theme } = useTheme();
  const styles = useMemo(() => createScreenStyles(theme), [theme]);

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubcategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      const category = data.find(item => String(item.id) === String(categoryId));
      setSubcategories(category?.subcategory ?? []);
    } catch {
      setError(strings.screens.subcategories.loadError);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    void loadSubcategories();
  }, [loadSubcategories]);

  const items = useMemo(
    (): CategoryGridItem[] =>
      subcategories.map(subcategory => ({
        id: subcategory.id,
        title: subcategory.subcategoryName,
        imageUrl: subcategory.image?.imageUrl,
      })),
    [subcategories],
  );

  const onSubcategoryPress = useCallback((_item: CategoryGridItem) => {
    // Quotes list for a subcategory will be wired in a later task.
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Pressable
          accessibilityRole="button"
          onPress={() => void loadSubcategories()}
          style={styles.statePressable}>
          <Text style={styles.stateText}>{error}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryImageGrid
        data={items}
        onItemPress={onSubcategoryPress}
        contentContainerStyle={styles.gridContent}
        ListEmptyComponent={
          <View style={styles.emptyRow}>
            <Text style={styles.stateText}>
              {strings.screens.subcategories.empty}
            </Text>
          </View>
        }
      />
    </View>
  );
}

function createScreenStyles(theme: ReturnType<typeof useTheme>['theme']) {
  const { categoryGrid } = theme.components;

  return createThemedStyles(theme, t => ({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: t.colors.surface,
      paddingHorizontal: t.spacing.lg,
    },
    gridContent: {
      paddingTop: categoryGrid.sectionTopPadding,
      paddingBottom: categoryGrid.paddingBottom,
    },
    emptyRow: {
      paddingTop: t.spacing.xxl,
      alignItems: 'center',
    },
    statePressable: {
      padding: t.spacing.md,
    },
    stateText: {
      ...t.typography.body,
      color: t.colors.textSecondary,
      textAlign: 'center',
    },
  }));
}
