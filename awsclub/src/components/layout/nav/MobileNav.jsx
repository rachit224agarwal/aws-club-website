import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { navLinks } from "../../../data/navLinks";
import { ease } from "../../../utils/animations";

export default function MobileNav({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease, staggerChildren: 0.04 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.18, ease } }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease } }
  };

  const navigateToTop = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const handleMobileJoinClick = (e) => {
    e.preventDefault();
    window.open("https://chat.whatsapp.com/EwkRm6MJxB68Skowc0xsg3", "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden" animate="visible" exit="exit"
          className="lg:hidden fixed top-0 right-0 h-screen w-64 sm:w-80 z-50 flex flex-col pt-24 px-6 border-l border-white/[0.08] shadow-2xl"
          style={{
            background: 'rgba(9,5,21,0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: 'inset 1px 0 12px rgba(76,29,149,0.08), -8px 0 30px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex flex-col gap-4 pb-8 relative z-10">
            {navLinks.map((link) => (
              <motion.div key={link.path} variants={mobileItemVariants}>
                <button
                  onClick={() => { setIsOpen(false); navigateToTop(link.path); }}
                  className={`w-full text-left flex items-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[56px] ${
                    location.pathname === link.path
                      ? "bg-white/[0.08] text-primary-accent border border-white/[0.1]"
                      : "text-white/80 hover:bg-white/[0.05] hover:text-white border border-transparent"
                  }`}
                >
                  <link.icon size={24} className={location.pathname === link.path ? "text-primary-accent" : "text-text-subtle"} />
                  <span className="font-medium text-xl">{link.name}</span>
                </button>
              </motion.div>
            ))}
            <div className="my-4 gradient-separator" />
            <motion.div variants={mobileItemVariants} className="pt-2">
              <button
                onClick={handleMobileJoinClick}
                className="w-full flex items-center justify-center gap-3 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white group min-h-[56px]"
                style={{
                  background: 'linear-gradient(135deg, #4C1D95, #B83D0A)',
                  boxShadow: '0 4px 20px rgba(76,29,149,0.2), 0 2px 12px rgba(184,61,10,0.15)',
                }}
              >
                <span className="text-lg">JOIN NOW</span>
                <ChevronRight size={22} className="transition-transform group-hover:translate-x-1 duration-300" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
