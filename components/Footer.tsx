import { faFacebook, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-10 pb-6 relative z-30">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="md:w-1/4">
            <div className="flex items-center gap-2 mb-4 text-white">
              <span className="material-symbols-outlined text-3xl leading-none text-brand-orange">
                restaurant_menu
              </span>
              <h1 className="text-2xl font-black tracking-tighter italic">
                USTART
              </h1>
            </div>
            <div className="flex gap-3">
              <a
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center transition-colors"
                href="https://www.instagram.com/ustart_rides/"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center transition-colors"
                href="https://www.linkedin.com/company/ustartrg/"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center transition-colors"
                href="https://www.facebook.com/profile.php?id=61572376997840"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:flex-1">
            <div>
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-opacity-50">
                About USTART
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Work With Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-opacity-50">
                For Restaurants
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Partner with us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Apps for you
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-opacity-50">
                Learn More
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-xs text-gray-400">
          <p>
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2025-2026 © Toweb
            Technology Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
