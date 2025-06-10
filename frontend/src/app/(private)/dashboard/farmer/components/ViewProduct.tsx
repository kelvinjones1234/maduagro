"use client";

import { X } from "lucide-react";
import { useCallback, useState } from "react";
import DeleteProductModal from "./DeleteProductModal";
import { useDashboard } from "../../context/DashboardContext";

// Define interfaces for type safety
interface Product {
  id: string;
  product_name: string;
  category_name: string;
  available_quantity: number;
  product_price: number;
  product_description?: string;
  image?: string;
}

interface ProductMetrics {
  views: number;
  orders: number;
  average_rating: number;
  comments: number;
}

interface DashboardContextType {
  selectedProduct: Product | null;
  getProductMetrics: (productId: number) => ProductMetrics | null;
  setShowModal: (show: boolean) => void;
  productModal: (action: string, product: Product) => void;
}

// Price history data point interface
interface PriceHistoryPoint {
  month: string;
  price: number;
}

// Component props (if needed in the future)
interface ViewProductProps {}

const ViewProduct: React.FC<ViewProductProps> = () => {
  const { selectedProduct, getProductMetrics, setShowModal, productModal } =
    useDashboard();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Fetch metrics with null check
  const metrics = selectedProduct?.id
    ? getProductMetrics(selectedProduct.id)
    : null;

  // Handle delete action
  const handleDelete = useCallback(() => {
    if (selectedProduct) {
      setShowDeleteModal(true);
    }
  }, [selectedProduct]);

  // Handle edit action
  const handleEdit = useCallback(() => {
    if (selectedProduct) {
      productModal("editProduct", selectedProduct);
    }
  }, [selectedProduct, productModal]);

  // Mock price history data (replace with actual data fetching logic)
  const priceHistory: PriceHistoryPoint[] = [
    { month: "Jan", price: 100 },
    { month: "Apr", price: 120 },
    { month: "Jul", price: 110 },
    { month: "Oct", price: 130 },
  ];

  // If no product is selected, show a fallback UI
  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-2xl p-6 w-full mx-auto text-center">
        <p className="text-gray-500">No product selected</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl w-full mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
        <button
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Body */}
      <div className="py-6 space-y-6">
        {/* Product Info */}
        <div className="flex flex-col tablet-lg:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-72 h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            {selectedProduct.image ? (
              <img
                src={`http://localhost:8000/${selectedProduct.image}`}
                alt={selectedProduct.product_name}
                className="h-full w-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                }}
              />
            ) : (
              <span className="text-gray-700 text-2xl font-bold">No Image</span>
            )}
          </div>
          <div className="text-center tablet-lg:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedProduct.product_name}
            </h2>
            <p className="text-sm text-gray-500">
              {selectedProduct.category_name}
            </p>
            <div
              className={`mt-2 inline-block py-1 px-3 text-xs font-semibold rounded-full ${
                selectedProduct.available_quantity > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {selectedProduct.available_quantity} in stock
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 mobile-lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {selectedProduct.available_quantity ?? "N/A"} units
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Price per Unit
            </h4>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              ₦{selectedProduct.product_price?.toLocaleString("en-NG") ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">
            Description
          </h4>
          <p className="text-sm text-gray-700">
            {selectedProduct.product_description ?? "No description available"}
          </p>
        </div>

        {/* Performance Metrics */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Product Performance
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 mobile-lg:grid-cols-4 gap-4">
            {[
              { label: "Total Views", value: metrics?.views ?? 0 },
              { label: "Orders", value: metrics?.orders ?? 0 },
              {
                label: "Rating",
                value: metrics?.average_rating?.toFixed(1) ?? "0.0",
              },
              { label: "Comments", value: metrics?.comments ?? 0 },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Price History */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Price History
          </h4>
          <div className="h-24 bg-gray-50 rounded-lg relative px-4">
            <div className="absolute bottom-1 left-0 right-0 border-t border-gray-300"></div>
            <div
              className="absolute left-0 right-0"
              style={{
                bottom: "50%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent 0%, #10B981 20%, #10B981 50%, #10B981 80%, transparent 100%)",
              }}
            ></div>
            <div className="absolute bottom-1 left-0 right-0 flex justify-between text-[0.65rem] text-gray-500 px-2">
              {priceHistory.map((point) => (
                <span key={point.month}>{point.month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col mobile-lg:flex-row justify-between items-center gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50">
        <button
          onClick={handleDelete}
          className="text-red-600 border border-red-300 hover:bg-red-50 transition rounded-lg px-4 py-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Delete ${selectedProduct.product_name}`}
          disabled={!selectedProduct}
        >
          Delete Product
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
            aria-label="Close product details"
          >
            Close
          </button>
          <button
            onClick={handleEdit}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Edit ${selectedProduct.product_name}`}
            disabled={!selectedProduct}
          >
            Edit Product
          </button>
        </div>
      </div>

      {/* Delete Product Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <DeleteProductModal
            productIds={[selectedProduct.id]}
            setShowDeleteModal={setShowDeleteModal}
          />
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
