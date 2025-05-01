"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  GridIcon,
  List,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer";

const ProductListingPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilters, setActiveFilters] = useState(["Monitoring"]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const categories = [
    { name: "Monitoring", count: 15 },
    { name: "Sensors", count: 12 },
    { name: "Climate Control", count: 8 },
    { name: "Data Collection", count: 10 },
    { name: "Smart Farming", count: 7 },
  ];

  const priceRanges = [
    { range: "Under ₦100", value: "0-100" },
    { range: "₦100 - ₦200", value: "100-200" },
    { range: "₦200 - ₦300", value: "200-300" },
    { range: "₦300 - ₦500", value: "300-500" },
    { range: "Over ₦500", value: "500-9999" },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const products = [
    {
      id: 1,
      name: "Digital Food Storage Monitor Pro",
      category: "Monitoring",
      price: 299.99,
      rating: 4.7,
      reviews: 124,
      image: "/images/test12.jpg",
      originalPrice: 349.99,
      isNew: false,
      inStock: true,
      features: [
        "Real-time temperature monitoring",
        "Mobile alerts",
        "Cloud dashboard",
      ],
    },
    {
      id: 2,
      name: "Agricultural IoT Sensor Array",
      category: "Sensors",
      price: 199.99,
      rating: 4.5,
      reviews: 87,
      image: "/images/test12.jpg",
      isNew: true,
      inStock: true,
      features: [
        "Multi-parameter sensing",
        "Long-range wireless",
        "Weather resistant",
      ],
    },
    {
      id: 3,
      name: "Farm Environment Controller",
      category: "Climate Control",
      price: 349.99,
      rating: 4.2,
      reviews: 56,
      image: "/images/test12.jpg",
      originalPrice: 389.99,
      isNew: false,
      inStock: true,
      features: [
        "Smart temperature control",
        "Humidity optimization",
        "Energy efficient",
      ],
    },
    {
      id: 4,
      name: "Wireless Crop Monitor",
      category: "Monitoring",
      price: 149.99,
      rating: 4.3,
      reviews: 92,
      image: "/images/test12.jpg",
      isNew: false,
      inStock: false,
      features: [
        "Soil moisture tracking",
        "Nutrient analysis",
        "Solar powered",
      ],
    },
    {
      id: 5,
      name: "Smart Farm Data Logger",
      category: "Data Collection",
      price: 249.99,
      rating: 4.6,
      reviews: 78,
      image: "/images/test12.jpg",
      originalPrice: 299.99,
      isNew: true,
      inStock: true,
      features: [
        "High-capacity storage",
        "Multiple sensor inputs",
        "USB and wireless transfer",
      ],
    },
    {
      id: 6,
      name: "Agricultural Weather Station",
      category: "Smart Farming",
      price: 399.99,
      rating: 4.8,
      reviews: 105,
      image: "/images/test12.jpg",
      isNew: false,
      inStock: true,
      features: [
        "Comprehensive weather data",
        "Forecasting algorithms",
        "Farm-wide coverage",
      ],
    },
    {
      id: 7,
      name: "Soil Quality Analyzer",
      category: "Sensors",
      price: 179.99,
      rating: 4.4,
      reviews: 63,
      image: "/images/test12.jpg",
      isNew: false,
      inStock: true,
      features: [
        "pH and nutrient testing",
        "Instant readouts",
        "Mobile compatibility",
      ],
    },
    {
      id: 8,
      name: "Precision Irrigation Controller",
      category: "Climate Control",
      price: 229.99,
      rating: 4.5,
      reviews: 72,
      image: "/images/test12.jpg",
      originalPrice: 239.99,
      isNew: true,
      inStock: true,
      features: [
        "Water conservation",
        "Schedule automation",
        "Zone-based control",
      ],
    },
  ];

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <Star className="absolute h-4 w-4 text-gray-300" />
            <div className="absolute overflow-hidden w-1/2">
              <Star className="h-4 w-4 text-amber-400 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="mx-auto py-8 font-poppins mt-[10rem]">
      {/* Header */}
      <div className="flex flex-col laptop-lg:flex-row justify-between items-start laptop-lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Agricultural Products
          </h1>
          <p className="text-gray-600">
            Discover cutting-edge solutions for modern farming
          </p>
        </div>

        {/* Search */}
        <div className="mt-4 laptop-lg:mt-0 w-full laptop-lg:w-80 flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-100 outline-0 rounded-lg focus:ring-1/2 focus:ring-amber-300 focus:border-amber-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filter Toggle Button for Mobile - Only visible on small screens */}
      <div className="laptop-lg:hidden mb-4">
        <button
          onClick={toggleFilterVisibility}
          className="w-full flex items-center justify-center bg-amber-500 text-white py-3 rounded-lg font-medium shadow-sm hover:bg-amber-600 transition"
        >
          <Filter className="h-5 w-5 mr-2" />
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col laptop-lg:flex-row gap-8">
        {/* Sidebar Filters - Hidden on small screens by default */}
        <div
          className={`w-full laptop-lg:w-64 flex-shrink-0 ${
            isFilterVisible ? "block" : "hidden laptop-lg:block"
          }`}
        >
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg flex items-center">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                Filters
              </h2>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-amber-500 hover:text-amber-600"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-2">Active filters:</p>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <span
                      key={filter}
                      className="inline-flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm"
                    >
                      {filter}
                      <button onClick={() => toggleFilter(filter)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.name}`}
                      checked={activeFilters.includes(category.name)}
                      onChange={() => toggleFilter(category.name)}
                      className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                    />
                    <label
                      htmlFor={`category-${category.name}`}
                      className="ml-2 text-sm text-gray-700 flex-1"
                    >
                      {category.name}
                    </label>
                    <span className="text-xs text-gray-500">
                      ({category.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`price-${range.value}`}
                      className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                    />
                    <label
                      htmlFor={`price-${range.value}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {range.range}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="ml-2 text-sm text-gray-700 flex items-center"
                    >
                      <div className="flex mr-1">
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-amber-400 fill-current"
                            />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                      </div>
                      & Up
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Help Box */}
          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-5">
            <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our team of experts is here to help you find the perfect solution
              for your farm.
            </p>
            <button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-medium py-2 rounded-lg border border-emerald-200 transition">
              Contact Support
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sorting and View Controls */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-col tablet-lg:flex-row justify-between items-start tablet-lg:items-center">
            <div className="flex items-center mb-4 tablet-lg:mb-0">
              <SlidersHorizontal className="h-5 w-5 text-gray-500 mr-2" />
              {/* <span className="text-sm text-gray-700 mr-3">Sort by:</span> */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-300"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* <span className="text-sm text-gray-700">View:</span> */}
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md ${
                  viewMode === "grid"
                    ? "bg-amber-100 text-amber-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="Grid view"
              >
                <GridIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md ${
                  viewMode === "list"
                    ? "bg-amber-100 text-amber-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-500 ml-3">
                Showing <strong>8</strong> of <strong>36</strong> products
              </span>
            </div>
          </div>

          {/* Product Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 tablet-lg:grid-cols-2 laptop-lg:grid-cols-3 desktop-lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 transition group cursor-pointer"
                >
                  <div className="relative h-80 laptop-lg:h-40 desktop-lg:h-70 wide:h-80">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />

                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        NEW
                      </div>
                    )}

                    <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      {!product.inStock && (
                        <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {renderRatingStars(product.rating)}
                      </div>
                      <span className="text-xs text-gray-600 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">
                          &#8358;{product.price.toFixed(2)}
                        </p>
                      </div>

                      <button className="flex items-center justify-center text-sm bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden transition group cursor-pointer border border-gray-100"
                >
                  <div className="flex flex-col tablet-lg:flex-row">
                    <div className="relative h-56 tablet-lg:h-auto tablet-lg:w-48 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />

                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          NEW
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                        {!product.inStock && (
                          <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {renderRatingStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-600 ml-2">
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      <ul className="mb-4 flex-1">
                        {product.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-600 mb-1"
                          >
                            <Check className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
                            <Heart className="h-5 w-5 text-gray-500" />
                          </button>
                          <button
                            className={`flex items-center justify-center text-sm rounded-lg px-4 py-2 transition ${
                              product.inStock
                                ? "bg-amber-500 hover:bg-amber-600 text-white"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button className="px-2 py-2 rounded-md border border-gray-100 bg-white text-gray-500 hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === page
                      ? "bg-amber-500 text-white font-medium"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button className="px-2 py-2 rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="py-[4rem]">
        <Footer />
      </div>
    </div>
  );
};

export default ProductListingPage;
