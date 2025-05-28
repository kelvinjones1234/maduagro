// interface ProductCategory {
//   category_name: string;
// }

// interface Product {
//   id: number;
//   product_name: string;
//   product_price: number;
//   category_name: string;
//   product_category: ProductCategory;
//   available: boolean;
//   image: string;
//   rating: number;
//   [key: string]: any;
// }

// type Category = {
//   category_name: string;
//   category_slug: string;
//   product_count: number;
// };

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

// export async function fetchCategories(): Promise<Category[]> {
//   try {
//     const res = await fetch(`${API_BASE_URL}/categories/`, {
//       cache: "no-store",
//       // next: { revalidate: 60 * 60 * 24 },
//     });
//     if (!res.ok) {
//       throw new Error("Failed to fetch categories");
//     }
//     const data: { results: Category[] } | Category[] = await res.json();
//     return Array.isArray(data) ? data : data.results;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

// export async function fetchProducts(searchParams: {
//   [key: string]: string | undefined;
// }): Promise<{ results: Product[]; count: number }> {
//   try {
//     const params = new URLSearchParams();

//     Object.entries(searchParams).forEach(([key, value]) => {
//       if (!value) return;

//       // Special handling for 'rating'
//       if (key === "rating") {
//         params.append("rating", value);
//         return;
//       }

//       // Generalized support for comma-separated multi-select values
//       if (value.includes(",")) {
//         const values = value.split(",");
//         values.forEach((v) => params.append(key, v));
//       } else {
//         params.append(key, value);
//       }
//     });

//     console.log("Final query:", params.toString());

//     const res = await fetch(
//       `${API_BASE_URL}/wholesaler-products/?${params.toString()}`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const data = await res.json();
//     return { results: data.results || [], count: data.count || 0 };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return { results: [], count: 0 };
//   }
// }

// // Delete product api

// export async function deleteProduct(productId: number) {
//   const response = await fetch(
//     `${API_BASE_URL}/wholesaler-products/${productId}/`,
//     {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     }
//   );
//   if (!response.ok) throw new Error("Failed to delete product");
//   return response.json();
// }

// export async function deleteProducts(productIds: number[]) {
//   const response = await fetch(
//     `${API_BASE_URL}/wholesaler-products/bulk-delete/`,
//     {
//       method: "POST", // Changed from DELETE to POST
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ product_ids: productIds }), // Changed from 'ids' to 'product_ids'
//     }
//   );
//   if (!response.ok) throw new Error("Failed to delete products");
//   return response.json();
// }

interface ProductCategory {
  category_name: string;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  category_name: string;
  product_category: ProductCategory;
  available: boolean;
  image: string;
  rating: number;
  [key: string]: any;
}

type Category = {
  category_name: string;
  category_slug: string;
  product_count: number;
};

type FetchProductsParams = {
  [key: string]: string | undefined;
};

type ApiResponse<T> = {
  results: T[];
  count: number;
};

// Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Enhanced error handling
class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Utility functions
const createAbortController = (timeoutMs: number = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return {
    controller,
    cleanup: () => clearTimeout(timeout),
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError && error.message.includes("fetch");
};

// Generic fetch wrapper with retry logic and better error handling
async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
  retries: number = MAX_RETRIES
): Promise<T> {
  const { controller, cleanup } = createAbortController();

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    cleanup();

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        url
      );
    }

    // Handle empty responses (like DELETE requests)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return {} as T;
  } catch (error) {
    cleanup();

    // Retry on network errors
    if (retries > 0 && (isNetworkError(error) || controller.signal.aborted)) {
      await delay(RETRY_DELAY);
      return apiRequest<T>(url, options, retries - 1);
    }

    // Re-throw ApiError as is
    if (error instanceof ApiError) {
      throw error;
    }

    // Wrap other errors
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      undefined,
      url
    );
  }
}

