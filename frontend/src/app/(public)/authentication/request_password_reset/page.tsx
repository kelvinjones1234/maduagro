"use client";
import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import Footer from "@/app/(public)/components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name);
  };

  const validateField = (fieldName) => {
    const newErrors = { ...errors };
    if (fieldName === "email") {
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true });
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setEmail("");
        setTouched({});
        setErrors({});
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          form: "Failed to send reset link. Please try again.",
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-lg border border-gray-100 px-4 py-6">
        {isSuccess ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Password Reset Link Sent!
            </h2>
            <p className="text-gray-600 mb-2">
              We've sent instructions to{" "}
              <span className="font-medium">{email}</span>.
            </p>
            <p className="text-gray-600 mb-8">
              Please check your inbox and follow the link to reset your
              password.
            </p>
            <div className="mb-4">
              <button
                onClick={() => setIsSuccess(false)}
                className="text-green-600 text-sm hover:underline font-medium"
              >
                Didn't receive the email? Try again
              </button>
            </div>
            <Link
              href="/authentication/login"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Forgot Password
              </h2>
              <p className="text-gray-600 mt-2">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            {errors.form && (
              <div className="mb-6 p-4 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
                <AlertTriangle
                  size={18}
                  className="mr-2 flex-shrink-0 mt-0.5"
                />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border ${
                    touched.email && errors.email
                      ? "border-red-300"
                      : touched.email && !errors.email
                      ? "border-green-300"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 ${
                    touched.email && errors.email
                      ? "focus:ring-red-500"
                      : "focus:ring-green-500"
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
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
                  </>
                ) : (
                  <>Send Reset Link</>
                )}
              </button>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/authentication/login"
                  className="text-green-600 font-medium hover:underline"
                >
                  Log in Instead
                </Link>
              </p>
              <p className="text-center text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <Link
                  href="/authentication/register"
                  className="text-green-600 font-medium hover:underline"
                >
                  Join Our Network
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
