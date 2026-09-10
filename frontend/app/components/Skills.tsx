"use client";

import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001";

interface SkillCategory {
  title: string;
  skills: string[];
}

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/skills`)
      .then((res) => res.json())
      .then((response) => {
        setSkillCategories(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  // Fallback if API fails
  const displayCategories = skillCategories.length > 0 ? skillCategories : [
    { title: "Frontend Development", skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "HTML5", "CSS3"] },
    { title: "Backend Development", skills: ["Node.js", "Express.js", "PHP", "Laravel", "Python", "RESTful APIs"] },
    { title: "Database & Tools", skills: ["MySQL", "PostgreSQL", "MongoDB", "Git", "Docker", "Figma"] }
  ];

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-60 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-blob"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">My Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Professional <span className="text-gradient">Skills</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayCategories.map((category, idx) => (
            <div 
              key={idx}
              className="glass-dark bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
