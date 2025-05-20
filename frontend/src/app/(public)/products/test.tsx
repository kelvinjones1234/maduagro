// "use client";

// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";

// import Image from "next/image";
// import {
//   Search,
//   Filter,
//   Star,
//   ChevronDown,
//   ShoppingCart,
//   SlidersHorizontal,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Footer from "../components/Footer";

// const ProductListingPage = () => {
//   // State management
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeFilters, setActiveFilters] = useState([]);
//   const [activePriceRanges, setActivePriceRanges] = useState([]);
//   const [activeRatings, setActiveRatings] = useState([]);
//   const [sortBy, setSortBy] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [hoveredProductId, setHoveredProductId] = useState(null);

//   const productsPerPage = 30;

//   const { addToCart, removeFromCart, cart, toggleCart } = useCart();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/categories/");
//         const data = await res.json();
//         setCategories(data.results || data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const params = new URLSearchParams();
//         params.append("page", currentPage);
//         params.append("page_size", productsPerPage);

//         if (searchQuery) {
//           params.append("search", searchQuery);
//         }

//         if (activeFilters.length > 0) {
//           activeFilters.forEach((category) => {
//             const categoryObj = categories.find(
//               (cat) => cat.category_name === category
//             );
//             if (categoryObj) {
//               params.append("category", categoryObj.category_slug);
//             }
//           });
//         }

//         if (activePriceRanges.length > 0) {
//           activePriceRanges.forEach((range) => {
//             const [min, max] = range.split("-");
//             params.append("price_min", min);
//             params.append("price_max", max);
//           });
//         }

//         if (activeRatings.length > 0) {
//           const minRating = Math.min(...activeRatings);
//           params.append("rating", minRating);
//         }

//         params.append("sort_by", sortBy);

//         const res = await fetch(
//           `http://127.0.0.1:8000/api/products/?${params.toString()}`
//         );
//         const data = await res.json();
//         setFilteredProducts(data.results || []);
//         setTotalProducts(data.count || 0);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setFilteredProducts([]);
//         setTotalProducts(0);
//       }
//     };

//     fetchProducts();
//   }, [
//     currentPage,
//     searchQuery,
//     activeFilters,
//     activePriceRanges,
//     activeRatings,
//     sortBy,
//     categories,
//   ]);

//   const priceRanges = [
//     { range: "Under ₦100", value: "0-100" },
//     { range: "₦100 - ₦200", value: "100-200" },
//     { range: "₦200 - ₦300", value: "200-300" },
//     { range: "₦300 - ₦500", value: "300-500" },
//     { range: "Over ₦500", value: "500-9999" },
//   ];

//   const ratings = [5, 4, 3, 2, 1];

//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const toggleCategoryFilter = (category) => {
//     setCurrentPage(1);
//     if (activeFilters.includes(category)) {
//       setActiveFilters(activeFilters.filter((f) => f !== category));
//     } else {
//       setActiveFilters([...activeFilters, category]);
//     }
//   };

//   const togglePriceRangeFilter = (range) => {
//     setCurrentPage(1);
//     if (activePriceRanges.includes(range)) {
//       setActivePriceRanges(activePriceRanges.filter((r) => r !== range));
//     } else {
//       setActivePriceRanges([...activePriceRanges, range]);
//     }
//   };

//   const toggleRatingFilter = (rating) => {
//     setCurrentPage(1);
//     if (activeRatings.includes(rating)) {
//       setActiveRatings(activeRatings.filter((r) => r !== rating));
//     } else {
//       setActiveRatings([...activeRatings, rating]);
//     }
//   };

//   const clearFilters = () => {
//     setActiveFilters([]);
//     setActivePriceRanges([]);
//     setActiveRatings([]);
//     setSearchQuery("");
//     setCurrentPage(1);
//     setSortBy("newest");
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const renderRatingStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating - fullStars >= 0.5;
//     const stars = [];

