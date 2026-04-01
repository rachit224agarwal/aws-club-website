import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Code2, Cloud, Rocket, Sparkles, ArrowRight, Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.1]);

  // Tech stack icons for coming soon section
  const techStack = [
    { name: "AWS", icon: "☁️", color: "#FF9900" },
    { name: "DevOps", icon: "⚙️", color: "#4CAF50" },
    { name: "Python", icon: "🐍", color: "#3776AB" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Docker", icon: "🐳", color: "#2496ED" },
    { name: "Kubernetes", icon: "⎈", color: "#326CE5" },
  ];

  // Animated particles for background
  const AnimatedParticles = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      let particles = [];
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      };
      
      const initParticles = () => {
        particles = [];
        const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.2,
          });
        }
      };
      
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
      };
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />;
  };

  // Floating icons animation
  const FloatingIcon = ({ icon, delay, x, y }) => {
    return (
      <motion.div
        className="absolute text-3xl md:text-4xl opacity-10 pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
        initial={{ y: 0, rotate: 0 }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>
    );
  };

  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9900] via-yellow-500 to-[#FF6B00] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Animated Background */}
      <AnimatedParticles />
      
      {/* Floating Gradient Orbs with Parallax */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="w-[700px] h-[700px] bg-gradient-to-r from-orange-500 to-yellow-500 opacity-20 blur-[200px] absolute top-[-250px] left-[-200px] animate-pulse-slow" />
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-[200px] absolute bottom-[-200px] right-[-200px] animate-pulse-slow animation-delay-2000" />
        <div className="w-[500px] h-[500px] bg-gradient-to-r from-[#FF9900] to-orange-600 opacity-15 blur-[180px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" />
      </motion.div>

      {/* Floating Tech Icons */}
      <FloatingIcon icon="☁️" delay={0} x={10} y={20} />
      <FloatingIcon icon="⚙️" delay={1.5} x={85} y={15} />
      <FloatingIcon icon="🐍" delay={0.8} x={15} y={70} />
      <FloatingIcon icon="⚛️" delay={2} x={90} y={80} />
      <FloatingIcon icon="🐳" delay={1.2} x={5} y={45} />
      <FloatingIcon icon="⎈" delay={2.5} x={92} y={50} />
      <FloatingIcon icon="🚀" delay={0.5} x={50} y={10} />
      <FloatingIcon icon="💻" delay={1.8} x={45} y={85} />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Branding with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block px-5 py-2 border-2 border-[#FF9900] text-[#FF9900] rounded-full text-sm font-semibold mb-6 tracking-wide backdrop-blur-sm bg-black/30 shadow-lg"
          >
            AWS Cloud Club
          </motion.div>

          {/* Title with Gradient Animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#FF9900] to-white bg-clip-text text-transparent bg-[length:200%] animate-shimmer"
          >
            Projects
          </motion.h1>

          {/* Coming Soon Badge with Pulse Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF9900] rounded-full blur-xl opacity-50 animate-ping" />
              <div className="relative px-5 py-2 bg-gradient-to-r from-[#FF9900]/20 to-[#FF9900]/10 border border-[#FF9900]/40 text-[#FF9900] rounded-full text-sm font-medium backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="animate-pulse" />
                  Coming Soon
                  <Sparkles size={14} className="animate-pulse" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Description with Staggered Words */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-300 text-lg md:text-xl mb-6 leading-relaxed max-w-2xl mx-auto"
          >
            We are building real-world AWS projects focused on cloud, DevOps, and AI.
            This section will showcase hands-on work by our community.
          </motion.p>

          {/* Tech Stack Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-sm text-gray-400 mb-4">Powered by</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.05, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Hint with Animated Arrow */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            Stay tuned — exciting projects and case studies will be published here.
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.p>

          {/* Animated Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 1.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-12 rounded-full"
          />

          {/* Decorative Elements - FIXED: Merged duplicate animate props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex justify-center gap-2 mt-12"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  scaleY: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  scale: { delay: 2 + i * 0.1, type: "spring" },
                  scaleY: { duration: 1.5, repeat: Infinity, delay: i * 0.2 },
                  opacity: { duration: 1.5, repeat: Infinity, delay: i * 0.2 }
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#FF9900]"
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Interactive CTA Card (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-sm text-gray-400 hover:text-[#FF9900] transition-colors"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Code2 size={14} />
          <span>Want to contribute? Join our community</span>
          <ExternalLink size={12} />
        </motion.a>
      </motion.div>
    </main>
  );
}