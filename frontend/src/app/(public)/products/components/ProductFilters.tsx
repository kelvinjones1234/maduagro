"use client";

import React from "react";
import { Filter, X, Star } from "lucide-react";
import ActiveFilters from "./ActiveFilters";

type Category = {
  category_name: string;
  category_slug: string;
  product_count: number;
};

type PriceRange = {
  value: string;
  range: string;
};

type ProductFiltersProps = {
  isFilterVisible: boolean;
  categories: Category[];
  activeFilters: string[];
  activePriceRanges: string[];
  activeRatings: number[];
  toggleCategoryFilter: (category: string) => void;
  togglePriceRangeFilter: (range: string) => void;
  toggleRatingFilter: (rating: number) => void;
  clearFilters: () => void;
  priceRanges: PriceRange[];
  ratings: number[];
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  isFilterVisible,
  categories,
  activeFilters,
  activePriceRanges,
  activeRatings,
  toggleCategoryFilter,
  togglePriceRangeFilter,
  toggleRatingFilter,
  clearFilters,
  priceRanges,
  ratings,
}) => {
  return (
    <div
      className={`w-full laptop-lg:w-64 flex-shrink-0 ${
        isFilterVisible ? "block" : "hidden laptop-lg:block"
      }`}
    >
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2 text-gray-500" />
            Filters
          </h2>
          {(activeFilters.length > 0 ||
            activePriceRanges.length > 0 ||
            activeRatings.length > 0) && (
            <button
              onClick={clearFilters}
              className="text-amber-500 hover:text-amber-600"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          )}
        </div>

        <ActiveFilters
          activeFilters={activeFilters}
          activePriceRanges={activePriceRanges}
          activeRatings={activeRatings}
          toggleCategoryFilter={toggleCategoryFilter}
          togglePriceRangeFilter={togglePriceRangeFilter}
          toggleRatingFilter={toggleRatingFilter}
          priceRanges={priceRanges}
        />

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.category_slug} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.category_slug}`}
                  checked={activeFilters.includes(category.category_slug)}
                  onChange={() => toggleCategoryFilter(category.category_slug)}
                  className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                  aria-label={`Filter by ${category.category_name}`}
                />
                <label
                  htmlFor={`category-${category.category_slug}`}
                  className="ml-2 text-gray-700 flex-1"
                >
                  {category.category_name}
                </label>
                <span className="text-gray-500">
                  ({category.product_count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-${range.value}`}
                  checked={activePriceRanges.includes(range.value)}
                  onChange={() => togglePriceRangeFilter(range.value)}
                  className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                  aria-label={`Filter by price range ${range.range}`}
                />
                <label
                  htmlFor={`price-${range.value}`}
                  className="ml-2 text-gray-700"
                >
                  {range.range}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={activeRatings.includes(rating)}
                  onChange={() => toggleRatingFilter(rating)}
                  className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                  aria-label={`Filter by ${rating} star rating and up`}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="ml-2 text-gray-700 flex items-center"
                >
                  <div className="flex mr-1">
                    {Array(rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-amber-400 fill-current"
                        />
                      ))}
                    {Array(5 - rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                  </div>
                  & Up
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Box */}
      <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-5">
        <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          Our team of experts is here to help you find the perfect solution for
          your farm.
        </p>
        <button
          className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-medium py-2 rounded-lg border border-emerald-200 transition"
          aria-label="Contact support"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
