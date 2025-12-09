import { SlGraduation, SlBriefcase, SlLayers, SlUser, SlRocket } from "react-icons/sl";
import { FaLinkedin } from "react-icons/fa";
import {
    SiPython, SiGo, SiJavascript, SiTypescript,
    SiNextdotjs, SiVuedotjs, SiTailwindcss,
    SiNodedotjs, SiLaravel,
    SiPostgresql, SiDocker, SiFigma, SiGit
} from "react-icons/si";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import type { ReactNode } from "react";

interface Experience {
    title: string;
    company: string;
    type: string;
    period: string;
    location: string;
    description: string[];
    skills?: string[];
}

interface Education {
    school: string;
    degree: string;
    period: string;
    details: string[];
}

interface SkillCategory {
    category: string;
    items: { name: string; icon: ReactNode; color?: string }[];
}

const experiences: Experience[] = [
    {
        title: "Jr. Fullstack Developer",
        company: "PT Pupuk Indonesia (Persero)",
        type: "Contract",
        period: "Oct 2025 - Present",
        location: "Central Jakarta, Jakarta",
        description: [
            "Developed 'Land Delineation Training': Deep learning model training pipeline for delineating land from satellite imagery. Features preprocessing, BsiNet model implementation, and custom loss functions.",
            "Developed 'Geomap Dashboard Client': Comprehensive Next.js application for visualizing fertilizer distribution. Features interactive maps with Deck.gl, vector tiles, and dynamic data filtering.",
            "Developed 'Dashboard Geomap Service': High-performance backend service for the Geomap Dashboard. Handles data ingestion, geospatial queries, and serves aggregated fertilizer data."
        ]
    },
    {
        title: "Research Assistant",
        company: "Universitas Pertamina",
        type: "Internship",
        period: "Jul 2025 - Oct 2025",
        location: "Hybrid",
        description: [
            "Engineered a predictive model for Indonesian rice yield by processing satellite imagery (Sentinel-2) from Google Earth Engine and temporal data from BPS.",
            "Developed, trained, and benchmarked a suite of classical machine learning (Random Forest, XGBoost) and deep learning (LSTM, GRU) models.",
            "Achieved a top-performing model with an R2 score of 0.8337 using a tuned LightGBM (tuned with Optuna), a result that outperforms baseline models from published research."
        ],
        skills: ["Google Earth Engine", "Data Preparation", "Deep Learning", "Research Skills"]
    },
    {
        title: "Machine Learning Assistant",
        company: "Universitas Pertamina",
        type: "Internship",
        period: "Feb 2025 - Jul 2025",
        location: "On-site",
        description: [
            "Collaborated in a team of three assistants to co-develop the complete curriculum for a machine learning workshop serving a cohort of 40 participants.",
            "Delivered weekly instructional sessions, mentored students through hands-on exercises, and evaluated over approximately 50 group assignments to ensure comprehension of core ML concepts."
        ],
        skills: ["Machine Learning", "Pandas", "NumPy", "Time Management", "Teamwork"]
    },
    {
        title: "Information Technology Intern",
        company: "PT ASTRA OTOPARTS Tbk",
        type: "Internship",
        period: "Sep 2024 - Dec 2024",
        location: "North Jakarta, Jakarta",
        description: [
            "Co-Led the development and launch of three full-stack operational dashboards for the Production Planning Control (PPC) division.",
            "Digitized the company's manual raw material rejection tracking system, reducing data entry errors by an estimated 95%.",
            "Engineered applications using ASP.NET, VB.NET, and Oracle DB."
        ],
        skills: ["C#", "SQL", "Visual Basic", "Oracle Database", "ASP.NET"]
    },
    {
        title: "Vice President of Computer Science Student Association",
        company: "Himpunan Mahasiswa Ilmu Komputer",
        type: "Part-time",
        period: "Jan 2024 - Dec 2024",
        location: "Jakarta Selatan, Jakarta",
        description: [
            "Co-led a student association of over 100 members, supervising a management team of 15 students in the planning and execution of 10+ academic and social events."
        ],
        skills: ["Leadership", "Team Leadership", "Project Management", "Event Planning"]
    },
    {
        title: "Samsung Innovation Campus Participant",
        company: "Samsung Innovation Campus",
        type: "Apprenticeship",
        period: "Jan 2024 - Jul 2024",
        location: "Remote",
        description: [
            "Completed 6-month Samsung Innovation Campus Batch 5 (Machine Learning & IoT) program.",
            "Developed Python-based ML models and integrated IoT sensors with microcontrollers."
        ]
    },
    {
        title: "Algorithm and Data Structure Assistant",
        company: "Universitas Pertamina",
        type: "Internship",
        period: "Oct 2023 - Mar 2024",
        location: "South Jakarta, Jakarta",
        description: [
            "Led weekly practicum sessions for a cohort of approximately 40 students, mentoring them on core algorithms and data structures."
        ],
        skills: ["Teaching", "Communication", "Presentation Skills"]
    },
    {
        title: "Head of Media Creative Division",
        company: "Himpunan Mahasiswa Ilmu Komputer",
        type: "Part-time",
        period: "Feb 2023 - Nov 2023",
        location: "Jakarta Selatan, Jakarta",
        description: [
            "Directed a 5 person creative team in designing and delivering all visual communications for the Student Association."
        ],
        skills: ["Team Leadership", "Adobe Photoshop", "Adobe Illustrator", "Canva"]
    },
    {
        title: "Head of Technology Information Department",
        company: "SMA Negeri Plus Provinsi Riau",
        type: "Part-time",
        period: "Jul 2019 - Jul 2020",
        location: "Pekanbaru, Riau",
        description: [
            "Managed and created numerous digital projects, ensuring high-quality visuals and efficient workflows for the student council."
        ],
        skills: ["Leadership", "Adobe Photoshop", "Canva"]
    }
];