// Optimized URL parameter building
const buildQueryParams = (params: FetchProductsParams): string => {
  const urlParams = new URLSearchParams();

  // Pre-filter undefined values to avoid unnecessary iterations
  const validParams = Object.entries(params).filter(([, value]) => value);

  for (const [key, value] of validParams) {
    if (key === "rating") {
      urlParams.append("rating", value!);
    } else if (value!.includes(",")) {
      // Handle comma-separated multi-select values
      const values = value!.split(",").filter(Boolean); // Remove empty strings
      values.forEach((v) => urlParams.append(key, v.trim()));
    } else {
      urlParams.append(key, value!);
    }
  }

  return urlParams.toString();
};

// Cache for categories (optional - can be removed if not needed)
let categoriesCache: { data: Category[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * Fetch categories with optional caching
 * @param useCache - Whether to use caching (default: true)
 */
export async function fetchCategories(
  useCache: boolean = true
): Promise<Category[]> {
  try {
    // Check cache first
    if (
      useCache &&
      categoriesCache &&
      isCacheValid(categoriesCache.timestamp)
    ) {
      return categoriesCache.data;
    }

    const url = `${API_BASE_URL}/categories/`;
    const data = await apiRequest<Category[] | ApiResponse<Category>>(url, {
      cache: "no-store",
    });

    // Normalize response format
    const categories = Array.isArray(data) ? data : data.results;

    // Update cache
    if (useCache) {
      categoriesCache = {
        data: categories,
        timestamp: Date.now(),
      };
    }

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);

    // Return cached data if available on error
    if (useCache && categoriesCache) {
      console.warn("Returning cached categories due to fetch error");
      return categoriesCache.data;
    }

    return [];
  }
}

/**
 * Fetch products with optimized parameter handling
 */
export async function fetchProducts(
  searchParams: FetchProductsParams
): Promise<{ results: Product[]; count: number }> {
  try {
    const queryString = buildQueryParams(searchParams);
    const url = `${API_BASE_URL}/wholesaler-products/${
      queryString ? `?${queryString}` : ""
    }`;

    // Log for debugging (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Fetching products with query:", queryString);
    }

    const data = await apiRequest<ApiResponse<Product>>(url, {
      cache: "no-store",
    });

    return {
      results: data.results || [],
      count: data.count || 0,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { results: [], count: 0 };
  }
}

/**
 * Delete a single product
 */
export async function deleteProduct(productId: number): Promise<void> {
  if (!productId || productId <= 0) {
    throw new ApiError("Invalid product ID provided");
  }

  try {
    const url = `${API_BASE_URL}/wholesaler-products/${productId}/`;
    await apiRequest<void>(url, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error instanceof ApiError
      ? error
      : new ApiError(`Failed to delete product ${productId}`);
  }
}

/**
 * Delete multiple products
 */
export async function deleteProducts(productIds: number[]): Promise<void> {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new ApiError("Invalid product IDs provided");
  }

  // Validate all IDs are positive numbers
  const invalidIds = productIds.filter((id) => !id || id <= 0);
  if (invalidIds.length > 0) {
    throw new ApiError(`Invalid product IDs: ${invalidIds.join(", ")}`);
  }

  try {
    const url = `${API_BASE_URL}/wholesaler-products/bulk-delete/`;
    await apiRequest<void>(url, {
      method: "POST",
      body: JSON.stringify({ product_ids: productIds }),
    });
  } catch (error) {
    console.error(`Error deleting products ${productIds.join(", ")}:`, error);
    throw error instanceof ApiError
      ? error
      : new ApiError(`Failed to delete ${productIds.length} products`);
  }
}

// Utility function to clear categories cache (useful for testing or manual cache invalidation)
export function clearCategoriesCache(): void {
  categoriesCache = null;
}

// Type guard for API errors
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// Export types for use in other files
export type {
  Category,
  Product,
  ProductCategory,
  FetchProductsParams,
  ApiError,
};
