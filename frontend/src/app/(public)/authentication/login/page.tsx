"use client";
import SigninForm from "./components/SigninForm";
import { useAuth } from "@/app/context/AuthContext";
import { useCallback } from "react";
import FourRoleSelection from "./components/RoleSelection";

export default function Register() {
  const { showLoginRole, setShowLoginRole, setSelectedRole } = useAuth();

  const handleRoleSelect = useCallback(
    (role: string) => {
      setSelectedRole(role);
      setShowLoginRole(true);
    },
    [setSelectedRole, setShowLoginRole]
  );

  return (
    <div className="mt-[7rem] bg-white">
      {showLoginRole ? (
        <FourRoleSelection onSelect={handleRoleSelect} />
      ) : (
        <SigninForm />
      )}
    </div>
  );
}
