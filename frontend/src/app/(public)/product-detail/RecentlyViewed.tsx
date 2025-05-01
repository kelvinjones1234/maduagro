import React from "react";
import Image from "next/image";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";

const RecentlyViewed = () => {
  const recentProducts = [
    {
      id: 1,
      name: "Digital Food Storage Monitor",
      category: "Monitoring",
      price: 299.99,
      timeViewed: "2 hours ago",
      image: "/images/test12.jpg",
    },
    {
      id: 2,
      name: "Temperature Control System",
      category: "Climate Control",
      price: 189.99,
      timeViewed: "Yesterday",
      image: "/images/test12.jpg",
    },
    {
      id: 3,
      name: "Agricultural Data Logger",
      category: "Data Collection",
      price: 99.99,
      timeViewed: "2 days ago",
      image: "/images/test12.jpg",
    },
    {
      id: 4,
      name: "Wireless Sensor Network Kit",
      category: "Sensors",
      price: 249.99,
      timeViewed: "Last week",
      image: "/images/test12.jpg",
    },
  ];

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Recently Viewed</h2>
        </div>
        <a
          href="#"
          className="flex items-center text-sm text-amber-500 hover:text-amber-600 font-medium transition"
        >
          View History
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 laptop-lg:grid-cols-2 desktop-lg:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group cursor-pointer border border-gray-50"
          >
            <div className="relative h-60">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-0 left-0 bg-black/60 text-white text-xs py-1 px-2 rounded-br-lg">
                {product.timeViewed}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-semibold line-clamp-1 flex-1 pr-2">
                  {product.name}
                </h3>
                <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-xs text-gray-500 mb-2">{product.category}</p>

              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-gray-900">
                  &#8358;{product.price.toFixed(2)}
                </p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  Viewed
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="text-sm text-gray-600 hover:text-amber-500 transition flex items-center">
          Clear recently viewed products
        </button>
      </div>
    </div>
  );
};

export default RecentlyViewed;
