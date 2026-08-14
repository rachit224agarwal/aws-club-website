import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
      className="w-full h-full relative"
      style={{ backfaceVisibility: 'hidden', willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
}
