import { landingPageContent } from "@/lib/constants";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = landingPageContent.testimonials;

  return (
    <section className='py-28 px-4'>
      <div className='max-w-6xl mx-auto space-y-12'>
        <div className='text-center space-y-4 max-w-3xl mx-auto'>
          <p className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 dark:border-slate-800/60 bg-white/70 dark:bg-gray-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300'>
            Voices
          </p>
          <h2 className='text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white'>
            Teams shipping research-heavy content love SpeedAI
          </h2>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          {testimonials.map((item) => (
            <div
              key={item.author}
              className='relative overflow-hidden rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white/85 dark:bg-gray-950/70 p-8 md:p-10 shadow-[0_35px_100px_rgba(15,23,42,0.18)] backdrop-blur'>
              <Quote className='absolute -top-4 -left-4 h-20 w-20 text-sky-100 dark:text-sky-900/30' />
              <div className='relative z-10 space-y-6'>
                <p className='text-lg text-gray-700 dark:text-gray-200 leading-relaxed'>
                  “{item.quote}”
                </p>
                <div className='space-y-1'>
                  <p className='text-base font-semibold text-gray-900 dark:text-white'>
                    {item.author}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
