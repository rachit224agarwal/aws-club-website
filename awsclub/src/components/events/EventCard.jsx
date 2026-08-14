import React from "react";
import { Calendar, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import LazyImage from "../common/LazyImage";
import { antigravitySpring, premiumEase as ease } from "../../utils/animations";

const PhotoStackImage = ({ src, idx, isTop, rotation, xOffset, priority }) => {
  return (
    <motion.div
      className="absolute inset-y-0 left-0 right-0 mx-auto w-3/4 h-full rounded-xl overflow-hidden border border-white/[0.05] shadow-xl group-hover:border-white/[0.1] transition-colors duration-500"
      style={{ background: '#0B0615', zIndex: idx }}
      variants={{
        rest: { rotate: rotation, x: xOffset, y: idx * 5, scale: 1, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' },
        hover: {
          rotate: isTop ? 0 : (idx % 2 === 0 ? -8 : 8),
          x: isTop ? 0 : (idx % 2 === 0 ? -25 : 25),
          y: isTop ? -5 : (idx % 2 === 0 ? 10 : 10),
          scale: isTop ? 1.05 : 0.95,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)'
        }
      }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10" />

      {/* Dynamic hover glow overlay for image stack */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" style={{ background: 'radial-gradient(circle at top right, rgba(234,88,12,0.15), transparent 70%)' }} />

      <LazyImage
        src={src}
        alt="Event"
        priority={priority && isTop}
        className="w-full h-full"
        imgClassName="object-cover opacity-80 group-hover:opacity-100"
      />
    </motion.div>
  );
};

const EventCard = React.memo(function EventCard({ id, dateRange, title, tags, photoCount, onSelect, onClick, images, priority }) {
  const handleClick = React.useCallback(() => {
    if (onSelect && id) onSelect(id);
    else if (onClick) onClick();
  }, [id, onSelect, onClick]);

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const renderPhotoStack = () => {
    if (!photoCount || photoCount === 0) return null;
    const stackCount = Math.min(photoCount, 3);
    const photos = images && images.length > 0
      ? images.slice(0, stackCount)
      : Array.from({ length: stackCount }).map(() =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=0B0615&color=B83D0A&size=512&font-size=0.1`
      );

    return (
      <div className="relative w-full aspect-video mb-6 mt-8 flex justify-center items-center">
        {photos.map((src, idx) => {
          const isTop = idx === stackCount - 1;
          const rotation = isTop ? 0 : (idx % 2 === 0 ? -4 : 4);
          const xOffset = isTop ? 0 : (idx % 2 === 0 ? -6 : 6);
          return (
            <PhotoStackImage
              key={idx}
              src={src}
              idx={idx}
              isTop={isTop}
              rotation={rotation}
              xOffset={xOffset}
              priority={priority}
            />
          );
        })}
        <motion.div
          className="absolute bottom-2 right-[10%] z-20 px-3 py-1.5 rounded-full border border-white/[0.05] flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold shadow-lg text-primary"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <ImageIcon size={12} />{photoCount} Photos
        </motion.div>
      </div>
    );
  };

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
        hover: { y: -8, scale: 1.02 }
      }}
      transition={antigravitySpring}
      className="group relative flex flex-col h-full p-8 rounded-[2rem] border border-white/[0.04] overflow-hidden bg-[#0A0A0B] hover:border-[rgba(109,40,217,0.4)] hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(76,29,149,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] focus-visible:ring-2 focus-visible:ring-primary transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.6) 0%, rgba(11, 6, 21, 0.8) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {/* Subtle top glare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Dynamic background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(109,40,217,0.08), transparent 60%)' }} />

      <div className="relative z-10 flex-grow flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-[10px] font-bold mb-5 tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary">
          <Calendar size={14} />
          <span>{dateRange}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-white text-white/90 transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider uppercase border border-white/[0.05] text-white/60 bg-white/[0.02] group-hover:border-white/10 group-hover:text-white/80 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="w-full mt-auto">
          {renderPhotoStack()}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center pt-6 border-t border-white/[0.05] mt-4">
        <button
          className="text-text-muted group-hover:text-primary font-semibold text-sm flex items-center gap-2 w-fit justify-center group/btn focus:outline-none bg-transparent border-none transition-colors duration-300"
          onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}
        >
          <span>View Gallery</span>
          <span className="inline-block group-hover/btn:translate-x-1 transition-transform duration-300 ease-out">→</span>
        </button>
      </div>
    </motion.div>
  );
});

export default EventCard;