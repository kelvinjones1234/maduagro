import { ChevronLeft, ChevronRight } from "lucide-react";

// Calendar Component
export default function Calendar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <div className="flex justify-between items-center mb-3 mobile-lg:mb-4">
        <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight">
          Calendar
        </h2>
        <div className="flex text-gray-500 space-x-2">
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5" />
          </button>
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4 mobile-lg:h-5 mobile-lg:w-5" />
          </button>
        </div>
      </div>
      <div className="text-center mb-3 mobile-lg:mb-4">
        <h3 className="text-sm mobile-sm:text-base tablet-lg:text-lg font-medium text-gray-900">
          April 2025
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mobile-lg:gap-1 text-center text-[0.65rem] mobile-sm:text-xs mb-1.5 mobile-lg:mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-gray-500 font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 mobile-lg:gap-1 text-xs">
        {/* Previous month */}
        {[28, 29, 30, 31].map((day) => (
          <div
            key={`prev-${day}`}
            className="h-7 mobile-lg:h-8 flex items-center justify-center text-gray-400"
            aria-hidden="true"
          >
            {day}
          </div>
        ))}
        {/* Current month */}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`h-7 mobile-lg:h-8 flex items-center justify-center rounded-full relative
              ${
                day === 20
                  ? "bg-gradient-to-br from-green-600 to-green-700 text-white"
                  : "hover:bg-gray-100"
              }`}
            role="gridcell"
            aria-selected={day === 20}
            aria-label={`April ${day}, 2025${day === 20 ? ", Today" : ""}${
              day === 22 ? ", Delivery Date" : ""
            }`}
          >
            {day}
            {day === 22 && (
              <span
                className="absolute top-0 right-0 h-1.5 w-1.5 mobile-lg:h-2 mobile-lg:w-2 bg-red-500 rounded-full"
                aria-hidden="true"
              ></span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 mobile-lg:mt-4 space-y-1.5 mobile-lg:space-y-2">
        <div className="flex items-center text-[0.65rem] mobile-sm:text-xs">
          <div className="h-2 w-2 bg-green-600 rounded-full"></div>
          <span className="ml-2 text-gray-600">Today</span>
        </div>
        <div className="flex items-center text-[0.65rem] mobile-sm:text-xs">
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
          <span className="ml-2 text-gray-600">Delivery Date</span>
        </div>
      </div>
    </div>
  );
}
