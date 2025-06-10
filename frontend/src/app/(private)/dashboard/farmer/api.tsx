interface ProductCategory {
  category_name: string;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  category_name: string;
  product_category: ProductCategory;
  available: boolean;
  image: string;
  rating: number;
  [key: string]: any;
}

type Category = {
  category_name: string;
  category_slug: string;
  product_count: number;
};

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`, {
      cache: "no-store",
      // next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data: { results: Category[] } | Category[] = await res.json();
    return Array.isArray(data) ? data : data.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchProducts(searchParams: {
  [key: string]: string | undefined;
}): Promise<{ results: Product[]; count: number }> {
  try {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (!value) return;
      if (key === "rating") {
        params.append("rating", value);
        return;
      }
      if (value.includes(",")) {
        const values = value.split(",");
        values.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });

    const url = `${API_BASE_URL}/seller-products/?${params.toString()}`;
    console.log("Fetching URL:", url);
    console.log("Request credentials:", "include");

    const res = await fetch(url, {
      cache: "no-store",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", [...res.headers.entries()]);
    console.log("Cookies sent:", document.cookie); // Log cookies sent by the browser

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Response error text:", errorText);
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    return { results: data.results || [], count: data.count || 0 };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { results: [], count: 0 };
  }
}

// Delete product api

export async function deleteProduct(productId: number) {
  const response = await fetch(`${API_BASE_URL}/product/${productId}/delete/`, {
    credentials: "include",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  console.log("delete response", response);
  return response.json();
}

export async function deleteProducts(productIds: number[]) {
  const response = await fetch(`${API_BASE_URL}/products/bulk-delete/`, {
    method: "POST", // Changed from DELETE to POST
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_ids: productIds }), // Changed from 'ids' to 'product_ids'
  });
  if (!response.ok) throw new Error("Failed to delete products");
  return response.json();
}

export async function addProduct(productData: FormData): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/create/`, {
      method: "POST",
      body: productData, // Use FormData directly for multipart/form-data
      credentials: "include", // Include credentials for authentication
      headers: {
        // Do not set Content-Type manually when using FormData; the browser sets it to multipart/form-data with the correct boundary
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add product: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error; // Rethrow to handle in the component
  }
}

// export async function editProduct(
//   productId: number,
//   productData: FormData
// ): Promise<Product> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/product/${productId}/update/`, {
//       method: "PUT",
//       body: productData,
//       credentials: "include",
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update product: ${errorText}`);
//     }

//     const data = await response.json();
//     return {
//       id: data.id,
//       product_name: data.product_name,
//       product_category: data.product_category,
//       product_description: data.product_description,
//       available_quantity: data.available_quantity,
//       availability_status: data.availability_status,
//       weight_per_unit: data.weight_per_unit,
//       product_price: data.product_price,
//       image: data.image,
//     };
//   } catch (error) {
//     console.error("Error updating product:", error);
//     throw error;
//   }
// }

export async function editProduct(
  productId: number,
  productData: FormData
): Promise<Product> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product/${productId}/update/`,
      {
        method: "PUT",
        body: productData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update product: ${errorText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      product_name: data.product_name,
      product_category: data.product_category,
      product_description: data.product_description,
      available_quantity: data.available_quantity,
      availability_status: data.availability_status,
      weight_per_unit: data.weight_per_unit,
      product_price: data.product_price,
      image: data.image,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
