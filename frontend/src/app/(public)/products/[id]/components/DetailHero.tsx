"use client";

import { useState, JSX } from "react";
import Image from "next/image";
import {
  Star,
  MessageCircle,
  ShoppingCart,
  Heart,
  Share2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { SellerCard } from "./SellerCard";
import { useCart } from "../../../context/CartContext";

type TabButtonProps = {
  name: string;
  active: boolean;
  onClick: () => void;
  count?: number | null;
};

type Product = {
  id: number;
  product_name: string;
  product_category?: { category_name: string };
  product_description?: string;
  key_information?: string;
  average_rating?: number;
  rating_count?: number;
  product_price: string;
  image?: string;
  available?: boolean;
  comments?: {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    date: string;
    content: string;
  }[];
  views?: number;
};

type Seller = {
  id: number;
  full_name: string;
  nickname?: string;
  phone?: string;
  profile_picture?: string;
  bio?: string;
  is_verified?: boolean;
};

type DetailHeroProps = {
  product: Product;
  seller: Seller;
};

// RatingStars Component - Reusable across components
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-emerald-500 fill-current"
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div
              key={i}
              className="relative h-4 w-4 tablet-sm:h-5 tablet-sm:w-5"
            >
              <Star className="absolute h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-gray-300" />
              <div className="absolute overflow-hidden w-1/2">
                <Star className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-emerald-500 fill-current" />
              </div>
            </div>
          );
        } else {
          return (
            <Star
              key={i}
              className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-gray-300"
            />
          );
        }
      })}
    </div>
  );
};

// TabButton Component
const TabButton = ({ name, active, onClick, count }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`${
      active
        ? "border-emerald-500 text-emerald-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    } py-2 tablet-sm:py-4 px-1 border-b-2 font-medium tablet-sm:font-semibold text-sm tablet-sm:text-base capitalize transition whitespace-nowrap`}
    aria-selected={active}
    role="tab"
  >
    {name === "reviews" && count ? `Reviews (${count})` : name}
  </button>
);

