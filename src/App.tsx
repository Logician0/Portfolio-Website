'use client';

import { RouterProvider, Routes, Route } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ServicePage } from '@/pages/ServicePage';
import { VideoCategoryPage } from '@/pages/VideoCategoryPage';
import { CareersPage } from '@/pages/CareersPage'; // 1. Added Import

export function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-black text-white antialiased cursor-default">
        {/* Navigation */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" component={HomePage} />
          <Route path="/careers" component={CareersPage} /> {/* 2. Added Route */}
          
          {/* Specific route for video categories */}
          <Route path="/services/video-editing/:categoryId" component={VideoCategoryPage} />
          
          <Route path="/services/:slug" component={ServicePage} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </RouterProvider>
  );
}