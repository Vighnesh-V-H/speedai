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
    <section id='product' className='border-b border-[hsl(var(--border))] py-24'>
      <div className='mx-auto flex max-w-6xl flex-col gap-16 px-4'>
        <div className='grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end'>
          <div className='space-y-4'>
            <p className='text-xs font-medium uppercase tracking-[0.45em] text-[hsl(var(--accent))]'>
              Product
            </p>
            <h2 className='text-3xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
              The writing assistant built for teams that live in research
            </h2>
            <p className='text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg'>
              SpeedAI combines research automation, live suggestion streams, and collaboration guardrails inside a single canvas that feels as intentional as your best strategic memo.
            </p>
          </div>
          <div className='grid gap-3 text-sm text-[hsl(var(--muted-foreground))] md:text-right'>
            <span className='text-[hsl(var(--foreground))]'>What teams notice first:</span>
            <span>Structured briefs that cite every insight</span>
            <span>Real-time tone coaching in the editor</span>
            <span>Playwright checks before anything ships</span>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {landingPageContent.features.map((feature: any) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <div
                key={feature.title}
                className={cn(
                  "flex min-h-[240px] flex-col justify-between rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-[0_14px_45px_rgba(15,15,15,0.08)] transition-transform duration-300 hover:-translate-y-1"
                )}>
                <div className='space-y-4'>
                  <div className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))]'>
                    <Icon className='h-5 w-5' />
                  </div>
                  <div className='space-y-3'>
                    <h3 className='text-lg font-semibold text-[hsl(var(--foreground))]'>
                      {feature.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-[hsl(var(--muted-foreground))]'>
                      {feature.description}
                    </p>
                  </div>
                </div>
                <span className='mt-6 inline-flex items-center text-sm font-medium text-[hsl(var(--accent))]'>
                  Learn more
                  <ArrowRight className='ml-2 h-4 w-4' />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
