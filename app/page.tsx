"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ResumePage from "@/components/ui/portfolio-hero-with-paper-shaders";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import ProfileCard from "@/components/ui/profile-card-1";
import { SkeletonImage } from "@/components/ui/skeleton-image";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

  const miniProjects = [
    {
      id: "m01",
      title: "Boxing Match: Gerald vs Owen",
      tech: "HTML5 Canvas / JavaScript",
      desc: "Interactive 2D web boxing arcade game featuring custom character selection, physics, and combat mechanics.",
      link: "/mini-project/001"
    },
    {
      id: "m02",
      title: "Scroll Parallax Album",
      tech: "Next.js / Framer Motion / Parallax",
      desc: "Editorial photo album experiment featuring dynamic multi-phase scroll parallax, fluid visual transitions, and interactive lightbox gallery.",
      link: "/mini-project/002"
    }
  ];

  return (
    <div className="bg-transparent text-white selection:bg-zinc-800 font-sans relative">

      {/* --- FIXED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-[-1] w-full h-screen">
        <SkeletonImage
          src={`${BASE_PATH}/mayores1.png`}
          alt="Background Image"
          fill
          className="object-cover object-[center_center] md:object-[65%_center]"
          priority
        />

        {/* OVERLAY: DARKNESS (Desktop Only) */}
        <div
          className="absolute inset-0 z-10 hidden md:block"
          style={{
            background: "linear-gradient(to right, #000000 0%, #000000 min(40vw, 3in), transparent 100%)"
          }}
        />
      </div>

      {/* GLOBAL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
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
          <h1 className="text-[22vw] sm:text-[20vw] md:text-[18vw] font-[900] font-flux leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
            KUWINA
          </h1>
        </motion.div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end z-30 pb-12 px-8 md:px-16">
          {/* Arrow Indicator: Fixed & consistent left anchor aligned with portrait image */}
          <motion.div style={{ y: arrowY }} className="absolute left-[15%] sm:left-[25%] md:left-[33%] bottom-0 flex flex-col items-start z-40 pointer-events-none">
            <div className="w-3 h-3 border-t-2 border-l-2 border-white rotate-45 -mt-1.5 opacity-100 -ml-[5.5px]" />
            <div className="h-[40vh] sm:h-[42vh] md:h-[45vh] w-[1.5px] bg-white opacity-80" />
          </motion.div>
        </div>

        {/* THE PERSON IMAGE (mayores2.png) - FLUSH START AT ARROW LINE */}
        <motion.div
          style={{ y: portraitY }}
          className="absolute left-[15%] sm:left-[25%] md:left-[33%] right-0 bottom-0 h-[52%] sm:h-[56%] md:h-[60%] z-20 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src={`${BASE_PATH}/mayores2.png`}
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4"
          >
            THRIVING TO LEARN NEW THINGS.
          </motion.h2>
          
          <p className="text-xl md:text-2xl font-light leading-relaxed font-[family-name:var(--font-poppins)] text-white/90 drop-shadow-md">
            unemployed need job pls
          </p>
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
              className="text-4xl sm:text-5xl md:text-7xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90"
            >
              The Projects
            </motion.h2>
          </div>
          <div className="flex-grow">
            {/* Inside sidebar we can pass custom classes safely now */}
            <ProjectShowcase projects={projects} className="max-w-none px-0 py-0" />
          </div>

          {/* MINI PROJECTS SUBSECTION */}
          <div className="mt-14 pt-10 border-t border-zinc-900">
            <div className="mb-6 text-center md:text-left">
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase text-[#cccccc] opacity-90"
              >
                Mini Projects & Experiments
              </motion.h3>
              <p className="text-xs font-mono text-zinc-500 mt-2">
                Utility scripts, automated pipelines, and prototype experiments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {miniProjects.map((mini, idx) => (
                <motion.div
                  key={mini.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Link
                    href={mini.link}
                    className="flex flex-col justify-between border border-zinc-800/80 p-5 bg-zinc-950/60 hover:border-white/60 hover:bg-zinc-900/80 transition-all duration-300 group min-h-[130px] h-full"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-bold font-mono text-zinc-200 group-hover:text-white transition-colors flex items-center gap-1.5">
                          {mini.title}
                          <span className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs">→</span>
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400 border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 shrink-0">
                          {mini.tech}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                        {mini.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SKILLS / ARSENAL */}
        <div className="w-full md:w-1/3 flex flex-col justify-center border-l-0 md:border-l border-zinc-800/30 pl-0 md:pl-12 pt-12 md:pt-0">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase text-[#cccccc] opacity-90">Skills</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Single Unified Skills Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col border border-zinc-800 p-6 md:p-8 hover:border-white/40 transition-colors bg-zinc-950/50 group space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700"
            >
              {/* Category: Frontend & Mobile */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">Frontend & Mobile</h4>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-300">
                  {["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Svelte", "Tailwind CSS", "Bootstrap", "Material UI", "Ant Design", "Chakra UI", "Shadcn UI", "Radix UI", "Lucide React", "Framer", "Flutter", "WordPress", "Progressive Web App (PWA)", "Expo EAS", "Jetpack"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 hover:border-zinc-500 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category: Backend & APIs */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">Backend & APIs</h4>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-300">
                  {["Node.js", "Python", "PHP", "Laravel", "Express", "FastAPI", "Kotlin", "C++", "Streamlit", "Zod", "Zustand", "TanStack", "better-auth", "JWT", "CORS", "Pydantic", "PayMongo", "Stripe", "PayPal", "Resend"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 hover:border-zinc-500 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category: Databases & Cloud */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">Databases & Cloud</h4>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-300">
                  {["Supabase", "Supabase Auth", "Firebase Auth", "SQLite", "MySQL", "PostgreSQL", "MongoDB", "BigQuery", "Axiom", "Upstash Redis", "Supabase Cloud", "Firebase Cloud", "Supabase Storage", "XAMPP/WAMP", "Laragon", "AWS", "Oracle Cloud", "AWS Networking", "Azure Networking", "Aviatrix", "Aviatrix Multicloud"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 hover:border-zinc-500 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category: AI & Machine Learning */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">AI, ML & Computer Vision</h4>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-300">
                  {["OpenAI API", "Google Gemini", "Claude", "Copilot", "Stitch AI", "Oracle Generative AI", "Gen AI", "Torch", "Tensors", "TensorFlow", "Caffe2", "PyTorch", "Theano", "Pandas", "Pinecone", "InsightFace", "ArcFace embeddings", "OpenCV", "ONNX Runtime", "Google ML Kit Text Recognition", "YOLO", "RetinaFace detection"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 hover:border-zinc-500 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category: DevOps, Security & Tooling */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-1">DevOps, Security & Tooling</h4>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-300">
                  {["Docker", "GitHub Actions", "GitLab CLI", "Vercel", "ISO 27001", "AWS IAM", "bcrypt", "HSTS", "CSP", "Prettier", "Husky", "Playwright"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 hover:border-zinc-500 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* CERTIFICATES SECTION */}
          <div className="mt-10 mb-6 text-center md:text-left">
            <h3 className="text-xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase text-[#cccccc] opacity-90">Certificates</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col border border-zinc-800 p-6 md:p-8 hover:border-white/40 transition-colors bg-zinc-950/50 group"
            >
              <ul className="space-y-3 font-mono text-xs md:text-sm text-zinc-400 opacity-90">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white/80 rounded-none shrink-0" />Artificial Intelligence (AI) Prompting for Automation Level III (TESDA)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white/80 rounded-none shrink-0" />Java Fundamentals</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white/80 rounded-none shrink-0" />SAP HANA</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PAGE 5: FINALE --- */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-6 sm:px-12 md:px-24 py-16 md:py-24">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: PROMPT QUESTIONS LIST */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left space-y-3 sm:space-y-4">
            {[
              { from: "Capstone", to: "" },
              { from: "Paper-based", to: "application" },
              { from: "Manual", to: "automation" },
              { from: "Idea", to: "development" },
              { from: "Idea", to: "design" },
              { from: "Concept", to: "system" },
              { from: "Problem", to: "solution" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex items-center flex-wrap gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-flux font-[900] leading-none uppercase tracking-[-0.05em] select-none text-[#cccccc] opacity-90 hover:text-white transition-colors"
              >
                <span>{item.from}</span>
                {item.to ? (
                  <>
                    <span className="font-mono text-xs sm:text-sm font-normal text-zinc-500 lowercase tracking-normal mx-1">
                      to
                    </span>
                    <span>{item.to}</span>
                  </>
                ) : (
                  <span className="text-zinc-500 font-mono text-xs sm:text-sm font-normal uppercase tracking-normal">?</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: CONTACT & PROFILE CARD */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
                Contact
              </h2>
            </div>
            <ProfileCard 
              avatarUrl={`${BASE_PATH}/pfp.jpg`} 
              githubUrl="https://github.com/kuwina21" 
              instagramUrl="https://www.instagram.com/kuwina__/" 
              linkedinUrl="https://www.linkedin.com/in/shandy-mayores-34a023388/" 
            />
          </div>

        </div>
      </section>
    </div>
  );
}