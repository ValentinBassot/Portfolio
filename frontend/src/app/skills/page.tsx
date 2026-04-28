'use client';

import { Technology, Education } from '@/types';
import { motion } from 'framer-motion';

export default function CompetencesPage() {
  const technologies: Technology[] = [];

  const parcours: Education[] = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12 max-w-7xl space-y-16"
    >
      <div className="space-y-4">
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Skills & Journey</motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-zinc-400 max-w-3xl">
          My technical expertise and academic background.
        </motion.p>
      </div>

      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-white/10 pb-4 text-white">Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map(tech => (
            <motion.div whileHover={{ scale: 1.05 }} key={tech.id} className="flex flex-col items-center justify-center p-6 glass-panel rounded-2xl group">
              <div className="h-16 w-16 bg-white/10 rounded-full mb-4 flex items-center justify-center text-xs font-medium text-zinc-400 group-hover:bg-white/20 transition-colors">
                IMG
              </div>
              <span className="font-semibold text-sm text-white">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-white/10 pb-4 text-white">My Journey</h2>
        <div className="space-y-8">
          {parcours.map(item => (
            <motion.div whileHover={{ x: 5 }} key={item.id} className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 glass-panel rounded-2xl">
              <div className="md:w-1/4 shrink-0">
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-semibold rounded-full">
                  {item.startDate} - {item.endDate}
                </span>
              </div>
              <div className="md:w-3/4 space-y-2">
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <h4 className="text-lg text-zinc-400">{item.institution}</h4>
                {item.description && <p className="text-sm text-zinc-500 mt-2">{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
