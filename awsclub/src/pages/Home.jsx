import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import awslogo from "../assets/awslogo.png";
import Counter from "../components/Counter";
import VisionObjective from "../components/VisionObjective";
import visionImage from "../assets/ClubLogoP.png";
import { ArrowRight, ChevronRight, Sparkles, Users, Code2, Award, Rocket, TrendingUp } from "lucide-react";

const words = [
  "Cloud",
  "Compute",
  "Community",
  "Collaboration",
  "Career",
  "Certification",
  "Creativity",
];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const delayBetweenWords = 1000;

  // Typing Effect
  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout;

    if (!isDeleting && displayedText.length < word.length) {
      timeout = setTimeout(() => {
        setDisplayedText(word.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(word.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && displayedText.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  // Cursor Glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated Background Particles
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
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
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

  const benefits = [
    {
      icon: Code2,
      title: "Hands-on Learning",
      description: "Work on real AWS projects and gain practical cloud experience.",
      color: "#FF9900"
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with peers, mentors, and industry professionals.",
      color: "#3B82F6"
    },
    {
      icon: Rocket,
      title: "Opportunities",
      description: "Access hackathons, internships, and career-building events.",
      color: "#10B981"
    }
  ];

  const impactStats = [
    { value: 60, label: "Active Members+", icon: Users },
    { value: 50, label: "Workshops Conducted", icon: Code2 },
    { value: 45, label: "AWS Certifications", icon: Award },
    { value: 100, label: "Projects Built", icon: TrendingUp }
  ];

  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9900] via-yellow-500 to-[#FF6B00] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Animated Background */}
      <AnimatedParticles />
      
      {/* Background Glow with Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-[700px] h-[700px] bg-yellow-500 opacity-20 rounded-full blur-[200px] absolute top-[-200px] left-[-200px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[200px] absolute bottom-[-200px] right-[-200px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-[500px] h-[500px] bg-[#FF9900] opacity-10 rounded-full blur-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-32 h-32 bg-[#FF9900] opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto pt-32 z-10">
        
        {/* Branding with Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 px-5 py-1.5 border-2 border-[#FF9900] text-[#FF9900] rounded-full text-sm tracking-wide backdrop-blur-sm bg-black/30"
        >
          AWS Cloud Club
        </motion.div>

        {/* Heading */}
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

        {/* Typing */}
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
          ></motion.span>
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-lg max-w-2xl text-gray-300"
        >
          AWS Cloud Club empowers students to learn, build, and grow with real-world cloud technologies.
        </motion.p>

        {/* CTA Buttons */}
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

        {/* Decorative Element */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-12 rounded-full"
        />
      </section>

      {/* Divider with Animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16"
      />

      {/* AWS LOGO */}
      <section className="relative py-8 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          src={awslogo}
          alt="AWS Logo"
          className="max-h-28 md:max-h-36"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm mt-4"
        >
          Powered by AWS • Learn industry-grade cloud technologies
        </motion.p>
      </section>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16"
      />

      {/* IMPACT */}
      <section className="relative py-16 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
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

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16"
      />

      {/* WHY JOIN */}
      <section className="relative py-16 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
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
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16"
      />

      {/* VISION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <VisionObjective imageSrc={visionImage} />
      </motion.div>

      {/* Decorative Bottom Dots - FIXED: Merged duplicate transition props */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-2 py-12"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-2 h-2 rounded-full bg-[#FF9900] opacity-50"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              scale: { delay: 0.8 + i * 0.1, type: "spring" },
              y: { duration: 1.5, repeat: Infinity, delay: i * 0.2 }
            }}
          />
        ))}
      </motion.div>
    </main>
  );
}