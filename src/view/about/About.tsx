import { SlGraduation, SlBriefcase, SlLayers, SlUser } from "react-icons/sl";
import { FaMapMarkerAlt, FaBuilding, FaLinkedin } from "react-icons/fa";
import {
    SiPython, SiGo, SiJavascript, SiTypescript,
    SiNextdotjs, SiVuedotjs, SiTailwindcss,
    SiNodedotjs, SiLaravel,
    SiPostgresql, SiDocker, SiFigma, SiGit
} from "react-icons/si";
import PageTransition from "../../components/PageTransition";
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
        title: "Wakil Ketua Himpunan",
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
            { name: "Git", icon: <SiGit /> }
        ]
    }
];

export default function About() {
    return (
        <PageTransition className="container mx-auto max-w-5xl p-4 space-y-20">
            {/* Hero / About Me Section */}
            <section className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-6">
                    <div>
                        <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <SlUser className="text-primary" />
                            About Me
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full"></div>
                    </div>

                    <div className="prose prose-lg max-w-none text-base-content/80">
                        <p>
                            I am a <span className="font-bold text-base-content">Computer Science graduate</span> from Universitas Pertamina (Cum Laude) and currently working as a <span className="font-bold text-primary">Jr. Fullstack Developer at PT Pupuk Indonesia (Persero)</span>.
                        </p>
                        <br />
                        <p>
                            My journey is driven by a passion for building impactful solutions, whether it's optimizing agricultural yields through <span className="font-semibold">Machine Learning</span> or creating intuitive dashboards for corporate operations. I thrive at the intersection of <span className="font-semibold">Data Science</span> and <span className="font-semibold">Fullstack Development</span>, constantly exploring new technologies to solve real-world problems.
                        </p>
                        <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-base-content/70">
                            “The best of you are those who have the best manners and character”
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <SlBriefcase className="text-3xl text-primary" />
                        <h2 className="text-3xl font-bold">Working Experience</h2>
                    </div>
                    <a
                        href="https://www.linkedin.com/in/adityavahlevynugraha/details/experience/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm gap-2"
                    >
                        <FaLinkedin size={16} />
                        Verify on LinkedIn
                    </a>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-[200px] top-2 bottom-0 w-px bg-base-300"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row gap-4 md:gap-0 group">
                                {/* Date Section (Left) */}
                                <div className="md:w-[200px] md:text-right md:pr-10 shrink-0 pt-1">
                                    <div className="font-mono text-sm font-bold text-primary">{exp.period}</div>
                                    <div className="text-xs opacity-60 mt-1 hidden md:block">{exp.type}</div>
                                </div>

                                {/* Dot (Center) */}
                                <div className="hidden md:block absolute left-[193px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-base-100 shadow-sm z-10 group-hover:scale-125 transition-transform duration-300"></div>

                                {/* Content Section (Right) */}
                                <div className="flex-1 md:pl-10 relative border-l-2 border-base-300 md:border-l-0 ml-2 md:ml-0 pl-6 pb-2">
                                    {/* Mobile Dot */}
                                    <div className="md:hidden absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary"></div>

                                    <div className="card bg-base-200/40 hover:bg-base-200 border border-transparent hover:border-base-300 transition-all duration-300 -mt-2">
                                        <div className="card-body p-5">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-base-content leading-tight">{exp.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1 mb-3">
                                                        <FaBuilding className="text-base-content/50 text-xs" />
                                                        <span className="font-semibold text-base-content/80">{exp.company}</span>
                                                    </div>
                                                </div>
                                                <div className="md:hidden text-xs font-mono opacity-60 bg-base-300 px-2 py-1 rounded">
                                                    {exp.type}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm opacity-60 mb-3">
                                                <FaMapMarkerAlt size={12} />
                                                <span>{exp.location}</span>
                                            </div>

                                            <ul className="list-disc list-outside ml-4 space-y-1.5 text-base-content/80 text-sm mb-4">
                                                {exp.description.map((desc, idx) => (
                                                    <li key={idx} className="pl-1 leading-relaxed">{desc}</li>
                                                ))}
                                            </ul>

                                            {exp.skills && exp.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pt-2 border-t border-base-content/5">
                                                    {exp.skills.map((skill, idx) => (
                                                        <span key={idx} className="badge badge-xs badge-outline opacity-70 py-2">
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
                </div>
            </section>

            {/* Education Timeline */}
            <section>
                <div className="flex items-center gap-3 mb-10">
                    <SlGraduation className="text-3xl text-secondary" />
                    <h2 className="text-3xl font-bold">Education</h2>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-[200px] top-2 bottom-0 w-px bg-base-300"></div>

                    <div className="space-y-12">
                        {educationData.map((edu, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row gap-4 md:gap-0 group">
                                {/* Date Section (Left) */}
                                <div className="md:w-[200px] md:text-right md:pr-10 shrink-0 pt-1">
                                    <div className="font-mono text-sm font-bold text-secondary">{edu.period}</div>
                                </div>

                                {/* Dot (Center) */}
                                <div className="hidden md:block absolute left-[193px] top-1.5 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-base-100 shadow-sm z-10 group-hover:scale-125 transition-transform duration-300"></div>

                                {/* Content Section (Right) */}
                                <div className="flex-1 md:pl-10 relative border-l-2 border-base-300 md:border-l-0 ml-2 md:ml-0 pl-6 pb-2">
                                    {/* Mobile Dot */}
                                    <div className="md:hidden absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-secondary"></div>

                                    <div className="card bg-base-200/40 hover:bg-base-200 border border-transparent hover:border-base-300 transition-all duration-300 -mt-2">
                                        <div className="card-body p-5">
                                            <h3 className="text-xl font-bold text-base-content leading-tight">{edu.school}</h3>
                                            <div className="text-lg font-semibold text-secondary/90 mb-2">{edu.degree}</div>

                                            <ul className="list-disc list-outside ml-4 space-y-1.5 text-base-content/80 text-sm leading-relaxed">
                                                {edu.details.map((detail, idx) => (
                                                    <li key={idx} className="pl-1">{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <SlLayers className="text-3xl text-primary" />
                    <h2 className="text-3xl font-bold">Technical Skills</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, index) => (
                        <div key={index} className="card bg-base-200/50 border border-base-300 shadow-sm hover:shadow-md transition-all">
                            <div className="card-body p-5">
                                <h3 className="font-bold border-b border-base-content/10 pb-3 mb-4 text-lg flex items-center justify-between">
                                    {category.category}
                                    <span className="text-xs font-normal opacity-50">{category.items.length} items</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((item, idx) => (
                                        <div key={idx} className="badge badge-lg gap-2 pl-2 pr-3 py-4 h-auto bg-base-100 border-base-200">
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
}
