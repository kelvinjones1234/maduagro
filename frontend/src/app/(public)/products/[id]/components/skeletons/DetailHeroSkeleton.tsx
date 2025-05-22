"use client";
import { Star, MapPin, Calendar, Users, MessageCircle } from "lucide-react";

export default function DetailHeroSkeleton() {
  return (
    <div className="mx-auto py-8 animate-pulse">
      {/* Main product info section */}
      <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column: Image Skeleton */}
        <div>
          <div className="relative aspect-4/3 rounded-xl bg-gray-300" />

          {/* Thumbnail Gallery */}
          <div className="flex mt-4 space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 tablet-sm:w-20 tablet-sm:h-20 rounded-lg bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Right Column: Product Details Skeleton */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div className="w-24 h-5 bg-gray-300 rounded-full" />

          {/* Product Title */}
          <div className="w-3/4 h-8 bg-gray-300 rounded-md" />

          {/* Rating & Views */}
          <div className="flex space-x-4">
            <div className="w-20 h-5 bg-gray-300 rounded" />
            <div className="w-16 h-5 bg-gray-300 rounded" />
          </div>

          {/* Price Section */}
          <div className="w-32 h-10 bg-gray-300 rounded-md" />

          {/* Quantity Selector */}
          <div className="w-40 h-10 bg-gray-300 rounded-md" />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-300 rounded-lg" />
            <div className="h-12 bg-gray-300 rounded-lg" />
          </div>

          {/* Wishlist & Share Buttons */}
          <div className="flex space-x-4">
            <div className="flex-1 h-10 bg-gray-300 rounded-lg" />
            <div className="flex-1 h-10 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Details and Seller Section */}
      <div className="grid grid-cols-1 laptop-lg:grid-cols-2 gap-8">
        {/* Tabs Skeleton (full width on small screens, left column on laptop-lg) */}
        <div className="laptop-lg:pr-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
              <div className="w-24 h-8 bg-gray-300 rounded-md" />
              <div className="w-24 h-8 bg-gray-300 rounded-md" />
            </div>

            {/* Tab content blocks */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded" />
              ))}
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
            </div>
          </div>
        </div>

        {/* Seller Info (right column on laptop-lg, full width on smaller screens) */}
        <div className="laptop-lg:pl-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 shadow-sm animate-pulse">
            <h2 className="h-6 w-40 bg-gray-300 rounded mb-4"></h2>

            <div className="flex items-center mb-4">
              <div className="rounded-full bg-gray-300 h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0" />

              <div className="ml-3 sm:ml-4 flex-1 space-y-2 overflow-hidden">
                <div className="flex items-center">
                  <div className="h-5 w-3/4 bg-gray-300 rounded" />
                  <div className="h-5 w-5 bg-gray-300 rounded-full ml-2" />
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 bg-gray-300 rounded"
                      />
                    ))}
                  </div>
                  <div className="h-4 w-20 bg-gray-300 rounded ml-2" />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-gray-400">
              <div className="flex items-center">
                <MapPin
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>

              <div className="flex items-center">
                <Calendar
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </div>

              <div className="flex items-center">
                <Users
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>

              <div className="flex items-center">
                <MessageCircle
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="h-4 w-36 bg-gray-300 rounded" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 w-20 bg-gray-300 rounded mt-2" />
            </div>

            <div className="mt-4">
              <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-20 bg-gray-300 rounded" />
                <div className="h-6 w-20 bg-gray-300 rounded" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-10 bg-gray-300 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
