"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/mayores' : '';

export default function FureverCareDetails() {
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
            className="text-[12.5vw] sm:text-[11.5vw] md:text-[10.5vw] font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 flex flex-wrap justify-center overflow-hidden py-2"
          >
            {"FUREVERCARE".split("").map((char, index) => (
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
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-400 uppercase tracking-widest mt-4">
            Pet Health & Veterinary Management System
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
              <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-poppins)] text-zinc-300 font-light leading-relaxed max-w-lg">
                Furevercare solves record fragmentation in local veterinary services by implementing a <span className="text-white font-bold">real-time cloud architecture</span>.
              </p>
              <a 
                href="https://furevercare-5b8f9.web.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-8 py-4 bg-white text-black font-mono font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-3 hover:bg-zinc-200 transition-colors shadow-xl active:scale-95"
              >
                <span>Launch System</span>
                <span className="text-sm">↗</span>
              </a>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full bg-zinc-900 border border-zinc-800">
              <img 
                src={`${BASE_PATH}/furevercare.png`} 
                alt="Dashboard Overview" 
                className="w-full h-auto block" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE SECTION --- */}
      <section className="relative z-20 bg-black text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="mb-10 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              System Architecture
            </h2>
            <div className="w-16 h-0.5 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Vet Card */}
            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-2 text-white">Veterinary Module</h3>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-6 md:mb-8">Web Dashboard • Admin</p>
              <ul className="space-y-3 md:space-y-4">
                {["Analytics Dashboard", "Smart Scheduling", "Medical Records", "Inventory Management"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300 font-mono text-xs md:text-sm">
                    <span className="w-1.5 h-1.5 bg-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Card */}
            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-2 text-white">Customer Module</h3>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-6 md:mb-8">Mobile App • Client</p>
              <ul className="space-y-3 md:space-y-4">
                {["Digital Pet Cards", "Instant Booking", "Push Notifications", "Remote Consultation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300 font-mono text-xs md:text-sm">
                    <span className="w-1.5 h-1.5 bg-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- UI SHOWCASE --- */}
      <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
              Interface Showcase
            </h2>
          </div>

          <div className="space-y-16 md:space-y-32">
            {/* Website Section */}
            <div>
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <span className="px-3 py-1.5 bg-zinc-900 text-white text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] border-l-2 border-white">Web Dashboard</span>
                <div className="h-px flex-grow bg-zinc-800"></div>
              </div>
              <div className="flex flex-col gap-8 md:gap-16">
                <div className="relative border border-zinc-800 shadow-2xl">
                   <img 
                     src={`${BASE_PATH}/w1.png`} 
                     alt="Web Dashboard Interface 1" 
                     className="w-full h-auto block" 
                   />
                </div>
                <div className="relative border border-zinc-800 shadow-2xl">
                   <img 
                     src={`${BASE_PATH}/w2.png`} 
                     alt="Web Dashboard Interface 2" 
                     className="w-full h-auto block" 
                   />
                </div>
              </div>
            </div>

            {/* Mobile Section */}
            <div>
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <span className="px-3 py-1.5 bg-zinc-900 text-white text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] border-l-2 border-white">Mobile App</span>
                <div className="h-px flex-grow bg-zinc-800"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 justify-items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-zinc-800 bg-zinc-900"
                >
                   <img 
                     src={`${BASE_PATH}/m1.jpg`} 
                     alt="Mobile UI 1" 
                     className="w-full h-full object-cover" 
                   />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-zinc-800 bg-zinc-900"
                >
                   <img 
                     src={`${BASE_PATH}/m2.jpg`} 
                     alt="Mobile UI 2" 
                     className="w-full h-full object-cover" 
                   />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MANUSCRIPT VIEWER --- */}
      <section className="relative z-20 py-16 md:py-24 bg-black text-white px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
              Project Manuscript
            </h2>
            <a 
              href={`${BASE_PATH}/furevercare_manuscript.pdf`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-widest border border-zinc-800 flex items-center gap-2 transition-colors active:scale-95"
            >
              <span>Open PDF</span>
              <span>↗</span>
            </a>
          </div>

          {/* PDF VIEWER CONTAINER */}
          <div className="w-full h-[55vh] md:h-[80vh] bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl">
            <object
              data={`${BASE_PATH}/furevercare_manuscript.pdf`}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-6 md:p-12">
                <p className="text-zinc-400 mb-4 text-sm md:text-base font-mono">Your device does not support inline PDF viewing.</p>
                <a 
                  href={`${BASE_PATH}/furevercare_manuscript.pdf`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black font-mono font-bold uppercase tracking-wider text-xs"
                >
                  Download Manuscript PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      </section>

    </main>
  );
}
