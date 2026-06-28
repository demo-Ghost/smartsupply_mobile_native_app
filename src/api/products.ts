import { apiFetch } from './client';

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

/**
 * NOTE: the backend product routes are not implemented yet. These
 * functions assume a conventional REST shape under `/products`. Adjust
 * the paths/response types once the endpoints exist.
 */
export function listProducts(params: ListProductsParams = {}): Promise<Product[]> {
  return apiFetch<Product[]>('/products', {
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
