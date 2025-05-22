// import React from "react";
// import Image from "next/image";
// import { Star } from "lucide-react";

// const renderRatingStars = (rating: number) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     stars.push(
//       <Star
//         key={i}
//         className={`h-5 w-5 ${
//           i <= rating ? "text-amber-400 fill-current" : "text-gray-300"
//         }`}
//       />
//     );
//   }
//   return stars;
// };

// const RelatedProduct = () => {
//   return (
//     <div className="mb-16">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">
//         Related Products
//       </h2>
//       <div className="grid grid-cols-1 mobile-lg:grid-cols-2 desktop-lg:grid-cols-4 gap-6">
//         {[1, 2, 3, 4].map((item) => (
//           <div
//             key={item}
//             className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
//           >
//             <div className="relative h-48">
//               <Image
//                 src={`/images/test12.jpg?text=Product ${item}`}
//                 alt={`Related product ${item}`}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Agricultural IoT Device
//               </h3>
//               <div className="flex items-center mt-2">
//                 <div className="flex">{renderRatingStars(4)}</div>
//                 <span className="text-xs text-gray-600 ml-2">(42)</span>
//               </div>
//               <p className="text-gray-600 text-sm mt-2 leading-relaxed">
//                 Smart monitoring for agricultural applications
//               </p>
//               <div className="mt-4 flex justify-between items-center">
//                 <p className="font-bold text-gray-900">&#8358;199.99</p>
//                 <button className="text-sm bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg hover:bg-emerald-200 transition">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProduct;

import React from "react";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";

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

const products = [
  {
    id: 1,
    name: "Agricultural IoT Device",
    description: "Smart monitoring for agricultural applications",
    price: 199.99,
    rating: 4.2,
    reviews: 42,
    image: "/images/test12.jpg",
    discountPercent: 15,
    originalPrice: 235.99,
    category: "Monitoring",
  },
  {
    id: 2,
    name: "Farm Sensor Pro",
    description: "Professional-grade sensor array for large farms",
    price: 349.99,
    rating: 4.7,
    reviews: 63,
    image: "/images/test12.jpg",
    discountPercent: 0,
    category: "Sensors",
  },
  {
    id: 3,
    name: "Crop Monitor Basic",
    description: "Essential monitoring tools for small farms",
    price: 149.99,
    rating: 3.8,
    reviews: 27,
    image: "/images/test12.jpg",
    discountPercent: 20,
    originalPrice: 189.99,
    category: "Monitoring",
  },
  {
    id: 4,
    name: "Smart Farm Hub",
    description: "Central control unit for all your farming sensors",
    price: 299.99,
    rating: 4.5,
    reviews: 38,
    image: "/images/test12.jpg",
    discountPercent: 0,
    category: "Control Systems",
  },
];

const RelatedProduct = () => {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <button className="text-amber-500 hover:text-amber-600 font-medium text-sm transition">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 mobile-lg:grid-cols-2 laptop-lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group cursor-pointer"
          >
            <div className="relative h-56">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />

              {product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {product.discountPercent}% OFF
                </div>
              )}

              <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4">
              <div className="flex items-center mb-1.5">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center mb-2">
                <div className="flex">{renderRatingStars(product.rating)}</div>
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
                  {product.discountPercent > 0 && (
                    <p className="text-xs text-gray-500 line-through">
                      &#8358;{product.originalPrice.toFixed(2)}
                    </p>
                  )}
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
    </div>
  );
};

export default RelatedProduct;
