"use client";

import React from "react";
import DashboardProvider from "../context/DashboardContext";
import DashboardContent from "../farmer/components/DashboardContent";
import DashboardNavbar from "../farmer/components/DashboardNavbar";

const page = () => {
  return (
    <DashboardProvider>
      <div className="tablet-lg:hidden">
        <DashboardNavbar />
      </div>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default page;
