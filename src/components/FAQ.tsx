'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What makes Logician Creatives different?",
    answer: "We don't just build websites or edit videos; we build ecosystems. Our unique blend of AI automation, high-end motion design, and performance engineering ensures your brand doesn't just look good—it dominates."
  },
  {
    question: "How does your subscription model work?",
    answer: "We offer flexible monthly retainers for continuous growth. You get a dedicated team, priority support, and a set amount of hours/deliverables per month. Pause or cancel anytime with transparent pricing."
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely. We love ambitious founders. We have specific packages designed to get startups from zero to one, focusing on MVP development, pitch decks, and launch content."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "For video edits, typically 24-48 hours. For web projects, a landing page takes 1-2 weeks, while full platforms take 4-8 weeks depending on complexity. We move fast without breaking things."
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    // REDUCED PADDING: py-10 for mobile (was py-20)
    <section id="faq" className="py-10 md:py-24 bg-zinc-950/50 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-sm md:text-base">Everything you need to know.</p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/5 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
              >
                <span className="text-sm md:text-lg font-medium text-zinc-200 pr-4">
                  {faq.question}
                </span>
                <span className={`p-1 rounded-full border border-white/10 transition-colors ${activeIndex === index ? 'bg-cyan-500/20 text-cyan-400' : 'text-zinc-400'}`}>
                  {activeIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-4 md:px-6 md:pb-6 text-sm md:text-base text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}