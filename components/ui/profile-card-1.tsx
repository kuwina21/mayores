import React, { useState } from 'react';
import { Instagram, Github, Linkedin, ArrowUpRight, Mail, Send, X, Check, Loader2, Phone } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Component({ 
    avatarUrl, 
    githubUrl = "https://github.com/shandymayores", 
    linkedinUrl = "#", 
    instagramUrl = "#", 
    email = "shandymayores7@gmail.com",
    phone = "+639513928098"
}: { 
    avatarUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    email?: string;
    phone?: string;
}) {
    return (
        <div className="flex items-center justify-center min-h-[50vh] p-4 font-sans bg-transparent transition-colors duration-500 sm:p-8 w-full">
            <ProfileCardDemo 
                avatarUrl={avatarUrl} 
                githubUrl={githubUrl} 
                linkedinUrl={linkedinUrl} 
                instagramUrl={instagramUrl} 
                email={email} 
                phone={phone}
            />
        </div>
    );
}

const ProfileCardDemo = ({ 
    avatarUrl, 
    githubUrl, 
    linkedinUrl, 
    instagramUrl, 
    email,
    phone 
}: { 
    avatarUrl?: string;
    githubUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    email: string;
    phone: string;
}) => {
    const cardProps = {
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=200',
        name: 'Shandy Mayores',
        title: '',
        bio: 'Pressure is a privilege',
        socialLinks: [
            { id: 'github', icon: Github, label: 'GitHub', href: githubUrl },
            { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: linkedinUrl },
            { id: 'instagram', icon: Instagram, label: 'Instagram', href: instagramUrl },
        ],
        actionButton: {
            text: 'Contact Me',
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        },
    };

    return <GlassmorphismProfileCard {...cardProps} />;
};

type SocialLink = {
    id: string;
    icon: React.ElementType;
    label: string;
    href: string;
};

type ActionButtonProps = {
    text: string;
    href: string;
};

interface GlassmorphismProfileCardProps {
    avatarUrl: string;
    name: string;
    title: string;
    bio: string;
    socialLinks?: SocialLink[];
    actionButton: ActionButtonProps;
}

const GlassmorphismProfileCard = ({
    avatarUrl,
    name,
    title,
    bio,
    socialLinks = [],
    actionButton,
}: GlassmorphismProfileCardProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Extract raw email address from mailto: link
    const emailAddress = actionButton.href.replace('mailto:', '');

    const handleSend = () => {
        if (!message.trim()) return;
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);
            window.location.href = `mailto:${emailAddress}?body=${encodeURIComponent(message)}`;
            setTimeout(() => {
                setIsSent(false);
                setMessage('');
                setIsChatOpen(false);
            }, 1500);
        }, 800);
    };

    return (
        <div className="relative w-full max-w-sm">
            <div
                className="relative flex flex-col items-center p-8 rounded-none border transition-all duration-300 ease-out bg-zinc-950 border-zinc-800 overflow-hidden min-h-[380px]"
            >
                {/* Profile details */}
                <div className="flex flex-col items-center w-full">
                    <div className="w-24 h-24 mb-4 rounded-full p-1 border border-zinc-700 truncate relative overflow-hidden">
                        <Image
                            src={avatarUrl}
                            alt={`${name}'s Avatar`}
                            fill
                            className="rounded-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://placehold.co/96x96/171717/white?text=${name.charAt(0)}`;
                            }}
                        />
                    </div>

                    <h2 className="text-2xl font-flux font-bold text-white tracking-tight uppercase">{name}</h2>
                    {title && <p className="mt-1 text-sm font-mono text-zinc-400">{title}</p>}
                    <p className="mt-4 text-center text-sm font-mono leading-relaxed text-zinc-400">{bio}</p>

                    <div className="w-1/2 h-px my-6 bg-zinc-800" />

                    <div className="flex items-center justify-center gap-3">
                        {socialLinks.map((item) => (
                            <SocialButton key={item.id} item={item} setHoveredItem={setHoveredItem} hoveredItem={hoveredItem} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 w-full mt-8">
                        <ActionButton action={actionButton} />
                        
                        <a
                            href={`${process.env.NODE_ENV === 'production' ? '/mayores' : ''}/Resume.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-none font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-out active:scale-95 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800"
                        >
                            <span>Resume PDF</span>
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialButton = ({ item, setHoveredItem, hoveredItem }: { item: SocialLink, setHoveredItem: (id: string | null) => void, hoveredItem: string | null }) => (
    <div className="relative">
        <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center justify-center w-12 h-12 rounded-none transition-all duration-300 ease-out group overflow-hidden bg-zinc-900 hover:bg-zinc-800 border border-zinc-800"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label={item.label}
        >
            <div className="relative z-10 flex items-center justify-center">
                <item.icon size={20} className="transition-all duration-200 ease-out text-zinc-400 group-hover:text-white" />
            </div>
        </a>
        <Tooltip item={item} hoveredItem={hoveredItem} />
    </div>
);

const ActionButton = ({ action }: { action: ActionButtonProps }) => (
    <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 w-full rounded-none font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-out active:scale-95 group bg-white hover:bg-zinc-200 text-black"
    >
        <span>{action.text}</span>
        <Mail size={14} className="transition-transform duration-300 ease-out group-hover:scale-110" />
    </a>
);

const Tooltip = ({ item, hoveredItem }: { item: SocialLink, hoveredItem: string | null }) => (
    <div
        role="tooltip"
        className={`absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs font-medium whitespace-nowrap transition-all duration-300 ease-out pointer-events-none bg-black/80 text-white border-white/20 ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
    >
        {item.label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/80 border-b border-r border-white/20" />
    </div>
);

export default Component;
