import React, { useState } from "react";
import {
  Eye,
  Share2,
  Heart,
  Minus,
  Plus,
  Star,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

const renderRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className="relative h-5 w-5">
          <Star className="absolute h-5 w-5 text-gray-300" />
          <div className="absolute overflow-hidden w-1/2">
            <Star className="h-5 w-5 text-amber-400 fill-current" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
    }
  }
  return stars;
};

const product = {
  id: 1,
  name: "Digital Food Storage Monitor",
  category: "Grain",
  price: 299.99,
  rating: 4.7,
  reviews: 124,
  views: 1856,
  description:
    "Our cutting-edge Digital Food Storage Monitor combines IoT sensors and advanced analytics to revolutionize how you store and distribute agricultural products. Reduce waste and ensure quality with real-time monitoring of temperature, humidity, and other critical parameters.",
  features: [
    "Real-time temperature and humidity monitoring",
    "Mobile alerts for condition changes",
    "Historical data analysis",
    "Cloud-based dashboard",
    "Battery life up to 12 months",
    "Waterproof and dust-resistant design",
  ],
  specifications: {
    Dimensions: "10cm x 5cm x 2cm",
    Weight: "150g",
    Connectivity: "WiFi, Bluetooth 5.0",
    Battery: "Rechargeable lithium-ion",
    "Sensor Range": "Temperature: -30°C to 60°C, Humidity: 0-100%",
    "Data Storage": "Up to 30 days offline",
  },
  comments: [
    {
      id: 1,
      user: "Maria Rodriguez",
      avatar: "/api/placeholder/40/40",
      date: "April 15, 2025",
      content:
        "This device has transformed how we manage our grain storage. The real-time alerts have saved us from losing inventory multiple times during unexpected weather changes.",
      rating: 5,
    },
    {
      id: 2,
      user: "John Thompson",
      avatar: "/api/placeholder/40/40",
      date: "April 10, 2025",
      content:
        "Good product but the mobile app could use some improvements. The sensor itself works great though.",
      rating: 4,
    },
    {
      id: 3,
      user: "Wei Zhang",
      avatar: "/api/placeholder/40/40",
      date: "April 2, 2025",
      content:
        "We've implemented these across our cooperative and seen a 25% reduction in post-harvest losses. The ROI is incredible.",
      rating: 5,
    },
  ],
  available: true,
  discountPercent: 15,
  originalPrice: 349.99,
};

const DetailHero = () => {
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const thumbnails = [
    "/images/test12.jpg",
    "/images/test12.jpg",
    "/images/test12.jpg",
    "/images/test12.jpg",
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 mb-12">
      <div className="laptop-lg:flex gap-8 p-4">
        {/* Product Image Gallery */}
        <div className="laptop-lg:w-1/2">
          <div className="mb-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={thumbnails[activeImage]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {thumbnails.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-[3/3] rounded-lg overflow-hidden cursor-pointer transition-all ${
                  activeImage === index
                    ? "ring-2 ring-amber-500"
                    : "hover:ring-1 hover:ring-amber-300"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={img}
                  alt={`Product view ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="laptop-lg:w-1/2 laptop-lg:pt-0 pt-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-block text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.available ? (
              <span className="inline-block text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="inline-block text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-3 text-gray-900">
            {product.name}
          </h1>

          {/* Ratings and Views */}
          <div className="flex flex-wrap items-center gap-6 mb-5">
            <div className="flex items-center">
              <div className="flex">{renderRatingStars(product.rating)}</div>
              <span className="ml-2 text-sm text-gray-600">
                <span className="font-medium">{product.rating}</span> (
                {product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {product.views.toLocaleString()} views
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 border-b border-gray-100 pb-6">
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-gray-900">
                &#8358;{product.price.toFixed(2)}
              </p>
              {/* {product.discountPercent > 0 && (
                <p className="text-lg text-gray-500 line-through mb-0.5">
                  &#8358;{product.originalPrice.toFixed(2)}
                </p>
              )} */}
            </div>
            <p className="text-sm text-emerald-600 mt-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1H4V6h7v4h2V5a1 1 0 00-1-1H3zM14 7h1.05a2.5 2.5 0 014.9 0H20a1 1 0 011 1v4a1 1 0 01-1 1h-.05a2.5 2.5 0 01-4.9 0H15a1 1 0 01-1-1V8a1 1 0 011-1z" />
              </svg>
              Free shipping on orders over &#8358;500
            </p>
          </div>

          {/* Short Description */}
          {/* <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div> */}

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Key Informations</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <div className="flex items-center border border-gray-100 rounded-lg w-fit">
              <button
                aria-label="Decrease quantity"
                className="p-2 hover:bg-gray-100 rounded-l-lg transition"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center border-none focus:ring-0"
              />
              <button
                aria-label="Increase quantity"
                className="p-2 hover:bg-gray-100 rounded-r-lg transition"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition">
              Buy Now
            </button>
            <button
              aria-label={liked ? "Unlike product" : "Like product"}
              className={`p-3 rounded-lg border flex justify-center ${
                liked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-white border-gray-200 text-gray-500"
              } hover:bg-gray-50 transition`}
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={`h-6 w-6 ${
                  liked ? "fill-current text-red-500" : ""
                }`}
              />
            </button>
            <button
              aria-label="Share product"
              className="p-3 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 flex justify-center transition"
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {["IoT", "Smart Agriculture", "Food Storage", "Monitoring"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition cursor-pointer"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHero;
