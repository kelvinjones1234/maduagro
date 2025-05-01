"use client";

import React from "react";
import FarmerDashboardProvider from "../context/DashboardContext";
import DashboardContent from "../components/DashboardContent";
import FarmerDashboardNavbar from "../components/FarmerDashboardNavbar";

const page = () => {
  return (
    <FarmerDashboardProvider>
      <div className="tablet-lg:hidden">
        <FarmerDashboardNavbar />
      </div>
      <DashboardContent />
    </FarmerDashboardProvider>
  );
};

export default page;
