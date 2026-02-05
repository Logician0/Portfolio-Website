'use client';

import { motion } from 'framer-motion';
import { Youtube, Twitter, Instagram, Linkedin, Github, Heart, Sparkles } from 'lucide-react';
import { Link } from '@/lib/router';
import { services } from '@/lib/data';

const socialLinks = [
  { Icon: Youtube, href: 'https://youtube.com/@logiciancreatives', label: 'YouTube' },
  { Icon: Twitter, href: 'https://x.com/Suraj_cix', label: 'X' },
  { Icon: Instagram, href: 'https://www.instagram.com/logiciancreatives/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/suraj-kumar0/', label: 'LinkedIn' },
  { Icon: Github, href: 'https://github.com/Logician0', label: 'GitHub' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <footer className="relative z-50 border-t border-white/5 bg-black" aria-label="Site Footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* === MOBILE FOOTER (COMPACT MODE) === */}
        <div className="block md:hidden py-5">
          {/* Top Row: Logo & Socials */}
          <div className="flex items-center justify-between mb-5">
            <Link to="/" className="flex items-center gap-2" aria-label="Home" onClick={scrollToTop}>
              <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="text-xs font-bold text-white">Logician</span>
            </Link>
            <div className="flex gap-1.5">
              {socialLinks.slice(0, 3).map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-white/5 border border-white/10 text-zinc-400">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid: Tighter spacing */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Services</h4>
              <ul className="space-y-1.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`} className="text-zinc-300 hover:text-white text-xs" onClick={scrollToTop}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Company</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => handleNav('about')} className="text-zinc-300 hover:text-white text-xs text-left">About</button></li>
                <li><button onClick={() => handleNav('process')} className="text-zinc-300 hover:text-white text-xs text-left">Process</button></li>
                <li><Link to="/careers" className="text-zinc-300 hover:text-white text-xs" onClick={scrollToTop}>Careers</Link></li>
              </ul>
            </div>
          </div>

          {/* CTA & Copyright: Reduced padding */}
          <div className="border-t border-white/5 pt-4 text-center">
             <a href="#contact" className="inline-block w-full py-2.5 rounded-lg bg-white text-black font-bold text-xs">
               Start A Project
             </a>
             <p className="mt-3 text-[9px] text-zinc-600">© {new Date().getFullYear()} Logician Creatives</p>
          </div>
        </div>

        {/* === TABLET FOOTER (Unchanged) === */}
        <div className="hidden md:block lg:hidden py-8">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-3" onClick={scrollToTop}>
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="text-sm font-semibold text-white">
                  Logician <span className="text-zinc-400">Creatives</span>
                </span>
              </Link>
              <p className="text-[11px] text-zinc-300 mb-3 max-w-xs">
                AI experiences, cinematic content, and world-class web platforms.
              </p>
              <div className="flex gap-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-white mb-2">Services</h4>
              <ul className="space-y-1.5 text-[11px]">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`} className="text-zinc-300 hover:text-white" onClick={scrollToTop}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium text-white mb-2">Company</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => handleNav('about')} className="text-zinc-300 hover:text-white">About</button></li>
                <li><button onClick={() => handleNav('process')} className="text-zinc-300 hover:text-white">Process</button></li>
                <li><Link to="/careers" className="text-zinc-300 hover:text-white" onClick={scrollToTop}>Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
            <span>© {new Date().getFullYear()} Logician Creatives. All rights reserved.</span>
            <span className="flex items-center gap-1">Crafted with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /></span>
          </div>
        </div>

        {/* === DESKTOP FOOTER (Unchanged) === */}
        <div className="hidden lg:block py-10">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4" onClick={scrollToTop}>
                <motion.img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" whileHover={{ scale: 1.05, rotate: 5 }} />
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight text-white">Logician <span className="text-zinc-400">Creatives</span></span>
                  <span className="text-[9px] text-zinc-400 tracking-wider uppercase">AI • Video • Web</span>
                </div>
              </Link>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4 max-w-xs">
                Transforming visions into digital reality. AI experiences, cinematic content, and world-class platforms.
              </p>
              <div className="flex gap-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.a 
                    key={label} href={href} target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-3">Services</h4>
              <ul className="space-y-2 text-xs">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services/${service.slug}`} className="text-zinc-300 hover:text-white transition-colors" onClick={scrollToTop}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2"> 
              <h4 className="text-sm font-medium text-white mb-3">Company</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleNav('about')} className="text-zinc-300 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => handleNav('process')} className="text-zinc-300 hover:text-white transition-colors">Process</button></li>
                <li><Link to="/careers" className="text-zinc-300 hover:text-white transition-colors" onClick={scrollToTop}>Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-3">Get Started</h4>
              <p className="text-xs text-zinc-300 mb-4">Ready to transform your digital presence?</p>
              <motion.a 
                href="#contact" 
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white text-xs font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Start Project
              </motion.a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Logician Creatives. All rights reserved.</p>
            <div className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}