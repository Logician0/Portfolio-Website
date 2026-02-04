'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
    
    // Reset after success
    setTimeout(() => {
      setEmail('');
      setStatus('idle');
    }, 4000);
  };

  return (
    <section className="relative py-8 sm:py-10 md:py-14 px-4 sm:px-6 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Icon - Smaller */}
          <motion.div
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 mb-3 sm:mb-4"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
          </motion.div>

          {/* Heading - Compact */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2" style={{ letterSpacing: '-0.02em' }}>
            <span className="text-white">Stay in the </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Loop
            </span>
          </h2>
          
          <p className="text-zinc-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-md mx-auto">
            Get insights, updates, and creative inspiration delivered to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-sm sm:text-base">You're in! Check your inbox.</span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={status === 'loading'}
                      className={cn(
                        'w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-full',
                        'bg-white/5 border border-white/10',
                        'text-white placeholder:text-zinc-600 text-sm sm:text-base',
                        'focus:outline-none focus:border-violet-500/50 focus:bg-white/10',
                        'transition-all duration-300',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={status === 'loading' || !email.includes('@')}
                    className={cn(
                      'px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-full font-medium text-sm sm:text-base',
                      'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500',
                      'text-white flex items-center justify-center gap-2',
                      'hover:opacity-90 transition-opacity',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span className="hidden sm:inline">Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              'No spam, ever',
              'Unsubscribe anytime',
              '10K+ subscribers'
            ].map((text) => (
              <span key={text} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
