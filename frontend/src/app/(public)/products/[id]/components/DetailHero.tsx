import { Eye, Check } from "lucide-react";
import { SellerCard } from "./SellerCard";
import ImageCarousel from "./ImageCarousel";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import Tabs from "./Tabs";
import RatingStars from "./RatingStars";

type DetailHeroProps = {
  product: Product;
  seller: Seller;
};

export default async function DetailHero({ product, seller }: DetailHeroProps) {
  // Map API data to expected structure (can be done server-side)
  const productData = {
    id: product?.id || 1,
    name: product?.product_name || "Premium Product",
    category: product?.product_category?.category_name || "Category",
    description:
      product?.product_description ||
      "This is a premium product with high quality materials.",
    key_information:
      product?.key_information ||
      "Made with eco-friendly materials, suitable for all ages.",
    rating: product?.average_rating || 4.5,
    reviews: product?.rating_count || 120,
    price: parseFloat(product?.product_price || "299.99"),
    image: product?.image || "/placeholder.jpg",
    available: product?.available !== false,
    comments: product?.comments || [],
    views: product?.views || 1500,
  };

  const sellerData = {
    id: seller?.id || 1,
    full_name: seller?.full_name || "John Doe",
    nickname: seller?.nickname || "JD Store",
    phone: seller?.phone || "+234 123 456 7890",
    profile_picture: seller?.profile_picture || "/profile.jpg",
    bio:
      seller?.bio ||
      "Professional seller with years of experience in quality products.",
    is_verified: seller?.is_verified !== false,
  };

  // Create thumbnails array
  const thumbnails = product?.image
    ? [product.image, product.image, product.image]
    : ["/placeholder1.jpg", "/placeholder2.jpg", "/placeholder3.jpg"];

  return (
    <div className="mx-auto py-8">
      <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column: Image Carousel */}
        <ImageCarousel thumbnails={thumbnails} productName={productData.name} />

        {/* Right Column: Product Details */}
        <div>
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center">
                <span className="text-emerald-800 text-xs font-medium rounded-full">
                  {productData.category}
                </span>
                {productData.available && (
                  <span className="ml-2 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="font-bold text-gray-900 text-[clamp(1rem,8vw,1.5rem)] mt-2">
                {productData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center">
                  <RatingStars rating={productData.rating} />
                  <span className="ml-2 text-sm text-gray-600">
                    <span className="font-medium">{productData.rating}</span> (
                    {productData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{productData.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline">
                <p className="font-bold text-gray-900 text-[clamp(.8rem,8vw,1.3rem)]">
                  ₦{productData.price.toFixed(2)}
                </p>
                <p className="ml-2 text-emerald-600 text-sm font-medium flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Free shipping on orders over ₦500
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <QuantitySelector product={productData} />

            {/* Action Buttons */}
            <ActionButtons product={productData} />
          </div>
        </div>
      </div>

      {/* Details and Seller Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex">
          <Tabs product={productData} />
          <div className="mt-8 hidden laptop-sm:flex pt flex-1/2">
            <SellerCard seller={sellerData} />
          </div>
        </div>
        <div className="laptop-sm:hidden">
          <div className="sticky top-24">
            <SellerCard seller={sellerData} />
          </div>
        </div>
      </div>
    </div>
  );
}
