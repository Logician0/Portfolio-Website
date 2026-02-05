'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // ✅ IMPORTED: Critical for fixing the modal
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Twitter, Instagram, Linkedin, Github, Heart, Sparkles, X, Shield, FileText } from 'lucide-react';
import { Link } from '@/lib/router';
import { services } from '@/lib/data';

// --- LEGAL CONTENT DATA ---
const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    content: (
      <div className="space-y-4 text-zinc-300">
        <p>At Logician Creatives, we take your privacy seriously.</p>
        <h4 className="text-white font-bold">1. Data Collection</h4>
        <p>We collect only the essential information needed to communicate and deliver our services (e.g., name, email) via our contact forms.</p>
        <h4 className="text-white font-bold">2. Usage</h4>
        <p>Your data is used strictly for project execution and communication. We do not sell or share your data with third parties.</p>
        <h4 className="text-white font-bold">3. Security</h4>
        <p>We implement industry-standard security protocols to ensure your information remains safe.</p>
      </div>
    )
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    content: (
      <div className="space-y-4 text-zinc-300">
        <p>By using our services, you agree to the following terms.</p>
        <h4 className="text-white font-bold">1. Deliverables</h4>
        <p>All project deliverables (code, video, assets) are subject to the specific scope of work agreed upon in the proposal.</p>
        <h4 className="text-white font-bold">2. Ownership</h4>
        <p>Upon final payment, full intellectual property rights for the deliverables are transferred to the client.</p>
        <h4 className="text-white font-bold">3. Payments</h4>
        <p>Payment schedules are defined in individual contracts. We reserve the right to pause work if payments are overdue.</p>
      </div>
    )
  }
};

function LegalModal({ type, onClose }: { type: 'privacy' | 'terms'; onClose: () => void }) {
  const content = legalContent[type];
  const Icon = content.icon;
  const [mounted, setMounted] = useState(false);

  // ✅ FIX: Wait for mount to access document.body
  useEffect(() => {
    setMounted(true);
    // Optional: Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!mounted) return null;

  // ✅ FIX: createPortal moves this div OUT of the Footer and into the Body
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4" // ✅ Z-Index 9999 ensures it's on top of EVERYTHING
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        willChange: 'opacity',
        backgroundColor: 'rgba(0,0,0,0.8)', // ✅ Fallback dark overlay
        backdropFilter: 'blur(8px)'          // ✅ Nice blur effect
      }}
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div
        className="relative z-10 w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white">{content.title}</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-2" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {content.content}
        </div>
        
        <div className="p-6 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body // ✅ Target destination: The Layout Body (bypassing Footer restrictions)
  );
}

const socialLinks = [
  { Icon: Youtube, href: 'https://youtube.com/@logiciancreatives', label: 'YouTube' },
  { Icon: Twitter, href: 'https://x.com/Suraj_cix', label: 'X' },
  { Icon: Instagram, href: 'https://www.instagram.com/logiciancreatives/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/suraj-kumar0/', label: 'LinkedIn' },
  { Icon: Github, href: 'https://github.com/Logician0', label: 'GitHub' },
];

