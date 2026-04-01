import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Calendar, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Grid, Images } from "lucide-react";

// CloudNova
import CloudNova1 from "../assets/events/CloudNova/CloudNova1.jpg";
import CloudNova2 from "../assets/events/CloudNova/CloudNova2.jpg";
import CloudNova3 from "../assets/events/CloudNova/CloudNova3.jpg";
import CloudNova4 from "../assets/events/CloudNova/CloudNova4.jpg";
import CloudNova5 from "../assets/events/CloudNova/CloudNova5.jpg";
import CloudNova6 from "../assets/events/CloudNova/CloudNova6.jpg";

// SIP_KIET29
import SIP_KIET29_1 from "../assets/events/SIP_KIET29/SIP_KIET29_1.jpeg";
import SIP_KIET29_2 from "../assets/events/SIP_KIET29/SIP_KIET29_2.jpeg";
import SIP_KIET29_3 from "../assets/events/SIP_KIET29/SIP_KIET29_3.jpeg";
import SIP_KIET29_4 from "../assets/events/SIP_KIET29/SIP_KIET29_4.jpeg";
import SIP_KIET29_5 from "../assets/events/SIP_KIET29/SIP_KIET29_5.jpeg";


// CloudFusion_InnoTechKIET
import CloudFusion_InnoTechKIET1 from "../assets/events/CloudFusion_InnotechKIET/CloudFusion_InnoTechKIET1.jpg";
import CloudFusion_InnoTechKIET2 from "../assets/events/CloudFusion_InnotechKIET/CloudFusion_InnoTechKIET2.jpg";
import CloudFusion_InnoTechKIET3 from "../assets/events/CloudFusion_InnotechKIET/CloudFusion_InnoTechKIET3.jpg";
import CloudFusion_InnoTechKIET4 from "../assets/events/CloudFusion_InnotechKIET/CloudFusion_InnoTechKIET4.jpg";
import CloudFusion_InnoTechKIET5 from "../assets/events/CloudFusion_InnotechKIET/CloudFusion_InnoTechKIET5.jpg";
import CloudFusion_InnoTechKIET6 from "../assets/events/CloudFusion_InnotechKIET/CloudFusion_InnoTechKIET6.jpg";

// CloudSprint
import CloudSprint1 from "../assets/events/CloudSprint/CloudSprint1.jpg";
import CloudSprint2 from "../assets/events/CloudSprint/CloudSprint2.jpg";
import CloudSprint3 from "../assets/events/CloudSprint/CloudSprint3.jpg";
import CloudSprint4 from "../assets/events/CloudSprint/CloudSprint4.jpg";
import CloudSprint5 from "../assets/events/CloudSprint/CloudSprint5.jpg";

// Python_Amazon_Q_Developer
import Python_Amazon_Q_Developer1 from "../assets/events/Python_Amazon_Q_Developer/Python_Amazon_Q_Developer1.jpg";
import Python_Amazon_Q_Developer2 from "../assets/events/Python_Amazon_Q_Developer/Python_Amazon_Q_Developer2.jpg";
import Python_Amazon_Q_Developer3 from "../assets/events/Python_Amazon_Q_Developer/Python_Amazon_Q_Developer3.jpg";
import Python_Amazon_Q_Developer4 from "../assets/events/Python_Amazon_Q_Developer/Python_Amazon_Q_Developer4.jpg";
import Python_Amazon_Q_Developer5 from "../assets/events/Python_Amazon_Q_Developer/Python_Amazon_Q_Developer5.jpg";
import Python_Amazon_Q_Developer6 from "../assets/events/Python_Amazon_Q_Developer/Python_Amazon_Q_Developer6.jpg";

// Containerization_101
import Containerization1 from "../assets/events/Containerization_101/Containerization1.jpg";
import Containerization2 from "../assets/events/Containerization_101/Containerization2.jpg";
import Containerization3 from "../assets/events/Containerization_101/Containerization3.jpg";
import Containerization4 from "../assets/events/Containerization_101/Containerization4.jpg";
import Containerization5 from "../assets/events/Containerization_101/Containerization5.jpg";
import Containerization6 from "../assets/events/Containerization_101/Containerization6.jpg";

