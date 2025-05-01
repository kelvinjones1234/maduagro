"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/app/(public)/components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    telephone: "",
    email: "",
    location: "",
    userType: "seller",
    profilePicture: null as File | null,
    bio: "",
    password: "",
    confirmPassword: "",
    businessInfo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
      matching: formData.password === formData.confirmPassword && formData.password !== "",
    });
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("Profile picture must be less than 2MB.");
      return;
    }
    setFormData((prev) => ({ ...prev, profilePicture: file || null }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (formData.fullName.length < 2) {
      setError("Full name must be at least 2 characters.");
      setIsLoading(false);
      return;
    }
    if (!formData.telephone.match(/^\+234[0-9]{10}$|^0[0-9]{10}$/)) {
      setError("Please enter a valid Nigerian phone number.");
      setIsLoading(false);
      return;
    }
    if (!formData.location) {
      setError("Please select a location.");
      setIsLoading(false);
      return;
    }

    // Check if all password criteria are met
    const allCriteriaMet = Object.values(criteria).every(
      (value) => value === true
    );

    if (!allCriteriaMet) {
      setError("Please meet all password requirements");
      setIsLoading(false);
      return;
    }

    // Mock registration functionality
    setTimeout(() => {
      setIsLoading(false);
      // Handle registration logic here (e.g., API call to save user data)
      console.log("Form Data:", formData);
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
      <div className="bg-white flex mb-[6rem] gap-x-[3rem]">
        <div className="relative w-1/2 hidden wide:flex">
          <Image
            src="/images/test6.jpg"
            alt="Registration background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
            className="rounded-3xl"
            priority
          />
        </div>
        <div className="laptop-lg:flex max-w-md mx-auto border-gray-100 border md:max-w-lg laptop-lg:max-w-xl xl:max-w-2xl relative">
          <div className="">
            <div className="px-4 py-6 md:px-8 md:py-8">
              <div className="bg-white rounded-lg border-gray-100 border p-5 md:p-6">
                <h3 className="text-center font-bold text-[#464646] text-[1.8rem] mb-[3rem] font-poppins">
                  Create Your <span className="font-thin">mIu</span>
                  <span className="text-[#f3af00] font-extrabold">
                    AgRo
                  </span>{" "}
                  Account
                </h3>

                {error && (
                  <p className="text-red-500 text-sm text-center mb-4 font-poppins">
                    {error}
                  </p>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="max-h-[60vh] overflow-y-auto px-[1rem] pt-[2rem]">
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="telephone"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Telephone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="e.g., +2348031234567"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="location"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Location (State)
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Kano">Kano</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Oyo">Oyo</option>
                        {/* Add all 36 Nigerian states + FCT */}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="userType"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        User Role 
                      </label>
                      <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        required
                      >
                        <option value="seller">Farmer (Seller)</option>
                        <option value="buyer">Customer (Buyer)</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="profilePicture"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Profile Picture (Optional)
                      </label>
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="bio"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Brief Bio (Optional)
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="Tell us about yourself"
                        rows={4}
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
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-1 font-poppins ${
                            formData.password
                              ? Object.values(criteria)
                                  .slice(0, 4)
                                  .every((v) => v)
                                ? "border-green-500 focus:ring-green-500"
                                : "border-orange-300 focus:ring-orange-500"
                              : "border-gray-300 focus:ring-green-500"
                          }`}
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
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-1 font-poppins ${
                            formData.confirmPassword
                              ? criteria.matching
                                ? "border-green-500 focus:ring-green-500"
                                : "border-red-300 focus:ring-red-500"
                              : "border-gray-300 focus:ring-green-500"
                          }`}
                          placeholder="Confirm your password"
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

                    <div className="mb-4">
                      <label
                        htmlFor="businessInfo"
                        className="block text-gray-600 text-sm mb-2 font-poppins"
                      >
                        Business Information (Optional)
                      </label>
                      <textarea
                        id="businessInfo"
                        name="businessInfo"
                        value={formData.businessInfo}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 font-poppins"
                        placeholder="e.g., Business name, type of produce"
                        rows={4}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !Object.values(criteria).every((v) => v)}
                    className={`w-full py-3 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-poppins flex justify-center items-center mt-4 ${
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
                      "Sign Up"
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
                  Already have an account?{" "}
                  <Link
                    href="/authentication/login"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Log In
                  </Link>
                </p>
              </div>

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