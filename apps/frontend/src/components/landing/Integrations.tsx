import { landingPageContent } from "@/lib/constants";

export function Integrations() {
  const { integrations } = landingPageContent;

  return (
    <section className='border-b border-[hsl(var(--border))] py-20'>
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-4 text-center'>
        <div className='mx-auto max-w-3xl space-y-4'>
          <h2 className='text-2xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
            {integrations.title}
          </h2>
          <p className='text-base text-[hsl(var(--muted-foreground))] md:text-lg'>
            {integrations.description}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))] sm:grid-cols-3 md:grid-cols-4'>
          {integrations.logos.map((logo) => (
            <div
              key={logo}
              className='flex items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-white px-3 py-6 transition duration-300 hover:-translate-y-1'>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
