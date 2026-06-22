'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

export default function DeleteAccount() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    reason: '',
    aware: false,
  });

  // --- OTP VERIFICATION STATE ---
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const isValidMobile = /^[0-9]{10}$/.test(formData.mobile);

  // --- BRAND COLORS ---
  const colors = {
    primary: '#0F2441',
    secondary: '#FF9F43',
    dark: '#0A182C',
    gray: '#4a5568',
    light: '#F4F7FA',
    white: '#FFFFFF',
    danger: '#e53e3e', // Red for the destructive action
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    // Load Font Awesome
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Resend cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // If the mobile number changes, any prior OTP send/verify no longer applies
    if (name === 'mobile') {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
      setOtpError('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSendOtp = async () => {
    if (!isValidMobile || sending || cooldown > 0) return;
    setSending(true);
    setOtpError('');
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: formData.mobile, channel: 'SMS' }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setOtpSent(true);
        setOtp('');
        setCooldown(30);
      } else if (response.status === 429 && data.blocked) {
        alert(data.message || 'Too many attempts. Your number is temporarily blocked.');
      } else if (response.status === 429) {
        setOtpError(data.error || 'Please wait before requesting another OTP.');
        setCooldown(30);
      } else {
        setOtpError(data.error || 'Could not send OTP. Please try again.');
      }
    } catch {
      setOtpError('Could not send OTP. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4 || verifying) return;
    setVerifying(true);
    setOtpError('');
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: formData.mobile, otp }),
      });

      // Per spec: ignore the response body, rely only on the status.
      if (response.ok) {
        setOtpVerified(true);
      } else {
        setOtpError('Incorrect OTP. Please try again.');
      }
    } catch {
      setOtpError('Incorrect OTP. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your mobile number with the OTP before proceeding.");
      return;
    }
    if (!formData.aware) {
      alert("Please confirm you understand the consequences before proceeding.");
      return;
    }

    try {
      const response = await fetch('/api/v1/account-deletion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNumber: formData.mobile,
          reason: formData.reason || undefined,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased selection:bg-orange-400 selection:text-white" style={{ backgroundColor: colors.light, color: colors.dark }}>

      {/* --- SIMPLE NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <div className='w-[120px] md:w-[150px] cursor-pointer hover:opacity-80 transition-opacity'>
              <Logo color={colors.primary} />
            </div>
          </Link>
          <Link href="/" className="text-sm font-bold uppercase tracking-wide hover:text-orange-400 transition-colors" style={{ color: colors.primary }}>
            <i className="fa-solid fa-arrow-left mr-2"></i> Back to Home
          </Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT SIDE: The "Don't Leave" Pitch (Retention Strategy) */}
          <div className="w-full md:w-5/12 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden" style={{ backgroundColor: colors.primary }}>
             {/* Background Pattern */}
             <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-5 pointer-events-none">
               <Logo color="#ffffff" />
             </div>

             <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-8">
                  <i className="fa-regular fa-face-frown text-orange-400"></i>
                </div>
                <h2 className="text-4xl font-black mb-4 leading-tight">
                  Wait, you're <br/> leaving us?
                </h2>
                <p className="text-lg text-gray-300 mb-10 font-light">
                  We are sad to see you go but hope you'll return to Gurugram's finest one day.
                </p>

                <div className="space-y-6 mb-10">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">What you'll leave behind:</h3>

                   <div className="flex items-start gap-4">
                     <i className="fa-solid fa-clock text-orange-400 mt-1"></i>
                     <div>
                       <h4 className="font-bold">Priority Deliveries</h4>
                       <p className="text-sm text-gray-400">No more skipping the queue when hunger strikes.</p>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <i className="fa-solid fa-crown text-orange-400 mt-1"></i>
                     <div>
                       <h4 className="font-bold">USTART Elite Access</h4>
                       <p className="text-sm text-gray-400">You'll lose your spot in line for premium dining perks.</p>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <i className="fa-solid fa-clock-rotate-left text-orange-400 mt-1"></i>
                     <div>
                       <h4 className="font-bold">Order History</h4>
                       <p className="text-sm text-gray-400">Can't remember the name of that amazing sushi? It'll be gone.</p>
                     </div>
                   </div>
                </div>
             </div>

             {/* Escape Hatch Button */}
             <div className="relative z-10 mt-auto">
               <Link href="/">
                 <button className="w-full py-4 rounded-xl font-bold bg-white text-center transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2" style={{ color: colors.primary }}>
                   <i className="fa-solid fa-heart text-orange-400"></i> Nevermind, I'll stay
                 </button>
               </Link>
             </div>
          </div>

          {/* RIGHT SIDE: The Form */}
          <div className="w-full md:w-7/12 p-10 md:p-12 bg-white">
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Account Deletion Request</h3>
            <p className="text-gray-500 mb-8 text-sm">If you're sure you want to proceed, please fill out the details below. This action is permanent and irreversible.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-regular fa-user text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your registered name"
                  />
                </div>
              </div>

              {/* Mobile Field */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-bold text-gray-700 mb-2">Registered Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                    placeholder="Enter 10-digit number"
                  />
                </div>

                {/* OTP Verification */}
                {!otpVerified ? (
                  <div className="mt-3">
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!isValidMobile || sending || cooldown > 0}
                        className={`text-sm font-bold transition-colors flex items-center gap-2
                          ${(!isValidMobile || sending || cooldown > 0)
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-orange-500 hover:text-orange-600'
                          }`}
                      >
                        <i className="fa-solid fa-paper-plane"></i>
                        {sending ? 'Sending OTP...' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Send OTP to verify'}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-500">
                          Enter the 4-digit code sent to +91 {formData.mobile}.
                        </p>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            value={otp}
                            onChange={(e) => {
                              setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
                              setOtpError('');
                            }}
                            className="w-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl tracking-[0.5em] text-center font-bold focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                            placeholder="••••"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otp.length !== 4 || verifying}
                            className={`px-5 py-3 rounded-xl font-bold text-sm transition-colors
                              ${(otp.length !== 4 || verifying)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 text-white hover:bg-orange-600'
                              }`}
                          >
                            {verifying ? 'Verifying...' : 'Verify'}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={sending || cooldown > 0}
                          className={`text-xs font-bold transition-colors
                            ${(sending || cooldown > 0)
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-orange-500 hover:text-orange-600'
                            }`}
                        >
                          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
                        </button>
                      </div>
                    )}
                    {otpError && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <i className="fa-solid fa-circle-exclamation"></i> {otpError}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm font-bold text-green-600 mt-3 flex items-center gap-2">
                    <i className="fa-solid fa-circle-check"></i> Mobile number verified
                  </p>
                )}
              </div>

              {/* Reason Field */}
              <div>
                <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-2">Reason for leaving (Optional)</label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Please select a reason</option>
                  <option value="moving">Moving out of Gurugram</option>
                  <option value="price">Prices are too high</option>
                  <option value="app_issues">App isn't working properly</option>
                  <option value="competitor">Using a different service</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Warning Checkbox (High Friction) */}
              <div className="pt-4 mt-6 border-t border-gray-100">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input
                      type="checkbox"
                      name="aware"
                      checked={formData.aware}
                      onChange={handleChange}
                      required
                      className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-md checked:bg-red-500 checked:border-red-500 transition-colors cursor-pointer"
                    />
                    <i className="fa-solid fa-check absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-sm"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-600 leading-relaxed select-none group-hover:text-gray-800 transition-colors">
                    I am aware submitting this form will result in losing access to my account, and all previous orders and data will not be able to be retrieved.
                  </span>
                </label>
              </div>

              {/* Submit Button (Destructive Styling) */}
              <button
                type="submit"
                disabled={!formData.aware || !otpVerified}
                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 border-2 flex items-center justify-center gap-2
                  ${formData.aware && otpVerified
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                  }`}
              >
                <i className="fa-regular fa-trash-can"></i> Request Deletion
              </button>

            </form>
          </div>

        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fa-solid fa-check text-green-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
              Request Submitted
            </h3>
            <p className="text-gray-500 mb-6">
              Deletion request submitted successfully. You will be contacted by our team for further process.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}