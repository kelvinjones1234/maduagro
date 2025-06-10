"use client";

import React from "react";
import DashboardProvider from "../context/DashboardContext";
import DashboardContent from "./components/DashboardContent";
import DashboardNavbar from "./components/DashboardNavbar";

const page = () => {
  return (
    <DashboardProvider>
      <div className="laptop-lg:hidden">
        <DashboardNavbar />
      </div>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default page;
