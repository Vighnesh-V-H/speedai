"use client";

import { landingPageContent } from "@/lib/constants";
import Link from "next/link";
import { Twitter, Github, Linkedin, MessageCircle } from "lucide-react";

const socialIconMap = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  discord: MessageCircle,
};

export function Footer() {
  return (
    <footer className='border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]'>
      <div className='mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 md:py-20'>
        <div className='grid grid-cols-2 gap-10 md:grid-cols-6'>
          <div className='col-span-2 space-y-6'>
            <Link href='/' className='inline-flex items-center space-x-3 group'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] text-sm font-semibold tracking-[0.2em] text-[hsl(var(--foreground))]'>
                SA
              </div>
              <span className='text-xl font-semibold text-[hsl(var(--foreground))]'>
                {landingPageContent.site.name}
              </span>
            </Link>
            <p className='max-w-sm text-sm leading-relaxed text-[hsl(var(--muted-foreground))]'>
              {landingPageContent.footer.description}
            </p>
            <div className='flex items-center gap-3'>
              {landingPageContent.footer.social.map(
                (social: { name: string; href: string; icon: string }) => {
                  const Icon =
                    socialIconMap[social.icon as keyof typeof socialIconMap];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition hover:-translate-y-1 hover:text-[hsl(var(--accent))]'>
                      <span className='flex h-full w-full items-center justify-center'>
                        <Icon className='h-4 w-4' />
                      </span>
                    </a>
                  );
                }
              )}
            </div>
          </div>

          {landingPageContent.footer.columns.map(
            (column: {
              title: string;
              links: Array<{ name: string; href: string }>;
            }) => (
              <div key={column.title} className='space-y-4'>
                <h3 className='text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--muted-foreground))]'>
                  {column.title}
                </h3>
                <ul className='space-y-3'>
                  {column.links.map((link: { name: string; href: string }) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className='text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div className='flex flex-col gap-6 border-t border-[hsl(var(--border))] pt-8 text-sm text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between'>
          <p>{landingPageContent.footer.copyright}</p>
          <div className='flex flex-wrap gap-6'>
            <Link
              href='/privacy'
              className='transition-colors hover:text-[hsl(var(--foreground))]'>
              Privacy
            </Link>
            <Link
              href='/terms'
              className='transition-colors hover:text-[hsl(var(--foreground))]'>
              Terms
            </Link>
            <Link
              href='/cookies'
              className='transition-colors hover:text-[hsl(var(--foreground))]'>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
