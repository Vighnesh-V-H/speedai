import { landingPageContent } from "@/lib/constants";

export function Integrations() {
  const { integrations } = landingPageContent;

  return (
    <section className='py-24 px-4'>
      <div className='max-w-7xl mx-auto space-y-10 text-center'>
        <div className='space-y-4 max-w-3xl mx-auto'>
          <h2 className='text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white'>
            {integrations.title}
          </h2>
          <p className='text-base md:text-lg text-gray-600 dark:text-gray-300'>
            {integrations.description}
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
          {integrations.logos.map((logo) => (
            <div
              key={logo}
              className='rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-gray-950/70 px-4 py-6 text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-300 uppercase shadow-sm hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] transition'>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
