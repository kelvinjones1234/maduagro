"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log(
    "ProtectedRoute - loading:",
    loading,
    "user:",
    user,
    "user.email:",
    user?.email
  );

  useEffect(() => {
    console.log("ProtectedRoute useEffect - loading:", loading, "user:", user);
    if (!loading && !user) {
      console.log("Redirecting to /authentication/login");
      router.push("/authentication/login");
    }
  }, [user, loading, router]);

  if (loading) {
    console.log("Rendering loading state...");
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
