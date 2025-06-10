"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useCart } from "../../../context/CartContext";

type ActionButtonsProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    available: boolean;
  };
};

export default function ActionButtons({ product }: ActionButtonsProps) {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          className={`bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition flex items-center justify-center ${
            !product.available ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!product.available}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </button>
        <button
          className={`bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition ${
            !product.available ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!product.available}
        >
          Buy Now
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className={`flex-1 py-2 px-4 rounded-lg border ${
            liked
              ? "bg-red-50 border-red-200 text-red-500"
              : "bg-white border-gray-200 text-gray-700"
          } hover:bg-gray-50 transition flex items-center justify-center`}
          onClick={() => setLiked(!liked)}
        >
          <Heart
            className={`h-5 w-5 mr-2 ${
              liked ? "fill-current text-red-500" : ""
            }`}
          />
          {liked ? "Saved" : "Save"}
        </button>
        <button
          aria-label="Share product"
          className="flex-1 py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center transition"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </button>
      </div>
    </div>
  );
}
