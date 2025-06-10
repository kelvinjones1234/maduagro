import { Truck, Clock } from "lucide-react";

const DeliveryOptions = ({ formData, handleInputChange, orderSummary }) => {
  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "5-7 business days",
      price: 1500,
      description: "Regular delivery to your doorstep",
    },
    {
      id: "express",
      name: "Express Delivery",
      time: "2-3 business days",
      price: 3000,
      description: "Faster delivery for urgent orders",
    },
    {
      id: "overnight",
      name: "Overnight Delivery",
      time: "Next business day",
      price: 5000,
      description: "Get your order tomorrow",
    },
  ];

  return (
    <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
      <div className="flex items-center gap-2 mobile-lg:gap-3 mb-4 tablet-lg:mb-6">
        <div className="w-7 h-7 mobile-lg:w-8 mobile-lg:h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Truck
            size={14}
            className="mobile-lg:w-4 mobile-lg:h-4 text-amber-600"
          />
        </div>
        <h3 className="text-base mobile-lg:text-lg font-semibold text-gray-900">
          Delivery Options
        </h3>
      </div>

      <div className="space-y-2 mobile-lg:space-y-3">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between p-2 mobile-lg:p-3 tablet-lg:p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center min-w-0 flex-1">
              <input
                type="radio"
                name="deliveryOption"
                value={option.id}
                checked={formData.deliveryOption === option.id}
                onChange={handleInputChange}
                className="text-amber-500 focus:ring-amber-500 flex-shrink-0"
              />
              <div className="ml-2 mobile-lg:ml-3 min-w-0 flex-1">
                <div className="font-medium text-gray-900 flex items-center gap-1 mobile-lg:gap-2 flex-wrap">
                  <span className="text-sm mobile-lg:text-base">
                    {option.name}
                  </span>
                  {option.id === "overnight" && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-xs mobile-lg:text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                  <Clock size={10} className="mobile-lg:w-3 mobile-lg:h-3" />
                  {option.time}
                </div>
                <div className="text-xs text-gray-500 mt-1 hidden mobile-lg:block">
                  {option.description}
                </div>
              </div>
            </div>
            <div className="font-medium text-gray-900 text-sm mobile-lg:text-base ml-2 flex-shrink-0">
              {orderSummary.subtotal >= orderSummary.freeShippingThreshold &&
              option.id === "standard"
                ? "Free"
                : `₦${option.price.toLocaleString()}`}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
