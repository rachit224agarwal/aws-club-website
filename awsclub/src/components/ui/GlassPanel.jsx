import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { antigravitySpring } from "../../utils/animations";

export default function GlassPanel({ 
  children, 
  className = "", 
  hoverable = true,
  glowColor = "rgba(109, 40, 217, 0.15)",
  glowPosition = "bottom right",
  onClick,
  ...props 
}) {
  const shouldReduceMotion = useReducedMotion();

  const hoverVariants = hoverable && !shouldReduceMotion ? {
    rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
    hover: {
      y: -8,
      scale: 1.015,
      rotateX: 3,
      rotateY: -3,
      boxShadow: `0 24px 64px -12px rgba(0,0,0,0.8), 0 0 50px -10px rgba(76,29,149,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
      borderColor: "rgba(109, 40, 217, 0.4)"
    }
  } : {};

  return (
    <motion.div
      initial="rest"
      whileHover={hoverable ? "hover" : undefined}
      animate="rest"
      variants={hoverVariants}
      transition={antigravitySpring}
      onClick={onClick}
      className={`group relative flex flex-col rounded-3xl border border-white/[0.04] overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.6) 0%, rgba(11, 6, 21, 0.8) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
        perspective: "1000px",
        transformStyle: 'preserve-3d',
        cursor: onClick ? 'pointer' : 'default'
      }}
      {...props}
    >
      {/* Subtle top glare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      
      {/* Soft Ambient Glow */}
      {hoverable && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{ background: `radial-gradient(circle at ${glowPosition}, ${glowColor}, transparent 70%)` }} 
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 flex-grow flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}
