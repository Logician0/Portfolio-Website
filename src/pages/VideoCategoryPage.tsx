'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import { useParams, useRouter } from '@/lib/router';
import { services } from '@/lib/data';
import { cn } from '@/utils/cn';

export function VideoCategoryPage() {
  const { categoryId } = useParams();
  const { navigate } = useRouter();
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  // 1. Find the video service data
  const videoService = services.find(s => s.slug === 'video-editing');
  
  // 2. Find the specific category based on URL
  const category = videoService?.categories.find(c => c.id === categoryId);
  
  // 3. Get videos
  const videos = category?.items.filter(item => item.metadata.type === 'video') || [];

  // 4. Auto-select first video
  useEffect(() => {
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [videos, currentVideo]);

  if (!category || !videoService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <button onClick={() => navigate('/services/video-editing')} className="text-pink-400 hover:underline">
            Back to Video Editing
          </button>
        </div>
      </div>
    );
  }

  const handleVideoClick = (video: any) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- STRICT BACK NAVIGATION ---
  const handleBack = () => {
    // Force navigation directly to the parent page.
    // No history checks. No loops. Just go to the menu.
    navigate('/services/video-editing');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">{category.title}</h1>
          </div>
          <p className="text-zinc-400 max-w-2xl">{category.description}</p>
        </div>

        {/* Main Video Player */}
        {currentVideo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className={cn(
              "relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl shadow-pink-900/10",
              currentVideo.metadata.aspect === '9/16' ? 'max-w-sm mx-auto' : 'w-full aspect-video'
            )}>
              <div className={cn(
                "relative",
                currentVideo.metadata.aspect === '9/16' ? 'aspect-[9/16]' : 'w-full h-full'
              )}>
                <iframe
                  key={currentVideo.metadata.youtubeId}
                  src={`https://www.youtube.com/embed/${currentVideo.metadata.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h2>
              <p className="text-zinc-400 mb-4">{currentVideo.description}</p>
              <div className="flex flex-wrap gap-2">
                {currentVideo.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-300 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Playlist Grid */}
        <div className="border-t border-white/10 pt-10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            More in {category.title}
            <span className="text-sm font-normal text-zinc-500 ml-2">({videos.length} videos)</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <motion.button
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className={cn(
                  "group relative text-left rounded-xl overflow-hidden border transition-all duration-300",
                  currentVideo?.id === video.id 
                    ? "border-pink-500 ring-1 ring-pink-500 bg-white/5" 
                    : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                )}
                whileHover={{ y: -4 }}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* "Now Playing" Badge */}
                  {currentVideo?.id === video.id && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded bg-pink-500 text-[10px] font-bold text-white shadow-sm">
                      NOW PLAYING
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h4 className={cn(
                    "font-medium line-clamp-1 mb-1 group-hover:text-pink-400 transition-colors",
                    currentVideo?.id === video.id ? "text-pink-400" : "text-white"
                  )}>
                    {video.title}
                  </h4>
                  <p className="text-xs text-zinc-500 line-clamp-2">{video.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}