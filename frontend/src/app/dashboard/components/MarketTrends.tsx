import { TrendingUp, TrendingDown } from "lucide-react";
import { priceData } from "../ConstData";

// Market Price Trends Component
export default function MarketTrends() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight mb-3 mobile-lg:mb-4">
        Market Price Trends
      </h2>
      <div className="h-40 mobile-lg:h-48">
        <div className="flex items-end h-32 mobile-lg:h-40">
          {priceData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-1"
              role="group"
              aria-label={`Price trend for ${item.month}`}
            >
              <div
                className="w-full bg-gradient-to-t from-green-500 to-green-600 rounded-t-md mx-0.5 mobile-lg:mx-1 transition-all duration-300"
                style={{ height: `${item.price}%` }}
              ></div>
              <span className="text-[0.65rem] mobile-sm:text-xs text-gray-600 mt-1 mobile-lg:mt-2">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 mobile-lg:mt-4 border-t border-gray-200 pt-3 mobile-lg:pt-4">
        {[
          { product: "Tomatoes", change: "+12.5%", trend: "up" },
          { product: "Peppers", change: "-4.2%", trend: "down" },
          { product: "Maize", change: "+8.7%", trend: "up" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-1.5 mobile-lg:mb-2"
            role="row"
          >
            <span className="text-xs mobile-sm:text-sm text-gray-600">
              {item.product}
            </span>
            <div className="flex items-center">
              {item.trend === "up" ? (
                <TrendingUp
                  className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 text-green-600 mr-1"
                  aria-hidden="true"
                />
              ) : (
                <TrendingDown
                  className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 text-red-600 mr-1"
                  aria-hidden="true"
                />
              )}
              <span
                className={`text-xs mobile-sm:text-sm font-medium ${
                  item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
