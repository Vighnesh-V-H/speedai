"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getCurrentUser,
  refreshSession as refreshSessionRequest,
  signOut as signOutRequest,
  type Session,
  type User,
} from "@/lib/services/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const session: Session = await getCurrentUser();
      setUser(session.user);
    } catch (err: any) {
      setError(err.message || "Failed to check authentication");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await signOutRequest();
      setUser(null);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
    }
  };

  const refreshSession = async () => {
    try {
      setError(null);
      const userData = await refreshSessionRequest();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Failed to refresh session");
      setUser(null);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isOAuthCallback =
      urlParams.get("code") ||
      urlParams.get("state") ||
      window.location.pathname.includes("/auth/callback");

    if (isOAuthCallback) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,

    error,
    signOut,
    refreshSession,
    checkAuth,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext };
