'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100vh] bg-zinc-950 overflow-hidden selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Base Dark Background */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* 2. Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" 
          style={{ backgroundSize: '24px 24px' }}
        />
      </div>

      {/* 3. Blue Light Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] -mt-[150px] rounded-full opacity-60 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 80%)' }}
      />
      
      {/* 4. Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60 pointer-events-none" />

      {/* --- CONTENT --- */}
      {/* Removed 'sticky top-0' so it scrolls naturally */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6 md:mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-xs font-medium text-cyan-200 tracking-wide uppercase">
              Accepting New Projects
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="text-white">Turn Views Into </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Growth
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
          >
            AI experiences • Cinematic content • World-class web platforms
          </motion.p>

          {/* Service Pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 30 }}
          >
            {[
              { label: 'AI Agents', color: 'from-blue-500 to-indigo-500' },
              { label: 'Video', color: 'from-cyan-500 to-blue-500' },
              { label: 'Web Dev', color: 'from-indigo-500 to-violet-500' },
            ].map((item) => (
              <span
                key={item.label}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white shadow-lg shadow-blue-500/10 border border-white/10`}
              >
                {item.label}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.a
              href="#contact"
              className="group relative px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-sm w-full sm:w-auto text-center overflow-hidden transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Project
                <span>→</span>
              </span>
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.a
              href="#services"
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium text-sm w-full sm:w-auto text-center hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-white/5 w-full max-w-3xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
          >
            {[
              { value: '500+', label: 'Projects' },
              { value: '340%', label: 'Growth' },
              { value: '50M+', label: 'Views' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}