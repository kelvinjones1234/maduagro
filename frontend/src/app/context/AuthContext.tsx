"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  profile_types: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    user_type: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth status...");
        const res = await fetch("http://localhost:8000/api/user/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Auth check response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("Auth check response data:", data);
          if (data.email && Array.isArray(data.profile_types)) {
            setUser(data); // Set user only if data matches expected structure
          } else {
            console.error("Invalid user data structure:", data);
          }
        } else {
          console.error("Auth check failed:", await res.text());
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
        console.log("Auth check complete, loading:", false, "user:", user);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with:", { email });
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response status:", res.status);
      if (!res.ok) {
        const errorData = await res.text();
        console.error("Login failed:", errorData);
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      console.log("Login response data:", data);
      if (data.email && Array.isArray(data.profile_types)) {
        setUser(data);
        console.log("Associated profile types:", data.profile_types);
        router.push("/dashboard/farmer");
        return true;
      } else {
        console.error("Invalid login response data:", data);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Register function
  const register = async (
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    user_type: string
  ): Promise<boolean> => {
    try {
      console.log("Attempting registration with:", { email, user_type });
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          password,
          user_type,
        }),
      });

      console.log("Register response status:", res.status);
      if (!res.ok) {
        const errorData = await res.text();
        console.error("Registration failed:", errorData);
        throw new Error("Registration failed");
      }

      const data = await res.json();
      console.log("Register response data:", data);
      if (data.email && Array.isArray(data.profile_types)) {
        setUser(data);
        router.push("/dashboard/farmer");
        return true;
      } else {
        console.error("Invalid register response data:", data);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("Attempting logout...");
      const res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
      });
      console.log("Logout response status:", res.status);
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    router.push("/authentication/login");
    console.log("Logout complete, user:", null);
  };

  // Token refresh function
  const refreshToken = async () => {
    try {
      console.log("Attempting token refresh...");
      const res = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        credentials: "include",
      });

      console.log("Token refresh response status:", res.status);
      if (res.ok) {
        const userRes = await fetch("http://localhost:8000/api/user/", {
          method: "GET",
          credentials: "include",
        });
        console.log("User refresh response status:", userRes.status);
        if (userRes.ok) {
          const data = await userRes.json();
          console.log("User refresh response data:", data);
          if (data.email && Array.isArray(data.profile_types)) {
            setUser(data);
            return true;
          } else {
            console.error("Invalid user refresh data:", data);
          }
        }
        return false;
      }
      console.error("Token refresh failed:", await res.text());
      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  };

  // Periodically refresh token
  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        console.log("Running periodic token refresh...");
        const refreshed = await refreshToken();
        if (!refreshed) {
          console.log("Token refresh failed, logging out...");
          logout();
        }
      }
    }, 55 * 60 * 1000); // Refresh every 55 minutes

    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
