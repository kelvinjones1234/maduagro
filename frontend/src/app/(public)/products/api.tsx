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
  description?: string;
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

      if (key === "rating") {
        params.append("rating", value);
        return;
      }

      if (value.includes(",")) {
        const values = value.split(",");
        values.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });

    console.log("Final query:", params.toString());

    const res = await fetch(`${API_BASE_URL}/products/?${params.toString()}`, {
      cache: "no-store",
    });

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

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/products/`, {
      next: { revalidate: 86400 }, // Revalidate daily to detect new products
    });
    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();
    const products: Product[] = Array.isArray(data)
      ? data
      : data.results || data.products || [];

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching products for static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return { title: "Product Not Found" };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return { title: "Product Not Found" };
    }

    const product: Product = await res.json();

    return {
      title: product.product_name || "Product Detail",
      description: product.description || "View details of this product",
    };
  } catch (error) {
    console.error(`Error fetching metadata for product ${id}:`, error);
    return { title: "Product Not Found" };
  }
}
