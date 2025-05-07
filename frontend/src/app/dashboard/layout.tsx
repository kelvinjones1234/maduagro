"use client";

import React from "react";
import "../globals.css";
import DashboardProvider from "./context/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardProvider>
        <main>{children}</main>
      </DashboardProvider>
    </div>
  );
}
