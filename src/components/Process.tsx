'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  { id: 1, title: 'Discovery', Icon: MessageSquare },
  { id: 2, title: 'Strategy', Icon: Lightbulb },
  { id: 3, title: 'Design', Icon: Palette },
  { id: 4, title: 'Develop', Icon: Code },
  { id: 5, title: 'Launch', Icon: Rocket },
];

// --- UNIVERSAL PROCESS LOOP ---
function ProcessLoop() {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const duration = 8000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) % duration;
      setProgress(elapsed / duration);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Geometry (Fixed Reference System: 340x240)
  const lineLen = 220;
  const arcLen = Math.PI * 30;
  const totalLen = (lineLen * 2) + (arcLen * 2);
  const p1 = lineLen / totalLen;
  const p2 = p1 + (arcLen / totalLen);
  const p3 = p2 + (lineLen / totalLen);

  const getLightPosition = () => {
    if (progress < p1) {
      const t = progress / p1;
      return { x: 60 + t * lineLen, y: 90 };
    } else if (progress < p2) {
      const t = (progress - p1) / (p2 - p1);
      const angle = -Math.PI / 2 + t * Math.PI;
      return { x: 280 + Math.cos(angle) * 30, y: 120 + Math.sin(angle) * 30 };
    } else if (progress < p3) {
      const t = (progress - p2) / (p3 - p2);
      return { x: 280 - t * lineLen, y: 150 };
    } else {
      const t = (progress - p3) / (1 - p3);
      const angle = Math.PI / 2 + t * Math.PI;
      return { x: 60 + Math.cos(angle) * 30, y: 120 + Math.sin(angle) * 30 };
    }
  };

  const light = getLightPosition();

  // Active Logic
  const getActiveStep = () => {
    if (progress > 0.98) return 0; 
    if (progress > 0.73) return 5;
    if (progress > 0.57) return 4;
    if (progress > 0.33) return 3;
    if (progress > 0.16) return 2;
    return 1;
  };
  
  const activeStep = getActiveStep();
  const isLineActive = (stepId: number) => stepId <= activeStep;

  return (
    // CONTAINER
    <div className="relative w-[340px] h-[240px] mx-auto mt-12 md:mt-24 lg:mt-32 transform scale-100 sm:scale-125 md:scale-150 lg:scale-[1.75] origin-center select-none">
      
      {/* --- CARDS --- */}
      <div className="absolute top-0 left-[60px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[0]} isActive={isLineActive(1)} />
      </div>
      <div className="absolute top-0 left-[170px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[1]} isActive={isLineActive(2)} />
      </div>
      <div className="absolute top-0 left-[280px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[2]} isActive={isLineActive(3)} />
      </div>
      <div className="absolute bottom-0 left-[220px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[3]} isActive={isLineActive(4)} />
      </div>
      <div className="absolute bottom-0 left-[120px] -translate-x-1/2 z-20">
         <ProcessCard step={steps[4]} isActive={isLineActive(5)} />
      </div>

      {/* --- SVG LAYER --- */}
      <svg className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none">
         <defs>
           <filter id="glow">
             <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
             <feMerge>
               <feMergeNode in="coloredBlur"/>
               <feMergeNode in="SourceGraphic"/>
             </feMerge>
           </filter>
         </defs>

         {/* Vertical Pipes */}
         <line x1="60" y1="65" x2="60" y2="90" stroke={isLineActive(1) ? "#06b6d4" : "#3f3f46"} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="170" y1="65" x2="170" y2="90" stroke={isLineActive(2) ? "#06b6d4" : "#3f3f46"} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="280" y1="65" x2="280" y2="90" stroke={isLineActive(3) ? "#06b6d4" : "#3f3f46"} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="220" y1="175" x2="220" y2="150" stroke={isLineActive(4) ? "#06b6d4" : "#3f3f46"} strokeWidth="2" className="transition-colors duration-200" />
         <line x1="120" y1="175" x2="120" y2="150" stroke={isLineActive(5) ? "#06b6d4" : "#3f3f46"} strokeWidth="2" className="transition-colors duration-200" />

         {/* Empty Track */}
         <path 
           d="M 60,90 L 280,90 A 30,30 0 0 1 280,150 L 60,150 A 30,30 0 0 1 60,90"
           fill="none"
           stroke="#27272a"
           strokeWidth="4"
           strokeLinecap="round"
         />

         {/* Filling Water */}
         <path 
           d="M 60,90 L 280,90 A 30,30 0 0 1 280,150 L 60,150 A 30,30 0 0 1 60,90"
           fill="none"
           stroke="#06b6d4"
           strokeWidth="4"
           strokeLinecap="round"
           strokeDasharray={totalLen} 
           strokeDashoffset={totalLen * (1 - progress)}
           className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
         />

         {/* Junction Dots */}
         <circle cx="60" cy="90" r="3" fill={isLineActive(1) ? "#06b6d4" : "#3f3f46"} className="transition-colors duration-200" />
         <circle cx="170" cy="90" r="3" fill={isLineActive(2) ? "#06b6d4" : "#3f3f46"} className="transition-colors duration-200" />
         <circle cx="280" cy="90" r="3" fill={isLineActive(3) ? "#06b6d4" : "#3f3f46"} className="transition-colors duration-200" />
         <circle cx="220" cy="150" r="3" fill={isLineActive(4) ? "#06b6d4" : "#3f3f46"} className="transition-colors duration-200" />
         <circle cx="120" cy="150" r="3" fill={isLineActive(5) ? "#06b6d4" : "#3f3f46"} className="transition-colors duration-200" />

         {/* Ball */}
         <g filter="url(#glow)">
            <circle cx={light.x} cy={light.y} r="6" fill="#22d3ee" fillOpacity="0.8" />
            <circle cx={light.x} cy={light.y} r="3" fill="#ffffff" />
         </g>
      </svg>
    </div>
  );
}

function ProcessCard({ step, isActive }: { step: typeof steps[0], isActive: boolean }) {
  return (
    <motion.div
      className={`relative w-[64px] h-[64px] rounded-xl flex flex-col items-center justify-center border transition-all duration-500 z-10 ${
        isActive 
          ? 'bg-zinc-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110' 
          : 'bg-black border-zinc-800'
      }`}
    >
      <step.Icon size={18} className={`mb-1 transition-colors duration-500 ${isActive ? 'text-cyan-400' : 'text-zinc-600'}`} />
      <span className={`text-[8px] font-bold uppercase transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-600'}`}>
        {step.title}
      </span>
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border transition-colors duration-500 ${
         isActive ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-black text-zinc-700 border-zinc-800'
      }`}>
        {step.id}
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    // UPDATED PADDING: 
    // pt-4 md:pt-10 removes almost all top space above "Our Process".
    // pb-12 md:pb-32 keeps bottom space for the animation.
    <section id="process" className="pt-4 pb-12 md:pt-10 md:pb-32 bg-black relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-black to-zinc-950/50 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-0 md:mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Our Process</h2>
          <p className="text-zinc-500 text-sm md:text-base">A proven path to results.</p>
        </div>

        {/* Animation */}
        <ProcessLoop />
      </div>
    </section>
  );
}