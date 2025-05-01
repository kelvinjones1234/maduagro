import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100/70 rounded-[2rem] px-4 py-12 text-sm">
      <div className="grid grid-cols-1 mobile-lg:grid-cols-2 laptop-sm:grid-cols-4 gap-8 w-full max-w-6xl mx-auto laptop-lg:justify-items-center">
        {/* Brand Section */}
        <div className="mobile-lg:flex-col flex-row">
          <Link href="/" className="text-3xl font-thin">
            bush<span className="text-amber-500 font-extrabold">Market</span>
          </Link>
          <ul className="text-gray-600 flex gap-x-[1.5rem] flex-row items-center mobile-lg:items-start mt-6 mobile-lg:space-y-2 mobile-lg:space-x-0">
            <li>
              <Link
                href="/blog"
                className="hover:text-amber-500 transition-colors"
              >
                <Linkedin />
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-amber-500 transition-colors"
              >
                <Instagram />
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-amber-500 transition-colors"
              >
                <Facebook />
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="flex flex-col">
          <h6 className="font-semibold text-gray-800">Company</h6>
          <ul className="text-gray-600 mt-4 space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:text-amber-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-amber-500 transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Solutions Section */}
        <div className="flex flex-col">
          <h6 className="font-semibold text-gray-800">Solutions</h6>
          <ul className="text-gray-600 mt-4 space-y-2">
            <li>
              <Link
                href="/solutions"
                className="hover:text-amber-500 transition-colors"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/press"
                className="hover:text-amber-500 transition-colors"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="hover:text-amber-500 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="hover:text-amber-500 transition-colors"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col">
          <h6 className="font-semibold text-gray-800">Contact Us</h6>
          <ul className="text-gray-600 mt-4 space-y-2">
            <li>
              <a
                href="mailto:info@miuagro.com"
                className="hover:text-amber-500 transition-colors"
              >
                info@miuagro.com
              </a>
            </li>
            <li>
              <a
                href="tel:+2348141772672"
                className="hover:text-amber-500 transition-colors"
              >
                +234 8141 772 672
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-thin">bush</span>
          <span className="text-amber-500 font-extrabold">Market</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
