"use client";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  [key: string]: any;
}

type Category = {
  category_name: string;
  category_slug: string;
  product_count: number;
};

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import ProductCard from "./components/ProductCard";
import { ratings, priceRanges } from "./utils/constants";
import ProductSort from "./components/ProductSort";
import ProductFilters from "./components/ProductFilters";
const ProductListingPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activePriceRanges, setActivePriceRanges] = useState<string[]>([]);
  const [activeRatings, setActiveRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  const productsPerPage = 30;

  const { addToCart, removeFromCart, cart, toggleCart } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories/");
        const data: { results: Category[] } | Category[] = await res.json();
        setCategories(Array.isArray(data) ? data : data.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("page_size", productsPerPage.toString());

        if (searchQuery) {
          params.append("search", searchQuery);
        }

        if (activeFilters.length > 0) {
          activeFilters.forEach((category) => {
            const categoryObj = categories.find(
              (cat) => cat.category_name === category
            );
            if (categoryObj) {
              params.append("category", categoryObj.category_slug);
            }
          });
        }

        if (activePriceRanges.length > 0) {
          activePriceRanges.forEach((range) => {
            const [min, max] = range.split("-");
            params.append("price_min", min);
            params.append("price_max", max);
          });
        }

        if (activeRatings.length > 0) {
          const minRating = Math.min(...activeRatings);
          params.append("rating", minRating.toString());
        }

        params.append("sort_by", sortBy);

        const res = await fetch(
          `http://127.0.0.1:8000/api/products/?${params.toString()}`
        );
        const data: { results: Product[]; count: number } = await res.json();
        setFilteredProducts(data.results || []);
        setTotalProducts(data.count || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
        setTotalProducts(0);
      }
    };

    fetchProducts();
  }, [
    currentPage,
    searchQuery,
    activeFilters,
    activePriceRanges,
    activeRatings,
    sortBy,
    categories,
  ]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setActivePriceRanges([]);
    setActiveRatings([]);
    setSearchQuery("");
    setCurrentPage(1);
    setSortBy("newest");
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const renderPagination = () => {
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
        <nav className="flex items-center space-x-1">
          <button
            className={`px-2 py-2 rounded-md border border-gray-100 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
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
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    );
  };

  console.log("hello", searchQuery);

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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 outline-0 rounded-lg focus:ring-1/2 focus:ring-amber-300 focus:border-amber-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
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
        >
          <Filter className="h-4 w-4 mr-2" />
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col laptop-lg:flex-row gap-8">
        <ProductFilters
          isFilterVisible={isFilterVisible}
          categories={categories}
          activeFilters={activeFilters}
          activePriceRanges={activePriceRanges}
          activeRatings={activeRatings}
          toggleCategoryFilter={(category: string) => {
            setCurrentPage(1);
            setActiveFilters(
              activeFilters.includes(category)
                ? activeFilters.filter((f) => f !== category)
                : [...activeFilters, category]
            );
          }}
          togglePriceRangeFilter={(range: string) => {
            setCurrentPage(1);
            setActivePriceRanges(
              activePriceRanges.includes(range)
                ? activePriceRanges.filter((r) => r !== range)
                : [...activePriceRanges, range]
            );
          }}
          toggleRatingFilter={(rating: number) => {
            setCurrentPage(1);
            setActiveRatings(
              activeRatings.includes(rating)
                ? activeRatings.filter((r) => r !== rating)
                : [...activeRatings, rating]
            );
          }}
          clearFilters={clearFilters}
          priceRanges={priceRanges}
          ratings={ratings}
        />

        <div className="flex-1">
          <ProductSort
            sortBy={sortBy}
            setSortBy={(value: string) => {
              setSortBy(value);
              setCurrentPage(1);
            }}
            totalProducts={totalProducts}
            filteredProductsLength={filteredProducts.length}
          />

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 tablet-sm:grid-cols-3 laptop-lg:grid-cols-3 tablet-lg:grid-cols-3 desktop-lg:grid-cols-4 wide:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
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
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {totalProducts > productsPerPage && renderPagination()}
        </div>
      </div>
      <div className="py-[4rem]">
        <Footer />
      </div>
    </div>
  );
};

export default ProductListingPage;
