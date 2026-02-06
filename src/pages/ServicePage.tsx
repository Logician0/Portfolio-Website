'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, Film, Code2, Sparkles, X, Globe, Terminal, Timer, CheckCircle2 } from 'lucide-react';
import { Link, useParams, useRouter } from '@/lib/router';
import { getServiceBySlug } from '@/lib/data';
import type { Item, Category } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = { Bot, Film, Code2 };

// --- ITEM MODAL ---
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
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
          <motion.div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto font-sans" initial={{ scale: 0.98, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} aria-label="Close modal" className="absolute top-3 right-3 z-20 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="rounded-xl overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl">
              <div className="aspect-video relative bg-zinc-900">
                <img src={item.thumbnail} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-medium">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 text-[9px] uppercase tracking-wider font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                {metadata.url && (
                  <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-white text-black font-bold text-[10px] uppercase tracking-tight hover:bg-pink-500 hover:text-white transition-all">
                    Launch Project
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

  const themeConfig: Record<string, { bg: string; text: string; border: string }> = {
    violet: { bg: 'from-violet-600', text: 'text-violet-400', border: 'border-violet-500/20' },
    pink:   { bg: 'from-pink-600',   text: 'text-pink-400',   border: 'border-pink-500/20' },
    cyan:   { bg: 'from-cyan-600',   text: 'text-cyan-400',   border: 'border-cyan-500/20' },
  };

  const theme = themeConfig[service.color] || { bg: 'from-white', text: 'text-zinc-400', border: 'border-white/5' };

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
      <div className="min-h-screen bg-black pt-12 pb-16 px-4 sm:px-8 selection:bg-pink-500/30 font-sans">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-10">
            <Link to="/" aria-label="Back to home" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 text-[10px] uppercase font-bold tracking-widest transition-all group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Studio
            </Link>
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
                   <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${theme.text}`} />
                   <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight uppercase leading-none">
                     {service.title === 'Web Development' ? 'Web Engineering' : service.title}
                   </h1>
                </motion.div>
                
                <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed max-w-md font-medium">
                  {service.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:hidden mb-12 -mx-4 px-4 overflow-x-auto no-scrollbar flex gap-2">
            <div className={`flex-shrink-0 px-3 py-1.5 rounded-md border ${theme.border} bg-white/[0.02] flex items-center gap-1.5`}>
               <Sparkles className={`w-3 h-3 ${theme.text}`} />
               <span className={`text-[9px] font-bold uppercase tracking-widest ${theme.text}`}>Capabilities</span>
            </div>
            {["Rapid Delivery", "24/7 Support", "Enterprise Scale", "Custom Built"].map((item, i) => (
               <div key={i} className="flex-shrink-0 px-3 py-1.5 rounded-md border border-white/5 bg-zinc-900/30 text-[9px] text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap">
                  {item}
               </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="hidden lg:block lg:col-span-3 space-y-6">
               <div className="p-6 rounded-xl border border-white/5 bg-zinc-900/20">
                  <h2 className="font-bold text-white mb-5 text-[10px] uppercase tracking-wider">Core Capabilities</h2>
                  <ul className="space-y-3">
                     {["Rapid Delivery", "24/7 Support", "Enterprise Scale", "Custom Built"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
                           <CheckCircle2 className={`w-3.5 h-3.5 ${theme.text}`} /> {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="lg:col-span-9">
              {isLocked ? (
                <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-white/5 bg-zinc-900/10 text-center backdrop-blur-sm">
                  <Timer className="w-5 h-5 text-zinc-800 mb-4" />
                  <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Encrypted Data</h2>
                  <p className="text-[9px] text-zinc-700 mt-2 uppercase tracking-wider font-medium">Case studies pending release.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {isVideoService && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {service.categories.map((category, idx) => (
                        <motion.div
                           key={category.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.03 }}
                           onClick={() => handleCategoryClick(category)}
                           className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-lg shadow-black/50 will-change-transform"
                        >
                           <img src={category.image} alt={category.title} loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                           <div className="absolute bottom-0 inset-x-0 p-4">
                              <div className="text-[8px] font-bold text-white/40 mb-1.5 uppercase tracking-widest">{category.items.length} Projects</div>
                              <h3 className="text-sm sm:text-base font-bold text-white leading-tight uppercase tracking-tight">{category.title}</h3>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {!isVideoService && service.categories.map((category) => (
                    <div key={category.id} className="bg-zinc-900/10 border border-white/5 rounded-xl p-5 sm:p-6 mb-8">
                      <div className="flex items-center gap-4 mb-6">
                         <h2 className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider">{category.title}</h2>
                         <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {category.items.map((item) => (
                           <div 
                             key={item.id} 
                             onClick={() => handleItemClick(item)}
                             className="group bg-zinc-950 border border-white/5 rounded-lg overflow-hidden cursor-pointer hover:border-white/10 transition-all duration-300 will-change-[border-color]"
                           >
                             <div className="aspect-square bg-zinc-900 relative overflow-hidden">
                                <img src={item.thumbnail} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                   {item.metadata.type === 'web' ? <Globe className="w-2.5 h-2.5 text-white" /> : <Terminal className="w-2.5 h-2.5 text-white" />}
                                </div>
                             </div>
                             
                             <div className="p-3">
                                <h3 className="text-[10px] font-bold text-zinc-100 uppercase tracking-tight line-clamp-1 group-hover:text-pink-500 transition-colors leading-none mb-2">{item.title}</h3>
                                <div className="flex gap-1.5 mt-1.5 overflow-hidden">
                                   {item.tags.slice(0, 2).map(tag => (
                                      <span key={tag} className="text-[8px] font-bold text-zinc-400 uppercase tracking-tight">#{tag}</span>
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