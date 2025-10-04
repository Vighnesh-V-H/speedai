"use client";

import { AuthForm } from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <AuthForm type='signin' />
      </div>
    </div>
  );
}
