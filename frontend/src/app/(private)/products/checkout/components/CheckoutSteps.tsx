import { Check, User, Truck, CreditCard } from "lucide-react";

const CheckoutSteps = ({ steps, currentStep }) => {
  return (
    <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-6 h-6 mobile-lg:w-7 mobile-lg:h-7 tablet-sm:w-8 tablet-sm:h-8 tablet-lg:w-10 tablet-lg:h-10 rounded-full border-2 transition-all duration-200 ${
                  isCompleted
                    ? "bg-amber-500 border-amber-500 text-white shadow-lg"
                    : isActive
                    ? "border-amber-500 text-amber-500 bg-amber-50 shadow-md"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check
                    size={12}
                    className="mobile-lg:w-3 mobile-lg:h-3 tablet-sm:w-3.5 tablet-sm:h-3.5 tablet-lg:w-4 tablet-lg:h-4"
                  />
                ) : (
                  <Icon
                    size={12}
                    className="mobile-lg:w-3 mobile-lg:h-3 tablet-sm:w-3.5 tablet-sm:h-3.5 tablet-lg:w-4 tablet-lg:h-4"
                  />
                )}
              </div>
              <span
                className={`ml-1.5 mobile-lg:ml-2 tablet-lg:ml-2 font-medium text-xs mobile-lg:text-xs tablet-sm:text-sm tablet-lg:text-sm ${
                  isActive
                    ? "text-amber-600"
                    : isCompleted
                    ? "text-amber-500"
                    : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`mx-1 mobile-lg:mx-2 tablet-sm:mx-3 tablet-lg:mx-4 h-px w-4 mobile-lg:w-6 tablet-sm:w-8 tablet-lg:w-10 transition-colors ${
                    isCompleted ? "bg-amber-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
