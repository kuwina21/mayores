"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ProjectFall() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Parallax for the hero image
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "10%"]);

    // Base path for static assets
    const BASE_PATH = process.env.NODE_ENV === "production" ? "/mayores" : "";

    return (
        <div ref={containerRef} className="bg-black text-white min-h-screen font-sans relative selection:bg-zinc-800 selection:text-white">

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
            <section className="relative min-h-[85vh] md:min-h-screen bg-black flex flex-col items-center justify-end overflow-hidden z-10 pb-16 pt-24 px-4">
                <motion.div
                    style={{ scale: heroScale, y: heroY }}
                    className="absolute inset-0 z-0 opacity-70"
                >
                    <Image
                        src={`${BASE_PATH}/FALL_L.jpg`}
                        alt="Fall: Rise to Glory Landscape"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[12.5vw] sm:text-[11.5vw] md:text-[10.5vw] font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 drop-shadow-2xl py-2"
                    >
                        FALL: RISE TO GLORY
                    </motion.h1>
                    <p className="font-mono text-zinc-400 text-xs md:text-sm uppercase tracking-widest mt-2">
                        Precision 2D Platformer • Unity & C#
                    </p>
                </div>
            </section>

            {/* --- GAME OVERVIEW --- */}
            <section className="relative z-20 bg-zinc-950 text-white py-16 md:py-28 border-t border-zinc-900">
                <div className="max-w-4xl mx-auto px-4 md:px-12 text-center space-y-8">
                    <span className="inline-block font-mono text-xs text-zinc-400 border border-zinc-800 bg-zinc-900 px-4 py-1.5 uppercase tracking-widest">
                        Nov 28, 2025
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
                        Project Overview
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-poppins)] text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
                        Play as <strong className="text-white">Loyd</strong>, a frog ninja seeking redemption. After a tragic fall, he must challenge the deadly <strong className="text-white">Labyrinth of Ascension</strong> to prove his worth and regain his honor.
                    </p>

                    <div className="flex justify-center gap-3 flex-wrap pt-4">
                        {["Unity Engine", "C# Programming", "Pixel Art", "2D Physics"].map((tech) => (
                            <span key={tech} className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-zinc-300 font-mono text-xs uppercase tracking-widest">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MAIN MENU INTERFACE --- */}
            <section className="relative z-20 bg-black py-16 md:py-24 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-5xl mx-auto">
                    <div className="border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
                        <div className="relative aspect-video overflow-hidden">
                            <Image src={`${BASE_PATH}/MainMenu.png`} alt="Main Menu UI" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LEVEL SHOWCASE --- */}
            <section className="relative z-20 bg-zinc-950 py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
                            Level Progression
                        </h2>
                        <div className="w-16 h-0.5 bg-white mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Level 1 */}
                        <div className="group relative bg-black p-4 border border-zinc-800 hover:border-white/40 transition-colors">
                            <div className="relative aspect-video overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Level1.png`} alt="Level 1: The Ascent" fill className="object-cover" />
                            </div>
                            <div className="p-4 pt-6">
                                <h3 className="font-flux font-bold text-white uppercase tracking-wider text-lg">Level 01: The Ascent</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-mono">Basic platforming mechanics. Precision jumping without enemies.</p>
                            </div>
                        </div>

                        {/* Level 2 */}
                        <div className="group relative bg-black p-4 border border-zinc-800 hover:border-white/40 transition-colors">
                            <div className="relative aspect-video overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Level2.png`} alt="Level 2: Momentum" fill className="object-cover" />
                            </div>
                            <div className="p-4 pt-6">
                                <h3 className="font-flux font-bold text-white uppercase tracking-wider text-lg">Level 02: Momentum</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-mono">Introduction of moving platforms and momentum-based jumps.</p>
                            </div>
                        </div>

                        {/* Level 3 */}
                        <div className="group relative bg-black p-4 border border-zinc-800 hover:border-white/40 transition-colors">
                            <div className="relative aspect-video overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Level3.png`} alt="Level 3: The Gauntlet" fill className="object-cover" />
                            </div>
                            <div className="p-4 pt-6">
                                <h3 className="font-flux font-bold text-white uppercase tracking-wider text-lg">Level 03: The Gauntlet</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-mono">Tight corridors filled with deadly environmental hazards.</p>
                            </div>
                        </div>

                        {/* Level 4 */}
                        <div className="group relative bg-black p-4 border border-zinc-800 hover:border-white/40 transition-colors">
                            <div className="relative aspect-video overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Level4.png`} alt="Level 4: Final Boss" fill className="object-cover" />
                            </div>
                            <div className="p-4 pt-6">
                                <h3 className="font-flux font-bold text-white uppercase tracking-wider text-lg">Level 04: Final Boss</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-mono">The Giant Stone Head chamber. Sawblades and falling rock hazards.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BOSS SPOTLIGHT --- */}
            <section className="relative z-20 bg-black py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
                    <div className="w-full md:w-1/2">
                        <div className="bg-zinc-950 border border-zinc-800 p-3 shadow-2xl">
                            <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                                <Image src={`${BASE_PATH}/FinalBoss.png`} alt="Giant Stone Head Boss" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
                            Giant Stone Head
                        </h2>
                        <p className="text-zinc-300 font-[family-name:var(--font-poppins)] text-base md:text-lg leading-relaxed mb-6 font-light">
                            The guardian of the labyrinth. This boss fight combines bullet-hell mechanics with platforming. Players must dodge rotating sawblades and falling debris while maintaining their footing on moving platforms.
                        </p>
                        <div className="inline-block bg-zinc-950 px-4 py-2 border border-zinc-800">
                            <span className="font-mono text-xs uppercase text-zinc-400 tracking-widest">Hazard Level: Extreme</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GAMEPLAY VIDEO --- */}
            <section className="relative z-20 bg-zinc-950 py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
                            Alpha Gameplay
                        </h2>
                    </div>

                    <div className="bg-black p-2 border border-zinc-800 shadow-2xl">
                        <video
                            className="w-full h-auto bg-black"
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={`${BASE_PATH}/FALL_L.jpg`}
                        >
                            <source src={`${BASE_PATH}/fall.mp4`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            {/* --- HALL OF FAME --- */}
            <section className="relative z-20 bg-black px-4 md:px-12 py-16 md:py-28 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 mb-4">
                            Awards & Recognition
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative bg-zinc-950 p-4 border border-zinc-800 hover:border-white/40 transition-colors">
                            <div className="relative aspect-[4/3] overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Certificate2.jpg`} alt="Best Game Logo Award" fill className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-white font-flux font-bold uppercase text-base">Best Game Logo</h3>
                                <p className="text-zinc-400 text-xs font-mono uppercase mt-1">1st Runner Up</p>
                            </div>
                        </div>

                        <div className="group relative bg-zinc-950 p-4 border border-zinc-700 hover:border-white transition-colors">
                            <div className="relative aspect-[4/3] overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Certificate3.jpg`} alt="Best Game Project Award" fill className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-white font-flux font-bold uppercase text-base">Best Game Project</h3>
                                <p className="text-zinc-400 text-xs font-mono uppercase mt-1">3rd Runner Up</p>
                            </div>
                        </div>

                        <div className="group relative bg-zinc-950 p-4 border border-zinc-800 hover:border-white/40 transition-colors">
                            <div className="relative aspect-[4/3] overflow-hidden border border-zinc-800">
                                <Image src={`${BASE_PATH}/Certificate1.jpg`} alt="Participation Certificate" fill className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-white font-flux font-bold uppercase text-base">TimplaTEK Symposium</h3>
                                <p className="text-zinc-400 text-xs font-mono uppercase mt-1">Official Participant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STUDIO GALLERY --- */}
            <section className="relative z-20 bg-zinc-950 py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90 text-center mb-12 md:mb-20">
                        Behind the Scenes
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-black p-4 border border-zinc-800">
                            <div className="relative aspect-video border border-zinc-800">
                                <Image src={`${BASE_PATH}/Completion.jpg`} alt="Team Completion" fill className="object-cover" />
                            </div>
                            <p className="text-zinc-400 font-mono text-xs uppercase text-center mt-4 tracking-widest">FourHead Studio — Dec 2025</p>
                        </div>

                        <div className="bg-black p-4 border border-zinc-800">
                            <div className="relative aspect-video border border-zinc-800">
                                <Image src={`${BASE_PATH}/OverallProject.jpg`} alt="Project Exhibit" fill className="object-cover" />
                            </div>
                            <p className="text-zinc-400 font-mono text-xs uppercase text-center mt-4 tracking-widest">The Exhibit Hall</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MANUSCRIPT --- */}
            <section className="relative z-20 bg-black text-white py-16 md:py-28 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-flux font-[900] leading-none tracking-[-0.08em] uppercase select-none text-[#cccccc] opacity-90">
                            Game Design Document
                        </h2>
                        <a 
                            href={`${BASE_PATH}/GameDV.pdf`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="min-h-[44px] px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-widest border border-zinc-800 flex items-center gap-2 transition-colors active:scale-95"
                        >
                            <span>Open PDF</span>
                            <span>↗</span>
                        </a>
                    </div>

                    <div className="w-full h-[55vh] md:h-[80vh] bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl">
                        <object data={`${BASE_PATH}/GameDV.pdf`} type="application/pdf" className="w-full h-full">
                            <div className="flex items-center justify-center h-full flex-col gap-4 p-6 text-center">
                                <p className="text-zinc-400 text-sm font-mono">Your browser does not support inline PDF viewing.</p>
                                <a 
                                    href={`${BASE_PATH}/GameDV.pdf`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-white text-black font-mono font-bold uppercase tracking-wider text-xs"
                                >
                                    Download GDD PDF
                                </a>
                            </div>
                        </object>
                    </div>
                </div>
            </section>

            {/* --- CONTRIBUTION & RESOURCES --- */}
            <section className="relative z-20 bg-zinc-950 text-zinc-300 py-16 md:py-24 px-4 md:px-12 border-t border-zinc-900">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <p className="text-lg md:text-xl font-[family-name:var(--font-poppins)] font-light leading-relaxed text-zinc-300 italic max-w-2xl mx-auto">
                        "Enhanced 2D game FALL: Rise to Glory by building custom adventure levels and modifying mechanics to create a challenging user experience."
                    </p>

                    <div className="border-t border-zinc-900 pt-12 max-w-lg mx-auto">
                        <h3 className="font-flux font-bold uppercase tracking-widest text-white mb-6 text-sm">Credits & Resources</h3>
                        <div className="space-y-4 font-mono text-xs text-zinc-400">
                            <div>
                                <span className="block text-zinc-500 uppercase text-[10px] mb-1">Academic Inspiration</span>
                                <span>Celeste, Super Meat Boy, Rayman Legends</span>
                            </div>
                            <div>
                                <span className="block text-zinc-500 uppercase text-[10px] mb-1">Gameplay Mechanics Inspired By</span>
                                <span>Ninja Frog (Steam)</span>
                            </div>
                            <div>
                                <span className="block text-zinc-500 uppercase text-[10px] mb-1">Base Engine Reference</span>
                                <a href="https://github.com/chrisgodfrey/Robobunny" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">
                                    Robobunny by Chris Godfrey
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}