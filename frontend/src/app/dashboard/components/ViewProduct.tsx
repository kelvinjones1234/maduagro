import { X } from "lucide-react";
import { useFarmerDashboard } from "../context/DashboardContext";

export default function ViewProduct() {
  const { selectedProduct, getProductMetrics, setShowModal } =
    useFarmerDashboard();

  const metrics = getProductMetrics(selectedProduct?.id!);

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
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
      <div className="px-6 py-5 space-y-6">
        {/* Product Info */}
        <div className="flex flex-col tablet-lg:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-72 h-48 rounded-ful bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 text-2xl font-bold">
            {selectedProduct?.name.charAt(0)}
          </div>
          <div className="text-center tablet-lg:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedProduct?.name}
            </h2>
            <p className="text-sm text-gray-500">{selectedProduct?.category}</p>
            <div
              className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full
              ${
                selectedProduct?.warning
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {selectedProduct?.status}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 mobile-lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {selectedProduct?.quantity}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Price per Unit
            </h4>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {selectedProduct?.price}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">
            Description
          </h4>
          <p className="text-sm text-gray-700">
            {selectedProduct?.description}
          </p>
        </div>

        {/* Performance Metrics */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Product Performance
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 mobile-lg:grid-cols-4 gap-4">
            {[
              { label: "Total Views", value: metrics?.views },
              { label: "Orders", value: metrics?.orders },
              { label: "Rating", value: metrics?.rating },
              { label: "Comments", value: metrics?.comments },
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
              {["Jan", "Apr", "Jul", "Oct"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col mobile-lg:flex-row justify-between items-center gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50">
        <button
          onClick={() => setShowModal(false)}
          className="text-red-600 border border-red-300 hover:bg-red-50 transition rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
        >
          Delete Product
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
          >
            Close
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
