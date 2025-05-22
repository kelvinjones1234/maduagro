import React from "react";

const SkeletonProductCard = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="relative aspect-square bg-gray-200" />

      <div className="p-4 space-y-3">
        {/* Category and rating */}
        <div className="flex justify-between items-center">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* Product name */}
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        {/* Price */}
        <div className="h-5 w-1/3 bg-gray-200 rounded" />

        {/* Seller info */}
        <div className="flex items-center gap-2 pt-3">
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        {/* Add to Cart Button */}
        <div className="h-9 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
