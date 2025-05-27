// types.ts
export interface ProductCategory {
  category_name: string;
}

export interface Product {
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

export interface Category {
  category_name: string;
  category_slug: string;
  product_count: number;
}

export type ModalType =
  | "addProduct"
  | "viewProduct"
  | "editProduct"
  | "deleteProduct"
  | "viewOrder"
  | "editOrder"
  | "handleBulkDelete"

export interface OrderType {
  id: number;
  // Add other order fields as needed
  [key: string]: any;
}
