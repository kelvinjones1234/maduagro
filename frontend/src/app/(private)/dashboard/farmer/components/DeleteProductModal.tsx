"use client";

import { useDashboard } from "../../context/DashboardContext";
import { deleteProduct, deleteProducts } from "../api";
import Notification from "./Notification";
import { useState } from "react";

interface DeleteProductModalProps {
  productIds: number[]; // Array of product IDs (single or multiple)
  setShowDeleteModal: (show: boolean) => void;
}

export default function DeleteProductModal({
  productIds,
  setShowDeleteModal,
}: DeleteProductModalProps) {
  const { refreshProducts, selectedProduct, setShowModal } = useDashboard();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleDelete = async () => {
    try {
      if (productIds.length > 1) {
        // Bulk delete
        await deleteProducts(productIds);
        setNotification({
          message: `${productIds.length} product(s) deleted successfully`,
          type: "success",
        });
      } else if (productIds.length === 1) {
        // Single delete
        await deleteProduct(productIds[0]);
        setNotification({
          message: `${
            selectedProduct?.product_name || "Product"
          } deleted successfully`,
          type: "success",
        });
      }
      refreshProducts();
      // Delay closing the modal to show the notification
      setTimeout(() => {
        setShowDeleteModal(false);
        setShowModal(false);
      }, 800);
    } catch (error) {
      console.error("Failed to delete product(s):", error);
      setNotification({
        message: "Failed to delete product(s). Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {productIds.length > 1
            ? `Delete ${productIds.length} Selected Products`
            : "Delete Product"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {productIds.length > 1
            ? `Are you sure you want to delete these ${productIds.length} products? This action cannot be undone.`
            : `Are you sure you want to delete "${
                selectedProduct?.product_name || "the product"
              }"? This action cannot be undone.`}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setShowDeleteModal(false)}
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
            onClick={handleDelete}
            aria-label="Confirm deletion"
          >
            Delete
          </button>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
