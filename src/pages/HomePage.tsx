'use client';

import { Hero } from '@/components/Hero';
import { ServicesRound } from '@/components/ServicesRound';
import { SocialOrbit } from '@/components/SocialOrbit';
import { Marquee } from '@/components/Marquee';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm'; // ✅ Import external component
import { Newsletter } from '@/components/Newsletter';  // ✅ Import external component

export function HomePage() {
  return (
    <main>
      {/* Hero with Scrollytelling */}
      <Hero />

      {/* Round Services Layout */}
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

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Ready to <span className="text-pink-500">Scale?</span>
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            Send me a message and let's discuss your next big project.
          </p>
          
          {/* Functional EmailJS Form */}
          <ContactForm />
        </div>
        
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Functional Google Sheets Newsletter */}
      <Newsletter />
    </main>
  );
}