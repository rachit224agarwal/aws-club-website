import React, { useRef } from "react";
import { motion } from "framer-motion";
import EventCard from "../events/EventCard";
import { fadeUp } from "../../utils/animations";

export default function Timeline({ events, onSelectEvent }) {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 }
    }
  };

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Timeline line — Glowing Laser */}
      <div className="absolute top-1/2 left-0 right-0 hidden lg:block -translate-y-1/2 z-0">
        <div
          className="w-full h-[3px] rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(76,29,149,0.3) 30%, rgba(184,61,10,0.3) 70%, transparent 95%)',
            boxShadow: '0 0 15px rgba(184,61,10,0.1)',
          }}
        >
          {/* Sweeping Laser Effect */}
          <motion.div 
            className="absolute top-0 bottom-0 w-1/3 blur-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(184,61,10,0.8), rgba(76,29,149,0.8), transparent)' }}
            animate={{ left: ['-50%', '150%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >
        {events.map((event, idx) => (
          <motion.div key={event.id} variants={fadeUp} className="h-full relative">
            {/* Timeline node — 12px→14px expansion with Bezier color interpolation */}
            <div className="hidden lg:flex absolute -top-6 left-1/2 -translate-x-1/2 flex-col items-center">
              {/* Ambient pulse animation behind the node */}
              <motion.div
                className="absolute inset-[-10px] rounded-full pointer-events-none"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.2), transparent 60%)' }}
              />
              
              <motion.div
                className="w-3 h-3 rounded-full border-2 border-purple-primary relative z-10"
                style={{ background: 'linear-gradient(135deg, #4C1D95, #B83D0A)' }}
                whileHover={{
                  scale: 1.4,
                  width: '16px',
                  height: '16px',
                  borderColor: "#B83D0A",
                  boxShadow: "0 0 25px rgba(184,61,10,0.6), 0 0 50px rgba(76,29,149,0.5)"
                }}
                transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
              />
              <div className="w-[1px] h-3 bg-white/10 mt-1" />
            </div>
            <EventCard {...event} id={event.id} priority={idx === 0} onSelect={onSelectEvent} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
