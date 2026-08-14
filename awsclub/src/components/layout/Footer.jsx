import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact } from "../../data/contact";
import { siteMeta } from "../../data/siteMeta";
import SocialLinks from "../ui/SocialLinks";
import LazyImage from "../common/LazyImage";
import clubLogo from "../../assets/webp/logos/ClubLogoP.webp";
import { MapPin, Phone, Mail } from "lucide-react";
import { antigravitySpring, ease } from "../../utils/animations";

const Footer = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.12, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
  };

  return (
    <footer className="relative z-20 text-white/80 border-t border-white/[0.04] overflow-hidden gpu-accelerated mt-20" style={{ background: '#050408' }}>
      
      {/* ═══ Animated Footer Canvas ═══ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-primary/5 to-transparent opacity-60" />
        <div className="footer-dot-grid opacity-30" aria-hidden="true" />
        
        {/* Animated Sweep Line on Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
          <motion.div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #EA580C, #4C1D95, transparent)',
              backgroundSize: '200% 100%',
              animation: 'progressShimmer 3s linear infinite',
            }}
          />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-6">
          
          {/* ═══ Top Section: Brand + Glass Panels ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 items-stretch">
            
            {/* Left: Magnetic Brand Lockup */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center items-center text-center h-full">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative flex flex-col items-center border-none bg-transparent outline-none p-6 rounded-2xl overflow-hidden w-full h-full justify-center"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Magnetic Hover Glow */}
                <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl pointer-events-none" />

                <div className="flex flex-col items-center gap-4 mb-4">
                  <div
                    className="relative gpu-accelerated group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500 ease-out"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className="absolute inset-[-4px] rounded-full opacity-[0.1] group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(234,88,12,0.8) 0%, transparent 70%)',
                        filter: 'blur(10px)',
                      }}
                    />
                    <LazyImage 
                      src={clubLogo} 
                      alt="Club Logo" 
                      className="w-16 h-16 rounded-xl bg-surface shadow-2xl relative z-10" 
                      imgClassName="object-contain" 
                    />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-500 relative z-10 text-center pt-2">
                    AWS Student Builder Group
                  </h3>
                </div>
                
                <p className="text-text-muted text-sm lg:text-base leading-relaxed font-body max-w-[250px] relative z-10">{siteMeta.tagline}</p>
              </motion.button>
            </motion.div>

            {/* Middle: Glass Panel - Contact */}
            <motion.div
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -8, rotateX: 2, rotateY: -2, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 40px rgba(109,40,217,0.15)' }}
              transition={antigravitySpring}
              className="group relative rounded-3xl p-6 lg:p-8 border border-white/[0.05] overflow-hidden flex flex-col justify-center items-center text-center h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.4) 0%, rgba(11, 6, 21, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Panel Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                   style={{ background: 'radial-gradient(circle at top, rgba(234,88,12,0.08), transparent 70%)' }} />

              <h4 className="text-sm font-bold mb-6 text-primary tracking-widest font-heading uppercase flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Contact Hub
              </h4>
              
              <ul className="space-y-3 text-sm font-body relative z-10 flex flex-col items-center">
                <li className="flex items-center gap-2 text-text-muted">
                  <MapPin className="text-primary/70 shrink-0" size={16} />
                  <span className="leading-relaxed">{contact.address}</span>
                </li>
                <li>
                  <motion.a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors duration-300 group/link">
                    <Phone className="text-primary/70 group-hover/link:text-primary transition-colors duration-300" size={16} />
                    <span className="relative">
                      {contact.phone}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                    </span>
                  </motion.a>
                </li>
                <li>
                  <motion.a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors duration-300 group/link">
                    <Mail className="text-primary/70 group-hover/link:text-primary transition-colors duration-300" size={16} />
                    <span className="relative">
                      {contact.email}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                    </span>
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Right: Glass Panel - Socials */}
            <motion.div
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -8, rotateX: 2, rotateY: 2, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 40px rgba(234,88,12,0.1)' }}
              transition={antigravitySpring}
              className="group relative rounded-3xl p-6 lg:p-8 border border-white/[0.05] overflow-hidden flex flex-col justify-center items-center text-center h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.4) 0%, rgba(11, 6, 21, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Panel Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                   style={{ background: 'radial-gradient(circle at top, rgba(109,40,217,0.1), transparent 70%)' }} />

              <h4 className="text-sm font-bold mb-6 text-primary tracking-widest font-heading uppercase flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-primary animate-pulse" /> Community
              </h4>
              
              <div className="relative z-10 flex justify-center w-full">
                <SocialLinks className="justify-center gap-4" iconSize={22} itemClass="w-12 h-12" />
              </div>
            </motion.div>

          </div>

          <div className="gradient-separator w-full opacity-50 mb-12" />

          {/* ═══ Dynamic "Behind the Build" Display ═══ */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-12 relative z-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-subtle mb-6">
              Engineered By
            </h4>

            {/* Magnetic Team Dock */}
            <div className="flex justify-center max-w-3xl">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                className="group relative"
              >
                <div className="flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/40 hover:shadow-[0_0_25px_rgba(234,88,12,0.18)] transition-all duration-300 cursor-default overflow-hidden backdrop-blur-md">
                  
                  {/* Hover Spotlight */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                       style={{ background: 'linear-gradient(90deg, transparent, rgba(234,88,12,0.12), transparent)' }} />
                  
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-primary animate-pulse mr-1" />
                  
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300 relative z-10 tracking-wide">
                    Team AWS Student Builder Group <span className="mx-2 text-white/20">|</span> KIET Deemed to be University
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ═══ Copyright ═══ */}
          <motion.div variants={itemVariants} className="text-center relative z-10">
            <p className="text-[11px] text-text-subtle/50 font-body tracking-wider uppercase">
              © {new Date().getFullYear()} AWS Student Builder Group <span className="mx-2 text-white/10">|</span> KIET Deemed to be University
            </p>
          </motion.div>

        </div>
      </motion.div>
    </footer>
  );
}

export default React.memo(Footer);