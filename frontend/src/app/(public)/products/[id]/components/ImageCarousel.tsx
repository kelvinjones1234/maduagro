"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageCarouselProps = {
  thumbnails: string[];
  productName: string;
};

export default function ImageCarousel({
  thumbnails,
  productName,
}: ImageCarouselProps) {
  const [activeImage, setActiveImage] = useState(0);

  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % thumbnails.length);
  };

  const handlePrevImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + thumbnails.length) % thumbnails.length
    );
  };

  return (
    <div>
      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
        <Image
          src={thumbnails[activeImage]}
          alt={productName}
          layout="fill"
          objectFit="cover"
          className="rounded-xl transition-all duration-300 hover:scale-105"
        />
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
                alt={`${productName} thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
