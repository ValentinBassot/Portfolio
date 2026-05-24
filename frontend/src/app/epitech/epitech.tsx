import { Project } from '@/types';

export default function EpitechPage() {
  const projects: Project[] = [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Epitech</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl">
        Find here the various projects completed during my studies at Epitech, sorted by fields of expertise.
      </p>

      <div className="space-y-12">
        {(['IA', 'Cyber', 'Data', 'Web'] as const).map(category => {
          const categoryProjects = projects.filter(p => p.category === category);
          
          if (categoryProjects.length === 0) return null;

          return (
            <section key={category} className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProjects.map(project => (
                  <div key={project.id} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(any => (
                        <span key={any} className="px-2 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                          {any}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  );
}