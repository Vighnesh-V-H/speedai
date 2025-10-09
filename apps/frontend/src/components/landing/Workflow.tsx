"use client";

import { landingPageContent } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function Workflow() {
  const { workflow } = landingPageContent;

  return (
    <section id='workflow' className='relative py-28 px-4'>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-sky-50/80 dark:via-slate-900/70 to-white/0'></div>
      <div className='max-w-7xl mx-auto flex flex-col gap-16'>
        <div className='max-w-2xl space-y-5'>
          <p className='inline-flex items-center gap-2 rounded-full border border-emerald-200/70 dark:border-emerald-500/40 bg-white/70 dark:bg-gray-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-emerald-500 dark:text-emerald-300'>
            Workflow
          </p>
          <h2 className='text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white leading-[1.05]'>
            {workflow.title}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
            {workflow.description}
          </p>
        </div>

        <div className='grid gap-10 md:gap-12'>
          {workflow.steps.map((step, index) => (
            <div
              key={step.title}
              style={{ transitionDelay: `${index * 60}ms` }}
              className='relative grid md:grid-cols-[90px_1fr] md:items-start gap-6 md:gap-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white/80 dark:bg-gray-950/70 p-6 md:p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.12)]'>
              <div className='space-y-3'>
                <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-semibold text-sky-600 dark:text-sky-300'>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className='hidden md:block h-full w-[2px] bg-gradient-to-b from-sky-400/30 via-cyan-400/20 to-emerald-300/30 mx-auto rounded-full'></div>
              </div>

              <div className='space-y-4'>
                <div className='flex flex-wrap items-center gap-3'>
                  <h3 className='text-xl md:text-2xl font-semibold text-gray-900 dark:text-white'>
                    {step.title}
                  </h3>
                  <span className='inline-flex items-center rounded-full border border-slate-200/80 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300'>
                    {step.subtitle}
                  </span>
                </div>
                <p className='text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {step.description}
                </p>
                <div className='flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300'>
                  Continue
                  <ArrowRight className='h-4 w-4' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
