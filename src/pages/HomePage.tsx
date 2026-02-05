'use client';

import { Hero } from '@/components/Hero';
import { ServicesRound } from '@/components/ServicesRound';
import { SocialOrbit } from '@/components/SocialOrbit';
import { Marquee } from '@/components/Marquee';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm'; // ✅ Changed: Import the new form
import { Newsletter } from '@/components/Newsletter';

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

      {/* ✅ UPDATED: Contact Section with the new Form */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Ready to <span className="text-pink-500">Scale?</span>
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            Send me a message and let's discuss your next big project.
          </p>
          
          {/* This is the EmailJS form we connected */}
          <ContactForm />
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}