"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ResumePage from "@/components/ui/portfolio-hero-with-paper-shaders";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import ProfileCard from "@/components/ui/profile-card-1";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const BASE_PATH = process.env.NODE_ENV === "production" ? "/mayores" : "";

  // --- PARALLAX LOGIC ---
  // Background stays static (removed zoom)
  const kuwinaY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const portraitY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const arrowY = useTransform(scrollYProgress, [0, 0.2], [0, 40]);

  // --- MOUSE TRACKING ---
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- SPOTLIGHT STYLE ---
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const chromeStyle = {
    backgroundImage: isTouchDevice 
      ? `radial-gradient(circle at center, #ffffff 0%, #e0e0e0 40%, #71717a 70%, #171717 100%)`
      : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #ffffff 0%, #e0e0e0 20%, #71717a 50%, #171717 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    backgroundRepeat: "no-repeat",
    backgroundSize: isTouchDevice ? "100% 100%" : "150% 150%",
    backgroundPosition: "center",
  };

  const projects = [
    {
      id: "001",
      title: "Furevercare",
      tech: "Flutter / Firebase",
      desc: "A Web-Based and Mobile System​ for Pet Health Management and Veterinary Clinic Operations​",
      link: "/project/001",
      imgSrc: `${BASE_PATH}/furevercare.png`,
      imgPos: "object-center"
    },
    {
      id: "002",
      title: "Fall",
      tech: "Unity / C#",
      desc: "Rise to Glory: Guide Loyd, a frog ninja, through the deadly Labyrinth of Ascension in this precision 2D platformer.",
      link: "/project/002",
      imgSrc: `${BASE_PATH}/FALL_L.jpg`,
      imgPos: "object-top"
    },
    {
      id: "003",
      title: "Stakeholder System",
      tech: "Laravel / MySQL",
      desc: "A management or tracking system built utilizing Laravel for automating stakeholder operations and analytics.",
      link: "/project/003",
      imgPos: "object-center"
    },
    {
      id: "004",
      title: "Spit Out",
      tech: "Roblox Studio / Luau",
      desc: "Action-packed survival experience built on Roblox focusing on fast-paced movement mechanics and physical puzzles.",
      link: "/project/004",
      imgPos: "object-center"
    }
  ];

  return (
    <div className="bg-transparent text-white selection:bg-blue-600 font-sans relative">

      {/* --- FIXED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-[-1] w-full h-screen">
        <Image
          src="/mayores1.png"
          alt="Background Image"
          fill
          className="object-cover object-[center_center] md:object-[65%_center]"
          priority
        />

        {/* OVERLAY: DARKNESS */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to right, #000000 0%, #000000 min(40vw, 3in), transparent 100%)"
          }}
        />
      </div>

      {/* GLOBAL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* --- PAGE 1: INTRO --- */}
      <section className="relative h-screen bg-black text-white flex flex-col justify-between overflow-hidden font-[family-name:var(--font-poppins)]">
        {/* TOP ROW */}
        <div className="flex justify-end items-start z-30 p-8 md:p-12 w-full">
          <motion.div style={{ y: kuwinaY }} className="text-right flex flex-col uppercase tracking-widest text-[10px] md:text-sm font-light mt-2">
            <p className="opacity-80">Portfolio</p>
            <p className="font-bold text-white text-lg md:text-2xl -mt-1 tracking-tighter">SHANDY MAYORES</p>
          </motion.div>
        </div>

        {/* MIDDLE ROW: KUWINA - MAX LEFT, NO SPACE */}
        <motion.div
          style={{ y: kuwinaY }}
          className="absolute top-[12%] md:top-[8%] left-0 z-10 w-full flex justify-start -ml-1 sm:-ml-2 md:-ml-6 overflow-hidden pointer-events-none"
        >
          <h1 className="text-[22vw] sm:text-[20vw] md:text-[18vw] font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
            KUWINA
          </h1>
        </motion.div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end z-30 pb-12 px-8 md:px-16">
          <div className="flex flex-col gap-0.5 text-[10px] md:text-sm font-light tracking-[0.05em] opacity-80">
            <p>@shandy.mayores7@gmail.com</p>
          </div>

          {/* Arrow Indicator: Anchored to the absolute bottom of the page with increased height */}
          <motion.div style={{ y: arrowY }} className="absolute left-[15%] sm:left-[25%] md:left-[33%] bottom-0 flex flex-col items-start z-40 pointer-events-none">
            <div className="w-3 h-3 border-t-2 border-l-2 border-white rotate-45 -mt-1.5 opacity-100 -ml-[5.5px]"></div>
            <div className="h-[35vh] sm:h-[40vh] md:h-[45vh] w-[1.5px] bg-white opacity-80"></div>
          </motion.div>
        </div>

        {/* THE PERSON IMAGE (mayores2.png) - FLUSH START AT ARROW LINE */}
        <motion.div
          style={{ y: portraitY }}
          className="absolute left-[15.2%] sm:left-[25.2%] md:left-[33.2%] right-0 bottom-0 h-[50%] sm:h-[55%] md:h-[60%] z-20 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="/mayores2.png"
              alt="Portrait"
              fill
              className="object-contain object-bottom md:object-cover md:object-center mix-blend-lighten"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* --- PAGE 2: RESUME SECTION --- */}
      <section className="relative w-full z-20">
        <ResumePage />
      </section>

      {/* --- PAGE 3: PHILOSOPHY --- */}
      <section className="min-h-screen relative z-10 py-32 px-8 md:px-24 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase text-white drop-shadow-lg"
          >
            THRIVING TO LEARN NEW THINGS.
          </motion.h2>
          
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-6 text-white/90 drop-shadow-md">
            unemployed need job pls
          </p>
          <div className="h-1.5 w-16 bg-blue-600"></div>
        </div>
      </section>


      {/* --- PAGE 4: PROJECTS & ARSENAL COMBINED --- */}
      <section className="min-h-screen relative z-10 flex flex-col md:flex-row items-stretch px-6 sm:px-12 md:px-24 py-12 md:py-20 bg-black/60 backdrop-blur-sm border-t border-zinc-900 gap-8 md:gap-12">
        
        {/* LEFT SIDE: PROJECTS */}
        <div className="w-full md:w-2/3 flex flex-col pt-12">
          <div className="mb-12 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg"
            >
              The <span className="text-blue-600">Project</span>
            </motion.h2>
          </div>
          <div className="flex-grow">
            {/* Inside sidebar we can pass custom classes safely now */}
            <ProjectShowcase projects={projects} className="max-w-none px-0 py-0" />
          </div>
        </div>

        {/* RIGHT SIDE: SKILLS / ARSENAL */}
        <div className="w-full md:w-1/3 flex flex-col justify-center border-l-0 md:border-l border-zinc-800/30 pl-0 md:pl-12 pt-12 md:pt-0">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-xl font-black uppercase text-white tracking-widest">Skills</h3>
            <div className="h-1 w-12 bg-blue-600 mt-2 mx-auto md:mx-0"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            
            {/* Skill Group 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col border border-zinc-800 p-6 md:p-8 hover:border-blue-500/50 transition-colors bg-zinc-950/50 group"
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-4 md:mb-6 text-white group-hover:text-blue-400 transition-colors">Game Dev</h3>
              <ul className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm text-zinc-400">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Roblox Studio (Lua)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Unity (C#)</li>
              </ul>
            </motion.div>

            {/* Skill Group 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col border border-zinc-800 p-6 md:p-8 hover:border-blue-500/50 transition-colors bg-zinc-950/50 group"
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-4 md:mb-6 text-white group-hover:text-blue-400 transition-colors">App Dev</h3>
              <ul className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm text-zinc-400">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Flutter</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />React / Next.js</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Tailwind CSS</li>
              </ul>
            </motion.div>

            {/* Skill Group 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col border border-zinc-800 p-6 md:p-8 hover:border-blue-500/50 transition-colors bg-zinc-950/50 group"
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-4 md:mb-6 text-white group-hover:text-blue-400 transition-colors">Backend & DB</h3>
              <ul className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm text-zinc-400">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Firebase</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />MySQL</li>
              </ul>
            </motion.div>

            {/* Skill Group 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col border border-zinc-800 p-6 md:p-8 hover:border-blue-500/50 transition-colors bg-zinc-950/50 group"
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-4 md:mb-6 text-white group-hover:text-blue-400 transition-colors">Design & AI Tools</h3>
              <ul className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm text-zinc-400">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Figma / Canva</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />AI & MCP Integration</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Gemini CLI / Cursor</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />Antigravity Agent</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PAGE 6: FINALE --- */}
      <section className="relative z-20 min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-[8vw] font-black tracking-tighter leading-none italic uppercase drop-shadow-lg text-white">
            Contact
          </h2>
        </div>
        <ProfileCard 
          avatarUrl="/pfp.jpg" 
          githubUrl="https://github.com/kuwina21" 
          instagramUrl="https://www.instagram.com/kuwina__/" 
          linkedinUrl="https://www.linkedin.com/in/shandy-mayores-34a023388/" 
        />
      </section>
    </div>
  );
}