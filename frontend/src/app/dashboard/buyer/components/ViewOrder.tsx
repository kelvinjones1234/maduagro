import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { Calendar, MapPin, Box, Truck, DollarSign, User } from "lucide-react";
import { X } from "lucide-react";

type DetailRowProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  isLast?: boolean;
};

const ViewOrder = () => {
  const { selectedOrder, setShowModal } = useDashboard();
  const [status, setStatus] = useState(selectedOrder?.status || "");

  if (!selectedOrder) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border">
        <div className="text-center">
          <p className="text-gray-500">Select an order to view details</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case "Processing":
        return 33;
      case "In Transit":
        return 66;
      case "Delivered":
        return 100;
      case "Cancelled":
        return 100;
      default:
        return 0;
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500";
      case "In Transit":
        return "bg-yellow-500";
      case "Delivered":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const statusOptions = ["Processing", "In Transit", "Delivered", "Cancelled"];

  const handleStatusUpdate = () => {
    if (status !== selectedOrder.status) {
      selectedOrder.id, status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Order #{selectedOrder.id}
        </h2>
        <div className="flex items-center justify-center gap-x-8">
          <span
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
              selectedOrder.status
            )}`}
          >
            {selectedOrder.status}
          </span>
          <button
            onClick={() => setShowModal(false)}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <DetailRow
            icon={User}
            label="Customer"
            value={selectedOrder.customer}
          />
          <DetailRow
            icon={Calendar}
            label="Order Date"
            value={selectedOrder.date}
          />
          <DetailRow
            icon={DollarSign}
            label="Amount"
            value={`$${selectedOrder.amount}`}
            isLast
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <DetailRow
            icon={MapPin}
            label="Delivery Location"
            value={selectedOrder.location}
          />
          <DetailRow
            icon={Calendar}
            label="Estimated Delivery"
            value={selectedOrder.estimatedDelivery}
            isLast
          />
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Products</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {selectedOrder.products}
        </div>
      </div>

      {/* Status Update */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Update Delivery Status
        </h3>
        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm flex-1"
            disabled={
              selectedOrder.status === "Cancelled" ||
              selectedOrder.status === "Delivered"
            }
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={
              status === selectedOrder.status ||
              selectedOrder.status === "Cancelled"
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Update
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Delivery Progress
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressBarColor(
              selectedOrder.status
            )}`}
            style={{ width: `${getProgress(selectedOrder.status)}%` }}
          />
        </div>
        {selectedOrder.status === "Cancelled" && (
          <p className="text-sm text-red-500 mt-2">Order cancelled</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
          Print
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Contact
        </button>
      </div>
    </div>
  );
};

const DetailRow: React.FC<DetailRowProps> = ({
  icon: Icon,
  label,
  value,
  isLast = false,
}) => (
  <div className={`flex items-start ${isLast ? "" : "mb-3"}`}>
    <Icon size={14} className="text-gray-400 mt-1" />
    <div className="ml-2">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm text-gray-800">{value}</div>
    </div>
  </div>
);

export default ViewOrder;
