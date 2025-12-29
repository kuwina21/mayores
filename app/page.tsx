"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  
  // 1. TRACK SCROLL PROGRESS
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. CREATE MOVEMENT RULES
  // As scroll goes from 0 to 1, move element X from 0px to 500px
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Smooth out the progress bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const projects = [
    { title: "E-Commerce App", tech: "Next.js", desc: "Modern shopping experience." },
    { title: "AI Dashboard", tech: "React", desc: "Data visualization for AI." },
    { title: "Portfolio V2", tech: "Framer Motion", desc: "Animated interactive site." },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#020617] text-white overflow-hidden">
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50" style={{ scaleX }} />

      {/* FLOATING ANIMATED ELEMENTS */}
      {/* These move to different parts of the web as you scroll */}
      <motion.div 
        style={{ y: yLeft, rotate }}
        className="fixed top-20 left-[10%] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl z-0"
      />
      <motion.div 
        style={{ y: yRight, rotate: -rotate }}
        className="fixed bottom-20 right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl z-0"
      />

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div style={{ opacity }}>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4 uppercase italic">
            Mayores
          </h1>
          <p className="text-gray-400 text-xl tracking-widest uppercase">
            Scrolling Experiences
          </p>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="relative z-10 py-24 px-8 md:px-24">
        <h2 className="text-5xl font-bold mb-20 tracking-tight">The Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-12 rounded-[40px] border border-white/5 bg-white/5 backdrop-blur-xl"
            >
              <span className="text-blue-400 font-mono text-sm">{p.tech}</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <section className="h-screen flex items-center justify-center border-t border-white/5">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-6xl font-bold mb-8">Let's Talk</h2>
          <button className="text-2xl border-b-2 border-white pb-2 hover:text-blue-400 hover:border-blue-400 transition-all">
            hello@mayores.dev
          </button>
        </motion.div>
      </section>

    </div>
  );
}