"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const API_BASE = "http://localhost:3001";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  image_url?: string;
  githubUrl?: string;
  github_url?: string;
  liveUrl?: string;
  live_url?: string;
  tags?: string[];
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then((response) => {
        // Backend returns { success, message, data }
        let data = response.data || response;
        if (!Array.isArray(data)) data = [];
        
        // Parse tags if they are stringified
        const parsedData = data.map((item: any) => ({
            ...item,
            tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
        }));
        
        setProjects(parsedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects data:", err);
        setLoading(false);
      });
  }, []);

  // Fallback data if backend fails or returns empty
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for e-commerce platforms.",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
      tags: ["Node.js", "Express", "MongoDB"],
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A modern, responsive personal portfolio website.",
      image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
    }
  ];

  if (loading) {
    return (
      <section id="portfolio" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">My Work</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Featured <span className="text-gradient">Projects</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => {
            const imgUrl = project.imageUrl || project.image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
            const ghUrl = project.githubUrl || project.github_url || "#";
            const demoUrl = project.liveUrl || project.live_url || "#";
            
            return (
              <div 
                key={project.id} 
                className="group rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/20 group-hover:opacity-0 transition-opacity z-10 mix-blend-multiply"></div>
                  <img 
                    src={imgUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {project.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a 
                      href={demoUrl} 
                      className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-medium hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={ghUrl} 
                      className="p-3 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
