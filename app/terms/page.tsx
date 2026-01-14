"use client";
import React, { useEffect, useState } from 'react';
import ApplicabilityAndScope from './users/ApplicabilityAndScope';
import Eligibility from './users/Eligibility';
import Account from './users/Account';
import Ordering from './users/Ordering';
import Pricing from './users/Pricing';
import CancellationsRefunds from './users/CancellationsRefunds';
import DeliveryTimelines from './users/DeliveryTimelines';
import UserConduct from './users/UserConduct';
import ReviewsRatings from './users/ReviewsRatings';
import IntellectualProperty from './users/IntellectualProperty';
import Privacy from './users/Privacy';
import Suspension from './users/Suspension';
import Limitation from './users/Limitation';
import Disclaimer from './users/Disclaimer';
import GoverningLaw from './users/GoverningLaw';
import Miscellaneous from './users/Miscellaneous';
import ContactDetails from './users/ContactDetails';
import AmendmentsUpdates from './users/Amendments';

// Define the sections for the sidebar navigation
interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'applicability-and-scope', label: 'Applicability & Scope' },
  { id: 'eligibility', label: 'Eligibility, Age & User Representations' },
  { id: 'account', label: 'User Account, Access & Security' },
  { id: 'ordering', label: 'Ordering, Acceptance & Confirmation' },
  { id: 'pricing', label: 'Pricing, Fees & Payments' },
  { id: 'cancellations-refunds', label: 'Cancellations, Refunds & Adjustments' },
  { id: 'delivery-timelines', label: 'Delivery, Timelines & User Obligations' },
  { id: 'user-conduct', label: 'User Conduct, Misuse & Restrictions' },
  { id: 'reviews-ratings', label: 'Reviews, Ratings & User-Generated Content' },
  { id: 'intellectual-property', label: 'Intellectual Property & Platform Ownership' },
  { id: 'privacy-data-protection', label: 'Privacy, Data Protection & Consent' },
  { id: 'suspension-termination', label: 'Suspension, Termination & Consequences' },
  { id: 'disclaimer', label: 'Disclaimers of Warranties' },
  { id: 'limitation-liability', label: 'Limitation of Liability' },
  { id: 'governing-law-disputes', label: 'Governing Law, Jurisdiction & Dispute Resolution' },
  { id: 'miscellaneous', label: 'Miscellaneous Provisions' },
  { id: 'amendments-updates', label: 'Amendments, Updates & Modifications' },
  { id: 'contact-grievance', label: 'Contact Details & Grievance Officer' },
];

const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('terms');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Effect 1: Load Font Awesome dynamically (so you don't need to install the package)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Cleanup not strictly necessary for CDN link but good practice if unmounting
    return () => {
      // document.head.removeChild(link); // Optional: keep it if used elsewhere
    };
  }, []);

  // Effect 2: Scroll Spy to update active sidebar link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="font-sans bg-gray-50 text-gray-800 antialiased selection:bg-[#FF9F43] selection:text-white min-h-screen">

      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Link */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-400 hover:text-[#0F2441] transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-lg"></i>
            </button>

            <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>

            {/* Logo */}
            <div className="text-2xl font-black tracking-tighter italic text-[#0F2441]">
              USTART<span className="text-[#FF9F43]">.</span>
            </div>

            {/* Badge */}
            <span className="bg-gray-100 text-gray-500 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ml-1 border border-gray-200">
              Legal Archive
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="hidden md:inline">Last Updated: <span className="text-[#0F2441] font-semibold">January 2026</span></span>
            <button
              className="md:hidden text-[#0F2441]"
              onClick={toggleMobileMenu}
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)] relative">

        {/* --- SIDEBAR (Desktop) --- */}
        <aside className="hidden md:block w-72 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white/50 backdrop-blur-sm pt-8 pb-12 pr-6 scrollbar-thin scrollbar-thumb-gray-200">
          <nav className="space-y-1">
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Legal Documents</h3>

            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === section.id
                  ? 'bg-[#0F2441] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 px-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-800 font-semibold mb-1">Need specific help?</p>
              <p className="text-xs text-blue-600 mb-3">Our legal team is available for inquiries.</p>
              <a
                href="mailto:legal@ustart.in"
                className="text-xs bg-white text-blue-600 px-3 py-2 rounded-lg border border-blue-200 font-bold hover:bg-blue-50 block text-center"
              >
                Contact Legal
              </a>
            </div>
          </div>
        </aside>

        {/* --- MOBILE MENU (Overlay) --- */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-20 px-6 pb-6 overflow-y-auto md:hidden animate-fade-in">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</h3>
            <div className="space-y-2 flex flex-col">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={closeMobileMenu}
                  className="p-3 bg-gray-50 rounded-lg font-medium text-[#0F2441]"
                >
                  {section.label}
                </a>
              ))}
            </div>
            <button
              onClick={closeMobileMenu}
              className="mt-8 w-full bg-[#0F2441] text-white py-3 rounded-lg font-bold"
            >
              Close Menu
            </button>
          </div>
        )}

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 py-12 px-6 md:px-16 bg-white min-h-screen">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F2441] mb-4">USTART Policies</h1>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed">
              Transparency is the secret sauce of our relationship with you. Please read these terms carefully before using the USTART platform.
            </p>

            <hr className="mb-16 border-gray-100" />

            {/* 1. Terms */}
            <ApplicabilityAndScope />


            {/* 2. Eligibility & User Representations (NEW) */}
            <Eligibility />

            {/* 3. User Account, Access & Security (NEW) */}
            <Account />

            {/* 4. Ordering, Acceptance & Confirmation (NEW) */}
            <Ordering />

            {/* 5. Pricing, Fees & Payments (NEW) */}
            <Pricing />

            {/* 6. Cancellations, Refunds & Adjustments */}
            <CancellationsRefunds />

            {/* 7. Delivery, Timelines & User Obligations */}
            <DeliveryTimelines />

            {/* 8. User Conduct, Misuse & Restrictions */}
            <UserConduct />

            {/* 9. Reviews, Ratings & User-Generated Content */}
            <ReviewsRatings />

            {/* 10. Intellectual Property & Platform Ownership */}
            <IntellectualProperty />

            {/* 11. Privacy, Data Protection & Consent */}
            <Privacy />

            {/* 12. Suspension, Termination & Consequences */}
            <Suspension />

            {/* 13. Disclaimers of Warranties */}
            <Disclaimer />

            {/* 14. Limitation of Liability */}
            <Limitation />

            {/* 15. Governing Law, Jurisdiction & Dispute Resolution */}
            <GoverningLaw />

            {/* 16. Miscellaneous Provisions */}
            <Miscellaneous />

            {/* 17. Amendments, Updates & Modifications */}
            <AmendmentsUpdates />

            {/* 18. Contact Details & Grievance Officer */}
            <ContactDetails />

            {/* Footer */}
            <footer className="mt-24 pt-12 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div>
                  Made with <i className="fa-solid fa-heart text-orange-500 mx-1"></i> in Gurugram, for the world. © {new Date().getFullYear()} Toweb Technology Pvt Ltd.
                </div>
                <div className="text-sm text-gray-500">
                  <p className="mb-2">Questions?</p>
                  <a href="mailto:legal@ustart.in" className="text-[#FF9F43] font-bold hover:underline">legal@ustart.in</a>
                </div>
              </div>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsPage;