"use client";
import { X, Trash2, ShoppingBag, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const CartDrawer = ({ openCart, setOpenCart }) => {
  const { removeFromCart, deleteProduct, addToCart, cart } = useCart();
  const { user, setSelectedRole, setFromCart, setShowSignupForm } = useAuth();

  const router = useRouter();

  const handleCheckout = () => {
    if (user) {
      router.push("/products/checkout");
    } else {
      setShowSignupForm(true);
      setSelectedRole("regular buyer");
      router.push("/authentication/register/");
      setOpenCart(false);
      setFromCart(true);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeShippingThreshold = 2000;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (!openCart) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end text-[clamp(.75rem,1.2vw,.9rem)]">
      {/* Overlay */}
      <div className="absolute inset-0 " onClick={() => setOpenCart(false)} />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md tablet-lg:max-w-xl bg-white shadow-xl h-screen flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex justify-between items-center px-2 tablet-lg:px-4 laptop-lg:px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-amber-500" size={20} />
            <h2 className="text-[1rem] font-semibold text-gray-800">
              Your Cart
            </h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 tablet-lg:px-4 laptop-lg:px-6 py-0.5 rounded-full">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setOpenCart(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-2 tablet-lg:px-4 laptop-lg:px-6 py-4 bg-amber-50">
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} className="text-amber-600" />
            {subtotal >= freeShippingThreshold ? (
              <p className="font-medium text-amber-800">
                You've unlocked free shipping!
              </p>
            ) : (
              <p className="font-medium text-amber-800">
                Add ₦
                {Math.max(0, freeShippingThreshold - subtotal).toLocaleString()}{" "}
                more for free shipping
              </p>
            )}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-amber-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add items to get started with your order
            </p>
            <button
              onClick={() => setOpenCart(false)}
              className="flex items-center text-amber-500 hover:text-amber-600 font-medium"
            >
              Continue Shopping
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {console.log(item)}
                <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    width={110}
                    height={110}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 ml-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="text-gray-600 mt-1">
                    ₦{item.price.toLocaleString()}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="inline-flex items-center border border-gray-300 rounded overflow-hidden shadow-sm">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 h-6 flex items-center font-semibold justify-center text-[.7rem]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                          })
                        }
                        className="w-8 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-medium text-gray-900">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Notes */}
        {cart.length > 0 && (
          <div className="bg-gray-50 px-2 tablet-lg:px-4 laptop-lg:px-6 py-4">
            <div className="flex items-center mb-2">
              <label htmlFor="orderNote" className="font-medium text-gray-700">
                Order Notes
              </label>
            </div>
            <input
              type="text"
              id="orderNote"
              placeholder="Add special instructions for your order..."
              className="w-full py-2 px-3 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="border-t px-2 tablet-lg:px-4 laptop-lg:px-6 py-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>
                  {subtotal >= freeShippingThreshold
                    ? "Free"
                    : "Calculated at checkout"}
                </span> 
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Taxes included. Discounts applied at checkout.
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                className="w-full bg-amber-500 text-white py-3 rounded font-medium hover:bg-amber-600 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => setOpenCart(false)}
                className="w-full border border-amber-500 text-amber-500 py-2 rounded font-medium hover:bg-amber-50 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
