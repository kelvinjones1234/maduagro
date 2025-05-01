"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/app/(public)/components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login functionality
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
    }, 1500);
  };

  return (
    <div className="mt-[10rem]">
      <div className="bg-white flex mb-[6rem]">
        <div className="relative w-1/2 hidden wide:flex">
          <Image
            src="/images/test6.jpg"
            alt="Newsletter background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
            className="rounded-3xl"
            priority
          />
        </div>
        <div className="lg:flex max-w-md mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl lg:mt-8 xl:mt-12 relative border-gray-100 border">
          <div className="lg:w-1/2">
            <div className="px-4 py-6 md:px-8 md:py-8">
              <div className="bg-white rounded-lg border border-gray-100 p-5 md:p-6">
                <h3 className="text-center font-bold text-[#464646] mb-6 font-poppins text-[1.8rem]">
                  Log In to Your Account
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-600 text-sm mb-2 font-poppins"
                    >
                      Email Number
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-600 text-sm mb-2 font-poppins"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={`${showPassword ? "text" : "password"}`}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="Enter your password"
                        required
                      />
                      <div
                        className="absolute top-[.9rem] right-0 justify-end px-4 text-[.9rem] text-gray-400 hover:text-gray-500 cursor-pointer transition-colors duration-300 font-semibold"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        Show
                      </div>
                    </div>
                  </div>

                  <div className="text-right mb-6">
                    <Link
                      href="/authentication/request_password_reset"
                      className="text-green-600 text-sm hover:underline font-poppins"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-poppins flex justify-center items-center"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>

                <div className="flex items-center my-6">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 font-poppins">
                    OR
                  </span>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                <p className="text-center text-gray-600 text-sm font-poppins">
                  Don't have an account yet?{" "}
                  <Link
                    href="/authentication/register"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Join Our Network
                  </Link>
                </p>
              </div>

              {/* Benefits Text */}
              <div className="text-gray-600 text-sm md:text-base mt-6 mb-6 font-poppins">
                <p className="mb-3">
                  Join our{" "}
                  <span className="text-green-600 font-medium">
                    Agricultural Network
                  </span>{" "}
                  to get direct access to wholesale markets, location-based
                  price intelligence, and efficient storage solutions.
                </p>
                <p>
                  Harness{" "}
                  <span className="text-green-600 font-medium">
                    digital networks
                  </span>{" "}
                  to revolutionize food storage and distribution for greater
                  security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[3rem]">
        <Footer />
      </div>
    </div>
  );
}
