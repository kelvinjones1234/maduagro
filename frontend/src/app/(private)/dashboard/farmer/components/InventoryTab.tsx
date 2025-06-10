"use client";

import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
} from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";
import { useState, useEffect, useMemo, useCallback, useRef, memo } from "react";
import { fetchCategories, fetchProducts } from "../api";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteProductModal from "./DeleteProductModal";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";

// Consolidated Types
interface ProductCategory {
  category_name: string;
  category_slug: string;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  category_name: string;
  category_details?: ProductCategory;
  available_quantity?: number;
  availability_status?: string;
  image: string;
  rating: number;
}

interface Filters {
  searchQuery: string;
  activeCategory: string;
  activeRating: number;
  sortBy: string;
  availability: string;
  currentPage: number;
}

interface ProductResponse {
  results: Product[];
  count: number;
}

interface CacheEntry {
  data: ProductResponse;
  timestamp: number;
  refreshKey: string | number;
}

// Constants
const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL
const INITIAL_FILTERS: Filters = {
  searchQuery: "",
  activeCategory: "All",
  activeRating: 0,
  sortBy: "newest",
  availability: "",
  currentPage: 1,
};
const INITIAL_CATEGORIES: ProductCategory[] = [
  { category_name: "All", category_slug: "All" },
];

// Smart cache with TTL and refresh key tracking
const cache = new Map<string, CacheEntry>();

// Cache management utilities
const getCacheKey = (params: Record<string, string | undefined>): string => {
  // Don't include page in base cache key for better hit rates
  const { page, ...baseParams } = params;
  return JSON.stringify(baseParams);
};

const isCacheValid = (
  entry: CacheEntry,
  currentRefreshKey: string | number
): boolean => {
  const now = Date.now();
  const isNotExpired = now - entry.timestamp < CACHE_TTL;
  const isRefreshKeyValid = entry.refreshKey === currentRefreshKey;
  return isNotExpired && isRefreshKeyValid;
};

const setCacheEntry = (
  key: string,
  data: ProductResponse,
  refreshKey: string | number
): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    refreshKey,
  });
};

const invalidateCache = (refreshKey: string | number): void => {
  // Only invalidate entries with old refresh keys
  for (const [key, entry] of cache.entries()) {
    if (entry.refreshKey !== refreshKey) {
      cache.delete(key);
    }
  }
};

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Optimistic update utilities
const updateProductInCache = (
  productId: number,
  updates: Partial<Product>
): void => {
  cache.forEach((entry, key) => {
    const productIndex = entry.data.results.findIndex(
      (p) => p.id === productId
    );
    if (productIndex !== -1) {
      entry.data.results[productIndex] = {
        ...entry.data.results[productIndex],
        ...updates,
      };
    }
  });
};

const removeProductFromCache = (productId: number): void => {
  cache.forEach((entry, key) => {
    entry.data.results = entry.data.results.filter((p) => p.id !== productId);
    entry.data.count = Math.max(0, entry.data.count - 1);
  });
};

const addProductToCache = (product: Product): void => {
  // Add to first page of relevant caches
  cache.forEach((entry, key) => {
    const params = JSON.parse(key);
    // Only add to caches that would include this product
    if (shouldIncludeProduct(product, params)) {
      entry.data.results.unshift(product);
      entry.data.count += 1;
      // Keep only the page size items for first page
      if (entry.data.results.length > ITEMS_PER_PAGE) {
        entry.data.results = entry.data.results.slice(0, ITEMS_PER_PAGE);
      }
    }
  });
};

const shouldIncludeProduct = (product: Product, filterParams: any): boolean => {
  // Check if product matches the filter criteria
  if (filterParams.category && filterParams.category !== "All") {
    if (product.category_name !== filterParams.category) return false;
  }
  if (filterParams.rating && product.rating < parseInt(filterParams.rating)) {
    return false;
  }
  if (filterParams.is_available) {
    const status = product.availability_status || "in";
    if (filterParams.is_available === "available" && status !== "in")
      return false;
    if (filterParams.is_available === "low" && status !== "low") return false;
    if (filterParams.is_available === "out" && status !== "out") return false;
  }
  return true;
};