export function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNav = (sectionId: string) => {
    window.location.hash = '/'; 
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <footer className="relative border-t border-white/5 bg-black" aria-label="Site Footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Mobile Footer */}
          <div className="block md:hidden py-6">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center gap-2" aria-label="Home" onClick={() => window.scrollTo(0, 0)}>
                <motion.img
                  src="/logo.png"
                  alt="Logician Creatives Logo"
                  className="w-7 h-7 object-contain"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
                <span className="text-xs font-semibold text-white">
                  Logician <span className="text-zinc-400">Creatives</span>
                </span>
              </Link>
              
              <div className="flex gap-1">
                {socialLinks.slice(0, 4).map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
                    className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-[10px]">
              <div>
                <h4 className="text-zinc-300 uppercase tracking-wider mb-1.5 font-bold">Services</h4>
                <ul className="space-y-1">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link 
                        to={`/services/${service.slug}`} 
                        className="text-zinc-300 hover:text-white"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-300 uppercase tracking-wider mb-1.5 font-bold">Company</h4>
                <ul className="space-y-1">
                  <li>
                    <button onClick={() => handleNav('about')} className="text-zinc-300 hover:text-white bg-transparent border-none p-0 cursor-pointer text-left">
                      About
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('process')} className="text-zinc-300 hover:text-white bg-transparent border-none p-0 cursor-pointer text-left">
                      Process
                    </button>
                  </li>
                  <li>
                    <Link 
                        to="/careers" 
                        className="text-zinc-300 hover:text-white"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-300 uppercase tracking-wider mb-1.5 font-bold">Legal</h4>
                <ul className="space-y-1">
                  <li>
                    <button onClick={() => setActiveModal('privacy')} className="text-zinc-300 hover:text-white bg-transparent border-none p-0 cursor-pointer text-left">
                      Privacy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveModal('terms')} className="text-zinc-300 hover:text-white bg-transparent border-none p-0 cursor-pointer text-left">
                      Terms
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-400">
              <span>© {new Date().getFullYear()} Logician Creatives</span>
            </div>
          </div>

          {/* Tablet Footer */}
          <div className="hidden md:block lg:hidden py-8">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="col-span-2">
                <Link to="/" className="flex items-center gap-2 mb-3" aria-label="Home" onClick={() => window.scrollTo(0, 0)}>
                  <motion.img
                    src="/logo.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <span className="text-sm font-semibold text-white">
                    Logician <span className="text-zinc-400">Creatives</span>
                  </span>
                </Link>
                <p className="text-[11px] text-zinc-300 mb-3 max-w-xs">
                  AI experiences, cinematic content, and world-class web platforms.
                </p>
                <div className="flex gap-2">
                  {socialLinks.map(({ Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${label}`}
                      className="w-9 h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-white mb-2">Services</h4>
                <ul className="space-y-1.5 text-[11px]">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link 
                        to={`/services/${service.slug}`} 
                        className="text-zinc-300 hover:text-white"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-white mb-2">Company</h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li>
                    <button onClick={() => handleNav('about')} className="text-zinc-300 hover:text-white bg-transparent border-none p-0 cursor-pointer">
                      About
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('process')} className="text-zinc-300 hover:text-white bg-transparent border-none p-0 cursor-pointer">
                      Process
                    </button>
                  </li>
                  <li>
                    <Link 
                        to="/careers" 
                        className="text-zinc-300 hover:text-white"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Careers
                    </Link>
                  </li>
                </ul>
                <h4 className="text-xs font-medium text-white mt-4 mb-1.5">Legal</h4>
                <ul className="space-y-1 text-[10px]">
                  <li>
                    <button onClick={() => setActiveModal('privacy')} className="text-zinc-400 hover:text-white bg-transparent border-none p-0 cursor-pointer">
                      Privacy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveModal('terms')} className="text-zinc-400 hover:text-white bg-transparent border-none p-0 cursor-pointer">
                      Terms
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
              <span>© {new Date().getFullYear()} Logician Creatives. All rights reserved.</span>
              <span className="flex items-center gap-1">
                Crafted with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden lg:block py-10">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-2">
                <Link to="/" className="flex items-center gap-2 mb-4" aria-label="Home" onClick={() => window.scrollTo(0, 0)}>
                  <motion.img
                    src="/logo.png"
                    alt="Logo"
                    className="w-9 h-9 object-contain"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight text-white">
                      Logician <span className="text-zinc-400">Creatives</span>
                    </span>
                    <span className="text-[9px] text-zinc-400 tracking-wider uppercase">
                      AI • Video • Web
                    </span>
                  </div>
                </Link>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 max-w-xs">
                  Transforming visions into digital reality. AI experiences, 
                  cinematic content, and world-class platforms.
                </p>
                
                <div className="flex gap-2">
                  {socialLinks.map(({ Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${label}`}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-3">Services</h4>
                <ul className="space-y-2 text-xs">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link 
                        to={`/services/${service.slug}`} 
                        className="text-zinc-300 hover:text-white transition-colors"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 flex gap-12">
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Company</h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button onClick={() => handleNav('about')} className="text-zinc-300 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                        About
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNav('process')} className="text-zinc-300 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                        Process
                      </button>
                    </li>
                    <li>
                        <Link 
                            to="/careers" 
                            className="text-zinc-300 hover:text-white transition-colors"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Careers
                        </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Legal</h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button onClick={() => setActiveModal('privacy')} className="text-zinc-300 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                        Privacy
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setActiveModal('terms')} className="text-zinc-300 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">
                        Terms
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-3">Get Started</h4>
                <p className="text-xs text-zinc-300 mb-4">
                  Ready to transform your digital presence?
                </p>
                <motion.a
                  href="#contact"
                  aria-label="Start a project with us"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white text-xs font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Start Project
                </motion.a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
              <span>© {new Date().getFullYear()} Logician Creatives. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && <LegalModal type={activeModal} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </>
  );
}