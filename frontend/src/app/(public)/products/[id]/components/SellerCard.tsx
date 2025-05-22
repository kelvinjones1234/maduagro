import { useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  MessageCircle,
  Verified,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

interface Seller {
  full_name?: string;
  nickname?: string;
  profile_picture?: string;
  is_verified?: boolean;
  bio?: string;
}

interface RatingStarsProps {
  rating: number;
}

// RatingStars Component (Reusable)
const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            i < rating ? "text-emerald-500 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface SellerCardProps {
  seller: Seller;
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  const [expanded, setExpanded] = useState(false);

  // Default placeholder if image is missing
  const profileImage = seller.profile_picture || "/images/test5.png";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 shadow-sm">
      <h2 className="font-semibold text-gray-900 mb-4 text-lg">
        Seller Information
      </h2>

      <div className="flex items-center mb-4">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0">
          <Image
            src={profileImage}
            alt={seller.full_name || seller.nickname || "Seller"}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="ml-3 sm:ml-4 overflow-hidden">
          <div className="flex items-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {seller.full_name || seller.nickname}
            </h3>
            {seller.is_verified && (
              <Verified
                className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 ml-2 flex-shrink-0"
                aria-label="Verified seller"
              />
            )}
          </div>

          <div className="flex items-center mt-1">
            <RatingStars rating={4.8} />{" "}
            {/* Use a default rating if not provided */}
            <span className="ml-2 text-xs sm:text-sm text-gray-600 truncate">
              4.8 (120 reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm sm:text-base text-gray-600">
        <div className="flex items-center">
          <MapPin
            className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 text-gray-500"
            aria-hidden="true"
          />
          <span className="truncate">Lagos, Nigeria</span>
        </div>

        <div className="flex items-center">
          <Calendar
            className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 text-gray-500"
            aria-hidden="true"
          />
          <span>Joined January 2023</span>
        </div>

        <div className="flex items-center">
          <Users
            className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 text-gray-500"
            aria-hidden="true"
          />
          <span>24 products listed</span>
        </div>

        <div className="flex items-center">
          <MessageCircle
            className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 text-gray-500"
            aria-hidden="true"
          />
          <span>Responds within 2 hours</span>
        </div>
      </div>

      <div className="mt-4">
        <p
          className={`text-gray-600 text-sm sm:text-base ${
            !expanded && "line-clamp-3"
          }`}
        >
          {seller.bio ||
            "Passionate vendor specializing in quality products. Committed to excellent customer service and fast shipping. Feel free to reach out with any questions!"}
        </p>

        {seller.bio && seller.bio.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-emerald-600 text-sm font-medium flex items-center mt-1 hover:text-emerald-700"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
          Certifications
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
            Verified Seller
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
            Top Rated
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
          aria-label="Contact Seller"
        >
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Chat with Seller
        </button>

        <button
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
          aria-label="View Seller Profile"
        >
          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          View Sellers Catalog
        </button>
      </div>
    </div>
  );
};
