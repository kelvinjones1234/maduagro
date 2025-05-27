interface Product {
  id: number;
  name: string;
  description?: string;
}

// Generate static parameters for SSG
export async function generateStaticParams() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${API_URL}/api/products/`);
    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();
    const products: Product[] = Array.isArray(data)
      ? data
      : data.results || data.products || [];

    if (!Array.isArray(products)) {
      console.error("Expected an array of products, got:", typeof products);
      return [];
    }

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching products for static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  if (!id) {
    return { title: "Product Not Found" };
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${API_URL}/api/products/${id}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return { title: "Product Not Found" };
    }

    const product: Product = await res.json();

    return {
      title: product.name || "Product Detail",
      description: product.description || "View details of this product",
    };
  } catch (error) {
    console.error(`Error fetching metadata for product ${id}:`, error);
    return { title: "Product Not Found" };
  }
}
