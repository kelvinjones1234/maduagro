"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Notification({
  message,
  type,
  onClose,
  duration = 3000,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg z-20 flex items-center justify-between transition-all duration-300 ease-in-out transform ${
        type === "success"
          ? "bg-green-100 border border-green-400 text-green-700"
          : "bg-red-100 border border-red-400 text-red-700"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center">
        <span className="font-medium text-sm">{message}</span>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="text-gray-500 hover:text-gray-700"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
