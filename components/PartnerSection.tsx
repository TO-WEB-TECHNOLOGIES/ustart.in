import Link from "next/link";

export default function PartnerSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-8">
      <div className="bg-white border-l-4 border-brand-navy rounded-lg shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-bg-cream flex items-center justify-center text-brand-navy">
            <span className="material-symbols-outlined">storefront</span>
          </div>
          <div>
            <h4 className="font-bold text-brand-navy text-sm">
              Partner with USTART
            </h4>
            <p className="text-brand-text/60 text-xs">
              Join thousands of Gurugram restaurants.
            </p>
          </div>
        </div>
        <Link href="/new-home">
          <button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-5 py-2 rounded-lg text-xs transition-colors shadow-md whitespace-nowrap cursor-pointer">
            Add your restaurant
          </button>
        </Link>
      </div>
    </section>
  );
}
