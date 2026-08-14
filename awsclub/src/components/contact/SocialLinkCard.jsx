import React from "react";
import { motion } from "framer-motion";
import { fadeUp, antigravitySpring } from "../../utils/animations";
import { MessageCircle, Linkedin, Instagram, Twitter, Users, Github } from "lucide-react";

const iconMap = {
  MessageCircle,
  Linkedin,
  Instagram,
  Twitter,
  Users,
  Github
};

const cardDescriptions = {
  MessageCircle: "Join the conversation",
  Linkedin: "Connect professionally",
  Instagram: "See our daily updates",
  Twitter: "Stay in the loop",
  Github: "Contribute to projects",
  Users: "Attend our events"
};

export default function SocialLinkCard({ link }) {
  const IconComponent = iconMap[link.iconName];
  const desc = cardDescriptions[link.iconName] || "Connect with us";

  return (
    <motion.a
      href={link.url || "#"}
      target={link.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotateX: 4,
        rotateY: -4,
        boxShadow: `0 24px 64px -12px rgba(0,0,0,0.8), 0 0 50px -10px rgba(76,29,149,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
        borderColor: "rgba(109, 40, 217, 0.4)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={antigravitySpring}
      className="group relative flex flex-col items-center justify-center text-center p-8 rounded-[2rem] border border-white/[0.04] overflow-hidden h-full"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.6) 0%, rgba(11, 6, 21, 0.8) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at center, rgba(234,88,12,0.1), transparent 70%)' }} />

      <div className="relative mb-6 z-10">
        <motion.div
          className="relative p-5 rounded-2xl border border-white/[0.08] group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-500 shadow-lg bg-white/[0.02]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
        >
          {IconComponent && (
            <IconComponent size={32} className="text-text-subtle group-hover:text-white transition-colors duration-300 relative z-10" />
          )}
        </motion.div>
      </div>

      <span className="font-heading text-xl font-bold tracking-wide group-hover:text-white transition-colors duration-300 relative z-10 mb-2">
        {link.platform}
      </span>

      <span className="text-xs text-text-subtle font-body uppercase tracking-[0.2em] relative z-10 group-hover:text-primary transition-colors duration-300">
        {desc}
      </span>
    </motion.a>
  );
}
