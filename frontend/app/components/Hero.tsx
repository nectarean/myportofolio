"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const API_BASE = "http://localhost:3001";

export default function Hero() {
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/hero`)
      .then((res) => res.json())
      .then((response) => {
        // Backend returns { success, message, data }
        setHeroData(response.data || response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hero data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mb-8"></div>
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
          <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </section>
    );
  }

  // Fallback data if backend fails
  const data = heroData || {
    greeting: "Hello, I'm",
    name: "John Doe",
    title: "Full Stack Developer",
    description: "I build exceptional and accessible digital experiences for the web.",
    imageUrl: "https://ui-avatars.com/api/?name=John+Doe&size=256&background=3b82f6&color=fff",
  };

  const greetingText = data.greeting || data.subtitle || "Hello, I'm";
  const nameText = data.name || "A Developer";
  const titleText = data.title || "Building digital products.";
  const descriptionText = data.description || data.bio || "I specialize in building (and occasionally designing) exceptional digital experiences.";
  const imageToUse = data.imageUrl || data.image_url || data.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(nameText) + "&size=512&background=random";
  const cvLink = data.cv_url || "/cv.pdf";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400">
              {greetingText}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
              {nameText}
            </h1>
            <h3 className="text-2xl md:text-4xl font-semibold text-slate-600 dark:text-slate-300">
              {titleText}
            </h3>
            <p className="max-w-2xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed mx-auto md:mx-0">
              {descriptionText}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold hover:scale-105 transition-transform"
              >
                View My Work
              </a>
              <a
                href={cvLink}
                target="_blank"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-slate-200 dark:border-slate-800 font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
              >
                <span>Download CV</span>
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-[2rem] rotate-6 opacity-20 dark:opacity-40 animate-pulse"></div>
              <img
                src={imageToUse}
                alt={nameText}
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl glass-dark border-4 border-white dark:border-slate-800"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
