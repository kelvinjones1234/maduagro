"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/app/(public)/components/Footer";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Password criteria states
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
    matching: false,
  });

  // Check password criteria on change
  useEffect(() => {
    setCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      matching: password === confirmPassword && password !== "",
    });
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Check if all criteria are met
    const allCriteriaMet = Object.values(criteria).every(
      (value) => value === true
    );

    if (!allCriteriaMet) {
      setError("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    // Mock reset functionality
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset form
      setPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  // Helper function for criteria icon
  const CriteriaIcon = ({ met }: { met: boolean }) => (
    <span
      className={`mr-2 inline-flex items-center ${
        met ? "text-green-500" : "text-gray-300"
      }`}
    >
      {met ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </span>
  );

  return (
    <div className="mt-[10rem]">
      <div className="bg-white flex mb-[6rem]">
        <div className="relative w-1/2 hidden wide:flex">
          <Image
            src="/images/test6.jpg"
            alt="Reset password background"
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
                  Reset Your Password
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-poppins mb-6">
                      Your password has been successfully reset!
                    </p>
                    <Link
                      href="/authentication/login"
                      className="w-full py-3 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-poppins inline-block"
                    >
                      Go to Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm font-poppins">
                        {error}
                      </div>
                    )}

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-1 font-poppins ${
                            password
                              ? Object.values(criteria)
                                  .slice(0, 4)
                                  .every((v) => v)
                                ? "border-green-500 focus:ring-green-500"
                                : "border-orange-300 focus:ring-orange-500"
                              : "border-gray-300 focus:ring-green-500"
                          }`}
                          placeholder="Enter new password"
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

                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-1 font-poppins ${
                            confirmPassword
                              ? criteria.matching
                                ? "border-green-500 focus:ring-green-500"
                                : "border-red-300 focus:ring-red-500"
                              : "border-gray-300 focus:ring-green-500"
                          }`}
                          placeholder="Confirm new password"
                          required
                        />
                        <div
                          className="absolute top-[.9rem] right-0 justify-end px-4 text-[.9rem] text-gray-400 hover:text-gray-500 cursor-pointer transition-colors duration-300 font-semibold"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          Show
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-6 font-poppins bg-gray-50 p-4 rounded-md">
                      <p className="font-medium mb-2">Password requirements:</p>
                      <ul className="space-y-2">
                        <li className={criteria.length ? "text-green-600" : ""}>
                          <CriteriaIcon met={criteria.length} />
                          At least 8 characters long
                        </li>
                        <li
                          className={criteria.uppercase ? "text-green-600" : ""}
                        >
                          <CriteriaIcon met={criteria.uppercase} />
                          Include at least one uppercase letter
                        </li>
                        <li className={criteria.number ? "text-green-600" : ""}>
                          <CriteriaIcon met={criteria.number} />
                          Include at least one number
                        </li>
                        <li
                          className={criteria.special ? "text-green-600" : ""}
                        >
                          <CriteriaIcon met={criteria.special} />
                          Include at least one special character
                        </li>
                        <li
                          className={criteria.matching ? "text-green-600" : ""}
                        >
                          <CriteriaIcon met={criteria.matching} />
                          Passwords match
                        </li>
                      </ul>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        isLoading || !Object.values(criteria).every((v) => v)
                      }
                      className={`w-full py-3 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-poppins flex justify-center items-center ${
                        Object.values(criteria).every((v) => v) && !isLoading
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
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
                        "Reset Password"
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
