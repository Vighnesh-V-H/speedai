"use client";

import { useState } from "react";
import Link from "next/link";
import { landingPageContent } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b border-transparent bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-[0_10px_60px_rgba(10,25,50,0.08)] dark:shadow-[0_10px_60px_rgba(0,0,0,0.35)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-[4.25rem]'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-3 group'>
            <div className='relative w-10 h-10'>
              <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity'></div>
              <div className='absolute inset-[2px] rounded-[0.65rem] bg-white dark:bg-gray-950 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]'>
                <span className='text-base font-semibold tracking-wide text-sky-600 dark:text-sky-300'>
                  SA
                </span>
              </div>
            </div>
            <span className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
              {landingPageContent.site.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-1 rounded-full border border-sky-200/50 dark:border-sky-500/30 bg-white/60 dark:bg-gray-900/40 px-2 py-1 backdrop-blur-md shadow-sm'>
            {landingPageContent.navigation.map(
              (item: { name: string; href: string }) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='text-sm font-medium px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-sky-100/70 dark:hover:text-white dark:hover:bg-sky-500/20 transition-colors duration-300'>
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Right side actions */}
          <div className='hidden md:flex items-center space-x-3'>
            <ThemeToggle />
            <Link href='/auth/signin'>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-300'>
                Sign In
              </Button>
            </Link>
            <Link href='/auth/signup'>
              <Button
                size='sm'
                className='group relative overflow-hidden bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 shadow-[0_10px_30px_rgba(56,189,248,0.35)]'>
                <span className='relative z-10'>Start Free</span>
                <span className='absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity'></span>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center space-x-2 md:hidden'>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
              {mobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-gray-200 dark:border-gray-800",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}>
        <nav className='px-4 py-4 space-y-3 bg-white dark:bg-gray-950'>
          {landingPageContent.navigation.map(
            (item: { name: string; href: string }) => (
              <Link
                key={item.name}
                href={item.href}
                className='block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-100/70 dark:hover:bg-sky-500/15 rounded-xl transition-all duration-300'
                onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            )
          )}
          <div className='pt-4 space-y-2'>
            <Link href='/auth/signin' className='block'>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white transition-all duration-300'>
                Sign In
              </Button>
            </Link>
            <Link href='/auth/signup' className='block'>
              <Button
                size='sm'
                className='w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 hover:brightness-110 text-white transition-all duration-300'>
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
