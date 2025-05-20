import { Star } from "lucide-react";

export const renderRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star key={i} className="h-3 w-3 text-amber-400 fill-current" />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className="relative h-4 w-4">
          <Star className="absolute h-4 w-4 text-gray-300" />
          <div className="absolute overflow-hidden w-1/2">
            <Star className="h-3 w-3 text-amber-400 fill-current" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
    }
  }
  return stars;
};
