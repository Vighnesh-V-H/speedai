import { landingPageContent } from "@/lib/constants";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = landingPageContent.testimonials;

  return (
    <section className='border-b border-[hsl(var(--border))] py-24'>
      <div className='mx-auto flex max-w-6xl flex-col gap-12 px-4'>
        <div className='mx-auto max-w-3xl space-y-3 text-center'>
          <p className='text-xs font-medium uppercase tracking-[0.45em] text-[hsl(var(--accent))]'>
            Voices
          </p>
          <h2 className='text-3xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
            Teams shipping research-heavy content love SpeedAI
          </h2>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          {testimonials.map((item) => (
            <div
              key={item.author}
              className='flex h-full flex-col justify-between gap-6 rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-[0_28px_100px_rgba(15,15,15,0.12)]'>
              <Quote className='h-8 w-8 text-[hsl(var(--accent))]' />
              <p className='text-base leading-relaxed text-[hsl(var(--muted-foreground))]'>
                “{item.quote}”
              </p>
              <div className='space-y-1 text-left'>
                <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--foreground))]'>
                  {item.author}
                </p>
                <p className='text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]'>
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
