import { SlBadge, SlLayers } from "react-icons/sl";
import { FaLinkedin } from "react-icons/fa";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";

import certificationsJson from "../../data/certifications.json";

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

const certificationGroups: CertificationGroup[] = certificationsJson.certifications as CertificationGroup[];

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
                    <div className="p-5">
                      <div className="flex flex-col h-full justify-between gap-3">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                              {cert.name}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 font-mono">
                            {cert.issuer} • {cert.date}
                          </p>

                          {cert.skills && cert.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {cert.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] px-1.5 py-0.5 rounded-sm bg-muted border border-border/50 text-muted-foreground"
                                >
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
