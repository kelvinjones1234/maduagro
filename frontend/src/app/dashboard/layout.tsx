"use client";

import React from "react";
import "../globals.css";
import FarmerDashboardNavbar from "./components/FarmerDashboardNavbar";
import FarmerDashboardProvider from "./context/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <FarmerDashboardProvider>
        <main>{children}</main>
      </FarmerDashboardProvider>
    </div>
  );
}
