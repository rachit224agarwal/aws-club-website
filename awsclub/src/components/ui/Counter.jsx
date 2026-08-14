import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Counter({ target, prefix = "", suffix = "+" }) {
  // spring — fluid count-up, no bounce
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 140, damping: 24, mass: 1.2 });
  const rounded = useTransform(springCount, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    if (isInView && !hasCounted) {
      count.set(target);
      setHasCounted(true);
    }
  }, [count, target, isInView, hasCounted]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="text-4xl md:text-5xl font-bold font-heading text-gradient inline-block">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  );
}
