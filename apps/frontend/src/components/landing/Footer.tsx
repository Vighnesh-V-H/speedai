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
    <footer className='relative border-t border-transparent bg-gradient-to-b from-white via-white/90 to-slate-100 dark:from-gray-950 dark:via-gray-950/95 dark:to-slate-950'>
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent'></div>
      <div className='max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16'>
        <div className='grid grid-cols-2 md:grid-cols-6 gap-10'>
          <div className='col-span-2 space-y-6'>
            <Link href='/' className='inline-flex items-center space-x-3 group'>
              <div className='relative w-10 h-10'>
                <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity'></div>
                <div className='absolute inset-[2px] rounded-[0.65rem] bg-white dark:bg-gray-950 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]'>
                  <span className='text-base font-semibold tracking-wide text-sky-600 dark:text-sky-300'>
                    SA
                  </span>
                </div>
              </div>
              <span className='text-xl font-semibold text-gray-900 dark:text-white'>
                {landingPageContent.site.name}
              </span>
            </Link>
            <p className='text-sm text-gray-600 dark:text-gray-400 max-w-sm'>
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
                      className='group/social relative h-10 w-10 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/80 dark:bg-gray-950/70 text-slate-500 dark:text-slate-300 transition hover:-translate-y-1 hover:border-sky-500 hover:text-sky-500'>
                      <div className='absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-sky-500/15 via-cyan-500/15 to-emerald-400/15'></div>
                      <span className='relative z-10 flex h-full w-full items-center justify-center'>
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
                <h3 className='text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400'>
                  {column.title}
                </h3>
                <ul className='space-y-3'>
                  {column.links.map((link: { name: string; href: string }) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className='text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-slate-200/80 dark:border-slate-800/60 pt-8 text-sm text-gray-500 dark:text-gray-400'>
          <p>{landingPageContent.footer.copyright}</p>
          <div className='flex flex-wrap gap-6'>
            <Link
              href='/privacy'
              className='hover:text-sky-600 dark:hover:text-sky-300 transition-colors'>
              Privacy
            </Link>
            <Link
              href='/terms'
              className='hover:text-sky-600 dark:hover:text-sky-300 transition-colors'>
              Terms
            </Link>
            <Link
              href='/cookies'
              className='hover:text-sky-600 dark:hover:text-sky-300 transition-colors'>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
