export default function PromoSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-12">
      <div className="bg-brand-bg-cream rounded-3xl overflow-hidden relative shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-8 md:pl-12 z-10">
            <h3 className="text-3xl font-black text-brand-navy mb-2 tracking-tight">
              Know more about USTART
            </h3>
            <p className="text-brand-text/80 mb-6 text-sm font-medium">
              The fastest way to order food. Enter your number to know more.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center shadow-sm">
                <span className="text-brand-text font-bold text-sm mr-2 border-r border-gray-200 pr-2">
                  +91
                </span>
                <input
                  className="w-full border-none p-0 text-sm focus:ring-0 outline-none"
                  placeholder="Mobile Number"
                  type="tel"
                />
              </div>
              <button className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors shadow-md whitespace-nowrap cursor-pointer">
                Register
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative h-full min-h-[300px] flex items-end justify-center md:justify-end pr-8 overflow-hidden">
            <div className="relative w-[180px] h-[340px] bg-brand-navy rounded-[2rem] border-[6px] border-brand-navy shadow-2xl rotate-6 translate-y-12 md:translate-y-8 hover:rotate-0 transition-transform duration-500 z-10">
              <div className="w-full h-full bg-white rounded-[1.6rem] overflow-hidden relative">
                <div className="bg-brand-orange h-24 p-4 flex flex-col justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/30 mb-2"></div>
                  <div className="text-white font-bold text-lg">
                    Hello, Tasty!
                  </div>
                </div>
                <div className="p-3 space-y-2 bg-gray-50 h-full">
                  <div className="w-full h-12 bg-white rounded-lg shadow-sm"></div>
                  <div className="w-full h-12 bg-white rounded-lg shadow-sm"></div>
                  <div className="w-full h-12 bg-white rounded-lg shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
