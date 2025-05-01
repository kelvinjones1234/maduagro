import {
  ShoppingCart,
  DollarSign,
  HardDrive,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import { activities } from "../ConstData";

// Recent Activity Component
export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight mb-3 mobile-lg:mb-4">
        Recent Activity
      </h2>
      <div className="space-y-3 mobile-lg:space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start hover:bg-gray-50 rounded-lg p-2 mobile-lg:p-3 transition-colors duration-150"
            role="listitem"
          >
            <div
              className={`flex-shrink-0 h-8 w-8 mobile-lg:h-10 mobile-lg:w-10 rounded-full flex items-center justify-center ${
                activity.type === "order"
                  ? "bg-gradient-to-br from-blue-100 to-blue-200"
                  : activity.type === "price"
                  ? "bg-gradient-to-br from-green-100 to-green-200"
                  : activity.type === "message"
                  ? "bg-gradient-to-br from-yellow-100 to-yellow-200"
                  : "bg-gradient-to-br from-purple-100 to-purple-200"
              }`}
              aria-hidden="true"
            >
              {activity.type === "order" && (
                <ShoppingCart className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-blue-600" />
              )}
              {activity.type === "price" && (
                <DollarSign className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-green-600" />
              )}
              {activity.type === "storage" && (
                <HardDrive className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-purple-600" />
              )}
              {activity.type === "message" && (
                <MessageCircle className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5 text-yellow-600" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-xs mobile-sm:text-sm text-gray-500">
                {activity.description}
              </p>
              <p className="text-[0.65rem] mobile-sm:text-xs text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 mobile-lg:mt-4 pt-3 mobile-lg:pt-4 border-t border-gray-200">
        <Link
          href="/activities"
          className="text-green-600 hover:text-green-800 text-xs mobile-sm:text-sm font-medium transition-colors duration-200"
          aria-label="View all activities"
        >
          View all activities
        </Link>
      </div>
    </div>
  );
}
