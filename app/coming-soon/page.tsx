import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-24 pb-12 px-4 min-h-[calc(100vh-80px)]">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-navy/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>
      <div className="relative z-10 max-w-3xl w-full text-center">
        <div className="inline-flex items-center justify-center mb-10 relative">
          <div className="absolute inset-0 bg-brand-orange/20 rounded-full animate-ping opacity-75"></div>
          <div className="w-24 h-24 bg-white rounded-2xl shadow-soft border border-brand-orange/10 flex items-center justify-center relative z-10 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="material-symbols-outlined text-5xl text-brand-navy">
              engineering
            </span>
          </div>
          <div className="w-16 h-16 bg-brand-bg-cream rounded-xl shadow-sm border border-brand-navy/5 flex items-center justify-center absolute -right-6 -bottom-4 -rotate-6 z-20">
            <span className="material-symbols-outlined text-3xl text-brand-orange">
              hourglass_top
            </span>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6 tracking-tight">
          Feature Coming Soon
        </h2>
        <p className="text-xl md:text-2xl text-brand-text font-medium leading-relaxed max-w-2xl mx-auto mb-10">
          This feature is coming very soon on Website, by then please connect
          with us on{" "}
          <span className="whitespace-nowrap text-brand-orange">
            contact@ustart.in
          </span>
          .
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            className="group flex items-center gap-3 bg-brand-navy hover:bg-brand-navy/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            href="mailto:contact@ustart.in"
          >
            <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">
              mail
            </span>
            <span>contact@ustart.in</span>
          </a>
        </div>
      </div>
    </main>
  );
}
