"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function AuthStatus() {
  const {
    user,
    loading,
    error,
    isAuthenticated,
    signOut,
    refreshSession,
    checkAuth,
  } = useAuth();

  if (loading) {
    return (
      <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
        <p className='text-blue-700 dark:text-blue-300'>
          🔄 Loading authentication status...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
        <p className='text-red-700 dark:text-red-300'>❌ Auth Error: {error}</p>
        <Button
          onClick={checkAuth}
          variant='outline'
          size='sm'
          className='mt-2'>
          Retry
        </Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='p-4 bg-gray-50 dark:bg-[#262626] rounded-lg border border-gray-200 dark:border-[#2a2a2a]'>
        <p className='text-gray-700 dark:text-gray-300'>🔓 Not authenticated</p>
        <div className='mt-2 space-x-2'>
          <Button
            onClick={() => (window.location.href = "/auth/signin")}
            size='sm'>
            Sign In
          </Button>
          <Button onClick={checkAuth} variant='outline' size='sm'>
            Check Auth
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
      <h3 className='font-semibold text-green-800 dark:text-green-200 mb-2'>
        ✅ Authenticated User
      </h3>

      <div className='space-y-1 text-sm text-green-700 dark:text-green-300'>
        <p>
          <strong>Name:</strong> {user?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p>
          <strong>Provider:</strong> {user?.provider || "N/A"}
        </p>
        <p>
          <strong>ID:</strong> {user?.id || "N/A"}
        </p>
        {user?.picture && (
          <p>
            <strong>Picture:</strong>{" "}
            <span className='text-xs break-all'>{user.picture}</span>
          </p>
        )}
      </div>

      <div className='mt-3 space-x-2'>
        <Button onClick={signOut} variant='outline' size='sm'>
          Sign Out
        </Button>
        <Button onClick={refreshSession} variant='outline' size='sm'>
          Refresh Session
        </Button>
        <Button onClick={checkAuth} variant='outline' size='sm'>
          Check Auth
        </Button>
      </div>
    </div>
  );
}
