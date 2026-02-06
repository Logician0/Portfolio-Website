'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Sparkles, Share2, ThumbsUp } from 'lucide-react';
import { useParams, useRouter } from '@/lib/router';
import { services } from '@/lib/data';
import { cn } from '@/utils/cn';

export function VideoCategoryPage() {
  const { categoryId } = useParams();
  const { navigate } = useRouter();
  
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  // 1. Find Data
  const videoService = services.find(s => s.slug === 'video-editing');
  const category = videoService?.categories.find(c => c.id === categoryId);
  const videos = category?.items.filter(item => item.metadata.type === 'video') || [];
  
  const relatedVideos = videos.filter(v => v.id !== currentVideo?.id);

  const horizontalVideos = relatedVideos.filter(v => v.metadata?.aspect !== '9/16');
  const verticalVideos = relatedVideos.filter(v => v.metadata?.aspect === '9/16');
  const sortedVideos = [...horizontalVideos, ...verticalVideos];

  useEffect(() => {
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [videos, currentVideo]);

  if (!category || !videoService) return <div className="min-h-screen bg-black" />;

  const handleVideoClick = (video: any) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => navigate('/services/video-editing');

  const isVertical = currentVideo?.metadata?.aspect === '9/16';

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Back Button - ACCESSIBILITY: Added aria-label */}
        <button 
          onClick={handleBack}
          aria-label="Back to video category gallery"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors group bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </button>

        {currentVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8">
              
              {/* VIDEO PLAYER */}
              <div className="mb-6 relative flex justify-center">
                <div className={cn(
                  "relative transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-white/5",
                  isVertical 
                    ? "w-full max-w-[300px] lg:max-w-[300px] aspect-[9/16]" 
                    : "w-full aspect-video"
                )}>
                  {currentVideo.metadata.youtubeId ? (
                    <iframe
                      key={currentVideo.metadata.youtubeId}
                      src={`https://www.youtube.com/embed/${currentVideo.metadata.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      title={`Video player: ${currentVideo.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy" /* PERFORMANCE: Defer non-critical iframe */
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 bg-zinc-900">Video Source Missing</div>
                  )}
                </div>
              </div>

              {/* VIDEO INFO */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{currentVideo.title}</h1>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                   <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1.5 text-pink-400 font-medium">
                         <Sparkles className="w-4 h-4" /> {category.title} Series
                      </span>
                   </div>
                   <div className="flex items-center gap-3">
                      {/* ACCESSIBILITY: Added aria-label to buttons without visible text descriptions */}
                      <button aria-label="Like this video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
                        <ThumbsUp className="w-4 h-4" /> Like
                      </button>
                      <button aria-label="Share this video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                   </div>
                </div>
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/5">
                   {/* CONTRAST: Changed to text-zinc-300 for better readability */}
                   <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {currentVideo.description || "No description provided."}
                   </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                 <h2 className="text-lg font-bold text-white mb-4">Up Next</h2>
                 
                 <div className="grid grid-cols-2 gap-4">
                    {sortedVideos.map((video) => {
                       const isCardVertical = video.metadata?.aspect === '9/16';

                       return (
                         <button
                            key={video.id}
                            onClick={() => handleVideoClick(video)}
                            aria-label={`Play video: ${video.title}`}
                            className={cn(
                              "group flex flex-col p-2 rounded-xl hover:bg-white/5 transition-colors text-left bg-transparent border-none cursor-pointer",
                              isCardVertical ? "col-span-1" : "col-span-2"
                            )}
                         >
                            {/* THUMBNAIL */}
                            <div className={cn(
                                "relative w-full rounded-lg overflow-hidden bg-zinc-800 border border-white/5 mb-3",
                                isCardVertical ? "aspect-[9/16]" : "aspect-video"
                            )}>
                               <img 
                                  src={video.thumbnail} 
                                  alt="" /* Decorative icon pattern, title is in heading below */
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                               />
                               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                     <Play className="w-4 h-4 text-white fill-current" />
                                  </div>
                               </div>
                            </div>

                            {/* TEXT */}
                            <div className="flex flex-col min-w-0">
                               <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-1 group-hover:text-pink-400 transition-colors">
                                  {video.title}
                               </h3>
                               {/* CONTRAST: Changed text-zinc-500 to text-zinc-400 */}
                               <p className="text-xs text-zinc-400 line-clamp-1">{category.title}</p>
                            </div>
                         </button>
                       );
                    })}
                 </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}