'use client';

import React, { Suspense, lazy } from 'react';
import { RouterProvider, Routes, Route } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// ✅ 1. Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const ServicePage = lazy(() => import('@/pages/ServicePage').then(module => ({ default: module.ServicePage })));
const VideoCategoryPage = lazy(() => import('@/pages/VideoCategoryPage').then(module => ({ default: module.VideoCategoryPage })));
const CareersPage = lazy(() => import('@/pages/CareersPage').then(module => ({ default: module.CareersPage })));

// ❌ REMOVED: ProjectCinema import (since we deleted the file)

// Simple loading spinner
const PageLoader = () => (
  <div className="h-screen w-full bg-black flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
  </div>
);

export function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-black text-white antialiased cursor-default">
        <Navbar />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" component={HomePage} />
            <Route path="/careers" component={CareersPage} />
            
            {/* ❌ REMOVED: The /watch/:id route is no longer needed. 
                The VideoCategoryPage below now handles playing videos directly. */}

            {/* Route for Video Categories (Player is now INSIDE here) */}
            <Route path="/services/video-editing/:categoryId" component={VideoCategoryPage} />
            
            {/* Generic Service Page (Web Dev, AI, etc.) */}
            <Route path="/services/:slug" component={ServicePage} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </RouterProvider>
  );
}