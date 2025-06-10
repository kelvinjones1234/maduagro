import { notFound } from "next/navigation";
import DetailHero from "./components/DetailHero";
import Footer from "../../components/Footer";
import Faq from "./components/Faq";
import ResourcesAndSupport from "./components/ResourcesAndSupport";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  category_name: string;
  product_category: { category_name: string };
  available: boolean;
  image: string;
  rating: number;
  description?: string;
}

interface Seller {
  name: string;
  location: string;
  joined: string;
  rating: number;
  reviews: number;
  products: number;
  verified: boolean;
  bio: string;
  responseTime: string;
  certifications: string[];
}

const SELLER_DATA: Seller = {
  name: "GreenFields Tech",
  location: "Nairobi, Kenya",
  joined: "March 2022",
  rating: 4.9,
  reviews: 245,
  products: 12,
  verified: true,
  bio: "GreenFields Tech specializes in innovative agricultural solutions to empower small and medium-scale farmers. We focus on sustainable technology to enhance productivity and reduce losses.",
  responseTime: "Within 2 hours",
  certifications: ["ISO 9001", "Organic Certified"],
};

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  let product: Product | null = null;

  try {
    const res = await fetch(`${API_URL}/api/products/${id}/`, {
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error(`Failed to fetch product ${id}: ${res.status}`);
      return notFound();
    }

    const data: Product = await res.json();

    if (!data || !data.id) {
      console.error(`Invalid product data for ID ${id}`);
      return notFound();
    }

    product = data;
  } catch (error) {
    console.error(`Error fetching product:`, error);
    return notFound();
  }

  return (
    <main className="mx-auto font-sans mt-[10rem] text-[#2D2D2D] text-[clamp(.8rem,1.4vw,.9rem)]">
      {product ? (
        <DetailHero product={product} seller={SELLER_DATA} />
      ) : (
        <div className="text-center py-10">Product not found</div>
      )}
      <Faq />
      <ResourcesAndSupport />
      <div className="py-[4rem]">
        <Footer />
      </div>
    </main>
  );
}

// Optional: Explicitly allow dynamic params
export const dynamicParams = true; // Allow dynamic rendering for non-pre-generated IDs
// export const revalidate = 60; // Revalidate all static pages every 60 seconds
