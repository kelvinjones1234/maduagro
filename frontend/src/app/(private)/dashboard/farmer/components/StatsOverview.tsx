import {
  Package,
  // NairaSign,
  Clipboard,
  HardDrive,
  TrendingUp,
} from "lucide-react";

// Stats Overview Component
export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8 mobile-lg:gap-5 tablet-lg:grid-cols-2 tablet-lg:gap-6 laptop-lg:grid-cols-4">
      {/* Total Products */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 mobile-lg:p-5 tablet-lg:p-6 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3 mobile-lg:mb-4">
          <h3 className="text-gray-600 text-xs mobile-sm:text-sm tablet-lg:text-sm font-semibold tracking-tight">
            Total Products
          </h3>
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 mobile-lg:p-2.5 rounded-full">
            <Package
              className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-green-700"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl mobile-sm:text-3xl tablet-lg:text-3xl font-bold text-gray-900">
            47
          </h2>
          <div className="flex items-center mt-2 mobile-lg:mt-3">
            <span className="text-green-600 text-xs mobile-sm:text-sm tablet-lg:text-sm font-medium flex items-center">
              <TrendingUp
                className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1"
                aria-hidden="true"
              />
              12%
            </span>
            <span className="text-gray-500 text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs ml-2">
              from last month
            </span>
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 mobile-lg:p-5 tablet-lg:p-6 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3 mobile-lg:mb-4">
          <h3 className="text-gray-600 text-xs mobile-sm:text-sm tablet-lg:text-sm font-semibold tracking-tight">
            Total Revenue
          </h3>
          <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-2 mobile-lg:p-2 rounded-full">
            <div
              className="h-2 w-2 mobile-lg:h-5 mobile-lg:w-5 mobile-lg:text-[1.5rem] text-white flex items-center justify-center"
              aria-hidden="true"
            >
              ₦
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mobile-sm:text-3xl tablet-lg:text-3xl font-bold text-gray-900">
            ₦384,500
          </h2>
          <div className="flex items-center mt-2 mobile-lg:mt-3">
            <span className="text-green-600 text-xs mobile-sm:text-sm tablet-lg:text-sm font-medium flex items-center">
              <TrendingUp
                className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1"
                aria-hidden="true"
              />
              8.5%
            </span>
            <span className="text-gray-500 text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs ml-2">
              from last month
            </span>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 mobile-lg:p-5 tablet-lg:p-6 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3 mobile-lg:mb-4">
          <h3 className="text-gray-600 text-xs mobile-sm:text-sm tablet-lg:text-sm font-semibold tracking-tight">
            Active Orders
          </h3>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-2 mobile-lg:p-2.5 rounded-full">
            <Clipboard
              className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-yellow-700"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl mobile-sm:text-3xl tablet-lg:text-3xl font-bold text-gray-900">
            12
          </h2>
          <div className="flex items-center mt-2 mobile-lg:mt-3">
            <span className="text-gray-500 text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs">
              Requiring attention
            </span>
          </div>
        </div>
      </div>

      {/* Storage Capacity */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 mobile-lg:p-5 tablet-lg:p-6 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3 mobile-lg:mb-4">
          <h3 className="text-gray-600 text-xs mobile-sm:text-sm tablet-lg:text-sm font-semibold tracking-tight">
            Storage Capacity
          </h3>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 mobile-lg:p-2.5 rounded-full">
            <HardDrive
              className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-blue-700"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 mobile-lg:mb-2">
            <h2 className="text-2xl mobile-sm:text-3xl tablet-lg:text-3xl font-bold text-gray-900">
              68%
            </h2>
            <span className="text-gray-500 text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs">
              2.4/3.5 tons
            </span>
          </div>
          <div className="h-1.5 mobile-lg:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-700 rounded-full transition-all duration-500"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
