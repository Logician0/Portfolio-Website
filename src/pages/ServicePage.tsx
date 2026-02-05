'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, Film, Code2, Sparkles, X, Globe, Terminal, Timer, CheckCircle2 } from 'lucide-react';
import { Link, useParams, useRouter } from '@/lib/router';
import { getServiceBySlug } from '@/lib/data';
import type { Item, Category } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = { Bot, Film, Code2 };

// --- ITEM MODAL (UNCHANGED) ---
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
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
          <motion.div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-3 right-3 z-20 p-2 bg-black/60 rounded-full text-white"><X className="w-5 h-5" /></button>
            <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
              <div className="aspect-video relative">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => <span key={tag} className="px-2 py-1 rounded-md text-[10px] bg-white/5 text-zinc-300 border border-white/10 uppercase tracking-wide">{tag}</span>)}
                </div>
                {metadata.url && (
                  <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-xl bg-white text-black font-bold text-sm">
                    Visit Website
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

// --- MAIN PAGE ---
export function ServicePage() {
  const { slug } = useParams();
  const { navigate } = useRouter();
  const service = getServiceBySlug(slug || '');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  if (!service) return <div className="min-h-screen bg-black" />;

  const Icon = iconMap[service.icon] || Bot;
  const isVideoService = service.slug === 'video-editing';
  const isLocked = service.slug === 'ai-agents';

  // Theme Colors
  const theme = {
    violet: { bg: 'from-violet-600', text: 'text-violet-400', border: 'border-violet-500/30' },
    pink:   { bg: 'from-pink-600',   text: 'text-pink-400',   border: 'border-pink-500/30' },
    cyan:   { bg: 'from-cyan-600',   text: 'text-cyan-400',   border: 'border-cyan-500/30' },
  }[service.color] || { bg: 'from-white', text: 'text-zinc-400', border: 'border-white/10' };

  const handleCategoryClick = (category: Category) => { if (isVideoService) navigate(`/services/video-editing/${category.id}`); };
  const handleItemClick = (item: Item) => {
    if (item.metadata.type === 'web' && item.metadata.url) window.open(item.metadata.url, '_blank', 'noopener,noreferrer');
    else { setSelectedItem(item); setIsItemModalOpen(true); }
  };

  return (
    <>
      <div className="min-h-screen bg-black pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* --- 1. COMPACT HEADER --- */}
          <div className="mb-6 lg:mb-10">
            <Link to="/" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white mb-6 text-[10px] uppercase font-bold tracking-widest transition-colors">
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
            
            <div className="flex items-start justify-between gap-4">
              <div>
                {/* --- CHANGED: Flex container to put Icon and Title side-by-side --- */}
                <motion.div 
                   initial={{ opacity: 0, y: 5 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   className="flex items-center gap-3 sm:gap-4 mb-3"
                >
                   <Icon className={`w-6 h-6 sm:w-10 sm:h-10 ${theme.text}`} />
                   <h1 className="text-2xl sm:text-5xl font-bold text-white tracking-tight leading-none">
                     {service.title === 'Web Development' ? 'Web Engineering' : service.title}
                   </h1>
                </motion.div>
                
                <p className="text-xs sm:text-base text-zinc-400 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none ml-1">
                  {service.description}
                </p>
              </div>
            </div>
          </div>

          {/* --- 2. MOBILE SCROLLABLE CAPABILITIES --- */}
          <div className="lg:hidden mb-8 -mx-4 px-4 overflow-x-auto no-scrollbar flex gap-2">
            <div className={`flex-shrink-0 px-3 py-1.5 rounded-full border ${theme.border} bg-white/[0.02] flex items-center gap-1.5`}>
               <Sparkles className={`w-3 h-3 ${theme.text}`} />
               <span className={`text-[10px] font-bold ${theme.text}`}>Why Us?</span>
            </div>
            {["Rapid Delivery", "24/7 Support", "Enterprise Scale", "Custom Built"].map((item, i) => (
               <div key={i} className="flex-shrink-0 px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900/50 text-[10px] text-zinc-300 font-medium whitespace-nowrap">
                  {item}
               </div>
            ))}
          </div>

          {/* --- 3. MAIN CONTENT GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Desktop Sidebar (Hidden on Mobile) */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
               <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/20">
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Capabilities</h3>
                  <ul className="space-y-3">
                     {["Rapid Delivery", "24/7 Support", "Enterprise Scale", "Custom Built"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                           <CheckCircle2 className={`w-4 h-4 ${theme.text}`} /> {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9">
              {isLocked ? (
                <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.bg} to-transparent flex items-center justify-center mb-4 opacity-80`}>
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">Coming Soon</h2>
                  <p className="text-xs text-zinc-500">Case studies dropping shortly.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* VIDEO EDITING: Compact 2-Col Grid on Mobile */}
                  {isVideoService && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {service.categories.map((category, idx) => (
                        <motion.div
                           key={category.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.05 }}
                           onClick={() => handleCategoryClick(category)}
                           className="group relative aspect-[3/4] sm:aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer"
                        >
                           <img src={category.image} alt={category.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                           <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4">
                              <div className="text-[9px] font-bold text-white/70 mb-1 uppercase tracking-wider">{category.items.length} Projects</div>
                              <h3 className="text-sm sm:text-lg font-bold text-white leading-tight">{category.title}</h3>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* WEB & AI: Forced 2-Col Grid on Mobile (High Density) */}
                  {!isVideoService && service.categories.map((category) => (
                    <div key={category.id} className="bg-zinc-900/20 border border-white/5 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-baseline gap-2 mb-4">
                         <h2 className="text-sm sm:text-lg font-bold text-white">{category.title}</h2>
                         <div className="h-px flex-1 bg-white/10"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {category.items.map((item) => (
                           <div 
                             key={item.id} 
                             onClick={() => handleItemClick(item)}
                             className="group bg-black border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
                           >
                             <div className="aspect-[4/3] sm:aspect-video bg-zinc-800 relative overflow-hidden">
                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-2 right-2">
                                   {item.metadata.type === 'web' ? <Globe className="w-3 h-3 text-white drop-shadow-md" /> : <Terminal className="w-3 h-3 text-white drop-shadow-md" />}
                                </div>
                             </div>
                             
                             <div className="p-3">
                                <h3 className="text-xs sm:text-sm font-bold text-zinc-100 mb-1 line-clamp-1">{item.title}</h3>
                                <p className="text-[10px] text-zinc-500 line-clamp-2 leading-tight mb-2">{item.description}</p>
                                <div className="flex flex-wrap gap-1">
                                   {item.tags.slice(0, 2).map(tag => (
                                      <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-white/5 text-zinc-400 rounded border border-white/5">
                                         {tag}
                                      </span>
                                   ))}
                                </div>
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
      <ItemModal item={selectedItem} isOpen={isItemModalOpen} onClose={() => { setIsItemModalOpen(false); setSelectedItem(null); }} />
    </>
  );
}