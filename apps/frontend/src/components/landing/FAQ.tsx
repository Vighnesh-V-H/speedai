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
    <section id='faq' className='relative py-28 px-4'>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-slate-100/60 dark:via-slate-900/60 to-white/0'></div>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16 space-y-4'>
          <h2 className='text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white'>
            Frequently asked, quickly answered
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Can't find what you're looking for?{" "}
            <a
              href='/contact'
              className='text-sky-600 dark:text-sky-300 underline-offset-4 hover:underline'>
              Contact us
            </a>
          </p>
        </div>

        <Accordion
          type='single'
          collapsible
          defaultValue={landingPageContent.faq[0]?.question}
          className='space-y-4'>
          {landingPageContent.faq.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className='overflow-hidden rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-gray-950/70 backdrop-blur shadow-[0_20px_70px_rgba(15,23,42,0.12)] px-6 md:px-8'>
              <AccordionTrigger className='py-6 text-lg font-semibold text-gray-900 dark:text-white'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-base text-gray-600 dark:text-gray-300'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-16 text-center space-y-4'>
          <p className='text-gray-600 dark:text-gray-400'>
            Still have questions?
          </p>
          <a
            href='/contact'
            className='inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition'>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
