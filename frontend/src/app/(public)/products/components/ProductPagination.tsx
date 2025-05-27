import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductPagination = ({ currentPage, totalPages, handlePageChange }) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const pages = Array.from(
    { length: endPage - startPage + 1 }, 
    (_, i) => startPage + i 
  );

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

export default ProductPagination;
