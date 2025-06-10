"use client"

import { Search, Filter, Eye } from "lucide-react";
import { orders } from "../../ConstData";
import { useDashboard } from "../../context/DashboardContext";
import { useState } from "react";

// Order Management Tab Component
export default function OrdersTab() {
  const { orderModal } = useDashboard();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 10; // Number of orders per page

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Calculate pagination details
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mb-4 mobile-lg:mb-6">
        <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight">
          Order Management
        </h2>
        <div className="flex flex-col mobile-lg:flex-row space-y-2 mobile-lg:space-y-0 mobile-lg:space-x-3 mt-3 mobile-lg:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-1.5 mobile-lg:py-2 text-xs mobile-sm:text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 w-full mobile-lg:w-64"
              aria-label="Search orders"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Products
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap">
                  <div className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                    {order.id}
                  </div>
                  <div className="text-xs mobile-sm:text-sm text-gray-500">
                    {order.date}
                  </div>
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap">
                  <div className="text-xs mobile-sm:text-sm text-gray-900">
                    {order.customer}
                  </div>
                  <div className="text-xs mobile-sm:text-sm text-gray-500">
                    {order.location}
                  </div>
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 text-xs mobile-sm:text-sm text-gray-900">
                  {order.products}
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap text-xs mobile-sm:text-sm font-medium text-gray-900">
                  {order.amount}
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1 inline-flex text-[0.65rem] mobile-sm:text-xs font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      onClick={() => orderModal("viewOrder", order)}
                      aria-label={`View ${order.id} details`}
                    >
                      <Eye
                        className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredOrders.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No orders found matching your search.
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <div className="tablet-lg:flex-1 tablet-lg:flex tablet-lg:items-center tablet-lg:justify-between">
            <div>
              <p className="text-sm text-gray-700 text-center">
                Showing{" "}
                <span className="font-medium">{indexOfFirstOrder + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastOrder, filteredOrders.length)}
                </span>{" "}
                of <span className="font-medium">{filteredOrders.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">First Page</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-green-50 border-green-500 text-green-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Last Page</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
