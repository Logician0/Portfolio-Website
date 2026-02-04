'use client';

import { useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Bot, Film, Code2, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router';

// --- STAR GENERATOR ---
const generateStars = (count: number, width: number, height: number) => {
  let boxShadow = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const opacity = Math.random();
    const size = Math.random() > 0.8 ? 2 : 1; 
    boxShadow += `${x}px ${y}px 0 ${size}px rgba(255, 255, 255, ${opacity}), `;
  }
  return boxShadow.slice(0, -2); 
};

// --- MAGNETIC CARD COMPONENT ---
function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.15); 
    y.set((clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    icon: Film,
    href: '/services/video-editing',
    color: 'pink',
    description: 'Cinematic Stories',
    position: 'top-0 left-1/2 -translate-x-1/2', 
    linePath: 'M 300 300 Q 250 200 300 50', 
    floatDelay: 0,
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    icon: Bot,
    href: '/services/ai-agents',
    color: 'cyan',
    description: 'Automate & Scale',
    position: 'bottom-0 left-[5%] md:left-0',
    linePath: 'M 300 300 Q 200 300 140 460',
    floatDelay: 1.5,
  },
  {
    id: 'web-dev',
    title: 'Website Dev',
    icon: Code2,
    href: '/services/web-dev',
    color: 'violet',
    description: 'High Performance',
    position: 'bottom-0 right-[5%] md:right-0',
    linePath: 'M 300 300 Q 400 300 460 460',
    floatDelay: 2.5,
  },
];

export function ServicesRound() {
  const smallStars = useMemo(() => generateStars(1000, 4000, 4000), []);
  const mediumStars = useMemo(() => generateStars(400, 4000, 4000), []);
  const bigStars = useMemo(() => generateStars(100, 4000, 4000), []);

  return (
    <section 
      id="services" 
      // UPDATED: Reduced padding from py-32 to py-20
      className="relative py-12 md:py-20 bg-black flex flex-col items-center justify-center overflow-hidden w-full"
    >
      
      {/* --- 1. BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black z-0" />
        
        {/* STARS */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4000px] h-[4000px] animate-[spin_240s_linear_infinite]">
          <div style={{ width: '100%', height: '100%', boxShadow: smallStars, opacity: 0.5 }} />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4000px] h-[4000px] animate-[spin_180s_linear_infinite_reverse]">
          <div style={{ width: '100%', height: '100%', boxShadow: mediumStars, opacity: 0.7 }} />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4000px] h-[4000px] animate-[spin_120s_linear_infinite]">
          <div style={{ width: '100%', height: '100%', boxShadow: bigStars, opacity: 1 }} />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_70%)]" />
      </div>

      {/* --- 2. HEADER --- */}
      {/* UPDATED: Reduced margin from mb-32 to mb-16 */}
      <div className="relative z-30 text-center px-4 mb-10 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-xl"
        >
          Our Core Ecosystem
        </motion.h2>
        <p className="text-zinc-400 text-sm md:text-base tracking-wide">Everything connects to your growth.</p>
      </div>

      {/* --- 3. THE SYSTEM --- */}
      {/* UPDATED: Reduced Desktop size from 800px to 700px.
          Since cards are anchored to edges, shrinking container pulls them CLOSER to center. */}
      <div className="relative z-10 w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]">
        
        {/* A. CONNECTING LINES */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="gradient-energy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          
          {services.map((s, i) => (
            <motion.path 
              key={i}
              d={s.linePath}
              stroke="url(#gradient-energy)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
          ))}
        </svg>

        {/* B. CENTER LIGHT SOURCE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            animate={{ 
              boxShadow: ['0 0 20px rgba(255,255,255,0.2)', '0 0 60px rgba(255,255,255,0.6)', '0 0 20px rgba(255,255,255,0.2)'],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-white flex items-center justify-center relative z-20"
          >
             <div className="w-2 h-2 rounded-full bg-black/80 shadow-inner" />
          </motion.div>
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30 duration-[2000ms]" />
        </div>

        {/* C. ORBITING CARDS */}
        {services.map((service, index) => {
          const textColors = {
            cyan: 'text-cyan-400 group-hover:text-cyan-300',
            pink: 'text-pink-400 group-hover:text-pink-300',
            violet: 'text-violet-400 group-hover:text-violet-300',
          }[service.color];

          const glowColors = {
            cyan: 'group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] group-hover:border-cyan-500/60',
            pink: 'group-hover:shadow-[0_0_50px_rgba(236,72,153,0.4)] group-hover:border-pink-500/60',
            violet: 'group-hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] group-hover:border-violet-500/60',
          }[service.color];

          return (
            <motion.div
              key={service.id}
              className={`absolute ${service.position} z-20`}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: service.floatDelay 
              }}
              style={{ willChange: 'transform' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <MagneticCard className="group cursor-pointer">
                    {/* Size maintained at w-64 h-64 (Big) on Desktop */}
                    <div 
                      className={`
                        w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full 
                        bg-black/80 backdrop-blur-md border border-white/10 
                        flex flex-col items-center justify-center text-center p-2 md:p-4 lg:p-6
                        transition-all duration-300 
                        ${glowColors} group-hover:scale-105 relative overflow-hidden
                        shadow-2xl
                      `}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-40 rounded-t-full pointer-events-none" />

                      <div className={`p-2 md:p-3 lg:p-4 rounded-full bg-black/60 border border-white/10 mb-1 md:mb-2 lg:mb-4 transition-colors ${textColors} shadow-inner`}>
                        <service.icon className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                      </div>
                      
                      <h3 className="text-xs md:text-lg lg:text-2xl font-bold text-white leading-tight">{service.title}</h3>
                      <p className="hidden md:block text-xs lg:text-sm text-zinc-400 mt-1 lg:mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        {service.description}
                      </p>
                      
                      <p className="md:hidden text-[9px] text-zinc-500 mt-0.5 leading-none">Tap to View</p>

                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white opacity-0 group-hover:opacity-100 absolute bottom-3 md:bottom-6 lg:bottom-8 transition-all transform translate-y-2 group-hover:translate-y-0" />
                    </div>
                  </MagneticCard>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}