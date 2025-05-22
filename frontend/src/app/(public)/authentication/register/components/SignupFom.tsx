"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/app/(public)/components/Footer";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "gray-300",
  });

  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength({
        score: 0,
        message: "",
        color: "gray-300",
      });
      return;
    }

    const hasLength = formData.password.length >= 8;
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSpecial = /[^A-Za-z0-9]/.test(formData.password);

    let score = 0;
    if (hasLength) score++;
    if (hasUppercase && hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    let message = "";
    let color = "";

    switch (score) {
      case 0:
        message = "Very weak";
        color = "red-500";
        break;
      case 1:
        message = "Weak";
        color = "red-400";
        break;
      case 2:
        message = "Fair";
        color = "yellow-500";
        break;
      case 3:
        message = "Good";
        color = "green-400";
        break;
      case 4:
        message = "Strong";
        color = "green-600";
        break;
      default:
        message = "";
        color = "gray-300";
    }

    setPasswordStrength({ score, message, color });
  }, [formData.password]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 2) {
      newErrors.password = "Please choose a stronger password";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms of Service";
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
      case "firstName":
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
        } else if (formData.firstName.trim().length < 2) {
          newErrors.firstName = "First name must be at least 2 characters";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "lastName":
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        } else if (formData.lastName.trim().length < 2) {
          newErrors.lastName = "Last name must be at least 2 characters";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "email":
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (passwordStrength.score < 2) {
          newErrors.password = "Please choose a stronger password";
        } else {
          delete newErrors.password;
        }
        if (
          formData.confirmPassword &&
          formData.password !== formData.confirmPassword
        ) {
          newErrors.confirmPassword = "Passwords do not match";
        } else if (formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "agreeTerms":
        if (!formData.agreeTerms) {
          newErrors.agreeTerms = "You must agree to the Terms of Service";
        } else {
          delete newErrors.agreeTerms;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (touched[name]) {
      setTimeout(() => validateField(name), 100);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const touchedFields = {};
    Object.keys(formData).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    const isValid = validateForm();
    if (isValid) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Sign up data:", formData);
        setFormSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Failed to create account. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-lg borde border-gray-100 px-4 py-6">
        {formSubmitted ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Account Created Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for joining our marketplace.
            </p>
            <Link
              href="/login"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Sign In to Your Account
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Create Your Account
              </h2>
              <p className="text-gray-600 mt-2">
                Join our marketplace to start selling your products
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

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <div className="grid grid-cols-1 laptop-lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border ${
                        touched.firstName && errors.firstName
                          ? "border-red-300"
                          : touched.firstName && !errors.firstName
                          ? "border-green-300"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 ${
                        touched.firstName && errors.firstName
                          ? "focus:ring-red-500"
                          : "focus:ring-green-500"
                      }`}
                      placeholder="Enter your first name"
                      required
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border ${
                        touched.lastName && errors.lastName
                          ? "border-red-300"
                          : touched.lastName && !errors.lastName
                          ? "border-green-300"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 ${
                        touched.lastName && errors.lastName
                          ? "focus:ring-red-500"
                          : "focus:ring-green-500"
                      }`}
                      placeholder="Enter your last name"
                      required
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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

              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-3 pr-10 py-2 border ${
                          touched.password && errors.password
                            ? "border-red-300"
                            : formData.password && passwordStrength.score >= 2
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
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full bg-${passwordStrength.color}`}
                              style={{
                                width: `${(passwordStrength.score / 4) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span
                            class
                            className={`text-xs font-medium text-${passwordStrength.color}`}
                          >
                            {passwordStrength.message}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          <p>Password must contain:</p>
                          <ul className="mt-1 grid grid-cols-2 gap-x-4">
                            <li
                              className={`flex items-center ${
                                formData.password.length >= 8
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              {formData.password.length >= 8 ? (
                                <CheckCircle
                                  size={12}
                                  className="mr-1 text-green-600"
                                />
                              ) : (
                                <XCircle
                                  size={12}
                                  className="mr-1 text-gray-400"
                                />
                              )}
                              At least 8 characters
                            </li>
                            <li
                              className={`flex items-center ${
                                /[A-Z]/.test(formData.password) &&
                                /[a-z]/.test(formData.password)
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              {/[A-Z]/.test(formData.password) &&
                              /[a-z]/.test(formData.password) ? (
                                <CheckCircle
                                  size={12}
                                  className="mr-1 text-green-600"
                                />
                              ) : (
                                <XCircle
                                  size={12}
                                  className="mr-1 text-gray-400"
                                />
                              )}
                              Upper & lowercase
                            </li>
                            <li
                              className={`flex items-center ${
                                /[0-9]/.test(formData.password)
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              {/[0-9]/.test(formData.password) ? (
                                <CheckCircle
                                  size={12}
                                  className="mr-1 text-green-600"
                                />
                              ) : (
                                <XCircle
                                  size={12}
                                  className="mr-1 text-gray-400"
                                />
                              )}
                              At least 1 number
                            </li>
                            <li
                              className={`flex items-center ${
                                /[^A-Za-z0-9]/.test(formData.password)
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              {/[^A-Za-z0-9]/.test(formData.password) ? (
                                <CheckCircle
                                  size={12}
                                  className="mr-1 text-green-600"
                                />
                              ) : (
                                <XCircle
                                  size={12}
                                  className="mr-1 text-gray-400"
                                />
                              )}
                              Special character
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {touched.password && errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-3 pr-10 py-2 border ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border-red-300"
                            : formData.confirmPassword &&
                              formData.password === formData.confirmPassword
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
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
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
                    {touched.confirmPassword &&
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword && (
                        <p className="mt-1 text-sm text-green-600 flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Passwords match
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  className={`flex items-start text-sm ${
                    touched.agreeTerms && errors.agreeTerms
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 mr-2 h-4 w-4 ${
                      touched.agreeTerms && errors.agreeTerms
                        ? "border-red-300 text-red-600"
                        : "border-gray-300 text-green-600"
                    } rounded focus:ring-green-500`}
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {touched.agreeTerms && errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-600 ml-6">
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
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
                    Creating Account...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </button>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-green-600 font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>

              <div className="text-gray-600 text-sm mt-6">
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
            </form>
          </>
        )}
      </div>
    </div>
  );
}
