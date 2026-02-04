'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, Film, Code2, Play, ExternalLink, Sparkles, X, Globe, Terminal, Timer } from 'lucide-react';
import { Link, useParams, useRouter } from '@/lib/router';
import { getServiceBySlug } from '@/lib/data';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import type { Item, Category } from '@/lib/types';
import { cn } from '@/utils/cn';

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Film,
  Code2,
};

// Item Modal for AI and Web items (Kept exactly as provided)
interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: true }, '');
      const handlePopState = () => onClose();
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('popstate', handlePopState);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose, handleKeyDown]);

  if (!item) return null;
  const { metadata } = item;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-white/20">
              <X className="w-6 h-6" />
            </button>

            <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
              <div className="aspect-video relative">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {metadata.features && (
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-zinc-500 mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {metadata.features.map((feature) => (
                        <span key={feature} className="px-3 py-1.5 rounded-lg text-sm bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {metadata.url && (
                  <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const { navigate } = useRouter();
  const service = getServiceBySlug(slug || '');
  
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
          <Link to="/" className="text-zinc-400 hover:text-white">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Bot;
  const isVideoService = service.slug === 'video-editing';
  const isWebService = service.slug === 'web-dev';

  // --- NEW: CONFIGURATION FOR BLOCKING PROJECTS ---
  const isLocked = service.slug === 'ai-agents'; // Set to true only for AI

  // --- Theme System ---
  const theme = {
    violet: { bg: 'from-violet-500/20', glow: 'shadow-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/20' },
    pink:   { bg: 'from-pink-500/20',   glow: 'shadow-pink-500/20',   text: 'text-pink-400',   border: 'border-pink-500/20' },
    cyan:   { bg: 'from-cyan-500/20',   glow: 'shadow-cyan-500/20',   text: 'text-cyan-400',   border: 'border-cyan-500/20' },
  }[service.color] || { bg: 'from-violet-500/20', glow: 'shadow-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/20' };

  const handleCategoryClick = (category: Category) => {
    if (isVideoService) navigate(`/services/video-editing/${category.id}`);
  };

  const handleItemClick = (item: Item) => {
    if (item.metadata.type === 'web' && item.metadata.url) {
      window.open(item.metadata.url, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedItem(item);
      setIsItemModalOpen(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black pt-20 sm:pt-24 pb-16 sm:pb-32">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="relative px-4 sm:px-6 pb-12 sm:pb-20 overflow-hidden">
          {/* Immersive Background Glow */}
          <div className="absolute top-0 left-0 right-0 h-[80vh] pointer-events-none">
             <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b ${theme.bg} to-transparent opacity-30 blur-[120px]`} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Back Link */}
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
              <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:border-white/10">
                 <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Return Home</span>
            </Link>

            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10"
            >
               {/* 3D Glass Icon */}
               <div className={`w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${theme.bg} backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl ${theme.glow}`}>
                  <Icon className="w-10 h-10 md:w-16 md:h-16 text-white drop-shadow-lg" />
               </div>
               
               <div className="flex-1">
                  <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 text-white">{service.title}</h1>
                  <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed border-l-2 border-white/10 pl-4 md:pl-6">
                     {service.description}
                  </p>
               </div>
            </motion.div>
          </div>
        </section>

        {/* --- 2. CONTENT SECTION --- */}
        <section className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* NEW: Conditional Rendering for "Coming Soon" */}
            {isLocked ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 px-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${theme.bg} flex items-center justify-center mb-6 border border-white/10 shadow-2xl`}>
                  <Timer className={`w-8 h-8 ${theme.text} animate-pulse`} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Case Studies Coming Soon</h2>
                <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">
                  We are currently documenting our latest {service.title.toLowerCase()} success stories. Check back shortly to see our work in action.
                </p>
                <div className="mt-8 flex gap-3">
                   <div className={`w-2 h-2 rounded-full ${theme.text.replace('text-', 'bg-')} animate-bounce`} />
                   <div className={`w-2 h-2 rounded-full ${theme.text.replace('text-', 'bg-')} animate-bounce [animation-delay:-0.15s]`} />
                   <div className={`w-2 h-2 rounded-full ${theme.text.replace('text-', 'bg-')} animate-bounce [animation-delay:-0.3s]`} />
                </div>
              </motion.div>
            ) : (
              <>
                {/* LAYOUT A: VIDEO EDITING (Cinema Posters) */}
                {isVideoService && (
                   <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                      {service.categories.map((category, idx) => (
                         <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                         >
                            <SpotlightCard className="h-full cursor-pointer group" spotlightColor="rgba(236, 72, 153, 0.2)">
                               <div onClick={() => handleCategoryClick(category)} className="relative h-[220px] sm:h-[350px] overflow-hidden">
                                  <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8">
                                     <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                        <div className="p-1.5 sm:p-2 rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/20">
                                           <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                                        </div>
                                        <span className="text-[8px] sm:text-[10px] font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-white border border-white/10">
                                           {category.items.length} VIDEOS
                                        </span>
                                     </div>
                                     <h3 className="text-sm sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight">{category.title}</h3>
                                     <p className="text-zinc-300 text-[10px] sm:text-sm line-clamp-2 leading-tight">{category.description}</p>
                                  </div>
                               </div>
                            </SpotlightCard>
                         </motion.div>
                      ))}
                   </div>
                )}

                {/* LAYOUT B: WEB & AI (Tech Interface Cards) */}
                {!isVideoService && (
                   <div className="space-y-12 sm:space-y-20">
                      {service.categories.map((category, idx) => (
                         <div key={category.id}>
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                               <div className={`h-6 w-1 sm:h-8 rounded-full bg-gradient-to-b ${theme.bg.replace('/20', '')} to-transparent`} />
                               <h2 className="text-xl sm:text-3xl font-bold text-white">{category.title}</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                               {category.items.map((item) => (
                                  <SpotlightCard 
                                     key={item.id} 
                                     className="cursor-pointer group h-full bg-zinc-900/50"
                                     spotlightColor={isWebService ? "rgba(6, 182, 212, 0.1)" : "rgba(139, 92, 246, 0.1)"}
                                  >
                                     <div onClick={() => handleItemClick(item)} className="h-full flex flex-col">
                                        <div className="relative border-b border-white/5 bg-black/40">
                                           {isWebService ? (
                                              <div className="px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2">
                                                 <div className="flex gap-1.5 opacity-50">
                                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/20" />
                                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/20" />
                                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/20" />
                                                 </div>
                                                 <div className="ml-auto opacity-30"><Globe className="w-3 h-3 text-zinc-400" /></div>
                                              </div>
                                           ) : (
                                              <div className="px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between font-mono text-[8px] sm:text-[10px] text-zinc-500">
                                                 <span>./run-agent</span>
                                                 <Terminal className="w-3 h-3" />
                                              </div>
                                           )}
                                        </div>
                                        <div className="relative aspect-video overflow-hidden">
                                           <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                        <div className="p-3 sm:p-5 flex-1 flex flex-col">
                                           <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-white transition-colors text-zinc-100 leading-tight">{item.title}</h3>
                                           <p className="text-[10px] sm:text-sm text-zinc-400 mb-3 line-clamp-2 flex-1 leading-relaxed">{item.description}</p>
                                           <div className="flex flex-wrap gap-1.5 mt-auto">
                                              {item.tags.slice(0, 2).map(tag => (
                                                 <span key={tag} className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 rounded bg-white/5 text-zinc-500 border border-white/5">
                                                    {tag}
                                                 </span>
                                              ))}
                                           </div>
                                        </div>
                                     </div>
                                  </SpotlightCard>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                )}
              </>
            )}
            
          </div>
        </section>

        {/* --- 3. CTA FOOTER --- */}
        <section className="px-4 sm:px-6 mt-20 sm:mt-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center border border-white/10 bg-white/[0.02]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} to-transparent opacity-10`} />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                  Ready to start your project?
                </h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                  Let's discuss how we can bring your vision to life with our {service.title.toLowerCase()} expertise.
                </p>
                <button
                  onClick={() => {
                    window.location.hash = '/';
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${theme.bg.replace('/20', '')} to-white/10 hover:opacity-90 transition-opacity`}
                >
                  Start Project →
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>

      <ItemModal
        item={selectedItem}
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </>
  );
}