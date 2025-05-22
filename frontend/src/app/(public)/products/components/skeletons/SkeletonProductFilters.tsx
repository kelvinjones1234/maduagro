import React from "react";

const SkeletonProductFilters = () => {
  return (
    <div className="w-full laptop-lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 animate-pulse space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        {/* Category Section */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Rating Section */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className={`h-4 w-4 rounded ${
                        j <= i ? "bg-gray-300" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Box */}
      <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-5 animate-pulse">
        <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonProductFilters;
