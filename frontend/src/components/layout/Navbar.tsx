'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 800);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-0 right-0 mx-auto w-11/12 max-w-4xl z-70">
      <div className="glass-panel rounded-full border border-white/20 bg-black/20 backdrop-blur-lg shadow-[0_0_50px_rgba(255,255,255,0.2),inset_0_0_20px_rgba(255,255,255,0.1)] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/favicon.ico" alt="Favicon" width={40} height={40} className="rounded-md" />
            </Link>
          </div>

          {!isMobile && (
            <div className="hidden md:ml-4 md:flex md:space-x-6 items-center">
              <Link href="/" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                Home
              </Link>
              <Link href="/epitech" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                Epitech
              </Link>
              <Link href="/associations" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                Associations
              </Link>
              <Link href="/skills" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                Skills
              </Link>
              <Link href="/events" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                Events
              </Link>
            </div>
          )}

          <div className="flex items-center">
            {!isMobile ? (
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full text-black bg-white hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 min-w-30">
                  Download CV
              </a>
            ): (
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen(o => !o)}
                className="ml-2 p-2 rounded-md text-zinc-200 hover:bg-white/5 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {open && isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 flex justify-center pt-20 bg-black/20 backdrop-blur-lg">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed top-6 right-6 z-80 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/70 p-3 text-white shadow-[0_0_24px_rgba(255,255,255,0.18)] backdrop-blur-md transition-colors hover:bg-black/85">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-11/12 max-w-4xl">
            <div className="p-4 bg-black/40 glass-panel rounded-lg border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              <nav className="flex flex-col space-y-2">
              <Link href="/" onClick={() => setOpen(false)} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-base">Home</Link>
              <Link href="/epitech" onClick={() => setOpen(false)} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-base">Epitech</Link>
              <Link href="/associations" onClick={() => setOpen(false)} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-base">Associations</Link>
              <Link href="/skills" onClick={() => setOpen(false)} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-base">Skills</Link>
              <Link href="/events" onClick={() => setOpen(false)} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)] px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-base">Events</Link>
              <a href="/cv.pdf" download onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full text-black bg-white hover:bg-zinc-200 transition-colors">Download CV</a>
              </nav>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
