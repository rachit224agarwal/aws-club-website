import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion();
  const particles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050408' }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,29,149,0.12) 0%, rgba(184,61,10,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Orbital system */}
      <div className="relative mb-10" style={{ width: '120px', height: '120px' }}>
        {/* Glowing core */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #c084fc 0%, #7c3aed 50%, transparent 100%)',
            boxShadow: '0 0 30px rgba(192,132,252,0.6), 0 0 60px rgba(124,58,237,0.3)',
          }}
        />

        {/* Orbit ring 1 */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            border: '1px solid rgba(192,132,252,0.15)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#c084fc',
              boxShadow: '0 0 12px rgba(192,132,252,0.8)',
            }}
          />
        </motion.div>

        {/* Orbit ring 2 */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '0',
            borderRadius: '50%',
            border: '1px solid rgba(184,61,10,0.15)',
            transform: 'rotateX(60deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#f97316',
              boxShadow: '0 0 12px rgba(249,115,22,0.8)',
            }}
          />
        </motion.div>

        {/* Orbit ring 3 */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '-5px',
            borderRadius: '50%',
            border: '1px solid rgba(124,58,237,0.1)',
            transform: 'rotateY(50deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#a78bfa',
              boxShadow: '0 0 10px rgba(167,139,250,0.7)',
            }}
          />
        </motion.div>

        {/* Floating particles */}
        {particles.map((i) => (
          <motion.div
            key={i}
            animate={shouldReduceMotion ? {} : {
              y: [0, -20 - i * 5, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#c084fc' : '#f97316',
              boxShadow: `0 0 6px ${i % 2 === 0 ? 'rgba(192,132,252,0.6)' : 'rgba(249,115,22,0.6)'}`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-sm font-heading font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: 'rgba(192,132,252,0.7)' }}
      >
        Loading
      </motion.p>

      {/* Progress bar */}
      <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #7c3aed, #f97316, #7c3aed)',
            backgroundSize: '200% 100%',
            animation: 'progressShimmer 2s linear infinite',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </div>
  );
}
