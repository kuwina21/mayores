"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ResumePage() {
    const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

    return (
        <div className="relative min-h-screen flex flex-col md:flex-row">
            {/* Left Side: Resume Details */}
            <div className="w-full md:w-1/2 p-8 font-mono relative z-10 transition-colors duration-500 flex flex-col justify-between bg-white text-black">
                <div className="flex-1">
                    {/* Header */}
                    <div className="mb-12 mt-4">
                        <div className="mb-2">
                            <h2 className="text-lg font-normal uppercase tracking-widest border-b border-black pb-4">SHANDY MAYORES</h2>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-600 mt-2 mb-1">
                            Develop &mdash; Design &mdash; Decipher &mdash; Devise
                        </p>
                        <p className="text-xs opacity-60">Birthdate: January 21, 2004</p>
                    </div>

                    {/* About Section */}
                    <div className="mb-12">
                        <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                            I am a recent IT graduate with a focus on programming and relational database management. 
                            I am interested in how AI can improve user experience and I enjoy building applications 
                            that are supported by organized, scalable data. I am eager to apply my technical skills 
                            to real-world projects and continue growing as a developer.
                        </p>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-12">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-40">Education</h3>
                        <div className="flex flex-col md:flex-row md:items-center text-sm md:text-base">
                            <span className="w-32 font-bold">STI College Naga</span>
                            <span className="md:mx-2 text-blue-500">Student</span>
                            <span className="md:mx-4 opacity-50">2022 → 2026</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Image only */}
            <div className="flex w-full md:w-1/2 h-[50vh] md:h-auto relative bg-[#0a0a0a] overflow-hidden items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src={`${BASE_PATH}/mayores3.jpg`}
                        alt="Shandy Mayores"
                        fill
                        className="object-cover object-[center_80%]"
                    />
                </div>
            </div>
        </div>
    )
}
