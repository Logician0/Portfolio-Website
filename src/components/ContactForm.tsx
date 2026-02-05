'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MessageSquare, User, Send } from 'lucide-react';

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    if (form.current) {
      emailjs.sendForm(
        'service_s7yikyc',     // Your Service ID
        'template_nfvwwoo',    // Your Template ID
        form.current,
        'GQ4FbqViDpRQZkMu1'    // Your Public Key
      )
      .then(() => {
        setLoading(false);
        setStatus('Message sent! I will get back to you soon.');
        form.current?.reset();
      }, (error) => {
        setLoading(false);
        setStatus('Failed to send. Please try again.');
        console.error(error);
      });
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input 
          type="text" 
          name="from_name" 
          placeholder="Your Name" 
          required 
          className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input 
          type="email" 
          name="from_email" 
          placeholder="Your Email" 
          required 
          className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
        />
      </div>

      <div className="relative">
        <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-zinc-500" />
        <textarea 
          name="message" 
          placeholder="Tell me about your project..." 
          required 
          className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all min-h-[160px] resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : <>Send Message <Send className="w-5 h-5" /></>}
      </button>

      {status && (
        <p className={`text-center text-sm mt-4 ${status.includes('sent') ? 'text-green-400' : 'text-red-400'}`}>
          {status}
        </p>
      )}
    </form>
  );
}