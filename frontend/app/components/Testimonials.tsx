"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const API_BASE = "http://localhost:3001";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then((res) => res.json())
      .then((response) => {
        setTestimonials(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setLoading(false);
      });
  }, []);

  // Fallback if API fails
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    { id: 1, name: "Sarah Johnson", role: "CEO at TechStart", content: "An absolute pleasure to work with. Delivered our project ahead of schedule and the code quality was exceptional.", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Michael Chen", role: "Product Manager", content: "Incredibly talented developer who really understands both the technical and business requirements of a project.", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 3, name: "Emma Davis", role: "Creative Director", content: "Transformed our design mockups into a flawless, pixel-perfect website with smooth animations. Highly recommended!", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  if (loading) {
    return (
      <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950">
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
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Feedback</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Client <span className="text-gradient">Testimonials</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((test) => (
            <div 
              key={test.id}
              className="glass-dark bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative"
            >
              <Quote size={40} className="absolute top-6 right-6 text-blue-500/20" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={test.avatar} 
                  alt={test.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 p-1" 
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {test.name}
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {test.role}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
                &quot;{test.content}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
