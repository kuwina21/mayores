"use client";

import React, { useState } from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

export default function BoxingGamePage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const gameUrl = `${BASE_PATH}/mini-projects/boxing-game/`;
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <main className="bg-black text-white font-sans selection:bg-zinc-800 relative min-h-screen">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center p-4 md:p-8 pointer-events-none">
        <NextLink 
          href="/" 
          className="pointer-events-auto min-h-[44px] min-w-[44px] px-4 py-2.5 md:px-6 md:py-3 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2 shadow-2xl active:scale-95"
        >
          <span className="text-lg leading-none">←</span>
          <span className="inline">Return Home</span>
        </NextLink>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-12 px-4 md:px-12 border-b border-zinc-900 flex flex-col items-center text-center">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 border border-zinc-800 px-3 py-1 bg-zinc-950">
          MINI PROJECT &mdash; 001
        </span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase text-[#cccccc] opacity-90 mb-4"
        >
          Boxing Match: Gerald vs Owen
        </motion.h1>
        <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-400 max-w-2xl leading-relaxed">
          Interactive 2D fighting & boxing web game built with HTML5 Canvas, featuring custom character selection, physics, hitboxes, and action combat.
        </p>
      </section>

      {/* GAME CONTAINER SECTION */}
      <section className="py-10 px-4 max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4 font-mono text-xs text-zinc-400">
          <span>Status: Playable Arcade Preview</span>
        </div>

        {/* IFRAME WRAPPER */}
        <div className="w-full relative border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl min-h-[440px] sm:min-h-[500px] md:min-h-0 md:aspect-[16/9] md:max-h-[680px] h-[80vh] md:h-auto">
          <iframe 
            src={gameUrl} 
            title="Boxing Match: Gerald vs Owen"
            className="w-full h-full border-0"
          />
        </div>

        {/* GAME INFO & CONTROLS METADATA */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* TECH STACK */}
          <div className="border border-zinc-800 p-6 bg-zinc-950/60">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">
              Stack
            </h3>
            <ul className="space-y-1.5 font-mono text-xs text-zinc-300">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> HTML5 Canvas</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> Vanilla JavaScript Engine</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> Custom CSS3 Styles</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> Frame-based Hitbox Detection</li>
            </ul>
          </div>

          {/* CONTROLS GUIDE (P1 & P2) */}
          <div className="border border-zinc-800 p-6 bg-zinc-950/60 md:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">
              Game Controls Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-zinc-300">
              <div>
                <span className="text-white font-bold block mb-1">Player 1 (Left):</span>
                <p>Move: <code className="bg-zinc-900 border border-zinc-800 px-1">A</code> / <code className="bg-zinc-900 border border-zinc-800 px-1">D</code></p>
                <p>Jump: <code className="bg-zinc-900 border border-zinc-800 px-1">W</code></p>
                <p>Punch/Attack: <code className="bg-zinc-900 border border-zinc-800 px-1">SPACE</code></p>
                <p>Block: <code className="bg-zinc-900 border border-zinc-800 px-1">E</code></p>
              </div>
              <div>
                <span className="text-white font-bold block mb-1">Player 2 (Right):</span>
                <p>Move: <code className="bg-zinc-900 border border-zinc-800 px-1">←</code> / <code className="bg-zinc-900 border border-zinc-800 px-1">→</code></p>
                <p>Jump: <code className="bg-zinc-900 border border-zinc-800 px-1">↑</code></p>
                <p>Punch/Attack: <code className="bg-zinc-900 border border-zinc-800 px-1">Numpad 5</code></p>
                <p>Block: <code className="bg-zinc-900 border border-zinc-800 px-1">Numpad 6</code></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
