import ProductListingPage from "./components/ProductListingPage";
import { fetchCategories, fetchProducts } from "./api";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Page({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Await searchParams to resolve the Promise
  const searchParams = await searchParamsPromise;
  // Normalize searchParams to handle arrays and undefined values
  const normalizedParams: { [key: string]: string | undefined } = {
    search: Array.isArray(searchParams.search)
      ? searchParams.search[0]
      : searchParams.search,
    category: Array.isArray(searchParams.category)
      ? searchParams.category[0]
      : searchParams.category,
    price_range: Array.isArray(searchParams.price_range)
      ? searchParams.price_range[0]
      : searchParams.price_range,
    rating: Array.isArray(searchParams.rating)
      ? searchParams.rating[0]
      : searchParams.rating,
    sort_by: Array.isArray(searchParams.sort_by)
      ? searchParams.sort_by[0]
      : searchParams.sort_by || "newest",
    page: Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page || "1",
  };

  try {
    const [categories, productsData] = await Promise.all([
      fetchCategories(),
      fetchProducts(normalizedParams),
    ]);

    return (
      <ProductListingPage
        initialCategories={categories}
        initialProducts={productsData.results}
        initialTotalProducts={productsData.count}
        searchParams={normalizedParams}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="mx-auto py-8 text-center text-red-500">
        <p>Failed to load products or categories. Please try again later.</p>
      </div>
    );
  }
}