// Memoized ProductRow component
const ProductRow = memo(
  ({
    product,
    isSelected,
    onSelect,
    onView,
    onEdit,
    setShowDeleteModal,
  }: {
    product: Product;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    setShowDeleteModal: (show: boolean) => void;
  }) => {
    const { setSelectedProduct } = useDashboard();

    const handleSelect = useCallback(
      () => onSelect(product.id),
      [onSelect, product.id]
    );
    const handleView = useCallback(() => onView(product), [onView, product]);
    const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
    const handleDelete = useCallback(() => {
      setSelectedProduct(product);
      setShowDeleteModal(true);
    }, [product, setSelectedProduct, setShowDeleteModal]);

    const status = useMemo(() => {
      const statusText = product.availability_status ?? "in";
      const statusMap: Record<string, { color: string; text: string }> = {
        out: { color: "text-red-500", text: "Out of Stock" },
        low: { color: "text-yellow-500", text: "Low Stock" },
        in: { color: "text-green-500", text: "In Stock" },
      };
      return statusMap[statusText] || statusMap.in;
    }, [product.availability_status]);

    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3.5 whitespace-nowrap">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            aria-label={`Select ${product.product_name}`}
          />
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap">
          <div className="flex items-center">
            <img
              src={`http://localhost:8000/${product.image}`}
              alt={product.product_name}
              className="h-8 w-8 rounded-md object-cover"
              loading="lazy"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">
                {product.product_name}
              </div>
              <div className="text-sm text-gray-500">
                {product.category_details?.category_name ||
                  product.category_name}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-900">
          {product.available_quantity ?? "N/A"}
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-900">
          ₦{product.product_price.toLocaleString()}
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap text-sm">
          <span className={`font-semibold ${status.color}`}>{status.text}</span>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-900">
          {product.rating} Stars
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-500">
          <div className="flex space-x-3 justify-center">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={handleView}
              aria-label={`View ${product.product_name} details`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              className="text-green-600 hover:text-green-800"
              onClick={handleEdit}
              aria-label={`Edit ${product.product_name}`}
            >
              <Edit className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={handleDelete}
              aria-label={`Delete ${product.product_name}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </td>
      </tr>
    );
  }
);
ProductRow.displayName = "ProductRow";

// Memoized Pagination component
const Pagination = memo(
  ({
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
  }) => {
    const paginationButtons = useMemo(() => {
      const buttons: number[] = [];
      const maxButtons = Math.min(5, totalPages);
      const startPage = Math.max(
        1,
        Math.min(currentPage - 2, totalPages - maxButtons + 1)
      );

      for (let i = 0; i < maxButtons; i++) {
        if (startPage + i <= totalPages) buttons.push(startPage + i);
      }
      return buttons;
    }, [totalPages, currentPage]);

    const handlePrevious = useCallback(
      () => currentPage > 1 && onPageChange(currentPage - 1),
      [currentPage, onPageChange]
    );
    const handleNext = useCallback(
      () => currentPage < totalPages && onPageChange(currentPage + 1),
      [currentPage, totalPages, onPageChange]
    );

    return (
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mt-4 pt-4 border-t">
        <div className="text-sm text-gray-700 mb-3 mobile-lg:mb-0">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount}{" "}
          results
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1.5 border rounded-lg text-sm flex items-center ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
            Previous
          </button>
          {paginationButtons.map((pageNum) => (
            <button
              key={pageNum}
              className={`px-3 py-1.5 border rounded-lg text-sm ${
                currentPage === pageNum
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => onPageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}
          <button
            className={`px-3 py-1.5 border rounded-lg text-sm flex items-center ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export default function InventoryTab() {
  const { productModal, showModal, modalType, selectedProduct, refreshKey } =
    useDashboard();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] =
    useState<ProductCategory[]>(INITIAL_CATEGORIES);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const lastRefreshKeyRef = useRef<string | number>(refreshKey);

  const debouncedSearchQuery = useDebounce(filters.searchQuery, DEBOUNCE_DELAY);

  // Memoized filter parameters
  const filterParams = useMemo(() => {
    const params: Record<string, string | undefined> = {
      page: filters.currentPage.toString(),
      page_size: ITEMS_PER_PAGE.toString(),
      search: debouncedSearchQuery || undefined,
      category:
        filters.activeCategory !== "All" ? filters.activeCategory : undefined,
      rating:
        filters.activeRating > 0 ? filters.activeRating.toString() : undefined,
      sort_by: filters.sortBy !== "newest" ? filters.sortBy : undefined,
      is_available: filters.availability || undefined,
    };
    return params;
  }, [
    filters.currentPage,
    debouncedSearchQuery,
    filters.activeCategory,
    filters.activeRating,
    filters.sortBy,
    filters.availability,
  ]);

  // Smart cache invalidation on refreshKey change
  useEffect(() => {
    if (refreshKey !== lastRefreshKeyRef.current) {
      invalidateCache(refreshKey);
      lastRefreshKeyRef.current = refreshKey;
    }
  }, [refreshKey]);

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value && key !== "page_size" && !(key === "page" && value === "1")) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filterParams, router]);

  // Fetch categories
  useEffect(() => {
    const abortController = new AbortController();
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories({
          signal: abortController.signal,
        });
        setCategories([...INITIAL_CATEGORIES, ...categoriesData]);
      } catch (error) {
        if (!abortController.signal.aborted)
          console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
    return () => abortController.abort();
  }, []);

  // Smart fetch products with optimized caching
  useEffect(() => {
    const abortController = new AbortController();
    const loadProducts = async () => {
      const cacheKey = getCacheKey(filterParams);
      const cachedEntry = cache.get(cacheKey);

      // Check if we have valid cached data
      if (cachedEntry && isCacheValid(cachedEntry, refreshKey)) {
        const { results, count } = cachedEntry.data;

        // Handle pagination from cached data
        const startIndex = (filters.currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageResults = results.slice(startIndex, endIndex);

        // If we have enough cached data for this page, use it
        if (pageResults.length > 0 || filters.currentPage === 1) {
          setProducts(pageResults);
          setTotalCount(count);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      try {
        const data = await fetchProducts(filterParams, {
          signal: abortController.signal,
        });

        if (!abortController.signal.aborted) {
          // Update cache with new data
          setCacheEntry(cacheKey, data, refreshKey);
          setProducts(data.results);
          setTotalCount(data.count);
          setSelectedProducts(new Set());
        }
      } catch (error) {
        if (!abortController.signal.aborted)
          console.error("Failed to load products:", error);
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    };

    loadProducts();
    return () => abortController.abort();
  }, [filterParams, refreshKey, filters.currentPage]);

  // Event handlers
  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedProducts(
        e.target.checked ? new Set(products.map((p) => p.id)) : new Set()
      );
    },
    [products]
  );

  const handleSelectProduct = useCallback((productId: number) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedProducts.size > 0) setShowDeleteModal(true);
  }, [selectedProducts]);

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string | number) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        currentPage: key !== "currentPage" ? 1 : prev.currentPage,
      }));
    },
    []
  );

  const handleViewProduct = useCallback(
    (product: Product) => productModal("viewProduct", product),
    [productModal]
  );
  const handleEditProduct = useCallback(
    (product: Product) => productModal("editProduct", product),
    [productModal]
  );
  const handleAddProduct = useCallback(
    () => productModal("addProduct"),
    [productModal]
  );

  // Memoized values
  const totalPages = useMemo(
    () => Math.ceil(totalCount / ITEMS_PER_PAGE),
    [totalCount]
  );
  const isAllSelected = useMemo(
    () => products.length > 0 && selectedProducts.size === products.length,
    [products.length, selectedProducts.size]
  );

  // Conditional rendering for modals
  if (showModal && modalType === "viewProduct" && selectedProduct) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 h-full">
        <ViewProduct />
      </div>
    );
  }

  if (showModal && modalType === "editProduct" && selectedProduct) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 h-full">
        <EditProduct />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 relative">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products Inventory</h2>
        <div className="grid tablet-sm:grid-cols-2 gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 flex items-center justify-center text-sm font-medium"
            onClick={handleAddProduct}
            aria-label="Add new product"
          >
            <PlusCircle className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Product
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center text-sm font-medium disabled:bg-red-300 disabled:cursor-not-allowed"
            onClick={handleBulkDelete}
            disabled={selectedProducts.size === 0}
            aria-label="Delete selected products"
          >
            <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
            Delete {selectedProducts.size > 0 && `(${selectedProducts.size})`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 mobile-sm:grid-cols-2 tablet-sm:grid-cols-3 laptop:grid-cols-5 gap-3 mb-4">
        <div className="relative col-span-1 mobile-sm:col-span-2 tablet-sm:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            className="border border-gray-300 w-full pl-10 pr-3 py-2 rounded-lg text-sm"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            aria-label="Search products by name or category"
          />
        </div>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={filters.availability}
          onChange={(e) => handleFilterChange("availability", e.target.value)}
          aria-label="Filter by stock status"
        >
          <option value="">Stock Status</option>
          <option value="available">High in Stock</option>
          <option value="low">Low in Stock</option>
          <option value="out">Out of Stock</option>
        </select>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          aria-label="Sort by"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={filters.activeCategory}
          onChange={(e) => handleFilterChange("activeCategory", e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <option key={category.category_slug} value={category.category_slug}>
              {category.category_name}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={filters.activeRating}
          onChange={(e) =>
            handleFilterChange("activeRating", Number(e.target.value))
          }
          aria-label="Filter by minimum rating"
        >
          <option value="0">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}+ Stars
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-sm text-gray-500">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all products"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price/Unit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.has(product.id)}
                      onSelect={handleSelectProduct}
                      onView={handleViewProduct}
                      onEdit={handleEditProduct}
                      setShowDeleteModal={setShowDeleteModal}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={filters.currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {showDeleteModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <DeleteProductModal
            productIds={
              selectedProducts.size > 0
                ? Array.from(selectedProducts)
                : selectedProduct?.id
                ? [selectedProduct.id]
                : []
            }
            setShowDeleteModal={setShowDeleteModal}
          />
        </div>
      )}
    </div>
  );
}
