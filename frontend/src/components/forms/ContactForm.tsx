'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-zinc-500 transition-all"
            placeholder="Name and surname"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-zinc-500 transition-all"
            placeholder="youremail@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-zinc-500 transition-all resize-none"
            placeholder="How can I help you?"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-400 text-center">
          Message sent successfully!
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 text-center">
          An error occurred. Please try again.
        </motion.p>
      )}
    </motion.form>
  );
}