const educationData: Education[] = [
    {
        school: "Universitas Pertamina",
        degree: "Bachelor of Science in Computer Science",
        period: "Aug 2021 - Aug 2025",
        details: [
            "GPA: 3.58/4.00 (Graduated with Honours / Cum Laude)",
            "Undergraduate Thesis: Evaluation of Migrating a PHP Web Application from a Monolithic Architecture to Microservices Using a Large Language Model for Code Generation"
        ]
    },
    {
        school: "SMA Negeri Plus Provinsi Riau",
        degree: "High School Diploma, Science Major",
        period: "2018 - 2021",
        details: [
            "Focused on Science and Technology",
            "Active in Student Council (Head of Technology Information Department)"
        ]
    }
];

const skillsData: SkillCategory[] = [
    {
        category: "Languages",
        items: [
            { name: "Python", icon: <SiPython /> },
            { name: "Go", icon: <SiGo /> },
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "TypeScript", icon: <SiTypescript /> }
        ]
    },
    {
        category: "Frontend",
        items: [
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "Vue.js", icon: <SiVuedotjs /> },
            { name: "Tailwind", icon: <SiTailwindcss /> }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Go Fiber", icon: <SiGo /> },
            { name: "Laravel", icon: <SiLaravel /> },
            { name: "Node.js", icon: <SiNodedotjs /> }
        ]
    },
    {
        category: "Data",
        items: [
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "PostGIS", icon: <SiPostgresql /> }
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Docker", icon: <SiDocker /> },
            { name: "Figma", icon: <SiFigma /> },
            { name: "Git", icon: <SiGit /> },
            { name: "Antigravity", icon: <SlRocket /> }
        ]
    }
];

