"use client";
import React, { useState, useEffect } from "react";
import { User, LogOut, Loader2 } from "lucide-react";

const API_URL = "http://localhost:8080";

export default function AuthDemo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // setUser(data);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_URL}/api/auth/signin/google`;
  };

  const handleSignOut = async () => {
    try {
      await fetch(`${API_URL}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <Loader2 className='w-8 h-8 animate-spin text-indigo-600' />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <User className='w-8 h-8 text-indigo-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome</h1>
            <p className='text-gray-600'>Sign in to continue to your account</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className='w-full bg-white border-2 border-gray-300 rounded-lg px-6 py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-medium text-gray-700'>
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Sign in with Google
          </button>

          <p className='text-center text-sm text-gray-500 mt-6'>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  // return (
  //   <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
  //     <div className='max-w-4xl mx-auto pt-20'>
  //       <div className='bg-white rounded-2xl shadow-xl p-8'>
  //         <div className='flex items-start justify-between mb-8'>
  //           <div className='flex items-center gap-4'>
  //             {user.image ? (
  //               <img
  //                 src={user.image}
  //                 alt={user.name || "User"}
  //                 className='w-20 h-20 rounded-full border-4 border-indigo-100'
  //               />
  //             ) : (
  //               <div className='w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center'>
  //                 <User className='w-10 h-10 text-indigo-600' />
  //               </div>
  //             )}
  //             <div>
  //               <h1 className='text-3xl font-bold text-gray-900'>
  //                 {user.name || "User"}
  //               </h1>
  //               <p className='text-gray-600'>{user.email}</p>
  //             </div>
  //           </div>
  //           <button
  //             onClick={handleSignOut}
  //             className='flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium'>
  //             <LogOut className='w-4 h-4' />
  //             Sign Out
  //           </button>
  //         </div>

  //         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  //           <div className='bg-gray-50 rounded-lg p-6'>
  //             <h2 className='text-lg font-semibold text-gray-900 mb-4'>
  //               Account Information
  //             </h2>
  //             <div className='space-y-3'>
  //               <div>
  //                 <p className='text-sm text-gray-600'>User ID</p>
  //                 <p className='font-mono text-sm text-gray-900 break-all'>
  //                   {user.id}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className='text-sm text-gray-600'>Email Verified</p>
  //                 <p className='text-sm text-gray-900'>
  //                   {user.email_verified ? (
  //                     <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
  //                       Verified
  //                     </span>
  //                   ) : (
  //                     <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
  //                       Not Verified
  //                     </span>
  //                   )}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className='text-sm text-gray-600'>Member Since</p>
  //                 <p className='text-sm text-gray-900'>
  //                   {new Date(user.created_at).toLocaleDateString("en-US", {
  //                     year: "numeric",
  //                     month: "long",
  //                     day: "numeric",
  //                   })}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>

  //           <div className='bg-indigo-50 rounded-lg p-6'>
  //             <h2 className='text-lg font-semibold text-gray-900 mb-4'>
  //               Quick Stats
  //             </h2>
  //             <div className='space-y-4'>
  //               <div className='flex justify-between items-center'>
  //                 <span className='text-gray-600'>Login Method</span>
  //                 <span className='font-medium text-gray-900'>
  //                   Google OAuth
  //                 </span>
  //               </div>
  //               <div className='flex justify-between items-center'>
  //                 <span className='text-gray-600'>Account Status</span>
  //                 <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
  //                   Active
  //                 </span>
  //               </div>
  //               <div className='flex justify-between items-center'>
  //                 <span className='text-gray-600'>Security</span>
  //                 <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
  //                   OAuth Protected
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
