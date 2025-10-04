"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons";
import { signIn } from "@/lib/services/auth";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface AuthFormProps {
  type: "signin" | "signup";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const isSignIn = type === "signin";
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuth } = useAuth();

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      await signIn();
      await checkAuth();
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='p-6 sm:p-8 bg-white dark:bg-[#171717] rounded-lg shadow-lg border border-gray-200 dark:border-[#2a2a2a]'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
            {isSignIn ? "Welcome back" : "Create account"}
          </h1>
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2'>
            {isSignIn
              ? "Sign in to your account to continue"
              : "Sign up to get started with SpeedAI"}
          </p>
        </div>

        <div className='space-y-4'>
          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            variant='outline'
            className='w-full h-11 sm:h-12 text-sm sm:text-base font-medium flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-[#202020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-gray-200 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white'>
            {isLoading ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-current'></div>
            ) : (
              <Google />
            )}
            {isLoading
              ? "Please wait..."
              : `${isSignIn ? "Sign in" : "Sign up"} with Google`}
          </Button>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300'>
            {isSignIn ? (
              <>
                Don't have an account?{" "}
                <Link
                  href='/auth/signup'
                  className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href='/auth/signin'
                  className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
