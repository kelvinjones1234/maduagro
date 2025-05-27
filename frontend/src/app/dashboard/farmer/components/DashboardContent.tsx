import { useDashboard } from "../../context/DashboardContext";
import InventoryTab from "./InventoryTab";
import OrdersTab from "./OrdersTab";
import MessagesTab from "./MessagesTab";
import ProfileTab from "./ProfileTab";
import AddNewProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import DashboardSidebar from "./DashboardSidebar";
import Image from "next/image";
import { Bell, ChevronDown } from "lucide-react";
import EditProduct from "./EditProduct";
import ViewOrder from "./ViewOrder";
import OfferTab from "./OfferTab";
import DashboardOverview from "./DashboardOverview";

export default function DashboardContent() {
  const { activeTab, showModal, modalType, selectedProduct, selectedOrder } =
    useDashboard();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar - hidden on smaller screens */}
      <div className="hidden tablet-lg:block w-[clamp(10.5rem,20vw,18rem)] flex-shrink-0 border-r border-gray-200">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen">
          {/* Dashboard header */}
          <header className="bg-white py-3 px-2 laptop-sm:px-10 border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              {/* Welcome message */}
              <div className="relative flex items-center">
                <div className="items-center text-gray-500 text-[1rem]">
                  <span>Welcome to your farmers Dashboard</span>
                </div>
              </div>

              {/* Right side - notifications and profile */}
              <div className="flex items-center space-x-4">
                {/* Notification bell */}
                <div className="relative border py-3 px-3 rounded-[.2rem] border-gray-200 bg-gray-50">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </div>

                {/* User profile */}
                <div className="flex items-center border rounded-[.5rem] px-6 py-2 bg-gray-50 border-gray-200">
                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/avatar-placeholder.png"
                      alt="James Mason"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          target.style.display = "none";
                          parent.classList.add(
                            "flex",
                            "items-center",
                            "justify-center",
                            "bg-green-100",
                            "text-green-600"
                          );
                          parent.innerHTML = "EP";
                        }
                      }}
                    />
                  </div>
                  <div className="ml-3 hidden tablet-sm:block">
                    <p className="text-sm font-medium text-gray-800">
                      Edwin Peter
                    </p>
                    <p className="text-xs text-gray-500">Farmer</p>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
                </div>
              </div>
            </div>
          </header>

          <div className="pt-[2rem] laptop-sm:px-10 px-2">
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content area */}
              <div className="tablet-lg:p-6 lg:col-span-2  bg-white">
                {/* Dashboard Home Tab */}
                {activeTab === "dashboard" && <DashboardOverview />}

                {/* Inventory Tab */}
                {activeTab === "inventory" && (
                  <>
                    {showModal && modalType === "addProduct" ? (
                      <AddNewProduct />
                    ) : showModal &&
                      modalType === "editProduct" &&
                      selectedProduct ? (
                      <EditProduct />
                    ) : (
                      <InventoryTab />
                    )}
                  </>
                )}

                {/* {activeTab === "inventory" && (
                  <>
                    {showModal && modalType === "addProduct" ? (
                      <AddNewProduct />
                    ) : showModal &&
                      modalType === "viewProduct" &&
                      selectedProduct ? (
                      <ViewProduct />
                    ) : showModal &&
                      modalType === "editProduct" &&
                      selectedProduct ? (
                      <EditProduct />
                    ) : (
                      <InventoryTab />
                    )}
                  </>
                )} */}

                {activeTab === "orders" && (
                  <>
                    {showModal && modalType === "viewOrder" && selectedOrder ? (
                      <ViewOrder />
                    ) : (
                      <OrdersTab />
                    )}
                  </>
                )}

                {/* Messages Tab */}
                {activeTab === "messages" && <MessagesTab />}

                {activeTab === "offer" && <OfferTab />}

                {/* Payments Tab */}
                {activeTab === "payments" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Payment Management
                      </h2>
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        Export Report
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Financial Overview
                      </h3>
                      <p className="text-gray-600">
                        Track your earnings, manage payment transactions, and
                        organize your financial records.
                      </p>
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && <ProfileTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