export default function About() {
    return (
        <PageTransition className="container mx-auto max-w-5xl p-4 space-y-20 relative">

            {/* Global Background Effects */}
            <BackgroundEffects />

            {/* Hero / About Me Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
            >
                <PageHeader
                    title="Who am I?"
                    description={
                        <div className="space-y-4">
                            <p>
                                Hey there! I'm <span className="font-bold text-primary">Aditya</span>.
                                I'm a Computer Science grad from Universitas Pertamina (yes, the one with Cum Laude, but who's counting?) and currently a <span className="font-bold text-primary">Fullstack Developer at PT Pupuk Indonesia (Persero)</span>.
                            </p>
                            <p>
                                Honestly? I just love building stuff. Whether it's training a model to count rice fields from space (literally) or piecing together a dashboard that actually makes sense, I get a kick out of solving puzzles.
                                I sit right in that weird, fun middle ground between <span className="font-semibold text-secondary">Data Science</span> and <span className="font-semibold text-accent">Fullstack Dev</span>.
                            </p>
                            <p>
                                When I'm not coding, I'm probably listening to music that's too loud or thinking about my next side project.
                            </p>

                            <div className="alert bg-base-200/50 border-l-4 border-primary rounded-r-lg mt-6 text-sm not-italic flex items-center gap-4 hover:bg-base-200 transition-colors">
                                <SlUser className="text-2xl text-primary opacity-50 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-primary font-mono mb-0">"The best of you are those who have the best manners and character"</h3>
                                    <div className="text-xs opacity-50">A reminder I try to live by.</div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </motion.section>

            {/* Skills Section (Moved Up) */}
            <section className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-10"
                >
                    <SlLayers className="text-3xl text-primary" />
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, index) => (
                        <SpotlightCard
                            key={index}
                            title={category.category}
                            badge={`${category.items.length} items`}
                            delay={index * 0.1}
                            className="h-full"
                        >
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="badge badge-lg gap-2 pl-2 pr-3 py-4 h-auto bg-base-100/50 border-base-content/10">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </section>

            {/* Experience Timeline */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <SlBriefcase className="text-3xl text-secondary" />
                        <h2 className="text-4xl font-bold relative inline-block">
                            Journey So Far
                            <span className="absolute -bottom-2 left-0 w-1/2 h-2 bg-secondary/50 rounded-full"></span>
                        </h2>
                    </div>
                    <a
                        href="https://www.linkedin.com/in/adityavahlevynugraha/details/experience/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-outline btn-sm gap-2 rounded-full hover:scale-105 transition-transform"
                    >
                        <FaLinkedin size={16} />
                        LinkedIn
                    </a>
                </div>

                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {experiences.map((exp, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className={index % 2 === 0 ? "timeline-start md:text-end mb-10" : "timeline-end mb-10"}>
                                <div className="font-mono text-sm italic opacity-60 mb-1">{exp.period}</div>
                                <div className="text-lg font-black text-primary">{exp.company}</div>
                                <div className="text-base font-bold mb-2">{exp.title}</div>
                                <div className="text-xs font-mono opacity-50 mb-3 bg-base-200 inline-block px-2 py-1 rounded">{exp.type} • {exp.location}</div>
                                <div className="text-sm opacity-80 leading-relaxed max-w-md">
                                    <ul className="list-disc list-outside ml-4 text-left">
                                        {exp.description.map((desc, idx) => (
                                            <li key={idx} className="mb-1">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                                {exp.skills && (
                                    <div className="flex flex-wrap gap-2 mt-3 justify-start md:justify-end">
                                        {exp.skills.map((skill, idx) => (
                                            <span key={idx} className="badge badge-xs badge-ghost opacity-60">{skill}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <hr className="bg-primary/20" />
                        </motion.li>
                    ))}
                </ul>
            </motion.section>

            {/* Education Timeline */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <div className="flex items-center gap-3 mb-10">
                    <SlGraduation className="text-3xl text-accent" />
                    <h2 className="text-4xl font-bold relative inline-block">
                        Education
                        <span className="absolute -bottom-2 left-0 w-1/2 h-2 bg-accent/50 rounded-full"></span>
                    </h2>
                </div>

                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {educationData.map((edu, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-secondary">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className={index % 2 === 0 ? "timeline-start md:text-end mb-10" : "timeline-end mb-10"}>
                                <div className="font-mono text-sm italic opacity-60 mb-1">{edu.period}</div>
                                <div className="text-lg font-black text-secondary">{edu.school}</div>
                                <div className="text-base font-bold mb-2">{edu.degree}</div>
                                <ul className="list-disc list-outside ml-4 text-left text-sm opacity-80">
                                    {edu.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                            <hr className="bg-secondary/20" />
                        </motion.li>
                    ))}
                </ul>
            </motion.section>
        </PageTransition>
    );
}
