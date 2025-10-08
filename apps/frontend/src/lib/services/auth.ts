import axios, { AxiosError, isAxiosError } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface Session {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const SESSION_CACHE_KEY = "session_cache";
const SESSION_TTL = 60 * 60 * 1000;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const toApiError = (error: unknown): ApiError => {
  if (isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status || 500,
    };
  }

  return {
    message: error instanceof Error ? error.message : "Something went wrong",
    status: 500,
  };
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cached = window.localStorage.getItem(SESSION_CACHE_KEY);
    if (cached) {
      const { user, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;

      if (age < SESSION_TTL) {
        return user;
      } else {
        window.localStorage.removeItem(SESSION_CACHE_KEY);
      }
    }

    const response = await api.get<AuthResponse>("/session");
    const user = response.data.user;

    localStorage.setItem(
      SESSION_CACHE_KEY,
      JSON.stringify({ user, timestamp: Date.now() })
    );

    return user;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(SESSION_CACHE_KEY);
      return null;
    }

    throw toApiError(error);
  }
};

export const signIn = async (): Promise<void> => {
  try {
    window.location.href = "http://localhost:8080/api/auth/signin/google";
  } catch (error) {
    throw toApiError(error);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await api.post("/signout");
  } catch (error) {
    throw toApiError(error);
  }
};

export const refreshSession = async (): Promise<User | null> => {
  try {
    const response = await api.post<AuthResponse>("/refresh");
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw toApiError(error);
  }
};

export const authService = {
  getCurrentUser,
  signIn,
  signOut,
  refreshSession,
};

export type AuthService = typeof authService;
