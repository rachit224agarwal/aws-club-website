import React from "react";
import { contact } from "../../data/contact";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { ease } from "../../utils/animations";

export default function SocialLinks({ className = "", iconSize = 20, itemClass = "w-11 h-11" }) {
  const shouldReduceMotion = useReducedMotion();

  const socials = [
    { icon: Linkedin, link: contact.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, link: contact.socials.instagram, label: "Instagram" },
  ];


  return (
    <div className={`flex gap-4 ${className}`}>
      {socials.map((social, idx) => {
        const IconComponent = social.icon;
        return (
          <motion.a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.1, boxShadow: "0 0 12px rgba(234,88,12,0.35), 0 0 24px rgba(234,88,12,0.12)" }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.25, ease }}
            className={`${itemClass} rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center transition-all duration-300 group border border-[rgba(234,88,12,0.18)] text-white/80 hover:text-white hover:border-primary-accent/50 hover:bg-primary/15 gpu-accelerated`}
            aria-label={social.label}
          >
            <IconComponent size={iconSize} className="transition-colors duration-300 relative z-10" />
          </motion.a>
        );
      })}
    </div>
  );
}

