import { Link } from "react-router-dom";
import { SlRocket, SlEnvolope } from "react-icons/sl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import { projectsData } from "../../data/projects";
import { Button } from "@/components/ui/button";
import profileJson from "../../data/profile.json";

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-[90vh] pt-20 pb-16 w-full overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 w-full max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-2 lg:order-1 lg:col-span-7 z-20"
          >
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-primary/70 mb-4"
            >
              {profileJson.bio.current_role_detail}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.9] mb-6"
            >
              <span className="block text-foreground">Aditya</span>
              <span className="block text-primary">Vahlevy Nugraha</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 text-pretty"
            >
              {profileJson.tagline}{" "}
              <span className="italic text-primary font-mono text-[0.9em] font-semibold">
                {profileJson.tagline_highlight}
              </span>{" "}
              {profileJson.tagline_suffix}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/projects"
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                View Projects
              </Link>
              <Link
                to="/about"
                className="px-5 py-2.5 border border-border rounded-sm text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                About Me
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-[24rem] overflow-hidden"
                style={{
                  clipPath: "polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)",
                }}
              >
                <img
                  src="/assets/profile.png"
                  alt="Aditya Vahlevy Nugraha"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto max-w-6xl px-6 lg:px-8 mb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-[1px] w-8 bg-primary/30" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Selected Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black tracking-[-0.03em]"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-3 text-lg max-w-lg leading-relaxed"
            >
              Geospatial platforms, AI agent systems, and fullstack tools I have
              designed and shipped.
            </motion.p>
          </div>
          <Button
            variant="ghost"
            asChild
            className="gap-2 group hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
          >
            <Link to="/projects">
              View All{" "}
              <SlRocket
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </Button>
        </div>

        {featuredProjects.length > 0 && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <FeaturedHeroCard project={featuredProjects[0]} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.slice(1).map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto max-w-6xl px-6 lg:px-8 pb-24">
        <div className="bg-card/30 border border-border rounded-sm p-8 md:p-12 text-center space-y-6 backdrop-blur-sm">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-tight">
              Let&apos;s build something.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
              Open to full-time roles and freelance work across geospatial
              systems, AI orchestration, and fullstack engineering.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                <SlEnvolope className="text-sm" />
                <span>Get in touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

/* Full-width variant for the lead project */
function FeaturedHeroCard({ project }: { project: (typeof projectsData)[0] }) {
  const displayImage =
    project.image ||
    (project.images && project.images.length > 0
      ? project.images[0]
      : undefined);

  return (
    <Link to={`/projects/${project.slug}`} className="block group">
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/40 rounded-sm overflow-hidden transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {displayImage && (
            <div className="h-64 lg:h-80 overflow-hidden relative">
              <img
                src={displayImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent lg:hidden" />
            </div>
          )}

          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/60">
                {project.date}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                {project.status}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono uppercase px-2 py-0.5 bg-muted/50 border border-border/50 text-muted-foreground group-hover:text-primary/70 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 6 && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  +{project.techStack.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}