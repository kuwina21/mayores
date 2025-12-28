import Link from 'next/link';

export default function Projects() {
  const myProjects = [
    { title: "E-Commerce App", tech: "Next.js • Tailwind", desc: "A modern shopping experience." },
    { title: "AI Dashboard", tech: "React • OpenAI", desc: "Data visualization for AI metrics." },
    { title: "Portfolio V1", tech: "HTML • CSS", desc: "My very first coding project." },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white p-8 md:p-24">
      {/* Navigation Header */}
      <nav className="flex justify-between items-center mb-16">
        <Link href="/" className="text-xl font-bold tracking-tighter">MAYORES</Link>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Back Home</Link>
      </nav>

      <header className="mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Selected Work</h2>
        <p className="text-gray-400 text-lg">A collection of things I've built with code.</p>
      </header>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myProjects.map((project, index) => (
          <div 
            key={index}
            className="group relative p-8 rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500"
          >
            {/* UIVERSE ELEMENT GOES HERE */}
            <div className="mb-4 text-blue-400 font-mono text-sm">{project.tech}</div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-6">{project.desc}</p>
            
            <button className="text-sm font-bold flex items-center gap-2 group-hover:text-blue-400 transition-colors">
              VIEW PROJECT <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}