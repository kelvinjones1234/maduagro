import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { renderRatingStars } from "../utils/helpers";
import Link from "next/link";

interface SellerProfile {
  nickname?: string;
  full_name?: string;
}

interface ProductCategory {
  category_name: string;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  image: string;
  available_quantity: number;
  average_rating?: number;
  review_count?: number;
  product_category: ProductCategory;
  seller_profile?: SellerProfile;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  hoveredProductId: number | null;
  setHoveredProductId: React.Dispatch<React.SetStateAction<number | null>>;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  cart: CartItem[];
  toggleCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredProductId,
  setHoveredProductId,
  addToCart,
  removeFromCart,
  cart,
  toggleCart,
}) => {
  const isInCart = cart.find((i) => i.id === product.id);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 transition hover:shadow-md">
      <Link href={`/products/${product.id}`}>
        <div
          className={`relative aspect-square overflow-hidden group ${
            product.available_quantity < 1 ? "cursor-pointer" : "opacity-90"
          }`}
          aria-disabled={product.available_quantity < 0}
        >
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.product_name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500"
          />
          {product.available_quantity < 1 && (
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
              <span className="bg-red-600 text-white font-bold text-[.7rem] px-3 py-1 rounded-full shadow-lg">
                OUT OF STOCK
              </span>
            </div>
          )}
          {product.available_quantity > 1 && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleCart();
                }}
                className="bg-white bg-opacity-90 p-2 rounded-full cursor-pointer shadow-md hover:bg-amber-500 hover:text-white transition-colors"
                aria-label="Quick add to cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-emerald-600 py-0.5 rounded-full">
            {product.category_details.category_name}
          </span>
          <div className="tablet-lg:flex items-center hidden">
            <div className="flex">
              {renderRatingStars(product.average_rating || 0)}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.review_count || 0})
            </span>
          </div>
        </div>

        <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">
          {product.product_name}
        </h3>

        <div className="grid justify-between items-center">
          <p className="text-gray-900 font-bold">
            ₦{Number(product.product_price).toLocaleString()}
          </p>
          <div className="relative group pt-[1rem]">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <div className="h-4 w-4 rounded-full bg-amber-400 flex items-center justify-center text-black text-[.6rem]">
                {product.seller_profile?.nickname?.charAt(0).toUpperCase() ||
                  "?"}
              </div>
              <span className="text-xs text-gray-600 hover:underline">
                {product.seller_profile?.nickname || "Unknown"}
              </span>
            </div>
            {hoveredProductId === product.id && (
              <div className="absolute bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10">
                <p className="font-medium text-gray-900 mb-1">Seller Profile</p>
                <p className="text-sm text-gray-600">
                  {product.seller_profile?.full_name || "No name available"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="tablet-lg:mt-10">
          <div className="flex tablet-lg:hidden mb-8 mt-2 tablet-lg:mb-4">
            {renderRatingStars(product.average_rating || 0)}
          </div>
          {isInCart ? (
            <div className="flex items-center justify-between bg-gray-50 rounded-lg cursor-default">
              <button
                className="w-8 h-8 flex items-center justify-center cursor-pointer bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(product.id);
                }}
              >
                -
              </button>
              <span className="font-medium text-gray-700">
                {isInCart.quantity}
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center cursor-pointer bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    id: product.id,
                    name: product.product_name,
                    price: product.product_price,
                    image: product.image,
                  });
                }}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.product_name,
                  price: product.product_price,
                  image: product.image,
                });
              }}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                product.available_quantity > 0
                  ? "bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-default"
              }`}
              disabled={product.available_quantity < 1}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="font-medium">
                {product.available_quantity > 0 ? "Add to Cart" : "Sold Out"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
