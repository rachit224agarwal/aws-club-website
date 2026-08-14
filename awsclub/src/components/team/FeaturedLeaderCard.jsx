import React from "react";
import { Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import LazyImage from "../common/LazyImage";
import { premiumEase as ease } from "../../utils/animations";

export default function FeaturedLeaderCard({ name, role, photoUrl, linkedin, github, history, getInitials }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{
        rest: {
          y: 0,
          scale: 1,
          borderColor: 'rgba(162, 109, 255, 0.22)',
          boxShadow: '0 14px 36px -10px rgba(0, 0, 0, 0.75), 0 0 20px rgba(124, 58, 237, 0.08)'
        },
        hover: {
          y: -5,
          scale: 1.008,
          borderColor: 'rgba(234, 88, 12, 0.45)',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.9), 0 0 35px rgba(124, 58, 237, 0.18), 0 0 25px rgba(234, 88, 12, 0.12)'
        }
      }}
      transition={{ duration: 0.35, ease }}
      style={{
        background: 'linear-gradient(135deg, rgba(24, 13, 44, 0.88) 0%, rgba(10, 5, 20, 0.96) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      className="relative group flex flex-col items-center text-center p-[18px_18px_20px_18px] rounded-[22px] border w-full max-w-[346px] h-full mx-auto shrink-0 z-10 transition-colors duration-300"
    >
      {/* Soft elegant ambient backlight bloom behind card */}
      <motion.div
        className="absolute inset-[-12px] rounded-[30px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(234, 88, 12, 0.15) 0%, rgba(124, 58, 237, 0.12) 60%, transparent 85%)',
          filter: 'blur(20px)'
        }}
        variants={{
          rest: { opacity: 0.25 },
          hover: { opacity: 0.65 }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Featured Status Badge */}
      <motion.div
        className="absolute -top-[13px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1 rounded-full border shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md select-none z-20 whitespace-nowrap overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.7) 0%, rgba(234, 88, 12, 0.7) 100%)'
        }}
        variants={{
          rest: { borderColor: 'rgba(255, 255, 255, 0.2)' },
          hover: { borderColor: 'rgba(255, 255, 255, 0.35)' }
        }}
      >
        {/* Subtle reflection shimmer sweep inside badge on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={{
            rest: { x: '-150%' },
            hover: { x: ['-150%', '150%'] }
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-white font-heading">
          Current Cloud Captain
        </span>
      </motion.div>

      {/* Background Effects Container */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none z-0">
        {/* Surface reflection highlight on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        />

        {/* Clean light reflection sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none z-10"
          variants={{ rest: { x: '-150%' }, hover: { x: '150%' } }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </div>

      {/* Profile Ring System */}
      <div className="relative shrink-0 flex items-center justify-center mt-1 mb-3.5 z-10 select-none">
        {/* Soft ambient halo directly behind photo */}
        <motion.div
          className="absolute w-[160px] h-[160px] rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.2) 0%, rgba(124, 58, 237, 0.15) 60%, transparent 80%)',
            filter: 'blur(14px)'
          }}
          variants={{ rest: { opacity: 0.3 }, hover: { opacity: 0.7 } }}
          transition={{ duration: 0.35 }}
        />

        {/* Layered Luxury Profile Ring */}
        <motion.div
          className="w-[162px] h-[162px] rounded-full p-[2px] relative flex items-center justify-center transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #EA580C)'
          }}
          variants={{
            rest: { boxShadow: '0 6px 18px rgba(0,0,0,0.35), 0 0 10px rgba(124, 58, 237, 0.15)' },
            hover: { boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(234, 88, 12, 0.3)' }
          }}
        >
          {/* Inner glass spacer border ring */}
          <div className="absolute inset-[2px] rounded-full bg-[#0E071A] z-10" />

          {/* Subtle inner highlight rim */}
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 z-20" />

          {/* Photo Mask container */}
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-brand-surface z-30 relative border border-white/[0.06]">
            {photoUrl ? (
              <LazyImage
                src={photoUrl}
                alt={name}
                className="w-full h-full rounded-full"
                imgClassName="object-cover rounded-full transition-transform duration-500 group-hover:scale-[1.025]"
              />
            ) : (
              <span className="text-white/80 font-heading text-4xl font-extrabold">{getInitials(name)}</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Member Textlockup */}
      <div className="flex flex-col items-center w-full z-10">
        <h3
          className="text-white font-heading font-extrabold tracking-tight mb-[8px] whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-[1.2] transition-colors duration-300"
          style={{
            fontSize:
              !name ? "1.35rem" : name.length > 21 ? "1.08rem" : name.length > 17 ? "1.18rem" : name.length > 14 ? "1.25rem" : "1.35rem",
          }}
        >
          {name}
        </h3>

        {/* Role Capsule Badge */}
        <motion.div
          className="px-3.5 py-1.5 text-center font-bold tracking-wider uppercase text-[0.62rem] rounded-full border mb-2 whitespace-nowrap max-w-full leading-normal transition-all duration-300"
          variants={{
            rest: {
              borderColor: 'rgba(124, 58, 237, 0.3)',
              color: '#9333EA',
              backgroundColor: 'rgba(124, 58, 237, 0.12)'
            },
            hover: {
              borderColor: 'rgba(234, 88, 12, 0.45)',
              color: '#F97316',
              backgroundColor: 'rgba(234, 88, 12, 0.1)'
            }
          }}
        >
          {role}
        </motion.div>

        {/* History */}
        {history ? (
          <p className="text-[#D8C9FF] text-[0.825rem] font-medium font-body italic whitespace-nowrap truncate max-w-full pr-1">
            {history}
          </p>
        ) : (
          <div className="h-[1.425rem]" />
        )}
      </div>

      <div className="flex-grow" />

      {/* Social Icons section */}
      <div className="w-full mt-3.5 z-10 relative">
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', margin: '0 0 12px 0' }} />

        <div className="flex justify-center gap-[12px]">
          {linkedin && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn`}
              className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/75 outline-none backdrop-blur-md transition-all duration-300 hover:text-white"
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: 'rgba(162, 109, 255, 0.5)',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Linkedin size={19} strokeWidth={1.8} />
            </motion.a>
          )}

          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} GitHub`}
              className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/65 outline-none backdrop-blur-md transition-all duration-300 hover:text-white"
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: 'rgba(234, 88, 12, 0.2)',
                borderColor: 'rgba(249, 115, 22, 0.5)',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)'
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Github size={19} strokeWidth={1.8} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
