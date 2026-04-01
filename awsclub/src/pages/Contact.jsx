import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, Instagram, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const formRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.8 });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.message.trim()) errors.message = "Message is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setError("Please fix the errors before submitting");
      setTimeout(() => setError(""), 4000);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    // Get environment variables with fallbacks for development
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_default";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_default";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_default";
    
    // Check if EmailJS is properly configured
    if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      console.warn("EmailJS not configured. Using fallback mode.");
      // Simulate successful send in development
      setTimeout(() => {
        setSuccess("Message sent successfully! (Demo Mode)");
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        setTimeout(() => setSuccess(""), 5000);
      }, 1000);
      return;
    }

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      
      if (result.status === 200) {
        setSuccess("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(""), 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setError("Failed to send message. Please try again or contact us directly via email.");
      setTimeout(() => setError(""), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/aws-cloud-club-kiet",
      label: "LinkedIn",
      color: "#0077b5"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/aws_cloudclubkiet",
      label: "Instagram",
      color: "#E4405F"
    }
  ];

  const contactInfo = [
    { icon: MapPin, text: "KIET ( Deemed To Be University )", delay: 0.1, link: "https://maps.app.goo.gl/WT9i7216vyEPM3KP8" },
    { icon: Phone, text: "+91 9557915111", delay: 0.2, link: "tel:+919557915111" },
    { icon: Mail, text: "awscloudclubkiet@gmail.com", delay: 0.3, link: "mailto:awscloudclubkiet@gmail.com" }
  ];

  // Animated Background Particles
  const Particles = () => {
    const [particles, setParticles] = useState([]);
    
    useEffect(() => {
      const newParticles = Array.from({ length: 30 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    }, []);
    
    return (
      <>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full"
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{
              y: [particle.y, particle.y - 100, particle.y],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </>
    );
  };

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-24 px-6 overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9900] via-[#FF6B00] to-[#FF9900] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-orange-500 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF9900] rounded-full blur-[160px]"
        />
        
        {/* Animated Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Particles */}
        <Particles />
      </div>

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block px-4 py-1 border border-[#FF9900] text-[#FF9900] rounded-full text-sm mb-4 tracking-wide uppercase"
        >
          AWS Cloud Club
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#FF9900] to-white bg-clip-text text-transparent bg-[length:200%] animate-shimmer"
        >
          Get in Touch
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto text-lg"
        >
          Have questions, ideas, or want to collaborate? Reach out to the AWS Cloud Club team.
        </motion.p>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent mx-auto mt-6 rounded-full"
        />
      </motion.div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start relative z-10">
        
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-800/40 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-[#FF9900]/5 transition-all duration-500"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-semibold mb-6 text-[#FF9900] flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-[#FF9900]/10">
              <Send size={20} />
            </div>
            Send a Message
          </motion.h2>

          <AnimatePresence mode="wait">
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 p-4 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">{success}</span>
                </div>
              </motion.div>
            )}
            
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-3 rounded-xl bg-gray-700/50 border transition-all duration-300 outline-none ${
                    validationErrors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600 focus:border-[#FF9900]'
                  } focus:ring-2 focus:ring-[#FF9900]/30 hover:bg-gray-700/70`}
                />
                {validationErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {validationErrors.name}
                  </motion.p>
                )}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'name' && !validationErrors.name ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-3 rounded-xl bg-gray-700/50 border transition-all duration-300 outline-none ${
                    validationErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600 focus:border-[#FF9900]'
                  } focus:ring-2 focus:ring-[#FF9900]/30 hover:bg-gray-700/70`}
                />
                {validationErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {validationErrors.email}
                  </motion.p>
                )}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'email' && !validationErrors.email ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows="6"
                className={`w-full p-3 rounded-xl bg-gray-700/50 border transition-all duration-300 outline-none resize-none ${
                  validationErrors.message 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-600 focus:border-[#FF9900]'
                } focus:ring-2 focus:ring-[#FF9900]/30 hover:bg-gray-700/70`}
              />
              {validationErrors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {validationErrors.message}
                </motion.p>
              )}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF9900] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'message' && !validationErrors.message ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-[#FF9900] to-[#FF6B00] hover:shadow-lg hover:shadow-[#FF9900]/30 text-black font-semibold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-2"
            >
              <CheckCircle size={12} />
              We usually respond within 24 hours
            </motion.p>
          </form>
        </motion.div>

        {/* CONTACT INFO */}
        <div className="flex flex-col gap-6">
          
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gray-800/40 backdrop-blur-md p-7 rounded-2xl border border-gray-700/50 hover:border-[#FF9900]/20 transition-all duration-500 group"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl font-semibold mb-6 text-[#FF9900] flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-[#FF9900]/10">
                <MapPin size={20} />
              </div>
              Contact Information
            </motion.h2>

            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link || "#"}
                  target={item.link ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + item.delay }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 group/item cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-gray-700/50 group-hover/item:bg-[#FF9900]/20 transition-all duration-300">
                    <item.icon className="text-[#FF9900]" size={20} />
                  </div>
                  <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gray-800/40 backdrop-blur-md p-7 rounded-2xl border border-gray-700/50 hover:border-[#FF9900]/20 transition-all duration-500"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl font-semibold mb-6 text-[#FF9900] flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-[#FF9900]/10">
                <Instagram size={20} />
              </div>
              Connect With Us
            </motion.h2>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.15,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="p-4 rounded-xl bg-gray-700/50 hover:bg-gradient-to-br hover:from-[#FF9900]/20 hover:to-[#FF6B00]/20 transition-all duration-300">
                    <social.icon 
                      size={26} 
                      className="text-gray-300 group-hover:text-[#FF9900] transition-colors duration-300" 
                    />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Contact Hours Info */}
            <div className="mt-8 pt-6 border-t border-gray-700/30">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="p-2 rounded-lg bg-[#FF9900]/10">
                  <Clock size={16} className="text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-white font-medium">Response Time</p>
                  <p>Mon-Fri, 10 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="hidden lg:block text-center"
          >
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-[#FF9900] opacity-60"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

// Clock component (if not already imported)
const Clock = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);