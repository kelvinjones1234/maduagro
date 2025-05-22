"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Footer from "@/app/(public)/components/Footer";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    matching: false,
  });

  useEffect(() => {
    setCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      matching: password === confirmPassword && password !== "",
    });
  }, [password, confirmPassword]);

  const validateForm = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !criteria.uppercase ||
      !criteria.lowercase ||
      !criteria.number ||
      !criteria.special
    ) {
      newErrors.password = "Please meet all password requirements";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    switch (fieldName) {
      case "password":
        if (!password) {
          newErrors.password = "Password is required";
        } else if (password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (
          !criteria.uppercase ||
          !criteria.lowercase ||
          !criteria.number ||
          !criteria.special
        ) {
          newErrors.password = "Please meet all password requirements";
        } else {
          delete newErrors.password;
        }
        if (confirmPassword && password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else if (confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (!confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setPassword("");
        setConfirmPassword("");
        setTouched({});
        setErrors({});
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          form: "Failed to reset password. Please try again.",
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
              Password Reset Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Your password has been updated.
            </p>
            <Link
              href="/authentication/login"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Reset Your Password
              </h2>
              <p className="text-gray-600 mt-2">
                Enter a new password for your account
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
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur}
                    className={`w-full pl-3 pr-10 py-2 border ${
                      touched.password && errors.password
                        ? "border-red-300"
                        : touched.password &&
                          !errors.password &&
                          criteria.length &&
                          criteria.uppercase &&
                          criteria.lowercase &&
                          criteria.number &&
                          criteria.special
                        ? "border-green-300"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 ${
                      touched.password && errors.password
                        ? "focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                    placeholder="Minimum 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={handleBlur}
                    className={`w-full pl-3 pr-10 py-2 border ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-red-300"
                        : touched.confirmPassword && criteria.matching
                        ? "border-green-300"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
                {touched.confirmPassword && criteria.matching && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Passwords match
                  </p>
                )}
              </div>

              {password && (
                <div className="text-xs text-gray-600 bg-gray-50 p-4 rounded-md">
                  <p className="font-medium mb-2">Password must contain:</p>
                  <ul className="grid grid-cols-2 gap-x-4">
                    <li
                      className={`flex items-center ${
                        criteria.length ? "text-green-600" : ""
                      }`}
                    >
                      {criteria.length ? (
                        <CheckCircle
                          size={12}
                          className="mr-1 text-green-600"
                        />
                      ) : (
                        <XCircle size={12} className="mr-1 text-gray-400" />
                      )}
                      At least 8 characters
                    </li>
                    <li
                      className={`flex items-center ${
                        criteria.uppercase && criteria.lowercase
                          ? "text-green-600"
                          : ""
                      }`}
                    >
                      {criteria.uppercase && criteria.lowercase ? (
                        <CheckCircle
                          size={12}
                          className="mr-1 text-green-600"
                        />
                      ) : (
                        <XCircle size={12} className="mr-1 text-gray-400" />
                      )}
                      Upper & lowercase
                    </li>
                    <li
                      className={`flex items-center ${
                        criteria.number ? "text-green-600" : ""
                      }`}
                    >
                      {criteria.number ? (
                        <CheckCircle
                          size={12}
                          className="mr-1 text-green-600"
                        />
                      ) : (
                        <XCircle size={12} className="mr-1 text-gray-400" />
                      )}
                      At least 1 number
                    </li>
                    <li
                      className={`flex items-center ${
                        criteria.special ? "text-green-600" : ""
                      }`}
                    >
                      {criteria.special ? (
                        <CheckCircle
                          size={12}
                          className="mr-1 text-green-600"
                        />
                      ) : (
                        <XCircle size={12} className="mr-1 text-gray-400" />
                      )}
                      Special character
                    </li>
                  </ul>
                </div>
              )}

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
                    Processing...
                  </>
                ) : (
                  <>Reset Password</>
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
            </form>
          </>
        )}
      </div>
    </div>
  );
}
