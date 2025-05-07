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
  {
    id: 2,
    name: "Soothing Cologne For Dogs",
    image: "https://via.placeholder.com/60",
    quantity: 2,
    price: 25.0,
  },
  {
    id: 3,
    name: "Soothing Cologne For Dogs",
    image: "https://via.placeholder.com/60",
    quantity: 2,
    price: 25.0,
  },
  {
    id: 4,
    name: "Soothing Cologne For Dogs",
    image: "https://via.placeholder.com/60",
    quantity: 2,
    price: 25.0,
  },
  {
    id: 5,
    name: "Soothing Cologne For Dogs",
    image: "https://via.placeholder.com/60",
    quantity: 2,
    price: 25.0,
  },
  {
    id: 6,
    name: "Soothing Cologne For Dogs",
    image: "https://via.placeholder.com/60",
    quantity: 2,
    price: 25.0,
  },
  {
    id: 7,
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
    <div className="fixed right-0 top-0 w-[clamp(30px,90vw,900px)] h-screen bg-white shadow-lg z-0 pb-4 px-2 tablet-lg:px-14 flex flex-col">
      {/* Free Shipping Progress */}
      <div className="mt-6">
        <span className="text-amber-500 font-bold p">CART </span>
        <p className="text-sm mb-2 text-gray-600">
          <br />
          Spend &#8358;
          {Math.max(0, freeShippingThreshold - subtotal).toFixed(2)} more to
          reach free shipping
        </p>
        <div className="w-full h-1 bg-gray-200 mb-4">
          <div
            className="h-full bg-amber-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto py-8 pr-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-[.5rem]"
          >
            <div className="">
              <Image
                src="/images/test2.jpg"
                alt=""
                width={110}
                height={110}
                className="rounded object-cover"
              />
            </div>
            <div className="flex-1 px-2 text-[.8rem]">
              <p className="">{item.name}</p>
              <div className="inline-flex items-center border rounded space-x-2 mt-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="px-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="px-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200"
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
                className="text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Note Section */}
      <div className="w-full max-w-md mx-auto p-4">
        {/* Top Line */}
        <hr className="mb-4 border-t border-gray-300" />

        {/* Input Field */}
        <input
          type="text"
          placeholder="✏️ NOTE"
          className="w-full py-2 px-4 text-center text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-amber-500"
        />

        {/* Bottom Line */}
        <hr className="mt-4 mb-6 border-t border-gray-300" />

        {/* Submit Button */}
        <button className="w-full bg-amber-500 text-white py-2 rounded hover:amber-700 transition">
          Submit
        </button>
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
        <button className="flex-1 bg-amber-500 text-white py-2 rounded">
          CHECK OUT
        </button>
        <button className="flex-1 border border-amber-500 py-2 rounded">
          VIEW CART
        </button>
      </div>
    </div>
  ) : null;
};

export default CartDrawer;
