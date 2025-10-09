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
    <section id='live-preview' className='py-28 px-4'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center'>
        <div className='space-y-6 md:space-y-8'>
          <span className='inline-flex items-center gap-2 rounded-full border border-violet-200/70 dark:border-violet-500/40 bg-white/70 dark:bg-gray-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-violet-500 dark:text-violet-300'>
            {livePreview.badge}
          </span>
          <h2 className='text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white leading-[1.05]'>
            {livePreview.title}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
            {livePreview.description}
          </p>

          <div className='space-y-4'>
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
                  className='group relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-gray-950/70 p-4 md:p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.14)]'>
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-100/60 via-sky-100/60 to-emerald-100/60 dark:from-violet-500/10 dark:via-sky-500/10 dark:to-emerald-500/10'></div>
                  <div className='relative z-10 flex items-start gap-4'>
                    <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-300'>
                      <Icon className='h-5 w-5' />
                    </span>
                    <div className='space-y-1'>
                      <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
                        {item.title}
                      </h3>
                      <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-400/25 via-sky-400/20 to-emerald-400/15 blur-3xl -z-10'></div>
          <div className='relative overflow-hidden rounded-[2rem] border border-white/60 dark:border-white/10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-[0_50px_140px_rgba(15,23,42,0.22)] p-6 md:p-8'>
            <div className='flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/60 px-6 py-4'>
              <div className='space-y-1'>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400'>
                  Playwright preview
                </p>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Engagement impact
                </h3>
              </div>
              <span className='rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 px-3 py-1 text-xs font-semibold text-white'>
                Live
              </span>
            </div>

            <div className='mt-6 grid gap-5'>
              <div className='rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-gray-950/70 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400'>
                  Variant comparison
                </p>
                <div className='mt-4 grid gap-3 text-sm text-gray-700 dark:text-gray-200'>
                  <div className='flex items-center justify-between gap-4 rounded-xl bg-sky-50/80 dark:bg-sky-900/30 px-3 py-2'>
                    <span className='font-medium text-sky-600 dark:text-sky-300'>
                      Draft A
                    </span>
                    <span className='text-xs uppercase tracking-[0.2em] text-sky-500 dark:text-sky-400'>
                      +18% dwell time
                    </span>
                  </div>
                  <div className='flex items-center justify-between gap-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-900/30 px-3 py-2'>
                    <span className='font-medium text-emerald-600 dark:text-emerald-300'>
                      Draft B
                    </span>
                    <span className='text-xs uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-400'>
                      +7% conversions
                    </span>
                  </div>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    Visualization powered by Playwright MCP to simulate on-page
                    experience and accessibility signals before publishing.
                  </p>
                </div>
              </div>

              <div className='rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-emerald-400/10 p-5 text-sm text-gray-600 dark:text-gray-300'>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400'>
                  Smart alerts
                </p>
                <div className='mt-3 space-y-3'>
                  <div className='rounded-xl bg-white/70 dark:bg-gray-950/70 px-3 py-2 shadow-sm'>
                    <p className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                      Readability
                    </p>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      Grade 9 → Grade 8 recommendation applied
                    </p>
                  </div>
                  <div className='rounded-xl bg-white/70 dark:bg-gray-950/70 px-3 py-2 shadow-sm'>
                    <p className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                      SEO coverage
                    </p>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      Keyword cluster satisfied · Missing supporting stat for H2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