//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(
//           <Star key={i} className="h-3 w-3 text-amber-400 fill-current" />
//         );
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-4 w-4">
//             <Star className="absolute h-4 w-4 text-gray-300" />
//             <div className="absolute overflow-hidden w-1/2">
//               <Star className="h-3 w-3 text-amber-400 fill-current" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
//       }
//     }
//     return stars;
//   };

//   const renderPagination = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return (
//       <div className="mt-8 flex justify-center">
//         <nav className="flex items-center space-x-1">
//           <button
//             className={`px-2 py-2 rounded-md border border-gray-100 ${
//               currentPage === 1
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-white text-gray-500 hover:bg-gray-50"
//             }`}
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>

//           {pages.map((page) => (
//             <button
//               key={page}
//               className={`px-4 py-2 rounded-md ${
//                 currentPage === page
//                   ? "bg-amber-500 text-white font-medium"
//                   : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//               onClick={() => handlePageChange(page)}
//             >
//               {page}
//             </button>
//           ))}

//           <button
//             className={`px-2 py-2 rounded-md border border-gray-200 ${
//               currentPage === totalPages
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-white text-gray-500 hover:bg-gray-50"
//             }`}
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         </nav>
//       </div>
//     );
//   };

//   const allActiveFilters = [
//     ...activeFilters,
//     ...activePriceRanges.map((range) => {
//       const rangeObj = priceRanges.find((p) => p.value === range);
//       return rangeObj ? rangeObj.range : range;
//     }),
//     ...activeRatings.map((rating) => `${rating}+ Stars`),
//   ];

//   return (
//     <div className="mx-auto py-8 font-poppins mt-[7rem] text-[clamp(.75rem,1.2vw,.9rem)]">
//       <div className="flex flex-col laptop-lg:flex-row justify-between items-start laptop-lg:items-center mb-8">
//         <div>
//           <h1 className="font-bold text-gray-900 mb-2 text-[1.3rem]">
//             Agricultural Products
//           </h1>
//           <p className="text-gray-600">
//             Discover cutting-edge solutions for modern farming
//           </p>
//         </div>

//         <div className="mt-4 laptop-lg:mt-0 w-full laptop-lg:w-80 flex items-center">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full pl-10 pr-4 py-2 border border-gray-100 outline-0 rounded-lg focus:ring-1/2 focus:ring-amber-300 focus:border-amber-500 outline-none"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="laptop-lg:hidden mb-4">
//         <button
//           onClick={toggleFilterVisibility}
//           className="w-full flex items-center justify-center bg-amber-500 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-amber-600 transition"
//         >
//           <Filter className="h-4 w-4 mr-2" />
//           {isFilterVisible ? "Hide Filters" : "Show Filters"}
//         </button>
//       </div>

//       <div className="flex flex-col laptop-lg:flex-row gap-8">
//         <div
//           className={`w-full laptop-lg:w-64 flex-shrink-0 ${
//             isFilterVisible ? "block" : "hidden laptop-lg:block"
//           }`}
//         >
//           <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold flex items-center">
//                 <Filter className="h-5 w-5 mr-2 text-gray-500" />
//                 Filters
//               </h2>
//               {(activeFilters.length > 0 ||
//                 activePriceRanges.length > 0 ||
//                 activeRatings.length > 0) && (
//                 <button
//                   onClick={clearFilters}
//                   className="text-amber-500 hover:text-amber-600"
//                 >
//                   Clear all
//                 </button>
//               )}
//             </div>

