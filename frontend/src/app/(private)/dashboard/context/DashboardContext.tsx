"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ModalType, ProductType, OrderType } from "../types";
import { products, productComments, orders } from "../ConstData";
import { Dispatch, SetStateAction } from "react";

// Define interfaces for type safety
interface ProductMetrics {
  views: number;
  rating: number;
  orders: number;
  comments: number;
}

// Define the DashboardContext type
export interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType | null) => void;
  selectedOrder: OrderType | null;
  setSelectedOrder: (order: OrderType | null) => void;
  productModal: (type: ModalType, product?: ProductType | null) => void;
  orderModal: (type: ModalType, order?: OrderType | null) => void;
  getProductMetrics: (productId: string) => ProductMetrics | null;
  refreshProducts: () => void;
  refreshKey: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// DashboardProvider props
interface DashboardProviderProps {
  children: ReactNode;
}

// Provider component
const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const productModal = (
    type: ModalType,
    product: ProductType | null = null
  ) => {
    setModalType(type);
    setSelectedProduct(product);
    setSelectedOrder(null); // Reset order
    setShowModal(true);
  };

  const orderModal = (type: ModalType, order: OrderType | null = null) => {
    setModalType(type);
    setSelectedOrder(order);
    setSelectedProduct(null); // Reset product
    setShowModal(true);
  };

  const refreshProducts = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getProductMetrics = (productId: string): ProductMetrics | null => {
    const product = products.find((p) => p.id.toString() === productId);
    if (!product) return null;

    return {
      views: product.views,
      rating: product.rating,
      orders: Math.floor(Math.random() * 50) + 10, // Replace with actual logic
      comments: productComments.filter((c) => c.product === product.name)
        .length,
    };
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        showModal,
        setShowModal,
        modalType,
        setModalType,
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        selectedOrder,
        setSelectedOrder,
        productModal,
        orderModal,
        getProductMetrics,
        refreshProducts,
        refreshKey,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export default DashboardProvider;
