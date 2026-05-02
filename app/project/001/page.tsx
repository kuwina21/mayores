"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/mayores' : '';


export default function FureverCareDetails() {

  return (
    <main className="bg-[#050505] text-white font-sans selection:bg-blue-500 selection:text-white relative">

      {/* --- HEADER --- */}
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center p-4 md:p-8 pointer-events-none">
        <Link href="/" className="pointer-events-auto px-4 py-2 md:px-6 md:py-3 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2 shadow-2xl">
          <span className="text-lg">←</span>
          <span className="hidden md:inline">Return Home</span>
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.h1 
            className="text-[14vw] md:text-[12vw] font-black tracking-tighter leading-none text-white uppercase flex flex-wrap justify-center overflow-hidden"
          >
            {"FUREVERCARE".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>

      {/* --- PROJECT OVERVIEW --- */}
      <section className="relative z-20 bg-white text-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Column (Text) */}
            <div className="flex flex-col items-start text-left space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Project <br /> Overview
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg">
                Furever-Care solves record fragmentation in local veterinary services by implementing a <span className="text-black font-bold">real-time cloud architecture</span>.
              </p>
              <a href="https://furevercare-5b8f9.web.app/" target="_blank" className="w-full md:w-auto px-8 py-4 bg-black text-white font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-3 hover:bg-blue-600 transition-colors shadow-xl shadow-black/20">
                Launch System ↗
              </a>
            </div>

            {/* Right Column (Image) - FIXED FOR ORIGINAL ASPECT RATIO AND SHARP EDGES */}
            <div className="relative w-full p-0 bg-gray-50 border border-gray-200">
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
      <section className="relative z-50 bg-[#0a0a0a] text-white py-16 md:py-32 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">System Architecture</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Vet Card */}
            <div className="bg-[#111] p-6 md:p-10 border border-white/5 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white">Veterinary Module</h3>
              <p className="text-blue-400 font-mono text-xs uppercase mb-6 md:mb-8">Web Dashboard • Admin</p>
              <ul className="space-y-3 md:space-y-4">
                {["Analytics Dashboard", "Smart Scheduling", "Medical Records", "Inventory Management"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Card */}
            <div className="bg-[#111] p-6 md:p-10 border border-white/5 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white">Customer Module</h3>
              <p className="text-blue-400 font-mono text-xs uppercase mb-6 md:mb-8">Mobile App • Client</p>
              <ul className="space-y-3 md:space-y-4">
                {["Digital Pet Cards", "Instant Booking", "Push Notifications", "Remote Consultation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
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
      <section className="relative z-50 bg-white text-black py-16 md:py-32 px-4 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">Interface</h2>
          </div>

          <div className="space-y-24 md:space-y-40">
            {/* Website Section */}
            <div>
              <div className="flex items-center gap-4 mb-10 md:mb-16">
                <span className="px-4 py-1.5 bg-gray-50 text-black text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border-l-4 border-black pl-3">Web Dashboard</span>
                <div className="h-px flex-grow bg-gray-100"></div>
              </div>
              <div className="flex flex-col gap-12 md:gap-24">
                <div className="relative border border-gray-100 shadow-2xl">
                   <img 
                     src={`${BASE_PATH}/w1.png`} 
                     alt="Web Dashboard Interface 1" 
                     className="w-full h-auto block" 
                   />
                </div>
                <div className="relative border border-gray-100 shadow-2xl">
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
              <div className="flex items-center gap-4 mb-10 md:mb-16">
                <span className="px-4 py-1.5 bg-gray-50 text-black text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border-l-4 border-black pl-3">Mobile App</span>
                <div className="h-px flex-grow bg-gray-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 justify-items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[300px] aspect-[9/19] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] border-[8px] border-gray-900 bg-gray-900"
                >
                   <img 
                     src={`${BASE_PATH}/m1.jpg`} 
                     alt="Mobile UI 1" 
                     className="w-full h-full object-cover" 
                   />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full max-w-[300px] aspect-[9/19] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] border-[8px] border-gray-900 bg-gray-900"
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
      <section className="relative z-50 py-16 md:py-24 bg-white text-black px-4 md:px-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">Project Manuscript</h2>
            </div>

          </div>

          {/* PDF VIEWER CONTAINER */}
          <div className="w-full h-[60vh] md:h-[85vh] bg-gray-100 border border-gray-200 overflow-hidden shadow-2xl">
            <object
              data={`${BASE_PATH}/furevercare_manuscript.pdf`}
              type="application/pdf"
              className="w-full h-full"
            >
              {/* Fallback for mobile (since many mobile browsers don't support inline PDF) */}
              <div className="flex flex-col items-center justify-center h-full text-center p-8 md:p-12">
                <p className="text-gray-500 mb-4 text-lg">Your device might not support inline PDF viewing.</p>

              </div>
            </object>
          </div>
        </div>
      </section>

    </main>
  );
}
