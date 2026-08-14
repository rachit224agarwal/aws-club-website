import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Maximize2 } from "lucide-react";
import LazyImage from "../common/LazyImage";
import { ease } from "../../utils/animations";

const panelStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const panelItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const GalleryMainImage = ({ src, alt }) => {
  return (
    <LazyImage
      src={src}
      alt={alt}
      priority={true}
      className="w-full h-full"
      imgClassName="object-contain pointer-events-none"
    />
  );
};

const GalleryThumbnail = ({ src, active, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-16 h-12 shrink-0 rounded-lg overflow-hidden border-2 bg-white/5"
      style={{
        borderColor: active ? "rgba(184,61,10,0.9)" : "transparent",
        opacity: active ? 1 : 0.45,
        boxShadow: active ? "0 0 0 1px rgba(184,61,10,0.3), 0 0 16px rgba(184,61,10,0.35)" : "none",
      }}
      whileHover={{ scale: 1.06, opacity: active ? 1 : 0.75 }}
      transition={{ duration: 0.25, ease }}
    >
      <LazyImage
        src={src}
        alt=""
        className="w-full h-full"
        imgClassName="object-cover"
      />
    </motion.button>
  );
};

export default function EventGalleryModal({ event, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = event?.images || [];
  const hasImages = images.length > 0;
  const imageCount = images.length;

  const handlePrev = useCallback(() => {
    if (hasImages) setCurrentIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  }, [hasImages, imageCount]);

  const handleNext = useCallback(() => {
    if (hasImages) setCurrentIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  }, [hasImages, imageCount]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  if (!event) return null;

  // Drag-to-swipe: crosses a small threshold, treat as a deliberate swipe.
  const handleDragEnd = (_e, info) => {
    const SWIPE_THRESHOLD = 60;
    if (info.offset.x > SWIPE_THRESHOLD) handlePrev();
    else if (info.offset.x < -SWIPE_THRESHOLD) handleNext();
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(5,4,8,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', willChange: 'opacity' }}
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-2.5 rounded-full text-white border border-white/[0.08] transition-colors duration-300 hover:border-primary/30"
        style={{ background: 'rgba(255,255,255,0.06)', backfaceVisibility: 'hidden' }}
        whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease }}
      >
        <X size={22} />
      </motion.button>

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30, rotateX: 5 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20, rotateX: 5 }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className={`rounded-2xl overflow-hidden border border-white/[0.06] flex flex-col md:flex-row w-full max-w-6xl max-h-[90vh] ${isFullscreen ? 'fixed inset-4 max-w-none max-h-none z-[105]' : 'relative'}`}
        style={{
          background: '#0B0615',
          boxShadow: '0 24px 64px -12px rgba(0,0,0,0.8), 0 0 60px -10px rgba(76,29,149,0.1)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Gallery Carousel */}
        <div className={`relative bg-black flex flex-col ${isFullscreen ? 'w-full h-full' : 'w-full md:w-3/5 min-h-[40vh] md:min-h-[50vh] md:h-auto'}`}>
          {hasImages ? (
            <>
              <div className="relative flex-grow min-h-[300px] flex items-center justify-center overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <GalleryMainImage
                      src={images[currentIndex]}
                      alt={`${event.title} - Photo ${currentIndex + 1}`}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Nav Controls — fade in on hover */}
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <motion.button
                      onClick={handlePrev}
                      className="p-3 rounded-full text-white border border-white/[0.08] transition-colors duration-300 pointer-events-auto"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', backfaceVisibility: 'hidden' }}
                      whileHover={{ scale: 1.15, backgroundColor: "rgba(0,0,0,0.8)", boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(234,88,12,0.3)", rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <ChevronLeft size={22} />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      className="p-3 rounded-full text-white border border-white/[0.08] transition-colors duration-300 pointer-events-auto"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', backfaceVisibility: 'hidden' }}
                      whileHover={{ scale: 1.15, backgroundColor: "rgba(0,0,0,0.8)", boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(234,88,12,0.3)", rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <ChevronRight size={22} />
                    </motion.button>
                  </div>
                )}

                {/* Counter & Fullscreen */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 border border-white/[0.08] tabular-nums"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
                  >
                    {currentIndex + 1} / {images.length}
                  </div>
                  <motion.button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-full text-white border border-white/[0.08] transition-colors duration-300"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(184,61,10,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    <Maximize2 size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnails */}
              {!isFullscreen && images.length > 1 && (
                <div
                  className="h-20 flex items-center gap-2 px-4 overflow-x-auto border-t border-white/[0.06] shrink-0"
                  style={{ background: 'rgba(5,4,8,0.8)' }}
                >
                  {images.map((img, idx) => (
                    <GalleryThumbnail
                      key={idx}
                      src={img}
                      active={idx === currentIndex}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-text-subtle font-semibold py-24">
              No photos available
            </div>
          )}
        </div>

        {/* Event Details Panel — staged reveal */}
        {!isFullscreen && (
          <motion.div
            variants={panelStagger}
            initial="hidden"
            animate="visible"
            className="w-full md:w-2/5 p-6 md:p-8 flex flex-col overflow-y-auto"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,6,21,0.5) 0%, rgba(11,6,21,0.6) 100%)",
            }}
          >
            <motion.div
              variants={panelItem}
              className="flex items-center gap-2 text-primary text-sm font-semibold mb-4 tracking-wider uppercase"
            >
              <Calendar size={16} />
              <span>{event.dateRange}</span>
            </motion.div>

            <motion.h2 variants={panelItem} className="text-2xl md:text-3xl font-bold mb-4 font-heading text-white">
              {event.title}
            </motion.h2>

            <motion.p variants={panelItem} className="text-text-muted font-body leading-relaxed mb-6">
              {event.description || "Description coming soon."}
            </motion.p>

            {event.tags && event.tags.length > 0 && (
              <motion.div variants={panelItem} className="flex flex-wrap gap-2 mt-auto">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-xs text-accent font-semibold border border-accent/15"
                    style={{ background: 'rgba(109,40,217,0.08)' }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}