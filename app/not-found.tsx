'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

// --- MAIN 404 PAGE COMPONENT ---

const Error404Page: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 1. Load Font Awesome
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Handle Scroll (Required for the Logo snippet logic)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F4F7FA] selection:bg-[#FF9F43] selection:text-white overflow-hidden relative">
      
      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 left-0 w-full p-6 z-50 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Replaced Logo Block */}
            <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer max-w-[50%]">
                    <Logo color="#0F2441" />
                </div>
            </Link>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex items-center justify-center relative w-full px-4 pt-24">
        
        {/* Background Decor */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

        <div className="text-center relative z-10 max-w-2xl mx-auto">
            
            {/* The 404 Graphic */}
            <div className="relative inline-block mb-8">
                <h1 className="text-[120px] md:text-[180px] font-black text-[#0F2441] leading-none tracking-tighter select-none">
                    4
                    <span className="relative inline-block mx-2 text-[#FF9F43]">
                        {/* Pizza/Donut 0 substitution */}
                        <i className="fa-solid fa-cookie-bite animate-spin-slow"></i>
                    </span>
                    4
                </h1>
                
                {/* Floating Elements */}
                <div className="absolute top-0 right-0 animate-bounce text-3xl text-[#0F2441]/20">?</div>
                <div className="absolute bottom-10 left-[-50px] animate-bounce delay-700 text-4xl text-[#FF9F43]/40">
                    <i className="fa-solid fa-map-location-dot"></i>
                </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#0F2441] mb-6">
                Order Not Found
            </h2>
            
            <p className="text-lg text-gray-500 mb-10 leading-relaxed px-4">
                Looks like this page is off the menu. It might have been removed, renamed, or maybe it just went out for a delivery and never came back.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                    href="/" 
                    className="px-8 py-4 bg-[#0F2441] text-white font-bold rounded-xl shadow-lg hover:bg-[#1a3b66] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-house"></i> Go Back Home
                </Link>
                <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-white text-[#0F2441] border border-gray-200 font-bold rounded-xl shadow-sm hover:border-[#FF9F43] hover:text-[#FF9F43] transition-all flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-headset"></i> Contact Support
                </Link>
            </div>

        </div>
      </main>


      <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Error404Page;