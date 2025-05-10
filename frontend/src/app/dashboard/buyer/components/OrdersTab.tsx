import { Search, Filter, Eye, Truck } from "lucide-react";
import { orders } from "../../ConstData";
import { useDashboard } from "../../context/DashboardContext";

// Order Management Tab Component
export default function OrdersTab() {
  const { orderModal } = useDashboard();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mb-4 mobile-lg:mb-6">
        <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight">
          Order Management
        </h2>
        <div className="flex flex-col mobile-lg:flex-row space-y-2 mobile-lg:space-y-0 mobile-lg:space-x-3 mt-3 mobile-lg:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-1.5 mobile-lg:py-2 text-xs mobile-sm:text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 w-full mobile-lg:w-64"
              aria-label="Search orders"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <button
            className="text-gray-600 px-3 py-1.5 mobile-lg:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center text-xs mobile-sm:text-sm"
            aria-label="Filter orders"
          >
            <Filter
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1"
              aria-hidden="true"
            />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Products
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-2 mobile-lg:px-6 mobile-lg:py-3 text-left text-[0.65rem] mobile-sm:text-xs tablet-lg:text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap">
                  <div className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                    {order.id}
                  </div>
                  <div className="text-xs mobile-sm:text-sm text-gray-500">
                    {order.date}
                  </div>
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap">
                  <div className="text-xs mobile-sm:text-sm text-gray-900">
                    {order.customer}
                  </div>
                  <div className="text-xs mobile-sm:text-sm text-gray-500">
                    {order.location}
                  </div>
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 text-xs mobile-sm:text-sm text-gray-900">
                  {order.products}
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap text-xs mobile-sm:text-sm font-medium text-gray-900">
                  {order.amount}
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 mobile-lg:px-3 mobile-lg:py-1 inline-flex text-[0.65rem] mobile-sm:text-xs font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 mobile-lg:px-6 mobile-lg:py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      onClick={() => orderModal("viewOrder", order)}
                      aria-label={`View ${order.id} details`}
                    >
                      <Eye
                        className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                        aria-hidden="true"
                      />
                    </button>
                    {/* <button
                      className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      aria-label={`Track order ${order.id}`}
                    >
                      <Truck
                        className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5"
                        aria-hidden="true"
                      />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="mt-4 mobile-lg:mt-6">
        <h3 className="text-base mobile-sm:text-lg tablet-lg:text-lg font-medium text-gray-900 mb-3 mobile-lg:mb-4">
          Track Orders
        </h3>
        <div className="bg-gray-50 p-3 mobile-lg:p-4 rounded-lg">
          <div className="flex flex-col tablet-lg:flex-row tablet-lg:items-center mb-3 mobile-lg:mb-4">
            <div className="w-full tablet-lg:w-2/3 mb-3 tablet-lg:mb-0 tablet-lg:mr-4">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-4591)"
                className="w-full p-2 mobile-lg:p-2.5 text-xs mobile-sm:text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                aria-label="Enter order ID to track"
              />
            </div>
            <div className="w-full tablet-lg:w-1/3">
              <button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 mobile-lg:py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Track order"
              >
                Track Order
              </button>
            </div>
          </div>
          <div className="text-[0.65rem] mobile-sm:text-xs text-gray-500">
            Enter an order ID to view detailed tracking information
          </div>
        </div>
      </div> */}
    </div>
  );
}
