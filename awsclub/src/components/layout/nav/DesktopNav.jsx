import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ease } from "../../../utils/animations";
import { navLinks } from "../../../data/navLinks";

export default function DesktopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const navigateToTop = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    window.open("https://chat.whatsapp.com/JV2tA4RqWq9LPkxCJwmcEL", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <nav className="hidden lg:flex items-center justify-center gap-1 lg:gap-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigateToTop(link.path)}
              className="border-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label={link.name}
            >
              <motion.div
                className="relative px-4 lg:px-5 py-2.5 group rounded-full overflow-hidden"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-full" />
                <div className="flex items-center gap-2 relative z-10">
                  <span className="inline-flex">
                    <link.icon
                      size={18}
                      className={`transition-colors duration-200 ${
                        isActive ? "text-primary-accent" : "text-text-subtle group-hover:text-primary-accent"
                      }`}
                    />
                  </span>
                  <span
                    className={`font-medium transition-all duration-300 ${
                      isActive
                        ? "text-primary-accent tracking-wide"
                        : "text-white/80 group-hover:text-white group-hover:tracking-wide"
                    }`}
                    style={{ letterSpacing: 'normal', transition: 'letter-spacing 0.3s cubic-bezier(0.65,0,0.35,1), color 0.3s' }}
                  >
                    {link.name}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full z-0 pointer-events-none"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      boxShadow: 'inset 0 0 15px rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                )}
              </motion.div>
            </button>
          );
        })}
      </nav>

      <motion.div
        className="hidden lg:block"
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <button
          onClick={handleJoinClick}
          className="relative group text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 outline-none hover:shadow-[0_8px_25px_rgba(234,88,12,0.5)] border border-white/10"
          style={{ background: 'linear-gradient(90deg, #4C1D95 0%, #B83D0A 100%)' }}
          aria-label="Join Community"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
          <span className="relative z-10 flex items-center gap-2">
            JOIN NOW
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </motion.div>
    </>
  );
}
