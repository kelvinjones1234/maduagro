"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  MessageCircle,
  Check,
  Shield,
  Users,
  MapPin,
  Calendar,
  Verified,
} from "lucide-react";
import Faq from "./components/Faq";
import Footer from "../components/Footer";
import DetailHero from "./components/DetailHero";
import ResourcesAndSupport from "./components/ResourcesAndSupport";

// Extracted components for better code organization
const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-emerald-500 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const TabButton = ({ name, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`${
      active
        ? "border-emerald-500 text-emerald-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    } py-4 px-1 border-b-2 font-semibold text-sm capitalize transition`}
    aria-selected={active}
    role="tab"
  >
    {name === "reviews" && count ? `Reviews (${count})` : name}
  </button>
);

const SellerCard = ({ seller }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Seller Information
    </h2>
    <div className="flex items-center mb-4">
      <Image
        src="/images/test5.png"
        alt={seller.name}
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="ml-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-900">{seller.name}</h3>
          {seller.verified && (
            <Verified
              className="h-5 w-5 text-emerald-500 ml-2"
              aria-label="Verified seller"
            />
          )}
        </div>
        <div className="flex items-center mt-1">
          <RatingStars rating={seller.rating} />
          <span className="ml-2 text-sm text-gray-600">
            {seller.rating} ({seller.reviews} reviews)
          </span>
        </div>
      </div>
    </div>
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 mr-2" aria-hidden="true" />
        <span>{seller.location}</span>
      </div>
      <div className="flex items-center">
        <Calendar className="h-5 w-5 mr-2" aria-hidden="true" />
        <span>Joined {seller.joined}</span>
      </div>
      <div className="flex items-center">
        <Users className="h-5 w-5 mr-2" aria-hidden="true" />
        <span>{seller.products} products listed</span>
      </div>
      <div className="flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" aria-hidden="true" />
        <span>Responds {seller.responseTime}</span>
      </div>
    </div>
    <p className="mt-4 text-gray-600">{seller.bio}</p>
    {seller.certifications.length > 0 && (
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-900">Certifications</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {seller.certifications.map((cert, index) => (
            <span
              key={index}
              className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    )}
    <div className="mt-6 space-y-3">
      <button
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        aria-label="Contact Seller"
      >
        Chat seller
      </button>
      {/* <button
        className="w-full border border-emerald-500 text-emerald-500 hover:bg-emerald-50 font-semibold py-2 px-4 rounded-lg transition"
        aria-label="View Seller Profile"
      >
        View Seller Profile
      </button> */}
    </div>
  </div>
);

// Mock data - in a real app, this would likely come from an API
const PRODUCT_DATA = {
  id: 1,
  name: "Organic Grain Storage Solution",
  category: "Agricultural Technology",
  price: 299.99,
  rating: 4.8,
  reviews: 89,
  description:
    "A state-of-the-art IoT-based grain storage monitor designed for farmers to ensure optimal storage conditions. Monitor temperature, humidity, and other parameters in real-time to prevent spoilage and maintain quality.",
  features: [
    "Real-time temperature and humidity tracking",
    "Instant mobile alerts for condition changes",
    "Cloud-based analytics dashboard",
    "Up to 12 months battery life",
    "IP67 waterproof and dust-resistant",
  ],
  specifications: {
    Dimensions: "10cm x 5cm x 2cm",
    Weight: "150g",
    Connectivity: "WiFi, Bluetooth 5.0",
    Battery: "Rechargeable lithium-ion",
    "Sensor Range": "Temperature: -30°C to 60°C, Humidity: 0-100%",
    "Data Storage": "30 days offline",
  },
  comments: [
    {
      id: 1,
      user: "Emma Wilson",
      avatar: "/api/placeholder/40/40",
      date: "April 20, 2025",
      content:
        "This monitor has been a game-changer for our cooperative. We've reduced spoilage significantly thanks to the real-time alerts.",
      rating: 5,
    },
    {
      id: 2,
      user: "Liam Patel",
      avatar: "/api/placeholder/40/40",
      date: "April 12, 2025",
      content:
        "Solid device, but the app could be more intuitive. The hardware itself is reliable and accurate.",
      rating: 4,
    },
  ],
};

const SELLER_DATA = {
  name: "GreenFields Tech",
  location: "Nairobi, Kenya",
  joined: "March 2022",
  rating: 4.9,
  reviews: 245,
  products: 12,
  verified: true,
  bio: "GreenFields Tech specializes in innovative agricultural solutions to empower small and medium-scale farmers. We focus on sustainable technology to enhance productivity and reduce losses.",
  responseTime: "Within 2 hours",
  certifications: ["ISO 9001", "Organic Certified"],
};

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState("description");
  const tabs = ["description", "reviews"];

  const product = PRODUCT_DATA;
  const seller = SELLER_DATA;

  // Tab content components
  const TabContent = {
    description: (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Product Description
        </h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>
    ),
    reviews: (
      <div className="px-2">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Customer Reviews
        </h2>
        <div className="bg-gray-50 rounded-xl mb-6">
          <div className="flex items-center gap-6">
            <div className="text-4xl font-bold text-gray-900">
              {product.rating}
            </div>
            <div>
              <div className="flex mb-2">
                <RatingStars rating={product.rating} />
              </div>
              <p className="text-sm text-gray-600">
                Based on {product.reviews} reviews
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {product.comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Image
                    src={comment.avatar}
                    alt={`${comment.user}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {comment.user}
                    </h3>
                    <div className="flex items-center mt-1">
                      <RatingStars rating={comment.rating} />
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{comment.date}</span>
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {comment.content}
              </p>
              <button
                className="mt-3 flex items-center text-sm text-gray-600 hover:text-gray-800 transition"
                aria-label={`Reply to ${comment.user}`}
              >
                <MessageCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                Reply
              </button>
            </div>
          ))}
        </div>
        <button
          className="mt-6 text-emerald-600 hover:text-emerald-700 font-semibold"
          aria-label="Load More Reviews"
        >
          Load More Reviews
        </button>
      </div>
    ), 
  };

  return (
    <main className="mx-auto font-sans mt-[10rem] text-[#2D2D2D]">
      {/* Product Hero Section */}
      <DetailHero />

      <div className="grid laptop-lg:grid-cols-2 gap-10 mb-16">
        {/* Left Column: Product Details */}
        <div className="laptop-lg:col-span-1">
          {/* Product Title and Basic Info */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <RatingStars rating={product.rating} />
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            {/* <span className="text-lg font-semibold text-emerald-600">
              &#8358;{product.price.toFixed(2)}
            </span> */}
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav
              className="flex space-x-8 overflow-x-auto scrollbar-hide"
              aria-label="Product information tabs"
              role="tablist"
            >
              {tabs.map((tab) => (
                <TabButton
                  key={tab}
                  name={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  count={tab === "reviews" ? product.comments.length : null}
                />
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div
            className="mb-12"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {TabContent[activeTab]}
          </div>
        </div>

        {/* Right Column: Seller Info and Actions */}
        <div className="laptop-lg:col-span-1">
          <SellerCard seller={seller} />
        </div>
      </div>

      {/* FAQ Section */}
      <Faq />

      {/* Customer Resources */}
      <ResourcesAndSupport />

      <div className="py-[4rem]">
        <Footer />
      </div>
    </main>
  );
}
