'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Item } from '@/lib/types';

interface VideoModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ item, isOpen, onClose }: VideoModalProps) {
  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!item) return null;

  const { metadata } = item;
  const isVideo = metadata.type === 'video' && metadata.youtubeId;
  const isWeb = metadata.type === 'web' && metadata.url;
  const aspectRatio = metadata.aspect === '9/16' ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Video Player */}
            {isVideo && (
              <div className={`relative w-full ${metadata.aspect === '9/16' ? 'max-w-sm mx-auto' : ''}`}>
                <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-zinc-900 border border-white/10`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${metadata.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Web Project Preview */}
            {isWeb && (
              <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full max-w-2xl mx-auto rounded-xl mb-8 shadow-2xl"
                    />
                    <motion.a
                      href={metadata.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            )}

            {/* Item Details */}
            <motion.div 
              className="mt-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features for AI items */}
              {metadata.features && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-medium text-zinc-500 mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {metadata.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-lg text-sm bg-violet-500/10 text-violet-300 border border-violet-500/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stack for Web items */}
              {metadata.stack && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-medium text-zinc-500 mb-2">Tech Stack</h4>
                  <p className="text-cyan-400 font-mono text-sm">{metadata.stack}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
