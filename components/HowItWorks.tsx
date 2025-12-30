export default function HowItWorks() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-16">
      <div className="bg-gradient-to-r from-brand-bg-cream to-white rounded-2xl p-6 md:p-8 border border-brand-navy/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="md:w-1/4">
            <h3 className="text-2xl font-black text-brand-navy mb-1">
              Simple as 1, 2, 3
            </h3>
            <p className="text-brand-text/70 text-sm font-medium">
              From craving to first bite.
            </p>
          </div>
          <div className="md:w-3/4 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <div className="flex items-center gap-4 flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-50 w-full">
              <div className="bg-brand-navy/10 p-2 rounded-lg text-brand-navy">
                <span className="material-symbols-outlined">search</span>
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm">Discover</h4>
                <p className="text-xs text-brand-text/60">
                  Find local favorites
                </p>
              </div>
            </div>
            <div className="hidden md:block text-brand-navy/30">
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </div>
            <div className="flex items-center gap-4 flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-50 w-full">
              <div className="bg-brand-navy/10 p-2 rounded-lg text-brand-navy">
                <span className="material-symbols-outlined">touch_app</span>
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm">Order</h4>
                <p className="text-xs text-brand-text/60">
                  Quick secure payment
                </p>
              </div>
            </div>
            <div className="hidden md:block text-brand-navy/30">
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </div>
            <div className="flex items-center gap-4 flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-50 w-full">
              <div className="bg-brand-navy/10 p-2 rounded-lg text-brand-navy">
                <span className="material-symbols-outlined">delivery_dining</span>
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm">Enjoy</h4>
                <p className="text-xs text-brand-text/60">Delivered to door</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
