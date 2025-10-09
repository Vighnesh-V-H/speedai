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
    <header className='sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-white/90 backdrop-blur-sm dark:bg-[hsl(var(--background))]/90'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between gap-6'>
          <Link href='/' className='flex items-center gap-2 text-sm font-semibold tracking-[0.35em] uppercase text-[hsl(var(--primary))]'>
            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--primary))] text-xs'>
              SA
            </span>
            {landingPageContent.site.name}
          </Link>

          <nav className='hidden md:flex items-center gap-6 text-sm text-[hsl(var(--foreground))]'>
            {landingPageContent.navigation.map(
              (item: { name: string; href: string }) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='transition-colors hover:text-[hsl(var(--accent))]'>
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className='hidden md:flex items-center gap-3'>
            <ThemeToggle />
            <Link href='/auth/signin' className='text-sm text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]'>
              Sign in
            </Link>
            <Link href='/auth/signup'>
              <Button
                size='sm'
                className='rounded-full bg-[hsl(var(--primary))] px-5 text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-hover))]'>
                Start free
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))]'>
            {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-[hsl(var(--border))] transition-all duration-200",
          mobileMenuOpen ? "max-h-80" : "max-h-0"
        )}>
        <nav className='space-y-4 px-4 py-6 text-sm text-[hsl(var(--foreground))]'>
          {landingPageContent.navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='block rounded-md px-2 py-2 transition-colors hover:bg-[hsl(var(--secondary))]'
              onClick={() => setMobileMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
          <div className='pt-2 flex flex-col gap-3'>
            <Link
              href='/auth/signin'
              className='rounded-full border border-[hsl(var(--border))] px-3 py-2 text-center transition-colors hover:border-[hsl(var(--accent))]'>
              Sign in
            </Link>
            <Link href='/auth/signup'>
              <Button className='w-full rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-hover))]'>
                Start free
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
