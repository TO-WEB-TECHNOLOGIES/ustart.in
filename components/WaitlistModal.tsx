import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  ChefHat, 
  Coffee, 
  UtensilsCrossed, 
  Pizza, 
  Check, 
  Crown, 
  ArrowRight, 
  Loader2,
  Croissant,
  Sandwich,
  AlertCircle
} from 'lucide-react';

// --- Types ---
interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Modal Component ---
const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Handle animation for mount/unmount
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters and limit to 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
    
    // Clear error as user types
    if (phoneError) setPhoneError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
    
    // Clear error as user types
    if (emailError) setEmailError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;

    // Indian Mobile Number Validation: Starts with 6-9, followed by 9 digits (Total 10)
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    
    // Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!indianPhoneRegex.test(formData.phone)) {
      setPhoneError('Please enter a valid Indian mobile number');
      isValid = false;
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!isValid) return;

    setStatus('submitting');
    
    // Simulate API call (Functionality preserved)
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setTimeout(() => {
            setStatus('idle');
            setFormData({ email: '', phone: '' });
            setPhoneError('');
            setEmailError('');
        }, 300);
      }, 2500);
    }, 1500);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-[#0a1625]/60 backdrop-blur-md transition-opacity duration-500" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`
          bg-white w-full max-w-[440px] rounded-[32px] shadow-2xl relative overflow-hidden 
          transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-12'}
        `}
      >
        
        {/* Decorative Header */}
        <div className="relative h-48 bg-[#0F2441] overflow-hidden group">
          {/* Animated Gradients */}
          <div className="absolute top-[-50%] right-[-20%] w-96 h-96 bg-gradient-to-br from-[#FF9F43] via-[#FF6B6B] to-purple-500 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-64 h-64 bg-blue-500 rounded-full blur-[60px] opacity-10"></div>
          
          {/* Floating Icons Pattern */}
          <div className="absolute inset-0">
             {/* Large Pizza - Top Left */}
             <div className="absolute top-6 left-8 text-white/10 animate-[float_6s_ease-in-out_infinite]">
                <Pizza size={64} strokeWidth={1.5} />
             </div>
             
             {/* Coffee - Top Right */}
             <div className="absolute top-8 right-12 text-[#FF9F43]/20 animate-[float-delayed_5s_ease-in-out_infinite]">
                <Coffee size={48} strokeWidth={1.5} />
             </div>

             {/* Utensils - Bottom Center */}
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/5 animate-[float-reverse_8s_ease-in-out_infinite]">
                <UtensilsCrossed size={120} strokeWidth={1} />
             </div>

             {/* Chef Hat - Floating Left */}
             <div className="absolute bottom-10 left-12 text-white/10 animate-[float_7s_ease-in-out_infinite_1s]">
                <ChefHat size={32} strokeWidth={1.5} />
             </div>

             {/* Croissant - Floating Right */}
             <div className="absolute bottom-12 right-16 text-[#FF9F43]/10 animate-[float-delayed_6s_ease-in-out_infinite_0.5s]">
                <Croissant size={40} strokeWidth={1.5} />
             </div>
             
             {/* Particles */}
             <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
             <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#FF9F43]/30 rounded-full animate-pulse"></div>
          </div>

          {/* Close Button - Enhanced */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 backdrop-blur-md transition-all duration-300 z-20 group border border-white/5 shadow-lg"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-10 -mt-16 relative z-10">
          
          {/* Icon Badge */}
          <div className="flex justify-center mb-6">
            <div className={`
              w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-xl transform transition-all duration-500
              ${status === 'success' ? 'bg-green-500 rotate-12' : 'bg-white rotate-0'}
            `}>
              {status === 'success' ? (
                <Check size={40} className="text-white animate-[bounce_1s_infinite]" strokeWidth={3} />
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-100 rounded-full scale-150 blur-xl opacity-50"></div>
                  <Crown size={40} className="text-[#FF9F43] drop-shadow-sm relative z-10" strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center mb-8 space-y-2">
            <h2 className={`text-2xl font-bold text-[#0F2441] transition-all duration-300 ${status === 'success' ? 'scale-105' : ''}`}>
              {status === 'success' ? 'You’re on the list!' : 'Join the Elite Club'}
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-[85%] mx-auto">
              {status === 'success' 
                ? "We've reserved your spot. Watch your inbox for your exclusive invite." 
                : "Secure your spot for an exclusive dining experience. Limited seats available."}
            </p>
          </div>

          {/* Form */}
          <div className={`transition-all duration-300 ${status === 'success' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Phone Input */}
              <div className="relative">
                <div className="group relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${phoneError ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#FF9F43]'}`}>
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`
                      w-full bg-slate-50 border text-[#0F2441] font-medium placeholder:text-slate-400 text-sm rounded-2xl py-4 pl-12 pr-4 outline-none transition-all duration-300
                      ${phoneError 
                        ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-400/10' 
                        : 'border-slate-200 focus:border-[#FF9F43] focus:ring-4 focus:ring-[#FF9F43]/10 hover:border-slate-300'
                      }
                    `}
                  />
                  {/* Error Icon */}
                  {phoneError && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-pulse">
                      <AlertCircle size={18} />
                    </div>
                  )}
                </div>
                {/* Error Message */}
                {phoneError && (
                   <div className="text-red-500 text-xs mt-1.5 ml-1 font-medium flex items-center gap-1 animate-[fadeIn_0.3s_ease-in-out]">
                      {phoneError}
                   </div>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="group relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${emailError ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#FF9F43]'}`}>
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`
                      w-full bg-slate-50 border text-[#0F2441] font-medium placeholder:text-slate-400 text-sm rounded-2xl py-4 pl-12 pr-4 outline-none transition-all duration-300
                      ${emailError 
                        ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-400/10' 
                        : 'border-slate-200 focus:border-[#FF9F43] focus:ring-4 focus:ring-[#FF9F43]/10 hover:border-slate-300'
                      }
                    `}
                  />
                  {/* Error Icon */}
                  {emailError && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-pulse">
                      <AlertCircle size={18} />
                    </div>
                  )}
                </div>
                {/* Error Message */}
                {emailError && (
                   <div className="text-red-500 text-xs mt-1.5 ml-1 font-medium flex items-center gap-1 animate-[fadeIn_0.3s_ease-in-out]">
                      {emailError}
                   </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="
                  w-full mt-2 bg-[#0F2441] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#0F2441]/20 
                  hover:bg-[#1a3b66] hover:shadow-xl hover:shadow-[#0F2441]/30 hover:-translate-y-0.5
                  active:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none
                  transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group
                "
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

                <div className="relative z-10 flex items-center gap-2">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Waitlist</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Footer / Terms */}
          {/* {status !== 'success' && (
             <p className="mt-6 text-center text-xs text-slate-400">
               By joining, you agree to our <a href="#" className="underline hover:text-[#0F2441]">Terms of Service</a>.
             </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;