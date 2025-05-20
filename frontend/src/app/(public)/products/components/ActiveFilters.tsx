import React from "react";
import { X } from "lucide-react";

const ActiveFilters = ({
  activeFilters,
  activePriceRanges,
  activeRatings,
  toggleCategoryFilter,
  togglePriceRangeFilter,
  toggleRatingFilter,
  priceRanges,
}) => {
  const allActiveFilters = [
    ...activeFilters,
    ...activePriceRanges.map((range) => {
      const rangeObj = priceRanges.find((p) => p.value === range);
      return rangeObj ? rangeObj.range : range;
    }),
    ...activeRatings.map((rating) => `${rating}+ Stars`),
  ];

  if (allActiveFilters.length === 0) return null;

  return (
    <div className="mb-5">
      <p className="text-gray-500 mb-2">Active filters:</p>
      <div className="flex flex-wrap gap-2">
        {allActiveFilters.map((filter) => (
          <span
            key={filter}
            className="inline-flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md"
          >
            {filter}
            <button
              onClick={() => {
                if (activeFilters.includes(filter)) {
                  toggleCategoryFilter(filter);
                } else if (filter.includes("Stars")) {
                  const rating = parseInt(filter);
                  toggleRatingFilter(rating);
                } else {
                  const rangeValue = priceRanges.find(
                    (p) => p.range === filter
                  )?.value;
                  if (rangeValue) togglePriceRangeFilter(rangeValue);
                }
              }}
            >
              <X className="h-3 w-3 ml-1" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
