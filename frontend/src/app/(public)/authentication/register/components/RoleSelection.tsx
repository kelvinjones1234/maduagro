import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

type Props = {
  onSelect: (role: string) => void;
};

const FourRoleSelection = ({ onSelect }: Props) => {
  const [selectedRole, setSelectedRole] = useState("");
  const { register } = useAuth();

  const roles = [
    {
      id: "regular seller",
      title: "I'm a regular seller",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
    },
    {
      id: "wholesaler",
      title: "I'm a wholesaler",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
        </svg>
      ),
    },
    {
      id: "regular buyer",
      title: "I'm a regular buyer",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      id: "bulk buyer",
      title: "I'm a bulk buyer",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05" />
          <path d="M12 22.08V12" />
        </svg>
      ),
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  return (
    <div className="min-h-screen flex flex-col text-[clamp(.9rem,4vw,1.3rem)] items-center bg-white p-4">
      <h1 className="font-semibold mb-8 text-center text-gray-800 text-2xl">
        Join as a Seller or Buyer
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`border rounded-lg p-6 flex items-center cursor-pointer transition-all duration-200
              ${
                selectedRole === role.id
                  ? "border-green-500 ring-1 ring-green-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <div className="mr-4 text-gray-700">{role.icon}</div>
            <div>
              <p className="font-medium">{role.title}</p>
            </div>
            <div className="ml-auto">
              {selectedRole === role.id ? (
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border border-gray-300"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => selectedRole && onSelect(selectedRole)}
        disabled={!selectedRole}
        className={`mt-8 text-[clamp(.7rem,4vw,1rem)] px-6 py-3 font-medium rounded-md transition-colors duration-200
    ${
      selectedRole
        ? "bg-green-600 text-white hover:bg-green-700 hover:text-white"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
      >
        {selectedRole
          ? `Join as a ${selectedRole.replace(/-/g, " ")}`
          : `Create an account`}
      </button>

      <p className="mt-4 text-gray-600 text-[clamp(.7rem,4vw,1rem)]">
        Already have an account?{" "}
        <a href="#" className="text-green-600 hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
};

export default FourRoleSelection;
