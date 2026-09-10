"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";

const API_BASE = "http://localhost:3001";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/certificates`)
      .then((res) => res.json())
      .then((response) => {
        setCertificates(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching certificates:", err);
        setLoading(false);
      });
  }, []);

  // Fallback if API fails
  const displayCerts = certificates.length > 0 ? certificates : [
    { id: 1, title: "Full Stack Web Development", issuer: "FreeCodeCamp", date: "2025", image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "React Developer Nanodegree", issuer: "Udacity", date: "2024", image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "Advanced CSS and Sass", issuer: "Udemy", date: "2024", image_url: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=600" },
  ];

  if (loading) {
    return (
      <section id="certificates" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Achievements</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            My <span className="text-gradient">Certificates</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCerts.map((cert) => (
            <div 
              key={cert.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative group">
                <div className="absolute inset-0 bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <Award size={48} className="text-white drop-shadow-md" />
                </div>
                <img 
                  src={cert.image_url} 
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {cert.title}
              </h4>
              <div className="flex justify-between items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {cert.issuer}
                </span>
                <span>{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
