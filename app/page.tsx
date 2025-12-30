import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import Collections from "@/components/Collections";
import HowItWorks from "@/components/HowItWorks";
import PromoSection from "@/components/PromoSection";
import PartnerSection from "@/components/PartnerSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="bg-brand-bg-light relative z-20 -mt-10 rounded-t-[2.5rem] pt-12 pb-8 border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <FeatureCards />
        <Collections />
        <HowItWorks />
        <PromoSection />
        <PartnerSection />
      </div>
    </main>
  );
}
