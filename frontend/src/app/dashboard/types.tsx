import { File } from "buffer";

export type ModalType =
  | "addProduct"
  | "viewProduct"
  | "editProduct"
  | "deleteProduct"
  | "viewOrder";

export interface ProductType {
  id: number;
  name: string;
  category: string;
  quantity: string;
  price: string;
  status: string;
  color: string;
  views: number;
  rating: number;
  image: File | null | string;
  description: string;
  warning?: boolean;
  imagePreview?: string;
}

export type OrderType = {
  id: string;
  customer: string;
  products: string;
  date: string;
  amount: string;
  status: string;
  location: string;
  estimatedDelivery: string;
};




