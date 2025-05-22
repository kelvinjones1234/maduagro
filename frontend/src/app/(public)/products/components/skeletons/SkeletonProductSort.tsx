import React from "react";

const SkeletonProductSort = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-col tablet-lg:flex-row justify-between items-start tablet-lg:items-center animate-pulse">
      <div className="flex items-center mb-4 tablet-lg:mb-0 space-x-2">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="ml-2 h-9 w-36 bg-gray-200 rounded" />
      </div>
      <div className="h-4 w-40 bg-gray-200 rounded" />
    </div>
  );
};

export default SkeletonProductSort;
