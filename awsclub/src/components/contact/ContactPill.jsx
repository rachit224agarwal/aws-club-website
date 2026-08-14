import React from "react";
import { motion } from "framer-motion";

export default function ContactPill({ item }) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 group/item text-text-muted hover:text-white transition-all duration-300 px-6 py-4 rounded-full border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.08] hover:border-primary/40 hover:shadow-[0_0_20px_rgba(234,88,12,0.15)] backdrop-blur-md relative overflow-hidden"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(234,88,12,0.1), transparent)' }} />

      <div className="p-2 rounded-full bg-white/[0.04] group-hover/item:bg-primary/20 transition-colors duration-300 relative z-10">
        <item.icon className="text-primary/70 group-hover/item:text-primary transition-colors duration-300" size={18} />
      </div>
      <span className="font-medium tracking-wide relative z-10 whitespace-nowrap">
        {item.text}
      </span>
    </motion.a>
  );
}
