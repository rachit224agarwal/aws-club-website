// ═══ MOTION FRAMEWORK ═══
// Zero-gravity physics with high-damping fluid response
// Easing: [0.65, 0, 0.35, 1] — enterprise-grade

export const ease = [0.65, 0, 0.35, 1];
export const premiumEase = [0.16, 1, 0.3, 1];

// ─── SPRING PHYSICS ─────────────────
// Fluid, underwater-like response — no bounce
export const antigravitySpring = {
  type: "spring",
  stiffness: 140,
  damping: 24,
  mass: 1.2,
};

// Premium fade-up (0.7s for elegance)
export const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease },
  },
};

