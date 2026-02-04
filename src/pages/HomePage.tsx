'use client';

import { Hero } from '@/components/Hero';
// import { BentoGrid } from '@/components/BentoGrid'; <--- DELETE THIS
import { ServicesRound } from '@/components/ServicesRound'; // <--- IMPORT THIS
import { SocialOrbit } from '@/components/SocialOrbit';
import { Marquee } from '@/components/Marquee';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Newsletter } from '@/components/Newsletter';

export function HomePage() {
  return (
    <main>
      {/* Hero with Scrollytelling */}
      <Hero />

      {/* NEW: Round Services Layout matching sketch */}
      <ServicesRound />

      {/* Tech Stack Marquee */}
      <Marquee />

      {/* Process with Light Beam */}
      <Process />

      {/* About with Social Orbit */}
      <SocialOrbit />

      {/* Testimonials Carousel */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Form */}
      <Contact />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}