export default function DetailHero({ product, seller }: DetailHeroProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, removeFromCart, cart } = useCart();

  // Map API data to expected structure
  const productData = {
    id: product?.id || 1,
    name: product?.product_name || "Premium Product",
    category: product?.product_category?.category_name || "Category",
    description:
      product?.product_description ||
      "This is a premium product with high quality materials.",
    key_information:
      product?.key_information ||
      "Made with eco-friendly materials, suitable for all ages.",
    rating: product?.average_rating || 4.5,
    reviews: product?.rating_count || 120,
    price: parseFloat(product?.product_price || "299.99"),
    image: product?.image || "/placeholder.jpg",
    available: product?.available !== false,
    comments: product?.comments || [], // API doesn't provide comments, so use empty array
    views: product?.views || 1500, // API doesn't provide views, default to 1500
  };

  const sellerData = {
    id: seller?.id || 1,
    full_name: seller?.full_name || "John Doe",
    nickname: seller?.nickname || "JD Store",
    phone: seller?.phone || "+234 123 456 7890",
    profile_picture: seller?.profile_picture || "/profile.jpg",
    bio:
      seller?.bio ||
      "Professional seller with years of experience in quality products.",
    is_verified: seller?.is_verified !== false,
  };

  // Create multiple thumbnails for presentation (even if API provides one)
  const thumbnails = product?.image
    ? [product.image, product.image, product.image]
    : ["/placeholder1.jpg", "/placeholder2.jpg", "/placeholder3.jpg"];

  // Next image handler
  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % thumbnails.length);
  };

  // Previous image handler
  const handlePrevImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + thumbnails.length) % thumbnails.length
    );
  };

  // Tab Content
  const TabContent: Record<"description" | "reviews", JSX.Element> = {
    description: (
      <div className="text-sm tablet-sm:text-base">
        <h2 className="font-semibold text-gray-900 mb-3 tablet-sm:mb-4">
          Product Description
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {productData.description}
        </p>
        {productData.key_information && (
          <>
            <h3 className="font-semibold text-gray-900 mt-4 tablet-sm:mt-6 mb-2">
              Key Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {productData.key_information}
            </p>
          </>
        )}
      </div>
    ),
    reviews: (
      <div className="px-0 tablet-sm:px-2 text-sm tablet-sm:text-base">
        <h2 className="font-semibold text-gray-900 mb-3 tablet-sm:mb-4">
          Customer Reviews
        </h2>
        <div className="bg-gray-50 rounded-xl mb-4 tablet-sm:mb-6 p-3 tablet-sm:p-4">
          <div className="flex items-center gap-3 tablet-sm:gap-6">
            <div className="text-2xl tablet-sm:text-4xl font-bold text-gray-900">
              {productData.rating}
            </div>
            <div>
              <div className="flex mb-1 tablet-sm:mb-2">
                <RatingStars rating={productData.rating} />
              </div>
              <p className="text-xs tablet-sm:text-sm text-gray-600">
                Based on {productData.reviews} reviews
              </p>
            </div>
          </div>
        </div>
        {productData.comments.length === 0 ? (
          <p className="text-gray-600">No reviews available yet.</p>
        ) : (
          <div className="space-y-4 tablet-sm:space-y-6">
            {productData.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 pb-4 tablet-sm:pb-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Image
                      src={comment.avatar}
                      alt={`${comment.user}'s avatar`}
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8 tablet-sm:w-10 tablet-sm:h-10"
                    />
                    <div className="ml-3 tablet-sm:ml-4">
                      <h3 className="font-semibold text-gray-900 text-sm tablet-sm:text-base">
                        {comment.user}
                      </h3>
                      <div className="flex items-center mt-1">
                        <RatingStars rating={comment.rating} />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs tablet-sm:text-sm text-gray-600">
                    {comment.date}
                  </span>
                </div>
                <p className="mt-2 tablet-sm:mt-3 text-gray-600 leading-relaxed">
                  {comment.content}
                </p>
                <button
                  className="mt-2 tablet-sm:mt-3 flex items-center text-gray-600 hover:text-gray-800 transition text-sm"
                  aria-label={`Reply to ${comment.user}`}
                >
                  <MessageCircle
                    className="h-3 w-3 tablet-sm:h-4 tablet-sm:w-4 mr-1"
                    aria-hidden="true"
                  />
                  Reply
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="mt-4 tablet-sm:mt-6 text-emerald-600 hover:text-emerald-700 font-medium tablet-sm:font-semibold text-sm tablet-sm:text-base"
          aria-label="Load More Reviews"
        >
          Load More Reviews
        </button>
      </div>
    ),
  };

  // Find item in cart to get quantity
  const cartItem = cart?.find((item) => item.id === productData.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="mx-auto py-8">
      {/* Main product info section */}
      <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column: Product Image */}
        <div>
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src={thumbnails[activeImage]}
              alt={productData.name}
              layout="fill"
              objectFit="cover"
              className="rounded-xl transition-all duration-300 hover:scale-105"
            />
            {/* Navigation Arrows */}
            {thumbnails.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-1 tablet-sm:p-2 rounded-full shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-gray-800" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-1 tablet-sm:p-2 rounded-full shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-gray-800" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {thumbnails.length > 1 && (
            <div className="flex mt-4 space-x-3">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-16 h-16 tablet-sm:w-20 tablet-sm:h-20 rounded-lg overflow-hidden flex-shrink-0 transition ${
                    activeImage === index
                      ? "ring-2 ring-emerald-500"
                      : "ring-1 ring-gray-200 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={thumb}
                    alt={`${productData.name} thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Actions */}
        <div>
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center">
                <span className=" text-emerald-800 text-xs font-medium rounded-full">
                  {productData.category}
                </span>
                {productData.available && (
                  <span className="ml-2 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    In Stock
                  </span>
                )}
              </div>

              <h1 className="font-bold text-gray-900 text-[clamp(1rem,8vw,1.5rem)] mt-2">
                {productData.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center">
                  <RatingStars rating={productData.rating} />
                  <span className="ml-2 text-sm text-gray-600">
                    <span className="font-medium">{productData.rating}</span> (
                    {productData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{productData.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline">
                <p className="font-bold text-gray-900 text-[clamp(.8rem,8vw,1.3rem)]">
                  ₦{productData.price.toFixed(2)}
                </p>
                <p className="ml-2 text-emerald-600 text-sm font-medium flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Free shipping on orders over ₦500
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => removeFromCart(productData.id)}
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
                      id: productData.id,
                      name: productData.name,
                      price: productData.price,
                      image: productData.image,
                    })
                  }
                  className="w-10 h-10 tablet-sm:w-12 tablet-sm:h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-medium"
                  aria-label="Increase quantity"
                  disabled={!productData.available}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  addToCart({
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    image: productData.image,
                  })
                }
                className={`bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition flex items-center justify-center ${
                  !productData.available ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!productData.available}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button
                className={`bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition ${
                  !productData.available ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!productData.available}
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist & Share */}
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
        </div>
      </div>

      {/* Details and Seller Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Information Tabs - Takes 2/3 of the width */}
        <div className="flex ">
          <div className="bg-white overflow-hidden flex-1/2">
            {/* Tab Navigation */}
            <div>
              <div className="border-b border-gray-200">
                <nav
                  className="flex"
                  aria-label="Product information tabs"
                  role="tablist"
                >
                  {["description", "reviews"].map((tab) => (
                    <TabButton
                      key={tab}
                      name={tab}
                      active={activeTab === tab}
                      onClick={() =>
                        setActiveTab(tab as "description" | "reviews")
                      }
                      count={tab === "reviews" ? productData.reviews : null}
                    />
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div
                className="py-4 "
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
              >
                {TabContent[activeTab]}
              </div>
            </div>
          </div>
          {/* Seller Info - Mobile Only */}
          <div className="mt-8 hidden laptop-sm:flex pt flex-1/2">
            <SellerCard seller={sellerData} />
          </div>
        </div>

        {/* Seller Info - Desktop */}
        <div className="laptop-sm:hidden">
          <div className="sticky top-24">
            <SellerCard seller={sellerData} />
          </div>
        </div>
      </div>
    </div>
  );
}
