import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import clubLogo from "../../assets/webp/logos/ClubLogoP.webp";
import LazyImage from "../common/LazyImage";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";
import { ease } from "../../utils/animations";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <motion.header
      initial={shouldReduceMotion ? {} : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease }}
      className="fixed top-0 left-0 right-0 z-50 gpu-accelerated"
      ref={menuRef}
    >
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-300"
        style={{
          opacity: scrolled ? 1 : 0,
          backgroundColor: "rgba(5, 4, 8, 0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 1px 8px rgba(234,88,12,0.08)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "left",
            background: 'linear-gradient(90deg, #4C1D95, #B83D0A, #4C1D95)',
            animation: 'progressShimmer 2s linear infinite',
          }}
        />
      </div>

      <div
        style={{ paddingTop: scrolled ? "10px" : "16px", paddingBottom: scrolled ? "10px" : "16px", transition: 'padding 0.3s ease' }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.button
          onClick={handleLogoClick}
          className="flex items-center gap-3 group border-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-2 -ml-2 relative overflow-hidden"
          whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label="Home"
        >
          <div className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-xl pointer-events-none" />

          <div
            className="relative gpu-accelerated group-hover:-rotate-3 group-hover:scale-110 transition-transform duration-300 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-[-4px] rounded-full opacity-[0.08] group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(234,88,12,0.8) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
            <LazyImage priority src={clubLogo} alt="Club Logo" width={48} height={48} className="h-10 w-10 md:h-12 md:w-12 object-contain relative z-10 rounded-lg shadow-sm" />
          </div>
          <div className="leading-tight hidden sm:block text-left relative z-10">
            <span className="block text-sm md:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 font-heading">AWS Student Builder Group</span>
            <span className="block text-[10px] md:text-xs text-text-subtle group-hover:text-white/80 transition-colors duration-300 tracking-wide uppercase">KIET Deemed to be University</span>
          </div>
        </motion.button>

        <DesktopNav />

        <motion.button
          className="lg:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-all duration-300 relative z-[60] outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} className="text-primary-accent" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} className="text-white/80" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.header>
  );
}