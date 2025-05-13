"use client";

import { useState } from "react";
import BuyersOffers from "./BuyersOffers";
import MakeOffer from "./MakeOffer";
import FarmersProposals from "./FarmersProposals";

export default function OfferTab() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Commodity Sourcing
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Find, purchase, or request agricultural commodities from verified
              sellers across all regions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto sticky top-5">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex border-b border-gray-200">
            {/* All offers available on the app posted by other sellers */}
            {/* Availbale offer should have some fiters so buyers can easily source out the product of their interest */}
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === "browse"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Farmers Proposals
            </button>
            {/* Buyers can make offers and other sellers get to contact them */}
            <button
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === "request"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Make Offer
            </button>
            {/* This shows a list of all offers you've made */}
            <button
              onClick={() => setActiveTab("sell")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === "sell"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Offers to Farmers
            </button>
          </div>
        </div>

        {activeTab === "browse" ? (
          <FarmersProposals />
        ) : activeTab === "request" ? (
          <MakeOffer />
        ) : (
          <BuyersOffers />
        )}
      </div>
    </div>
  );
}
