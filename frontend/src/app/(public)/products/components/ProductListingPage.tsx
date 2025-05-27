"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { ratings, priceRanges } from "../utils/constants";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import { useRouter } from "next/navigation";
import SkeletonProductCard from "./skeletons/SkeletonProductCard";
import SkeletonProductFilters from "./skeletons/SkeletonProductFilters";
import SkeletonProductSort from "./skeletons/SkeletonProductSort";

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

interface PriceRange {
  value: string;
  range: string;
}

interface ProductListingPageProps {
  initialCategories: Category[];
  initialProducts: Product[];
  initialTotalProducts: number;
  searchParams: { [key: string]: string | undefined };
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({
  initialCategories,
  initialProducts,
  initialTotalProducts,
  searchParams,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.search || ""
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [activeFilters, setActiveFilters] = useState<string[]>(
    searchParams.category ? searchParams.category.split(",") : []
  );
  const [activePriceRanges, setActivePriceRanges] = useState<string[]>(
    searchParams.price_range ? searchParams.price_range.split(",") : []
  );
  const [activeRatings, setActiveRatings] = useState<number[]>(
    searchParams.rating ? searchParams.rating.split(",").map(Number) : []
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.sort_by || "newest"
  );
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.page || "1", 10)
  );
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  const productsPerPage = 10;
  const { addToCart, removeFromCart, cart, toggleCart } = useCart();
  const totalPages =
    initialTotalProducts > 0
      ? Math.ceil(initialTotalProducts / productsPerPage)
      : 1;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Update URL when debounced search query changes
  useEffect(() => {
    updateURL({ search: debouncedSearchQuery, page: 1 });
  }, [debouncedSearchQuery]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Update URL with current state
  const updateURL = (
    newParams: Record<string, string | number | string[] | undefined>
  ) => {
    const params = new URLSearchParams();

    // Always include these params if they have values
    if (searchQuery) params.set("search", searchQuery);
    if (activeFilters.length > 0)
      params.set("category", activeFilters.join(","));
    if (activePriceRanges.length > 0)
      params.set("price_range", activePriceRanges.join(","));
    if (activeRatings.length > 0) params.set("rating", activeRatings.join(","));
    if (sortBy !== "newest") params.set("sort_by", sortBy);
    if (currentPage !== 1) params.set("page", currentPage.toString());

    // Override with any new params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          if (value.length > 0) params.set(key, value.join(","));
          else params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    updateURL({ page });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setActiveFilters([]);
    setActivePriceRanges([]);
    setActiveRatings([]);
    setSortBy("newest");
    setCurrentPage(1);
    updateURL({
      search: undefined,
      category: undefined,
      price_range: undefined,
      rating: undefined,
      sort_by: undefined,
      page: undefined,
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleCategoryFilter = (category: string) => {
    const newFilters = activeFilters.includes(category)
      ? activeFilters.filter((f) => f !== category)
      : [...activeFilters, category];

    setActiveFilters(newFilters);
    setCurrentPage(1);
    updateURL({ category: newFilters, page: 1 });
  }; 

  const togglePriceRangeFilter = (range: string) => {
    const newRanges = activePriceRanges.includes(range)
      ? activePriceRanges.filter((r) => r !== range)
      : [...activePriceRanges, range];

    setActivePriceRanges(newRanges);
    setCurrentPage(1);
    updateURL({ price_range: newRanges, page: 1 });
  };

  const toggleRatingFilter = (rating: number) => {
    const newRatings = activeRatings.includes(rating)
      ? activeRatings.filter((r) => r !== rating)
      : [...activeRatings, rating];

    setActiveRatings(newRatings);
    setCurrentPage(1);
    updateURL({ rating: newRatings, page: 1 });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    updateURL({ sort_by: value, page: 1 });
  };

  const renderPagination = () => {
    if (initialTotalProducts <= productsPerPage) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-1" aria-label="Pagination">
          <button
            className={`px-2 py-2 rounded-md border border-gray-100 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-amber-500 text-white font-medium"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            className={`px-2 py-2 rounded-md border border-gray-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className="mx-auto py-8 font-poppins mt-[7rem] text-[clamp(.75rem,1.2vw,.9rem)]">
      <div className="flex flex-col laptop-lg:flex-row justify-between items-start laptop-lg:items-center mb-8">
        <div>
          <h1 className="font-bold text-gray-900 mb-2 text-[1.3rem]">
            Agricultural Products
          </h1>
          <p className="text-gray-600">
            Discover cutting-edge solutions for modern farming
          </p>
        </div>

        <div className="mt-4 laptop-lg:mt-0 w-full laptop-lg:w-80 flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 outline-0 rounded-lg focus:ring-1/2 focus:ring-amber-300 focus:border-amber-500 outline-none"
              aria-label="Search products"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedSearchQuery("");
                  updateURL({ search: undefined });
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="laptop-lg:hidden mb-4">
        <button
          onClick={toggleFilterVisibility}
          className="w-full flex items-center justify-center bg-amber-500 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-amber-600 transition"
          aria-label={isFilterVisible ? "Hide filters" : "Show filters"}
        >
          <Filter className="h-4 w-4 mr-2" />
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col laptop-lg:flex-row gap-8">
        <ProductFilters
          isFilterVisible={isFilterVisible}
          categories={initialCategories}
          activeFilters={activeFilters}
          activePriceRanges={activePriceRanges}
          activeRatings={activeRatings}
          toggleCategoryFilter={toggleCategoryFilter}
          togglePriceRangeFilter={togglePriceRangeFilter}
          toggleRatingFilter={toggleRatingFilter}
          clearFilters={clearFilters}
          priceRanges={priceRanges}
          ratings={ratings}
        />

        <div className="flex-1">
          <ProductSort
            sortBy={sortBy}
            setSortBy={handleSortChange}
            totalProducts={initialTotalProducts}
            filteredProductsLength={initialProducts.length}
          />

          {initialProducts.length > 0 ? (
            <div className="grid grid-cols-2 tablet-sm:grid-cols-3 laptop-lg:grid-cols-3 tablet-lg:grid-cols-3 desktop-lg:grid-cols-4 wide:grid-cols-5 gap-4">
              {initialProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  hoveredProductId={hoveredProductId}
                  setHoveredProductId={setHoveredProductId}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  cart={cart}
                  toggleCart={toggleCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                aria-label="Clear all filters"
              >
                Clear all filters
              </button>
            </div>
          )}

          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
