"use client";

import { Button } from "@/components/ui/button";
import { landingPageContent } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      className='relative overflow-hidden pt-28 pb-24 md:pb-32'
      id='hero'>
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-[-20%] left-[5%] w-[420px] h-[420px] bg-sky-300/35 dark:bg-sky-500/25 rounded-full blur-3xl'></div>
        <div className='absolute top-[10%] right-[-10%] w-[520px] h-[520px] bg-emerald-300/30 dark:bg-emerald-400/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-[-30%] left-[30%] w-[600px] h-[600px] bg-violet-300/25 dark:bg-violet-500/20 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-12 gap-16 items-center'>
          <div className='lg:col-span-6 space-y-8 relative'>
            <div className='inline-flex items-center gap-2 rounded-full border border-sky-200/70 dark:border-sky-500/40 bg-white/70 dark:bg-gray-900/60 px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-300 backdrop-blur'>
              <Sparkles className='w-4 h-4' />
              {landingPageContent.hero.badge}
            </div>

            <h1 className='text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white leading-[1.05]'>
              {landingPageContent.hero.title}
            </h1>

            <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl'>
              {landingPageContent.hero.description}
            </p>

            <ul className='space-y-3'>
              {landingPageContent.hero.highlights?.map((highlight, index) => (
                <li
                  key={highlight}
                  className='flex items-start gap-3 text-sm md:text-base text-gray-600 dark:text-gray-300'>
                  <div className='mt-[6px] flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300'>
                    <span className='text-[11px] font-semibold'>
                      {index + 1}
                    </span>
                  </div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className='flex flex-wrap gap-3 pt-4'>
              <Link href={landingPageContent.hero.primaryCta.href}>
                <Button
                  size='lg'
                  className='group relative overflow-hidden rounded-full bg-sky-500 px-8 py-6 text-base font-semibold text-white transition-all duration-300 shadow-[0_20px_45px_rgba(56,189,248,0.35)]'>
                  <span className='relative z-10 flex items-center'>
                    {landingPageContent.hero.primaryCta.text}
                    <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                  </span>
                  <span className='absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                </Button>
              </Link>
              <Link href={landingPageContent.hero.secondaryCta.href}>
                <Button
                  size='lg'
                  variant='outline'
                  className='rounded-full border-2 border-sky-500 px-7 py-6 text-base font-semibold text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-all duration-300'>
                  {landingPageContent.hero.secondaryCta.text}
                </Button>
              </Link>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-sky-100/70 dark:border-sky-900/60 mt-8'>
              {landingPageContent.hero.stats.map(
                (stat: { value: string; label: string }) => (
                  <div key={stat.label} className='space-y-1'>
                    <p className='text-3xl font-semibold text-gray-900 dark:text-white'>
                      {stat.value}
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {stat.label}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className='lg:col-span-6 relative'>
            <div className='relative rounded-3xl border border-white/60 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-[0_40px_120px_rgba(15,23,42,0.18)] px-8 pt-10 pb-8 overflow-hidden'>
              <div className='absolute inset-x-8 top-0 h-32 rounded-full bg-gradient-to-r from-sky-400/40 via-cyan-400/35 to-violet-400/30 blur-3xl'></div>
              <div className='relative space-y-6'>
                <div className='flex items-center justify-between rounded-2xl border border-sky-100/70 dark:border-sky-900/40 bg-sky-50/80 dark:bg-sky-900/30 p-4 shadow-sm'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.2em] text-sky-500/80 dark:text-sky-300/80'>
                      Research brief
                    </p>
                    <h3 className='mt-1 text-lg font-semibold text-gray-900 dark:text-white'>
                      Clean energy policy 2025
                    </h3>
                  </div>
                  <span className='rounded-full bg-white/80 dark:bg-gray-950/80 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-300 shadow-sm'>
                    Syncing sources
                  </span>
                </div>

                <div className='grid gap-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/60 dark:bg-gray-950/60 p-4 shadow-inner'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500'>
                      Suggested paragraph
                    </p>
                    <p className='mt-2 text-sm text-gray-700 dark:text-gray-200 leading-relaxed'>
                      "Solar adoption in urban centers jumped 38%
                      year-over-year, driven by municipal incentives that favor
                      multifamily retrofits. Cities that bundled grants with
                      public dashboards saw the fastest acceleration."
                    </p>
                  </div>
                  <div className='flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400'>
                    <span className='rounded-full bg-sky-100/70 dark:bg-sky-800/40 px-2 py-1 font-medium text-sky-600 dark:text-sky-300'>
                      Tone: Insightful
                    </span>
                    <span className='rounded-full bg-emerald-100/70 dark:bg-emerald-900/40 px-2 py-1 font-medium text-emerald-600 dark:text-emerald-300'>
                      Cited ×3
                    </span>
                    <span className='rounded-full bg-violet-100/70 dark:bg-violet-900/40 px-2 py-1 font-medium text-violet-500 dark:text-violet-300'>
                      Reading grade 9
                    </span>
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/70 dark:bg-gray-950/70 p-4 shadow-sm'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500'>
                      Realtime suggestions
                    </p>
                    <ul className='mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                      <li className='flex items-start gap-2'>
                        <span className='mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400/90'></span>
                        Strengthen claim with a statistic from BloombergNEF 2024
                        report.
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/90'></span>
                        Soften language to emphasize municipal partnerships over
                        mandates.
                      </li>
                    </ul>
                  </div>
                  <div className='rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-emerald-400/15 p-4 text-sm text-gray-700 dark:text-gray-200 shadow-sm'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500'>
                      Source spotlight
                    </p>
                    <div className='mt-3 space-y-3'>
                      <div className='rounded-xl bg-white/60 dark:bg-gray-950/60 px-3 py-2 shadow-sm'>
                        <p className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                          BloombergNEF
                        </p>
                        <p className='text-sm font-semibold text-gray-800 dark:text-white'>
                          Global Solar Outlook 2024
                        </p>
                      </div>
                      <div className='rounded-xl bg-white/60 dark:bg-gray-950/60 px-3 py-2 shadow-sm'>
                        <p className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                          US Dept. of Energy
                        </p>
                        <p className='text-sm font-semibold text-gray-800 dark:text-white'>
                          Community Solar Scorecard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
