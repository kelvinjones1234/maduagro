"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
import useScreenWidth from "@/app/(public)/hooks/useScreenWidth";
import CartDrawer from "./Cart";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const width = useScreenWidth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  const solutionsLinks = [
    { href: "/services/consulting", label: "Commodity Sourcing" },
    { href: "/services/automation", label: "Commodity Storage" },
    { href: "/services/analytics", label: "Commodity Distribution" },
    { href: "/services/analytics", label: "Market Place" },
    { href: "/services/integration", label: "Consultation" },
  ];

  const navLinks = [
    { href: "#", label: "Solutions", hasDropdown: true },
    { href: "/how we work", label: "How it works" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact us" },
    { href: "/about", label: "About us" },
  ];

  useEffect(() => {
    if ((isOpen && width < 1024) || openCart) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, width, openCart]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 py-4 tablet-lg:py-6 laptop-lg:py-7 bg-white/90 text-[#464646]`}
    >
      <div
        className={`${
          (isOpen && width < 1024) || openCart
            ? "absolute top-0 w-full h-screen bg-gray-300/70"
            : ""
        }`}
        onClick={() => {
          setIsOpen(false);
          setOpenCart(false);
        }}
      />
      <div className="px-2 laptop-lg:px-16 tablet-lg:px-8">
        {/* Logo */}
        <div className="flex justify-between items-center">
          <div className="order-2">
            <Link
              href="/"
              className="text-2xl font-thin flex items-center z-10"
            >
              bush<span className="text-amber-500 font-extrabold">Market</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="order-3 hidden laptop-lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.hasDropdown && setShowSolutionsDropdown(true)
                }
                onMouseLeave={() =>
                  link.hasDropdown && setShowSolutionsDropdown(false)
                }
              >
                <Link
                  href={link.href}
                  className={`hover:text-amber-500 flex items-center gap-x-4`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={16} className="" />}
                </Link>

                {/* Solutions Dropdown */}
                {link.hasDropdown && showSolutionsDropdown && (
                  <div className="absolute top-full left-0 pt-[1rem] w-50 bg-white shadow-lg rounded-md z-50">
                    {solutionsLinks.map((solutionLink) => (
                      <Link
                        key={solutionLink.href}
                        href={solutionLink.href}
                        className="block px-4 py-4 text-sm hover:bg-gray-100 hover:text-amber-500 transition-colors"
                      >
                        {solutionLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex order-4 gap-x-10">
            <Link href={"/authentication/login"}>
              <User
                size={24}
                className="hover:text-[#f3af00] transition-colors cursor-pointer"
              />
            </Link>
            <button onClick={toggleCart} className="z-30">
              {openCart ? (
                <X
                  size={24}
                  className="hover:text-[#f3af00] transition-colors cursor-pointer"
                />
              ) : (
                <ShoppingCart
                  size={24}
                  className="hover:text-[#f3af00] transition-colors cursor-pointer"
                />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="z-10 order-1 laptop-lg:hidden">
            <button
              className="text-gray-700 focus:outline-none hover:text-[#f3af00] transition-colors cursor-pointer"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-0 left-0 w-[50%] h-screen bg-white shadow-lg laptop-lg:hidden">
            <ul className="flex flex-col items-start py-4 space-y-4 mt-16 z-20">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full text-center">
                  {link.hasDropdown ? (
                    <div>
                      <button
                        className="flex items-center justify-center mx-auto hover:text-[#f3af00] transition-colors text-base"
                        onClick={() =>
                          setShowSolutionsDropdown(!showSolutionsDropdown)
                        }
                      >
                        {link.label}
                        <ChevronDown size={16} className="ml-1" />
                      </button>

                      {showSolutionsDropdown && (
                        <div className="mt-2 py-2 bg-gray-50">
                          {solutionsLinks.map((solutionLink) => (
                            <Link
                              key={solutionLink.href}
                              href={solutionLink.href}
                              className="block py-2 text-sm hover:text-[#f3af00] transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {solutionLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-[#f3af00] transition-colors text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <CartDrawer openCart={openCart} setOpenCart={setOpenCart} />
      </div>
    </nav>
  );
}
