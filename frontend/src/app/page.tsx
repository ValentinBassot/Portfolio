'use client';
import Link from 'next/link';
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
        className="w-full py-12 md:py-24 lg:py-32 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
          <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl">
            {me.name}
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto max-w-175 text-zinc-400 md:text-xl">
            {me.role || "Insert Role Here"}
          </motion.p>
          <motion.p variants={itemVariants} className="mx-auto max-w-175 text-zinc-500 md:text-lg mt-4">
            {me.bio || "Insert Bio Here"}
          </motion.p>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full py-12 md:py-24 mt-12 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">My Journey</motion.h2>
            <motion.p variants={itemVariants} className="max-w-175 text-zinc-400 xl:text-lg">
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
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-12 md:py-24 bg-transparent px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 pb-12">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Contact me</motion.h2>
            <motion.p variants={itemVariants} className="max-w-175 text-zinc-400 xl:text-lg text-center">
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
