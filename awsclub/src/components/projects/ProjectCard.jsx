import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import LazyImage from "../common/LazyImage";
import { antigravitySpring } from "../../utils/animations";

export default function ProjectCard({ title, description, techStack, link, image }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
        hover: {
          y: -8,
          scale: 1.02,
          rotateX: 4,
          rotateY: -4,
          boxShadow: `0 24px 64px -12px rgba(0,0,0,0.8), 0 0 50px -10px rgba(76,29,149,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
          borderColor: "rgba(109, 40, 217, 0.4)"
        }
      }}
      transition={antigravitySpring}
      className="group relative flex flex-col h-full rounded-3xl border border-white/[0.04] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.6) 0%, rgba(11, 6, 21, 0.8) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        perspective: "1000px"
      }}
    >
      {/* Subtle top glare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Soft Ambient Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at top right, rgba(109,40,217,0.1), transparent 70%)' }} />

      {image && (
        <div className="w-full h-48 overflow-hidden relative border-b border-white/[0.04]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(11,6,21,1)] z-10 opacity-60" />
          <LazyImage
            src={image}
            alt={title}
            className="w-full h-full"
            imgClassName="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          />
        </div>
      )}

      <div className="p-6 flex-grow flex flex-col z-10 relative">
        <h3 className="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-text-muted mb-6 text-sm font-body leading-relaxed flex-grow">{description}</p>

        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech, index) => (
              <span key={index} className="px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide uppercase border border-white/[0.05] text-white/60 bg-white/[0.02] group-hover:border-white/10 group-hover:text-white/80 transition-colors duration-300">
                {tech}
              </span>
            ))}
          </div>
        )}

        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors duration-300 text-sm font-semibold w-fit min-h-[44px] py-2 pr-4 group/link">
            <span>View Project</span>
            <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
