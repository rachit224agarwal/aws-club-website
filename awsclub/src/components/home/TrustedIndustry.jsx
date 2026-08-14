import React from "react";
import { motion } from "framer-motion";

const ease = [0.65, 0, 0.35, 1];

export default function TrustedIndustry() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } }
  };

  const companies = ["NETFLIX", "Airbnb", "DISNEY+", "NASA", "SAMSUNG", "BMW", "Adobe", "Coinbase", "Formula 1", "Pfizer"];

  return (
    <section className="relative py-24 px-6 z-10 max-w-7xl mx-auto text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <h2 className="text-2xl font-semibold mb-2 text-white font-heading">The World's Leading Companies Build on AWS</h2>
        <p className="text-text-subtle mb-12 text-sm uppercase tracking-widest font-bold">One Platform. Millions of Opportunities.</p>
        <div className="gradient-separator max-w-xs mx-auto mb-12" />
        <div className="relative flex overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div
            className="flex whitespace-nowrap gap-x-12 md:gap-x-16 opacity-50 grayscale font-bold text-2xl md:text-3xl tracking-tighter py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...companies, ...companies, ...companies].map((logo, i) => (
              <motion.div
                key={i}
                className="relative hover:opacity-100 transition-all duration-400 select-none font-heading group cursor-default shrink-0"
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  color: '#fff',
                  textShadow: '0 10px 25px rgba(234,88,12,0.4), 0 0 20px rgba(76,29,149,0.3)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {logo}
                <div className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #EA580C, transparent)' }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
