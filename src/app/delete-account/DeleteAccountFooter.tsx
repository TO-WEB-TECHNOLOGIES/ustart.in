import Logo from "@/components/Logo";

/**
 * The /delete-account footer, kept route-local on purpose.
 *
 * This is the ustart.in reference project's site footer, copied so the page
 * renders exactly as it does there. It is NOT the same component as
 * src/components/Footer.tsx — this project's marketing footer is a different
 * design (paper/navy columns, store buttons, SEO link row) and swapping it in
 * would change the page. Keeping this file inside the route segment means the
 * two never get confused for one another.
 *
 * The reference file also imported FontAwesomeIcon and next/link without using
 * either; both are dropped here (the @fortawesome packages are not installed in
 * this project). The `fa-brands` icons come from the Font Awesome CDN
 * stylesheet that page.tsx injects on mount, exactly as in the reference.
 */
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
    dark2: '#050C16',
  };
  return (
    <footer
      style={{ backgroundColor: colors.dark2 }}
      className="text-white py-16 border-t border-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="shrink-0 scale-50 md:scale-75 -ml-8">
            <Logo color='#FFFFFF' />
          </div>
          <div className="flex gap-6 text-2xl">
            <a href="https://in.linkedin.com/company/ustartin" className="hover:text-orange-400 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://www.instagram.com/ustart.in" className="hover:text-orange-400 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61572376997840" className="hover:text-orange-400 transition-colors"><i className="fa-brands fa-facebook"></i></a>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div>
            Made with 🧡 in Gurugram, for the world. © {new Date().getFullYear()} Toweb Technology Pvt Ltd.
          </div>
          <div className="flex gap-8">
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/terms#privacy-data-protection" className="hover:text-white transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/delete-account" className="hover:text-white transition-colors">Account Deletion</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