// AWS_AI_Workshop
import AWS_AI_Workshop1 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop1.jpg";
import AWS_AI_Workshop2 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop2.jpg";
import AWS_AI_Workshop3 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop3.jpg";
import AWS_AI_Workshop4 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop4.jpg";
import AWS_AI_Workshop5 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop5.jpg";
import AWS_AI_Workshop6 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop6.jpg";
import AWS_AI_Workshop7 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop7.jpg";
import AWS_AI_Workshop8 from "../assets/events/AWS_AI_Workshop/AWS_AI_Workshop8.jpg";

// ========== PREVIOUS EVENTS IMAGES (MULTIPLE) ==========

// Event 1
import prevEvent1a from "../assets/events/Previous_Events/event1a.jpg";
import prevEvent1b from "../assets/events/Previous_Events/event1b.jpg";

// Event 2
import prevEvent2a from "../assets/events/Previous_Events/event2a.jpg";
import prevEvent2b from "../assets/events/Previous_Events/event2b.jpg";

// Event 3
import prevEvent3a from "../assets/events/Previous_Events/event3a.jpg";
import prevEvent3b from "../assets/events/Previous_Events/event3b.jpg";
import prevEvent3c from "../assets/events/Previous_Events/event3c.jpg";
import prevEvent3d from "../assets/events/Previous_Events/event3d.jpg";

// Event 4
import prevEvent4a from "../assets/events/Previous_Events/event4a.jpg";
import prevEvent4b from "../assets/events/Previous_Events/event4b.jpg";
import prevEvent4c from "../assets/events/Previous_Events/event4c.jpg";
import prevEvent4d from "../assets/events/Previous_Events/event4d.jpg";

// Event 5
import prevEvent5a from "../assets/events/Previous_Events/event5a.jpg";
import prevEvent5b from "../assets/events/Previous_Events/event5b.jpg";
import prevEvent5c from "../assets/events/Previous_Events/event5c.jpg";
import prevEvent5d from "../assets/events/Previous_Events/event5d.jpg";

// Event 6
import prevEvent6a from "../assets/events/Previous_Events/event6a.jpg";
import prevEvent6b from "../assets/events/Previous_Events/event6b.jpg";

// Event 7
import prevEvent7a from "../assets/events/Previous_Events/event7a.jpg";
import prevEvent7b from "../assets/events/Previous_Events/event7b.jpg";

// Event 8
import prevEvent8a from "../assets/events/Previous_Events/event8a.jpg";
import prevEvent8b from "../assets/events/Previous_Events/event8b.jpg";
import prevEvent8c from "../assets/events/Previous_Events/event8c.jpg";

// Event 9
import prevEvent9a from "../assets/events/Previous_Events/event9a.jpg";
import prevEvent9b from "../assets/events/Previous_Events/event9b.jpg";

// Event 10
import prevEvent10a from "../assets/events/Previous_Events/event10a.jpg";
import prevEvent10b from "../assets/events/Previous_Events/event10b.jpg";

/* ─────────────────── DATA (Unified) ─────────────────── */

