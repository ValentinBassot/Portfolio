'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-0 right-0 mx-auto w-11/12 max-w-4xl glass-panel rounded-full border border-white/20 bg-black/20 backdrop-blur-lg shadow-[0_0_50px_rgba(255,255,255,0.2),inset_0_0_20px_rgba(255,255,255,0.1)] z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="hrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white tracking-widest flex items-center">
              <Image src="/favicon.ico" alt="Favicon" width={64} height={64} />
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/epitech" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Epitech
            </Link>
            <Link href="/associations" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Associations
            </Link>
            <Link href="/skills" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Skills
            </Link>
            <Link href="/events" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Events
            </Link>
          </div>
          <div className="flex items-center">
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full text-black bg-white hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 min-w-30">
                Download CV
            </a>
          </div>
        </div>
        <div className="md:hidden flex overflow-x-auto py-2 space-x-4 pb-2 scrollbar-hide">
            <Link href="/" className="text-zinc-400 hover:text-white text-sm font-medium whitespace-nowrap">
              Home
            </Link>
             <Link href="/epitech" className="text-zinc-400 hover:text-white text-sm font-medium whitespace-nowrap">
              Epitech
            </Link>
            <Link href="/associations" className="text-zinc-400 hover:text-white text-sm font-medium whitespace-nowrap">
              Associations
            </Link>
            <Link href="/skills" className="text-zinc-400 hover:text-white text-sm font-medium whitespace-nowrap">
              Skills
            </Link>
            <Link href="/events" className="text-zinc-400 hover:text-white text-sm font-medium whitespace-nowrap">
              Events
            </Link>
        </div>
      </div>
    </motion.nav>
  );
}
