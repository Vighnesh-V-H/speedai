import { landingPageContent } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const { pricing } = landingPageContent;

  return (
    <section id='pricing' className='border-b border-[hsl(var(--border))] py-24'>
      <div className='mx-auto flex max-w-6xl flex-col gap-14 px-4'>
        <div className='mx-auto max-w-2xl space-y-4 text-center'>
          <h2 className='text-3xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
            {pricing.title}
          </h2>
          <p className='text-base text-[hsl(var(--muted-foreground))] md:text-lg'>
            Choose the plan that matches your publishing velocity—upgrade anytime as your team scales.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          {pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex h-full flex-col rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-[0_28px_90px_rgba(15,15,15,0.12)] ${
                tier.highlight ? "ring-2 ring-[hsl(var(--accent))]" : ""
              }`}>
              {tier.highlight && (
                <span className='absolute -top-4 right-6 inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-white px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[hsl(var(--accent))]'>
                  Popular
                </span>
              )}

              <div className='space-y-4'>
                <h3 className='text-xl font-semibold text-[hsl(var(--foreground))]'>
                  {tier.name}
                </h3>
                <div>
                  <span className='text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl'>
                    {tier.price}
                  </span>
                  <p className='text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]'>
                    {tier.cadence}
                  </p>
                </div>
                <p className='text-sm leading-relaxed text-[hsl(var(--muted-foreground))]'>
                  {tier.description}
                </p>
              </div>

              <ul className='mt-6 space-y-3 text-sm text-[hsl(var(--muted-foreground))]'>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-3'>
                    <span className='mt-1 inline-flex h-1 w-6 flex-none bg-[hsl(var(--accent))]'></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className='mt-auto pt-8'>
                <Button
                  className={`w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--primary-hover))] ${
                    tier.highlight ? "hover:border-[hsl(var(--primary-hover))]" : ""
                  }`}
                  variant='default'>
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
