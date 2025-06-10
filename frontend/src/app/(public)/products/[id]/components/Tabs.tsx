"use client";

import { useState, JSX } from "react";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import RatingStars from "./RatingStars";

type TabsProps = {
  product: {
    description: string;
    key_information: string;
    rating: number;
    reviews: number;
    comments: {
      id: number;
      user: string;
      avatar: string;
      rating: number;
      date: string;
      content: string;
    }[];
  };
};

const TabButton = ({
  name,
  active,
  onClick,
  count,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
  count?: number | null;
}) => (
  <button
    onClick={onClick}
    className={`${
      active
        ? "border-emerald-500 text-emerald-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    } py-2 tablet-sm:py-4 px-1 border-b-2 font-medium tablet-sm:font-semibold text-sm tablet-sm:text-base capitalize transition whitespace-nowrap`}
    aria-selected={active}
    role="tab"
  >
    {name === "reviews" && count ? `Reviews (${count})` : name}
  </button>
);

export default function Tabs({ product }: TabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const TabContent: Record<"description" | "reviews", JSX.Element> = {
    description: (
      <div className="text-sm tablet-sm:text-base">
        <h2 className="font-semibold text-gray-900 mb-3 tablet-sm:mb-4">
          Product Description
        </h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        {product.key_information && (
          <>
            <h3 className="font-semibold text-gray-900 mt-4 tablet-sm:mt-6 mb-2">
              Key Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.key_information}
            </p>
          </>
        )}
      </div>
    ),
    reviews: (
      <div className="px-0 tablet-sm:px-2 text-sm tablet-sm:text-base">
        <h2 className="font-semibold text-gray-900 mb-3 tablet-sm:mb-4">
          Customer Reviews
        </h2>
        <div className="bg-gray-50 rounded-xl mb-4 tablet-sm:mb-6 p-3 tablet-sm:p-4">
          <div className="flex items-center gap-3 tablet-sm:gap-6">
            <div className="text-2xl tablet-sm:text-4xl font-bold text-gray-900">
              {product.rating}
            </div>
            <div>
              <div className="flex mb-1 tablet-sm:mb-2">
                <RatingStars rating={product.rating} />
              </div>
              <p className="text-xs tablet-sm:text-sm text-gray-600">
                Based on {product.reviews} reviews
              </p>
            </div>
          </div>
        </div>
        {product.comments.length === 0 ? (
          <p className="text-gray-600">No reviews available yet.</p>
        ) : (
          <div className="space-y-4 tablet-sm:space-y-6">
            {product.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 pb-4 tablet-sm:pb-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Image
                      src={comment.avatar}
                      alt={`${comment.user}'s avatar`}
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8 tablet-sm:w-10 tablet-sm:h-10"
                    />
                    <div className="ml-3 tablet-sm:ml-4">
                      <h3 className="font-semibold text-gray-900 text-sm tablet-sm:text-base">
                        {comment.user}
                      </h3>
                      <div className="flex items-center mt-1">
                        <RatingStars rating={comment.rating} />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs tablet-sm:text-sm text-gray-600">
                    {comment.date}
                  </span>
                </div>
                <p className="mt-2 tablet-sm:mt-3 text-gray-600 leading-relaxed">
                  {comment.content}
                </p>
                <button
                  className="mt-2 tablet-sm:mt-3 flex items-center text-gray-600 hover:text-gray-800 transition text-sm"
                  aria-label={`Reply to ${comment.user}`}
                >
                  <MessageCircle
                    className="h-3 w-3 tablet-sm:h-4 tablet-sm:w-4 mr-1"
                    aria-hidden="true"
                  />
                  Reply
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="mt-4 tablet-sm:mt-6 text-emerald-600 hover:text-emerald-700 font-medium tablet-sm:font-semibold text-sm tablet-sm:text-base"
          aria-label="Load More Reviews"
        >
          Load More Reviews
        </button>
      </div>
    ),
  };

  return (
    <div className="bg-white overflow-hidden flex-1/2">
      <div className="border-b border-gray-200">
        <nav
          className="flex"
          aria-label="Product information tabs"
          role="tablist"
        >
          {["description", "reviews"].map((tab) => (
            <TabButton
              key={tab}
              name={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab as "description" | "reviews")}
              count={tab === "reviews" ? product.reviews : null}
            />
          ))}
        </nav>
      </div>
      <div
        className="py-4"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {TabContent[activeTab]}
      </div>
    </div>
  );
}
