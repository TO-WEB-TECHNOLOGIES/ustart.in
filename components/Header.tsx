"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    <nav
              className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-4' : 'py-6'}`}
              style={{
                backgroundColor: scrolled ? colors.white : 'transparent',
                color: scrolled ? colors.primary : colors.white
              }}
            >
              <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className='overflow-hidden'>
                  <Logo color={scrolled ? colors.primary : colors.white} />
                </div>
                <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide uppercase">
                  <a href="/coming-soon" className="hover:text-orange-400 transition-colors">Partner with us</a>
                  <a href="/coming-soon" className="hover:text-orange-400 transition-colors">Ride with us</a>
                </div>
                {/* <div className="flex gap-6 font-medium items-center">
                   <a href="#" className="hover:opacity-80 transition-opacity">Log in</a>
                   <button className="px-5 py-2 rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: colors.primary }}>
                     Sign up
                   </button>
                </div> */}
              </div>
            </nav>
  );
}
