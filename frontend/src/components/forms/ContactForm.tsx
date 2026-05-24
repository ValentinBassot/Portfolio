'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  useAutoClose(status, setStatus);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const payload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      };

      const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;

      if (!formspreeUrl) {
        console.error('NEXT_PUBLIC_FORMSPREE_URL is not set');
        setStatus('error');
        return;
      }

      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Formspree error');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
    }
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative max-w-md w-full bg-zinc-900 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Message envoyé</h3>
            <p className="text-sm text-zinc-300 mb-4">Merci — je vous répondrai dès que possible.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm"
              >
                Fermer
              </button>
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 bg-white text-black rounded-md text-sm font-semibold"
              >
                Envoyer un autre message
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 text-center">
          An error occurred. Please try again.
        </motion.p>
      )}
    </motion.form>
  );
}

// Auto-close success modal after a short delay
// (keeps the component simple and UX-friendly)
function useAutoClose(status: string | null, setStatus: (s: any) => void) {
  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => setStatus('idle'), 6000);
      return () => clearTimeout(t);
    }
  }, [status, setStatus]);
}
