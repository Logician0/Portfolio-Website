'use client';

import React, { Suspense, lazy } from 'react'; // Added lazy and Suspense
import { RouterProvider, Routes, Route } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// ✅ 1. Use React.lazy for all page components
const HomePage = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const ServicePage = lazy(() => import('@/pages/ServicePage').then(module => ({ default: module.ServicePage })));
const VideoCategoryPage = lazy(() => import('@/pages/VideoCategoryPage').then(module => ({ default: module.VideoCategoryPage })));
const CareersPage = lazy(() => import('@/pages/CareersPage').then(module => ({ default: module.CareersPage })));

// A simple loading component to show while the page is being "fetched"
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

        {/* ✅ 2. Wrap Routes in Suspense */}
        {/* The fallback is what users see for a split second while the page loads */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" component={HomePage} />
            <Route path="/careers" component={CareersPage} />
            
            {/* Specific route for video categories */}
            <Route path="/services/video-editing/:categoryId" component={VideoCategoryPage} />
            
            <Route path="/services/:slug" component={ServicePage} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </RouterProvider>
  );
}