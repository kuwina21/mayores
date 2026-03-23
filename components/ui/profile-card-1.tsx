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
            href: `mailto:${email}`,
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
                className="relative flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 ease-out backdrop-blur-xl bg-card/10 border-white/20 overflow-hidden min-h-[380px]"
                style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* Normal Profile details */}
                <div className={`flex flex-col items-center w-full transition-all duration-300 ${isChatOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <div className="w-24 h-24 mb-4 rounded-full p-1 border-2 border-white/30 truncate relative overflow-hidden">
                        <Image
                            src={avatarUrl}
                            alt={`${name}'s Avatar`}
                            fill
                            className="rounded-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://placehold.co/96x96/6366f1/white?text=${name.charAt(0)}`;
                            }}
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-tight">{name}</h2>
                    {title && <p className="mt-1 text-sm font-medium text-blue-400">{title}</p>}
                    <p className="mt-4 text-center text-sm leading-relaxed text-zinc-300">{bio}</p>

                    <div className="w-1/2 h-px my-6 rounded-full bg-white/20" />

                    <div className="flex items-center justify-center gap-3">
                        {socialLinks.map((item) => (
                            <SocialButton key={item.id} item={item} setHoveredItem={setHoveredItem} hoveredItem={hoveredItem} />
                        ))}
                    </div>

                    <ActionButton action={actionButton} onClick={() => setIsChatOpen(true)} />
                </div>

                {/* Interactive Chat Overlay */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-8 flex flex-col justify-between items-center bg-zinc-950/40"
                        >
                            <div className="w-full flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white">Send Message</h3>
                                <button onClick={() => { setIsChatOpen(false); setMessage(''); }} className="text-zinc-400 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <textarea
                                className="flex-1 w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none placeholder-zinc-500 mb-6 font-sans"
                                placeholder="Type your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isSending || isSent}
                            />

                            <button
                                onClick={handleSend}
                                disabled={!message.trim() || isSending || isSent}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : isSent ? (
                                    <>
                                        <Check size={18} />
                                        <span>Opened Mail!</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Send via Mail</span>
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ease-out blur-3xl opacity-40 bg-gradient-to-r from-blue-600/50 to-purple-600/50" />
        </div>
    );
};

const SocialButton = ({ item, setHoveredItem, hoveredItem }: { item: SocialLink, setHoveredItem: (id: string | null) => void, hoveredItem: string | null }) => (
    <div className="relative">
        <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group overflow-hidden bg-white/10 hover:bg-white/20 border border-white/10"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label={item.label}
        >
            <div className="relative z-10 flex items-center justify-center">
                <item.icon size={20} className="transition-all duration-200 ease-out text-white/70 group-hover:text-white" />
            </div>
        </a>
        <Tooltip item={item} hoveredItem={hoveredItem} />
    </div>
);

const ActionButton = ({ action, onClick }: { action: ActionButtonProps, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-6 py-3 mt-8 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 group bg-blue-600 text-white"
        style={{ boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)' }}
    >
        <span>{action.text}</span>
        <Mail size={16} className="transition-transform duration-300 ease-out group-hover:scale-110" />
    </button>
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
