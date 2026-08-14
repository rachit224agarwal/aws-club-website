import React from "react";
import { motion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "../components/projects/ProjectCard";
import SpotlightBackground from "../components/layout/SpotlightBackground";
import PageHero from "../components/ui/PageHero";
import GlassPanel from "../components/ui/GlassPanel";
import { fadeUp, ease } from "../utils/animations";

export default function Projects() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 }
    }
  };

  const floatDelays = [0, 0.2, 0.5, 0.1, 0.6, 0.3];

  return (
    <main className="page-wrapper relative overflow-hidden bg-transparent">
      <SpotlightBackground />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Page Hero - Built purely using existing content */}
        <PageHero
          badge="Community Projects"
          title="AWS Club Projects"
          subtitle="Real-world applications built by our members exploring cloud, DevOps, and AI."
        />

        {projects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* ═══ "Igniting Soon" Sleek Empty State using GlassPanel and exact texture theme ═══ */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="max-w-4xl mx-auto"
          >
            <GlassPanel
              hoverable={true}
              glowColor="rgba(109, 40, 217, 0.08)"
              glowPosition="center"
              className="p-8 md:p-12 text-center"
            >
              <div className="relative z-10 text-center flex flex-col items-center">
                {/* Sleek Emblem */}
                <div className="relative mb-6 w-16 h-16 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border border-white/[0.08] shadow-lg relative z-10 bg-white/[0.02]"
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white/70 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.433 4.433 0 002.771-2.771 4.493 4.493 0 004.305-1.757" />
                    </svg>
                  </motion.div>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold mb-3 font-heading text-white/90 tracking-wide">
                  Coming Soon
                </h3>

                <p className="text-white/60 text-sm md:text-base mt-2 mb-8 leading-relaxed max-w-2xl mx-auto font-body">
                  We are architecting real-world AWS projects focused on cloud infrastructure, DevOps pipelines, and generative AI. Stay tuned for open-source case studies built by our community.
                </p>

                {/* Gentle Floating Tech Badges (Original Data Preserved) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                  className="flex flex-row justify-center items-center gap-2 md:gap-4 relative z-10 w-full overflow-hidden"
                >
                  {[
                    { name: 'AWS', isAws: true },
                    { name: 'DevOps', isDevOps: true },
                    { name: 'Python', icon: 'python' },
                    { name: 'React', icon: 'react' },
                    { name: 'Docker', icon: 'docker' },
                    { name: 'Kubernetes', icon: 'kubernetes' }
                  ].map((tech, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      animate={{ y: [-3, 3, -3] }}
                      transition={{
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: floatDelays[idx] }
                      }}
                    >
                      <div className="flex items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 border border-white/[0.05] rounded-xl text-[9px] md:text-[11px] uppercase tracking-wider font-medium text-white/80 bg-white/[0.02] hover:bg-white/[0.1] hover:border-white/20 transition-colors duration-300 cursor-default whitespace-nowrap">
                        {tech.isAws ? (
                          <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
                            alt="AWS"
                            loading="lazy"
                            className="h-3 md:h-4 opacity-90 object-contain"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        ) : tech.isDevOps ? (
                          <InfinityIcon className="w-3 h-3 md:w-4 md:h-4 opacity-80" />
                        ) : (
                          <img src={`https://cdn.simpleicons.org/${tech.icon}/white`} alt={tech.name} loading="lazy" className="w-3 h-3 md:w-4 md:h-4 opacity-80" />
                        )}
                        <span>{tech.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </div>
    </main>
  );
}