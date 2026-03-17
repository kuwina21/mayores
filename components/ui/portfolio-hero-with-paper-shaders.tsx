"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ResumePage() {
    const BASE_PATH = process.env.NODE_ENV === "production" ? "/mayores" : "";

    return (
        <div className="relative min-h-screen flex flex-col md:flex-row">
            {/* Left Side: Resume Details */}
            <div className="w-full md:w-1/2 p-8 font-mono relative z-10 transition-colors duration-500 flex flex-col justify-between bg-white text-black">
                <div className="flex-1">
                    {/* Header */}
                    <div className="mb-12 mt-4">
                        <div className="mb-8">
                            <h2 className="text-lg font-normal">SHANDY MAYORES</h2>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-12 space-y-4">
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
