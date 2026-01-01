'use client';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  // --- BRAND COLORS (Updated) ---
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

  useEffect(() => {
    // 1. Handle Scroll for Navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Load Font Awesome (Dynamically injected)
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-sans antialiased selection:bg-orange-400 selection:text-white" style={{ backgroundColor: colors.white, color: colors.dark }}>
      
      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-4' : 'py-6'}`}
        style={{ 
          backgroundColor: scrolled ? colors.white : 'transparent', 
          color: scrolled ? colors.primary : colors.white 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-black tracking-tighter italic">
            USTART<span style={{ color: colors.secondary }}>.</span>
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

      {/* --- SECTION 1: HERO (Parallax) --- */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }}>
        </div>
        
        {/* Overlay - Navy Tint */}
        <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(15, 36, 65, 0.7)', backdropFilter: 'blur(3px)' }}></div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto text-white flex flex-col items-center">
          {/* Gurugram Badge */}
          <div className="mb-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg">
            <i className="fa-solid fa-location-dot" style={{ color: colors.secondary }}></i>
            <span>Gurugram Edition</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tight drop-shadow-xl">
            Fueling the <span style={{ color: colors.secondary }}>Hustle</span> of Millennium City.
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            From late-night coding sessions in Cyber City to family brunches on Sohna Road.
          </p>
          
          <div className="mt-16 animate-bounce">
            <i className="fa-solid fa-arrow-down text-4xl text-white/50"></i>
          </div>
        </div>
      </header>

      {/* --- SECTION 2: INTRO --- */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: colors.white }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight" style={{ color: colors.primary }}>
            Gurugram's Flavors, <br/>
            <span className="relative inline-block" style={{ color: colors.primary }}>
              Delivered.
              {/* Decorative Line (SVG) */}
              <svg className="absolute w-full h-4 -bottom-3 left-0" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ color: '#FFE0B2' }}>
                 <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h2>
          
          <p className="text-xl font-light max-w-3xl mx-auto mb-20 leading-relaxed" style={{ color: colors.gray }}>
            We don't just deliver food; we deliver the spirit of Gurgaon. From the oldest chole bhature in Sadar Bazar to the newest sushi bar in Horizon Center.
          </p>

          {/* Interactive Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -z-10 transform -translate-y-1/2 bg-gray-100"></div>
            
            {/* Feature 1 */}
            <div>
               <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl transition-colors bg-orange-50 text-orange-400 group-hover:text-white" style={{ color: colors.primary }}>
                 <i className="fa-solid fa-bag-shopping"></i>
               </div>
               <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Pick-up</h3>
               <p className="text-sm text-gray-500">Skip the queue at top rated spots</p>
            </div>
            
            {/* Feature 2 */}
            <div>
               <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl transition-colors bg-orange-50 text-orange-400 group-hover:text-white" style={{ color: colors.primary }}>
                 <i className="fa-solid fa-bolt"></i>
               </div>
               <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Super Fast</h3>
               <p className="text-sm text-gray-500">Beating Gurgaon traffic smartly</p>
            </div>

            {/* Feature 3 */}
            <div>
               <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl transition-colors bg-orange-50 text-orange-400 group-hover:text-white" style={{ color: colors.primary }}>
                 <i className="fa-solid fa-shield-halved"></i>
               </div>
               <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Safe Delivery</h3>
               <p className="text-sm text-gray-500">100% Sealed & Sanitized packs</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SERVING SINCE --- */}
      <div className="w-full py-8 border-y" style={{ backgroundColor: '#F0F4F8', borderColor: '#E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-sm border text-lg font-bold tracking-wide" style={{ color: colors.primary, borderColor: '#E2E8F0' }}>
             <i className="fa-solid fa-star" style={{ color: colors.primary }}></i>
             <span>Serving Happily in Gurgaon since 2025</span>
             <i className="fa-solid fa-star" style={{ color: colors.primary }}></i>
           </div>
        </div>
      </div>

      {/* --- SECTION 4: APP FEATURES --- */}
      <section className="py-24" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-20">
            
            {/* Phone Mockup Area */}
            <div className="w-full md:w-1/2 relative">
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop" 
                    alt="App Interface" 
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Notification */}
                  {/* <div className="absolute top-12 right-[-10px] bg-white p-4 pr-6 rounded-l-xl shadow-xl animate-pulse flex items-center gap-3 border-l-4" style={{ borderColor: colors.primary }}>
                     <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-navy-600">
                        <i className="fa-solid fa-motorcycle"></i>
                     </div>
                     <div>
                        <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Status</span>
                        <span className="text-sm font-bold text-gray-800">Arriving in 12 mins</span>
                     </div>
                  </div> */}
               </div>
            </div>

            {/* Features Content */}
            <div className="w-full md:w-1/2">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                 <i className="fa-solid fa-mobile-screen"></i> The USTART App
              </h3>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-10" style={{ color: colors.primary }}>
                Designed for the <br/>Hungry.
              </h2>
              
              <div className="space-y-10">
                 {/* Feature 1 */}
                 <div className="flex gap-6 group">
                    <div className="mt-1 w-20 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:text-white transition-colors" style={{ color: colors.primary }}>
                       <i className="fa-solid fa-stopwatch"></i>
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Priority Delivery</h4>
                       <p className="text-gray-500 leading-relaxed">Skip the queue. We prioritize your hunger pangs over everything else with our smart routing.</p>
                    </div>
                 </div>

                 {/* Feature 2 */}
                 <div className="flex gap-6 group">
                    <div className="mt-1 w-20 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:text-white transition-colors" style={{ color: colors.primary }}>
                       <i className="fa-solid fa-video"></i>
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Live Kitchen View</h4>
                       <p className="text-gray-500 leading-relaxed">Watch your food being prepared in real-time. Full transparency from the wok to your door.</p>
                    </div>
                 </div>

                 {/* Feature 3 */}
                 <div className="flex gap-6 group">
                    <div className="mt-1 w-20 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:text-white transition-colors" style={{ color: colors.primary }}>
                       <i className="fa-solid fa-tag"></i>
                    </div>
                    <div>
                       <h4 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>No Surge Pricing</h4>
                       <p className="text-gray-500 leading-relaxed">Rain or shine, midnight or noon. The price you see is the price you pay. No hidden fees.</p>
                    </div>
                 </div>
              </div>

              {/* <button 
                className="mt-12 px-10 py-5 rounded-xl font-bold shadow-lg text-white flex items-center gap-3 text-lg transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: colors.primary, boxShadow: '0 10px 25px -5px rgba(255, 159, 67, 0.4)' }}
              >
                 <i className="fa-brands fa-apple text-2xl"></i>
                 <i className="fa-brands fa-google-play text-xl"></i>
                 <span className="ml-2">Download App</span> 
                 <i className="fa-solid fa-chevron-right text-sm ml-auto"></i>
              </button> */}
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 5: USTART ELITE (PREMIUM) --- */}
      <section className="py-24 relative overflow-hidden text-white" style={{ backgroundColor: '#050C16' }}>
        {/* Abstract Gold Background Effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: colors.gold }}></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: colors.gold }}></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 font-bold tracking-[0.2em] border border-white/20 px-6 py-2 rounded-full text-xs uppercase mb-8" style={{ color: colors.gold, borderColor: colors.goldDark }}>
            <i className="fa-solid fa-crown"></i> Invitation Only
          </div>
          
          <h2 className="text-5xl md:text-8xl font-serif italic mb-4">
            USTART <span className="not-italic font-sans font-black" style={{ color: colors.gold }}>Elite</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-light">
            Experience dining without limits. The most exclusive membership for Gurgaon's true connoisseurs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Benefit 1 */}
             <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors text-left group">
                <div className="text-5xl font-black mb-4" style={{ color: colors.gold }}>0%</div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  Delivery Fee <i className="fa-solid fa-truck-fast text-gray-600 group-hover:text-white transition-colors text-sm"></i>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">On all orders above ₹199. Unlimited free delivery, forever. No questions asked.</p>
             </div>

             {/* Benefit 2 - Highlighted */}
             <div className="relative p-10 rounded-3xl transform md:scale-110 shadow-2xl text-left border border-white/10" 
                  style={{ background: `linear-gradient(135deg, ${colors.goldDark} 0%, #8E7008 100%)` }}>
                <div className="absolute top-4 right-4 bg-black/20 px-3 py-1 rounded-full text-xs font-bold uppercase text-white/80">Most Popular</div>
                <div className="text-white text-5xl font-black mb-4">40%</div>
                <h4 className="text-xl font-bold mb-3 text-white">Flat Discount</h4>
                <p className="text-white/80 text-sm mb-8 leading-relaxed">Up to 40% off at top-tier partner restaurants throughout NCR.</p>
                <button className="w-full py-4 bg-white font-bold rounded-xl text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors" style={{ color: '#8E7008' }}>
                  Join Waitlist <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
             </div>

             {/* Benefit 3 */}
             <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors text-left group">
                <div className="text-5xl font-black mb-4" style={{ color: colors.gold }}>VIP</div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  Access <i className="fa-solid fa-lock-open text-gray-600 group-hover:text-white transition-colors text-sm"></i>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">Priority reservations at the city's fully booked tables. You skip the line.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-16 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
             <div className="text-4xl font-black tracking-tighter italic">
              USTART<span style={{ color: colors.primary }}>.</span>
             </div>
             <div className="flex gap-6 text-2xl">
                <a href="#" className="hover:text-gray-400 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" className="hover:text-gray-400 transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="hover:text-gray-400 transition-colors"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="hover:text-gray-400 transition-colors"><i className="fa-brands fa-youtube"></i></a>
             </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
             <div>
               Made with <i className="fa-solid fa-heart text-orange-500 mx-1"></i> in Gurugram. © 2025 USTART Technologies Pvt Ltd.
             </div>
             <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Terms</a>
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Contact</a>
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;