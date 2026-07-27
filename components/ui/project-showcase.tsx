"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export interface Project {
    id: string
    title: string
    desc: string
    tech: string
    link: string
    imgSrc?: string
    imgPos?: string
}

export function ProjectShowcase({ projects, className = "max-w-4xl mx-auto px-6 py-32" }: { projects: Project[], className?: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)

    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const animate = () => {
            setSmoothPosition((prev) => ({
                x: lerp(prev.x, mousePosition.x, 0.15),
                y: lerp(prev.y, mousePosition.y, 0.15),
            }))
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index)
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null)
        setIsVisible(false)
    }

    return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className={`relative w-full z-20 ${className}`}>
            {/* <h2 className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-16 italic drop-shadow-lg text-center md:text-left">Selected Work</h2> */}

            {/* Floating Image Container (Desktop Only mostly, or screen > 768px) */}
            <div
                className="pointer-events-none fixed z-[60] overflow-hidden rounded-xl shadow-2xl hidden md:block"
                style={{
                    left: containerRef.current?.getBoundingClientRect().left ?? 0,
                    top: containerRef.current?.getBoundingClientRect().top ?? 0,
                    transform: `translate3d(${smoothPosition.x + 40}px, ${smoothPosition.y - 120}px, 0)`,
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="relative w-[360px] h-[240px] bg-secondary rounded-xl overflow-hidden border border-white/10">
                    {projects.map((project, index) => (
                        <img
                            key={project.id}
                            src={project.imgSrc || "/placeholder.svg"}
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${project.imgPos || "object-center"}`}
                            style={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                scale: hoveredIndex === index ? 1 : 1.1,
                                filter: hoveredIndex === index ? "none" : "blur(10px)",
                            }}
                        />
                    ))}
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
            </div>

            <div className="space-y-0">
                {projects.map((project, index) => (
                    <Link
                        key={project.id}
                        href={project.link}
                        className="group block relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative py-8 border-t border-white/10 transition-all duration-300 ease-out">
                            {/* Background highlight on hover */}
                            <div
                                className={`
                  absolute inset-0 -mx-4 px-4 bg-white/5 rounded-lg
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
                            />

                            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
                                <div className="flex-1 min-w-0">
                                    {/* Title with animated underline */}
                                    <div className="inline-flex items-center gap-4">
                                        <h3 className="font-flux font-[900] text-2xl sm:text-3xl md:text-5xl uppercase tracking-[-0.08em] leading-none select-none text-[#cccccc] opacity-90 py-1">
                                            <span className="relative">
                                                {project.title}
                                                {/* Animated underline */}
                                                <span
                                                    className={`
                            absolute left-0 -bottom-1 h-0.5 bg-white
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                                                />
                                            </span>
                                        </h3>

                                        {/* Arrow that slides in */}
                                        <ArrowUpRight
                                            className={`
                        w-8 h-8 text-white
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index
                                                    ? "opacity-100 translate-x-0 translate-y-0"
                                                    : "opacity-0 -translate-x-4 translate-y-4"
                                                }
                      `}
                                        />
                                    </div>

                                    {/* Description with fade effect */}
                                    <p
                                        className={`
                      text-gray-400 text-sm md:text-lg mt-2 md:mt-4 leading-relaxed max-w-xl
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-white/90" : "text-gray-500"}
                    `}
                                    >
                                        {project.desc}
                                    </p>
                                </div>

                                {/* Tech stack badge */}
                                <div className="mt-4 md:mt-0 flex shrink-0">
                                    <span
                                        className={`
                        text-[10px] md:text-xs font-mono tabular-nums px-3 md:px-4 py-1.5 md:py-2 border rounded-full uppercase tracking-widest
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-white border-white bg-white/10" : "text-white/40 border-white/20"}
                    `}
                                    >
                                        {project.tech}
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Image: Visible only on small screens */}
                            <div className="mt-6 md:hidden overflow-hidden rounded-lg border border-white/10 aspect-video relative">
                                <img
                                    src={project.imgSrc || "/placeholder.svg"}
                                    alt={project.title}
                                    className={`w-full h-full object-cover ${project.imgPos || "object-center"}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Bottom border for last item */}
                <div className="border-t border-white/10" />
            </div>
        </section>
    )
}
