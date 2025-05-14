"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer";

const ProductListingPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [activePriceRanges, setActivePriceRanges] = useState([]);
  const [activeRatings, setActiveRatings] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

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
      description:
        "Monitor food storage conditions with precision and receive real-time alerts to your mobile device.",
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
      description:
        "Comprehensive sensor array that monitors multiple environmental parameters across your farm.",
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
      description:
        "Control your farm's climate with precision for optimal growing conditions and energy efficiency.",
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
      description:
        "Solar-powered monitoring system that tracks soil moisture and nutrients wirelessly across your fields.",
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
      description:
        "Collect and store farm data with high-capacity storage and multiple sensor input capabilities.",
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
      description:
        "Advanced weather station with forecasting capabilities designed specifically for agricultural applications.",
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
      description:
        "Analyze soil pH and nutrient levels with instant readouts and mobile device compatibility.",
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
      description:
        "Conserve water and optimize irrigation with automated scheduling and zone-based controls.",
    },
    {
      id: 9,
      name: "Greenhouse Monitoring System",
      category: "Monitoring",
      price: 279.99,
      rating: 4.6,
      reviews: 58,
      image: "/images/test12.jpg",
      isNew: false,
      inStock: true,
      features: [
        "24/7 environmental tracking",
        "Automated alerts",
        "Historical data analysis",
      ],
      description:
        "Monitor greenhouse conditions around the clock with automated alerts and historical data tracking.",
    },
    {
      id: 10,
      name: "Field Nutrient Mapper",
      category: "Data Collection",
      price: 329.99,
      rating: 4.4,
      reviews: 41,
      image: "/images/test12.jpg",
      isNew: true,
      inStock: true,
      features: [
        "GPS integration",
        "Nutrient visualization",
        "Application planning",
      ],
      description:
        "Map field nutrients with GPS precision to optimize fertilizer application and crop rotation planning.",
    },
    {
      id: 11,
      name: "Smart Livestock Tracker",
      category: "Smart Farming",
      price: 189.99,
      rating: 4.3,
      reviews: 37,
      image: "/images/test12.jpg",
      isNew: false,
      inStock: true,
      features: [
        "Real-time location",
        "Health monitoring",
        "Long battery life",
      ],
      description:
        "Track livestock location and health with long-lasting battery power and real-time monitoring.",
    },
    {
      id: 12,
      name: "Advanced Moisture Sensor",
      category: "Sensors",
      price: 89.99,
      rating: 4.2,
      reviews: 94,
      image: "/images/test12.jpg",
      isNew: false,
      inStock: true,
      features: [
        "Deep soil penetration",
        "Multiple depth readings",
        "Wireless data transmission",
      ],
      description:
        "Measure soil moisture at multiple depths with wireless data transmission for comprehensive monitoring.",
    },
  ];

  // Apply filters and sorting to the products
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      result = result.filter((product) =>
        activeFilters.includes(product.category)
      );
    }

    // Apply price range filters
    if (activePriceRanges.length > 0) {
      result = result.filter((product) => {
        return activePriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        });
      });
    }

    // Apply rating filters
    if (activeRatings.length > 0) {
      const minRating = Math.min(...activeRatings);
      result = result.filter((product) => product.rating >= minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setTotalProducts(result.length);

    // Apply pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedResult = result.slice(
      startIndex,
      startIndex + productsPerPage
    );
    setFilteredProducts(paginatedResult);
  }, [
    searchQuery,
    activeFilters,
    activePriceRanges,
    activeRatings,
    sortBy,
    currentPage,
  ]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle category filter
  const toggleCategoryFilter = (category) => {
    setCurrentPage(1); // Reset to first page on filter change
    if (activeFilters.includes(category)) {
      setActiveFilters(activeFilters.filter((f) => f !== category));
    } else {
      setActiveFilters([...activeFilters, category]);
    }
  };

  // Toggle price range filter
  const togglePriceRangeFilter = (range) => {
    setCurrentPage(1); // Reset to first page on filter change
    if (activePriceRanges.includes(range)) {
      setActivePriceRanges(activePriceRanges.filter((r) => r !== range));
    } else {
      setActivePriceRanges([...activePriceRanges, range]);
    }
  };

  // Toggle rating filter
  const toggleRatingFilter = (rating) => {
    setCurrentPage(1); // Reset to first page on filter change
    if (activeRatings.includes(rating)) {
      setActiveRatings(activeRatings.filter((r) => r !== rating));
    } else {
      setActiveRatings([...activeRatings, rating]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setActivePriceRanges([]);
    setActiveRatings([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Render rating stars
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

  // Pagination controls
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-1">
          <button
            className={`px-2 py-2 rounded-md border border-gray-100 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-amber-500 text-white font-medium"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={`px-2 py-2 rounded-md border border-gray-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    );
  };

  // Calculate the current active filters for display
  const allActiveFilters = [
    ...activeFilters,
    ...activePriceRanges.map((range) => {
      const rangeObj = priceRanges.find((p) => p.value === range);
      return rangeObj ? rangeObj.range : range;
    }),
    ...activeRatings.map((rating) => `${rating}+ Stars`),
  ];

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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 outline-0 rounded-lg focus:ring-1/2 focus:ring-amber-300 focus:border-amber-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
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
              {(activeFilters.length > 0 ||
                activePriceRanges.length > 0 ||
                activeRatings.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-amber-500 hover:text-amber-600"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Active Filters */}
            {allActiveFilters.length > 0 && (
              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-2">Active filters:</p>
                <div className="flex flex-wrap gap-2">
                  {allActiveFilters.map((filter) => (
                    <span
                      key={filter}
                      className="inline-flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm"
                    >
                      {filter}
                      <button
                        onClick={() => {
                          // Handle removing the filter based on its type
                          if (activeFilters.includes(filter)) {
                            toggleCategoryFilter(filter);
                          } else if (filter.includes("Stars")) {
                            const rating = parseInt(filter);
                            toggleRatingFilter(rating);
                          } else {
                            // Must be a price range
                            const rangeValue = priceRanges.find(
                              (p) => p.range === filter
                            )?.value;
                            if (rangeValue) togglePriceRangeFilter(rangeValue);
                          }
                        }}
                      >
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
                      onChange={() => toggleCategoryFilter(category.name)}
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
                      checked={activePriceRanges.includes(range.value)}
                      onChange={() => togglePriceRangeFilter(range.value)}
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
                      checked={activeRatings.includes(rating)}
                      onChange={() => toggleRatingFilter(rating)}
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
              <span className="text-sm text-gray-700">Sort by:</span>
              <div className="relative ml-2">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
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
              <span className="text-sm text-gray-500">
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                <strong>{totalProducts}</strong> products
              </span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 tablet-lg:grid-cols-2 laptop-lg:grid-cols-3 desktop-lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 transition group cursor-pointer hover:shadow-md"
                >
                  <div className="relative h-80 laptop-lg:h-40 desktop-lg:h-60 wide:h-80">
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
                        {product.originalPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            &#8358;{product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>

                      <button
                        className={`flex items-center justify-center text-sm px-3 py-2 rounded-lg transition ${
                          product.inStock
                            ? "bg-amber-500 text-white hover:bg-amber-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span>{product.inStock ? "Add" : "Sold Out"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalProducts > productsPerPage && renderPagination()}
        </div>
      </div>
      <div className="py-[4rem]">
        <Footer />
      </div>
    </div>
  );
};

export default ProductListingPage;
