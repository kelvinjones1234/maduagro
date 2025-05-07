import { LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "../../context/DashboardContext";
import {
  Home,
  ShoppingBag,
  MessageSquare,
  CreditCard,
  User,
  HandCoins,
  Package,
} from "lucide-react";

const navigationGroups = [
  {
    title: "GENERAL",
    items: [{ name: "Dashboard", icon: <Home size={20} />, id: "dashboard" }],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Orders", icon: <ShoppingBag size={20} />, id: "orders" },
      { name: "Offer", icon: <HandCoins size={20} />, id: "offer" },
      { name: "Products", icon: <Package size={20} />, id: "inventory" },
      { name: "Messages", icon: <MessageSquare size={20} />, id: "messages" },
      { name: "Payments", icon: <CreditCard size={20} />, id: "payments" },
    ],
  },
  {
    title: "OTHERS",
    items: [
      { name: "Profile", icon: <User size={20} />, id: "profile" },
      // { name: "Logout", icon: <LogOut size={20} />, id: "logout" },
    ],
  },
];

export default function DashboardSidebar() {
  const { activeTab, setActiveTab } = useDashboard();

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
          bush<span className="text-amber-500 font-extrabold">Market</span>
        </div>
      </Link>

      {/* Navigation Groups */}
      <div className="flex flex-col flex-1 overflow-y-auto py-[3rem]">
        {navigationGroups?.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="px-6 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.id} className="mb-1 cursor-pointer">
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
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium">
            <LogOut className="" />
          </div>
          <div className="cursor-pointer">
            <p className="text-sm font-medium hover:text-gray-900 text-gray-500">
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
