export type RootStackParamList = {
  Main: undefined;
  LikedQuotes: undefined;
  QuoteCardEdit: { quoteId: string };
  Subcategories: {
    categoryId: string;
    categoryName: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Posts: undefined;
  Settings: undefined;
};
