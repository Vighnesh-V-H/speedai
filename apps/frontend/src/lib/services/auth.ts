import axios, { AxiosError, isAxiosError } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
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

const emptySession = (): Session => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
});

export const getCurrentUser = async (): Promise<Session> => {
  try {
    const response = await api.get<AuthResponse>("/session");
    return {
      user: response.data.user,
      isLoading: false,
      isAuthenticated: true,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return emptySession();
    }

    throw toApiError(error);
  }
};

export const signIn = async (): Promise<void> => {
  try {
    await api.post("/signin/google");
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
