import React from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-emerald-500 fill-current"
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div
              key={i}
              className="relative h-4 w-4 tablet-sm:h-5 tablet-sm:w-5"
            >
              <Star className="absolute h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-gray-300" />
              <div className="absolute overflow-hidden w-1/2">
                <Star className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-emerald-500 fill-current" />
              </div>
            </div>
          );
        } else {
          return (
            <Star
              key={i}
              className="h-4 w-4 tablet-sm:h-5 tablet-sm:w-5 text-gray-300"
            />
          );
        }
      })}
    </div>
  );
};

export default RatingStars;
