import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import MemberCard from "./MemberCard";
import { getCategoryIcon } from "../../utils/teamHelpers";
import { ease } from "../../utils/animations";

export default function CategoryModal({ category, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!category) return null;

  const Icon = getCategoryIcon(category.title);

  const getGridClass = (count) => {
    if (count === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-[740px] w-full mx-auto justify-items-center";
    }
    if (count === 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-[1120px] w-full mx-auto justify-items-center";
    }
    // For 4 members (Technical Leads) or more (Associate Team - 16 members):
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-[1400px] w-full mx-auto justify-items-center";
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
      style={{
        background: "rgba(5, 4, 8, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        willChange: "opacity",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1460px] max-h-[92vh] overflow-y-auto rounded-[32px] border border-white/[0.08] px-6 sm:px-10 md:px-[52px] lg:px-[56px] pt-6 sm:pt-8 pb-8 sm:pb-[36px] my-auto"
        style={{
          background:
            "linear-gradient(135deg, rgba(20, 10, 35, 0.96) 0%, rgba(11, 6, 21, 0.98) 100%)",
          boxShadow:
            "0 25px 80px -15px rgba(0,0,0,0.9), 0 0 60px -10px rgba(162,109,255,0.15)",
        }}
      >
        {/* Centered Inner Content Container */}
        <div className="max-w-[1360px] mx-auto w-full flex flex-col">
          {/* Modal Header with spacing above divider */}
          <div className="flex items-center justify-between w-full pb-5 sm:pb-6 border-b border-white/10 mb-6 sm:mb-8">
            <div className="flex items-center gap-4 sm:gap-5 text-left">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white border border-white/15 shadow-inner shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(162, 109, 255, 0.25) 0%, rgba(247, 148, 29, 0.15) 100%)",
                }}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#A26DFF]" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                  {category.title}
                </h2>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-white/75 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    {category.members.length} {category.members.length === 1 ? "Member" : "Members"}
                  </span>
                  <span className="text-white/30">•</span>
                  <div className="w-10 sm:w-12 h-[2.5px] bg-gradient-to-r from-[#A26DFF] to-[#F7941D] rounded-full" />
                </div>
              </div>
            </div>

            {/* Close Button directly vertically aligned in header row */}
            <motion.button
              onClick={onClose}
              className="p-3 sm:p-3.5 rounded-full text-white/80 border border-white/15 transition-colors duration-300 hover:text-white hover:border-[#A26DFF]/60 shrink-0 self-center ml-4"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.18)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close modal"
            >
              <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          {/* Responsive CSS Grid */}
          <div className={getGridClass(category.members.length)}>
            {category.members.map((member) => (
              <div
                key={member.id || member.name}
                className="flex flex-col h-full w-full max-w-[335px] items-center justify-stretch mx-auto"
              >
                <MemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}
