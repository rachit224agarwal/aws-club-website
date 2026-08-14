import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const ease = [0.65, 0, 0.35, 1];
const steps = ["Learn", "Build", "Certify", "Compete", "Lead", "Career Ready"];

export default function LearningJourney() {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } }
  };

  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
          <SectionHeading centered>The Learning Journey</SectionHeading>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative"
        >
          {/* Gradient connecting line — 3px with glow */}
          <div className="hidden md:block absolute top-1/2 left-[8%] right-[8%] -translate-y-1/2 z-0">
            <div
              className="w-full h-[3px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #4C1D95 20%, #B83D0A 80%, transparent 100%)',
                boxShadow: '0 0 12px rgba(76,29,149,0.12)',
              }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative z-10 flex flex-col items-center px-4 group cursor-default">
              <div className="relative mb-6">
                {/* Ambient pulse animation behind the node */}
                <motion.div
                  className="absolute inset-[-10px] rounded-full pointer-events-none"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.2), transparent 60%)' }}
                />

                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-accent font-bold relative z-10 border border-white/10 overflow-hidden"
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 10px 40px rgba(76, 29, 149, 0.4), 0 0 25px rgba(234,88,12,0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.9) 0%, rgba(11, 6, 21, 1) 100%)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Dynamic background glow on hover inside node */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(circle at center, rgba(234,88,12,0.2), transparent)' }} />
                  <span className="relative z-10 text-lg group-hover:text-white transition-colors duration-300">{i + 1}</span>
                </motion.div>
              </div>
              <h4 className="font-semibold text-lg md:text-xl text-white/80 group-hover:text-white transition-colors duration-300">{step}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
