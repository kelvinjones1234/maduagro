import {
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
} from "lucide-react";
import { products } from "@/app/dashboard/ConstData";
import { useDashboard } from "../../context/DashboardContext";
import { useState } from "react";

export default function InventoryTab() {
  const { productModal, currentPage, setCurrentPage } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mb-4 mobile-lg:mb-6">
        <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight">
          Products Inventory
        </h2>
        <div className="flex space-x-2 mt-3 mobile-lg:mt-0">
          <button
            className="text-white bg-green-600 px-3 py-1.5 mobile-lg:py-2 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center text-xs mobile-sm:text-sm"
            onClick={() => productModal("addProduct")}
            aria-label="Add new product"
          >
            <PlusCircle
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1.5"
              aria-hidden="true"
            />
            Add Product
          </button>
          <button
            className="text-gray-600 px-3 py-1.5 mobile-lg:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center text-xs mobile-sm:text-sm"
            aria-label="Export inventory"
          >
            <Download
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1.5"
              aria-hidden="true"
            />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col tablet-sm:flex-row gap-3 mb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="text-gray-600 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-xs mobile-sm:text-sm tablet-sm:w-auto"
          aria-label="Filter products"
        >
          <Filter
            className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1.5"
            aria-hidden="true"
          />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price/Unit
              </th>
              <th
                scope="col"
                className="px-4 py-3 mobile-lg:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 mobile-lg:px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`h-8 w-8 mobile-lg:h-10 mobile-lg:w-10 bg-gradient-to-br from-${
                          product.color || "gray"
                        }-100 to-${
                          product.color || "gray"
                        }-200 rounded-md flex items-center justify-center overflow-hidden`}
                      >
                        <span
                          className={`text-${
                            product.color || "gray"
                          }-600 font-medium text-sm mobile-sm:text-base`}
                        >
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3 mobile-lg:ml-4">
                        <div className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs mobile-sm:text-sm text-gray-500">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-xs mobile-sm:text-sm text-gray-900">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-xs mobile-sm:text-sm text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1 inline-flex text-xs font-semibold rounded-full ${
                        product.warning
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 mobile-lg:px-6 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3 justify-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        onClick={() => productModal("viewProduct", product)}
                        aria-label={`View ${product.name} details`}
                      >
                        <Eye
                          className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                          aria-hidden="true"
                         />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 transition-colors duration-200"
                        onClick={() => productModal("editProduct", product)}
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit
                          className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        onClick={() => productModal("deleteProduct", product)}
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2
                          className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No products found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs mobile-sm:text-sm text-gray-700 mb-3 mobile-lg:mb-0">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{filteredProducts.length}</span> of{" "}
          <span className="font-medium">{products.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button
            className="px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border border-gray-300 rounded-lg text-xs mobile-sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-all duration-200"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            aria-label="Previous page"
            disabled={currentPage === 1}
          >
            <ChevronLeft
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1"
              aria-hidden="true"
            />
            Previous
          </button>
          <button
            className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border ${
              currentPage === 1
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-lg text-xs mobile-sm:text-sm transition-all duration-200`}
            onClick={() => setCurrentPage(1)}
            aria-label="Page 1"
            aria-current={currentPage === 1 ? "page" : undefined}
          >
            1
          </button>
          <button
            className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border ${
              currentPage === 2
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-lg text-xs mobile-sm:text-sm transition-all duration-200`}
            onClick={() => setCurrentPage(2)}
            aria-label="Page 2"
            aria-current={currentPage === 2 ? "page" : undefined}
          >
            2
          </button>
          <button
            className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border ${
              currentPage === 3
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-lg text-xs mobile-sm:text-sm transition-all duration-200`}
            onClick={() => setCurrentPage(3)}
            aria-label="Page 3"
            aria-current={currentPage === 3 ? "page" : undefined}
          >
            3
          </button>
          <button
            className="px-2 py-1 mobile-lg:px-3 mobile-lg:py-1.5 border border-gray-300 rounded-lg text-xs mobile-sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-all duration-200"
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            aria-label="Next page"
            disabled={currentPage === 3}
          >
            Next
            <ChevronRight
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 ml-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
