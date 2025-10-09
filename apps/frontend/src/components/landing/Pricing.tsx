import { landingPageContent } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const { pricing } = landingPageContent;

  return (
    <section id='pricing' className='py-28 px-4'>
      <div className='max-w-7xl mx-auto space-y-14'>
        <div className='text-center space-y-4 max-w-2xl mx-auto'>
          <h2 className='text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white'>
            {pricing.title}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Choose the plan that matches your publishing velocity—upgrade
            anytime as your team scales.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-3'>
          {pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex h-full flex-col rounded-3xl border ${
                tier.highlight
                  ? "border-sky-500/40 bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-emerald-400/10"
                  : "border-slate-200/70 dark:border-slate-800/60 bg-white/85 dark:bg-gray-950/70"
              } p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur`}>
              {tier.highlight && (
                <span className='absolute -top-4 right-6 inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg'>
                  Popular
                </span>
              )}

              <div className='space-y-4'>
                <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
                  {tier.name}
                </h3>
                <div>
                  <span className='text-4xl font-bold text-gray-900 dark:text-white'>
                    {tier.price}
                  </span>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {tier.cadence}
                  </p>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {tier.description}
                </p>
              </div>

              <ul className='mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300'>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-2'>
                    <span className='mt-1 h-2 w-2 rounded-full bg-emerald-400/90'></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className='mt-auto pt-8'>
                <Button
                  className={`w-full rounded-full ${
                    tier.highlight
                      ? "bg-sky-500 hover:bg-sky-600 text-white"
                      : "border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white"
                  }`}
                  variant={tier.highlight ? "default" : "outline"}>
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
