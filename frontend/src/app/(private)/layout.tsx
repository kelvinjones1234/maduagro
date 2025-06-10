import React from "react";
import "../globals.css";
import ProtectedRoute from "../utils/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProtectedRoute>
        <main>{children}</main>
      </ProtectedRoute>
    </div>
  );
}
