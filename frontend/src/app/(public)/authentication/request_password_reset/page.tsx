"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/app/(public)/components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    // Mock reset link request functionality
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="mt-[10rem]">
      <div className="bg-white flex mb-[6rem]">
        <div className="relative w-1/2 hidden wide:flex">
          <Image
            src="/images/test6.jpg"
            alt="Forgot password background"
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
                  Forgot Password
                </h3>

                {isSuccess ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-poppins mb-2">
                      Password reset link sent!
                    </p>
                    <p className="text-gray-600 font-poppins mb-6">
                      We've sent instructions to{" "}
                      <span className="font-medium">{email}</span>. Please check
                      your inbox and follow the link to reset your password.
                    </p>
                    <div className="mb-4">
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-green-600 font-poppins hover:underline text-sm"
                      >
                        Didn't receive the email? Try again
                      </button>
                    </div>
                    <Link
                      href="/authentication/login"
                      className="w-full py-3 rounded-md font-medium bg-white border border-green-600 text-green-600 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-poppins inline-block"
                    >
                      Back to Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <p className="text-gray-600 font-poppins mb-6">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </p>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm font-poppins">
                        {error}
                      </div>
                    )}

                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="Enter your email address"
                        required
                      />
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
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </form>
                )}

                <div className="flex items-center my-6">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 font-poppins">
                    OPTIONS
                  </span>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                <p className="text-center text-gray-600 text-sm font-poppins">
                  Remember your password?{" "}
                  <Link
                    href="/authentication/login"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Log in Instead
                  </Link>
                </p>
                <p className="text-center text-gray-600 text-sm font-poppins mt-2">
                  Don't have an account?{" "}
                  <Link
                    href="/authentication/register"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Join Our Network
                  </Link>
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
