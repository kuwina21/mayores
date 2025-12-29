"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  // Data for your project cards
  const projects = [
    {
      title: "E-Commerce App",
      tech: "Next.js • Tailwind",
      desc: "A modern shopping experience with seamless transitions.",
    },
    {
      title: "AI Dashboard",
      tech: "React • OpenAI",
      desc: "Data visualization for AI metrics and real-time processing.",
    },
    {
      title: "Portfolio V1",
      tech: "HTML • CSS",
      desc: "My very first coding project, preserved for history.",
    },
  ];

  // Logic for the top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      
      {/* 1. SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 2. HERO SECTION */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center"
        >
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            MAYORES
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light italic">
            Building digital experiences with <span className="text-blue-400 font-medium">Next.js</span> and <span className="text-purple-400 font-medium">Modern UI</span>.
          </p>
          
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Scroll to Work
          </motion.a>
        </motion.div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section id="projects" className="min-h-screen p-8 md:p-24 bg-[#030712]">
        <motion.header 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Selected Work</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </motion.header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl border border-gray-800 bg-gray-900/40 backdrop-blur-md hover:border-blue-500/50 transition-all duration-500"
            >
              <div className="mb-4 text-blue-400 font-mono text-xs uppercase tracking-widest">
                {p.tech}
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-gray-400 mb-6 font-light leading-relaxed">
                {p.desc}
              </p>
              
              <div className="text-sm font-bold flex items-center gap-2 cursor-pointer">
                LEARN MORE <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section className="py-40 flex flex-col items-center justify-center border-t border-gray-900 bg-[#020617]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to start a project?</h2>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "white", color: "black" }}
            className="px-10 py-4 border border-gray-700 rounded-full text-white transition-all font-semibold"
          >
            Contact Me
          </motion.button>
          
          <footer className="mt-32 text-gray-600 text-sm">
            © 2025 Mayores • Powered by GitHub Pages
          </footer>
        </motion.div>
      </section>

    </div>
  );
}