//             {allActiveFilters.length > 0 && (
//               <div className="mb-5">
//                 <p className="text-gray-500 mb-2">Active filters:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {allActiveFilters.map((filter) => (
//                     <span
//                       key={filter}
//                       className="inline-flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md"
//                     >
//                       {filter}
//                       <button
//                         onClick={() => {
//                           if (activeFilters.includes(filter)) {
//                             toggleCategoryFilter(filter);
//                           } else if (filter.includes("Stars")) {
//                             const rating = parseInt(filter);
//                             toggleRatingFilter(rating);
//                           } else {
//                             const rangeValue = priceRanges.find(
//                               (p) => p.range === filter
//                             )?.value;
//                             if (rangeValue) togglePriceRangeFilter(rangeValue);
//                           }
//                         }}
//                       >
//                         <X className="h-3 w-3 ml-1" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mb-6">
//               <h3 className="font-medium text-gray-900 mb-3">Category</h3>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <div
//                     key={category.category_name}
//                     className="flex items-center"
//                   >
//                     <input
//                       type="checkbox"
//                       id={`category-${category.category_name}`}
//                       checked={activeFilters.includes(category.category_name)}
//                       onChange={() =>
//                         toggleCategoryFilter(category.category_name)
//                       }
//                       className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
//                     />
//                     <label
//                       htmlFor={`category-${category.category_name}`}
//                       className="ml-2 text-gray-700 flex-1"
//                     >
//                       {category.category_name}
//                     </label>
//                     <span className="text-gray-500">
//                       ({category.product_count})
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
//               <div className="space-y-2">
//                 {priceRanges.map((range) => (
//                   <div key={range.value} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`price-${range.value}`}
//                       checked={activePriceRanges.includes(range.value)}
//                       onChange={() => togglePriceRangeFilter(range.value)}
//                       className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
//                     />
//                     <label
//                       htmlFor={`price-${range.value}`}
//                       className="ml-2 text-gray-700"
//                     >
//                       {range.range}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
//               <div className="space-y-2">
//                 {ratings.map((rating) => (
//                   <div key={rating} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`rating-${rating}`}
//                       checked={activeRatings.includes(rating)}
//                       onChange={() => toggleRatingFilter(rating)}
//                       className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
//                     />
//                     <label
//                       htmlFor={`rating-${rating}`}
//                       className="ml-2 text-gray-700 flex items-center"
//                     >
//                       <div className="flex mr-1">
//                         {Array(rating)
//                           .fill(0)
//                           .map((_, i) => (
//                             <Star
//                               key={i}
//                               className="h-4 w-4 text-amber-400 fill-current"
//                             />
//                           ))}
//                         {Array(5 - rating)
//                           .fill(0)
//                           .map((_, i) => (
//                             <Star key={i} className="h-4 w-4 text-gray-300" />
//                           ))}
//                       </div>
//                       & Up
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-5">
//             <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
//             <p className="text-gray-600 mb-4">
//               Our team of experts is here to help you find the perfect solution
//               for your farm.
//             </p>
//             <button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-medium py-2 rounded-lg border border-emerald-200 transition">
//               Contact Support
//             </button>
//           </div>
//         </div>

//         <div className="flex-1">
//           <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-col tablet-lg:flex-row justify-between items-start tablet-lg:items-center">
//             <div className="flex items-center mb-4 tablet-lg:mb-0">
//               <SlidersHorizontal className="h-4 w-4 text-gray-500 mr-2" />
//               <span className="text-gray-700">Sort by:</span>
//               <div className="relative ml-2">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => {
//                     setSortBy(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-300"
//                 >
//                   <option value="popularity">Popularity</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                   <option value="rating">Highest Rated</option>
//                 </select>
//                 <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-3">
//               <span className="text-gray-500">
//                 Showing <strong>{filteredProducts.length}</strong> of{" "}
//                 <strong>{totalProducts}</strong> products
//               </span>
//             </div>
//           </div>

//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 tablet-sm:grid-cols-3 laptop-lg:grid-cols-3 tablet-lg:grid-cols-3 desktop-lg:grid-cols-4 wide:grid-cols-5 gap-4">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className={`bg-white rounded-lg overflow-hidden border border-gray-100 transition group hover:shadow-md ${
//                     product.available ? "cursor-pointer" : "opacity-90"
//                   }`}
//                   aria-disabled={!product.available}
//                 >
//                   <div className="relative aspect-square overflow-hidden">
//                     <Image
//                       src={product.image || "/placeholder.jpg"}
//                       alt={product.product_name}
//                       layout="fill"
//                       objectFit="cover"
//                       className="group-hover:scale-105 transition-transform duration-500"
//                     />

