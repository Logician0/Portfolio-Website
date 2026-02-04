'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { cn } from '@/utils/cn';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="relative py-10 sm:py-14 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header - Compact */}
        <motion.div
          className="text-center mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-xs text-zinc-400 mb-2 sm:mb-3">
            Testimonials
          </span>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{ letterSpacing: '-0.03em' }}>
            <span className="text-white">Client </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Love
            </span>
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-zinc-500">
            Don't just take our word for it
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative"
            >
              {/* Mobile Card - Ultra Compact */}
              <div className="rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-3 sm:p-5 md:p-8 lg:p-12">
                {/* Quote Icon */}
                <motion.div 
                  className="absolute -top-3 left-3 sm:-top-5 sm:left-6 w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                >
                  <Quote className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                </motion.div>

                {/* Stars */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 flex gap-0.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-[13px] sm:text-sm md:text-lg lg:text-2xl text-white leading-relaxed mb-3 sm:mb-5 md:mb-8 pt-3 sm:pt-5 line-clamp-4 sm:line-clamp-none">
                  "{current.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <motion.img
                    src={current.avatar}
                    alt={current.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm md:text-base">{current.name}</div>
                    <div className="text-[9px] sm:text-[11px] md:text-sm text-zinc-400">
                      {current.role} at <span className="text-violet-400">{current.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 md:mt-8">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    'h-1.5 sm:h-2 rounded-full transition-all duration-300',
                    i === currentIndex
                      ? 'w-5 sm:w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500'
                      : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                  )}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 sm:mt-6 mx-auto max-w-[200px] sm:max-w-xs">
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                initial={{ width: '0%' }}
                animate={{ width: isAutoPlaying ? '100%' : '0%' }}
                transition={{ 
                  duration: isAutoPlaying ? 6 : 0,
                  ease: 'linear'
                }}
                key={`${currentIndex}-${isAutoPlaying}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
