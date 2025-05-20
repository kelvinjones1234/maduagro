import React from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const ProductSort = ({
  sortBy,
  setSortBy,
  totalProducts,
  filteredProductsLength,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-col tablet-lg:flex-row justify-between items-start tablet-lg:items-center">
      <div className="flex items-center mb-4 tablet-lg:mb-0">
        <SlidersHorizontal className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-gray-700">Sort by:</span>
        <div className="relative ml-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-300"
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-500">
          Showing <strong>{filteredProductsLength}</strong> of{" "}
          <strong>{totalProducts}</strong> products
        </span>
      </div>
    </div>
  );
};

export default ProductSort;
