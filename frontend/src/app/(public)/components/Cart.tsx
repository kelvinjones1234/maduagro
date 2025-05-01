import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";

const dummyCart = [
  {
    id: 1,
    name: "Soothing Cologne For Dogs",
    image: "https://via.placeholder.com/60",
    quantity: 2,
    price: 25.0,
  },
];

const CartDrawer = ({ openCart, setOpenCart }) => {
  const [cartItems, setCartItems] = useState(dummyCart);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeShippingThreshold = 50;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return openCart ? (
    <div className="fixed right-0 top-0 w-[clamp(30px,90vw,900px)] h-screen bg-white shadow-lg z-0 pb-4 px-2 tablet-lg:px-4 flex flex-col">
      {/* Free Shipping Progress */}
      <div className="mt-6">
        <p className="text-sm mb-2 text-gray-600">
          <span className="text-yellow-500 font-bold pb-8">CART </span>
          <br />
          Spend &#8358;
          {Math.max(0, freeShippingThreshold - subtotal).toFixed(2)} more to
          reach free shipping
        </p>
        <div className="w-full h-1 bg-gray-200 mb-4">
          <div
            className="h-full bg-yellow-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto py-8">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="">
              <Image
                src="/images/test2.jpg"
                alt=""
                width={120}
                height={120}
                className="rounded object-cover"
              />
            </div>
            <div className="flex-1 px-2">
              <p className="text-sm font-medium">{item.name}</p>
              <div className="inline-flex items-center border  space-x-2 mt-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="px-2 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="px-2 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm">
                &#8358;{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Note Section */}
      <div className="border-t border-b py-2 my-4 text-center text-sm text-gray-500">
        ✏️ NOTE
      </div>

      {/* Subtotal */}
      <div className="flex justify-between font-medium text-sm mb-1">
        <span>Subtotal</span>
        <span>&#8358;{subtotal.toFixed(2)} NGN</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Taxes included. Discounts and{" "}
        <span className="underline">shipping</span> calculated at checkout.
      </p>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-yellow-500 text-white py-2">CHECK OUT</button>
        <button className="flex-1 border border-yellow-500 py-2">VIEW CART</button>
      </div>
    </div>
  ) : null;
};

export default CartDrawer;
