"use client";

import {
  Download,
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

interface ProductCategory {
  category_name: string;
  category_slug: string;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  category_name: string;
  product_category: ProductCategory;
  available: string;
  image: string;
  rating: number;
  quantity?: number;
  availability_status?: string;
  available_quantity?: number;
}

interface Filters {
  searchQuery: string;
  debouncedSearchQuery: string;
  activeCategory: string;
  activeRating: number;
  sortBy: string;
  availability: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;

const INITIAL_FILTERS: Filters = {
  searchQuery: "",
  debouncedSearchQuery: "",
  activeCategory: "All",
  activeRating: 0,
  sortBy: "newest",
  availability: "",
  currentPage: 1,
};

const INITIAL_CATEGORIES: ProductCategory[] = [
  { category_name: "All", category_slug: "All" },
];

// Memoized ProductRow component to prevent unnecessary re-renders
const ProductRow = memo(
  ({
    product,
    isSelected,
    onSelect,
    onView,
    onEdit,
    onDelete,
  }: {
    product: Product;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
  }) => {
    const handleSelect = useCallback(
      () => onSelect(product.id),
      [onSelect, product.id]
    );
    const handleView = useCallback(() => onView(product), [onView, product]);
    const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
    const handleDelete = useCallback(
      () => onDelete(product),
      [onDelete, product]
    );

    const statusColor = useMemo(() => {
      switch (product.availability_status) {
        case "out":
          return "text-red-500";
        case "low":
          return "text-yellow-500";
        default:
          return "text-green-500";
      }
    }, [product.availability_status]);

    const statusText = useMemo(() => {
      switch (product.availability_status) {
        case "out":
          return "Out of Stock";
        case "low":
          return "Low Stock";
        default:
          return "In Stock";
      }
    }, [product.availability_status]);

    return (
      <tr className="hover:bg-gray-50 transition-colors duration-150">
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            aria-label={`Select ${product.product_name}`}
          />
        </td>
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-8 w-8 mobile-lg:h-10 mobile-lg:w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.product_name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="ml-3 mobile-lg:ml-4">
              <div className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                {product.product_name}
              </div>
              <div className="text-xs mobile-sm:text-sm text-gray-500">
                {product.category_details?.category_name ||
                  product.category_name}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-xs mobile-sm:text-sm text-gray-900">
          {product.available_quantity || "N/A"}
        </td>
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-xs mobile-sm:text-sm text-gray-900">
          ₦{product.product_price.toLocaleString()}
        </td>
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-xs mobile-sm:text-sm">
          <span className={`inline-flex text-xs font-semibold ${statusColor}`}>
            {statusText}
          </span>
        </td>
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-xs mobile-sm:text-sm text-gray-900">
          {product.rating} Stars
        </td>
        <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-sm text-gray-500">
          <div className="flex space-x-3 justify-center">
            <button
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              onClick={handleView}
              aria-label={`View ${product.product_name} details`}
            >
              <Eye
                className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                aria-hidden="true"
              />
            </button>
            <button
              className="text-green-600 hover:text-green-800 transition-colors duration-200"
              onClick={handleEdit}
              aria-label={`Edit ${product.product_name}`}
            >
              <Edit
                className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                aria-hidden="true"
              />
            </button>
            <button
              className="text-red-600 hover:text-red-800 transition-colors duration-200"
              onClick={handleDelete}
              aria-label={`Delete ${product.product_name}`}
            >
              <Trash2
                className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                aria-hidden="true"
              />
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

      let startPage = 1;
      if (totalPages > 5) {
        if (currentPage <= 3) {
          startPage = 1;
        } else if (currentPage >= totalPages - 2) {
          startPage = totalPages - 4;
        } else {
          startPage = currentPage - 2;
        }
      }

      for (let i = 0; i < maxButtons; i++) {
        buttons.push(startPage + i);
      }
      return buttons;
    }, [totalPages, currentPage]);

    const handlePrevious = useCallback(() => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    }, [currentPage, onPageChange]);

    const handleNext = useCallback(() => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    }, [currentPage, totalPages, onPageChange]);

    return (
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs mobile-sm:text-sm text-gray-700 mb-3 mobile-lg:mb-0">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
          </span>{" "}
          of <span className="font-medium">{totalCount}</span> results
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border border-gray-300 rounded-lg text-xs mobile-sm:text-sm flex items-center transition-all duration-200 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handlePrevious}
            aria-label="Previous page"
            disabled={currentPage === 1}
          >
            <ChevronLeft
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1"
              aria-hidden="true"
            />
            Previous
          </button>
          {paginationButtons.map((pageNum) => (
            <button
              key={pageNum}
              className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border ${
                currentPage === pageNum
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              } rounded-lg text-xs mobile-sm:text-sm transition-all duration-200`}
              onClick={() => onPageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}
          <button
            className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border border-gray-300 rounded-lg text-xs mobile-sm:text-sm flex items-center transition-all duration-200 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handleNext}
            aria-label="Next page"
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 ml-1"
              aria-hidden="true"
            />
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

  // State management - using single state object for filters to reduce re-renders
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] =
    useState<ProductCategory[]>(INITIAL_CATEGORIES);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  // Refs to prevent unnecessary effect runs
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(true);

  // Memoized filter parameters - only recalculate when filters or refreshKey changes
  const filterParams = useMemo(
    () => ({
      page: filters.currentPage.toString(),
      page_size: ITEMS_PER_PAGE.toString(),
      search: filters.debouncedSearchQuery || undefined,
      category:
        filters.activeCategory !== "All" ? filters.activeCategory : undefined,
      rating:
        filters.activeRating > 0 ? filters.activeRating.toString() : undefined,
      sort_by: filters.sortBy !== "newest" ? filters.sortBy : undefined,
      is_available: filters.availability || undefined,
    }),
    [
      filters.currentPage,
      filters.debouncedSearchQuery,
      filters.activeCategory,
      filters.activeRating,
      filters.sortBy,
      filters.availability,
      refreshKey,
    ]
  );

  // Optimized URL update - only update when necessary
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value && key !== "page_size" && !(key === "page" && value === "1")) {
        params.set(key, value);
      }
    });
    const newUrl = `?${params.toString()}`;
    if (window.location.search !== newUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [filterParams, router]);

  // Optimized debounce using ref to avoid recreating timeout
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setFilters((prev) => ({
          ...prev,
          debouncedSearchQuery: prev.searchQuery,
        }));
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [filters.searchQuery]);

  // Fetch categories - optimized with abort controller
  useEffect(() => {
    const abortController = new AbortController();

    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        if (!abortController.signal.aborted) {
          setCategories((prev) => [...prev.slice(0, 1), ...categoriesData]);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Failed to load categories:", error);
        }
      }
    };

    loadCategories();
    return () => abortController.abort();
  }, []);

  // Fetch products - optimized with abort controller
  useEffect(() => {
    const abortController = new AbortController();

    const loadProducts = async () => {
      setLoading(true);
      try {
        const { results, count } = await fetchProducts(filterParams);
        if (!abortController.signal.aborted) {
          setProducts(results);
          setTotalCount(count);
          setSelectedProducts(new Set());
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Failed to load products:", error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    return () => abortController.abort();
  }, [filterParams]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Optimized event handlers using useCallback with proper dependencies
  const handlePageChange = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
      if (page >= 1 && page <= totalPages) {
        setFilters((prev) => ({ ...prev, currentPage: page }));
      }
    },
    [totalCount]
  );

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
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    const selectedProductObjects = products.filter((p) =>
      selectedProducts.has(p.id)
    );
    productModal("deleteProducts", selectedProductObjects);
  }, [products, selectedProducts, productModal]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSelectedProducts(new Set());
  }, []);

  // Optimized filter change handler
  const handleFilterChange = useCallback((key: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "currentPage" && key !== "searchQuery"
        ? { currentPage: 1 }
        : {}),
    }));
    if (key !== "searchQuery") {
      setSelectedProducts(new Set());
    }
  }, []);

  // Memoized handlers for ProductRow
  const handleViewProduct = useCallback(
    (product: Product) => {
      productModal("viewProduct", product);
    },
    [productModal]
  );

  const handleEditProduct = useCallback(
    (product: Product) => {
      productModal("editProduct", product);
    },
    [productModal]
  );

  const handleDeleteProduct = useCallback(
    (product: Product) => {
      productModal("deleteProduct", product);
    },
    [productModal]
  );

  const handleAddProduct = useCallback(() => {
    productModal("addProduct");
  }, [productModal]);

  // Memoized values
  const totalPages = useMemo(
    () => Math.ceil(totalCount / ITEMS_PER_PAGE),
    [totalCount]
  );
  const selectedProductsArray = useMemo(
    () => Array.from(selectedProducts),
    [selectedProducts]
  );
  const isAllSelected = useMemo(
    () => products.length > 0 && selectedProducts.size === products.length,
    [products.length, selectedProducts.size]
  );

  // Early returns for different modal states
  if (showModal && modalType === "viewProduct" && selectedProduct) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6 h-full">
        <ViewProduct />
      </div>
    );
  }

  if (showModal && modalType === "editProduct" && selectedProduct) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6 h-full">
        <EditProduct />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6 relative">
      {/* Header */}
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mb-4 mobile-lg:mb-6">
        <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight">
          Products Inventory
        </h2>
        <div className="flex space-x-2 mt-3 mobile-lg:mt-0">
          <button
            className="text-white bg-green-600 px-3 py-1.5 mobile-lg:py-2 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center text-xs mobile-sm:text-sm"
            onClick={handleAddProduct}
            aria-label="Add new product"
          >
            <PlusCircle
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1.5"
              aria-hidden="true"
            />
            Add Product
          </button>
          <button
            className="text-gray-600 px-3 py-1.5 mobile-lg:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center text-xs mobile-sm:text-sm"
            aria-label="Export inventory"
          >
            <Download
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1.5"
              aria-hidden="true"
            />
            Export
          </button>
          <button
            className="text-white bg-red-600 px-3 py-1.5 mobile-lg:py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center text-xs mobile-sm:text-sm disabled:bg-red-300 disabled:cursor-not-allowed"
            onClick={handleBulkDelete}
            disabled={selectedProducts.size === 0}
            aria-label="Delete selected products"
          >
            <Trash2
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1.5"
              aria-hidden="true"
            />
            Delete Selected ({selectedProducts.size})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col tablet-sm:flex-row gap-3 mb-4">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            aria-label="Search products by name or category"
          />
        </div>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
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
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          aria-label="Sort by"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
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
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
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
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all products"
                    />
                  </th>
                  <th className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Unit
                  </th>
                  <th className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 mobile-lg:px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      isSelected={selectedProducts.has(product.id)}
                      onSelect={handleSelectProduct}
                      onView={handleViewProduct}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
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

      {/* DeleteProductModal as an overlay */}
      {showModal &&
        (modalType === "deleteProduct" || modalType === "deleteProducts") && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50">
            <div className="">
              <DeleteProductModal />
            </div>
          </div>
        )}
    </div>
  );
}
