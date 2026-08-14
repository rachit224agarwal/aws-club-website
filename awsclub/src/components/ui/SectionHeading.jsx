import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({ children, centered = false }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`mb-12 relative flex ${centered ? 'justify-center text-center' : 'justify-start text-left'}`}>
      <div className="relative inline-block pb-4">
        <h2 className="text-3xl md:text-4xl font-bold font-heading">
          {children}
        </h2>

        {/* Premium gradient underline */}
        <motion.div
          className="absolute bottom-0 h-[3px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, #4C1D95, #B83D0A)',
            width: 80,
            ...(centered ? { left: '50%', transformOrigin: 'center', marginLeft: -40 } : { left: 0, transformOrigin: 'left' }),
          }}
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={shouldReduceMotion ? {} : { scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </div>
  );
}
