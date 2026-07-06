import ProjectCard from "../../components/ProjectCard";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";

import { projectsData } from "../../data/projects";

export default function Projects() {
  return (
    <PageTransition className="container mx-auto max-w-6xl p-6 relative min-h-screen">
      {/* Extended Background */}
      <BackgroundEffects />

      <div className="relative z-10">
        <PageHeader
          title="My Work"
          description={
            <>
              Here&apos;s a collection of what I&apos;ve been building. From{" "}
              <span className="font-bold text-primary">
                enterprise dashboards
              </span>{" "}
              to{" "}
              <span className="font-bold text-accent">
                weird AI experiments
              </span>
              . I believe code should either be useful or fun (ideally both).
            </>
          }
          accentColor="secondary"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
