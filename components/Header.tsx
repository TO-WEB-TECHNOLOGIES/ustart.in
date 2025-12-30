"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-bg-light/90 backdrop-blur-md border-b border-brand-navy/5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer. max-w-1/6 ">
            <Logo color={`#0F2441`}/>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-brand-navy">
          <Link
            href="/coming-soon"
            className="hover:text-brand-orange transition-colors"
          >
            Add restaurant
          </Link>
        </nav>
        <button
          className="md:hidden p-1 text-brand-navy"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-brand-navy/5 shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/coming-soon"
              className="hover:text-brand-orange transition-colors font-semibold text-brand-navy py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add restaurant
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
