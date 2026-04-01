import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import MemberCard from "../components/MemberCard";

// Images
import AnkurSir from "../assets/people/Ankur_Sir.jpeg";
import raunak from "../assets/people/raunak.jpg";
import p from "../assets/people/p.jpg";
import kunal from "../assets/people/kunal.jpg";
import rachit from "../assets/people/rachit.jpg";
import prapti from "../assets/people/prapti.jpg";
import rishi from "../assets/people/rishi.jpg";
import ghanatva from "../assets/people/ghanatva.jpg";
import amrit from "../assets/people/amrit.jpg";
import ayush from "../assets/people/ayush.jpg";
import ashutosh from "../assets/people/ashutosh.jpg";
import shreya from "../assets/people/shreya.jpg";
import subrat from "../assets/people/subrat.jpg";
import rishabh from "../assets/people/rishabh.jpeg";
import sugandh from "../assets/people/sugandh.jpg";
import ramit from "../assets/people/ramit.png";
import aditi from "../assets/people/aditi.jpeg";
import muskan from "../assets/people/muskan.jpeg";
import arnav from "../assets/people/arnav.jpg";

/* ---------------- CORE TEAM ---------------- */
const coreTeam = [
  { name: "Dr. Ankur Bhardwaj", role: "Faculty Coordinator", image: AnkurSir, linkedin: "https://www.linkedin.com/in/dr-ankur-bhardwaj-61ba5154/" },
  { name: "Ghanatva Thakaran", role: "Mentor", image: ghanatva, linkedin: "https://www.linkedin.com/in/ghanatava/", github: "https://github.com/ghanatava" },
  { name: "Prapti Sharma", role: "Founder & Mentor", image: prapti, linkedin: "https://www.linkedin.com/in/prapti-sharma-796080257/", github: "https://github.com/praptisharma28" },
  { name: "Kunal Thalautiya", role: "Founder & President", image: kunal, linkedin: "https://www.linkedin.com/in/kunal-thalautiya-238a17242/", github: "https://github.com/Kunalkthalautiya" },
  { name: "Pravira Shukla", role: "Vice President", image: p, linkedin: "https://www.linkedin.com/in/pravirashukla/", github: "https://github.com/pravirashukla" },
  { name: "Raunak Kushwaha", role: "Operation Lead", image: raunak, linkedin: "https://www.linkedin.com/in/raunak-kushwaha-1b22372a8/", github: "https://github.com/Raunakushwa" },
  { name: "Rachit Agarwal", role: "Community Manager", image: rachit, linkedin: "https://www.linkedin.com/in/rachit-agarwal-a52924282/", github: "https://github.com/rachit224agarwal" },
  { name: "Rishi Raman Sinha", role: "Technical Lead", image: rishi, linkedin: "https://www.linkedin.com/in/rishi-raman-sinha-1714742a2/", github: "https://github.com/rishiraman27" },
];

/* ---------------- MEMBERS ---------------- */
const teamMembers = [
  { name: "Subrat Dwivedi", role: "Member", image: subrat, linkedin: "https://www.linkedin.com/in/subrat-dwivedi-977144328/", github: "https://github.com/Subrat-Dwivedi-22" },
  { name: "Ashutosh Shukla", role: "Member", image: ashutosh, linkedin: "https://www.linkedin.com/in/ashutosh-shukla-4b8363322", github: "https://github.com/Shukla2341" },
  { name: "Ayush Rao Chaudhary", role: "Member", image: ayush, linkedin: "https://www.linkedin.com/in/ask99ayush/", github: "https://github.com/Ask99Ayush" },
  { name: "Shreya Baranwal", role: "Member", image: shreya, linkedin: "https://www.linkedin.com/in/shreya-baranwal-1103802a5", github: "https://github.com/shreyaabaranwal" },
  { name: "Amrit Seth", role: "Member", image: amrit, linkedin: "https://www.linkedin.com/in/amrit-seth-702520315", github: "https://github.com/amritseth" },
  { name: "Rishabh Kumar", role: "Member", image: rishabh, linkedin: "https://www.linkedin.com/in/rishabh-kumar-a072392aa", github: "https://github.com/Rishabh-kumar45" },
  { name: "Sugandh Garg", role: "Member", image: sugandh, linkedin: "https://www.linkedin.com/in/sugandh-garg-14a51b204", github: "https://github.com/sugandhgarg03" },
  { name: "Ramit Gupta", role: "Member", image: ramit, linkedin: "https://www.linkedin.com/in/ramit-gupta23/", github: "https://github.com/Ramit-Gupta23" },
  { name: "Aditi Narang", role: "Member", image: aditi, linkedin: "https://www.linkedin.com/in/aditiinarang/", github: "https://github.com/AditiiNarang" },
  { name: "Muskan Pahwa", role: "Member", image: muskan, linkedin: "https://www.linkedin.com/in/muskan-pahwa-624b61326/", github: "https://github.com/Muskan000112" },
  { name: "Arnav Gupta", role: "Member", image: arnav, linkedin: "https://www.linkedin.com/in/arnav-gupta-a916292a0/", github: "https://github.com/arnav-gupta-303" },
];

/* ---------------- SMOOTH ANIMATED BACKGROUND ---------------- */
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

/* ---------------- SMOOTH SECTION HEADER ---------------- */
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

/* ---------------- SMOOTH CARD GRID ---------------- */
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
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
    >
      {children}
    </motion.div>
  );
};

/* ---------------- STATS COUNTER ---------------- */
const StatsSection = () => {
  const [counts, setCounts] = useState({ core: 0, members: 0 });
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const coreTarget = coreTeam.length;
          const membersTarget = teamMembers.length;
          let coreCurrent = 0;
          let membersCurrent = 0;
          
          const interval = setInterval(() => {
            if (coreCurrent < coreTarget) coreCurrent++;
            if (membersCurrent < membersTarget) membersCurrent++;
            setCounts({ core: coreCurrent, members: membersCurrent });
            if (coreCurrent >= coreTarget && membersCurrent >= membersTarget) {
              clearInterval(interval);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mt-12 mb-16 p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700"
    >
      <div className="text-center">
        <motion.div 
          className="text-3xl md:text-4xl font-bold text-[#FF9900]"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {counts.core}
        </motion.div>
      </div>
      <div className="text-center">
        <motion.div 
          className="text-3xl md:text-4xl font-bold text-[#FF9900]"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          {counts.members}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function Members() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    mass: 0.8,
    restDelta: 0.001
  });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.08, 0.05]);

  return (
    <main className="relative bg-gray-900 text-white py-16 px-4 md:py-20 md:px-6">
      
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
            Meet Our Team
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-400 text-base max-w-2xl mx-auto"
          >
            The people building, leading, and growing the AWS Cloud Club community.
          </motion.p>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "80px", opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-5 rounded-full"
          />
        </motion.div>
        
        
        {/* CORE TEAM */}
        <SectionHeader title="Core Team" badge="Leadership" />
        
        <CardGrid delay={0.06}>
          {coreTeam.map((member, index) => (
            <motion.div
              key={index}
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
              className="group"
            >
              <MemberCard {...member} />
            </motion.div>
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

        {/* MEMBERS */}
        <SectionHeader title="Team Members" badge="Community" />
        
        <CardGrid delay={0.04}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, rotateX: -10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 180,
                    damping: 18,
                    delay: index * 0.03
                  }
                }
              }}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group"
            >
              <MemberCard {...member} />
            </motion.div>
          ))}
        </CardGrid>
        
        {/* Decorative Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center mt-16"
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
    </main>
  );
}