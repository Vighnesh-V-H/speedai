"use client";

import { landingPageContent } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id='faq' className='border-b border-[hsl(var(--border))] py-24'>
      <div className='mx-auto max-w-4xl px-4'>
        <div className='mb-14 space-y-4 text-center'>
          <h2 className='text-3xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
            Frequently asked, quickly answered
          </h2>
          <p className='text-base text-[hsl(var(--muted-foreground))] md:text-lg'>
            Can't find what you're looking for?{" "}
            <a
              href='/contact'
              className='text-[hsl(var(--accent))] underline-offset-4 hover:underline'>
              Contact us
            </a>
          </p>
        </div>

        <Accordion
          type='single'
          collapsible
          defaultValue={landingPageContent.faq[0]?.question}
          className='space-y-3'>
          {landingPageContent.faq.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className='overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white px-6 md:px-8'>
              <AccordionTrigger className='py-6 text-left text-lg font-semibold text-[hsl(var(--foreground))]'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-6 text-sm text-[hsl(var(--muted-foreground))] md:text-base'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-14 space-y-3 text-center'>
          <p className='text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]'>
            Still have questions?
          </p>
          <a
            href='/contact'
            className='inline-flex items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] px-8 py-3 text-sm font-medium text-[hsl(var(--background))] hover:bg-[hsl(var(--primary-hover))]'>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