//                     {!product.available && (
//                       <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
//                         <span className="bg-red-600 text-white font-bold text-[.7rem] px-3 py-1 rounded-full shadow-lg">
//                           OUT OF STOCK
//                         </span>
//                       </div>
//                     )}

//                     {product.available && (
//                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={toggleCart}
//                           className="bg-white bg-opacity-90 p-2 rounded-full cursor-pointer shadow-md hover:bg-amber-500 hover:text-white transition-colors"
//                           aria-label="Quick add to cart"
//                         >
//                           <ShoppingCart className="h-4 w-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-xs font-medium text-emerald-600 py-0.5 rounded-full">
//                         {product.product_category.category_name}
//                       </span>

//                       <div className="tablet-lg:flex items-center hidden">
//                         <div className="flex">
//                           {renderRatingStars(product.average_rating || 0)}
//                         </div>
//                         <span className="text-xs text-gray-500 ml-1">
//                           ({product.review_count || 0})
//                         </span>
//                       </div>
//                     </div>

//                     <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">
//                       {product.product_name} and some beans
//                     </h3>

//                     <div className="grid justify-between items-center">
//                       <p className="text-gray-900 font-bold">
//                         ₦{Number(product.product_price).toLocaleString()}
//                       </p>

//                       <div className="relative group pt-[1rem]">
//                         <div
//                           className="flex items-center gap-1 cursor-pointer"
//                           onMouseEnter={() => setHoveredProductId(product.id)}
//                           onMouseLeave={() => setHoveredProductId(null)}
//                         >
//                           <div className="h-4 w-4 rounded-full bg-amber-400 flex items-center justify-center text-black text-[.6rem]">
//                             {product.seller_profile?.nickname
//                               ?.charAt(0)
//                               .toUpperCase() || "?"}
//                           </div>
//                           <span className="text-xs text-gray-600 hover:underline">
//                             {product.seller_profile?.nickname || "Unknown"}
//                           </span>
//                         </div>

//                         {hoveredProductId === product.id && (
//                           <div className="absolute bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10">
//                             <p className="font-medium text-gray-900 mb-1">
//                               Seller Profile
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               {product.seller_profile?.full_name ||
//                                 "No name available"}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="tablet-lg:mt-10">
//                       <div className="flex tablet-lg:hidden mb-8 mt-2 tablet-lg:mb-4">
//                         {renderRatingStars(product.average_rating || 0)}
//                       </div>
//                       {cart.find((i) => i.id === product.id) ? (
//                         <div className="flex items-center justify-between bg-gray-50 rounded-lg cursor-default">
//                           <button
//                             className="w-8 h-8 flex items-center justify-center cursor-pointer bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               removeFromCart(product.id);
//                             }}
//                           >
//                             -
//                           </button>

//                           <span className="font-medium text-gray-700">
//                             {cart.find((i) => i.id === product.id)?.quantity}
//                           </span>

//                           <button
//                             className="w-8 h-8 flex items-center justify-center cursor-pointer bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               addToCart({
//                                 id: product.id,
//                                 name: product.product_name,
//                                 price: product.product_price,
//                                 image: product.image,
//                               });
//                             }}
//                           >
//                             +
//                           </button>
//                         </div>
//                       ) : (
//                         <div>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               addToCart({
//                                 id: product.id,
//                                 name: product.product_name,
//                                 price: product.product_price,
//                                 image: product.image,
//                               });
//                             }}
//                             className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
//                               product.available
//                                 ? "bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
//                                 : "bg-gray-200 text-gray-400 cursor-default"
//                             }`}
//                             disabled={!product.available}
//                           >
//                             <ShoppingCart className="h-4 w-4" />
//                             <span className="font-medium">
//                               {product.available ? "Add to Cart" : "Sold Out"}
//                             </span>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
//               <div className="flex flex-col items-center justify-center py-8">
//                 <Search className="h-12 w-12 text-gray-300 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   We couldn't find any products matching your current filters.
//                 </p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             </div>
//           )}

//           {totalProducts > productsPerPage && renderPagination()}
//         </div>
//       </div>
//       <div className="py-[4rem]">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default ProductListingPage;
