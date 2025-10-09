"use client";

import { landingPageContent } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function Workflow() {
  const { workflow } = landingPageContent;

  return (
    <section id='workflow' className='border-b border-[hsl(var(--border))] py-24'>
      <div className='mx-auto flex max-w-6xl flex-col gap-16 px-4'>
        <div className='max-w-2xl space-y-5'>
          <p className='text-xs font-medium uppercase tracking-[0.45em] text-[hsl(var(--accent))]'>
            Workflow
          </p>
          <h2 className='text-3xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
            {workflow.title}
          </h2>
          <p className='text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg'>
            {workflow.description}
          </p>
        </div>

        <div className='grid gap-8 md:gap-10'>
          {workflow.steps.map((step, index) => (
            <div
              key={step.title}
              className='grid gap-6 rounded-3xl border border-[hsl(var(--border))] bg-white p-6 transition duration-300 hover:-translate-y-1 md:grid-cols-[72px_1fr] md:p-8'>
              <div className='flex flex-col items-start gap-4'>
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--border))] text-sm font-medium tracking-[0.35em] text-[hsl(var(--accent))]'>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className='hidden h-full w-px bg-[hsl(var(--border))] md:block' />
              </div>

              <div className='space-y-4'>
                <div className='flex flex-wrap items-center gap-3'>
                  <h3 className='text-xl font-semibold text-[hsl(var(--foreground))] md:text-2xl'>
                    {step.title}
                  </h3>
                  <span className='rounded-full border border-[hsl(var(--border))] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]'>
                    {step.subtitle}
                  </span>
                </div>
                <p className='text-sm leading-relaxed text-[hsl(var(--muted-foreground))] md:text-base'>
                  {step.description}
                </p>
                <div className='flex items-center gap-2 text-sm font-medium text-[hsl(var(--accent))]'>
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
