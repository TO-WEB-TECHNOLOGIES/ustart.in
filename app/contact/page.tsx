'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';


// --- MAIN PAGE COMPONENT ---

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: 'support',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const [scrolled, setScrolled] = useState(false);

    // Load Font Awesome & Scroll Listener
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', topic: 'support', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const faqs = [
        { question: "What are your support hours?", answer: "Our Gurugram-based support team is available 24/7 for live order issues. For general business inquiries, we respond between 9 AM - 8 PM IST." },
        { question: "How do I partner with USTART?", answer: "We are expanding rapidly in Sector 29 and Cyber Hub. If you own a restaurant, select 'Restaurant Partnership' in the form or email partners@ustart.in." },
        { question: "Do you deliver to my location?", answer: "We currently operate exclusively in Gurugram (Sectors 1-115) and select areas of South Delhi. Check the app for real-time serviceability." },
    ];

    return (
        <div className="font-sans antialiased selection:bg-[#FF9F43] selection:text-white min-h-screen flex flex-col bg-white">

            {/* --- NAVBAR --- */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <div className="flex items-center gap-2 cursor-pointer. max-w-6/6 ">
                                <Logo color={scrolled ? '#0F2441' : '#FFFFFF'} />
                            </div>
                        </Link>
                    </div>

                    <div className={`hidden md:flex gap-8 font-medium text-sm tracking-wide uppercase ${scrolled ? 'text-[#0F2441]' : 'text-white'}`}>
                        <a href="#" className="hover:text-[#FF9F43] transition-colors">Help Center</a>
                        <a href="mailto:support@ustart.in" className="hover:text-[#FF9F43] transition-colors flex items-center gap-2">
                            <i className="fa-solid fa-envelope"></i> support@ustart.in
                        </a>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-grow w-full">

                {/* Hero Section (Simple & Clean) */}
                <section className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-[#0F2441]">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2441] to-transparent"></div>
                    <div className="relative z-10 text-center px-4 mt-10">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Start a Conversation.
                        </h1>
                        <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                            We're here to help you with anything USTART.
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

                    {/* Top Row: Form vs Info/Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">

                        {/* LEFT: Contact Form */}
                        <div className="lg:col-span-7">
                            {isSubmitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-green-50/50 rounded-2xl">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <h3 className="text-3xl font-bold text-[#0F2441] mb-2">Message Sent</h3>
                                    <p className="text-gray-500">We'll get back to you shortly.</p>
                                    <button onClick={() => setIsSubmitted(false)} className="mt-8 text-[#FF9F43] font-bold underline decoration-2 underline-offset-4 hover:text-[#0F2441] transition-colors">Send another message</button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-12">
                                        <h2 className="text-4xl font-bold text-[#0F2441] mb-2">Send us a message</h2>
                                        <div className="h-1 w-16 bg-[#FF9F43]"></div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-[#0F2441]/60 uppercase tracking-widest">Your Name</label>
                                                <input
                                                    type="text" required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full py-2 border-b border-gray-300 focus:border-[#FF9F43] outline-none transition-all bg-transparent text-xl font-medium text-[#0F2441] placeholder-gray-300"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-[#0F2441]/60 uppercase tracking-widest">Email Address</label>
                                                <input
                                                    type="email" required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full py-2 border-b border-gray-300 focus:border-[#FF9F43] outline-none transition-all bg-transparent text-xl font-medium text-[#0F2441] placeholder-gray-300"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-[#0F2441]/60 uppercase tracking-widest">Topic</label>
                                            <div className="flex flex-wrap gap-4">
                                                {['Order Support', 'Partnership', 'Delivery', 'Other'].map((topic) => (
                                                    <button
                                                        key={topic} type="button"
                                                        onClick={() => setFormData({ ...formData, topic: topic.toLowerCase() })}
                                                        className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${formData.topic === topic.toLowerCase()
                                                                ? 'bg-[#0F2441] text-white border-[#0F2441]'
                                                                : 'bg-transparent text-gray-500 border-gray-300 hover:border-[#0F2441] hover:text-[#0F2441]'
                                                            }`}
                                                    >
                                                        {topic}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#0F2441]/60 uppercase tracking-widest">Message</label>
                                            <textarea
                                                rows={3} required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full py-2 border-b border-gray-300 focus:border-[#FF9F43] outline-none transition-all bg-transparent text-xl font-medium text-[#0F2441] placeholder-gray-300 resize-none"
                                                placeholder="How can we help?"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="group flex items-center gap-3 px-8 py-4 bg-[#FF9F43] hover:bg-[#e08935] text-white font-bold rounded-none transition-all"
                                        >
                                            Send Message
                                            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* RIGHT: Info & Map */}
                        <div className="lg:col-span-5 space-y-12">

                            {/* Contact Details */}
                            <div>
                                <h3 className="text-xs font-bold text-[#0F2441]/60 uppercase tracking-widest mb-8">Contact Information</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-5 items-start">
                                        <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-[#FF9F43] shrink-0">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div>
                                            <strong className="block text-lg text-[#0F2441] mb-1">Gurugram HQ</strong>
                                            <span className="text-gray-500 leading-relaxed block">Alt.f coworking - Orchid Business Park,<br />Sector 48, Gurugram, Haryana 122003.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-start">
                                        <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-[#FF9F43] shrink-0">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div>
                                            <strong className="block text-lg text-[#0F2441] mb-1">Email</strong>
                                            <a href="mailto:support@ustart.in" className="text-gray-500 hover:text-[#FF9F43] transition-colors">support@ustart.in</a>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-start">
                                        <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-[#FF9F43] shrink-0">
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <div>
                                            <strong className="block text-lg text-[#0F2441] mb-1">Phone</strong>
                                            <span className="text-gray-500">+91 78272 34027</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Map - Boxless style */}
                            <div>
                                <h3 className="text-xs font-bold text-[#0F2441]/60 uppercase tracking-widest mb-6">Our Location</h3>
                                <div className="w-full h-64 bg-gray-100 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3509.227546377227!2d77.03391507616656!3d28.42621369403863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI1JzM0LjQiTiA3N8KwMDInMTEuNyJF!5e0!3m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="USTART Location"
                                    ></iframe>
                                    {/* Overlay to ensure clean edges */}
                                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="h-px w-full bg-gray-200 mb-20"></div>

                    {/* Bottom Row: FAQ (Clean List) */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#0F2441] mb-2">Common Questions</h2>
                        <p className="text-gray-500 mb-12">Answers to the most frequent inquiries.</p>

                        <div className="text-left space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="pb-6 border-b border-gray-100 last:border-0 group cursor-pointer" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                                    <div className="flex justify-between items-center w-full">
                                        <h4 className="text-lg font-bold text-[#0F2441] group-hover:text-[#FF9F43] transition-colors">{faq.question}</h4>
                                        <i className={`fa-solid fa-plus text-sm text-gray-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45 text-[#FF9F43]' : ''}`}></i>
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-500 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;