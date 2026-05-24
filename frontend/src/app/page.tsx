'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactForm from '@/components/forms/ContactForm';
import { useEffect, useState } from 'react';
import { fetchProfile, ProfileData } from '@/app/api/profile';

export default function Home() {
  const [me, setMe] = useState<ProfileData>({
    name: 'Loading...',
    role: '',
    bio: '',
  });

  useEffect(() => {
    fetchProfile().then(setMe);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full min-h-dvh flex flex-col justify-center items-center pt-20 pb-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
          <motion.div 
            variants={itemVariants}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full glass-panel flex items-center justify-center mb-2 shadow-lg object-cover overflow-hidden"
          >
            <Image src="/me.jpg" alt="Profile photo" width={200} height={200} className="object-cover w-full h-full rounded-full" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="inline-block px-8 py-4 rounded-full glass-panel border border-white/10 bg-black/40 backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.15)] relative">
              {me.name}
              <div className="absolute inset-0 rounded-full bg-white/5 blur-xl -z-10"></div>
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-zinc-300 md:text-xl font-medium mt-2">
            {me.role}
          </motion.p>
          <motion.p variants={itemVariants} className="mx-auto max-w-4xl text-zinc-400 md:text-lg mt-4 leading-relaxed">
            {me.bio}
          </motion.p>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full py-8 md:py-12 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
              <span className="inline-block px-8 py-3 rounded-full glass-panel border border-white/10 bg-black/40 backdrop-blur-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] relative">
                Contributions
                <div className="absolute inset-0 rounded-full bg-white/5 blur-xl -z-10"></div>
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-175 text-zinc-400 xl:text-lg mt-6">
              Discover my projects, my community involvement, and my skills.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div variants={itemVariants}>
              <Link href="/epitech" className="block h-full group p-6 glass-panel hover:bg-white/10 transition-colors shadow-sm">
                <h3 className="text-xl font-bold mb-2 group-hover:text-white text-zinc-200 transition-colors">Epitech</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 text-sm transition-colors">Projects in AI, Cyber, Data, and Web completed during my studies.</p>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href="/associations" className="block h-full group p-6 glass-panel hover:bg-white/10 transition-colors shadow-sm">
                <h3 className="text-xl font-bold mb-2 group-hover:text-white text-zinc-200 transition-colors">Associations</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 text-sm transition-colors">Discover my journey with POC Innovation and Junior Conseil Taker.</p>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href="/skills" className="block h-full group p-6 glass-panel hover:bg-white/10 transition-colors shadow-sm">
                <h3 className="text-xl font-bold mb-2 group-hover:text-white text-zinc-200 transition-colors">Skills</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 text-sm transition-colors">An overview of my tech stack and certifications.</p>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href="/journey" className="block h-full group p-6 glass-panel hover:bg-white/10 transition-colors shadow-sm">
                <h3 className="text-xl font-bold mb-2 group-hover:text-white text-zinc-200 transition-colors">Journey & Reflection</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 text-sm transition-colors">Read about my learning path, challenges, and self-reflection.</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-8 md:py-16 bg-transparent px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 pb-12">
            <motion.div variants={itemVariants} className="flex space-x-6 mb-4">
              <a aria-label="GitHub Profile" href="https://github.com/ValentinBassot" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a aria-label="LinkedIn Profile" href="https://www.linkedin.com/in/bassot-valentin/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
              <span className="inline-block px-8 py-3 rounded-full glass-panel border border-white/10 bg-black/40 backdrop-blur-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] relative">
                Contact me
                <div className="absolute inset-0 rounded-full bg-white/5 blur-xl -z-10"></div>
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-175 text-zinc-400 xl:text-lg text-center mt-6">
              Have a question or an opportunity? Feel free to send me a message.
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="mx-auto max-w-lg w-full">
            <ContactForm />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
