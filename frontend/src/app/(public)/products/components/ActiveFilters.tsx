"use client";

import React from "react";
import { X } from "lucide-react";

interface PriceRange {
  value: string;
  range: string;
}

interface ActiveFiltersProps {
  activeFilters: string[];
  activePriceRanges: string[];
  activeRatings: number[];
  toggleCategoryFilter: (category: string) => void;
  togglePriceRangeFilter: (range: string) => void;
  toggleRatingFilter: (rating: number) => void;
  priceRanges: PriceRange[];
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeFilters,
  activePriceRanges,
  activeRatings,
  toggleCategoryFilter,
  togglePriceRangeFilter,
  toggleRatingFilter,
  priceRanges,
}) => {
  const getFilterLabel = (filter: string) => {
    const priceRange = priceRanges.find((p) => p.value === filter);
    if (priceRange) return priceRange.range;

    if (filter.includes("+ Stars")) return filter;

    return filter;
  };

  const handleRemoveFilter = (filter: string) => {
    if (priceRanges.some((p) => p.value === filter)) {
      togglePriceRangeFilter(filter);
      return;
    }

    if (filter.includes("+ Stars")) {
      const rating = parseInt(filter);
      toggleRatingFilter(rating);
      return;
    }

    toggleCategoryFilter(filter);
  };

  const allActiveFilters = [
    ...activeFilters,
    ...activePriceRanges,
    ...activeRatings.map((rating) => `${rating}+ Stars`),
  ];

  if (allActiveFilters.length === 0) return null;

  return (
    <div className="mb-5">
      <p className="text-gray-500 mb-2 text-sm">Active filters:</p>
      <div className="flex flex-wrap gap-2">
        {allActiveFilters.map((filter) => (
          <span
            key={filter}
            className="inline-flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs"
          >
            {getFilterLabel(filter)}
            <button
              onClick={() => handleRemoveFilter(filter)}
              className="ml-1 hover:text-amber-800 focus:outline-none"
              aria-label={`Remove ${getFilterLabel(filter)} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
