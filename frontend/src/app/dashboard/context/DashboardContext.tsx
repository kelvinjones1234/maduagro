import React, { useContext, createContext, useState, ReactNode } from "react";
import { ModalType } from "../types";
import { Dispatch, SetStateAction } from "react";
import { ProductType, OrderType } from "../types"; // <- Make sure OrderType exists
import { products, productComments, orders } from "../ConstData";

// Define the context type
type DashboardContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  modalType: string;
  setModalType: (type: string) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType | null) => void;
  selectedOrder: OrderType | null;
  setSelectedOrder: (order: OrderType | null) => void;
  productModal: (type: ModalType, product?: ProductType | null) => void;
  orderModal: (type: ModalType, order?: OrderType | null) => void;
  getProductMetrics: (productId: number) => {
    views: number;
    rating: number;
    orders: number;
    comments: number;
  } | null;
};

const Dashboard = createContext<DashboardContextType | undefined>(undefined);

const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    setSelectedOrder(null); // reset order
    setShowModal(true);
  };

  const orderModal = (type: ModalType, order: OrderType | null = null) => {
    setModalType(type);
    setSelectedOrder(order);
    setSelectedProduct(null); // reset product
    setShowModal(true);
  };

  const getProductMetrics = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    return {
      views: product.views,
      rating: product.rating,
      orders: Math.floor(Math.random() * 50) + 10,
      comments: productComments.filter((c) => c.product === product.name)
        .length,
    };
  };

  return (
    <Dashboard.Provider
      value={{
        activeTab,
        setActiveTab,
        productModal,
        orderModal,
        setModalType,
        setSelectedProduct,
        setSelectedOrder,
        setShowModal,
        getProductMetrics,
        currentPage,
        setCurrentPage,
        showModal,
        modalType,
        selectedProduct,
        selectedOrder,
      }}
    >
      {children}
    </Dashboard.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(Dashboard);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export default DashboardProvider;
