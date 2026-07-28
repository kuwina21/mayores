"use client";

import React from 'react';
import Link from 'next/link';
import { SkeletonImage } from '@/components/ui/skeleton-image';
import { motion } from 'framer-motion';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function HelpDeskDetails() {
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
            {"HELP DESK".split("").map((char, index) => (
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
            IT Helpdesk & Service Request Management System
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
                The IT Helpdesk System is a full-stack, real-time IT service management application built to streamline hardware and software request ticketing, priority SLA calculations, admin workflow approvals, and official PDF report generation.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Laravel 11", "Livewire v3", "Alpine.js", "Tailwind CSS", "Laravel Dompdf"].map((tech) => (
                  <span key={tech} className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-zinc-300 font-mono text-xs uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full bg-zinc-900 border border-zinc-800 shadow-2xl">
              <SkeletonImage 
                src={`${BASE_PATH}/project_005/helpdesk.png`} 
                alt="IT Helpdesk System Overview" 
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
              { role: "Backend", tech: "Laravel 11 (PHP 8.2+)" },
              { role: "Reactivity", tech: "Livewire v3" },
              { role: "UI Interaction", tech: "Alpine.js" },
              { role: "Styling", tech: "Tailwind CSS" },
              { role: "Authentication", tech: "Laravel Breeze" },
              { role: "PDF Generation", tech: "Laravel Dompdf" }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center hover:border-white/40 transition-colors">
                <h3 className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-2">{item.role}</h3>
                <p className="font-flux font-bold text-white text-sm md:text-base uppercase tracking-wider">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- UI & FEATURE SHOWCASE --- */}
      <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Interface & Feature Showcase
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest max-w-xl mx-auto">
              Visual walkthrough of support workflows, admin queues, and request portals
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {[
              {
                title: "Authentication Portal",
                desc: "Laravel Breeze authentication gateway protecting user and administrative portals with role-based routing.",
                image: "login.png",
                alt: "Helpdesk Login"
              },
              {
                title: "System Overview Dashboard",
                desc: "Centralized landing dashboard providing quick navigation to ticket sub-modules, active requests, and service categories.",
                image: "helpdesk.png",
                alt: "Helpdesk Main View"
              },
              {
                title: "Admin Analytics & Queue Dashboard",
                desc: "Real-time counter metrics tracking total, pending, queued, and resolved tickets alongside personnel assignment tools.",
                image: "admin dashboard.png",
                alt: "Admin Dashboard"
              },
              {
                title: "User Ticket Submission Request",
                desc: "Interactive form modal enabling users to select hardware/software service categories with dynamic SLA previews.",
                image: "users when requesting a ticket.png",
                alt: "Ticket Request Form"
              },
              {
                title: "User Ticket Status Portal",
                desc: "Live status tracking board where users can monitor pending, accepted, in-progress, or resolved tickets in real time.",
                image: "users pov of ticket can see if its pending, accepted or in progress.png",
                alt: "User Ticket POV"
              },
              {
                title: "Ticket Detail & Audit View",
                desc: "In-depth record inspector displaying complete ticket logs, admin remarks, priority levels, and timestamp histories.",
                image: "example of a ticket.png",
                alt: "Ticket Details View"
              },
              {
                title: "Ticket Processing & Approval Table",
                desc: "Searchable and filterable administrative management table for processing, queueing, and resolving active tickets.",
                image: "ticket.png",
                alt: "Ticket Management Table"
              },
              {
                title: "Service Type Customization",
                desc: "Admin configuration module to introduce, edit, or disable hardware and software service request types dynamically.",
                image: "example of add service types.png",
                alt: "Add Service Types"
              },
              {
                title: "User, Department & Service Management",
                desc: "Comprehensive administrative suite for managing organizational departments, user roles, and service parameters.",
                image: "user, department, service types mangement.png",
                alt: "User and Department Management"
              },
              {
                title: "PDF Report Export Module",
                desc: "Automated document generator producing official PDF service forms and action sheets via Laravel Dompdf.",
                image: "ticket can send a pdf file.png",
                alt: "PDF File Export"
              },
              {
                title: "System Analytics & Reports",
                desc: "Reporting dashboard summarizing IT service request performance, category distribution, and resolution SLAs.",
                image: "reports.png",
                alt: "Analytics Reports"
              },
              {
                title: "Profile & Account Settings",
                desc: "User profile customization, password security management, and department information preferences.",
                image: "profile settings, information and password.png",
                alt: "Profile Settings"
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1.5 bg-zinc-900 text-white text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] border-l-2 border-white">
                    0{idx + 1} // {feature.title}
                  </span>
                  <div className="h-px flex-grow bg-zinc-800"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-1 space-y-3">
                    <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-2 relative bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
                    <SkeletonImage
                      src={`${BASE_PATH}/project_005/${encodeURIComponent(feature.image)}`}
                      alt={feature.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto block object-cover"
                      showText
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="relative z-20 bg-black py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Dynamic SLA Calculation</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">High Priority (4 Hours):</strong> Critical network or server outages demanding immediate technician intervention.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Medium Priority (24 Hours):</strong> Standard hardware replacements and printer issues.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Low Priority (72 Hours):</strong> General IT inquiries, software recommendations, and routine maintenance.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Approval & Audit Workflows</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Mandatory admin remarks required when disapproving or canceling requests.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Automated audit logging in <code className="text-white font-mono text-xs">ticket_logs</code> capturing timestamped status transitions.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Hardware Recommendation & Disposal</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Dedicated modules to process equipment procurement recommendations and end-of-life hardware disposal requests.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Real-Time Single-Page Reactivity</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Powered by Livewire v3 and Alpine.js for seamless UI updates without full page reloads.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO CONTEXT & MOCK DATA NOTICE --- */}
      <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-24 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Portfolio Context */}
            <div className="bg-black p-8 md:p-10 border border-zinc-800 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-flux font-[900] uppercase tracking-[-0.05em] text-[#cccccc] mb-4">
                  Portfolio Context
                </h2>
                <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] font-light leading-relaxed text-zinc-300 italic">
                  "This application was engineered to address organizational IT bottlenecks by digitalizing service ticketing, SLA priority tracking, and hardware lifecycle management into a reactive single-page architecture."
                </p>
              </div>
            </div>

            {/* Right Column: Mock Data Notice */}
            <div className="bg-black p-8 md:p-10 border border-zinc-800 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-flux font-[900] uppercase tracking-[-0.05em] text-[#cccccc]">
                    Mock Data & Privacy
                  </h2>
                </div>
                <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] font-light leading-relaxed text-zinc-300">
                  All interface previews, screenshots, and sample records presented across this project page utilize <strong className="text-white font-medium">100% simulated mock data</strong>. Personal details, names, employee IDs, and ticket numbers are generated strictly for demonstration purposes. <strong className="text-white font-medium">No confidential enterprise data</strong> is contained within this showcase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
