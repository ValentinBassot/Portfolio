'use client';

import { LinkedInPost } from '@/types';
import { motion } from 'framer-motion';

export default function AssociationsPage() {
  const posts: LinkedInPost[] = [];

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
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Associations</motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-zinc-400 max-w-3xl">
          My community involvement through POC Innovation and Junior Conseil Taker.
        </motion.p>
      </div>

      <motion.section variants={itemVariants} className="space-y-8">
        <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold text-white">POC Innovation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.filter(p => p.tags.includes('#POC')).map(post => (
             <motion.div whileHover={{ scale: 1.02 }} key={post.id} className="p-6 glass-panel flex flex-col justify-between space-y-4">
               <p className="text-sm text-zinc-300">{post.content}</p>
               <div className="flex justify-between items-center text-xs text-zinc-500">
                 <span>{post.date}</span>
                 <a href={post.url} className="text-white hover:underline">View on LinkedIn</a>
               </div>
             </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-8">
        <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold text-white">Junior Conseil Taker</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.filter(p => p.tags.includes('#Taker')).map(post => (
             <motion.div whileHover={{ scale: 1.02 }} key={post.id} className="p-6 glass-panel flex flex-col justify-between space-y-4">
               <p className="text-sm text-zinc-300">{post.content}</p>
               <div className="flex justify-between items-center text-xs text-zinc-500">
                 <span>{post.date}</span>
                 <a href={post.url} className="text-white hover:underline">View on LinkedIn</a>
               </div>
             </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
