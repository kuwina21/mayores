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
                Spit Out! is a fast-paced, highly competitive 1v1 and team-based arena brawler built on Roblox. The game centers around high-mobility combat, where players utilize beverage-themed movement abilities and a precision "one-tap" core attack to eliminate opponents. Matches are strictly timed 2-minute rounds requiring quick reflexes, strategic ability usage, and mastery of the movement mechanics.
              </p>
              <a 
                href="https://www.roblox.com/share?code=c84a412f5ef93342aa4960c5cb8af811&type=ExperienceDetails&stamp=1785428931694" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-8 py-4 bg-white text-black font-mono font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-3 hover:bg-zinc-200 transition-colors shadow-xl active:scale-95"
              >
                <span>Play Experience</span>
                <span className="text-sm">↗</span>
              </a>
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
              { role: "Platform", tech: "Roblox" },
              { role: "Genre", tech: "Multiplayer Arena Brawler" },
              { role: "Role", tech: "Lead Developer / Programmer" },
              { role: "Scripting Language", tech: "Luau" },
              { role: "Networking", tech: "RemoteEvents Client-Server" },
              { role: "State Controller", tech: "Custom Match Loop" }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center hover:border-white/40 transition-colors">
                <h3 className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-2">{item.role}</h3>
                <p className="font-flux font-bold text-white text-sm md:text-base uppercase tracking-wider">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GAMEPLAY & FEATURES --- */}
      <section className="relative z-20 bg-black text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Gameplay & Features
            </h2>
            <div className="w-16 h-0.5 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Dynamic Loadouts</h3>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Players equip specific items like the Soda Can (featuring a charging high-jump and double long-dash) or the Water Bottle (granting 3 rapid short dashes) to outmaneuver enemies.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">High-Stakes Combat</h3>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Features a one-hit elimination "Spit Attack" mechanic, paired with a custom sprint system for fast-paced engagements.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Player-Driven Matchmaking</h3>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Removed automated, forced-play cycles in favor of an opt-in Teleport Pad system where players control when they queue for the arena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECHNICAL HIGHLIGHTS & SYSTEMS ENGINEERED --- */}
      <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Technical Highlights
            </h2>
            <div className="w-16 h-0.5 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-black p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-2 text-white">Dynamic Team Balancing</h3>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">Matchmaking Pad • Auto-Balancing</p>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Programmed a custom matchmaking pad that actively checks active player counts and automatically balances teams (Red vs. Blue) upon touch, managing UI states ("Waiting for Opponent") for individual clients.
              </p>
            </div>

            <div className="bg-black p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-2 text-white">Client-Server Network Replication</h3>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">RemoteEvents • Real-Time FX</p>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Built a robust networking system using RemoteEvents to flawlessly replicate fast-paced client-side movement abilities and visual effects (particles, dashed trails, charging auras) to the server, ensuring all players see the effects in real-time.
              </p>
            </div>

            <div className="bg-black p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-2 text-white">Custom Match State Controller</h3>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">Game Loop • Match Management</p>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Engineered a bug-free game loop manager that handles 2-minute match timers, 30-kill win conditions, team score tracking, and end-game sequences.
              </p>
            </div>

            <div className="bg-black p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-2 text-white">Spawn & State Protection</h3>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">Respawn Logic • Arena Safety</p>
              <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                Designed strict respawn logic to prevent arena sequence breaks, ensuring players maintain team assignments upon death and are safely teleported back to the lobby when a match concludes without triggering false matchmaking loops.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
