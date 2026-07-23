import { API_BASE_URL } from './config';

export type CategoryImage = {
  attachmentId: number;
  imageUrl: string;
  post_title: string;
  post_type: string;
};

export type Subcategory = {
  id: string;
  subcategoryName: string;
  image?: CategoryImage;
};

export type Category = {
  id: number | string;
  categoryName: string;
  image?: CategoryImage;
  subcategory?: Subcategory[];
};

type GetCategoriesResponse = {
  status: number;
  ver: string;
  message: string;
  data: Category[];
};

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/getCategory.php`, {
    method: 'GET',
    headers: { accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to load categories (${response.status})`);
  }

  const json = (await response.json()) as GetCategoriesResponse;

  if (json.status !== 1 || !Array.isArray(json.data)) {
    throw new Error(json.message || 'Failed to load categories');
  }

  return json.data;
}

/** Home strip only shows categories that have a cover image. */
export function getHomeCategories(categories: Category[]): Category[] {
  return categories.filter(category => Boolean(category.image?.imageUrl));
}
