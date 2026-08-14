import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteMeta } from "../../data/siteMeta";
import { ease } from "../../utils/animations";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto pt-8 pb-20 z-10 min-h-screen"
    >

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Badge — zero-gravity float */}
        <div className="overflow-hidden mb-6 rounded-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="pro-badge gpu-accelerated"
          >
            AWS Student Builder Group
          </motion.div>
        </div>

        {/* Staggered word reveal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading relative z-10 flex flex-col items-center">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
            }}
            className="flex flex-wrap justify-center gap-x-3 pb-2"
          >
            {["From", "Beginner", "to", "Cloud", "Engineer"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: 60, scale: 0.9 },
                  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
                }}
                style={{ transformPerspective: 1000 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
            className="text-gradient-primary flex flex-wrap justify-center gap-x-3 pb-2 mt-2"
          >
            - Start Here.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-4 text-lg md:text-xl max-w-2xl text-text-muted font-body relative z-10"
        >
          {siteMeta.heroSubtext}
        </motion.p>

        {/* CTA Buttons —  hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease }}
          className="mt-10 flex gap-4 flex-wrap justify-center relative z-10"
        >
          <motion.a
            href="https://chat.whatsapp.com/JV2tA4RqWq9LPkxCJwmcEL"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4, boxShadow: "0 12px 40px rgba(76,29,149,0.5), 0 8px 24px rgba(184,61,10,0.3)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden text-white px-8 py-4 rounded-xl font-bold shadow-glow-mixed gpu-accelerated"
            style={{ background: 'linear-gradient(135deg, #4C1D95, #B83D0A)' }}
          >
            {/* Animated border shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              Join Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </motion.a>

          <motion.div
            whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(76,29,149,0.15)", borderColor: "rgba(76,29,149,0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="relative overflow-hidden text-white bg-white/5 font-bold backdrop-blur-sm rounded-xl border border-white/8 gpu-accelerated"
          >
            <Link
              to="/events"
              className="flex px-8 py-4 relative z-10"
            >
              Explore Events
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
