"use client";

import { useCart } from "../../../context/CartContext";

type QuantitySelectorProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    available: boolean;
  };
};

export default function QuantitySelector({ product }: QuantitySelectorProps) {
  const { addToCart, removeFromCart, cart } = useCart();
  const cartItem = cart?.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
      <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => removeFromCart(product.id)}
          className="w-10 h-10 tablet-sm:w-12 tablet-sm:h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-medium"
          aria-label="Decrease quantity"
          disabled={quantity === 0}
        >
          -
        </button>
        <span className="w-10 h-10 tablet-sm:w-12 tablet-sm:h-8 flex items-center justify-center font-medium text-gray-900">
          {quantity}
        </span>
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          className="w-10 h-10 tablet-sm:w-12 tablet-sm:h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-medium"
          aria-label="Increase quantity"
          disabled={!product.available}
        >
          +
        </button>
      </div>
    </div>
  );
}
