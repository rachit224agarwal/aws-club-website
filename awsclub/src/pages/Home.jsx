import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import awslogo from "../assets/awslogo.png";
import Counter from "../components/Counter";
import VisionObjective from "../components/VisionObjective";
import visionImage from "../assets/ClubLogoP.png";
import { ArrowRight, Users, Code2, Award, Rocket, TrendingUp } from "lucide-react";

// ─── Static data outside component (zero re-allocation) ───────────────────────
const words = ["Cloud", "Compute", "Community", "Collaboration", "Career", "Certification", "Creativity"];

const benefits = [
  { icon: Code2,  title: "Hands-on Learning", description: "Work on real AWS projects and gain practical cloud experience.",    color: "#FF9900" },
  { icon: Users,  title: "Networking",         description: "Connect with peers, mentors, and industry professionals.",          color: "#3B82F6" },
  { icon: Rocket, title: "Opportunities",      description: "Access hackathons, internships, and career-building events.",       color: "#10B981" },
];

const impactStats = [
  { value: 60,  label: "Active Members+",      icon: Users     },
  { value: 50,  label: "Workshops Conducted",  icon: Code2     },
  { value: 45,  label: "AWS Certifications",   icon: Award     },
  { value: 100, label: "Projects Built",       icon: TrendingUp},
];

const TYPING_SPEED   = 120;
const DELETING_SPEED = 60;
const DELAY_BETWEEN  = 1000;

// ─── Memoised particle canvas (never re-mounts unless parent unmounts) ─────────
const AnimatedParticles = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    let particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-seed only on resize
      particles = Array.from({ length: Math.min(80, Math.floor(window.innerWidth / 20)) }, () => ({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        radius:  Math.random() * 2 + 1,
        speedX:  (Math.random() - 0.5) * 0.2,
        speedY:  (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,153,0,${p.opacity})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />;
});
AnimatedParticles.displayName = "AnimatedParticles";

// ─── Divider — pure, no props ──────────────────────────────────────────────────
const Divider = memo(({ delay = 0 }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16"
  />
));
Divider.displayName = "Divider";

// ─── Home ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText]       = useState("");
  const [isDeleting, setIsDeleting]             = useState(false);
  const cursorRef = useRef(null);          // DOM ref — no re-render on mouse move

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  // ── Typing effect (stable deps) ──────────────────────────────────────────────
  useEffect(() => {
    const word = words[currentWordIndex];
    let id;

    if (!isDeleting && displayedText.length < word.length) {
      id = setTimeout(() => setDisplayedText(word.slice(0, displayedText.length + 1)), TYPING_SPEED);
    } else if (isDeleting && displayedText.length > 0) {
      id = setTimeout(() => setDisplayedText(word.slice(0, displayedText.length - 1)), DELETING_SPEED);
    } else if (!isDeleting && displayedText.length === word.length) {
      id = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(id);
  }, [displayedText, isDeleting, currentWordIndex]);

  // ── Cursor glow — direct DOM mutation, zero re-renders ───────────────────────
  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      // GPU-composited transform, no layout recalc
      cursorRef.current.style.transform = `translate(${e.clientX - 64}px, ${e.clientY - 64}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9900] via-yellow-500 to-[#FF6B00] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Particle canvas — memoised, never recreated */}
      <AnimatedParticles />

      {/* Background glows — CSS animation, no JS RAF */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="glow-blob glow-blob--yellow" />
        <div className="glow-blob glow-blob--blue"   />
        <div className="glow-blob glow-blob--center" />
      </div>

      {/* Cursor glow — direct DOM, no state */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-32 h-32 bg-[#FF9900] opacity-20 rounded-full blur-3xl will-change-transform"
        style={{ transform: "translate(-9999px,-9999px)" }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto pt-32 z-10">

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 px-5 py-1.5 border-2 border-[#FF9900] text-[#FF9900] rounded-full text-sm tracking-wide backdrop-blur-sm bg-black/30"
        >
          AWS Cloud Club
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
        >
          Build Your Future in{" "}
          <span className="text-[#FF9900] bg-gradient-to-r from-[#FF9900] to-yellow-500 bg-clip-text text-transparent">
            Cloud Computing
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-4xl font-semibold mb-3"
        >
          {displayedText}
          <motion.span
            className="border-r-2 border-[#FF9900] ml-1 inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-lg max-w-2xl text-gray-300"
        >
          AWS Cloud Club empowers students to learn, build, and grow with real-world cloud technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <motion.a
            href="https://chat.whatsapp.com/JV2tA4RqWq9LPkxCJwmcEL"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-gradient-to-r from-[#FF9900] to-[#FF6B00] text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join AWS Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.a>

          <motion.a
            href="/events"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="border border-gray-500 px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:border-[#FF9900]"
          >
            Explore Events
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-12 rounded-full"
        />
      </section>

      <Divider />

      {/* ── AWS LOGO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-8 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          src={awslogo}
          alt="AWS Logo"
          className="max-h-28 md:max-h-36"
          loading="lazy"
          decoding="async"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm mt-4"
        >
          Powered by AWS • Learn industry-grade cloud technologies
        </motion.p>
      </section>

      <Divider delay={0.2} />

      {/* ── IMPACT ───────────────────────────────────────────────────────────── */}
      <section className="relative py-16 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF9900] to-yellow-500 bg-clip-text text-transparent mb-12"
        >
          Our Impact
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-gray-800 group-hover:bg-[#FF9900]/20 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-[#FF9900]" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#FF9900]">
                <Counter target={stat.value} />
              </div>
              <p className="text-gray-300 mt-2 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider delay={0.4} />

      {/* ── WHY JOIN ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF9900] to-yellow-500 bg-clip-text text-transparent mb-12"
        >
          Why Join Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className="group relative overflow-hidden p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9900] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#FF9900]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-[#FF9900]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#FF9900] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider delay={0.6} />

      {/* ── VISION ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <VisionObjective imageSrc={visionImage} />
      </motion.div>

      {/* ── Bottom dots ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-2 py-12"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-2 h-2 rounded-full bg-[#FF9900] opacity-50"
            animate={{ y: [0, -5, 0] }}
            transition={{
              scale: { delay: 0.8 + i * 0.1, type: "spring" },
              y: { duration: 1.5, repeat: Infinity, delay: i * 0.2 },
            }}
          />
        ))}
      </motion.div>

      {/* ── CSS-only background glow animations (replaces 3 JS-driven motion.divs) */}
      <style>{`
        .glow-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(200px);
          pointer-events: none;
          will-change: transform, opacity;
        }
        .glow-blob--yellow {
          width: 700px; height: 700px;
          background: #EAB308;
          opacity: 0.15;
          top: -200px; left: -200px;
          animation: pulse-glow 8s ease-in-out infinite;
        }
        .glow-blob--blue {
          width: 600px; height: 600px;
          background: #3B82F6;
          opacity: 0.15;
          bottom: -200px; right: -200px;
          animation: pulse-glow 10s ease-in-out infinite 2s;
        }
        .glow-blob--center {
          width: 500px; height: 500px;
          background: #FF9900;
          opacity: 0.08;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-glow 12s ease-in-out infinite 1s;
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1);   opacity: 0.15; }
          50%       { transform: scale(1.15); opacity: 0.25; }
        }
        .glow-blob--center {
          animation-name: pulse-glow-center;
        }
        @keyframes pulse-glow-center {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.08; }
          50%       { transform: translate(-50%,-50%) scale(1.15); opacity: 0.16; }
        }
      `}</style>
    </main>
  );
}