'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Bot, Film, Code2, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '@/lib/router';
import { services } from '@/lib/data';
import { cn } from '@/utils/cn';

const navItems = [
  { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Film,
  Code2,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { path } = useRouter();

  const isServicePage = path !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [path]);

  const handleNavClick = (href: string) => {
    if (isServicePage && href.startsWith('#')) {
      window.location.hash = '/';
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || isServicePage
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-lg'
            : 'bg-transparent py-4 sm:py-6'
        )}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        style={{ willChange: 'transform' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="Logician Creatives Home">
            <motion.img
              src="/logo.png"
              alt="Logician Creatives Agency Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <div className="flex flex-col">
              <span className="text-xs sm:text-lg font-semibold tracking-tight text-white leading-tight">
                Logician <span className="text-zinc-400 ml-1">Creatives</span>
              </span>
              <span className="text-[7px] sm:text-[10px] text-zinc-400 tracking-wider uppercase">
                AI • Video • Web
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={isServicesOpen}
                      aria-label="Services menu"
                      className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors py-2"
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        isServicesOpen && 'rotate-180'
                      )} aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72"
                        >
                          <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {services.map((service, index) => {
                              const Icon = iconMap[service.icon] || Bot;
                              const colorMap: Record<string, string> = {
                                violet: 'from-violet-500 to-purple-500',
                                pink: 'from-pink-500 to-rose-500',
                                cyan: 'from-cyan-500 to-teal-500',
                              };
                              return (
                                <Link
                                  key={service.slug}
                                  to={`/services/${service.slug}`}
                                  className="block"
                                  aria-label={`Service: ${service.title}`}
                                >
                                  <div
                                    className={cn(
                                      'flex items-center gap-4 p-4 hover:bg-white/5 transition-colors',
                                      index !== services.length - 1 && 'border-b border-white/5'
                                    )}
                                  >
                                    <div className={cn(
                                      'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br',
                                      colorMap[service.color] || colorMap.violet
                                    )}>
                                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-white">{service.title}</div>
                                      <div className="text-xs text-zinc-400">
                                        {service.categories.length} categories
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    href={isServicePage ? `#/${item.href}` : item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-zinc-300 hover:text-white transition-colors relative group py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-violet-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <a
            href={isServicePage ? '#/' : '#contact'}
            onClick={() => handleNavClick('#contact')}
            aria-label="Start a new project"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors transform hover:scale-105 active:scale-95 duration-200"
          >
            Start Project
            <span className="text-lg" aria-hidden="true">→</span>
          </a>

          <button
            className="md:hidden p-2 text-white z-50 relative"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close main menu" : "Open main menu"}
          >
            {isMobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          // ✅ FIX: Z-Index set to 100 to ensure it sits ON TOP of everything
          <motion.div
            className="fixed inset-0 z-[100] bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            {/* ✅ FIX: Added Internal Header so the Close Button is never hidden */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <Link to="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="text-lg font-bold text-white">Logician</span>
                </Link>
                <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white"
                >
                    <X size={28} />
                </button>
            </div>

            <div className="flex flex-col h-full px-6 pt-6 pb-6 overflow-y-auto">
              
              {/* 1. MAIN LINKS */}
              <div className="flex flex-col gap-5 mb-8">
                {navItems.filter(item => !item.hasDropdown).map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsMobileOpen(false);
                      handleNavClick(item.href);
                    }}
                    className="text-3xl font-bold text-white tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="w-full h-px bg-white/10 mb-6" />

              {/* 2. SERVICES */}
              <div className="mb-auto">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4 font-bold">Our Services</p>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, i) => {
                    const Icon = iconMap[service.icon] || Bot;
                    return (
                      <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.05) }}
                      >
                        <Link
                          to={`/services/${service.slug}`}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                          <span className="text-sm font-medium text-zinc-200">{service.title}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* 3. CTA */}
              <motion.a
                href="#contact"
                onClick={() => {
                  setIsMobileOpen(false);
                  handleNavClick('#contact');
                }}
                className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white font-bold text-center shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                aria-label="Start a project"
              >
                Start Project <ArrowRight size={18} />
              </motion.a>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}