const unifiedEvents = [
  // ========== TIMELINE EVENTS (2025-2026) ==========
  {
    title: "Student Induction Program",
    date: "12 September 2025",
    focus: ["Club introduction & roadmap", "Cloud & DevOps awareness", "Orientation for first-year students"],
    gallery: [SIP_KIET29_1, SIP_KIET29_2, SIP_KIET29_3, SIP_KIET29_4, SIP_KIET29_5],
    type: "timeline",
  },
  {
    title: "CloudNova",
    date: "23–25 September 2025",
    focus: ["AWS Cloud Fundamentals", "Linux for Cloud Engineers", "Compute, Storage & Networking", "Hands-on Labs"],
    gallery: [CloudNova1, CloudNova2, CloudNova3, CloudNova4, CloudNova5, CloudNova6],
    type: "timeline",
  },
  {
    title: "Innotech KIET – CloudFusion",
    date: "15 November 2025",
    focus: ["Cloud-based problem statements", "Team competition", "Practical AWS thinking"],
    gallery: [CloudFusion_InnoTechKIET1, CloudFusion_InnoTechKIET2, CloudFusion_InnoTechKIET3, CloudFusion_InnoTechKIET4, CloudFusion_InnoTechKIET5, CloudFusion_InnoTechKIET6],
    type: "timeline",
  },
  {
    title: "Build AI Games with Python × Amazon Q",
    date: "28 November 2025",
    focus: ["Python for game logic", "Amazon Q introduction", "AI-assisted development"],
    gallery: [Python_Amazon_Q_Developer1, Python_Amazon_Q_Developer2, Python_Amazon_Q_Developer3, Python_Amazon_Q_Developer4, Python_Amazon_Q_Developer5, Python_Amazon_Q_Developer6],
    type: "timeline",
  },
  {
    title: "Containerization 101",
    date: "19–20 February 2026",
    focus: ["Containers & Docker fundamentals", "Docker CLI hands-on", "Containerizing applications"],
    gallery: [Containerization1, Containerization2, Containerization3, Containerization4, Containerization5, Containerization6],
    type: "timeline",
  },
  {
    title: "CloudSprint DevOps Challenge",
    date: "25–26 February 2026",
    focus: ["AWS Cloud & DevOps fundamentals", "Automation and real-world problem solving", "Team-based challenges"],
    gallery: [CloudSprint1, CloudSprint2, CloudSprint3, CloudSprint4, CloudSprint5],
    type: "timeline",
  },
  {
    title: "AWS AI Developer Workshop",
    date: "23–25 March 2026",
    focus: ["Build live AI apps on AWS", "Web + AI + Cloud integration", "Resume-ready project"],
    gallery: [AWS_AI_Workshop1, AWS_AI_Workshop2, AWS_AI_Workshop3, AWS_AI_Workshop4, AWS_AI_Workshop5, AWS_AI_Workshop6, AWS_AI_Workshop7, AWS_AI_Workshop8],
    type: "timeline",
  },

  // ========== PREVIOUS EVENTS (2024-2025) ==========

  // 🔹 Event 8 (Oldest)
  {
    title: "AWS Skill Builder & Cloud Quest",
    date: "October 17, 2024",
    focus: [
      "Gamified learning",
      "AWS skill building",
      "Real-world scenarios",
      "Cloud certification journey"
    ],
    gallery: [prevEvent8a, prevEvent8b, prevEvent8c],
    type: "previous"
  },

  // 🔹 Event 9
  {
    title: "AWS Cloud Club Orientation – KIET (Batch 2028)",
    date: "November 29, 2024",
    focus: [
      "Club introduction",
      "Cloud roadmap",
      "Community onboarding",
      "Networking session"
    ],
    gallery: [prevEvent9a, prevEvent9b],
    type: "previous"
  },

  // 🔹 Event 1
  {
    title: "AWS Session – CSE Section A (Batch 2027)",
    date: "April 22, 2025",
    focus: [
      "Cloud computing basics",
      "AWS services (EC2, S3, IAM, VPC)",
      "Live EC2 demo",
      "Certification & placement roadmap"
    ],
    gallery: [prevEvent1a, prevEvent1b],
    type: "previous"
  },

  // 🔹 Event 2
  {
    title: "AWS Session – CSE Section C (Batch 2027)",
    date: "April 23, 2025",
    focus: [
      "Cloud fundamentals",
      "AWS introduction & use cases",
      "Hands-on EC2 demo",
      "Career guidance"
    ],
    gallery: [prevEvent2a, prevEvent2b],
    type: "previous"
  },

  // 🔹 Event 3
  {
    title: "AWS Session – CSE Section B (Batch 2027)",
    date: "April 24, 2025",
    focus: [
      "Cloud concepts",
      "AWS core services",
      "Practical EC2 session",
      "Industry insights"
    ],
    gallery: [prevEvent3a, prevEvent3b, prevEvent3c, prevEvent3d],
    type: "previous"
  },

  // 🔹 Event 4
  {
    title: "AWS Session – CSE Section D (Batch 2027)",
    date: "April 25, 2025",
    focus: [
      "AWS fundamentals",
      "Core services overview",
      "Live server setup",
      "Hands-on learning"
    ],
    gallery: [prevEvent4a,prevEvent4b,prevEvent4c,prevEvent4d],
    type: "previous"
  },

  // 🔹 Event 5
  {
    title: "Introduction to Cloud Computing Session",
    date: "April 26, 2025",
    focus: [
      "Cloud fundamentals",
      "Real-world applications",
      "AWS introduction",
      "Interactive quiz & rewards"
    ],
    gallery: [prevEvent5a,prevEvent5b,prevEvent5c,prevEvent5d],
    type: "previous"
  },

  // 🔹 Event 6
  {
    title: "Cloud Computing Workshop – CSIT Section A",
    date: "May 21, 2025",
    focus: [
      "Cloud basics",
      "AWS use cases",
      "EC2 live demo",
      "Certification roadmap"
    ],
    gallery: [prevEvent6a,prevEvent6b],
    type: "previous"
  },

  // 🔹 Event 7
  {
    title: "Cloud Computing Workshop – CSIT Section C",
    date: "May 22, 2025",
    focus: [
      "Cloud fundamentals",
      "AWS services",
      "Hands-on EC2 session",
      "Career & certifications"
    ],
    gallery: [prevEvent7a,prevEvent7b],
    type: "previous"
  },

  // 🔹 Event 10 (Latest)
  {
    title: "AWS Cloud Club Orientation – KIET (Batch 2029)",
    date: "October 30, 2025",
    focus: [
      "Club vision & roadmap",
      "Leadership introduction",
      "Future initiatives",
      "Community growth"
    ],
    gallery: [prevEvent10a,prevEvent10b],
    type: "previous"
  }

];


