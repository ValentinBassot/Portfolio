'use client';

import { Project } from '@/types';
import useGithubRepos from '@/hooks/useGithubRepos';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectModal, { SelectedProject } from '@/components/ui/ProjectModal';

type GitHubRepo = { id: number; name: string; full_name: string; html_url: string; description: string | null; updated_at?: string };

type GitHubData = { 
  epitech?: GitHubRepo[]; 
  poc?: GitHubRepo[]; 
  others?: GitHubRepo[]; 
  contributions?: GitHubRepo[];
  epitechGrouped?: Record<string, GitHubRepo[]>;
  epitechUngrouped?: GitHubRepo[];
};

export default function EpitechPage() {
  const projects: Project[] = [];
  const { data, loading, error } = useGithubRepos();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);

  const toggleGroup = (g: string) => setCollapsedGroups(s => ({ ...s, [g]: !s[g] }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 pt-28 pb-12 max-w-7xl"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-8 text-white">Epitech</motion.h1>
      <motion.p variants={itemVariants} className="text-zinc-400 mb-12 max-w-3xl">
        Find here the various projects completed during my studies at Epitech.
      </motion.p>

      <div className="space-y-12">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-white/10 pb-2 text-white">Epitech Projects from GitHub</h2>

          {loading && <div className="text-zinc-400">Loading repos...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {data && (
            <div className="space-y-8">
              {Object.keys(((data as unknown) as GitHubData).epitechGrouped || {}).length > 0 && (
                <div className="space-y-6">
                  {Object.entries(((data as unknown) as GitHubData).epitechGrouped || {}).map(([group, repos]) => {
                    const isCollapsed = !!collapsedGroups[group];
                    return (
                      <div key={group} className="space-y-3">
                        <button onClick={() => toggleGroup(group)} className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10">
                          <h3 className="text-xl font-semibold text-white">{group}</h3>
                          <span className="text-sm text-zinc-400">{repos.length} repo{repos.length !== 1 ? 's' : ''}</span>
                        </button>
                        {!isCollapsed && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {repos.map((repo: GitHubRepo) => (
                              <motion.div whileHover={{ scale: 1.02 }} key={repo.id} onClick={() => setSelectedProject(repo)} className="p-6 glass-panel block cursor-pointer">
                                <h3 className="text-lg font-bold mb-2 text-white">{repo.name}</h3>
                                <p className="text-sm text-zinc-400 mb-4">{repo.description}</p>
                                <div className="flex justify-between items-end">
                                  <div className="text-xs text-zinc-500">{repo.full_name}</div>
                                  <div className="text-xs text-zinc-500">{formatDate(repo.updated_at)}</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {(((data as unknown) as GitHubData).epitechUngrouped || []).length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Other Epitech projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(((data as unknown) as GitHubData).epitechUngrouped || []).map((repo: GitHubRepo) => (
                      <motion.div whileHover={{ scale: 1.02 }} key={repo.id} onClick={() => setSelectedProject(repo)} className="p-6 glass-panel block cursor-pointer">
                        <h3 className="text-lg font-bold mb-2 text-white">{repo.name}</h3>
                        <p className="text-sm text-zinc-400 mb-4">{repo.description}</p>
                        <div className="flex justify-between items-end">
                          <div className="text-xs text-zinc-500">{repo.full_name}</div>
                          <div className="text-xs text-zinc-500">{formatDate(repo.updated_at)}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {(['IA', 'Cyber', 'Data', 'Web'] as const).map(category => {
          const categoryProjects = projects.filter(p => p.category === category);
          
          if (categoryProjects.length === 0) return null;

          return (
            <motion.section key={category} variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-2 text-white">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProjects.map(project => (
                  <motion.div whileHover={{ scale: 1.02 }} key={project.id} onClick={() => setSelectedProject({ name: project.title, description: project.description, html_url: '#', full_name: 'Project/' + project.title })} className="p-6 glass-panel cursor-pointer">
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

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </motion.div>
  );
}
