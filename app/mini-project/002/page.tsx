"use client";

import React, { useState } from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

export default function ScrollParallaxAlbumPage() {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const albumUrl = `${BASE_PATH}/mini-projects/album/index.html`;

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

        <span className="pointer-events-auto text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-zinc-400">
          MINI PROJECT &mdash; 002
        </span>
      </nav>

      {/* HEADER SECTION */}
      <section className="relative pt-24 pb-10 px-4 md:px-12 border-b border-zinc-900 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase text-[#cccccc] opacity-90 mb-4"
        >
          Scroll Parallax Album
        </motion.h1>
        <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-400 max-w-2xl leading-relaxed">
          Interactive editorial photo album built with SvelteKit, featuring continuous scroll parallax, multi-phase image transitions, marquee filmstrips, and lightbox inspection.
        </p>
      </section>

      {/* ALBUM IFRAME CONTAINER SECTION */}
      <section className="py-8 px-4 max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4 font-mono text-xs text-zinc-400">
          <span>Preview Mode: Interactive Svelte Application</span>
          <a 
            href={albumUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline min-h-[44px] flex items-center"
          >
            Open Standalone Window ↗
          </a>
        </div>

        {/* IFRAME WRAPPER */}
        <div className="w-full relative border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl h-[85vh] min-h-[600px] rounded-sm">
          <iframe 
            src={albumUrl} 
            title="Scroll Parallax Album"
            className="w-full h-full border-0"
          />
        </div>

        {/* TECH STACK & SPECS METADATA */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 font-mono text-xs">
          <div className="border border-zinc-800 p-6 bg-zinc-950/60">
            <h3 className="font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">
              Tech Stack
            </h3>
            <ul className="space-y-1.5 text-zinc-300">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> Svelte 5 / SvelteKit</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> Vite Build Engine</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white shrink-0" /> Custom Parallax CSS Engine</li>
            </ul>
          </div>

          <div className="border border-zinc-800 p-6 bg-zinc-950/60 md:col-span-2">
            <h3 className="font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
              <div>
                <span className="text-white font-bold block mb-1">Interactive Mechanics:</span>
                <p>• Multi-phase background opacity shifts</p>
                <p>• Continuous marquee gallery auto-scroll</p>
              </div>
              <div>
                <span className="text-white font-bold block mb-1">Visual Architecture:</span>
                <p>• Full-bleed sunset filmstrip rows</p>
                <p>• Lightbox zoom modal preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
