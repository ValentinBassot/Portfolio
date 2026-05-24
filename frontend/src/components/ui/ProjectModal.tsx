import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export type SelectedProject = {
  name: string;
  description: string | null;
  html_url: string;
  full_name: string;
};

type ProjectModalProps = {
  project: SelectedProject | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [readmeHtml, setReadmeHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project) return;
    
    let isMounted = true;
    setLoading(true);
    setReadmeHtml(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    fetch(`${baseUrl.replace(/\/$/, '')}/github/readme?repo=${project.full_name}`, {
      headers: {
        Accept: 'text/html',
      },
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error('Failed to fetch README');
        }
        return res.text();
      })
      .then(html => {
        if (isMounted) setReadmeHtml(html);
      })
      .catch(err => {
        if (isMounted) setReadmeHtml(`<p class="text-zinc-500 italic">No README available or failed to load.</p>`);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl bg-black/90 text-white"
        >
          <button 
            type="button"
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <h2 className="text-3xl font-bold mb-2 pr-10">{project.name}</h2>
          <p className="text-zinc-400 mb-6">{project.full_name}</p>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold border-b border-white/10 pb-2 mb-3">About</h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                {project.description || "No description provided."}
              </p>
            </section>
            
            <section className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-x-hidden">
              {loading ? (
                <div className="flex animate-pulse space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-zinc-700 rounded"></div>
                      <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  className="readme-content text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: readmeHtml || '' }} 
                />
              )}
            </section>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10">
            <a 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}