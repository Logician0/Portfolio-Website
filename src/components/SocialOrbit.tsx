'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const socialIcons = [
  { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@logiciancreatives' },
  { Icon: Twitter, label: 'Twitter', href: 'https://x.com/Suraj_cix' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/logiciancreatives/' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/suraj-kumar0/' },
  { Icon: Github, label: 'GitHub', href: 'https://github.com/Logician0' },
];

const getIconPositions = (radius: number) => {
  return socialIcons.map((_, index) => {
    const angle = (index * (360 / socialIcons.length) - 90) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });
};

function BreathingIcon({ 
  Icon, 
  label, 
  href, 
  position, 
  index, 
  isVisible 
}: { 
  Icon: React.ElementType;
  label: string;
  href: string;
  position: { x: number; y: number };
  index: number;
  isVisible: boolean;
}) {
  const [microOffset, setMicroOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setMicroOffset({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
      });
    }, 2500 + index * 300);
    return () => clearInterval(interval);
  }, [isVisible, index]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute z-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        x: '-50%', 
        y: '-50%',
      }}
      initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }} 
      animate={{ 
        x: `calc(-50% + ${position.x + microOffset.x}px)`, 
        y: `calc(-50% + ${position.y + microOffset.y}px)`,
        scale: 1,
        opacity: 1,
      }}
      exit={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
      transition={{
        type: 'spring', stiffness: 120, damping: 14, delay: index * 0.05
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center rounded-full bg-black/80 border border-cyan-500/40 shadow-lg"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10" />
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 relative z-10" />
      </motion.div>
      <span className="sr-only">{label}</span>
    </motion.a>
  );
}

export function SocialOrbit() {
  const [iconsVisible, setIconsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRadius = () => {
    if (typeof window === 'undefined') return 135;
    const width = window.innerWidth;
    if (width < 640) return 135; 
    if (width < 768) return 160;
    if (width < 1024) return 190;
    return 220;
  };

  const [radius, setRadius] = useState(135);
  
  useEffect(() => {
    const updateRadius = () => setRadius(getRadius());
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const iconPositions = getIconPositions(radius);

  return (
    // REDUCED PADDING: py-6 sm:py-10 (was py-10 sm:py-16)
    <section id="about" className="py-6 sm:py-10 md:py-14 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          // REDUCED MARGIN: mb-6 (was mb-10)
          className="text-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1">
            <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm">
            The creative minds behind your digital success
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          <div className="relative flex-shrink-0">
            <div 
              className="relative flex items-center justify-center"
              style={{
                width: isMobile ? '340px' : '480px',
                height: isMobile ? '340px' : '480px',
              }}
            >
              <AnimatePresence>
                {iconsVisible && (
                  <>
                    {socialIcons.map((social, index) => (
                      <BreathingIcon
                        key={social.label}
                        Icon={social.Icon}
                        label={social.label}
                        href={social.href}
                        position={iconPositions[index]}
                        index={index}
                        isVisible={iconsVisible}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* PROFILE BUTTON */}
              <motion.button
                onClick={() => setIconsVisible(!iconsVisible)}
                className="relative z-10 rounded-full focus:outline-none group"
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Glow Shadow */}
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  animate={{
                    boxShadow: iconsVisible 
                      ? '0 0 50px rgba(6, 182, 212, 0.6)' 
                      : '0 0 0px rgba(6, 182, 212, 0)',   
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated Stroke */}
                <motion.div
                  className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-400"
                  animate={{
                    opacity: iconsVisible ? 1 : 0, 
                    scale: iconsVisible ? 1 : 0.98 
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                
                {/* Image */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-zinc-900">
                  <img
                    src="public/my-photo.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.button>
            </div>

            <motion.div
              className="text-center -mt-16 relative z-20 pointer-events-none" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="pointer-events-auto inline-block">
                <button
                  onClick={() => setIconsVisible(!iconsVisible)}
                  className="text-xs text-cyan-400/80 hover:text-cyan-400 transition-colors uppercase tracking-wider font-medium"
                >
                  {iconsVisible ? 'Close' : 'Tap to Connect'}
                </button>
                <h3 className="text-xl font-bold text-white mt-1">Alex Rivera</h3>
                <p className="text-zinc-500 text-sm">Founder & CEO</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 text-center lg:text-left max-w-lg px-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Crafting Digital Excellence
            </h3>
            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              <p>
                At <span className="text-cyan-400 font-medium">Logician Creatives</span>, we transform 
                visionary ideas into digital masterpieces. With over a decade of experience in AI, 
                video production, and web development.
              </p>
              {/* Removed the Philosophy Paragraph here */}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              {[
                { value: '150+', label: 'Projects' },
                { value: '50+', label: 'Clients' },
                { value: '10+', label: 'Years' },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}