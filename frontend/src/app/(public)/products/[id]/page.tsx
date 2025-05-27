"use client";

import { notFound } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import DetailHero from "./components/DetailHero";
import Footer from "../../components/Footer";
import Faq from "./components/Faq";
import ResourcesAndSupport from "./components/ResourcesAndSupport";
import DetailHeroSkeleton from "./components/skeletons/DetailHeroSkeleton";

// Define interfaces for type safety
interface Product {
  id: number;
  name: string;
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

// Static seller data
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

// Props type for the component, resolving params promise before usage
interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Await params to get id
        const { id } = await params;

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

        const res = await fetch(`${API_URL}/api/products/${id}/`, {
          next: { revalidate: 60 },
        });

        if (!res.ok) {
          console.error(`Failed to fetch product ${id}: ${res.status}`);
          setLoading(false);
          return notFound();
        }

        const data: Product = await res.json();

        if (!data || !data.id) {
          console.error(`Invalid product data for ID ${id}`);
          setLoading(false);
          return notFound();
        }

        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching product:`, error);
        setLoading(false);
        return notFound();
      }
    };

    fetchProduct(); 
  }, [params]);

  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <main className="mx-auto font-sans mt-[10rem] text-[#2D2D2D] text-[clamp(.8rem,1.4vw,.9rem)]">
        {loading || !product ? (
          <DetailHeroSkeleton />
        ) : (
          <DetailHero product={product} seller={SELLER_DATA} />
        )}
        <Faq />
        <ResourcesAndSupport />
        <div className="py-[4rem]">
          <Footer />
        </div>
      </main>
    </Suspense>
  );
}
