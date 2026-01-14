import { faFacebook, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const colors = {
    primary: '#0F2441',     // Deep Navy Blue (Brand Anchor)
    secondary: '#FF9F43',   // Vibrant Orange (Accents/Buttons)
    secondaryHover: '#e08935',
    dark: '#0A182C',        // Darker Navy for Text
    gray: '#4a5568',        // Cool Gray
    light: '#F4F7FA',       // Light Blue-ish Gray Background
    white: '#FFFFFF',
    gold: '#D4AF37',        // Premium Gold (kept for Elite section)
    goldDark: '#B4941F',
  };
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="text-4xl font-black tracking-tighter italic">
            <Logo color={colors.white} />
          </div>
          <div className="flex gap-6 text-2xl">
            <a href="https://in.linkedin.com/company/ustartin" className="hover:text-orange-400 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://www.instagram.com/ustart.in" className="hover:text-orange-400 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61572376997840" className="hover:text-orange-400 transition-colors"><i className="fa-brands fa-facebook"></i></a>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div>
            Made with <i className="fa-solid fa-heart text-orange-500 mx-1"></i> in Gurugram, for the world. © {new Date().getFullYear()} Toweb Technology Pvt Ltd.
          </div>
          <div className="flex gap-8">
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/terms#privacy-data-protection" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
