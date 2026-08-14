import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SpotlightBackground = () => {
  const spotlightRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    let frameId;
    const handleMouseMove = (e) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
          spotlightRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#05030A]" />
      
      {/* Spotlight cursor tracking */}
      {!shouldReduceMotion && (
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-100"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x, -800px) var(--mouse-y, -800px), rgba(76, 29, 149, 0.08), transparent 60%)`
          }}
        />
      )}

      {/* Ambient aurora orb — zero-gravity float */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
          <motion.div
            className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none gpu-accelerated"
            style={{
              background: 'radial-gradient(circle, rgba(76,29,149,0.08) 0%, rgba(184,61,10,0.04) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </>
  );
}

export default React.memo(SpotlightBackground);
