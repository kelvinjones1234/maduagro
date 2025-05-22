"use client";
import FourRoleSelection from "./components/RoleSelection";
import SignUpForm from "./components/SignupFom";
import { useState } from "react";

export default function Register() {
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div className="mt-[7rem]">
      <div className="bg-white gap-x-[3rem]">
        <div className="bg-white gap-x-[3rem]">
          {!showSignupForm && (
            <FourRoleSelection onSelect={() => setShowSignupForm(true)} />
          )}
          {showSignupForm && <SignUpForm />}
        </div>
      </div>
    </div>
  );
}
