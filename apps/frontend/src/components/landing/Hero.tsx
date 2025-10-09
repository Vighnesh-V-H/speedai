"use client";

import { Button } from "@/components/ui/button";
import { landingPageContent } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id='hero' className='border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]'>
      <div className='mx-auto grid max-w-6xl gap-16 px-4 py-24 md:grid-cols-2 md:py-28'>
        <div className='space-y-8'>
          <span className='inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.45em] text-[hsl(var(--accent))]'>
            <Sparkles className='h-3.5 w-3.5' />
            {landingPageContent.hero.badge}
          </span>
          <h1 className='text-4xl font-semibold leading-tight text-[hsl(var(--primary))] md:text-5xl'>
            {landingPageContent.hero.title}
          </h1>
          <p className='max-w-xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg'>
            {landingPageContent.hero.description}
          </p>

          <ul className='space-y-3 text-sm text-[hsl(var(--muted-foreground))] md:text-base'>
            {landingPageContent.hero.highlights?.map((highlight) => (
              <li key={highlight} className='flex items-start gap-3'>
                <span className='mt-1 inline-flex h-2 w-8 flex-none bg-[hsl(var(--accent))]'></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className='flex flex-wrap items-center gap-3 pt-4'>
            <Link href={landingPageContent.hero.primaryCta.href}>
              <Button
                size='lg'
                className='rounded-full bg-[hsl(var(--primary))] px-7 py-5 text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-hover))]'>
                <span className='flex items-center gap-2'>
                  {landingPageContent.hero.primaryCta.text}
                  <ArrowRight className='h-4 w-4' />
                </span>
              </Button>
            </Link>
            <Link href={landingPageContent.hero.secondaryCta.href} className='text-sm font-medium text-[hsl(var(--foreground))] underline-offset-4 hover:underline'>
              {landingPageContent.hero.secondaryCta.text}
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-6 pt-10 text-sm text-[hsl(var(--muted-foreground))] md:grid-cols-3'>
            {landingPageContent.hero.stats.map((stat) => (
              <div key={stat.label} className='space-y-1'>
                <p className='text-2xl font-semibold text-[hsl(var(--primary))]'>{stat.value}</p>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-between gap-6 rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-[0_20px_60px_rgba(15,15,15,0.08)]'>
          <div className='space-y-3'>
            <p className='text-xs font-semibold uppercase tracking-[0.45em] text-[hsl(var(--muted-foreground))]'>
              Today’s workspace
            </p>
            <p className='text-lg font-medium text-[hsl(var(--primary))]'>
              Clean energy policy briefing
            </p>
            <p className='text-sm leading-relaxed text-[hsl(var(--muted-foreground))]'>
              Notes, sources, and draft all in one document. Every change keeps citations aligned so the team can ship without second guessing.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='flex items-start justify-between gap-4 rounded-2xl border border-[hsl(var(--border))] px-4 py-3'>
              <div>
                <p className='text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]'>
                  Inline suggestions
                </p>
                <p className='mt-2 text-sm text-[hsl(var(--foreground))]'>
                  “Lead with the 2025 adoption data to anchor the opening paragraph.”
                </p>
              </div>
              <span className='rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs font-medium text-[hsl(var(--accent))]'>
                Ready
              </span>
            </div>

            <div className='grid gap-3 text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]'>
              <div className='flex items-center justify-between border-b border-[hsl(var(--border))] pb-2'>
                <span>Sources synced</span>
                <span className='font-medium text-[hsl(var(--accent))]'>3</span>
              </div>
              <div className='flex items-center justify-between border-b border-[hsl(var(--border))] pb-2'>
                <span>Tone</span>
                <span className='font-medium text-[hsl(var(--foreground))]'>Analytical</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Status</span>
                <span className='font-medium text-[hsl(var(--foreground))]'>Reviewer pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
