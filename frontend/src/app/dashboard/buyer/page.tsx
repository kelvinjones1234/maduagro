"use client";

import React from "react";
import FarmerDashboardProvider from "../context/DashboardContext";
import DashboardContent from "./components/DashboardContent";
import DashboardNavbar from "./components/DashboardNavbar";

const page = () => {
  return (
    <FarmerDashboardProvider>
      <div className="tablet-lg:hidden">
        <DashboardNavbar />
      </div>
      <DashboardContent />
    </FarmerDashboardProvider>
  );
};

export default page;
