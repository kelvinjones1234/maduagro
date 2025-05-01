"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import useScreenWidth from "@/app/(public)/hooks/useScreenWidth";
import DashboardSidebar from "./DashboardSidebar";

export default function FarmerDashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const width = useScreenWidth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen && width < 1024) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen, width]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 py-4 tablet-lg:py-6 laptop-lg:py-7 bg-white/90 text-[#464646] border-b border-[#f3af00]">
        <div className="px-2 laptop-lg:px-16 tablet-lg:px-8 flex justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-thin flex items-center z-10">
            mIu<span className="text-[#f3af00] font-extrabold">AgRo</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-x-6">
            <div className="underline">view site</div>

            <button
              className="text-gray-700 focus:outline-none z-10 hover:text-[#f3af00] transition-colors cursor-pointer"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 laptop-lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 w-64 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } laptop-lg:translate-x-0 laptop-lg:z-30 laptop-lg:shadow-none`}
      >
        {/* Dashboard Sidebar Content */}
        {/*  */}
        <DashboardSidebar />
      </div>

      {/* Main Content - Add padding to account for the sidebar on large screens */}
      <div className="laptop-lg:pl-64 pt-16">
        {/* Your main dashboard content goes here */}
      </div>
    </>
  );
}
