import React from "react";
import { Package, ShoppingCart, MessageCircle, User } from "lucide-react";
import { useFarmerDashboard } from "../../context/DashboardContext";

const TabNavigation = () => {
  const { activeTab, setActiveTab } = useFarmerDashboard();

  return (
    <div className="mb-5 mobile-lg:mb-6 border-b border-gray-200">
      <nav className="flex flex-wrap gap-4 mobile-lg:gap-6 tablet-lg:gap-8">
        <button
          className={`py-3 px-2 mobile-lg:py-4 mobile-lg:px-3 border-b-2 font-medium text-xs mobile-sm:text-sm tablet-lg:text-base flex items-center transition-colors duration-200 ${
            activeTab === "inventory"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("inventory")}
          aria-current={activeTab === "inventory" ? "page" : undefined}
          aria-label="View Inventory"
        >
          <Package
            className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 mr-2"
            aria-hidden="true"
          />
          Inventory
        </button>
        <button
          className={`py-3 px-2 mobile-lg:py-4 mobile-lg:px-3 border-b-2 font-medium text-xs mobile-sm:text-sm tablet-lg:text-base flex items-center transition-colors duration-200 ${
            activeTab === "orders"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("orders")}
          aria-current={activeTab === "orders" ? "page" : undefined}
          aria-label="View Orders"
        >
          <ShoppingCart
            className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 mr-2"
            aria-hidden="true"
          />
          Orders
        </button>
        <button
          className={`py-3 px-2 mobile-lg:py-4 mobile-lg:px-3 border-b-2 font-medium text-xs mobile-sm:text-sm tablet-lg:text-base flex items-center transition-colors duration-200 ${
            activeTab === "messages"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("messages")}
          aria-current={activeTab === "messages" ? "page" : undefined}
          aria-label="View Messages"
        >
          <MessageCircle
            className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 mr-2"
            aria-hidden="true"
          />
          Messages
          <span className="ml-2 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[0.65rem] mobile-sm:text-xs font-semibold">
            1
          </span>
        </button>
        <button
          className={`py-3 px-2 mobile-lg:py-4 mobile-lg:px-3 border-b-2 font-medium text-xs mobile-sm:text-sm tablet-lg:text-base flex items-center transition-colors duration-200 ${
            activeTab === "profile"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("profile")}
          aria-current={activeTab === "profile" ? "page" : undefined}
          aria-label="View Profile"
        >
          <User
            className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 mr-2"
            aria-hidden="true"
          />
          My Profile
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;
