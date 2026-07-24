import { useCallback, useMemo, type ReactElement } from 'react';
import {
  FlatList,
  type ListRenderItem,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { createThemedStyles, useTheme } from '../theme';
import { CategoryGridCard } from './CategoryGridCard';

export type CategoryGridItem = {
  id: string;
  title: string;
  imageUrl?: string;
};

type CategoryImageGridProps = {
  data: CategoryGridItem[];
  onItemPress?: (item: CategoryGridItem) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  ListEmptyComponent?: ReactElement | null;
  ListHeaderComponent?: ReactElement | null;
};

type GridRowItem = CategoryGridItem | { id: string; spacer: true };

function isSpacer(item: GridRowItem): item is { id: string; spacer: true } {
  return 'spacer' in item && item.spacer;
}

export function CategoryImageGrid({
  data,
  onItemPress,
  contentContainerStyle,
  ListEmptyComponent,
  ListHeaderComponent,
}: CategoryImageGridProps) {
  const { theme } = useTheme();
  const { categoryGrid } = theme.components;
  const styles = useMemo(() => createGridStyles(theme), [theme]);

  const gridData = useMemo((): GridRowItem[] => {
    if (data.length > 0 && data.length % 2 === 1) {
      return [...data, { id: '__category-grid-spacer__', spacer: true }];
    }
    return data;
  }, [data]);

  const renderItem: ListRenderItem<GridRowItem> = useCallback(
    ({ item }) => {
      if (isSpacer(item)) {
        return <View style={styles.cell} />;
      }

      return (
        <View style={styles.cell}>
          <CategoryGridCard
            title={item.title}
            imageUrl={item.imageUrl}
            onPress={onItemPress ? () => onItemPress(item) : undefined}
          />
        </View>
      );
    },
    [onItemPress, styles.cell],
  );

  return (
    <FlatList
      data={gridData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      columnWrapperStyle={[styles.row, { gap: categoryGrid.gap }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingHorizontal: categoryGrid.horizontalPadding,
          paddingBottom: categoryGrid.paddingBottom,
          rowGap: categoryGrid.gap,
        },
        contentContainerStyle,
      ]}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

function createGridStyles(theme: ReturnType<typeof useTheme>['theme']) {
  return createThemedStyles(theme, () => ({
    content: {
      flexGrow: 1,
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
    },
  }));
}
