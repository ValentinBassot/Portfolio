'use client';

import { Event } from '@/types';
import { motion } from 'framer-motion';

export default function EvenementsPage() {
  const evenements: Event[] = [
    {
      id: "1",
      title: "Independent Developer - NEXUS-V",
      date: "2026-01-01",
      location: "St-Symphorien-sur-Coise",
      description: "Creation of websites, e-commerce, and mobile applications. Deployment of turnkey software solutions integrating AI and Cybersecurity with overall project management.",
      type: "Experience"
    },
    {
      id: "2",
      title: "Project Manager - Junior Conseil Taker",
      date: "2025-09-01",
      location: "Lyon",
      description: "End-to-end project management: requirements analysis, drafting specifications, commercial relations (negotiation), and managing contributors.",
      type: "Experience"
    },
    {
      id: "3",
      title: "Hack & Juice CTF (1st Place Regional)",
      date: "2025-11-15",
      location: "Lyon",
      description: "Cybersecurity challenge: Web pentesting and vulnerability audit on OWASP Top 10 flaws. Reached the first place regionally.",
      type: "Competition"
    },
    {
      id: "4",
      title: "Operational Assistant - Briconautic",
      date: "2025-04-01",
      location: "Trégastel",
      description: "Customer service, sale of nautical equipment, and logistical management of the boat fleet (April and August 2025).",
      type: "Experience"
    },
    {
      id: "5",
      title: "Volunteer Firefighter - SDMIS",
      date: "2022-01-01",
      location: "St-Symphorien-sur-Coise",
      description: "Fast and coordinated emergency interventions in a team. Strict compliance with safety protocols and maintaining analytical skills under high pressure.",
      type: "Volunteering"
    }
  ];

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
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Events</motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-zinc-400 max-w-3xl">
          Discover the chronological list of relevant events I have attended.
        </motion.p>
      </div>

      <div className="space-y-8 pl-4 sm:pl-0">
        <div className="border-l-2 border-white/10 flex flex-col gap-10">
          {evenements.map((evenement, index) => (
            <motion.div variants={itemVariants} key={evenement.id} className="relative w-full group">
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="absolute -left-[17px] top-4 bg-black p-1 flex justify-center items-center w-8 h-8 rounded-full border border-white/20 text-white shadow-sm z-10"
              >
                <span className="text-xs font-bold leading-none">{index + 1}</span>
              </motion.div>
              <div className="ml-8 md:ml-12 p-6 sm:p-8 glass-panel rounded-2xl max-w-4xl transition-colors group-hover:bg-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-full self-start">
                    {evenement.type}
                  </span>
                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-zinc-400">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(evenement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evenement.location}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{evenement.title}</h3>
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed">{evenement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
