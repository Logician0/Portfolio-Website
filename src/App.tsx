'use client';

import React, { Suspense, lazy } from 'react';
// ✅ FIX: Import EVERYTHING from standard 'react-router-dom' to prevent conflicts
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const ServicePage = lazy(() => import('@/pages/ServicePage').then(module => ({ default: module.ServicePage })));
const VideoCategoryPage = lazy(() => import('@/pages/VideoCategoryPage').then(module => ({ default: module.VideoCategoryPage })));
const CareersPage = lazy(() => import('@/pages/CareersPage').then(module => ({ default: module.CareersPage })));

const PageLoader = () => (
  <div className="h-screen w-full bg-black flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white antialiased cursor-default">
        <Navbar />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/services/video-editing/:categoryId" element={<VideoCategoryPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}