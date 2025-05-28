"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, AlertTriangle } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
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
      case "email":
        if (!email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!password) {
          newErrors.password = "Password is required";
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const isValid = validateForm();
    if (!isValid) return;

    setIsLoading(true);
    setErrors({}); // Reset errors

    try {
      const success = await login(email, password);
      if (!success) {
        setErrors((prev) => ({
          ...prev,
          form: "Invalid email or password",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: "Failed to log in. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-6 lg:px-8 mt-[7rem]">
      <div className="max-w-xl w-full bg-white rounded-lg borde border-gray-100 px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Log In to Your Account
          </h2>
          <p className="text-gray-600 mt-2">
            Join our marketplace to start selling your products
          </p>
        </div>

        {errors.form && (
          <div className="mb-6 p-4 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
            <AlertTriangle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
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
                    : touched.password && !errors.password
                    ? "border-green-300"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 ${
                  touched.password && errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-green-500"
                }`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <Link
              href="/authentication/request_password_reset"
              className="text-green-600 text-sm hover:underline font-medium"
            >
              Forgot Password?
            </Link>
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
                Processing...
              </>
            ) : (
              <>Log In</>
            )}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account yet?{" "}
            <Link
              href="/authentication/register"
              className="text-green-600 font-medium hover:underline"
            >
              Join Our Network
            </Link>
          </p>

          <div className="text-gray-600 text-sm mt-6">
            <p className="mb-3">
              Join our{" "}
              <span className="text-green-600 font-medium">
                Agricultural Network
              </span>{" "}
              to get direct access to wholesale markets, location-based price
              intelligence, and efficient storage solutions.
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
      </div>
    </div>
  );
}
