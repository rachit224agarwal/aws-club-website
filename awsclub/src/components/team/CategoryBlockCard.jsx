import React from "react";
import { motion } from "framer-motion";
import { getCategoryIcon } from "../../utils/teamHelpers";
import { antigravitySpring } from "../../utils/animations";
import LazyImage from "../common/LazyImage";

export default function CategoryBlockCard({ group, onSelect, isExecutive }) {
  const Icon = getCategoryIcon(group.title);
  const { title, members } = group;
  const isWide = members.length > 6;
  const isLeadership = title === "Leadership" || title.toLowerCase().includes("leadership");

  const getAvatarContainerClass = (count, wide) => {
    if (wide) {
      return "grid grid-cols-4 md:grid-cols-8 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:gap-x-7 lg:gap-y-9 justify-items-center items-start max-w-4xl mx-auto py-2 w-full my-auto";
    }
    if (count === 2) {
      return "flex items-center justify-center gap-10 sm:gap-14 w-full h-[130px] my-auto";
    }
    if (count === 3) {
      return "flex items-center justify-center gap-4 sm:gap-6 w-full h-[130px] my-auto";
    }
    if (count === 4) {
      return "flex items-center justify-between px-1 sm:px-2 w-full h-[130px] my-auto";
    }
    if (count === 5) {
      return "grid grid-cols-5 gap-x-1 sm:gap-x-2 gap-y-3 justify-items-center items-center w-full my-auto py-1";
    }
    return "flex flex-wrap items-center justify-center gap-4 w-full py-2 my-auto";
  };

  const getItemMaxWidth = (count, wide) => {
    if (wide) return "w-full max-w-[85px] sm:max-w-[95px]";
    if (count === 2) return "max-w-[140px] w-auto px-2";
    if (count === 3) return "max-w-[110px] w-auto px-1";
    if (count === 4) return "max-w-[85px] w-auto";
    if (count === 5) return "w-full flex flex-col items-center";
    return "max-w-[100px] w-auto";
  };

  const getAvatarSize = (count, wide) => {
    if (wide) return "w-[60px] h-[60px] sm:w-[68px] sm:h-[68px]";
    if (count <= 3) return "w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]";
    if (count === 4) return "w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]";
    if (count === 5) return "w-[58px] h-[58px] sm:w-[64px] sm:h-[64px]";
    return "w-[64px] h-[64px] sm:w-[70px] sm:h-[70px]";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(group);
    }
  };

  const count = members.length;
  const avatarSizeClass = getAvatarSize(count, isWide);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        rest: { y: 0, scale: 1 },
        hover: { y: -6, scale: isWide ? 1.01 : 1.02 },
      }}
      transition={antigravitySpring}
      onClick={() => onSelect(group)}
      className={`group relative flex flex-col justify-between p-5 sm:p-7 rounded-[2rem] border border-white/[0.08] overflow-hidden bg-[#0A0A0B] hover:border-[rgba(162,109,255,0.45)] hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(162,109,255,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:ring-2 focus-visible:ring-primary transition-all duration-500 text-left cursor-pointer h-full ${isWide ? "col-span-full max-w-5xl mx-auto w-full" : "w-full"
        }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(20, 10, 35, 0.75) 0%, rgba(11, 6, 21, 0.9) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Subtle top glare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Dynamic ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: isWide
            ? "radial-gradient(circle at center, rgba(162, 109, 255, 0.15), rgba(247, 148, 29, 0.08) 50%, transparent 80%)"
            : "radial-gradient(circle at top right, rgba(162, 109, 255, 0.14), transparent 70%)",
        }}
      />

      <div>
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-between w-full mb-4 sm:mb-5">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 group-hover:border-[#A26DFF]/50 transition-all duration-500 shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(162, 109, 255, 0.22) 0%, rgba(247, 148, 29, 0.18) 100%)",
            }}
          >
            <Icon className="w-5 h-5 text-[#A26DFF] group-hover:text-white transition-colors duration-300" />
          </div>
        </div>

        {/* Category Title & Accent Line */}
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 font-heading text-white/95 group-hover:text-white transition-colors duration-300 tracking-tight leading-tight">
            {title}
          </h3>
          <div className="w-14 h-[3px] bg-gradient-to-r from-[#A26DFF] to-[#F7941D] rounded-full opacity-90 mb-6 sm:mb-7 group-hover:w-24 transition-all duration-500" />
        </div>
      </div>

      {/* Integrated Premium Avatar Gallery */}
      <div className={`relative z-10 ${getAvatarContainerClass(count, isWide)}`}>
        {members.map((m) => {
          const firstName = m.name.split(" ")[0];
          return (
            <motion.div
              key={m.id || `${m.name}-${m.department}`}
              title={m.name}
              whileHover={{ scale: 1.1, y: -5, zIndex: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className={`group/avatar relative flex flex-col items-center justify-center select-none shrink-0 ${getItemMaxWidth(count, isWide)}`}
            >
              <div
                className={`${avatarSizeClass} rounded-full p-[2.5px] shadow-[0_4px_12px_rgba(0,0,0,.4),0_0_10px_rgba(162,109,255,0.2)] shrink-0 relative flex items-center justify-center group-hover/avatar:shadow-[0_4px_16px_rgba(234,88,12,0.4)] transition-shadow duration-500`}
                style={{ background: "linear-gradient(135deg, #A26DFF 0%, #EA580C 100%)" }}
              >
                <div className="absolute inset-[2.5px] rounded-full bg-[#0E071A] z-0" />
                <div
                  className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative z-10"
                  style={{ background: "#2A1B45", boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)" }}
                >
                  {m.photoUrl ? (
                    <LazyImage
                      src={m.photoUrl}
                      alt={m.name}
                      className="w-full h-full rounded-full"
                      imgClassName="object-cover rounded-full group-hover/avatar:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <span className="text-white text-xl font-extrabold group-hover/avatar:scale-105 transition-all duration-500">
                      {m.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-2 text-center flex flex-col items-center w-full">
                <span className={`text-zinc-300 group-hover/avatar:text-white font-sans font-medium sm:font-semibold leading-tight tracking-wide truncate w-full transition-colors duration-300 ${count === 5 ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-[13px]"}`}>
                  {firstName}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isExecutive && (
        <div className="w-full flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-5 mb-2 relative z-10 flex-wrap">
          {isLeadership ? (
            members.map((m) => (
              <div key={m.id || m.role} className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md shadow-sm group-hover:border-[#A26DFF]/60 group-hover:shadow-[0_0_20px_rgba(162,109,255,0.25)] group-hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-white/95 group-hover:text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] leading-none transition-colors duration-300">
                  {m.role}
                </span>
              </div>
            ))
          ) : (
            <div className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md shadow-sm group-hover:border-[#A26DFF]/60 group-hover:shadow-[0_0_20px_rgba(162,109,255,0.25)] group-hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-white/95 group-hover:text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] leading-none transition-colors duration-300">
                {title}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action Button at bottom */}
      <div className="relative z-10 flex items-center justify-center pt-4 mt-5 sm:mt-6 border-t border-white/[0.08] w-full mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(group);
          }}
          className="text-white/85 group-hover:text-[#F7941D] font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2 w-fit justify-center group/btn focus:outline-none bg-transparent border-none transition-colors duration-300"
        >
          <span className="whitespace-nowrap">View {title} ({members.length})</span>
          <span className="inline-block group-hover:translate-x-2 transition-transform duration-300 ease-out text-lg font-black shrink-0">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}
