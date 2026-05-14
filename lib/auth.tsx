"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authAPI, getToken, setToken, clearToken } from "./api";

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  phone: string;
  email?: string;
  customerIdentifier?: string;
  businessType?: string;
  virtualAccountNumber?: string;
  bankCode?: string;
  creditScore: number;
  creditTier: string;
  kycStatus: string;
  skills: string[];
  state?: string;
  lga?: string;
  isOnboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, pin: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refresh = async () => {
    try {
      if (!getToken()) return;
      const res = await authAPI.me();
      setUser(res.data.user);
    } catch {
      clearToken();
      setUser(null);
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const login = async (phone: string, pin: string) => {
    const res = await authAPI.login({ phone, pin });
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    clearToken();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}