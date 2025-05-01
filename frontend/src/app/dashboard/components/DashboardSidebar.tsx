import {
  Home,
  ShoppingBag,
  Package,
  MessageSquare,
  CreditCard,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useFarmerDashboard } from "../context/DashboardContext";

export default function DashboardSidebar() {
  const { activeTab, setActiveTab } = useFarmerDashboard();

  const navigationGroups = [
    {
      title: "GENERAL",
      items: [{ name: "Dashboard", icon: <Home size={20} />, id: "dashboard" }],
    },
    {
      title: "MANAGEMENT",
      items: [
        { name: "Orders", icon: <ShoppingBag size={20} />, id: "orders" },
        { name: "Products", icon: <Package size={20} />, id: "inventory" },
        { name: "Messages", icon: <MessageSquare size={20} />, id: "messages" },
        { name: "Payments", icon: <CreditCard size={20} />, id: "payments" },
      ],
    },
    {
      title: "OTHERS",
      items: [
        { name: "Profile", icon: <User size={20} />, id: "profile" },
        { name: "Logout", icon: <LogOut size={20} />, id: "logout" },
      ],
    },
  ];

  const handleNavClick = (tabId: string) => {
    if (tabId === "logout") {
      // Handle logout functionality here
      console.log("Logging out...");
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <div className="w-full h-full border-gray-200 py-6 flex flex-col">
      {/* Logo */}
      <Link href="/" className="px-6 mb-8">
        <div className="text-2xl font-thin flex items-center">
          bush<span className="text-[#f3af00] font-extrabold">Market</span>
        </div>
      </Link>

      {/* Navigation Groups */}
      <div className="flex flex-col flex-1 overflow-y-auto py-[3rem]">
        {navigationGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="px-6 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.id} className="mb-1">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 
                        ${
                          activeTab === item.id
                            ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                    {activeTab === item.id && (
                      <ChevronRight
                        size={16}
                        className="ml-auto text-green-600"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* User Profile Preview */}
      <div className="px-6 py-4 mt-auto border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
            EP
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Edwin Peter</p>
            <p className="text-xs text-gray-500">Farmer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
