'use client';

import { Technology, Education } from '@/types';
import useGithubRepos from '@/hooks/useGithubRepos';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectModal, { SelectedProject } from '@/components/ui/ProjectModal';

export default function CompetencesPage() {
  const technologies: Technology[] = [
    { id: "1", name: "TypeScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { id: "2", name: "React", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "3", name: "Node.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "4", name: "Express", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { id: "5", name: "Prisma", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
    { id: "6", name: "PostgreSQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { id: "7", name: "Docker", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { id: "8", name: "Tailwind CSS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { id: "9", name: "Git & GitHub", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { id: "10", name: "Figma", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { id: "11", name: "PHP", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { id: "12", name: "Vite.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" }
  ];

  const parcours: Education[] = [
    {
      id: "1",
      degree: "Bachelor",
      institution: "Epitech Lyon",
      startDate: "2025",
      endDate: "2028",
      description: "Project-based curriculum focused on programming, software architecture, data, and cybersecurity. Exploration of AI with a strong emphasis on security challenges."
    },
    {
      id: "2",
      degree: "Baccalauréat STI2D [Mention Bien]",
      institution: "Lycée",
      startDate: "2022",
      endDate: "2025",
      description: "Sciences and Technologies of Industry and Sustainable Development (STI2D)."
    },
    {
      id: "3",
      degree: "Aeronautical Initiation Certificate",
      institution: "Aeronautical Training",
      startDate: "2021",
      endDate: "2021",
      description: "Validation of basic theoretical knowledge of aeronautics and space."
    }
  ];
  const { data, loading, error } = useGithubRepos();
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);

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
      className="container mx-auto px-4 pt-28 pb-12 max-w-7xl space-y-16"
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
              <div className="h-16 w-16 bg-white/10 rounded-full mb-4 flex items-center justify-center overflow-hidden group-hover:bg-white/20 transition-colors p-3">
                <img src={tech.logoUrl} alt={tech.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-sm text-white">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-white/10 pb-4 text-white">Educations</h2>
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

          {data && data.contributions && data.contributions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Open Source Contributions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.contributions.map((repo: any) => (
                  <motion.div key={repo.id} whileHover={{ scale: 1.02 }} onClick={() => setSelectedProject(repo)} className="p-6 glass-panel block cursor-pointer">
                    <h3 className="text-lg font-bold mb-2 text-white">{repo.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{repo.description}</p>
                    <div className="text-xs text-zinc-500">{repo.full_name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-white/10 pb-4 text-white">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <div className="text-zinc-400">Loading repos...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {data && data.others.map((repo: any) => (
            <motion.div key={repo.id} whileHover={{ scale: 1.02 }} onClick={() => setSelectedProject(repo)} className="p-6 glass-panel block cursor-pointer">
              <h3 className="text-lg font-bold mb-2 text-white">{repo.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{repo.description}</p>
              <div className="text-xs text-zinc-500">{repo.full_name}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </motion.div>
  );
}
