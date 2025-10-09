"use client";

import { landingPageContent } from "@/lib/constants";
import {
  Code2,
  Users,
  Zap,
  BarChart3,
  Shield,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  code: Code2,
  users: Users,
  zap: Zap,
  chart: BarChart3,
  shield: Shield,
  rocket: Rocket,
};

export function Features() {
  return (
    <section id='product' className='py-28 px-4'>
      <div className='max-w-7xl mx-auto space-y-16'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-8'>
          <div className='space-y-4 max-w-2xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-sky-200/70 dark:border-sky-500/40 bg-white/70 dark:bg-gray-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-sky-500 dark:text-sky-300'>
              Product
            </p>
            <h2 className='text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white leading-[1.05]'>
              The writing assistant built for teams that live in research
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
              SpeedAI combines research automation, live suggestion streams, and
              collaboration guardrails inside a single canvas that feels as
              sleek as your favorite design tool.
            </p>
          </div>
          <div className='grid gap-3 text-sm text-gray-600 dark:text-gray-300 md:text-right'>
            <span className='font-semibold text-gray-900 dark:text-white'>
              What you get:
            </span>
            <span>Structured briefs that cite every insight</span>
            <span>Real-time tone coaching inside the editor</span>
            <span>Playwright-powered preview checks before publish</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
          {landingPageContent.features.map((feature: any, index: number) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const isLarge = feature.size === "large";

            return (
              <div
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-slate-200/70 dark:border-slate-800/50 bg-white/80 dark:bg-gray-950/70 backdrop-blur-xl p-7 md:p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)]",
                  isLarge && "md:col-span-2"
                )}>
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      feature.gradient
                    )}></div>
                </div>
                <div className='relative z-10 space-y-5'>
                  <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300 group-hover:scale-110 transition-transform duration-300'>
                    <Icon className='w-6 h-6' />
                  </div>

                  <div className='space-y-3'>
                    <h3 className='text-xl md:text-2xl font-semibold text-gray-900 dark:text-white'>
                      {feature.title}
                    </h3>
                    <p className='text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>

                  <div className='pt-4'>
                    <span className='inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-300'>
                      Learn more
                      <ArrowRight className='ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
