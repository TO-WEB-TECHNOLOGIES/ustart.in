'use client';
import Logo from '@/components/Logo';
import React, { useEffect } from 'react';

const ComingSoon = () => {
  // --- BRAND COLORS ---
  const colors = {
    primary: '#0F2441',     // Deep Navy Blue
    secondary: '#FF9F43',   // Vibrant Orange
    white: '#FFFFFF',
    text: '#E2E8F0',        // Light gray for text
  };

  useEffect(() => {
    // Load Font Awesome
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="h-screen w-full font-sans relative overflow-hidden bg-gray-900 selection:bg-orange-400 selection:text-white">

      {/* 1. The "Inside" View (Visible briefly before shutter closes) */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop"
          alt="Inside Kitchen"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      {/* 2. The Shutter Container (Fixed Frame - No Scroll) */}
      <div className="absolute inset-0 z-20 shadow-2xl origin-top flex flex-col overflow-hidden"
        style={{
          backgroundColor: colors.primary,
          animation: 'shutterDrop 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards'
        }}>

        {/* Shutter Texture (Ridges) */}
        <div className="absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
                   0deg,
                   transparent,
                   transparent 35px,
                   rgba(0,0,0,0.4) 36px,
                   rgba(0,0,0,0.5) 40px,
                   rgba(255,255,255,0.05) 41px,
                   rgba(255,255,255,0.05) 42px
                 )`
          }}>
        </div>

        {/* Background Decor - Fixed Position */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <i className="fa-solid fa-burger absolute top-[-5%] left-[5%] text-7xl md:text-9xl animate-pulse opacity-5" style={{ color: colors.secondary }}></i>
          <i className="fa-solid fa-utensils absolute bottom-[10%] right-[5%] text-8xl md:text-[10rem] opacity-5 rotate-12" style={{ color: colors.white }}></i>
          <i className="fa-solid fa-pizza-slice absolute top-[20%] right-[15%] text-6xl md:text-8xl animate-bounce opacity-5" style={{ color: colors.secondary, animationDuration: '3s' }}></i>

          {/* Gradient blobs for atmosphere */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[100px] opacity-20" style={{ backgroundColor: colors.secondary }}></div>
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[100px] opacity-10" style={{ backgroundColor: '#ffffff' }}></div>
        </div>

        {/* 3. Main Content Wrapper (Fixed Height, No Scroll) */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-8 md:py-12 px-6 pb-20"> 
          
          <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto h-full space-y-4 md:space-y-8 opacity-0"
               style={{ animation: 'fadeIn 0.8s ease-out 1.2s forwards' }}>

            {/* Logo */}
            <div className="shrink-0 scale-75 md:scale-100">
              <Logo color='#FFFFFF' />
            </div>

            {/* Central Graphic: Chef Hat + Code (Responsive Sizing) */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 md:w-48 md:h-48 rounded-full border-4 flex items-center justify-center text-4xl md:text-6xl bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(255,159,67,0.2)] transition-transform duration-700 hover:scale-110" style={{ borderColor: colors.secondary, color: colors.secondary }}>
                <i className="fa-solid fa-helmet-safety"></i>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-white p-2 md:p-3 rounded-full text-lg md:text-2xl shadow-lg animate-bounce" style={{ color: colors.primary }}>
                <i className="fa-solid fa-utensils"></i>
              </div>
            </div>

            {/* Main Headline (Responsive Text) */}
            <h1 className="text-3xl md:text-7xl font-bold tracking-tight leading-tight text-white text-center">
              We are <span style={{ color: colors.secondary }}>Cooking</span> Up<br className="hidden md:block"/> Something Amazing.
            </h1>

            {/* Interactive Line (Responsive Text) */}
            <div className="relative max-w-2xl text-center px-4">
              <i className="fa-solid fa-quote-left absolute -top-2 -left-2 md:-top-4 md:-left-6 text-xl md:text-4xl opacity-20" style={{ color: colors.secondary }}></i>
              <p className="text-sm md:text-2xl font-light leading-relaxed text-gray-300">
                Our developers are adding flavors to these features and will be served soon to you.
              </p>
              <i className="fa-solid fa-quote-right absolute -bottom-2 -right-2 md:-bottom-4 md:-right-6 text-xl md:text-4xl opacity-20" style={{ color: colors.secondary }}></i>
            </div>

            {/* Loading Bar Animation */}
            <div className="w-full max-w-xs md:max-w-sm mx-auto shrink-0">
              <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 opacity-50 text-white">
                <span>Development</span>
                <span>Plating Up...</span>
              </div>
              <div className="h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 animate-[loading_2s_ease-in-out_infinite] rounded-full relative w-full origin-left"></div>
              </div>
            </div>

            {/* Contact Information (Compact) */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 md:p-8 border border-white/10 transform transition-all hover:bg-white/10 text-white text-center shrink-0">
              <p className="text-gray-400 mb-1 uppercase tracking-widest text-[10px] md:text-xs font-bold">Want a sneak peek?</p>
              <p className="text-sm md:text-xl font-medium">
                Connect with us on <br className="md:hidden" />
                <a href="mailto:contact@ustart.in" className="inline-flex items-center gap-2 mt-1 md:mt-0 md:ml-2 underline decoration-2 underline-offset-4 hover:text-orange-400 transition-colors decoration-orange-400/50 hover:decoration-orange-400">
                  <i className="fa-regular fa-envelope"></i> contact@ustart.in
                </a>
              </p>
            </div>
          
          </div>
        </div>

        {/* Bottom Bar of Shutter - Absolute at bottom */}
        <div className="absolute bottom-0 w-full h-6 bg-black/40 border-t border-white/10 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] z-30"></div>

      </div>

      {/* Global Styles for Keyframe Animations */}
      <style>{`
        @keyframes shutterDrop {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(0%); }
          75% { transform: translateY(-30px); } /* Bounce up */
          100% { transform: translateY(0%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;