/* ─────────────────── PREMIUM ANIMATED BACKGROUND ─────────────────── */
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.2 + 0.05,
        });
      }
    };
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 80) {
          const angle = Math.atan2(dy, dx);
          const force = (80 - distance) / 80;
          particle.x -= Math.cos(angle) * force * 1;
          particle.y -= Math.sin(angle) * force * 1;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 153, 0, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

/* ─────────────────── SECTION HEADER (Premium) ─────────────────── */
const SectionHeader = ({ title, badge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="inline-block px-4 py-1 border border-[#FF9900] text-[#FF9900] rounded-full text-sm mb-4"
      >
        {badge}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-[#FF9900]"
      >
        {title}
      </motion.h2>
      
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "60px" }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-1 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-4 rounded-full"
      />
    </motion.div>
  );
};

/* ─────────────────── CARD GRID (Staggered) ─────────────────── */
const CardGrid = ({ children, delay = 0.05 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
          },
        },
      }}
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────── SHARED LIGHTBOX (Premium) ─────────────────── */
const Lightbox = ({ images, startIndex = 0, title = "", subtitle = "", onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const total = images.length;

  const next = useCallback(() => { setCurrent(p => (p + 1) % total); setIsZoomed(false); }, [total]);
  const prev = useCallback(() => { setCurrent(p => (p - 1 + total) % total); setIsZoomed(false); }, [total]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") { if (isZoomed) setIsZoomed(false); else onClose(); }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isZoomed, next, prev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ background: "rgba(5,8,18,0.96)", backdropFilter: "blur(24px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 36 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 30, stiffness: 340 }}
        className="relative flex flex-col w-full rounded-3xl overflow-hidden"
        style={{
          maxWidth: 980,
          maxHeight: "94vh",
          background: "linear-gradient(150deg,#111827 0%,#0d1117 60%,#111827 100%)",
          border: "1px solid rgba(255,153,0,0.18)",
          boxShadow: "0 48px 140px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,153,0,0.1)" }}>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">{title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              {subtitle && (
                <>
                  <Calendar size={11} className="text-[#FF9900]" />
                  <span className="text-xs text-gray-400">{subtitle}</span>
                  <span className="text-gray-700 text-xs">·</span>
                </>
              )}
              <span className="text-xs text-gray-500 tabular-nums">{current + 1} / {total}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setShowGrid(g => !g)}
              className="p-2 rounded-xl"
              style={{ background: showGrid ? "rgba(255,153,0,0.18)" : "rgba(255,255,255,0.06)" }}
              title="All photos">
              <Grid size={15} className={showGrid ? "text-[#FF9900]" : "text-gray-400"} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setIsZoomed(z => !z)}
              className="p-2 rounded-xl"
              style={{ background: isZoomed ? "rgba(255,153,0,0.18)" : "rgba(255,255,255,0.06)" }}
              title="Zoom">
              {isZoomed ? <ZoomOut size={15} className="text-[#FF9900]" /> : <ZoomIn size={15} className="text-gray-400" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={onClose} className="p-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.06)" }}>
              <X size={15} className="text-gray-400" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showGrid ? (
            <motion.div key="grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-y-auto p-4 flex-1"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,153,0,0.3) transparent" }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {images.map((img, idx) => (
                  <motion.button key={idx}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setCurrent(idx); setShowGrid(false); setIsZoomed(false); }}
                    className="relative aspect-square rounded-xl overflow-hidden"
                    style={{
                      border: current === idx ? "2px solid #FF9900" : "2px solid rgba(255,255,255,0.05)",
                      boxShadow: current === idx ? "0 0 18px rgba(255,153,0,0.45)" : "none",
                      background: "#0d1117",
                    }}>
                    <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-contain" />
                    {current === idx && (
                      <div className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "rgba(255,153,0,0.12)" }}>
                        <div className="w-5 h-5 rounded-full bg-[#FF9900] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.6)" }}>
                      {idx + 1}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="viewer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col flex-1 min-h-0"
            >
              <div
                className="relative flex items-center justify-center flex-1 overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at center,#0f1420 0%,#080b12 100%)",
                  minHeight: 320,
                  cursor: isZoomed ? "zoom-out" : "zoom-in",
                }}
                onMouseDown={e => setDragStart(e.clientX)}
                onMouseUp={e => {
                  if (dragStart !== null) {
                    const d = e.clientX - dragStart;
                    if (Math.abs(d) > 40) { d < 0 ? next() : prev(); }
                    setDragStart(null);
                  }
                }}
                onClick={() => setIsZoomed(z => !z)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={images[current]}
                    alt={`Photo ${current + 1}`}
                    initial={{ opacity: 0, scale: 0.94, x: 28 }}
                    animate={{ opacity: 1, scale: isZoomed ? 1.65 : 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.94, x: -28 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="select-none pointer-events-none"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "58vh",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />
                </AnimatePresence>

                {total > 1 && (
                  <>
                    <motion.button
                      animate={{ opacity: 0.65 }}
                      whileHover={{ opacity: 1, scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={e => { e.stopPropagation(); prev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-2xl"
                      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <ChevronLeft size={20} className="text-white" />
                    </motion.button>
                    <motion.button
                      animate={{ opacity: 0.65 }}
                      whileHover={{ opacity: 1, scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={e => { e.stopPropagation(); next(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-2xl"
                      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <ChevronRight size={20} className="text-white" />
                    </motion.button>
                  </>
                )}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
                  {images.map((_, idx) => (
                    <motion.button key={idx}
                      onClick={e => { e.stopPropagation(); setCurrent(idx); setIsZoomed(false); }}
                      animate={{ width: current === idx ? 22 : 6, opacity: current === idx ? 1 : 0.35 }}
                      transition={{ duration: 0.22 }}
                      className="h-1.5 rounded-full"
                      style={{ background: current === idx ? "#FF9900" : "rgba(255,255,255,0.55)" }}
                    />
                  ))}
                </div>

                <div className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-lg hidden sm:block"
                  style={{ background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}>
                  ← → navigate · Esc close
                </div>
              </div>

              <div className="flex-shrink-0 px-4 py-3 overflow-x-auto"
                style={{ borderTop: "1px solid rgba(255,153,0,0.08)", scrollbarWidth: "thin", scrollbarColor: "rgba(255,153,0,0.3) transparent" }}>
                <div className="flex gap-2" style={{ width: "max-content", margin: "0 auto" }}>
                  {images.map((img, idx) => (
                    <motion.button key={idx}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setCurrent(idx); setIsZoomed(false); }}
                      className="flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{
                        width: 58, height: 58,
                        background: "#0d1117",
                        border: current === idx ? "2px solid #FF9900" : "2px solid rgba(255,255,255,0.05)",
                        boxShadow: current === idx ? "0 0 14px rgba(255,153,0,0.5)" : "none",
                        opacity: current === idx ? 1 : 0.45,
                        transition: "border 0.15s, box-shadow 0.15s, opacity 0.15s",
                      }}>
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────── UNIFIED EVENT CARD (Premium) ─────────────────── */
const UnifiedEventCard = ({ event, index, onClick }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: index * 0.05
        }
      }
    }}
    whileHover={{
      scale: 1.02,
      y: -4,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div
      className="relative rounded-2xl overflow-hidden h-full"
      style={{
        background: "linear-gradient(145deg,#1a1f2e 0%,#111827 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = "1px solid rgba(255,153,0,0.35)";
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(255,153,0,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <motion.img
          src={event.gallery[0]}
          alt={event.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top,rgba(17,24,39,0.85) 0%,transparent 55%)" }} />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.75)" }}>
          <Calendar size={11} className="text-[#FF9900]" />
          {event.date}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.55)" }}>
          <Images size={10} className="text-[#FF9900]" />
          {event.gallery.length}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-[#FF9900]"
          style={{ color: "#f9fafb" }}>
          {event.title}
        </h3>
        <ul className="space-y-1.5 mb-4">
          {event.focus.slice(0, 3).map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#9ca3af" }}>
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#FF9900" }} />
              <span className="line-clamp-1">{pt}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#FF9900" }}>
          View Gallery
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
    restDelta: 0.001
  });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Filter events by type
  const timelineEvents = unifiedEvents.filter(e => e.type === "timeline");
  const previousEventsList = unifiedEvents.filter(e => e.type === "previous");

  return (
    <main className="relative bg-gray-900 text-white py-16 px-4 md:py-20 md:px-6 min-h-screen">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9900] to-[#FF6B00] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="w-[500px] h-[500px] bg-yellow-500 opacity-20 blur-[150px] absolute top-[-150px] left-[-150px] animate-pulse-slow" />
        <div className="w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[150px] absolute bottom-[-100px] right-[-100px] animate-pulse-slow animation-delay-2000" />
        <div className="w-[300px] h-[300px] bg-[#FF9900] opacity-10 blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block px-4 py-1 border border-[#FF9900] text-[#FF9900] rounded-full text-sm mb-4"
          >
            AWS Cloud Club
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-[#FF9900] to-white bg-clip-text text-transparent bg-[length:200%] animate-shimmer"
          >
            Our Events
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-400 text-base max-w-2xl mx-auto"
          >
            Workshops, bootcamps, and experiences that shaped our community
          </motion.p>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "80px", opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-5 rounded-full"
          />
        </motion.div>

        {/* TIMELINE SECTION */}
        <SectionHeader title="Event Timeline" badge="Journey" />
        
        <CardGrid delay={0.06}>
          {timelineEvents.map((event, i) => (
            <UnifiedEventCard key={i} event={event} index={i} onClick={() => setSelectedEvent(event)} />
          ))}
        </CardGrid>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full my-16"
        />

        {/* PREVIOUS EVENTS SECTION */}
        <SectionHeader title="Previous Events" badge="Memories" />
        
        <CardGrid delay={0.04}>
          {previousEventsList.map((event, i) => (
            <UnifiedEventCard key={i} event={event} index={i} onClick={() => setSelectedEvent(event)} />
          ))}
        </CardGrid>

        {/* Decorative Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center mt-12"
        >
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className="w-1.5 h-1.5 rounded-full bg-[#FF9900] opacity-40"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* UNIFIED LIGHTBOX */}
      <AnimatePresence>
        {selectedEvent && (
          <Lightbox
            images={selectedEvent.gallery}
            startIndex={0}
            title={`${selectedEvent.title} — Gallery`}
            subtitle={selectedEvent.date}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}