"use client";

import React from 'react';
import Link from 'next/link';
import { SkeletonImage } from '@/components/ui/skeleton-image';
import { motion } from 'framer-motion';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function SpitOutDetails() {
  return (
    <main className="bg-black text-white font-sans selection:bg-zinc-800 relative min-h-screen">

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center p-4 md:p-8 pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto min-h-[44px] min-w-[44px] px-4 py-2.5 md:px-6 md:py-3 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2 shadow-2xl active:scale-95"
        >
          <span className="text-lg leading-none">←</span>
          <span className="inline">Return Home</span>
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] md:min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 px-4">
        <div className="relative z-10 flex flex-col items-center text-center max-w-full">
          <motion.h1 
            className="text-[10.5vw] sm:text-[9.5vw] md:text-[8.5vw] font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] flex flex-wrap justify-center overflow-hidden py-2"
          >
            {"SPIT OUT".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.03,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-400 uppercase tracking-widest mt-4">
            Roblox Survival Experience • Luau & Roblox Studio
          </p>
        </div>
      </section>

      {/* --- PROJECT OVERVIEW --- */}
      <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-28 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left Column (Text) */}
            <div className="flex flex-col items-start text-left space-y-6 md:space-y-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
                Project Overview
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-poppins)] text-zinc-300 font-light leading-relaxed">
                Spit Out is an action-packed survival experience built on Roblox focusing on fast-paced movement mechanics, physical hazards, and environmental survival challenges.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Roblox Studio", "Luau Scripting", "Custom Mechanics", "Physics Puzzles"].map((tech) => (
                  <span key={tech} className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-zinc-300 font-mono text-xs uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full bg-zinc-900 border border-zinc-800 shadow-2xl">
              <SkeletonImage 
                src={`${BASE_PATH}/project_004/GameThumbnail.png`} 
                alt="Spit Out Game Overview" 
                width={1200}
                height={800}
                className="w-full h-auto block object-cover" 
                showText
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- TECHNOLOGY STACK --- */}
      <section className="relative z-20 bg-black py-16 md:py-24 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Stack
            </h2>
            <div className="w-16 h-0.5 bg-white mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { role: "Development Environment", tech: "Roblox Studio" },
              { role: "Scripting Language", tech: "Luau" },
              { role: "Physics Engine", tech: "Roblox Physics" },
              { role: "User Interface", tech: "Roact / Roblox UI" },
              { role: "Data Management", tech: "Roblox DataStore" },
              { role: "Target Platform", tech: "Cross-Platform (PC, Mobile, Console)" }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center hover:border-white/40 transition-colors">
                <h3 className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-2">{item.role}</h3>
                <p className="font-flux font-bold text-white text-sm md:text-base uppercase tracking-wider">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GAMEPLAY & MECHANICS SHOWCASE --- */}
      <section className="relative z-20 bg-black text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Core Mechanics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Hydration & Spit System</h3>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Unique fluid management mechanics requiring players to hydrate, salivate, and eliminate obstacles dynamically using custom Luau physics.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Environmental Hazards</h3>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Interactive maps filled with obstacle courses, survival timers, and multiplayer challenge arenas built natively in Roblox Studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO CONTEXT & MOCK DATA NOTICE --- */}
      <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-24 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
            Portfolio Context
          </h2>
          <p className="text-lg md:text-xl font-[family-name:var(--font-poppins)] font-light leading-relaxed text-zinc-300 italic max-w-3xl mx-auto">
            "Spit Out was developed to explore custom physics and fluid survival mechanics within Roblox Studio, focusing on responsive player controls, multiplayer synchronization, and dynamic level hazard interactions."
          </p>
        </div>
      </section>

    </main>
  );
}
