"use client";
import FourRoleSelection from "./components/RoleSelection";
import SignUpForm from "./components/SignupFom";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function Register() {
  const { selectedRole, setSelectedRole, showSignupForm, setShowSignupForm } =
    useAuth();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setShowSignupForm(true);
  };

  return (
    <div className="mt-[7rem]">
      <div className="bg-white gap-x-[3rem]">
        <div className="bg-white gap-x-[3rem]">
          {!showSignupForm && <FourRoleSelection onSelect={handleRoleSelect} />}
          {showSignupForm && <SignUpForm selectedRole={selectedRole} />}
        </div>
      </div>
    </div>
  );
}
