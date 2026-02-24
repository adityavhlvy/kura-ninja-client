import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SlHome, SlFolder, SlUser, SlBadge, SlMagnifier,
    SlArrowRight, SlSettings, SlQuestion
} from 'react-icons/sl';

interface Command {
    id: string;
    label: string;
    description?: string;
    icon: React.ReactNode;
    action: () => void;
    keywords: string[];
    category: 'navigation' | 'action' | 'easter-egg';
}

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const commands: Command[] = useMemo(() => [
        {
            id: 'home',
            label: 'Home',
            description: 'Go to homepage',
            icon: <SlHome />,
            action: () => router.push('/'),
            keywords: ['home', 'beranda', 'main', 'start'],
            category: 'navigation',
        },
        {
            id: 'projects',
            label: 'Projects',
            description: 'View quest log',
            icon: <SlFolder />,
            action: () => router.push('/projects'),
            keywords: ['projects', 'quests', 'work', 'portfolio', 'quest log'],
            category: 'navigation',
        },
        {
            id: 'about',
            label: 'About',
            description: 'Who is this person?',
            icon: <SlUser />,
            action: () => router.push('/about'),
            keywords: ['about', 'me', 'siapa', 'who', 'bio', 'journey'],
            category: 'navigation',
        },
        {
            id: 'certifications',
            label: 'Certifications',
            description: 'Achievements unlocked',
            icon: <SlBadge />,
            action: () => router.push('/certifications'),
            keywords: ['certifications', 'certs', 'badges', 'achievements'],
            category: 'navigation',
        },
        {
            id: 'playground',
            label: 'Playground',
            description: 'Experiments & side quests',
            icon: <SlSettings />,
            action: () => router.push('/playground'),
            keywords: ['playground', 'experiments', 'lab', 'side quests'],
            category: 'navigation',
        },
        {
            id: 'hire',
            label: 'sudo hire-me',
            description: 'You found a secret! 🐢',
            icon: <SlQuestion />,
            action: () => {
                alert("Permission granted! 🐢\n\nEmail: adityavhlvy1003@gmail.com\nLinkedIn: /in/adityavahlevynugraha");
            },
            keywords: ['sudo', 'hire', 'secret', 'easter', 'contact'],
            category: 'easter-egg',
        },
    ], [router]);

    const filteredCommands = useMemo(() => {
        if (!search) return commands.filter(c => c.category !== 'easter-egg');

        const query = search.toLowerCase();
        return commands.filter(cmd =>
            cmd.label.toLowerCase().includes(query) ||
            cmd.keywords.some(k => k.includes(query))
        );
    }, [search, commands]);

    const executeCommand = useCallback((command: Command) => {
        command.action();
        onClose();
        setSearch('');
    }, [onClose]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev < filteredCommands.length - 1 ? prev + 1 : 0
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev > 0 ? prev - 1 : filteredCommands.length - 1
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        executeCommand(filteredCommands[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, executeCommand, onClose]);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    // Reset when closed
    useEffect(() => {
        if (!isOpen) {
            setSearch('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
                    >
                        <div className="bg-base-200 border border-base-content/10 rounded-xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-base-content/10">
                                <SlMagnifier className="text-base-content/50" />
                                <input
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                    className="flex-1 bg-transparent outline-none text-base-content placeholder:text-base-content/40"
                                />
                                <kbd className="kbd kbd-sm opacity-50">esc</kbd>
                            </div>

                            {/* Commands List */}
                            <div className="max-h-80 overflow-y-auto p-2">
                                {filteredCommands.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-base-content/50">
                                        <p>No commands found</p>
                                        <p className="text-xs mt-1">Try &quot;sudo hire-me&quot; 😉</p>
                                    </div>
                                ) : (
                                    filteredCommands.map((cmd, index) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => executeCommand(cmd)}
                                            className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-left transition-colors duration-150
                        ${index === selectedIndex
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'hover:bg-base-300 text-base-content'
                                                }
                      `}
                                        >
                                            <span className="text-lg opacity-70">{cmd.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{cmd.label}</div>
                                                {cmd.description && (
                                                    <div className="text-xs opacity-50 truncate">{cmd.description}</div>
                                                )}
                                            </div>
                                            <SlArrowRight className={`
                        opacity-0 transition-opacity
                        ${index === selectedIndex ? 'opacity-50' : ''}
                      `} />
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer hint */}
                            <div className="px-4 py-2 border-t border-base-content/10 flex items-center gap-4 text-xs text-base-content/40">
                                <span><kbd className="kbd kbd-xs">↑</kbd> <kbd className="kbd kbd-xs">↓</kbd> navigate</span>
                                <span><kbd className="kbd kbd-xs">↵</kbd> select</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
