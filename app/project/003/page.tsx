"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SkeletonImage } from '@/components/ui/skeleton-image';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function StakeholdersSystemDetails() {
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
            {"STAKEHOLDERS".split("").map((char, index) => (
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
            Stakeholders Management System
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
                The Stakeholders Management System is a modern web application designed to digitalize and organize the records of various cooperative stakeholders. It replaces manual record-keeping with a secure, centralized dashboard that handles everything from general applicants to the Board of Directors, District Representatives, Electricians, and MCOPE members.
              </p>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full bg-zinc-900 border border-zinc-800 shadow-2xl">
              <SkeletonImage 
                src={`${BASE_PATH}/project_003/login.png`} 
                alt="Stakeholder System Overview" 
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
              { role: "Backend", tech: "Laravel 10 (PHP 8.1+)" },
              { role: "Frontend", tech: "React 19 (Vite SPA)" },
              { role: "Styling", tech: "Tailwind CSS + shadcn/ui" },
              { role: "Database", tech: "MySQL" },
              { role: "Authentication", tech: "Laravel Sanctum" },
              { role: "Icons & UI", tech: "Lucide React, Radix UI" }
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
              Visual overview of all system modules and user capabilities
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {[
              {
                title: "Authentication & Access Control",
                desc: "Secure login module integrated with Laravel Sanctum for role-based authentication.",
                image: "login.png",
                alt: "Login Interface"
              },
              {
                title: "Admin Dashboard & System Metrics",
                desc: "Centralized analytics hub giving administrators real-time statistics on member counts, applications, and district distributions.",
                image: "admin dashboard.png",
                alt: "Admin Dashboard"
              },
              {
                title: "Stakeholder & Applicant Management",
                desc: "Full record processing for membership applicants, OR details, address tracking, and certification generation.",
                image: "applicant.png",
                alt: "Applicant Management"
              },
              {
                title: "Board of Directors (BOD) Registry",
                desc: "Comprehensive list of elected BOD representatives, their active statuses, district affiliations, and detailed modal views.",
                image: "board of directors.png",
                alt: "Board of Directors List"
              },
              {
                title: "BOD Detail & Action Modal",
                desc: "Interactive popups allowing admins to inspect and update board member details seamlessly.",
                image: "bod modal.png",
                alt: "BOD Details Modal"
              },
              {
                title: "Electricians Registry",
                desc: "Dedicated module to register, verify, and filter certified electricians operating across cooperative territories.",
                image: "electricians.png",
                alt: "Electricians Registry"
              },
              {
                title: "MCOPE Management Module",
                desc: "Organized tracking for Member-Consumer-Owners Program for Empowerment (MCOPE) records.",
                image: "mcope.png",
                alt: "MCOPE Management"
              },
              {
                title: "Regular Staff / User View",
                desc: "Restricted read-only UI tailored for general cooperative staff to search and verify member records safely.",
                image: "user.png",
                alt: "Regular User View"
              },
              {
                title: "Recent System Activities",
                desc: "Detailed audit log tracking user actions, record updates, and system events for complete accountability.",
                image: "recent activies.png",
                alt: "Recent Activities Audit Log"
              },
              {
                title: "System Reports & Exporting",
                desc: "Analytical reporting suite enabling admins to review metrics and generate data summaries.",
                image: "reports.png",
                alt: "Reports Dashboard"
              },
              {
                title: "Account & Profile Settings",
                desc: "User profile preferences, credential management, and security settings.",
                image: "profile settings.png",
                alt: "Profile Settings"
              },
              {
                title: "Dynamic Light & Dark Theme Support",
                desc: "Built-in theme toggle offering high-contrast dark mode and crisp light mode for optimal usability.",
                image: "light and dark mode feature.png",
                alt: "Light and Dark Mode Feature"
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
                      src={`${BASE_PATH}/project_003/${encodeURIComponent(feature.image)}`}
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

      {/* --- KEY FEATURES --- */}
      <section className="relative z-20 bg-black py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
              Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Role-Based Access Control (RBAC)</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Admin:</strong> Full read/write access. Can create, edit, and delete records for Stakeholders, Districts, BODs, Electricians, and MCOPEs. Can view Recent Activities and Reports.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Regular User (Staff):</strong> Read-only access to vital records. The UI dynamically restricts actions, ensuring data integrity while allowing staff to verify stakeholder information.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Stakeholder Data Management</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Track comprehensive member profiles including account numbers, OR dates, residential addresses, and district assignments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Generate and print Official Certifications dynamically directly from the browser (e.g. proof of membership and seminar attendance).</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Multi-Entity Tracking</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Board of Directors (BOD):</strong> Track district representatives and their current status (Active, Promoted).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Districts:</strong> Manage coverage areas for geographical organization.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span><strong className="text-white font-medium">Electricians & MCOPE:</strong> Maintain registries of certified utility workers and member-consumer owners.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 p-6 md:p-10 border border-zinc-800">
              <h3 className="text-xl md:text-2xl font-flux font-bold uppercase tracking-wider mb-4 text-white">Advanced Security & Architecture</h3>
              <ul className="space-y-4 text-sm md:text-base font-[family-name:var(--font-poppins)] text-zinc-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>API endpoints strictly protected by Laravel Sanctum middleware with throttled rate-limiting.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Legacy MySQL database support enforced via schema constraints.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white mt-1">▸</span>
                  <span>Extremely lightweight React implementation. Heavy legacy UI libraries completely pruned out in favor of purely functional, zero-bloat Tailwind/Radix UI components.</span>
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-flux font-[900] uppercase tracking-[ -0.05em] text-[#cccccc] mb-4">
                  Portfolio Context
                </h2>
                <p className="text-sm md:text-base font-[family-name:var(--font-poppins)] font-light leading-relaxed text-zinc-300 italic">
                  "This project was developed to solve real-world organizational bottlenecks within an electric cooperative. By decoupling the frontend (React) from the backend (Laravel API), the system achieves rapid response times. The primary engineering focus was on <strong>System Stability, Strict Access Control, and Dependency Optimization</strong>—ensuring the application can run reliably on low-resource hardware without sacrificing a modern, reactive user experience."
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
                  All interface previews, screenshots, and visual records presented across this project page utilize <strong className="text-white font-medium">100% simulated mock data</strong>. Personal details, names, addresses, account numbers, and official record IDs shown are generated for demonstration purposes only. <strong className="text-white font-medium">No real or confidential stakeholder data</strong> is exposed or contained within this portfolio application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
