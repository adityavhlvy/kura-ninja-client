import { SlBadge, SlLayers } from "react-icons/sl";
import { FaLinkedin } from "react-icons/fa";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";

interface Certification {
    name: string;
    issuer: string;
    date: string;
    type: "Professional" | "Technical" | "Foundation";
    skills?: string[];
}

interface CertificationGroup {
    category: string;
    items: Certification[];
}

const certificationGroups: CertificationGroup[] = [
    {
        category: "Project Management",
        items: [
            {
                name: "Agile Project Management",
                issuer: "Google",
                date: "Oct 2025",
                type: "Professional"
            },
            {
                name: "Capstone: Applying Project Management in the Real World",
                issuer: "Google",
                date: "Oct 2025",
                type: "Professional"
            },
            {
                name: "Google Project Management",
                issuer: "Google",
                date: "Oct 2025",
                type: "Professional"
            },
            {
                name: "Project Execution: Running the Project",
                issuer: "Google",
                date: "Sep 2025",
                type: "Professional",
                skills: ["Project Management", "Team Management", "Project Closure"]
            },
            {
                name: "Project Initiation: Starting a Successful Project",
                issuer: "Google",
                date: "Sep 2025",
                type: "Professional",
                skills: ["Project Management Life Cycle", "Project Management", "Strategic Thinking"]
            },
            {
                name: "Project Planning: Putting It All Together",
                issuer: "Google",
                date: "Sep 2025",
                type: "Professional",
                skills: ["Project Planning", "Project Management", "Strategic Thinking"]
            },
            {
                name: "Intermediate Project Management (Fresh Graduate Academy)",
                issuer: "Digital Talent Scholarship",
                date: "Sep 2025",
                type: "Professional"
            },
            {
                name: "Foundations of Project Management",
                issuer: "Google",
                date: "Aug 2025",
                type: "Professional",
                skills: ["Project Management", "Project Planning", "Change Management", "Agile Project Management", "Waterfall Project Management"]
            },
            {
                name: "Fundamental Project Management (Fresh Graduate Academy)",
                issuer: "Digital Talent Scholarship",
                date: "Aug 2025",
                type: "Professional",
                skills: ["Project Management", "Agile & Waterfall Methodologies", "Scrum"]
            },
            {
                name: "Introduction to ITIL® V4",
                issuer: "Simplilearn",
                date: "Aug 2025",
                type: "Professional",
                skills: ["ITIL"]
            }
        ]
    },
    {
        category: "Artificial Intelligence",
        items: [
            {
                name: "Deploy Multi-Agent Architectures",
                issuer: "Google",
                date: "May 2026",
                type: "Technical"
            },
            {
                name: "Engineer AI Agents with Agent Development Kit (ADK)",
                issuer: "Google",
                date: "Apr 2026",
                type: "Technical"
            },
            {
                name: "Discover the Art of Prompting",
                issuer: "Google",
                date: "Sep 2025",
                type: "Technical",
                skills: ["Prompt Engineering", "Technical Writing"]
            },
            {
                name: "Google AI Essentials",
                issuer: "Google",
                date: "Sep 2025",
                type: "Technical"
            },
            {
                name: "Introduction to AI",
                issuer: "Google",
                date: "Sep 2025",
                type: "Technical"
            },
            {
                name: "Maximize Productivity With AI Tools",
                issuer: "Google",
                date: "Sep 2025",
                type: "Technical"
            },
            {
                name: "Stay Ahead of the AI Curve",
                issuer: "Google",
                date: "Sep 2025",
                type: "Technical"
            },
            {
                name: "Use AI Responsibly",
                issuer: "Google",
                date: "Sep 2025",
                type: "Technical"
            },
            {
                name: "Dasar-Dasar Implementasi Kecerdasan Artifisial (Micro Skill)",
                issuer: "Digital Talent Scholarship",
                date: "Aug 2025",
                type: "Technical"
            }
        ]
    },
    {
        category: "Software & IoT",
        items: [
            {
                name: "Algorithm & Data Structures with Python",
                issuer: "Skilvul",
                date: "Mar 2024",
                type: "Technical",
                skills: ["Object-Oriented Programming (OOP)", "Data Structures", "Algorithms"]
            },
            {
                name: "Internet of Things (IoT) - Software and Platforms (Gold)",
                issuer: "Skilvul",
                date: "Aug 2024",
                type: "Technical",
                skills: ["Internet of Things (IoT)", "MongoDB", "Databases", "Flask", "PyMongo"]
            },
            {
                name: "IoT Development with ESP32 (Gold)",
                issuer: "Skilvul",
                date: "Jul 2024",
                type: "Technical",
                skills: ["ESP32 Microcontrollers", "Internet of Things (IoT)"]
            },
            {
                name: "Internet of Things (IoT) - Fundamentals (Gold)",
                issuer: "Skilvul",
                date: "Apr 2024",
                type: "Technical"
            },
            {
                name: "Python Dasar",
                issuer: "Skilvul",
                date: "Mar 2024",
                type: "Technical",
                skills: ["Python (Programming Language)"]
            },
            {
                name: "Python Lanjutan",
                issuer: "Skilvul",
                date: "Mar 2024",
                type: "Technical",
                skills: ["Pandas (Software)", "Flask"]
            }
        ]
    },
    {
        category: "Cloud & Security",
        items: [
            {
                name: "Introduction To Cloud Computing (Micro Skill)",
                issuer: "Digital Talent Scholarship",
                date: "Sep 2025",
                type: "Foundation"
            },
            {
                name: "Membangun Lab Virtual & Dasar Linux (Micro Skill)",
                issuer: "Digital Talent Scholarship",
                date: "Sep 2025",
                type: "Foundation"
            },
            {
                name: "Pentingnya Menjaga Keamanan Digital: Perlindungan Diri di Dunia Maya (Micro Skill)",
                issuer: "Digital Talent Scholarship",
                date: "Aug 2025",
                type: "Foundation"
            }
        ]
    }
];

export default function Certifications() {
    return (
        <PageTransition className="container mx-auto max-w-6xl p-6 relative min-h-screen">

            {/* Global Background Effects */}
            <BackgroundEffects />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <PageHeader
                        title={
                            <span className="flex items-center gap-3">
                                <SlBadge className="text-primary" />
                                <span className="text-primary-content">Certifications</span>
                            </span>
                        }
                        description="Professional training and certifications."
                        accentColor="primary"
                    >
                        <a
                            href="https://www.linkedin.com/in/adityavahlevynugraha/details/certifications/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm text-xs font-bold hover:bg-primary/90 transition-colors"
                        >
                            <FaLinkedin size={16} />
                            Verify on LinkedIn
                        </a>
                    </PageHeader>
                </motion.div>

                <div className="space-y-12">
                    {certificationGroups.map((group, groupIndex) => (
                        <motion.section
                            key={groupIndex}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-secondary/80">
                                <SlLayers size={20} />
                                {group.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {group.items.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group h-full rounded-sm"
                                    >
                                        <div className="card-body p-5">
                                            <div className="flex flex-col h-full justify-between gap-3">
                                                <div>
                                                    <div className="flex justify-between items-start gap-2 mb-2">
                                                        <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">{cert.name}</h3>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mb-3 font-mono">{cert.issuer} • {cert.date}</p>

                                                    {cert.skills && cert.skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {cert.skills.map((skill, idx) => (
                                                                <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-sm bg-muted border border-border/50 text-muted-foreground">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
