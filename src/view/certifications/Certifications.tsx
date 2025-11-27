import { SlBadge, SlLayers } from "react-icons/sl";
import { FaLinkedin } from "react-icons/fa";
import PageTransition from "../../components/PageTransition";

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
        <PageTransition className="container mx-auto max-w-6xl p-4">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <SlBadge className="text-primary" />
                        Certifications & Licenses
                    </h1>
                    <p className="text-base-content/70">
                        Professional training and certifications.
                    </p>
                </div>
                <a
                    href="https://www.linkedin.com/in/adityavahlevynugraha/details/certifications/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm gap-2"
                >
                    <FaLinkedin size={16} />
                    Verify on LinkedIn
                </a>
            </div>

            <div className="space-y-10">
                {certificationGroups.map((group, groupIndex) => (
                    <section key={groupIndex}>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-secondary">
                            <SlLayers size={20} />
                            {group.category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {group.items.map((cert, index) => (
                                <div key={index} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group">
                                    <div className="card-body p-4">
                                        <div className="flex flex-col h-full justify-between gap-3">
                                            <div>
                                                <div className="flex justify-between items-start gap-2 mb-1">
                                                    <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">{cert.name}</h3>
                                                </div>
                                                <p className="text-xs text-base-content/60 mb-2">{cert.issuer} • {cert.date}</p>

                                                {cert.skills && cert.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {cert.skills.map((skill, idx) => (
                                                            <span key={idx} className="badge badge-xs badge-ghost text-[9px] px-1.5 py-0.5 bg-base-100 border-base-content/10">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </PageTransition>
    );
}
