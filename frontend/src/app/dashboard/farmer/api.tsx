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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`, {
      cache: "no-store",
      // next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data: { results: Category[] } | Category[] = await res.json();
    return Array.isArray(data) ? data : data.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchProducts(searchParams: {
  [key: string]: string | undefined;
}): Promise<{ results: Product[]; count: number }> {
  try {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (!value) return;

      // Special handling for 'rating'
      if (key === "rating") {
        params.append("rating", value);
        return;
      }

      // Generalized support for comma-separated multi-select values
      if (value.includes(",")) {
        const values = value.split(",");
        values.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });

    console.log("Final query:", params.toString());

    const res = await fetch(
      `${API_BASE_URL}/wholesaler-products/?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return { results: data.results || [], count: data.count || 0 };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { results: [], count: 0 };
  }
}

// Delete product api

export async function deleteProduct(productId: number) {
  const response = await fetch(
    `${API_BASE_URL}/wholesaler-products/${productId}/`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
}

export async function deleteProducts(productIds: number[]) {
  const response = await fetch(
    `${API_BASE_URL}/wholesaler-products/bulk-delete/`,
    {
      method: "POST", // Changed from DELETE to POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_ids: productIds }), // Changed from 'ids' to 'product_ids'
    }
  );
  if (!response.ok) throw new Error("Failed to delete products");
  return response.json();
}
