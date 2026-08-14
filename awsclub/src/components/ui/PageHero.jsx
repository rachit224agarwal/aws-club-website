import React from "react";
import { motion } from "framer-motion";

const ease = [0.65, 0, 0.35, 1];

export default function PageHero({ badge, title, subtitle, centered = true }) {
  const words = typeof title === "string" ? title.split(" ") : title;

  return (
    <div className={`relative flex flex-col ${centered ? "items-center text-center" : "items-start text-left"} pt-8 pb-16 z-10 w-full`}>
      {/* Badge */}
      {badge && (
        <div className="overflow-hidden mb-6 rounded-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="pro-badge gpu-accelerated"
          >
            {badge}
          </motion.div>
        </div>
      )}

      {/* Staggered word reveal title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-heading relative z-10 flex flex-col items-center select-none">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
          }}
          className={`flex flex-wrap ${centered ? "justify-center" : "justify-start"} gap-x-3 pb-2`}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, rotateX: 60, scale: 0.9 },
                visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
              }}
              style={{ transformPerspective: 1000 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease }}
          className="mt-6 text-base md:text-lg max-w-2xl text-text-subtle font-body leading-relaxed relative z-10"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
