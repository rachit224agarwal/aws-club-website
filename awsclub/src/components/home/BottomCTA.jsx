import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.65, 0, 0.35, 1];

export default function BottomCTA() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } }
  };

  return (
    <section className="relative py-32 px-6 z-10 max-w-5xl mx-auto">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="p-12 md:p-16 rounded-3xl border border-white/[0.04] text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(76,29,149,0.1) 0%, rgba(184,61,10,0.08) 100%)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Ambient glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(76,29,149,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="absolute inset-0 rounded-3xl z-0" style={{ background: 'rgba(255,255,255,0.04)' }} />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Ready to Start Your Cloud Journey?</h2>
          <p className="text-text-muted text-lg mb-10 max-w-2xl mx-auto font-body">
            Join the AWS Student Builder Group today and become part of a growing community of future cloud professionals.
          </p>
          <div className="gradient-separator max-w-xs mx-auto mb-10" />
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <motion.a
              href="https://chat.whatsapp.com/JV2tA4RqWq9LPkxCJwmcEL"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden px-8 py-4 text-white font-bold rounded-xl transition-all shadow-glow-mixed group"
              style={{
                background: 'linear-gradient(135deg, #4C1D95, #B83D0A)',
                backfaceVisibility: 'hidden',
              }}
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 8px 32px rgba(76,29,149,0.35), 0 4px 20px rgba(184,61,10,0.2)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join Community
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.a>
            <motion.a
              href="/events"
              className="relative overflow-hidden px-8 py-4 text-white font-bold rounded-xl border border-white/[0.05] transition-all duration-400 group"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                backfaceVisibility: 'hidden',
              }}
              whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(76,29,149,0.15)", borderColor: "rgba(76,29,149,0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
            >
              <span className="relative z-10">Explore Events</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
