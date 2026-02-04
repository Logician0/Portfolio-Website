'use client';

import { motion } from 'framer-motion';
import { tools } from '@/lib/data';
import { cn } from '@/utils/cn';

export function Marquee() {
  const toolsRow1 = tools.slice(0, 10);
  const toolsRow2 = tools.slice(10).concat(tools.slice(0, 5));

  return (
    <section className="py-8 sm:py-12 md:py-16 overflow-hidden border-y border-white/5">
      {/* Section Label - Compact */}
      <motion.div 
        className="text-center mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <span className="inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-zinc-400">
          Powered By Excellence
        </span>
      </motion.div>

      {/* Row 1 - Left to Right */}
      <div className="relative mb-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <div className="flex marquee">
          {[...toolsRow1, ...toolsRow1].map((tool, index) => (
            <motion.div
              key={`${tool.id}-${index}`}
              className={cn(
                'flex-shrink-0 mx-1.5 sm:mx-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl',
                'border border-white/10 bg-white/[0.02] backdrop-blur-xl',
                'flex items-center gap-2 sm:gap-3 group cursor-pointer',
                'hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300'
              )}
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <span className="text-base sm:text-2xl">{tool.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <div className="flex marquee-reverse">
          {[...toolsRow2, ...toolsRow2].map((tool, index) => (
            <motion.div
              key={`${tool.id}-rev-${index}`}
              className={cn(
                'flex-shrink-0 mx-3 px-5 py-3 rounded-2xl',
                'border border-white/10 bg-white/[0.02] backdrop-blur-xl',
                'flex items-center gap-3 group cursor-pointer',
                'hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300'
              )}
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expertise Areas - Compact */}
      <motion.div 
        className="mt-6 sm:mt-10 max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          {[
            { label: 'Frontend', count: '8+' },
            { label: 'AI/ML', count: '5+' },
            { label: 'Video', count: '6+' },
            { label: 'Cloud', count: '4+' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="p-2 sm:p-3 rounded-lg border border-white/5 bg-white/[0.01]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <div className="text-base sm:text-xl font-bold text-white">{item.count}</div>
              <div className="text-[9px] sm:text-xs text-zinc-500">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
