'use client';

import { motion } from 'framer-motion';

export default function JourneyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
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
      className="container mx-auto px-4 pt-28 pb-12 max-w-4xl"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-8 text-white">Learning Journey & Reflection</motion.h1>
      
      <motion.div variants={itemVariants} className="space-y-8 text-zinc-300">
        <section className="glass-panel p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Organizational Logic</h2>
          <p className="leading-relaxed">
            This portfolio is structured to highlight my multifaceted experience. Rather than organizing projects strictly by chronology, I have categorized them by context: 
            <strong> Epitech</strong> for academic growth, <strong>Associations</strong> for leadership and teamwork, and <strong>Skills</strong> for technical proficiency. 
            This approach demonstrates both my technical achievements and my ability to work within diverse environments.
          </p>
        </section>

        <section className="glass-panel p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">My Progress Across the Year</h2>
          <p className="leading-relaxed mb-4">
            Over the past year, my learning curve has accelerated significantly. I started with foundational programming concepts and quickly scaled to complex system architectures. 
            My journey through Epitech and various association events taught me that building robust software isn't just about writing code; it's about understanding the ecosystem, securing data, and optimizing performance.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Technical Evolution:</strong> Transitioned from basic scripting to creating scalable architectures using Next.js and Prisma.</li>
            <li><strong>Security Awareness:</strong> Developed a security-first mindset, always considering potential vulnerabilities in application design.</li>
            <li><strong>Methodology:</strong> Improved my workflow by adopting agile methodologies, CI/CD pipelines, and rigorous code reviews.</li>
          </ul>
        </section>

        <section className="glass-panel p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Reflection on Works</h2>
          <p className="leading-relaxed mb-4">
            Every project has been a stepping stone. For example, my Epitech projects pushed me to deeply understand algorithms and system interactions, while my work in associations taught me the importance of communication, user-centric design, and delivering projects within constraints.
          </p>
          <p className="leading-relaxed">
            The challenges I encountered—ranging from debugging obscure memory leaks to designing intuitive user interfaces—have forged a resilience in my problem-solving approach. Going forward, I aim to focus more on cloud architectures and advanced cybersecurity mechanisms, continuing this trajectory of constant self-improvement.
          </p>
        </section>
      </motion.div>
    </motion.div>
  );
}