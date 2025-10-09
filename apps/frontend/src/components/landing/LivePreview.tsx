import { landingPageContent } from "@/lib/constants";
import { MonitorPlay, Sparkles, LineChart } from "lucide-react";

const iconMap = {
  MonitorPlay,
  Sparkles,
  LineChart,
};

export function LivePreview() {
  const { livePreview } = landingPageContent;

  return (
    <section id='live-preview' className='border-b border-[hsl(var(--border))] py-24'>
      <div className='mx-auto grid max-w-6xl items-start gap-16 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]'>
        <div className='space-y-6'>
          <span className='text-xs font-medium uppercase tracking-[0.45em] text-[hsl(var(--accent))]'>
            {livePreview.badge}
          </span>
          <h2 className='text-3xl font-semibold text-[hsl(var(--primary))] md:text-4xl'>
            {livePreview.title}
          </h2>
          <p className='text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg'>
            {livePreview.description}
          </p>

          <div className='space-y-3'>
            {livePreview.bullets.map((item, index) => {
              const Icon =
                index === 0
                  ? iconMap.MonitorPlay
                  : index === 1
                    ? iconMap.LineChart
                    : iconMap.Sparkles;

              return (
                <div
                  key={item.title}
                  className='flex items-start gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white p-4 transition duration-300 hover:-translate-y-1'>
                  <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))]'>
                    <Icon className='h-5 w-5' />
                  </span>
                  <div className='space-y-1'>
                    <h3 className='text-base font-semibold text-[hsl(var(--foreground))]'>
                      {item.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-[hsl(var(--muted-foreground))]'>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col gap-6 rounded-[2rem] border border-[hsl(var(--border))] bg-white p-8 shadow-[0_28px_100px_rgba(15,15,15,0.12)]'>
          <div className='flex items-center justify-between rounded-2xl border border-[hsl(var(--border))] px-6 py-4'>
            <div className='space-y-1'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--muted-foreground))]'>
                Playwright preview
              </p>
              <h3 className='text-lg font-semibold text-[hsl(var(--foreground))]'>
                Engagement impact
              </h3>
            </div>
            <span className='rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-[hsl(var(--accent))]'>
              Live
            </span>
          </div>

          <div className='grid gap-5'>
            <div className='space-y-4 rounded-2xl border border-[hsl(var(--border))] p-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--muted-foreground))]'>
                Variant comparison
              </p>
              <div className='space-y-3 text-sm text-[hsl(var(--muted-foreground))]'>
                <div className='flex items-center justify-between rounded-xl border border-[hsl(var(--border))] px-3 py-2 text-[hsl(var(--foreground))]'>
                  <span>Draft A</span>
                  <span className='text-xs uppercase tracking-[0.3em] text-[hsl(var(--accent))]'>
                    +18% dwell time
                  </span>
                </div>
                <div className='flex items-center justify-between rounded-xl border border-[hsl(var(--border))] px-3 py-2 text-[hsl(var(--foreground))]'>
                  <span>Draft B</span>
                  <span className='text-xs uppercase tracking-[0.3em] text-[hsl(var(--accent))]'>
                    +7% conversions
                  </span>
                </div>
                <p className='text-xs leading-relaxed'>
                  Visualization powered by Playwright MCP to simulate the on-page experience and accessibility signals before publishing.
                </p>
              </div>
            </div>

            <div className='space-y-4 rounded-2xl border border-[hsl(var(--border))] p-5 text-sm text-[hsl(var(--muted-foreground))]'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--muted-foreground))]'>
                Smart alerts
              </p>
              <div className='space-y-3'>
                <div className='rounded-xl border border-[hsl(var(--border))] px-3 py-2'>
                  <p className='text-xs uppercase tracking-[0.3em]'>Readability</p>
                  <p className='mt-1 text-sm text-[hsl(var(--foreground))]'>
                    Grade 9 → Grade 8 recommendation applied
                  </p>
                </div>
                <div className='rounded-xl border border-[hsl(var(--border))] px-3 py-2'>
                  <p className='text-xs uppercase tracking-[0.3em]'>SEO coverage</p>
                  <p className='mt-1 text-sm text-[hsl(var(--foreground))]'>
                    Keyword cluster satisfied · Add supporting stat for H2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
