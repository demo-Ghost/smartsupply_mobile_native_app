import { apiFetch } from './client';
import { IMAGE_BASE_URL } from './config';

/** Mirrors the canonical `products` table in the backend schema. */
export interface Product {
  public_id: string;
  barcode: string | null;
  title: string;
  description: string | null;
  brand: string | null;
  image_path: string | null;
  category_code: string | null;
  unit_id: number | null;
  is_weighted: boolean;
  weight_grams: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListProductsParams {
  search?: string;
  categoryCode?: string;
  limit?: number;
  offset?: number;
}

export interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

/** The backend wraps list responses in `{ data, pagination }`. */
export interface ListProductsResponse {
  data: Product[];
  pagination: Pagination;
}

export async function listProducts(
  params: ListProductsParams = {},
): Promise<ListProductsResponse> {
  return apiFetch<ListProductsResponse>('/products', {
    query: {
      search: params.search,
      category_code: params.categoryCode,
      limit: params.limit,
      offset: params.offset,
    },
  });
}

export function getProduct(publicId: string): Promise<Product> {
  return apiFetch<Product>(`/products/${publicId}`);
}

/**
 * Resolve a product's `image_path` to a full public image URL.
 * Returns `null` when the product has no image.
 */
export function productImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  return `${IMAGE_BASE_URL}/${imagePath}`;
}
