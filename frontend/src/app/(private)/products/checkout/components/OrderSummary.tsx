import React from "react";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/app/(public)/context/CartContext";

const OrderSummary = () => {
  const { cart } = useCart();

  // Calculate order summary values
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeShippingThreshold = 50000; // ₦50,000 for free shipping
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 2500; // ₦2,500 shipping
  const taxRate = 0.075; // 7.5% VAT
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shippingCost + tax;

  const orderSummary = {
    subtotal,
    shippingCost,
    tax,
    total,
    freeShippingThreshold,
  };

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg px-2 py-4 tablet-lg:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <ShoppingBag size={16} className="text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg px-2 py-4 tablet-lg:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <ShoppingBag size={16} className="text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img
              src={item.image || "/api/placeholder/64/64"} // Fallback image
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md bg-gray-100"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{item.name}</p>
              <p className="text-gray-600 text-sm">ID: {item.id}</p>
              <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium text-gray-900">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              ₦{orderSummary.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">
              {orderSummary.shippingCost === 0
                ? "Free"
                : `₦${orderSummary.shippingCost.toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (7.5% VAT)</span>
            <span className="text-gray-900">
              ₦{orderSummary.tax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 text-base border-t pt-2">
            <span>Total</span>
            <span>₦{orderSummary.total.toLocaleString()}</span>
          </div>
        </div>

        {orderSummary.subtotal < orderSummary.freeShippingThreshold && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-sm text-amber-700">
              Add ₦
              {(
                orderSummary.freeShippingThreshold - orderSummary.subtotal
              ).toLocaleString()}{" "}
              more to get free standard shipping
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3">
          <Star size={16} className="text-amber-500" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
