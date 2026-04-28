'use client';

import { Project } from '@/types';
import { motion } from 'framer-motion';

export default function EpitechPage() {
  const projects: Project[] = [];

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
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-8 text-white">Epitech</motion.h1>
      <motion.p variants={itemVariants} className="text-zinc-400 mb-12 max-w-3xl">
        Find here the various projects completed during my studies at Epitech, sorted by fields of expertise.
      </motion.p>

      <div className="space-y-12">
        {(['IA', 'Cyber', 'Data', 'Web'] as const).map((category, idx) => {
          const categoryProjects = projects.filter(p => p.category === category);
          
          if (categoryProjects.length === 0) return null;

          return (
            <motion.section key={category} variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-2 text-white">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProjects.map(project => (
                  <motion.div whileHover={{ scale: 1.02 }} key={project.id} className="p-6 glass-panel">
                    <h3 className="text-lg font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 text-xs font-medium rounded-full bg-white/10 text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>
    </motion.div>
  );
}
