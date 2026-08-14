import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteMeta } from "../../data/siteMeta";
import SectionHeading from "../ui/SectionHeading";
import { antigravitySpring } from "../../utils/animations";
import { Shield } from "lucide-react";
import LazyImage from "../common/LazyImage";
import clubLogo from "../../assets/webp/logos/ClubLogoP.webp";

const ease = [0.65, 0, 0.35, 1];

export default function VisionObjective() {
  const shouldReduceMotion = useReducedMotion();
  const missionItems = siteMeta.objective.split(", ");

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 z-10">
      {/* Large Logo Block */}
      <motion.div
        initial={{ opacity: 0, x: -30, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease }}
        className="flex-1 flex justify-center items-center w-full relative"
        style={{ perspective: 1000 }}
      >
        {/* Ambient pulsing glow behind logo */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={shouldReduceMotion ? {} : { opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle, rgba(234,88,12,0.4) 0%, rgba(76,29,149,0.3) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={shouldReduceMotion ? {} : {
            scale: 1.05,
            rotateX: 4,
            rotateY: -4,
            boxShadow: '0 30px 60px -12px rgba(234,88,12,0.3), 0 0 40px rgba(76,29,149,0.2)'
          }}
          className="relative z-10 rounded-3xl overflow-hidden border border-white/10 group"
          style={{ transformStyle: "preserve-3d", boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)' }}
        >
          <LazyImage
            src={clubLogo}
            alt="AWS Club Logo"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            imgClassName="object-cover"
          />
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Content block: Vision & Mission */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="flex-1 w-full space-y-16"
      >
        {/* Vision Section */}
        <div>
          <SectionHeading>Our Vision</SectionHeading>
          <motion.div
            className="p-8 md:p-10 rounded-3xl border border-white/5 relative group overflow-hidden cursor-default"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.7) 0%, rgba(11, 6, 21, 0.9) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            whileHover={shouldReduceMotion ? {} : {
              y: -5,
              scale: 1.02,
              boxShadow: `0 24px 64px -12px rgba(0,0,0,0.7), 0 0 60px -10px rgba(76,29,149,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
              borderColor: "rgba(109, 40, 217, 0.4)"
            }}
            transition={antigravitySpring}
          >
            {/* Dynamic background glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'radial-gradient(circle at right bottom, rgba(234,88,12,0.1), transparent 60%)' }} />

            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-700 pointer-events-none transform">
              <Shield size={160} />
            </div>

            <div className="relative z-10 flex gap-6 items-start">
              <div className="hidden sm:block mt-2 w-1.5 h-full min-h-[4rem] rounded-full bg-gradient-to-b from-primary to-accent opacity-70 group-hover:opacity-100 transition-opacity duration-500 shrink-0" />
              <p className="text-white/70 group-hover:text-white transition-colors duration-300 leading-relaxed text-lg md:text-xl font-body italic">
                "{siteMeta.vision}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div>
          <SectionHeading>Our Mission</SectionHeading>
          <ul className="space-y-4">
            {missionItems.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 10, backgroundColor: 'rgba(20, 10, 35, 0.8)' }}
                transition={{ duration: 0.4, delay: i * 0.1, ease }}
                className="flex items-center gap-5 text-white/70 font-medium p-4 md:p-5 rounded-2xl border border-white/5 relative group cursor-default overflow-hidden"
                style={{
                  background: 'rgba(11, 6, 21, 0.6)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                }}
              >
                {/* Highlight left bar that expands on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent opacity-50 group-hover:opacity-100 group-hover:w-2 transition-all duration-300" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative flex items-center justify-center shrink-0 ml-2">
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" style={{ background: '#EA580C' }} />
                  <div className="w-3 h-3 rounded-full relative z-10 transition-transform duration-300 group-hover:scale-150" style={{ background: 'linear-gradient(135deg, #4C1D95, #EA580C)' }} />
                </div>
                <span className="relative z-10 text-base md:text-lg group-hover:text-white transition-colors duration-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
