import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, Sparkles, Home, FolderGit2, Calendar, Users, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clubLogo from "../assets/ClubLogoP.png";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Function to navigate and scroll to top
  const navigateToTop = (path) => {
    // If navigating to a different page or same page
    if (location.pathname === path) {
      // If already on the page, just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to new page and scroll to top
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const navLinks = [
    { path: "/", name: "Home", icon: Home, mobileIcon: "🏠" },
    { path: "/projects", name: "Projects", icon: FolderGit2, mobileIcon: "🚀" },
    { path: "/events", name: "Events", icon: Calendar, mobileIcon: "📅" },
    { path: "/members", name: "Team", icon: Users, mobileIcon: "👥" },
    { path: "/contact", name: "Contact", icon: Mail, mobileIcon: "📧" },
  ];

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    window.open("https://chat.whatsapp.com/JV2tA4RqWq9LPkxCJwmcEL", "_blank", "noopener,noreferrer");
  };

  const handleMobileJoinClick = (e) => {
    e.preventDefault();
    window.open("https://chat.whatsapp.com/EwkRm6MJxB68Skowc0xsg3", "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  // Handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0A0F16]/95 backdrop-blur-xl shadow-2xl border-b border-[#FF9900]/20" 
          : "bg-[#131A22] shadow-lg"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        
        {/* Logo + Club Name with Animation */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <motion.div 
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FF9900] rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            <img 
              src={clubLogo} 
              alt="Club Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain relative z-10" 
            />
          </motion.div>
          <div className="leading-tight hidden sm:block">
            <motion.span 
              className="block text-sm md:text-lg font-bold bg-gradient-to-r from-white to-[#FF9900] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{ backgroundSize: "200% auto" }}
            >
              AWS Cloud Club
            </motion.span>
            <span className="block text-[10px] md:text-xs text-gray-400">KIET ( Deemed to be University )</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <div
              key={link.path}
              onClick={() => navigateToTop(link.path)}
              className="cursor-pointer"
            >
              <motion.div
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative px-3 lg:px-5 py-2"
              >
                <div className="flex items-center gap-2">
                  <link.icon 
                    size={18} 
                    className={`transition-colors duration-200 ${
                      location.pathname === link.path ? "text-[#FF9900]" : "text-gray-400"
                    }`}
                  />
                  <span className={`font-medium transition-colors duration-200 ${
                    location.pathname === link.path ? "text-[#FF9900]" : "text-gray-300"
                  }`}>
                    {link.name}
                  </span>
                </div>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9900] to-[#FF6B00]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>
            </div>
          ))}
        </nav>

        {/* Join Button (desktop only) with Animation */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={handleJoinClick}
            className="relative group bg-gradient-to-r from-[#FF9900] to-[#FF6B00] text-black px-6 py-2.5 rounded-lg font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} className="animate-pulse" />
              <span>JOIN NOW</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] to-[#FF9900] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Mobile Menu Button with Animation */}
        <motion.button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 relative z-20"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-[#FF9900]" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} className="text-gray-300" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-[#0A0F16]/95 backdrop-blur-xl border-t border-[#FF9900]/20 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={mobileItemVariants}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    onClick={() => {
                      setIsOpen(false);
                      navigateToTop(link.path);
                    }}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                      location.pathname === link.path
                        ? "bg-gradient-to-r from-[#FF9900]/20 to-[#FF9900]/5 text-[#FF9900] border-l-4 border-[#FF9900]"
                        : "text-gray-300 hover:bg-gray-800/30 hover:text-[#FF9900]"
                    }`}
                  >
                    <span className="text-2xl">{link.mobileIcon}</span>
                    <span className="font-medium text-base">{link.name}</span>
                  </div>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

              {/* Join Button inside mobile menu with Animation */}
              <motion.div
                variants={mobileItemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={handleMobileJoinClick}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9900] to-[#FF6B00] text-black px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Sparkles size={20} className="animate-pulse" />
                  <span className="text-base">JOIN NOW</span>
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}